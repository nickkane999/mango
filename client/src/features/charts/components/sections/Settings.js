import { Container, Row } from "react-bootstrap";
import SelectSettings from "./Settings/SelectSettings";
import AddChart from "./Settings/AddChart";
import LoadChart from "./Settings/LoadChart";
import JSONSection from "./Settings/JSONSection";

const ChartSettings = (props) => {
  const { data, functions, chartType, user } = props;
  return (
    <Container className="section">
      <Row>
        <SelectSettings />
        {user && user.id ? <AddChart {...props} /> : null}
        {data && functions.hasChartType(data.getChartsByUser, chartType) ? <LoadChart {...props} /> : <p className="no-user-charts"> No {chartType} charts found for this user </p>}
        <JSONSection {...props} />
      </Row>
    </Container>
  );
};

export default ChartSettings;
