const div = document.querySelector("#chartist-info");

const addPlugin = (pluginString, id) => {
  const scriptPlugin = document.createElement("script");
  if (!document.querySelector(`script[data-plugin="${id}"]`)) {
    scriptPlugin.setAttribute("data-plugin", id);
    scriptPlugin.innerHTML = pluginString;
    div.appendChild(scriptPlugin);
  }
};

const addJSFile = (file, id) => {
  const script = document.createElement("script");
  if (!document.querySelector(`script[data-file="${id}"]`)) {
    script.setAttribute("data-file", id);
    script.src = file;
    script.async = true;
    div.appendChild(script);
  }
};

export { addPlugin, addJSFile };
