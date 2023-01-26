import React, { useState, useEffect, memo, useContext } from "react";
import { Container } from "react-bootstrap";
import "./ChartForm.scss";
import "./plugins.scss";

import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_CHARTS_BY_USER, UPDATE_CHART_BY_USER, CREATE_CHART_BY_USER } from "../../../graphQL/queries";
import SessionContext, { updateSessionInfo } from "../context/chartStore";

import { user } from "../../../util/general";
import { CT_POINT_LABELS } from "../plugins/labelLineChart";
import { addPlugin } from "../util/charts";
import { fields as pluginFields } from "../data/plugins";
import { pluginData } from "../plugins/all";

import ChartSettings from "./form/ChartSettings";
import ChartFormFields from "./form/ChartFormFields";
import ChartDisplayOptions from "./form/ChartDisplayOptions";
import ChartPluginFields from "./form/ChartPluginFields";

const ChartForm = (props) => {
  const { fields, createChart, createChartData, template, chartType } = props.settings;
  const [selectedPlugin, setSelectedPlugin] = useState([]);
  const [hasSessionLoaded, setHasSessionLoaded] = useState(false);
  const { chartInfo, setChartInfo } = useContext(SessionContext);

  for (let key in pluginData) {
    addPlugin(pluginData[key]["loadingJS"], key);
  }

  /*
  useEffect(() => {
    const { functions, sessionStorage, misc } = chartInfo;
    const newAttributes = {
      sessionStorage: {
        ...sessionStorage,
      },
      functions: {
        ...functions,
        createChart: createChart,
        createChartVanillaJS: createChartVanillaJS,
      },
      misc: {
        ...misc,
        chartType: props.chartType,
        fields: fields,
        template: template,
      },
    };
    setChartInfo({ ...newAttributes });
    setHasSessionLoaded(true);
  }, [props.chartType]);
  */

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

  let settings = chartInfo;
  let functions = settings.functions;

  // Update variables in file to work with html layout functions
  const info = {
    functions,
    settings,
    getUpdatedFormData,
    getUpdatedChartJSON,
    setChartJSON,
    setFormData,
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
    const chartSettingsInfo = { data, selectedChart, functions, chartType, pullChart, settings, handleSaveChartName, saveChartName, user };
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
