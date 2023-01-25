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

export { plugins, pluginStrings };
