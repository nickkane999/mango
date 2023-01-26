import { Form, Col } from "react-bootstrap";
import { handleDisplayOptions } from "../../FormLayout";
const { Group, Check } = Form;

const SelectSettings = () => {
  return (
    <div className="select-settings">
      <h2>Chart Settings</h2>
      <Col xs={6}>
        <Group key="displayOptionSettings">
          <Check type="checkbox" label="Chart JSON" onChange={(event) => handleDisplayOptions(event, "settings")} defaultChecked={true} />
        </Group>
        <Group key="displayChartOptionFields">
          <Check type="checkbox" label="Select Fields" onChange={(event) => handleDisplayOptions(event, "chart_fields")} defaultChecked={true} />
        </Group>
        <Group key="displayOptionFormFields">
          <Check type="checkbox" label="Enter field options" onChange={(event) => handleDisplayOptions(event, "form_fields")} defaultChecked={true} />
        </Group>
        <Group key="displayPluginOptionFields">
          <Check type="checkbox" label="Select Plugin" onChange={(event) => handleDisplayOptions(event, "plugin_fields")} defaultChecked={true} />
        </Group>
        <Group key="displayPluginDisplayOptionFields">
          <Check type="checkbox" label="Enter plugin options" onChange={(event) => handleDisplayOptions(event, "plugin_option_fields")} defaultChecked={true} />
        </Group>
      </Col>
    </div>
  );
};

export default SelectSettings;
