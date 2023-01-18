import React, { useState } from "react";
import { Form, FormGroup, Container, Button, Row, Col } from "react-bootstrap";
import "./ChartForm.css";

const ChartForm = (props) => {
  const { fields, functions } = props;
  const [settings, setText] = useState("");
  const formSections = {
    fields: ".displayOptions",
    settings: ".chartSettings",
    form_fields: ".formFields",
  };
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

  // Form HTML components
  const createCheckbox = (field) => {
    return (
      <Col className="form-group" xs={4}>
        <Form.Group className={field.key + " field" + (!field.default ? " hidden" : "")}>
          <Form.Check type="checkbox" label={field.name} onChange={functions.updateFormCheckbox} defaultChecked={false} name={field.key} />
        </Form.Group>
      </Col>
    );
  };

  const createInputField = (field) => {
    return (
      <Col className="form-group" xs={4}>
        <Form.Group className={field.key + " field" + (!field.default ? " hidden" : "")}>
          <Form.Label>{field.name}</Form.Label>
          <Form.Control placeholder={field.name} onChange={functions.updateFormInput} name={field.key} />
        </Form.Group>
      </Col>
    );
  };

  const createCheckboxDisplayOptions = (field) => {
    return (
      <Col xs={3}>
        <Form.Group key={field.key}>
          <Form.Check type="checkbox" label={field.name} onChange={(event) => toggleFormField(event, field.key)} defaultChecked={false} />
        </Form.Group>
      </Col>
    );
  };

  // Form HTML sections
  const createChartSettings = () => {
    return (
      <Container className="section">
        <Row>
          <h2>Chart Settings</h2>
          <Form.Group key="displayOptionSettings">
            <Form.Check type="checkbox" label="Display Chart JSON" onChange={(event) => handleDisplayOptions(event, "settings")} defaultChecked={true} />
          </Form.Group>
          <Form.Group key="displayOptionFormFields">
            <Form.Check type="checkbox" label="Chart Form" onChange={(event) => handleDisplayOptions(event, "form_fields")} defaultChecked={true} />
          </Form.Group>
          <Form.Group key="displayOptionFields">
            <Form.Check type="checkbox" label="Select Chart Fields" onChange={(event) => handleDisplayOptions(event, "fields")} defaultChecked={true} />
          </Form.Group>
          <Container className="chartSettingsError">
            <p className="error"></p>
          </Container>
          <Container className="chartSettings">
            <Form.Group key="chartJSON" className="chartJSON">
              <Form.Label>Enter JSON here</Form.Label>
              <Form.Control as="textarea" rows="10" placeholder="Chart progress" onChange={functions.updateChartJSON} name="chartJSON" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={functions.loadChartJSON}>
              Load Chart
            </Button>
            <Button variant="primary" type="submit" onClick={functions.saveChartJSON}>
              Save Chart
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
              Update
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
