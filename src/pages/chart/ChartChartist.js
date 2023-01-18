import React, { useEffect } from "react";
import ChartMenu from "../../components/chart chartist/ChartMenu";
import * as ChartUtil from "../../components/chart chartist/ChartUtil";
import "./ChartChartist.css";

function ChartChartist() {
  useEffect(() => {}, []);

  const fetchData = () => {
    let chartFile = "http://localhost:3000/src/data/sample.json";
    ChartUtil.pullData(chartFile).then((info) => {
      //setData(info);
      //console.log("my data");
      //console.log(info);
      //BarChart.load(info);
    });
  };

  return (
    <div>
      <h1>Chart Builder - Chartist</h1>
      <ChartMenu />
    </div>
  );
}

export default ChartChartist;
