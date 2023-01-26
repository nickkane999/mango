import { Form, Container, Button } from "react-bootstrap";

const { Control, Label, Group } = Form;

const JSONSection = (props) => {
  const { functions, settings, pluginID } = props;
  return (
    <>
      <Container className="chartSettings">
        <Group key="chartJSON" className="chartJSON">
          <Label>Enter JSON here</Label>
          <Control as="textarea" rows="10" placeholder="Chart progress" onChange={(event) => functions.updateChartJSON(event, settings)} name="chartJSON" />
        </Group>
        <Button variant="primary" type="submit" onClick={() => functions.loadChartJSON(settings, pluginID)}>
          Load Chart From JSON
        </Button>
        <Button variant="primary" type="submit" onClick={() => functions.loadChartJSONTemplate(settings)}>
          Load Template
        </Button>
      </Container>
      <Container className="chartSettingsError">
        <p className="error"></p>
      </Container>
    </>
  );
};

export default JSONSection;
