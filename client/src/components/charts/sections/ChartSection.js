import React, { useState, useRef, useEffect, memo, useContext } from "react";
import { Container } from "react-bootstrap";
import ChartForm from "./ChartForm";

//import ChartSettings from "./ChartSettings";
import SessionContext from "../context/chartStore";

const ChartSection = (props) => {
  const { fields, createChart, createChartVanillaJS, template } = props.settings;
  const [hasSessionLoaded, setHasSessionLoaded] = useState(false);
  const { chartInfo, setChartInfo } = useContext(SessionContext);

  useEffect(() => {
    const { functions, sessionStorage, misc } = chartInfo;
    const newAttributes = {
      sessionStorage: {
        ...sessionStorage,
      },
      functions: {
        ...functions,
        createChart: createChart,
        createChartVanillaJS: createChartVanillaJS,
      },
      misc: {
        ...misc,
        chartType: props.chartType,
        fields: fields,
        template: template,
      },
    };
    setChartInfo({ ...newAttributes });
    setHasSessionLoaded(true);
  }, [props.chartType]);

  return (
    <>
      {hasSessionLoaded && chartInfo.functions.handleSubmit ? <ChartForm /> : null}
      <Container>
        <div id="chart"></div>
      </Container>
    </>
  );
};

export default memo(ChartSection);
