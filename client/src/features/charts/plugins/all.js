import { CT_POINT_LABELS, addPointLabels1String } from "./labelLineChart";
import { CT_BAR_LABELS, addBarLabels1String } from "./labelBarChart";
import { CT_BAR_LEGEND, addBarLegend1String } from "./legendBarChart";
import { CT_AXIS_TITLE, addAxisTitleString } from "./axisTitleChart";

const plugins = {
  addPointLabels1: addPointLabels1String,
  addBarLabels1: addBarLabels1String,
  addBarLegend1: addBarLegend1String,
  addAxisTitle: addAxisTitleString,
};

const pluginStrings = {
  CT_POINT_LABELS: CT_POINT_LABELS,
  CT_BAR_LABELS: CT_BAR_LABELS,
  CT_BAR_LEGEND: CT_BAR_LEGEND,
  CT_AXIS_TITLE: CT_AXIS_TITLE,
};

const barPluginParameters = {
  positionFunction: { name: "Position Function Bar", data: "return data.x1;", key: "positionFunctionBarPlugin", type: "input", default: true },
  labelOffsetX: { name: "Label Offset X Bar", data: 0, key: "labelOffsetXBarPlugin", type: "input", default: true },
  labelOffsetY: { name: "Label Offset Y Bar", data: -10, key: "labelOffsetYBarPlugin", type: "input", default: true },
  textFunction: { name: "Text Function Bar", data: "return text + '$';", key: "textFunctionBarPlugin", type: "input", default: true },
  labelClass: { name: "Label Class Bar", data: "ct-label", key: "labelClassBarPlugin", type: "input", default: true },
};
const legendPluginParameters = {
  positionFunction: { name: "Position Function Legend", data: "return data.x1;", key: "positionFunctionLegendPlugin", type: "input", default: true },
  labelOffsetX: { name: "Label Offset X Legend", data: 0, key: "labelOffsetXLegendPlugin", type: "input", default: true },
  labelOffsetY: { name: "Label Offset Y Legend", data: -10, key: "labelOffsetYLegendPlugin", type: "input", default: true },
  textFunction: { name: "Text Function Legend", data: "return text + '$';", key: "textFunctionLegendPlugin", type: "input", default: true },
  labelClass: { name: "Label Class Legend", data: "ct-label", key: "labelClassLegendPlugin", type: "input", default: true },
};
const axisPluginParameters = {
  axisXTitle: { name: "Axis X Title Axis Plugin", data: "My Title", key: "axisXTitleAxisPlugin", type: "input", default: true },
  axisXClass: { name: "Axis X Class Axis Plugin", data: "ct-axis-title", key: "axisXClassAxisPlugin", type: "input", default: true },
  axisXAnchor: { name: "Axis X Anchor Axis Plugin", data: null, key: "axisXAnchorAxisPlugin", type: "input", default: true },
  axisYTitle: { name: "Axis Y Title Axis Plugin", data: "Dank charts", key: "axisYTitleAxisPlugin", type: "input", default: true },
  axisYClass: { name: "Axis Y Class Axis Plugin", data: "ct-axis-title", key: "axisYClassAxisPlugin", type: "input", default: true },
  axisYAnchor: { name: "Axis Y Anchor Axis Plugin", data: true, key: "axisYAnchorAxisPlugin", type: "checkbox", default: true },
  flipTitle: { name: "Flip Title Axis Plugin", data: true, key: "flipTitleAxisPlugin", type: "checkbox", default: true },
};

const pluginData = {
  addPointLabels1: {
    loadingJS: CT_POINT_LABELS,
    parameterJS: addPointLabels1String,
    parameterSettings: barPluginParameters,
  },
  addBarLabels1: {
    loadingJS: CT_BAR_LABELS,
    parameterJS: addBarLabels1String,
    parameterSettings: barPluginParameters,
  },
  addBarLegend1: {
    loadingJS: CT_BAR_LEGEND,
    parameterJS: addBarLegend1String,
    parameterSettings: legendPluginParameters,
  },
  addAxisTitle: {
    loadingJS: CT_AXIS_TITLE,
    parameterJS: addAxisTitleString,
    parameterSettings: axisPluginParameters,
  },
};

export { plugins, pluginStrings, pluginData };