import React, { useEffect, useRef } from "react";
import "./Test.scss";
import { CT_POINT_LABELS } from "./plugins/labelLineChart";
import { CT_BAR_LABELS } from "./plugins/labelBarChart";
import { CT_BAR_LEGEND } from "./plugins/legendBarChart";
import { CT_AXIS_TITLE } from "./plugins/axisTitleChart";
import { addPlugin, pullChartistInfo, updateChartistInfo, sampleInsert } from "../../components/charts/util/charts";
import { user } from "../../util/general";

function Test() {
  sampleInsert();
  addPlugin(CT_POINT_LABELS, "addPointLabels1");
  addPlugin(CT_BAR_LABELS, "addBarLabels1");
  //addPlugin(CT_BAR_LEGEND, "addBarLegend1");
  addPlugin(CT_AXIS_TITLE, "addAxisTitle");

  const pluginParameters = {
    positionFunction: "return data.x1;",
    labelOffsetX: 0,
    labelOffsetY: 10,
    textFunction: "return text + '$';",
    labelClass: "ct-label",
  };
  const pluginVars = { pluginID: "addAxisTitle", pluginParameters };
  let { data, options, plugin } = pullChartistInfo(pluginVars);
  console.log("btw, this is");
  console.log(data, options, plugin);
  if (data && plugin) {
    console.log(`new Function('return new Chartist.Bar("#chart", ${data}, ${plugin});`);
    const makeChart = new Function(`new Chartist.Bar("#chart", ${data}, ${plugin});`);
    makeChart();
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
/*
return new Chartist.Bar(
  "#chart",
  {
    labels: [1, 2, 3, 4, 5, 6, 7],
    series: [
      [1, 5, 3, 4, 6, 2, 3],
      [2, 4, 2, 5, 4, 3, 6],
    ],
  },
  {
    plugins: [
      ctBarLabels({
        position: {
          x: function (data) {
            return data.x1;
          },
        },
        labelOffset: { y: -10 },
        labelInterpolationFnc: function (text) {
          return text + "%";
        },
        labelClass: "ct-label",
      }),
    ],
  }
);
*/
/*
new Function(`new Chartist.Bar("#chart", {"labels":[1,2,3,4,5,6,7],"series":[[1,5,3,4,6,2,3],[2,4,2,5,4,3,6]]}, {
  plugins: [
    ctBarLabels({
      position: {
        x: function (data) {
          return data.x1
      },
      labelOffset: {
        x: 0,
        y: -10
      },
      labelInterpolationFnc: function (text) {
        return text + '$'
      },
      labelClass: ct-label
    }),
  ],
}); `);


new Function('return new Chartist.Bar(
  "#chart",
{
  "labels":[1,2,3,4,5,6,7],
  "series":[
    [1,5,3,4,6,2,3],
    [2,4,2,5,4,3,6]
  ]
}, 
{
  plugins: [
    ctBarLabels({
      position: {
        x: function (data) {
          return data.x1
      },
      labelOffset: {
        x: 0,
        y: -10
      },
      labelInterpolationFnc: function (text) {
        return text + '$'
      },
      labelClass: ct-label
    }),
  ],
});
*/
