import React, { useState, useRef, useEffect, memo, useContext } from "react";
import { Container } from "react-bootstrap";
import ChartForm from "./ChartForm";

import { useMutation } from "@apollo/client";
import { UPDATE_CHART_BY_USER, CREATE_CHART_BY_USER } from "../../../graphQL/queries";

//import ChartSettings from "./ChartSettings";
import SessionContext from "../context/chartStore";

const ChartSection = (props) => {
  const { fields, createChart, template } = props.settings;
  const chartContainer = useRef(null);

  const [hasSessionLoaded, setHasSessionLoaded] = useState(false);
  const [updateChartQuery] = useMutation(UPDATE_CHART_BY_USER);
  const [createChartQuery] = useMutation(CREATE_CHART_BY_USER);

  const { chartInfo, setChartInfo } = useContext(SessionContext);
  const { misc } = chartInfo;

  /*
  const newAttributes = {
    sessionStorage: {
      setChartJSON: setChartJSON,
      setFormData: setFormData,
    },
    functions: {
      getUpdatedFormData: getUpdatedFormData,
      getUpdatedChartJSON: getUpdatedChartJSON,
      updateChartQuery: updateChartQuery,
      createChartQuery: createChartQuery,
    },
    misc: {
      chartType: props.chartType,
      fields: fields,
      template: template,
      chartContainer: chartContainer,
    },
  };
  console.log("ChartSection: before");
  console.log(chartInfo);
  setChartInfo({ ...chartInfo, ...newAttributes });
  console.log("ChartSection: after");
  console.log(chartInfo);
  */

  /*
  useEffect(() => {
    const { functions, sessionStorage, misc } = chartInfo;
    const newAttributes = {
      sessionStorage: {
        ...sessionStorage,
        setChartJSON: setChartJSON,
        setFormData: setFormData,
      },
      functions: {
        ...functions,
        createChart: createChart,
        getUpdatedFormData: getUpdatedFormData,
        getUpdatedChartJSON: getUpdatedChartJSON,
        updateChartQuery: updateChartQuery,
        createChartQuery: createChartQuery,
      },
      misc: {
        ...misc,
        chartType: props.chartType,
        fields: fields,
        template: template,
        chartContainer: chartContainer,
      },
    };
    //console.log("ChartSection: before");
    //console.log(chartInfo);
    //setChartInfo({ chartInfo, c: "My test" });
    //setChartInfo({ chartInfo, ...newAttributes });
    setChartInfo({ ...newAttributes });
    //console.log("ChartSection: after");
    //console.log(chartInfo);
    setHasSessionLoaded(true);

    // Can add this to the useEffect hook to make sure data works, but probably overkill
    // Guessing that data will be updated without this
    // [formData, chartJSON, props.chartType, fields, template, chartContainer, setChartJSON, setFormData, updateChartQuery, createChartQuery]
  }, []);
  */

  useEffect(() => {
    const { functions, sessionStorage, misc } = chartInfo;
    const newAttributes = {
      sessionStorage: {
        ...sessionStorage,
      },
      functions: {
        ...functions,
        createChart: createChart,
        updateChartQuery: updateChartQuery,
        createChartQuery: createChartQuery,
      },
      misc: {
        ...misc,
        chartType: props.chartType,
        fields: fields,
        template: template,
        chartContainer: chartContainer,
      },
    };
    //console.log("ChartSection: before");
    //console.log(chartInfo);
    //setChartInfo({ chartInfo, c: "My test" });
    //setChartInfo({ chartInfo, ...newAttributes });
    setChartInfo({ ...newAttributes });
    //console.log("ChartSection: after");
    //console.log(chartInfo);
    setHasSessionLoaded(true);

    // Can add this to the useEffect hook to make sure data works, but probably overkill
    // Guessing that data will be updated without this
    // [formData, chartJSON, props.chartType, fields, template, chartContainer, setChartJSON, setFormData, updateChartQuery, createChartQuery]
  }, []);

  // Experiement with Storage contained with 1 object variable
  /*
  const settings = {
    misc: {
      chartContainer: chartContainer,
      chartType: props.chartType,
      fields: fields,
      template: template,
    },
    functions: {
      createChart: createChart,
      updateFormInput: updateFormInput,
      updateFormCheckbox: updateFormCheckbox,
      updateFormData: updateFormData,
      updateChartJSON: updateChartJSON,
      loadChartJSON: loadChartJSON,
      saveChartJSON: saveChartJSON,
      updateChartForAccount: updateChartForAccount,
      hasChartType: hasChartType,
      loadChartJSONTemplate: loadChartJSONTemplate,
      loadChartJSONFromAccount: loadChartJSONFromAccount,
      handleSubmit: handleSubmit,
      getUpdatedFormData: getUpdatedFormData,
      getUpdatedChartJSON: getUpdatedChartJSON,
      updateChartQuery: updateChartQuery,
      createChartQuery: createChartQuery,
    },
    sessionStorage: {
      setChartJSON: setChartJSON,
      setFormData: setFormData,
    },
  };
  */

  console.log("ChartSection: render");
  console.log(chartInfo);
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
