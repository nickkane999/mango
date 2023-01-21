import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./ChartMenu.css";
import { chartLayouts } from "./ChartData";
import ChartSection from "./forms/ChartSection";
//import PieChartArea from "./PieChart";

function ChartMenu() {
  const [selectedChartName, setSelectedChartName] = useState("Select a Chart Type");
  const [currentComponent, setCurrentComponent] = useState(null);

  const selectChartType = (key) => {
    let data = chartLayouts[key];
    setSelectedChartName(data.title);
    //setSelectedOption(data);
    setCurrentComponent(<ChartSection settings={data.settings} chartType={key} />);
  };

  const displayChartOptions = () => {
    // loop through the chartLayouts object and return a dropdown item for each
    return Object.keys(chartLayouts).map((chart) => {
      //console.log(chartLayouts[chart].title);
      return <Dropdown.Item eventKey={chartLayouts[chart].key}>{chartLayouts[chart].title}</Dropdown.Item>;
    });
  };

  return (
    <div className="chart-form">
      <Dropdown id="dropdown-chart-type" className="chart-select" onSelect={selectChartType}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedChartName ? selectedChartName : "Select a Chart Type"}
        </Dropdown.Toggle>
        <Dropdown.Menu>{displayChartOptions()}</Dropdown.Menu>
      </Dropdown>

      {currentComponent || <p>Select the form to fill in</p>}
    </div>
  );
}

export default ChartMenu;
