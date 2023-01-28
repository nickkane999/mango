import { createChartFromJSONData } from "./chartSettings.js";

const updateFormInput = (event, settings, type) => {
  const { setFormData, setPluginFormData } = settings.sessionStorage;
  let { name, value } = event.target;
  if (value.indexOf(",") !== -1) {
    value = value.split(",");
    if (name === "series") {
      value = value.map((item) => {
        return parseInt(item);
      });
      let seriesArray = [];
      seriesArray.push(value);
      type !== "plugin" ? setFormData((formData) => ({ ...formData, [name]: seriesArray })) : setPluginFormData((formData) => ({ ...formData, [name]: value }));
      return;
    }
  }
  type !== "plugin" ? setFormData((formData) => ({ ...formData, [name]: value })) : setPluginFormData((formData) => ({ ...formData, [name]: value }));
};

const updateFormCheckbox = (event, settings, type) => {
  const { setFormData, setPluginFormData } = settings.sessionStorage;
  const { name } = event.target;
  type !== "plugin" ? setFormData((formData) => ({ ...formData, [name]: event.target.checked })) : setPluginFormData((formData) => ({ ...formData, [name]: event.target.checked }));
};

const updateFormData = (chartData) => {
  // Console log statements help determine if saved json data has same (no extra)
  // fields compared to the fields defined in the respective form-data file
  Object.entries(chartData).forEach(([key, value]) => {
    //console.log(`${key}: ${value}`);
    if (typeof value === "boolean") {
      //console.log(`${key}: ${value}`);
      document.querySelector(`.${key} input`).checked = value;
    } else {
      //console.log("could be funny data type");
      //console.log(`${key}: ${value}`);
      document.querySelector(`.${key} input`).value = value;
    }
  });
};

const handleSubmit = (event, settings) => {
  event.preventDefault();
  const formData = settings.functions.getUpdatedFormData();
  createChartFromJSONData(settings, formData);
};

export { updateFormInput, updateFormCheckbox, updateFormData, handleSubmit };
