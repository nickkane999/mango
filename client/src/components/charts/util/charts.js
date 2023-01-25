import { plugins as pluginScripts, pluginStrings } from "../../../pages/Test/plugins/all";
const div = document.querySelector("#chartist-info");

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
  //console.log("my div");
  //console.log(div);
  const dataScript = document.querySelector('script[data-json="data"]');
  const optionsScript = document.querySelector('script[options-json="data"]');
  const pluginScript = document.querySelector('script[plugin-json="data"]');
  const scripts = [];
  data && scripts.push({ script: dataScript, info: data, key: "data" });
  options && scripts.push({ script: optionsScript, info: options, key: "options" });
  plugin && scripts.push({ script: pluginScript, info: plugin, key: "plugin" });
  scripts.forEach((script) => {
    //console.log("script loop");
    //console.log(JSON.stringify(script.info));
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

const pullChartistInfo = () => {
  const dataScript = document.querySelector('script[data-json="data"]');
  const data = dataScript ? dataScript.innerHTML : null;
  const optionsScript = document.querySelector('script[options-json="data"]');
  const options = optionsScript ? optionsScript.innerHTML : null;
  console.log("my chart data");
  console.log(data, options);
  return { data, options };
};

const pullPlugins = (info) => {
  const { plugins, hasOptions } = info;
  let pluginString = hasOptions ? "" : "{";
  pluginString += " plugins: [";
  plugins.forEach((data) => {
    const { pluginID, pluginParameters } = data;
    pluginString += pluginID && pluginScripts[pluginID] ? pluginScripts[pluginID](pluginParameters) + "," : null;
  });
  return pluginString + "]}";
};

const generateChart = (pluginID) => {
  let { data, options, plugin } = pullChartistInfo(pluginID);
  console.log("asdasdasdsa");
  console.log(plugin);
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
  const options = null;
  updateChartistInfo(data, options, null);
};

export { addPlugin, pullChartistInfo, pullPlugins, updateChartistInfo, sampleInsert, generateChart };

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
//new Chartist.Bar("#chart", {"labels":[1,2,3,4,5,6,7],"series":[[1,5,3,4,6,2,3],[2,4,2,5,4,3,6]]}, {"chartPadding":{"top":20,"right":20,"bottom":20,"left":20},"height":400, { plugins: [nullnull]});
