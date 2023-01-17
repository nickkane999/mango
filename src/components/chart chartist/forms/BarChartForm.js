import React, { useEffect, useState, useRef } from "react";
import { Form, FormGroup, Container, Button, Row, Col } from "react-bootstrap";
import "./ChartFormChartist.css";
import { fields, createChart } from "./BarChartFormData";
import ChartForm from "./ChartForm";

function BarChartForm() {
  const [formData, setFormData] = useState({});
  const chartContainer = useRef(null);

  const updateFormInput = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
    console.log(formData);
  };

  const updateFormCheckbox = (event) => {
    console.log(event);
    const { name } = event.target;
    setFormData((formData) => ({ ...formData, [name]: event.target.checked }));
    console.log(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createChart(chartContainer, formData);
  };

  return (
    <>
      <ChartForm fields={fields} updateFormInput={updateFormInput} updateFormCheckbox={updateFormCheckbox} handleSubmit={handleSubmit} />;
      <Container>
        <div id="chart" ref={chartContainer}></div>
      </Container>
    </>
  );
}

export default BarChartForm;
