import React, { useEffect, useState } from 'react';
import ChartMenu from '../../components/chart/ChartMenu';
import ChartArea from '../../components/chart/ChartArea';
import * as BarChart from '../../components/chart/BarChart';
import * as ChartUtil from '../../components/chart/ChartUtil';
import './Chart.css';


function Chart() {
  const [data, setData] = useState(false);
    
  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = () => {
    let chartFile = "http://localhost:3000/src/data/sample.json"
    ChartUtil.pullData(chartFile)
    .then((info) => {
      setData(info);
      //console.log("my data");
      //console.log(info);
      BarChart.load(info);

    });
  }

  return (
    <div>
      <h1>Chart Builder</h1>
      <ChartMenu />
      <ChartArea />
    </div>
  );
}

export default Chart;

