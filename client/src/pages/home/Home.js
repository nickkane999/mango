import React from "react";
import "./Home.css";
import ChartistGraph from "react-chartist";
import ChartistTooltip from "chartist-plugin-tooltips-updated";

let chartA = {
  labels: ["a", "b"],
  series: [
    [
      { meta: "value is:", value: 3 },
      { meta: "value is:", value: 5 },
    ],
    [
      { meta: "value is:", value: 7 },
      { meta: "value is:", value: 9 },
    ],
  ],
};

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

let pieChart = {
  labels: ["A", "B", "C"],
  series: [
    { meta: "A value is:", value: 10 },
    { meta: "B value is:", value: 30 },
    { meta: "C value is:", value: 60 },
  ],
};

function Home() {
  let optionsA = {
    plugins: [
      ChartistTooltip({
        appendToBody: true,
      }),
    ],
  };

  let optionsB = {
    plugins: [
      ChartistTooltip({
        appendToBody: true,
      }),
    ],
  };

  let pieOptions = {
    showLabel: false,
    ignoreEmptyValues: false,
    plugins: [ChartistTooltip({ appendToBody: true })],
  };
  return (
    <div>
      <h1>Home</h1>
      <h2>Goal of Mango</h2>
      <p>This app will help you build charts more quickly. The goal is to use a UI to fully customize charts instead of having to update code.</p>
      <p>Code may still need to be edited directly for updates, but over time the goal is for users to able to fully customize and save a chart without having to update code</p>

      <h4>Chart A</h4>
      <ChartistGraph data={chartA} options={optionsA} type={"Line"} />

      <h4>Chart B</h4>
      <ChartistGraph data={chartB} options={optionsB} type={"Bar"} />

      <h4>Pie Chart</h4>
      <ChartistGraph data={pieChart} options={pieOptions} type={"Pie"} />

      <h4>Chart A</h4>
      <ChartistGraph data={chartA} options={optionsA} type={"Bar"} />

      <h4>Chart B</h4>
      <ChartistGraph data={chartB} options={optionsB} type={"Bar"} />

      <h4>Pie Chart</h4>
      <ChartistGraph data={pieChart} options={pieOptions} type={"Pie"} />
    </div>
  );
}

export default Home;
