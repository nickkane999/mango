import React, { useState, useEffect } from "react";
import { Form, Container, Button, Row, Col, Dropdown } from "react-bootstrap";
import { GET_CHARTS_BY_USER, UPDATE_CHART_BY_USER } from "../../../graphQL/queries";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { user } from "../../../util/general";
import "./ChartForm.css";

const ChartForm = (props) => {
  const chartType = props.chartType;
  const [loadChartsQuery, { data }] = useLazyQuery(GET_CHARTS_BY_USER);
  const [updateChartQuery] = useMutation(UPDATE_CHART_BY_USER);
  const { fields, functions } = props;
  const [settings, setText] = useState("");
  const [selectedChart, setSelectedChart] = useState({ name: "Load Existing Chart" });
  const [saveChartName, setSaveChartName] = useState("");
  const formSections = {
    fields: ".displayOptions",
    settings: ".chartSettings",
    form_fields: ".formFields",
  };

  // GraphQL queries and variables
  // Run only if user is logged in
  useEffect(() => {
    if (user.id) {
      loadChartsQuery({
        variables: { userId: user.id },
        onCompleted: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  }, []);

  // Form Logic
  const handleDisplayOptions = (event, type) => {
    if (formSections[type]) {
      if (event.target.checked) {
        document.querySelector(formSections[type]).style.display = "block";
      } else {
        document.querySelector(formSections[type]).style.display = "none";
      }
    }
  };
  const toggleFormField = (event, className) => {
    if (event.target.checked) {
      document.querySelector("." + className).style.display = "block";
    } else {
      document.querySelector("." + className).style.display = "none";
    }
  };
  const pullChart = (chart) => {
    setSelectedChart(chart);
  };

  // Form HTML components
  const { Control, Label, Group, Check } = Form;
  const { Menu, Toggle, Item } = Dropdown;
  const createCheckbox = (field) => {
    return (
      <Col className="form-group" xs={4}>
        <Group className={field.key + " field" + (!field.default ? " hidden" : "")}>
          <Check type="checkbox" label={field.name} onChange={functions.updateFormCheckbox} defaultChecked={false} name={field.key} />
        </Group>
      </Col>
    );
  };

  const createInputField = (field) => {
    return (
      <Col className="form-group" xs={4}>
        <Group className={field.key + " field" + (!field.default ? " hidden" : "")}>
          <Label>{field.name}</Label>
          <Control placeholder={field.name} onChange={functions.updateFormInput} name={field.key} />
        </Group>
      </Col>
    );
  };

  const createCheckboxDisplayOptions = (field) => {
    return (
      <Col xs={3}>
        <Group key={field.key}>
          <Check type="checkbox" label={field.name} onChange={(event) => toggleFormField(event, field.key)} defaultChecked={false} />
        </Group>
      </Col>
    );
  };

  const handleSaveChartName = (event) => {
    setSaveChartName(event.target.value);
  };

  // Form HTML sections
  const createChartSettings = () => {
    return (
      <Container className="section">
        <Row>
          <h2>Chart Settings</h2>
          <Col xs={6}>
            <Group key="displayOptionSettings">
              <Check type="checkbox" label="Display Chart JSON" onChange={(event) => handleDisplayOptions(event, "settings")} defaultChecked={true} />
            </Group>
            <Group key="displayOptionFormFields">
              <Check type="checkbox" label="Chart Form" onChange={(event) => handleDisplayOptions(event, "form_fields")} defaultChecked={true} />
            </Group>
            <Group key="displayOptionFields">
              <Check type="checkbox" label="Select Chart Fields" onChange={(event) => handleDisplayOptions(event, "fields")} defaultChecked={true} />
            </Group>
            {data && functions.hasChartType(data.getChartsByUser, chartType) ? (
              <>
                <Col className="chart-selection" xs={12}>
                  <Group key="loadChart" className="load-chart">
                    <Dropdown title="Charts" id="basic-nav-dropdown">
                      <Toggle variant="success" id="dropdown-basic">
                        {selectedChart ? selectedChart.name : "Load Existing Chart"}
                      </Toggle>
                      <Menu>
                        {data.getChartsByUser.map((chart) => {
                          return (
                            <Item key={chart.id} value={chart.id} onClick={() => pullChart(chart)}>
                              {chart.name}
                            </Item>
                          );
                        })}
                      </Menu>
                    </Dropdown>
                  </Group>
                </Col>
                <Col className="chart-selection-options" xs={12}>
                  <Button onClick={() => functions.loadChartJSONFromAccount(selectedChart)}>Load Selected JSON</Button>
                  <Button onClick={() => functions.updateChartForAccount(selectedChart)}>Update Selected JSON</Button>
                </Col>
              </>
            ) : (
              <p className="no-user-charts"> No {chartType} charts found for this user </p>
            )}
          </Col>
          <Col xs={6}>
            <Group key="addChartToAccount">
              <Label>Add Chart to Account</Label>
              <Control placeholder="Chart Name" name="chartName" onChange={handleSaveChartName} />
            </Group>
            <Button variant="primary" type="submit" className="save-chart-json" onClick={() => functions.saveChartJSON(saveChartName)}>
              Save Chart JSON
            </Button>
          </Col>

          <Container className="chartSettingsError">
            <p className="error"></p>
          </Container>
          <Container className="chartSettings">
            <Group key="chartJSON" className="chartJSON">
              <Label>Enter JSON here</Label>
              <Control as="textarea" rows="10" placeholder="Chart progress" onChange={functions.updateChartJSON} name="chartJSON" />
            </Group>
            <Button variant="primary" type="submit" onClick={functions.loadChartJSON}>
              Load Chart From JSON
            </Button>
            <Button variant="primary" type="submit" onClick={functions.loadChartJSONTemplate}>
              Load Template
            </Button>
          </Container>
        </Row>
      </Container>
    );
  };

  const createFormFields = () => {
    return (
      <Container className="formFields section">
        <Row>
          <h2>Chart Fields</h2>
          <Form onSubmit={functions.handleSubmit}>
            {fields.map((field) => {
              if (field.type === "checkbox") {
                return createCheckbox(field);
              } else if (field.type === "input") {
                return createInputField(field);
              }
            })}
            <Button variant="primary" type="submit">
              Load Chart From Form
            </Button>
          </Form>
        </Row>
      </Container>
    );
  };

  const createDisplayOptions = () => {
    return (
      <Container className="displayOptions section">
        <h2> Select Chart Fields to Display</h2>
        <Row>
          {fields.map((field) => {
            if (field.default === false) {
              return createCheckboxDisplayOptions(field);
            }
          })}
        </Row>
      </Container>
    );
  };

  return (
    <>
      {createChartSettings()}
      {createFormFields()}
      {createDisplayOptions()}
    </>
  );
};

export default ChartForm;
