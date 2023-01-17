import React from "react";
import { Form, FormGroup, Container, Button, Row, Col } from "react-bootstrap";

const ChartForm = (props) => {
  const { fields, updateFormInput, updateFormCheckbox, handleSubmit } = props;

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

  return (
    <>
      <Container>
        <Row>
          <Form onSubmit={handleSubmit}>
            {fields.map((field) => {
              if (field.type === "checkbox") {
                return (
                  <Col className="form-group" xs={4}>
                    <Form.Group className={!field.default ? field.key + " field hidden" : field.key + " field"} key={field.key}>
                      <Form.Check type="checkbox" label={field.name} onChange={updateFormCheckbox} defaultChecked={false} name={field.key} />
                    </Form.Group>
                  </Col>
                );
              } else if (field.type === "input") {
                return (
                  <Col className="form-group" xs={4}>
                    <Form.Group className={!field.default ? field.key + " field hidden" : field.key + " field"} key={field.key}>
                      <Form.Label>{field.name}</Form.Label>
                      <Form.Control placeholder={field.name} onChange={updateFormInput} name={field.key} />
                    </Form.Group>
                  </Col>
                );
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
        <Form.Group key="displayOptions">
          <Form.Check type="checkbox" label="Display Options" onChange={handleDisplayOptions} defaultChecked={true} />
        </Form.Group>
        <Container className="displayOptions">
          <Row>
            {fields.map((field) => {
              if (field.default === false) {
                return (
                  <Col xs={3}>
                    <Form.Group key={field.key}>
                      <Form.Check type="checkbox" label={field.name} onChange={(event) => toggleFormField(event, field.key)} defaultChecked={false} />
                    </Form.Group>
                  </Col>
                );
              }
            })}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default ChartForm;
