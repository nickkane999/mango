import { updateChartistInfo, generateChart, generateChartWithData, pullPlugins } from "./charts.js";
import { refreshPluginsData } from "../plugins/all";
import FileSaver from "file-saver";

// Chart Setting functions
const updateChartJSON = (event, settings) => {
  const { setChartJSON } = settings.sessionStorage;
  setChartJSON(event.target.value);
};

// Util function
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

const modifyFunctionStrings = (string) => {
  let newString = string;
  newString = newString.replace(/"function/g, "function");
  newString = newString.replace(/}"/g, "}");
  return newString;
};

// Commonly used functions in this file
const createChartFromJSONData = (settings, chartData, plugins = null) => {
  const { createChartData, updateFormData, getUpdatedPluginFormData } = settings.functions;

  const { template } = settings.misc;
  const { setFormData } = settings.sessionStorage;
  let { pluginData } = settings.misc;
  const selectedPlugin = plugins ? plugins.formOptions : settings.misc.selectedPlugin;

  setFormData(chartData);
  updateFormData(chartData);

  chartData = createChartData(chartData);
  const { data, options } = chartData;

  let pluginFormData = plugins ? plugins.formFields : getUpdatedPluginFormData();
  const refreshPluginsParameters = { pluginFormData, pluginData, settings };
  pluginData = refreshPluginsData(refreshPluginsParameters);

  const loadedPlugins = createPluginInfo(selectedPlugin, pluginData);
  const plugin = pullPlugins({ plugins: loadedPlugins, hasOptions: options ? true : false });
  const fullChartInfo = { data: JSON.stringify(data), options: modifyFunctionStrings(JSON.stringify(options).slice(0, -1)), plugin, chartType: settings.misc.chartType };
  updateChartistInfo(data, options, plugin);
  generateChartWithData(fullChartInfo, settings);
};

//['addAxisTitle','addBarLegend1','addBarLabels1']
const createPluginInfo = (selectedPlugin, pluginData) => {
  let loadedPlugins = {};
  for (let key in selectedPlugin) {
    if (selectedPlugin.hasOwnProperty(key) && pluginData.hasOwnProperty(key)) {
      loadedPlugins[key] = pluginData[key];
    }
  }
  return loadedPlugins;
};

const createPluginString = ({ pluginFormData, selectedPlugin }) => {
  if (!pluginFormData || Object.keys(pluginFormData).length === 0 || !selectedPlugin || Object.keys(selectedPlugin).length === 0) return "";
  let pluginString = '{"formOptions": {';
  Object.keys(selectedPlugin).map((key) => (pluginString += '"' + key + '": true, '));
  pluginString = pluginString.slice(0, -2) + "}, ";

  pluginString += '"formFields": {';
  Object.keys(pluginFormData).map((key, value) => (pluginString += '"' + key + '": "' + pluginFormData[key] + '", '));
  pluginString = pluginString.slice(0, -2) + "}}";

  return pluginString;
};

