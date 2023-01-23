import React, { useState, useEffect, memo, useContext } from "react";
import "./ChartForm.css";

import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_CHARTS_BY_USER, UPDATE_CHART_BY_USER, CREATE_CHART_BY_USER } from "../../../graphQL/queries";
import SessionContext from "../context/chartStore";

import { user } from "../../../util/general";
import { CT_POINT_LABELS } from "../plugins/labelLineChart";
import { addPlugin } from "../util/charts";

import CreateChartSettings from "./form/CreateChartSettings";
import CreateFormFields from "./form/CreateFormFields";
import CreateDisplayOptions from "./form/CreateDisplayOptions";

const ChartForm = (props) => {
  const { chartInfo, setChartInfo } = useContext(SessionContext);
  let settings = chartInfo;
  let functions = settings.functions;
  const { chartType, fields } = settings.misc;
  let pluginID = "addPointLabels1";
  addPlugin(CT_POINT_LABELS, pluginID);

  // Defining state variables and functions to use for create page's HTML (defined in formSections file)
  const [formData, setFormData] = useState({});
  const [chartJSON, setChartJSON] = useState();
  const [selectedChart, setSelectedChart] = useState({ name: "Load Existing Chart" });
  const [saveChartName, setSaveChartName] = useState("");
  const getUpdatedFormData = () => {
    return formData;
  };
  const getUpdatedChartJSON = () => {
    return chartJSON;
  };
  const pullChart = (chart) => {
    setSelectedChart(chart);
  };
  const handleSaveChartName = (event) => {
    setSaveChartName(event.target.value);
  };

  // GraphQL queries and variables
  const [loadChartsQuery, { data }] = useLazyQuery(GET_CHARTS_BY_USER);
  const [updateChartQuery] = useMutation(UPDATE_CHART_BY_USER);
  const [createChartQuery] = useMutation(CREATE_CHART_BY_USER);
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

  // Update variables in file to work with html layout functions
  const updateSessionInfo = () => {
    functions.getUpdatedFormData = getUpdatedFormData;
    functions.getUpdatedChartJSON = getUpdatedChartJSON;
    settings.sessionStorage.setChartJSON = setChartJSON;
    settings.sessionStorage.setFormData = setFormData;
    settings.functions.updateChartQuery = updateChartQuery;
    settings.functions.createChartQuery = createChartQuery;
  };
  updateSessionInfo();

  // Wait for chartInfo (context containing all functions / variables needed for this chart form) to be loaded before rendering
  if (chartInfo) {
    // Define parameters used in each HTML section, then pass into the functions to return HTML
    let chartSettingsInfo = { data, selectedChart, functions, chartType, pullChart, settings, handleSaveChartName, saveChartName, user, pluginID };
    let formFieldInfo = { functions, fields, settings };
    let displayOptionsInfo = fields;
    return (
      <>
        <CreateChartSettings {...chartSettingsInfo} />
        <CreateFormFields {...formFieldInfo} />
        <CreateDisplayOptions {...displayOptionsInfo} />
      </>
    );
  } else {
    return <p> Loading... </p>;
  }
};

export default memo(ChartForm);
