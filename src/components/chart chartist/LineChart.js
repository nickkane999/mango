import React, { useEffect, useState, useRef } from "react";
import { LineChart } from "chartist";
import { Container } from "react-bootstrap";
import "./ChartStyling.css";

function LineChartArea() {
  /*
  const [data, setData] = useState(false);

  let info = {
    // A labels array that can contain any sort of values
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    // Our series array that contains series objects or in this case series data arrays
    series: [[5, 2, 4, 2, 0]],
  };
  setData(info);
  */

  const data = {
    series: [20, 10, 30, 40],
  };
  const options = {};
  const type = "Pie";
  const chartContainer = useRef(null);

  useEffect(() => {
    const chart = new LineChart(
      chartContainer.current,
      {
        // The labels array is used to describe the data points.
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        // The series array is used to store the data for the chart.
        series: [[5, 2, 4, 2, 0]],
      },
      {
        // The options object is used to customize the chart.
        fullWidth: true,
        chartPadding: {
          right: 40,
        },
      }
    );
  }, []);

  return (
    <Container>
      <div id="chart" ref={chartContainer}></div>
    </Container>
  );
}

export default LineChartArea;
