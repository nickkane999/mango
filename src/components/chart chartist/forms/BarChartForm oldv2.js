import React, { useEffect, useState, useRef } from "react";
import { Form, FormGroup, Container, Button, Row, Col } from "react-bootstrap";
import "./ChartFormChartist.css";
import { fields, createChart } from "./BarChartFormData";

function BarChartForm() {
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    console.log(event);
    const { name, value } = event.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
    console.log(formData);
    //createChart();
  };

  const handleCheckBoxChange = (event) => {
    console.log(event);
    const { name } = event.target;
    setFormData((formData) => ({ ...formData, [name]: event.target.checked }));
    console.log(formData);
    //createChart();
  };

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

  const chartContainer = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    createChart(chartContainer, formData);
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
                      <Form.Check type="checkbox" label={field.name} onChange={handleCheckBoxChange} defaultChecked={false} name={field.key} />
                    </Form.Group>
                  </Col>
                );
              } else if (field.type === "input") {
                return (
                  <Col className="form-group" xs={4}>
                    <Form.Group className={!field.default ? field.key + " field hidden" : field.key + " field"} key={field.key}>
                      <Form.Label>{field.name}</Form.Label>
                      <Form.Control
                        placeholder={field.name}
                        onChange={handleInputChange}
                        name={field.key}
                        /* value={field.default ? field.default : ''} */
                      />
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
      <Container>
        <div id="chart" ref={chartContainer}></div>
      </Container>
    </>
  );
}

export default BarChartForm;
