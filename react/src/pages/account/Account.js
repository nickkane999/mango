import React, { useState, useEffect, useRef, memo } from "react";
import { Form, Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import "./Account.css";
//import { useQuery, useMutation } from "react-query";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_CHARTS_BY_USER, UPDATE_CHART_BY_USER, DELETE_CHART_BY_USER } from "../../graphQL/queries";
import { getCookie } from "../../util/cookies";

function Account() {
  const [getChartsByUser, { data, error }] = useLazyQuery(GET_CHARTS_BY_USER);
  const [updateChartByUser] = useMutation(UPDATE_CHART_BY_USER);
  const [deleteChartByUser] = useMutation(DELETE_CHART_BY_USER);

  const loadCharts = () => {
    getChartsByUser({
      variables: { userId: "63c8b3577b35c6af83c0aafb" },
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  // Need to fix issue where these functions are called on page load
  // ask chatGPT for help
  const updateJSON = (chartID) => {
    console.log("would update");
    console.log(chartID);
  };

  const deleteRecord = (chartID) => {
    console.log("would delete");
    console.log(chartID);
  };

  // Updating form logic on input / variable changes
  // Redirect to homepage after successful login
  const { Control, Label, Group } = Form;
  return (
    <div>
      <h1>Account</h1>
      <Button onClick={loadCharts}>Load Charts</Button>
      {data == null ? (
        <p>no data</p>
      ) : (
        <Container>
          <h2>My Charts</h2>
          <Row>
            {data.getChartsByUser.map((chart) => (
              <Col>
                <div key={chart.id}>
                  <p>Name: {chart.name}</p>
                  <p>Type: {chart.type}</p>
                  <p>Created Date: {chart.createdDate}</p>
                  <p>Updated Date: {chart.updatedDate}</p>
                  <p>JSON: </p>
                  <Group key="chartJSON" className="chartJSON">
                    <Label>Update JSON here</Label>
                    <Control as="textarea" rows="10" placeholder="Chart progress" name="chartJSON" />
                    <Button onClick={updateJSON(chart.id)}>Update</Button>
                    <Button onClick={deleteRecord(chart.id)}>Delete</Button>
                  </Group>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default memo(Account);
