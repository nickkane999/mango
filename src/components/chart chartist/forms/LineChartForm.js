import React, { useState, useRef } from "react";
import { Container } from "react-bootstrap";
import "./ChartFormChartist.css";
import ChartForm from "./ChartForm";

const LineChartForm = (props) => {
  const [formData, setFormData] = useState({});
  const { fields, createChart } = props;

  const updateFormInput = (event) => {
    console.log(event);
    const { name, value } = event.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
    console.log(formData);
    //createChart();
  };

  const updateFormCheckbox = (event) => {
    console.log(event);
    const { name } = event.target;
    setFormData((formData) => ({ ...formData, [name]: event.target.checked }));
    console.log(formData);
    //createChart();
  };

  const chartContainer = useRef(null);

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
};

export default LineChartForm;
