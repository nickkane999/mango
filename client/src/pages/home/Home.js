import React from "react";
import ReactDOM from "react-dom";
import "./Home.css";
import ChartistGraph from "react-chartist";
import ChartistTooltip from "chartist-plugin-tooltips-updated";
import "bootstrap/dist/css/bootstrap.css";

let chartB = {
  labels: ["y", "z"],
  series: [
    [
      { meta: "value is:", value: 2 },
      { meta: "value is:", value: 4 },
    ],
    [
      { meta: "value is:", value: 6 },
      { meta: "value is:", value: 8 },
    ],
  ],
};

function Home() {
  let optionsB = {
    plugins: [
      ChartistTooltip({
        label: function (tooltipItem) {
          console.log("apple");
          console.log(chartB.series[tooltipItem.seriesIndex][tooltipItem.index].meta);
          return chartB.series[tooltipItem.seriesIndex][tooltipItem.index].meta;
        },
      }),
    ],
  };

  return (
    <div>
      <h1>Home</h1>
      <h2>Goal of Mango</h2>
      <p>This app will help you build charts more quickly. The goal is to use a UI to fully customize charts instead of having to update code.</p>
      <p>Code may still need to be edited directly for updates, but over time the goal is for users to able to fully customize and save a chart without having to update code</p>
      <h4>Chart B</h4>
      <ChartistGraph data={chartB} options={optionsB} type={"Bar"} />
    </div>
  );
}

export default Home;
