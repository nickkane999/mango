import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./ChartMenu.scss";
import { chartLayouts } from "../data/layouts";
//import ChartSection from "./ChartSection";
import ChartForm from "./ChartForm";
//import PieChartArea from "./PieChart";

function ChartMenu() {
  const [selectedChartName, setSelectedChartName] = useState("Select a Chart Type");
  const [currentComponent, setCurrentComponent] = useState(null);

  const selectChartType = (key) => {
    let data = chartLayouts[key];
    data.settings.chartType = key;
    setSelectedChartName(data.title);
    //setSelectedOption(data);
    //setCurrentComponent(<ChartSection settings={data.settings} chartType={key} />);
    setCurrentComponent(<ChartForm settings={data.settings} />);
  };

  const displayChartOptions = () => {
    // loop through the chartLayouts object and return a dropdown item for each
    return Object.keys(chartLayouts).map((chart) => {
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
