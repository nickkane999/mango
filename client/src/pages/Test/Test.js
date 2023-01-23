import React, { useEffect, useRef } from "react";
import "./Test.css";
import { CT_POINT_LABELS } from "./plugins/labelLineChart";
import { addPlugin, pullChartistInfo, updateChartistInfo, sampleInsert } from "../../components/charts/util/charts";
import { user } from "../../util/general";

function Test() {
  sampleInsert();
  addPlugin(CT_POINT_LABELS, "addPointLabels1");
  let { data, options, plugin } = pullChartistInfo("addPointLabels1");
  if (data && plugin) {
    const makeChart = new Function(`return new Chartist.Line("#chart", ${data}, ${plugin});`)();
  }

  return (
    <div>
      <h1>JS Test</h1>
      {!data || !plugin ? <p> No data or plugin info found </p> : null}
      <div id="chart"></div>
    </div>
  );
}

export default Test;
