import { Form, Container, Button, Row, Col, Dropdown } from "react-bootstrap";
import { handleDisplayOptions } from "../FormLayout";
import SelectSettings from "./Settings/SelectSettings";
import AddChart from "./Settings/AddChart";
import LoadChart from "./Settings/LoadChart";
import JSONSection from "./Settings/JSONSection";

const { Control, Label, Group, Check } = Form;
const { Menu, Toggle, Item } = Dropdown;

const ChartSettings = (props) => {
  const { data, selectedChart, functions, chartType, pullChart, settings, handleSaveChartName, saveChartName, user, pluginID } = props;
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
