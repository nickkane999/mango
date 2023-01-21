// Chart Setting functions
const updateChartJSON = (event, settings) => {
  const { setChartJSON } = settings.sessionStorage;
  setChartJSON(event.target.value);
};

const loadChartJSON = (settings) => {
  const { createChart, updateFormData } = settings.functions;
  const { chartContainer } = settings.misc;
  const { setFormData } = settings.sessionStorage;
  const chartJSON = settings.functions.getUpdatedChartJSON();

  try {
    let chartData = JSON.parse(chartJSON);
    setFormData(chartData);
    createChart(chartContainer, chartData);
    updateFormData(chartData);
  } catch (error) {
    console.log(error);
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
  const { createChart, updateFormData } = settings.functions;
  const { chartContainer, template } = settings.misc;
  const { setFormData } = settings.sessionStorage;

  setFormData(template);
  document.querySelector(".chartJSON textarea").value = JSON.stringify(template, null, "\t");
  createChart(chartContainer, template);
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
  const { createChart, updateFormData } = settings.functions;
  const { chartContainer } = settings.misc;
  const { setFormData } = settings.sessionStorage;

  if (chart.id) {
    document.querySelector(".chartJSON textarea").value = chart.json;
    let chartData = JSON.parse(chart.json);
    setFormData(chartData);
    createChart(chartContainer, chartData);
    updateFormData(chartData);
  }
};

export { loadChartJSON, saveChartJSON, updateChartJSON, loadChartJSONTemplate, hasChartType, loadChartJSONFromAccount, updateChartForAccount };