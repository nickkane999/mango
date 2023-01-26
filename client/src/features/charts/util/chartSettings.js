import { updateChartistInfo, generateChart, generateChartWithData, pullPlugins } from "./charts.js";

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

// Commonly used functions in this file
const createChartFromJSONData = (settings, chartData, plugins = null) => {
  const { createChartData, updateFormData } = settings.functions;
  const { template } = settings.misc;
  const { setFormData } = settings.sessionStorage;
  let { pluginData } = settings.misc;
  const selectedPlugin = plugins ? plugins : settings.misc.selectedPlugin;

  setFormData(chartData);
  updateFormData(chartData);
  chartData = createChartData(chartData);
  const { data, options } = chartData;
  const loadedPlugins = createPluginInfo(selectedPlugin, pluginData);
  const plugin = pullPlugins({ plugins: loadedPlugins, hasOptions: options ? true : false });
  const fullChartInfo = { data: JSON.stringify(data), options: JSON.stringify(options).slice(0, -1), plugin, chartType: settings.misc.chartType };
  updateChartistInfo(data, options, plugin);
  generateChartWithData(fullChartInfo);
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

const createPluginString = (selectedPlugin) => {
  let pluginString = "{";
  Object.keys(selectedPlugin).map((key) => (pluginString += '"' + key + '": true, '));
  pluginString = pluginString.slice(0, -2) + "}";
  return pluginString;
};

// Functions in Settings Component
const saveChartJSON = (saveChartName, user, settings) => {
  const { createChartQuery } = settings.functions;
  const { selectedPlugin } = settings.misc;

  let chartJSON = document.querySelector(".chartJSON textarea").value;
  let pluginString = createPluginString(selectedPlugin);

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
  const { setSelectedPlugin } = settings.sessionStorage;

  if (chart.id) {
    document.querySelector(".chartJSON textarea").value = chart.json;
    let chartData = JSON.parse(chart.json);
    let plugins = JSON.parse(chart.plugins);
    setSelectedPlugin(JSON.parse(chart.plugins));
    createChartFromJSONData(settings, chartData, plugins);
    if (chart.plugins && plugins) {
      Object.keys(plugins).map((key) => {
        if (plugins[key] === true) {
          document.querySelector(`#${key}`).checked = true;
        }
      });
    }
    settings.sessionStorage.setChartJSON(JSON.stringify(chart.json, null, "\t"));
  }
};

const updateChartForAccount = (chart, settings) => {
  const { updateChartQuery } = settings.functions;
  const { selectedPlugin } = settings.misc;
  let chartJSON = document.querySelector(".chartJSON textarea").value;
  let pluginString = createPluginString(selectedPlugin);

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
    createChartFromJSONData(settings, chartData);
    settings.sessionStorage.setChartJSON(JSON.stringify(chartJSON, null, "\t"));
    document.querySelector(".chartJSON textarea").value = chartJSON;
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

export { loadChartJSON, saveChartJSON, updateChartJSON, loadChartJSONTemplate, hasChartType, loadChartJSONFromAccount, updateChartForAccount, updateChartJSONWithFormData };
