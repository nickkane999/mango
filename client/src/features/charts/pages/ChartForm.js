import React, { useState, useEffect, memo, useContext } from "react";
import { Container } from "react-bootstrap";
import "../scss/ChartForm.scss";
import "../scss/plugins.scss";

import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_CHARTS_BY_USER, UPDATE_CHART_BY_USER, CREATE_CHART_BY_USER } from "../../../graphQL/queries";
import SessionContext, { updateSessionInfo } from "../context/chartStore";

import { user } from "../../../util/general";
import { fields as pluginFields } from "../plugins/plugins";
import { pluginData, addPluginDataFunctions } from "../plugins/all";

import ChartSettings from "../components/sections/Settings";
import ChartFormFields from "../components/sections/FormFields";
import ChartDisplayOptions from "../components/sections/DisplayOptions";
import ChartPluginFields from "../components/sections/PluginFields";

const ChartForm = (props) => {
  const { fields, createChartData, template, chartType } = props.settings;
  const [selectedPlugin, setSelectedPlugin] = useState([]);
  const { chartInfo, setChartInfo } = useContext(SessionContext);

  // Add Plugin <script> tags for chartist.js
  addPluginDataFunctions(pluginData);

  // Defining state variables and functions to use for create page's HTML (defined in formSections file)
  const [formData, setFormData] = useState({});
  const [pluginFormData, setPluginFormData] = useState({});
  const [chartJSON, setChartJSON] = useState();
  const [saveChartFile, setSaveChartFile] = useState("");
  const getUpdatedFormData = () => {
    return formData;
  };
  const getUpdatedChartJSON = () => {
    return chartJSON;
  };
  const getUpdatedPluginFormData = () => {
    return pluginFormData;
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
  let settings = chartInfo;
  let functions = settings.functions;
  const info = {
    functions,
    settings,
    getUpdatedFormData,
    getUpdatedPluginFormData,
    getUpdatedChartJSON,
    setChartJSON,
    setFormData,
    setPluginFormData,
    saveChartFile,
    setSaveChartFile,
    updateChartQuery,
    createChartQuery,
    createChartData,
    template,
    fields,
    chartType,
    pluginData,
    selectedPlugin,
    setSelectedPlugin,
  };
  settings = updateSessionInfo(info);
  //console.log(settings);

  // Wait for chartInfo (context containing all functions / variables needed for this chart form) to be loaded before rendering
  if (chartInfo) {
    // Define parameters used in each HTML section, then pass into the functions to return HTML
    const chartSettingsInfo = { data, functions, chartType, settings, user };
    const formFieldInfo = { functions, fields, settings };
    const pluginFieldInfo = { functions, pluginData, settings };
    const chartDisplayOptionsInfo = { settings, fields: fields, type: "chart", title: "Select Chart Fields to Display", className: "section displayChartOptions" };
    const pluginDisplayOptionsInfo = { settings, fields: pluginFields, type: "plugin", title: "Select Plugins to use", className: "section displayPluginOptions" };
    return (
      <>
        <ChartSettings {...chartSettingsInfo} />
        <ChartDisplayOptions {...chartDisplayOptionsInfo} />
        <ChartFormFields {...formFieldInfo} />
        <ChartDisplayOptions {...pluginDisplayOptionsInfo} />
        <ChartPluginFields {...pluginFieldInfo} />
        <Container>
          <div id="chart"></div>
        </Container>
        ;
      </>
    );
  } else {
    return <p> Loading... </p>;
  }
};

export default memo(ChartForm);
