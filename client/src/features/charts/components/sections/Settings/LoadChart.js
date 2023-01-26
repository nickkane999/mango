import { Form, Button, Col, Dropdown } from "react-bootstrap";

const { Group } = Form;
const { Menu, Toggle, Item } = Dropdown;

const LoadChart = (props) => {
  const { data, selectedChart, functions, pullChart, settings } = props;
  return (
    <>
      <Col className="chart-selection" xs={12}>
        <Group key="loadChart" className="load-chart">
          <Dropdown title="Charts" id="basic-nav-dropdown">
            <Toggle variant="success" id="dropdown-basic">
              {selectedChart ? selectedChart.name : "Load Existing Chart"}
            </Toggle>
            <Menu>
              {data.getChartsByUser.map((chart) => {
                return (
                  <Item key={chart.id} value={chart.id} onClick={() => pullChart(chart)}>
                    {chart.name}
                  </Item>
                );
              })}
            </Menu>
          </Dropdown>
        </Group>
      </Col>
      <Col className="chart-selection-options" xs={12}>
        <Button onClick={() => functions.loadChartJSONFromAccount(selectedChart, settings)}>Load Selected JSON</Button>
        <Button onClick={() => functions.updateChartForAccount(selectedChart, settings)}>Update DB JSON</Button>
        <Button onClick={() => functions.updateChartJSONWithFormData(settings)}>Update JSON with Fields</Button>
      </Col>
    </>
  );
};

export default LoadChart;
