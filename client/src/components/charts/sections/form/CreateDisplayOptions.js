import { Form, Container, Button, Row, Col, Dropdown } from "react-bootstrap";
import { createCheckboxDisplayOptions } from "../../util/formLayout";

const CreateDisplayOptions = (info) => {
  const { fields, title, className } = info;
  return (
    <Container className={className}>
      <h2> {title}</h2>
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
