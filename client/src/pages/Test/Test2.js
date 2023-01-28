import React, { useEffect, useRef } from "react";
import "./Test.scss";
import { pluginStrings } from "./plugins/all";
import { addPlugin, pullChartistInfo, updateChartistInfo, sampleInsert, pullPlugins } from "../../features/charts/util/charts";
import { user } from "../../util/general";
//import "./plugins/plugins.js";
//import "./plugins/myChart.js";
function Test() {
  const { CT_POINT_LABELS, CT_BAR_LABELS, CT_BAR_LEGEND, CT_AXIS_TITLE } = pluginStrings;
  //sampleInsert();
  addPlugin(CT_POINT_LABELS, "addPointLabels1");
  addPlugin(CT_BAR_LABELS, "addBarLabels1");
  addPlugin(CT_BAR_LEGEND, "addBarLegend1");
  addPlugin(CT_AXIS_TITLE, "addAxisTitle");

  return (
    <div>
      <h1>JS Test</h1>
      <div id="chart"></div>
    </div>
  );
}

export default Test;
