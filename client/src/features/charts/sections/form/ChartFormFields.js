import { Form, Container, Button, Row } from "react-bootstrap";
import { createCheckbox, createInputField } from "../../util/formLayout";

const ChartFormFields = (props) => {
  const { functions, settings, fields } = props;
  return (
    <Container className="formFields section">
      <Row>
        <h2>Chart Fields</h2>
        <Form onSubmit={(event) => functions.handleSubmit(event, settings)}>
          {fields.map((field) => {
            if (field.type === "checkbox") {
              return createCheckbox(field, settings);
            } else if (field.type === "input") {
              return createInputField(field, settings);
            }
          })}
          <Button variant="primary" type="submit">
            Load Chart From Form
          </Button>
        </Form>
      </Row>
    </Container>
  );
};

export default ChartFormFields;
