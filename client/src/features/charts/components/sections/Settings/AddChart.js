import { Form, Button, Col } from "react-bootstrap";
import { useState } from "react";
const { Control, Label, Group } = Form;

const AddChart = (props) => {
  const [saveChartName, setSaveChartName] = useState("");

  const { functions, settings, user } = props;
  return (
    <>
      <Col xs={6}>
        <Group key="addChartToAccount">
          <Label>Add Chart to Account</Label>
          <Control placeholder="Chart Name" name="chartName" onChange={(event) => setSaveChartName(event.target.value)} />
        </Group>
        <Button variant="primary" type="submit" className="save-chart-json" onClick={() => functions.saveChartJSON(saveChartName, user, settings)}>
          Save Chart JSON
        </Button>
      </Col>
    </>
  );
};

export default AddChart;
