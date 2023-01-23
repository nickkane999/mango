import { Form, Container, Button, Row, Col, Dropdown } from "react-bootstrap";
import { handleDisplayOptions } from "../../util/formLayout";
const { Control, Label, Group, Check } = Form;
const { Menu, Toggle, Item } = Dropdown;

const CreateChartSettings = (props) => {
  const { data, selectedChart, functions, chartType, pullChart, settings, handleSaveChartName, saveChartName, user, pluginID } = props;
  return (
    <Container className="section">
      <Row>
        <h2>Chart Settings</h2>
        <Col xs={6}>
          <Group key="displayOptionSettings">
            <Check type="checkbox" label="Display Chart JSON" onChange={(event) => handleDisplayOptions(event, "settings")} defaultChecked={true} />
          </Group>
          <Group key="displayOptionFormFields">
            <Check type="checkbox" label="Chart Form" onChange={(event) => handleDisplayOptions(event, "form_fields")} defaultChecked={true} />
          </Group>
          <Group key="displayOptionFields">
            <Check type="checkbox" label="Select Chart Fields" onChange={(event) => handleDisplayOptions(event, "fields")} defaultChecked={true} />
          </Group>
        </Col>
        {user && user.id ? (
          <Col xs={6}>
            <Group key="addChartToAccount">
              <Label>Add Chart to Account</Label>
              <Control placeholder="Chart Name" name="chartName" onChange={handleSaveChartName} />
            </Group>
            <Button variant="primary" type="submit" className="save-chart-json" onClick={() => functions.saveChartJSON(saveChartName, user, settings)}>
              Save Chart JSON
            </Button>
          </Col>
        ) : null}
        {data && functions.hasChartType(data.getChartsByUser, chartType) ? (
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
        ) : (
          <p className="no-user-charts"> No {chartType} charts found for this user </p>
        )}

        <Container className="chartSettingsError">
          <p className="error"></p>
        </Container>
        <Container className="chartSettings">
          <Group key="chartJSON" className="chartJSON">
            <Label>Enter JSON here</Label>
            <Control as="textarea" rows="10" placeholder="Chart progress" onChange={(event) => functions.updateChartJSON(event, settings)} name="chartJSON" />
          </Group>
          <Button variant="primary" type="submit" onClick={() => functions.loadChartJSON(settings, pluginID)}>
            Load Chart From JSON
          </Button>
          <Button variant="primary" type="submit" onClick={() => functions.loadChartJSONTemplate(settings, pluginID)}>
            Load Template
          </Button>
        </Container>
      </Row>
    </Container>
  );
};

export default CreateChartSettings;
