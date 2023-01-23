import { ADD_POINT_LABELS1 } from "../data/pluginStrings";

const div = document.querySelector("#chartist-info");

const plugins = {
  addPointLabels1: ADD_POINT_LABELS1,
};

const addPlugin = (pluginString, id) => {
  const scriptPlugin = document.createElement("script");
  if (!document.querySelector(`script[data-plugin="${id}"]`)) {
    scriptPlugin.setAttribute("data-plugin", id);
    scriptPlugin.innerHTML = pluginString;
    div.appendChild(scriptPlugin);
  }
};

const updateChartistInfo = (data, options, plugin) => {
  const div = document.querySelector("#chartist-info");
  console.log("my div");
  console.log(div);
  const dataScript = document.querySelector('script[data-json="data"]');
  const optionsScript = document.querySelector('script[options-json="data"]');
  const pluginScript = document.querySelector('script[plugin-json="data"]');
  const scripts = [];
  data && scripts.push({ script: dataScript, info: data, key: "data" });
  options && scripts.push({ script: optionsScript, info: options, key: "options" });
  plugin && scripts.push({ script: pluginScript, info: plugin, key: "plugin" });
  scripts.forEach((script) => {
    console.log("script loop");
    console.log(JSON.stringify(script.info));
    if (script.script) {
      script.script.innerHTML = JSON.stringify(script.info);
    } else {
      let newScript = document.createElement("script");
      newScript.setAttribute(`${script.key}-json`, "data");
      newScript.innerHTML = JSON.stringify(script.info);
      div.appendChild(newScript);
    }
  });
};

const pullChartistInfo = (pluginID) => {
  const dataScript = document.querySelector('script[data-json="data"]');
  const data = dataScript ? dataScript.innerHTML : null;
  const optionsScript = document.querySelector('script[options-json="data"]');
  const options = optionsScript ? optionsScript.innerHTML : null;
  const plugin = plugins[pluginID] ? plugins[pluginID] : null;
  return { data, options, plugin };
};

const generateChart = (pluginID) => {
  let { data, options, plugin } = pullChartistInfo(pluginID);
  if (data && plugin) {
    const makeChart = new Function(`return new Chartist.Line("#chart", ${data}, ${plugin});`)();
  }
};

const sampleInsert = () => {
  const data = {
    labels: [1, 2, 3, 4, 5, 6, 7],
    series: [
      [1, 5, 3, 4, 6, 2, 3],
      [2, 4, 2, 5, 4, 3, 6],
    ],
  };
  const options = {};
  updateChartistInfo(data, options, null);
};

export { addPlugin, pullChartistInfo, updateChartistInfo, sampleInsert, generateChart };

/*
const addJSFile = (file, id) => {
  const script = document.createElement("script");
  if (!document.querySelector(`script[data-file="${id}"]`)) {
    script.setAttribute("data-file", id);
    script.src = file;
    script.async = true;
    div.appendChild(script);
  }
};
*/
