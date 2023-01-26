import { Container, Row } from "react-bootstrap";
import { CheckboxDisplayOptions, CheckboxPluginOptions } from "../FormLayout";

const ChartDisplayOptions = (info) => {
  const { fields, title, className, type } = info;
  return (
    <Container className={className}>
      <h2> {title}</h2>
      <Row>
        {Object.values(fields).map((field) => {
          if (field.default === false && type === "chart") {
            return <CheckboxDisplayOptions field={field} />;
          } else if (type === "plugin") {
            return <CheckboxPluginOptions field={field} info={info} />;
          }
        })}
      </Row>
    </Container>
  );
};

export default ChartDisplayOptions;
