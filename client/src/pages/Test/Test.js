import React, { useEffect, useRef } from "react";
import "./Test.scss";
import { pluginStrings } from "./plugins/all";
import { addPlugin, pullChartistInfo, updateChartistInfo, sampleInsert, pullPlugins } from "../../components/charts/util/charts";
import { user } from "../../util/general";

function Test() {
  const { CT_POINT_LABELS, CT_BAR_LABELS, CT_BAR_LEGEND, CT_AXIS_TITLE } = pluginStrings;
  sampleInsert();
  addPlugin(CT_POINT_LABELS, "addPointLabels1");
  addPlugin(CT_BAR_LABELS, "addBarLabels1");
  addPlugin(CT_BAR_LEGEND, "addBarLegend1");
  addPlugin(CT_AXIS_TITLE, "addAxisTitle");

  const pluginParameters = {
    positionFunction: "return data.x1;",
    labelOffsetX: 0,
    labelOffsetY: 10,
    textFunction: "return text + '$';",
    labelClass: "ct-label",
  };
  const pluginParameters2 = {
    axisXTitle: "My Title",
    axisXClass: "ct-axis-title",
    axisXAnchor: null,
    axisYTitle: "Dank charts",
    axisYClass: "ct-axis-title",
    axisYAnchor: true,
    flipTitle: false,
  };
  const plugins = [
    { pluginID: "addBarLegend1", pluginParameters: pluginParameters },
    { pluginID: "addAxisTitle", pluginParameters: pluginParameters2 },
    { pluginID: "addBarLabels1", pluginParameters: pluginParameters },
  ];
  const pluginInfo = { hasOptions: true, plugins };

  let { data, options } = pullChartistInfo();
  let plugin = pullPlugins(pluginInfo);
  options = { chartPadding: { top: 20, right: 20, bottom: 20, left: 20 }, height: 400 };
  options = JSON.stringify(options).slice(0, -1);
  if (options) {
    console.log(data, options, plugin);
  }
  if (data && plugin) {
    let makeChart = "";
    if (options) {
      console.log(`new Function('return new Chartist.Bar("#chart", ${data}, ${options}, ${plugin});`);
      makeChart = new Function(`new Chartist.Bar("#chart", ${data}, ${options}, ${plugin});`);
    } else {
      //console.log(`new Function('return new Chartist.Bar("#chart", ${data}, ${plugin});`);
      makeChart = new Function(`new Chartist.Bar("#chart", ${data}, ${plugin});`);
    }
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

/*
new Chartist.Bar(
  "#chart",
  {
    labels: [1, 2, 3, 4, 5, 6, 7],
    series: [
      [1, 5, 3, 4, 6, 2, 3],
      [2, 4, 2, 5, 4, 3, 6],
    ],
  },
  { height: 400 
    plugins: [
      Chartist.plugins.ctAxisTitle({
        axisX: { axisTitle: "Time (mins)", axisClass: "ct-axis-title", offset: { x: 0, y: 50 }, textAnchor: "middle" },
        axisY: { axisTitle: "Goals", axisClass: "ct-axis-title", offset: { x: 0, y: -1 }, flipTitle: false },
      }),
    ],  
  },
);
*/
