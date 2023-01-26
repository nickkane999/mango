import { Container, Row } from "react-bootstrap";
import { createCheckboxDisplayOptions, createCheckboxPluginOptions } from "../../util/formLayout";

const ChartDisplayOptions = (info) => {
  const { fields, title, className, type } = info;
  return (
    <Container className={className}>
      <h2> {title}</h2>
      <Row>
        {Object.values(fields).map((field) => {
          if (field.default === false && type === "chart") {
            return createCheckboxDisplayOptions(field);
          } else if (type === "plugin") {
            return createCheckboxPluginOptions(field, info);
          }
        })}
      </Row>
    </Container>
  );
};

export default ChartDisplayOptions;
