import { Form, Button, Col, Dropdown } from "react-bootstrap";
import { useState } from "react";
const { Group } = Form;
const { Menu, Toggle, Item } = Dropdown;

const LoadChart = (props) => {
  const [selectedChart, setSelectedChart] = useState(null);

  const { data, functions, settings, chartType } = props;
  return (
    <div className="load-chart-section">
      <Col className="chart-selection" xs={3}>
        <Group key="loadChart" className="load-chart">
          <Dropdown title="Charts" id="basic-nav-dropdown">
            <Toggle variant="success" id="dropdown-basic">
              {selectedChart ? selectedChart.name : "Load Existing Chart"}
            </Toggle>
            <Menu>
              {data.getChartsByUser.map((chart) => {
                if (chart.type === chartType) {
                  return (
                    <Item key={chart.id} value={chart.id} onClick={() => setSelectedChart(chart)}>
                      {chart.name}
                    </Item>
                  );
                }
              })}
            </Menu>
          </Dropdown>
        </Group>
      </Col>
      {selectedChart ? (
        <Col className="chart-selection-options form-group" xs={9}>
          <Button onClick={() => functions.loadChartJSONFromAccount(selectedChart, settings)}>Load Selected JSON</Button>
          <Button onClick={() => functions.updateChartForAccount(selectedChart, settings)}>Update DB JSON</Button>
          <Button onClick={() => functions.updateChartJSONWithFormData(settings)}>Update JSON with Fields</Button>
        </Col>
      ) : null}
    </div>
  );
};

export default LoadChart;
