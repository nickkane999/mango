import React, { useState } from "react";
import { Form, Button, Container, Dropdown, DropdownButton } from "react-bootstrap";
import "./ChartMenu.css";
import BarChartForm from "./forms/BarChartForm";
import GroupedBarChartForm from "./forms/GroupedBarChartForm";

function ChartMenu() {
  const [data, setData] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [currentComponent, setCurrentComponent] = useState(null);

  const selectChartType = (value) => {
    let chartType = value;
    setSelectedOption(chartType);
    switch (chartType) {
      case "Bar Chart":
        setCurrentComponent(<BarChartForm />);
        console.log("bar chart selected");
        break;
      case "Grouped Bar Chart":
        setCurrentComponent(<GroupedBarChartForm />);
        console.log("bar chart selected");
        break;
      case "Line Chart":
        setCurrentComponent(<BarChartForm />);
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
        </Dropdown.Menu>
      </Dropdown>

      {currentComponent || <p>Select the form to fill in</p>}
    </div>
  );
  /*
const { Control, Label, Group } = Form;

return (
    <Container>
        <Form onSubmit={handleSubmit}>
            <DropdownButton id="dropdown-basic-button" title={selectedOption || 'Select chart type'}>
                <Dropdown.Item onClick={selectChartType} value="Bar Chart">Bar Chart</Dropdown.Item>
                <Dropdown.Item onClick={selectChartType} value="Line Chart">Line Chart</Dropdown.Item>
            </DropdownButton>            
            <Group controlId="formBasicEmail">
                <Label>Data</Label>
                <Control
                type="text"
                placeholder="Enter new data for chart"
                value={data}
                onChange={(event) => setData(event.target.value)}
                />
            </Group>

            <Button variant="primary" type="submit">
                Update
            </Button>
        </Form>
    </Container>
  );
    */
}

export default ChartMenu;
