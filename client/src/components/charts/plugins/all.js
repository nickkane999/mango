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
  positionFunction: "return data.x1;",
  labelOffsetX: 0,
  labelOffsetY: 10,
  textFunction: "return text + '$';",
  labelClass: "ct-label",
};
const legendPluginParameters = {
  positionFunction: "return data.x1;",
  labelOffsetX: 0,
  labelOffsetY: 10,
  textFunction: "return text + '$';",
  labelClass: "ct-label",
};
const axisPluginParameters = {
  axisXTitle: "My Title",
  axisXClass: "ct-axis-title",
  axisXAnchor: null,
  axisYTitle: "Dank charts",
  axisYClass: "ct-axis-title",
  axisYAnchor: true,
  flipTitle: false,
};

const pluginData = {
  addPointLabels1: {
    loadingJS: CT_POINT_LABELS,
    parameterJS: addPointLabels1String,
    parameterDefault: barPluginParameters,
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