// Functions in Settings Component
const saveChartJSON = (saveChartName, user, settings) => {
  const { createChartQuery } = settings.functions;
  const { selectedPlugin } = settings.misc;
  let pluginFormData = settings.functions.getUpdatedPluginFormData();
  let info = { pluginFormData, selectedPlugin };

  let chartJSON = document.querySelector(".chartJSON textarea").value;
  let pluginString = createPluginString(info);

  let createChartInput = {
    json: chartJSON,
    plugins: pluginString,
    name: saveChartName,
    type: settings.misc.chartType,
    userId: user.id,
  };

  if (user && user.id) {
    createChartQuery({
      variables: {
        createChartInput,
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }
};

// Last function to implement
const loadChartJSONFromAccount = (chart, settings) => {
  const { setSelectedPlugin, setPluginFormData } = settings.sessionStorage;
  //settings.sessionStorage.setPluginFormData
  if (chart.id) {
    document.querySelector(".chartJSON textarea").value = chart.json;
    let chartData = JSON.parse(chart.json);
    let plugins = chart.plugins && chart.plugins.length != 0 ? chart.plugins : null;
    if (plugins) {
      plugins = JSON.parse(chart.plugins);
      setSelectedPlugin(plugins.formOptions);
      setPluginFormData(plugins.formFields);
    }
    createChartFromJSONData(settings, chartData, plugins);
    if (chart.plugins && plugins.formOptions && plugins.formFields) {
      let options = plugins.formOptions;
      let fields = plugins.formFields;
      Object.keys(options).map((key) => {
        if (options[key] === true) {
          document.querySelector(`#${key}`).checked = true;
          document.querySelector(`.${key}`).style.display = "block";
        }
      });
      let booleanStrings = ["true", "false"];
      Object.keys(fields).map((key) => {
        if (booleanStrings.includes(fields[key])) {
          document.querySelector(`.${key} input`).checked = fields[key];
        } else {
          document.querySelector(`.${key} input`).value = !isNaN(parseFloat(fields[key])) ? parseFloat(fields[key]) : fields[key];
          //document.querySelector(`.${key} input`).value = fields[key];
        }
      });
    }
    settings.sessionStorage.setChartJSON(JSON.stringify(chart.json, null, "\t"));
  }
};

const updateChartForAccount = (chart, settings) => {
  const { updateChartQuery } = settings.functions;
  const { selectedPlugin } = settings.misc;
  let pluginFormData = settings.functions.getUpdatedPluginFormData();
  let chartJSON = document.querySelector(".chartJSON textarea").value;
  let info = { pluginFormData, selectedPlugin };
  let pluginString = createPluginString(info);

  if (chart.id) {
    updateChartQuery({
      variables: {
        updateChartId: chart.id,
        updateChartInput: {
          json: chartJSON,
          plugins: pluginString,
        },
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }
};

const updateChartJSONWithFormData = (settings) => {
  const { getUpdatedFormData } = settings.functions;
  const { setChartJSON } = settings.sessionStorage;
  let formData = getUpdatedFormData();
  let formDataString = JSON.stringify(formData, null, "\t");
  setChartJSON(formDataString);
  document.querySelector(".chartJSON textarea").value = formDataString;
};

const loadChartJSON = (settings) => {
  const chartJSON = settings.functions.getUpdatedChartJSON();
  try {
    let chartData = JSON.parse(chartJSON);
    if (chartData && typeof chartData !== "object") {
      chartData = JSON.parse(chartData);
      if (chartData && typeof chartData !== "object") {
        chartData = JSON.parse(chartData);
      } else {
        document.querySelector(".chartJSON textarea").value = JSON.parse(chartJSON);
      }
    } else {
      document.querySelector(".chartJSON textarea").value = chartJSON;
    }
    console.log(chartData);
    createChartFromJSONData(settings, chartData);
    settings.sessionStorage.setChartJSON(chartJSON);
  } catch (error) {
    console.log(error);
    console.log("My Chart JSON: " + chartJSON);
  }
};

const loadChartJSONTemplate = (settings) => {
  const { template } = settings.misc;
  createChartFromJSONData(settings, template);
  settings.sessionStorage.setChartJSON(template);
  document.querySelector(".chartJSON textarea").value = JSON.stringify(template, null, "\t");
  settings.functions.updateFormData(template);
  settings.sessionStorage.setFormData(template); // WARNING: This is an Update to get the form data to work with external functions. MIGHT HAVE TO BE REMOVED
};

const saveChartFile = (settings) => {
  const { saveChartFile } = settings.sessionStorage;
  if (saveChartFile) {
    const data = new Blob([saveChartFile], { type: "application/javascript" });
    FileSaver.saveAs(data, "myChart.js");
  }
};

export {
  loadChartJSON,
  saveChartJSON,
  updateChartJSON,
  loadChartJSONTemplate,
  hasChartType,
  loadChartJSONFromAccount,
  updateChartForAccount,
  updateChartJSONWithFormData,
  saveChartFile,
  createChartFromJSONData,
};
