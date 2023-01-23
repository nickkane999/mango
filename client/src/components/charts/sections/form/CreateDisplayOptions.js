import { Form, Container, Button, Row, Col, Dropdown } from "react-bootstrap";
import { createCheckboxDisplayOptions } from "../../util/formLayout";

const CreateDisplayOptions = (fields) => {
  console.log(fields);
  return (
    <Container className="displayOptions section">
      <h2> Select Chart Fields to Display</h2>
      <Row>
        {Object.values(fields).map((field) => {
          if (field.default === false) {
            return createCheckboxDisplayOptions(field);
          }
        })}
      </Row>
    </Container>
  );
};

export default CreateDisplayOptions;
