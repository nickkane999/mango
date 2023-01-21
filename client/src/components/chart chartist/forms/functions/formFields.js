import { useState } from "react";

const updateFormInput = (event, settings) => {
  console.log("updateFormInput settings");
  console.log(settings);

  const { setFormData } = settings.sessionStorage;
  let { name, value } = event.target;
  if (value.indexOf(",") !== -1) {
    value = value.split(",");
    if (name === "series") {
      value = value.map((item) => {
        return parseInt(item);
      });
      let seriesArray = [];
      seriesArray.push(value);
      setFormData((formData) => ({ ...formData, [name]: seriesArray }));
      return;
    }
  }
  setFormData((formData) => ({ ...formData, [name]: value }));
};

const updateFormCheckbox = (event, settings) => {
  const setFormData = settings.functions.setFormData;
  console.log("updateFormCheckbox settings");
  console.log(settings);

  const { name } = event.target;
  setFormData((formData) => ({ ...formData, [name]: event.target.checked }));
  //console.log(formData);
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

export { updateFormInput, updateFormCheckbox, updateFormData };
