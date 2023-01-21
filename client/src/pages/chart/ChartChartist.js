import React, { useEffect } from "react";
import ChartMenu from "../../components/chart chartist/ChartMenu";
import * as ChartUtil from "../../components/chart chartist/ChartUtil";
import "./ChartChartist.css";

function ChartChartist() {
  return (
    <div>
      <h1>Chart Builder - Chartist</h1>
      <ChartMenu />
    </div>
  );
}

export default ChartChartist;
