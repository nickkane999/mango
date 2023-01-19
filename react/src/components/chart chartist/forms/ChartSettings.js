import React, { useMemo } from "react";
import { Form, FormGroup, Container, Button, Row, Col } from "react-bootstrap";

const ChartSettings = (props) => {
  const { fields, updateFormInput, updateFormCheckbox, handleSubmit } = props;

  // Form Logic
  const handleDisplayOptions = (event) => {
    if (event.target.checked) {
      document.querySelector(".displayOptions").style.display = "block";
    } else {
      document.querySelector(".displayOptions").style.display = "none";
    }
  };
  const toggleFormField = (event, className) => {
    if (event.target.checked) {
      document.querySelector("." + className).style.display = "block";
    } else {
      document.querySelector("." + className).style.display = "none";
    }
  };

  // Form HTML
  const { Control, Label, Group, Check } = Form;
  const createCheckbox = (field) => {
    return (
      <Col className="form-group" xs={4}>
        <Group className={field.key + " field" + (!field.default ? " hidden" : "")}>
          <Check type="checkbox" label={field.name} onChange={updateFormCheckbox} defaultChecked={false} name={field.key} />
        </Group>
      </Col>
    );
  };

  const createInputField = (field) => {
    return (
      <Col className="form-group" xs={4}>
        <Group className={field.key + " field" + (!field.default ? " hidden" : "")}>
          <Label>{field.name}</Label>
          <Control placeholder={field.name} onChange={updateFormInput} name={field.key} />
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

  return (
    <>
      <Container>
        <Row>
          <Form onSubmit={handleSubmit}>
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
      <Container>
        <h2> Show Fields</h2>
        <Group key="displayOptions">
          <Check type="checkbox" label="Display Options" onChange={handleDisplayOptions} defaultChecked={true} />
        </Group>
        <Container className="displayOptions">
          <Row>
            {fields.map((field) => {
              if (field.default === false) {
                return createCheckboxDisplayOptions(field);
              }
            })}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default ChartSettings;
