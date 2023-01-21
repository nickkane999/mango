import React, { useEffect, useState } from "react";
import ChartMenu from "../../components/chart d3/ChartMenu";
import ChartArea from "../../components/chart d3/ChartArea";
import "./ChartD3.css";

function ChartD3() {
  return (
    <div>
      <h1>Chart Builder - D3</h1>
      <ChartMenu />
      <ChartArea />
    </div>
  );
}

export default ChartD3;
