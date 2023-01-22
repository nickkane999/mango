import React, { useEffect, useRef } from "react";
import "./Test.css";
import "./testScript";
import { CT_POINT_LABELS } from "./plugins/labelLineChart";
import { addPlugin, addJSFile } from "../../components/charts/util/addPlugin";
import { user } from "../../util/general";

function Test() {
  const scriptRef = useRef(null);
  addPlugin(CT_POINT_LABELS, "addPointLabels1");

  let samplePlugin = `{
    plugins: [
      ctPointLabels({
        textAnchor: "middle",
        labelInterpolationFnc: function (value) {
          return "$" + value.toFixed(2);
        },
      }),
    ],
}
  `;
  let data = document.querySelector('script[data-json="data"]');
  if (data) {
    data = data.innerHTML;
  }
  let options = document.querySelector('script[options-json="data"]');
  if (options) {
    options = options.innerHTML;
  }
  console.log(data);
  console.log(options);
  const string = `return new Chartist.Line("#chart", ${data}, ${samplePlugin});`;
  const makeChart = new Function(`return new Chartist.Line("#chart", ${data}, ${samplePlugin});`)();
  //const string = `return new Chartist.Line("#chart", ${data}, ${options}, ${samplePlugin});`;
  //const makeChart = new Function(`return new Chartist.Line("#chart", ${data}, ${options}, ${samplePlugin});`)();
  console.log(string);

  return (
    <div>
      <h1>JS Test</h1>
      <div id="chart"></div>
    </div>
  );
}

export default Test;
