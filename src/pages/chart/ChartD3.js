import React, { useEffect, useState } from "react";
import ChartMenu from "../../components/chart d3/ChartMenu";
import ChartArea from "../../components/chart d3/ChartArea";
import * as BarChart from "../../components/chart d3/BarChart";
import * as ChartUtil from "../../components/chart d3/ChartUtil";
import "./ChartD3.css";

function ChartD3() {
  const [data, setData] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let chartFile = "http://localhost:3000/src/data/sample.json";
    ChartUtil.pullData(chartFile).then((info) => {
      setData(info);
      //console.log("my data");
      //console.log(info);
      BarChart.load(info);
    });
  };

  return (
    <div>
      <h1>Chart Builder - D3</h1>
      <ChartMenu />
      <ChartArea />
    </div>
  );
}

export default ChartD3;
