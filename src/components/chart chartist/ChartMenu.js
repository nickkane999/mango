import React, { useState } from "react";
import { Form, Button, Container, Dropdown, DropdownButton } from "react-bootstrap";
import "./ChartMenu.css";
import { chartLayouts } from "./ChartData";
import ChartSection from "./forms/ChartSection";
import PieChartArea from "./PieChart";

function ChartMenu() {
  const [data, setData] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [currentComponent, setCurrentComponent] = useState(null);

  const selectChartType = (key) => {
    console.log(key);
    let data = chartLayouts[key];
    setSelectedOption(data);
    setCurrentComponent(<ChartSection fields={data.fields} createChart={data.createChart} />);
  };

  const displayChartOptions = () => {
    // loop through the chartLayouts object and return a dropdown item for each
    return Object.keys(chartLayouts).map((chart) => {
      console.log(chartLayouts[chart].title);
      return <Dropdown.Item eventKey={chartLayouts[chart].key}>{chartLayouts[chart].title}</Dropdown.Item>;
    });
  };

  return (
    <div className="chart-form">
      <Dropdown id="dropdown-chart-type" onSelect={selectChartType}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select an option
        </Dropdown.Toggle>
        <Dropdown.Menu>{displayChartOptions()}</Dropdown.Menu>
      </Dropdown>

      {currentComponent || <p>Select the form to fill in</p>}
    </div>
  );
}

export default ChartMenu;
