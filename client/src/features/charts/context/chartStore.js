import React, { useState, createContext } from "react";
import {
  updateChartJSON,
  loadChartJSON,
  saveChartJSON,
  updateChartForAccount,
  hasChartType,
  loadChartJSONTemplate,
  loadChartJSONFromAccount,
  updateChartJSONWithFormData,
  saveChartFile,
} from "../util/chartSettings";
import { updateFormInput, updateFormCheckbox, updateFormData, handleSubmit } from "../util/formFields";

export const initialState = {
  misc: {
    chartContainer: null,
    chartType: null,
    fields: null,
    template: null,
  },
  functions: {
    createChart: null,
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
    updateChartJSONWithFormData: updateChartJSONWithFormData,
    saveChartFile: saveChartFile,
    handleSubmit: handleSubmit,
    getUpdatedFormData: null,
    getUpdatedChartJSON: null,
    updateChartQuery: null,
    createChartQuery: null,
  },
  sessionStorage: {
    setChartJSON: null,
    setFormData: null,
    chartJSON: null,
    formData: null,
  },
};

const ChartContext = createContext(initialState);

export const ChartProvider = ({ children }) => {
  const [chartInfo, setChartInfo] = useState(initialState);
  return <ChartContext.Provider value={{ chartInfo, setChartInfo }}>{children}</ChartContext.Provider>;
};

export const updateSessionInfo = (info) => {
  const { settings } = info;
  const {
    getUpdatedFormData,
    getUpdatedPluginFormData,
    getUpdatedChartJSON,
    setChartJSON,
    setFormData,
    updateChartQuery,
    createChartQuery,
    createChartData,
    template,
    fields,
    chartType,
    selectedPlugin,
    setSelectedPlugin,
    setPluginFormData,
    saveChartFile,
    setSaveChartFile,
    pluginData,
  } = info;
  settings.functions.getUpdatedFormData = getUpdatedFormData;
  settings.functions.getUpdatedPluginFormData = getUpdatedPluginFormData;
  settings.functions.getUpdatedChartJSON = getUpdatedChartJSON;
  settings.sessionStorage.setChartJSON = setChartJSON;
  settings.sessionStorage.setFormData = setFormData;
  settings.sessionStorage.setPluginFormData = setPluginFormData;
  settings.sessionStorage.saveChartFile = saveChartFile;
  settings.sessionStorage.setSaveChartFile = setSaveChartFile;
  settings.sessionStorage.setSelectedPlugin = setSelectedPlugin;
  settings.functions.updateChartQuery = updateChartQuery;
  settings.functions.createChartQuery = createChartQuery;
  settings.functions.createChartData = createChartData;
  settings.misc.template = template;
  settings.misc.fields = fields;
  settings.misc.chartType = chartType;
  settings.misc.pluginData = pluginData;
  settings.misc.selectedPlugin = selectedPlugin;

  return settings;
};

export default ChartContext;
