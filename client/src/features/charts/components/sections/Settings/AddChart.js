import { Form, Container, Button, Row, Col, Dropdown } from "react-bootstrap";
import { handleDisplayOptions } from "../../FormLayout";
const { Control, Label, Group, Check } = Form;
const { Menu, Toggle, Item } = Dropdown;

const AddChart = (props) => {
  const { functions, settings, handleSaveChartName, saveChartName, user } = props;
  return (
    <>
      <Col xs={6}>
        <Group key="addChartToAccount">
          <Label>Add Chart to Account</Label>
          <Control placeholder="Chart Name" name="chartName" onChange={handleSaveChartName} />
        </Group>
        <Button variant="primary" type="submit" className="save-chart-json" onClick={() => functions.saveChartJSON(saveChartName, user, settings)}>
          Save Chart JSON
        </Button>
      </Col>
    </>
  );
};

export default AddChart;
