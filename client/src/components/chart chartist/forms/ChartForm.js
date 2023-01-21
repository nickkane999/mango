import React, { useState, useEffect, memo, useContext } from "react";
import { Form, Container, Button, Row, Col, Dropdown } from "react-bootstrap";
import { GET_CHARTS_BY_USER, UPDATE_CHART_BY_USER } from "../../../graphQL/queries";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { user } from "../../../util/general";
import { createCheckbox, createInputField, createCheckboxDisplayOptions, handleDisplayOptions } from "./functions/formLayout";
import { updateFormInput, updateFormCheckbox, updateFormData } from "./functions/formFields";
import "./ChartForm.css";

import SessionContext from "./temp/store";

const ChartForm = (props) => {
  const { chartInfo, setChartInfo } = useContext(SessionContext);
  let settings = chartInfo;
  let functions = settings.functions;
  const { chartType, fields } = settings.misc;

  const [formData, setFormData] = useState({});
  const [chartJSON, setChartJSON] = useState();
  const getUpdatedFormData = () => {
    return formData;
  };
  const getUpdatedChartJSON = () => {
    return chartJSON;
  };
  functions.getUpdatedFormData = getUpdatedFormData;
  functions.getUpdatedChartJSON = getUpdatedChartJSON;
  settings.sessionStorage.setChartJSON = setChartJSON;
  settings.sessionStorage.setFormData = setFormData;

  /*
  const settings = props.settings;
  const functions = settings.functions;
  console.log("settings:");
  console.log(settings);

  */
  const [loadChartsQuery, { data }] = useLazyQuery(GET_CHARTS_BY_USER);
  const [updateChartQuery] = useMutation(UPDATE_CHART_BY_USER);
  const [selectedChart, setSelectedChart] = useState({ name: "Load Existing Chart" });
  const [saveChartName, setSaveChartName] = useState("");

  const { Control, Label, Group, Check } = Form;
  const { Menu, Toggle, Item } = Dropdown;

  // GraphQL queries and variables
  // Run only if user is logged in
  useEffect(() => {
    if (user && user.id) {
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

  const pullChart = (chart) => {
    setSelectedChart(chart);
  };

  const handleSaveChartName = (event) => {
    setSaveChartName(event.target.value);
  };

  const personalTest = () => {
    console.log("personalTest");
    console.log("settings:");
    console.log(settings);
    functions.loadChartJSONTemplate(settings);
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
                  <Button onClick={() => functions.loadChartJSONFromAccount(selectedChart, settings)}>Load Selected JSON</Button>
                  <Button onClick={() => functions.updateChartForAccount(selectedChart, settings)}>Update Selected JSON</Button>
                </Col>
              </>
            ) : (
              <p className="no-user-charts"> No {chartType} charts found for this user </p>
            )}
          </Col>
          {user && user.id ? (
            <Col xs={6}>
              <Group key="addChartToAccount">
                <Label>Add Chart to Account</Label>
                <Control placeholder="Chart Name" name="chartName" onChange={handleSaveChartName} />
              </Group>
              <Button variant="primary" type="submit" className="save-chart-json" onClick={() => functions.saveChartJSON(saveChartName, user, settings)}>
                Save Chart JSON
              </Button>
            </Col>
          ) : null}
          <Container className="chartSettingsError">
            <p className="error"></p>
          </Container>
          <Container className="chartSettings">
            <Group key="chartJSON" className="chartJSON">
              <Label>Enter JSON here</Label>
              <Control as="textarea" rows="10" placeholder="Chart progress" onChange={(event) => functions.updateChartJSON(event, settings)} name="chartJSON" />
            </Group>
            <Button variant="primary" type="submit" onClick={() => functions.loadChartJSON(settings)}>
              Load Chart From JSON
            </Button>
            <Button variant="primary" type="submit" onClick={() => personalTest()}>
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
          <Form onSubmit={(event) => functions.handleSubmit(event, settings)}>
            {fields.map((field) => {
              if (field.type === "checkbox") {
                return createCheckbox(field, settings);
              } else if (field.type === "input") {
                return createInputField(field, settings);
              }
            })}
            <Button variant="primary" type="submit">
              Load Chart From Form
            </Button>
          </Form>
          <Button variant="primary" type="submit" onClick={functions.testingFunction}>
            Testing Function
          </Button>
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

  if (chartInfo) {
    console.log("made it down to here, what will happen?");
    console.log(settings);
    return (
      <>
        {createChartSettings()}
        {createFormFields()}
        {createDisplayOptions()}
      </>
    );
  } else {
    console.log("made it down to here, what will happen?");
    return <p> Loading... </p>;
  }
};

export default memo(ChartForm);
/*
        {//createChartSettings()}
        {//createFormFields()}
        {//createDisplayOptions()}
*/
