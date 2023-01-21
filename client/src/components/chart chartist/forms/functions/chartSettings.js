import { setSettings } from "../../../../util/general";

// Chart Setting functions
const updateChartJSON = (event, settings) => {
  console.log("updateChartJSON: settings");
  console.log(settings);

  const { setChartJSON } = settings.sessionStorage;
  setChartJSON(event.target.value);
};

const loadChartJSON = (settings) => {
  const { createChart, updateFormData } = settings.functions;
  const { chartContainer } = settings.misc;
  const { setFormData } = settings.sessionStorage;
  const chartJSON = settings.functions.getUpdatedChartJSON();
  console.log("Loading chart json: settings");
  console.log(settings);
  console.log(chartJSON);

  try {
    let chartData = JSON.parse(chartJSON);
    console.log(chartData);
    setFormData(chartData);
    createChart(chartContainer, chartData);
    updateFormData(chartData);
    console.log(chartData);
  } catch (error) {
    console.log(error);
    //document.querySelector(".chartSettingsError .error").innerHTML = "Invalid JSON";
  }
};

const saveChartJSON = (saveChartName, user, settings) => {
  console.log("saveChartJSON: settings");
  console.log(settings);

  const { createChartQuery } = settings.functions;
  let chartJSON = document.querySelector(".chartJSON textarea").value;
  let createChartInput = {
    json: chartJSON,
    name: saveChartName,
    type: settings.misc.chartType,
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

const updateChartForAccount = (chart, settings) => {
  console.log("updateChartForAccount: settings");
  console.log(settings);

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
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }
};

const loadChartJSONTemplate = (settings) => {
  console.log("loadChartJSONTemplate: settings");
  console.log(settings);

  const { createChart, updateFormData } = settings.functions;
  const { chartContainer, template } = settings.misc;
  const { setFormData } = settings.sessionStorage;
  //console.log(settings);

  setFormData(template);
  document.querySelector(".chartJSON textarea").value = JSON.stringify(template, null, "\t");
  createChart(chartContainer, template);
  updateFormData(template);
  setFormData(template); // WARNING: This is an Update to get the form data to work with external functions. MIGHT HAVE TO BE REMOVED
  console.log("my updated form data");
  console.log(settings.functions.getUpdatedFormData());
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
  console.log("loadChartJSONFromAccount: settings");
  console.log(settings);

  const { createChart, updateFormData } = settings.functions;
  const { chartContainer } = settings.misc;
  const { setFormData } = settings.sessionStorage;
  console.log("Loading chart JSON from account");
  console.log(settings);

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

export { loadChartJSON, saveChartJSON, updateChartJSON, loadChartJSONTemplate, hasChartType, loadChartJSONFromAccount, updateChartForAccount };
