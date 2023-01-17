import React, { useState } from "react";
import { Form, Button, Container, Dropdown, DropdownButton } from "react-bootstrap";
import * as chartUtil from "./BarChart-old";
import "./ChartMenu.css";
import BarChartForm from "./forms/BarChartForm";
import LineChartForm from "./forms/LineChartForm";
import GroupedBarChartForm from "./forms/GroupedBarChartForm";
import LineChartArea from "./LineChart";
import BarChartArea from "./BarChart";
import PieChartArea from "./PieChart";

function ChartMenu() {
  const [data, setData] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [currentComponent, setCurrentComponent] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    let nums = data.split(",");
    nums.forEach((ele, i) => {
      nums[i] = parseInt(ele.trim());
    });
    chartUtil.loadNumbers(nums);
  };

  const selectChartType = (value) => {
    let chartType = value;
    setSelectedOption(chartType);
    switch (chartType) {
      case "Bar Chart":
        setCurrentComponent(<BarChartForm />);
        console.log("bar chart selected");
        break;
      case "Grouped Bar Chart":
        setCurrentComponent(<BarChartForm />);
        console.log("bar chart selected");
        break;
      case "Line Chart":
        setCurrentComponent(<LineChartForm />);
        console.log("line chart selected");
        // code to create a line chart
        break;
      case "Pie Chart":
        setCurrentComponent(<PieChartArea />);
        console.log("line chart selected");
        // code to create a line chart
        break;
      default:
        // code to handle invalid or undefined options
        break;
    }
  };

  return (
    <div className="chart-form">
      <Dropdown id="dropdown-chart-type" onSelect={selectChartType}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Select an option
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="Bar Chart">Bar Chart</Dropdown.Item>
          <Dropdown.Item eventKey="Grouped Bar Chart">Grouped Bar Chart</Dropdown.Item>
          <Dropdown.Item eventKey="Line Chart">Line Chart</Dropdown.Item>
          <Dropdown.Item eventKey="Pie Chart">Pie Chart</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {currentComponent || <p>Select the form to fill in</p>}
    </div>
  );
  /*
return (
    <Container>
        <Form onSubmit={handleSubmit}>
            <DropdownButton id="dropdown-basic-button" title={selectedOption || 'Select chart type'}>
                <Dropdown.Item onClick={selectChartType} value="Bar Chart">Bar Chart</Dropdown.Item>
                <Dropdown.Item onClick={selectChartType} value="Line Chart">Line Chart</Dropdown.Item>
            </DropdownButton>            
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Data</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter new data for chart"
                value={data}
                onChange={(event) => setData(event.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Update
            </Button>
        </Form>
    </Container>
  );
    */
}

export default ChartMenu;
