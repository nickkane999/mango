import React, { useState, useRef, useEffect, memo, useContext } from "react";
import { Container } from "react-bootstrap";
import ChartForm from "./ChartForm";

import { useMutation } from "@apollo/client";
import { UPDATE_CHART_BY_USER, CREATE_CHART_BY_USER } from "../../../graphQL/queries";

//import ChartSettings from "./ChartSettings";
import SessionContext from "../context/chartStore";

const ChartSection = (props) => {
  const { fields, createChart, template, testCreateChart, testTemplate } = props.settings;
  const chartContainer = useRef(null);

  const [hasSessionLoaded, setHasSessionLoaded] = useState(false);
  const [updateChartQuery] = useMutation(UPDATE_CHART_BY_USER);
  const [createChartQuery] = useMutation(CREATE_CHART_BY_USER);

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
        testCreateChart: testCreateChart,
        updateChartQuery: updateChartQuery,
        createChartQuery: createChartQuery,
      },
      misc: {
        ...misc,
        chartType: props.chartType,
        fields: fields,
        template: template,
        chartContainer: chartContainer,
        testTemplate: testTemplate,
      },
    };
    setChartInfo({ ...newAttributes });
    setHasSessionLoaded(true);
  }, [props.chartType]);

  return (
    <>
      {hasSessionLoaded && chartInfo.functions.handleSubmit ? <ChartForm /> : null}
      <Container>
        <div id="chart" ref={chartContainer}></div>
      </Container>
    </>
  );
};

export default memo(ChartSection);
