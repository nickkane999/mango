import React, { useState, useEffect, useRef, memo } from "react";
import { Form, Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import "./Account.scss";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_CHARTS_BY_USER, UPDATE_CHART_BY_USER, DELETE_CHART_BY_USER } from "../../graphQL/queries";
import { user, formattedDate } from "../../util/general";
import { savePluginsFile } from "../../features/charts/plugins/all";

function Account() {
  if (!user) {
    window.location.href = "/login";
  }
  const userId = user.id;
  const [loadChartsQuery, { data }] = useLazyQuery(GET_CHARTS_BY_USER);
  const [updateChartQuery] = useMutation(UPDATE_CHART_BY_USER);
  const [deleteChartQuery] = useMutation(DELETE_CHART_BY_USER, {
    refetchQueries: [{ query: GET_CHARTS_BY_USER, variables: { userId: userId } }],
  });

  const renderCharts = () => {
    if (data && data.getChartsByUser.length > 0) {
      return (
        <>
          {data.getChartsByUser.map((chart, i) => (
            <Col className="chart" key={chart.id} xs={6}>
              <p>Name: {chart.name}</p>
              <p>Type: {chart.type}</p>
              <p>Created Date: {formattedDate(chart.createdDate)}</p>
              <p>Updated Date: {formattedDate(chart.updatedDate)}</p>
              <p>JSON: </p>
              <Group>
                <Label>Update JSON here</Label>
                <Control className={"chart-json-" + i} as="textarea" rows="10" placeholder="Chart progress" name={"chart-json-" + i} defaultValue={chart.json} />
                <Control className={"chart-plugin-" + i} as="textarea" rows="10" placeholder="My plugin String" name={"chart-plugin-" + i} defaultValue={chart.plugins} />
                <Button onClick={() => updateChart(chart.id, i)}>Update Chart</Button>
                <Button onClick={() => deleteChart(chart.id)}>Delete Chart</Button>
              </Group>
            </Col>
          ))}
        </>
      );
    } else {
      return <p>No charts found</p>;
    }
  };

  const loadCharts = () => {
    if (user.id) {
      loadChartsQuery({
        variables: { userId: user.id },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  const updateChart = (chartid, index) => {
    if (chartid && user.id) {
      const chartJSON = document.querySelector(".chart-json-" + index).value;
      const chartPlugin = document.querySelector(".chart-plugin-" + index).value;
      updateChartQuery({
        variables: {
          updateChartId: chartid,
          updateChartInput: {
            json: chartJSON,
            plugins: chartPlugin,
          },
        },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  const deleteChart = async (chartid) => {
    if (chartid && user.id) {
      deleteChartQuery({
        variables: { deleteChartId: chartid },
        onError: (error) => {
          console.log(error);
        },
      });
    }
  };

  // Updating form logic on input / variable changes
  // Redirect to homepage after successful login
  const { Control, Label, Group } = Form;
  return (
    <Container className="options-view">
      <h1>Account: {user.username}</h1>
      <Button onClick={loadCharts}>Load Charts</Button>
      <Button onClick={savePluginsFile}>Save Plugins File</Button>
      {data == null ? (
        <></>
      ) : (
        <div className="chart-view">
          <h2>My Charts</h2>
          <Row>{renderCharts()}</Row>
        </div>
      )}
    </Container>
  );
}

export default Account;
