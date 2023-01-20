import React, { useState, useRef } from "react";
import { Container } from "react-bootstrap";
import ChartForm from "./ChartForm";
import { useMutation } from "@apollo/client";
import { UPDATE_CHART_BY_USER, CREATE_CHART_BY_USER } from "../../../graphQL/queries";
import { user } from "../../../util/general";

//import ChartSettings from "./ChartSettings";

const ChartSection = (props) => {
  const [formData, setFormData] = useState({});
  const [chartJSON, setChartJSON] = useState();
  const { fields, createChart, template } = props.settings;
  const [updateChartQuery] = useMutation(UPDATE_CHART_BY_USER);
  const [createChartQuery] = useMutation(CREATE_CHART_BY_USER);
  const chartContainer = useRef(null);
  const chartType = props.chartType;

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
    // Console log statements help determine if saved json data has same (no extra)
    // fields compared to the fields defined in the respective form-data file
    Object.entries(chartData).forEach(([key, value]) => {
      //console.log(`${key}: ${value}`);
      if (typeof value === "boolean") {
        //console.log(`${key}: ${value}`);
        document.querySelector(`.${key} input`).checked = value;
      } else {
        //console.log("could be funny data type");
        //console.log(`${key}: ${value}`);
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
      //document.querySelector(".chartSettingsError .error").innerHTML = "Invalid JSON";
    }
  };

  const saveChartJSON = (saveChartName) => {
    let chartJSON = document.querySelector(".chartJSON textarea").value;
    let createChartInput = {
      json: chartJSON,
      name: saveChartName,
      type: chartType,
      userId: user.id,
    };
    //console.log(createChartInput);
    //console.log("Saving chart to user");
    //console.log(chartJSON);

    if (user && user.id) {
      createChartQuery({
        variables: {
          createChartInput,
        },

        onCompleted: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  const updateChartForAccount = (chart) => {
    let chartJSON = document.querySelector(".chartJSON textarea").value;
    if (chart.id) {
      updateChartQuery({
        variables: {
          updateChartId: chart.id,
          updateChartInput: {
            json: chartJSON,
          },
        },
        onCompleted: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  const loadChartJSONTemplate = () => {
    setChartJSON(template);
    document.querySelector(".chartJSON textarea").value = JSON.stringify(template, null, "\t");
    createChart(chartContainer, template);
    updateFormData(template);
  };

  const hasChartType = (charts, type) => {
    let chartCount = 0;
    charts.some((chart) => {
      // Alternative to forEach, will stop looping when true
      if (chart.type === type) {
        chartCount++;
        return true;
      }
    });
    return chartCount > 0;
  };

  const loadChartJSONFromAccount = (chart) => {
    //console.log("Loading chart JSON");
    //console.log(chart);
    if (chart.id) {
      document.querySelector(".chartJSON textarea").value = chart.json;
      let chartData = JSON.parse(chart.json);
      setFormData(chartData);
      createChart(chartContainer, chartData);
      updateFormData(chartData);
      //console.log("New chart data");
      //console.log(chartData);
      //functions.saveChartJSON();
    }
  };

  const functions = {
    updateFormInput,
    updateFormCheckbox,
    handleSubmit,
    updateChartJSON,
    loadChartJSON,
    saveChartJSON,
    loadChartJSONTemplate,
    loadChartJSONFromAccount,
    updateChartForAccount,
    hasChartType,
  };

  return (
    <>
      <ChartForm fields={fields} functions={functions} chartType={props.chartType} />
      <Container>
        <div id="chart" ref={chartContainer}></div>
      </Container>
    </>
  );
};

export default ChartSection;
