import React, { useState, useRef } from "react";
import { Container } from "react-bootstrap";
import ChartForm from "./ChartForm";
//import ChartSettings from "./ChartSettings";

const ChartSection = (props) => {
  const [formData, setFormData] = useState({});
  const [chartJSON, setChartJSON] = useState();
  const { fields, createChart, template } = props.settings;
  const chartContainer = useRef(null);

  // Form field / submission functions
  const updateFormInput = (event) => {
    let { name, value } = event.target;
    if (value.indexOf(",") !== -1) {
      value = value.split(",");
      if (name === "series") {
        value = value.map((item) => {
          return parseInt(item);
        });
        let seriesArray = [];
        seriesArray.push(value);
        setFormData((formData) => ({ ...formData, [name]: seriesArray }));
        return;
      }
    }
    setFormData((formData) => ({ ...formData, [name]: value }));
    //console.log(formData);
  };

  const updateFormCheckbox = (event) => {
    const { name } = event.target;
    setFormData((formData) => ({ ...formData, [name]: event.target.checked }));
    //console.log(formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createChart(chartContainer, formData);
  };

  const updateFormData = (chartData) => {
    Object.entries(chartData).forEach(([key, value]) => {
      if (typeof value === "boolean") {
        document.querySelector(`.${key} input`).checked = value;
      } else {
        document.querySelector(`.${key} input`).value = value;
      }
    });
  };

  // Chart Setting functions
  const updateChartJSON = (event) => {
    setChartJSON(event.target.value);
  };

  const loadChartJSON = () => {
    try {
      let chartData = JSON.parse(chartJSON);
      setFormData(chartData);
      createChart(chartContainer, chartData);
      updateFormData(chartData);
      console.log(chartData);
    } catch (error) {
      document.querySelector(".chartSettingsError .error").innerHTML = "Invalid JSON";
    }
  };

  const saveChartJSON = (event) => {
    document.querySelector(".chartJSON textarea").value = JSON.stringify(formData, null, "\t");
  };

  const loadChartJSONTemplate = () => {
    setChartJSON(template);
    document.querySelector(".chartJSON textarea").value = JSON.stringify(template, null, "\t");
    createChart(chartContainer, template);
    updateFormData(template);

    console.log(template);
  };

  const functions = { updateFormInput, updateFormCheckbox, handleSubmit, updateChartJSON, loadChartJSON, saveChartJSON, loadChartJSONTemplate };

  return (
    <>
      <ChartForm fields={fields} functions={functions} />
      <Container>
        <div id="chart" ref={chartContainer}></div>
      </Container>
    </>
  );
};

export default ChartSection;
