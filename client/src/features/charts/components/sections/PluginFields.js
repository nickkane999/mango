import { Form, Container, Button, Row } from "react-bootstrap";
import { Checkbox, InputField } from "../FormLayout";

const ChartPluginFields = (props) => {
  const { functions, settings, pluginData } = props;
  return (
    <Container className="section pluginFields">
      <Row>
        <h2>Plugin Fields</h2>
        <Form onSubmit={(event) => console.log("a")}>
          {Object.keys(pluginData).map((key) => {
            let pluginFields = pluginData[key].parameterSettings;
            //console.log(pluginData[key]);
            return (
              <Container key={key} className={key}>
                {Object.keys(pluginFields).map((key, field) => {
                  field = pluginFields[key];
                  if (field.type === "checkbox") {
                    <Checkbox field={field} settings={settings} />;
                  } else if (field.type === "input") {
                    <InputField field={field} settings={settings} />;
                  }
                })}
              </Container>
            );
          })}
        </Form>
      </Row>
    </Container>
  );
};

export default ChartPluginFields;
