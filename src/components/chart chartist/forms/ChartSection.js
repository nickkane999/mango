import React, { useState, useRef } from "react";
import { Container } from "react-bootstrap";
import "./ChartFormChartist.css";
import ChartForm from "./ChartForm";

const ChartSection = (props) => {
  const [formData, setFormData] = useState({});
  const { fields, createChart } = props;
  const chartContainer = useRef(null);

  const updateFormInput = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
    console.log(formData);
  };

  const updateFormCheckbox = (event) => {
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
      <ChartForm fields={fields} updateFormInput={updateFormInput} updateFormCheckbox={updateFormCheckbox} handleSubmit={handleSubmit} />
      <Container>
        <div id="chart" ref={chartContainer}></div>
      </Container>
    </>
  );
};

export default ChartSection;
