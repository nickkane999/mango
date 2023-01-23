import React, { useState, useEffect, memo, useContext } from "react";
import { Form, Container, Button, Row, Col, Dropdown } from "react-bootstrap";
import { GET_CHARTS_BY_USER, UPDATE_CHART_BY_USER } from "../../../graphQL/queries";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { user } from "../../../util/general";
import "./ChartForm.css";
import { createChartSettings, createFormFields, createDisplayOptions } from "../util/formSections";

import { CT_POINT_LABELS } from "../plugins/labelLineChart";
import { addPlugin, updateChartistInfo, generateChart } from "../util/charts";

import SessionContext from "../context/chartStore";

const ChartForm = (props) => {
  const { chartInfo, setChartInfo } = useContext(SessionContext);
  let settings = chartInfo;
  let functions = settings.functions;
  const { chartType, fields } = settings.misc;
  let pluginID = "addPointLabels1";

  // Defining state variables and functions to use for create page's HTML (defined in formSections file)
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

  addPlugin(CT_POINT_LABELS, "addPointLabels1");
  //updateChartistInfo(template)
  //generateChart("addPointLabels1");

  const [loadChartsQuery, { data }] = useLazyQuery(GET_CHARTS_BY_USER);
  const [selectedChart, setSelectedChart] = useState({ name: "Load Existing Chart" });
  const [saveChartName, setSaveChartName] = useState("");

  // GraphQL queries and variables
  // Run only if user is logged in
  useEffect(() => {
    if (user && user.id) {
      loadChartsQuery({
        variables: { userId: user.id },
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

  // Wait for chartInfo (context containing all functions / variables needed for this chart form) to be loaded before rendering
  if (chartInfo) {
    // Define parameters used in each HTML section, then pass into the functions to return HTML
    let chartSettingsInfo = { data, selectedChart, functions, chartType, pullChart, settings, handleSaveChartName, saveChartName, user, pluginID };
    let formFieldInfo = { functions, fields, settings };
    let displayOptionsInfo = fields;
    return (
      <>
        {createChartSettings(chartSettingsInfo)}
        {createFormFields(formFieldInfo)}
        {createDisplayOptions(displayOptionsInfo)}
      </>
    );
  } else {
    return <p> Loading... </p>;
  }
};

export default memo(ChartForm);
