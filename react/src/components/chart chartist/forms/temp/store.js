import React, { useState, useContext, createContext, useRef } from "react";
import { updateChartJSON, loadChartJSON, saveChartJSON, updateChartForAccount, hasChartType, loadChartJSONTemplate, loadChartJSONFromAccount } from "../functions/chartSettings";
import { updateFormInput, updateFormCheckbox, updateFormData } from "../functions/formFields";
import { handleSubmit } from "../functions/handleSubmit";

export const initialState = {
  misc: {
    chartContainer: null,
    chartType: null,
    fields: null,
    template: null,
    /*
    chartType: props.chartType,
    fields: fields,
    template: template,
    */
  },
  functions: {
    createChart: null,
    /* createChart: createChart, */
    updateFormInput: updateFormInput,
    updateFormCheckbox: updateFormCheckbox,
    updateFormData: updateFormData,
    updateChartJSON: updateChartJSON,
    loadChartJSON: loadChartJSON,
    saveChartJSON: saveChartJSON,
    updateChartForAccount: updateChartForAccount,
    hasChartType: hasChartType,
    loadChartJSONTemplate: loadChartJSONTemplate,
    loadChartJSONFromAccount: loadChartJSONFromAccount,
    handleSubmit: handleSubmit,
    getUpdatedFormData: null,
    getUpdatedChartJSON: null,
    updateChartQuery: null,
    createChartQuery: null,
    /*    
    getUpdatedFormData: getUpdatedFormData,
    getUpdatedChartJSON: getUpdatedChartJSON,
    updateChartQuery: updateChartQuery,
    createChartQuery: createChartQuery,
    */
  },
  sessionStorage: {
    setChartJSON: null,
    setFormData: null,
    chartJSON: null,
    formData: null,
    /*
    setChartJSON: setChartJSON,
    setFormData: setFormData,
    */
  },
};

export const initialState2 = {
  description: "session storage used to render sections of chart page and make it functional",
};

const ChartContext = createContext(initialState);

export const ChartProvider = ({ children }) => {
  const [chartInfo, setChartInfo] = useState(initialState);
  console.log("ChartProvider");
  console.log(chartInfo);

  return <ChartContext.Provider value={{ chartInfo, setChartInfo }}>{children}</ChartContext.Provider>;
};

export default ChartContext;
