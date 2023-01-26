import { updateChartistInfo, generateChart, generateChartWithData, pullPlugins } from "./charts.js";

// Chart Setting functions
const updateChartJSON = (event, settings) => {
  const { setChartJSON } = settings.sessionStorage;
  setChartJSON(event.target.value);
};

const loadChartJSON = (settings) => {
  const { createChartVanillaJS, updateFormData } = settings.functions;
  const { setFormData } = settings.sessionStorage;
  const { pluginID } = settings.misc;
  const chartJSON = settings.functions.getUpdatedChartJSON();

  try {
    let chartData = JSON.parse(chartJSON);
    setFormData(chartData);
    createChartVanillaJS(chartData, pluginID);
    updateFormData(chartData);
  } catch (error) {
    console.log(error);
    console.log("My Chart JSON: " + chartJSON);
  }
};

const saveChartJSON = (saveChartName, user, settings) => {
  const { createChartQuery } = settings.functions;
  let chartJSON = document.querySelector(".chartJSON textarea").value;
  let createChartInput = {
    json: chartJSON,
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

const updateChartForAccount = (chart, settings) => {
  let chartJSON = document.querySelector(".chartJSON textarea").value;
  const { updateChartQuery } = settings.functions;

  if (chart.id) {
    updateChartQuery({
      variables: {
        updateChartId: chart.id,
        updateChartInput: {
          json: chartJSON,
        },
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }
};

const loadChartJSONTemplate = (settings) => {
  const { createChartData, updateFormData } = settings.functions;
  const { template, asdasdasdasdasd } = settings.misc;
  const { setFormData } = settings.sessionStorage;
  const { selectedPlugin, pluginData } = settings.misc;

  setFormData(template);
  document.querySelector(".chartJSON textarea").value = JSON.stringify(template, null, "\t");
  let chartData = createChartData(template, selectedPlugin);
  const { data, options } = chartData;
  let loadedPlugins = {};
  for (let key in selectedPlugin) {
    if (selectedPlugin.hasOwnProperty(key) && pluginData.hasOwnProperty(key)) {
      loadedPlugins[key] = pluginData[key];
    }
  }
  const plugin = pullPlugins({ plugins: loadedPlugins, hasOptions: options ? true : false });
  console.log("My plugin string: ");
  console.log(plugin);

  const fullChartInfo = { data: JSON.stringify(data), options: JSON.stringify(options).slice(0, -1), plugin, chartType: settings.misc.chartType };
  updateChartistInfo(data, options, plugin);
  generateChartWithData(fullChartInfo);

  updateFormData(template);
  setFormData(template); // WARNING: This is an Update to get the form data to work with external functions. MIGHT HAVE TO BE REMOVED
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

const loadChartJSONFromAccount = (chart, settings) => {
  const { createChartVanillaJS, updateFormData } = settings.functions;
  const { pluginID } = settings.misc;
  const { setFormData } = settings.sessionStorage;

  if (chart.id) {
    document.querySelector(".chartJSON textarea").value = chart.json;
    let chartData = JSON.parse(chart.json);
    setFormData(chartData);
    createChartVanillaJS(chartData, pluginID);
    updateFormData(chartData);
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

export { loadChartJSON, saveChartJSON, updateChartJSON, loadChartJSONTemplate, hasChartType, loadChartJSONFromAccount, updateChartForAccount, updateChartJSONWithFormData };