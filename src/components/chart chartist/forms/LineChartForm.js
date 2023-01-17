import React, { useEffect, useState, useRef } from "react";
import { Form, FormGroup, Container, Button, Row, Col } from "react-bootstrap";
import { LineChart } from "chartist";
import "./ChartFormChartist.css";
import Chartist from "chartist";
import { fields, data, settings, styling } from "./LineChartFormData";
import { type } from "@testing-library/user-event/dist/type";

function LineChartForm() {
  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    console.log(event);
    const { name, value } = event.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
    console.log(formData);
    //createChart();
  };

  const handleCheckBoxChange = (event) => {
    console.log(event);
    const { name } = event.target;
    setFormData((formData) => ({ ...formData, [name]: event.target.checked }));
    console.log(formData);
    //createChart();
  };

  const handleDisplayOptions = (event) => {
    if (event.target.checked) {
      document.querySelector(".displayOptions").style.display = "block";
    } else {
      document.querySelector(".displayOptions").style.display = "none";
    }
  };
  const toggleFormField = (event, className) => {
    if (event.target.checked) {
      document.querySelector("." + className).style.display = "block";
    } else {
      document.querySelector("." + className).style.display = "none";
    }
  };

  const chartContainer = useRef(null);

  const createChart = (formData) => {
    console.log(formData);
    const chart = new LineChart(
      chartContainer.current,
      {
        // The labels array is used to describe the data points.
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        // The series array is used to store the data for the chart.
        series: formData.data ? JSON.parse(formData.data) : [[50, 20, 40, 20, 10]],
      },
      {
        // The options object is used to customize the chart.

        // API Recommended options
        // Options for X-Axis
        // Options for X-Axis
        axisX: {
          // The offset of the labels to the chart area
          offset: formData.offset_axisx ? Number(formData.offset_axisx) : 30,
          // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
          position: formData.position_axisx ? formData.position_axisx : "end",
          // Allows you to correct label positioning on this axis by positive or negative x and y offset.
          labelOffset: {
            x: formData.labelOffsetX_axisx ? Number(formData.labelOffsetX_axisx) : 0,
            y: formData.labelOffsetY_axisx ? Number(formData.labelOffsetY_axisx) : 0,
          },
          // If labels should be shown or not
          // was working
          showLabel: formData.showLabel_axisx !== undefined ? formData.showLabel_axisx : true,
          // If the axis grid should be drawn or not
          // (wasn't working)
          showGrid: formData.showGrid_axisx !== undefined ? formData.showGrid_axisx : true,
          // Interpolation function that allows you to intercept the value from the axis label
          labelInterpolationFnc: formData.labelInterpolationFnc_axisx
            ? formData.labelInterpolationFnc_axisx
            : function (value) {
                return value;
              },
          // Set the axis type to be used to project values on this axis. If not defined, Chartist.StepAxis will be used for the X-Axis, where the ticks option will be set to the labels in the data and the stretch option will be set to the global fullWidth option. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
          type: formData.type_axisx ? formData.type_axisx : undefined,
        },
        // Options for Y-Axis
        axisY: {
          // The offset of the labels to the chart area
          offset: formData.offset_axisy ? Number(formData.offset_axisy) : 30,
          // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
          position: formData.position_axisy ? formData.position_axisy : "start",
          // Allows you to correct label positioning on this axis by positive or negative x and y offset.
          labelOffset: {
            x: formData.labelOffsetX_axisy ? Number(formData.labelOffsetX_axisy) : 0,
            y: formData.labelOffsetY_axisy ? Number(formData.labelOffsetY_axisy) : 0,
          },
          // If labels should be shown or not
          showLabel: formData.showLabel_axisy !== undefined ? formData.showLabel_axisy : true,
          // If the axis grid should be drawn or not
          showGrid: formData.showGrid_axisy !== undefined ? formData.showGrid_axisy : true,
          // Interpolation function that allows you to intercept the value from the axis label
          labelInterpolationFnc: formData.labelInterpolationFnc_axisy
            ? formData.labelInterpolationFnc_axisy
            : function (value) {
                return value;
              },
          // Set the axis type to be used to project values on this axis. If not defined, Chartist.AutoScaleAxis will be used for the Y-Axis, where the high and low options will be set to the global high and low options. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
          type: formData.type_axisy ? formData.type_axisy : undefined,
          // This value specifies the minimum height in pixel of the scale steps
          scaleMinSpace: formData.scaleMinSpace_axisy ? Number(formData.scaleMinSpace_axisy) : 30,
          // Use only integer values (whole numbers) for the scale steps
          onlyInteger: formData.onlyInteger_axisy !== undefined ? formData.onlyInteger_axisy : false,
        },
        // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
        width: formData.width ? formData.width : undefined,
        // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
        height: formData.height ? formData.height : undefined,
        // If the line should be drawn or not
        showLine: formData.showLine !== undefined ? formData.showLine : true,
        // If dots should be drawn or not
        showPoint: formData.showPoint !== undefined ? formData.showPoint : true,
        // If the line chart should draw an area
        showArea: formData.showArea !== undefined ? formData.showArea : false,
        // The base for the area chart that will be used to close the area shape (is normally 0)
        areaBase: formData.areaBase ? Number(formData.areaBase) : 0,
        // Specify if the lines should be smoothed. This value can be true or false where true will result in smoothing using the default smoothing interpolation function Chartist.Interpolation.cardinal and false results in Chartist.Interpolation.none. You can also choose other smoothing / interpolation functions available in the Chartist.Interpolation module, or write your own interpolation function. Check the examples for a brief description.
        lineSmooth: formData.lineSmooth !== undefined ? formData.lineSmooth : true,
        // If the line chart should add a background fill to the .ct-grids group.
        showGridBackground: formData.showGridBackground !== undefined ? formData.showGridBackground : false,
        // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
        low: formData.low ? formData.low : undefined,
        // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
        high: formData.high ? formData.high : undefined,
        // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
        chartPadding: {
          top: formData.chartPaddingTop ? Number(formData.chartPaddingTop) : 15,
          right: formData.chartPaddingRight ? Number(formData.chartPaddingRight) : 5,
          bottom: formData.chartPaddingBottom ? Number(formData.chartPaddingBottom) : 5,
          left: formData.chartPaddingLeft ? Number(formData.chartPaddingLeft) : 10,
        },
        // When set to true, the last grid line on the x-axis is not drawn and the chart elements will expand to the full available width of the chart. For the last label to be drawn correctly you might need to add chart padding or offset the last label with a draw event handler.
        fullWidth: formData.fullWidth !== undefined ? formData.fullWidth : false,
        // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
        reverseData: formData.reverseData !== undefined ? formData.reverseData : false,
        // Override the class names that get used to generate the SVG structure of the chart
        classNames: {
          chart: formData.chartClass ? formData.chartClass : "ct-chart-line",
          label: formData.labelClass ? formData.labelClass : "ct-label",
          labelGroup: formData.labelGroupClass ? formData.labelGroupClass : "ct-labels",
          series: formData.seriesClass ? formData.seriesClass : "ct-series",
          line: formData.lineClass ? formData.lineClass : "ct-line",
          point: formData.pointClass ? formData.pointClass : "ct-point",
          area: formData.areaClass ? formData.areaClass : "ct-area",
          grid: formData.gridClass ? formData.gridClass : "ct-grid",
          gridGroup: formData.gridGroupClass ? formData.gridGroupClass : "ct-grids",
          gridBackground: formData.gridBackgroundClass ? formData.gridBackgroundClass : "ct-grid-background",
          vertical: formData.verticalClass ? formData.verticalClass : "ct-vertical",
          horizontal: formData.horizontalClass ? formData.horizontalClass : "ct-horizontal",
          start: formData.startClass ? formData.startClass : "ct-start",
          end: formData.endClass ? formData.endClass : "ct-end",
        },
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createChart(formData);

    //console.log(formData);
    //BarChart(data, formData, settings);
    /*
        nums.forEach((ele, i) => {
            nums[i] = parseInt(ele.trim())
          });        
        /*
        let nums = data.split(',');
        nums.forEach((ele, i) => {
          nums[i] = parseInt(ele.trim())
        });
        chartUtil.loadNumbers(nums)
        */
  };

  return (
    <>
      <Container>
        <Row>
          <Form onSubmit={handleSubmit}>
            {fields.map((field) => {
              if (field.type === "checkbox") {
                return (
                  <Col className="form-group" xs={4}>
                    <Form.Group className={!field.default ? field.key + " field hidden" : field.key + " field"} key={field.key}>
                      <Form.Check type="checkbox" label={field.name} onChange={handleCheckBoxChange} defaultChecked={false} name={field.key} />
                    </Form.Group>
                  </Col>
                );
              } else if (field.type === "input") {
                return (
                  <Col className="form-group" xs={4}>
                    <Form.Group className={!field.default ? field.key + " field hidden" : field.key + " field"} key={field.key}>
                      <Form.Label>{field.name}</Form.Label>
                      <Form.Control
                        placeholder={field.name}
                        onChange={handleInputChange}
                        name={field.key}
                        /* value={field.default ? field.default : ''} */
                      />
                    </Form.Group>
                  </Col>
                );
              }
            })}
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Row>
      </Container>
      <Container>
        <h2> Show Fields</h2>
        <Form.Group key="displayOptions">
          <Form.Check type="checkbox" label="Display Options" onChange={handleDisplayOptions} defaultChecked={true} />
        </Form.Group>
        <Container className="displayOptions">
          <Row>
            {fields.map((field) => {
              if (field.default === false) {
                return (
                  <Col xs={3}>
                    <Form.Group key={field.key}>
                      <Form.Check type="checkbox" label={field.name} onChange={(event) => toggleFormField(event, field.key)} defaultChecked={false} />
                    </Form.Group>
                  </Col>
                );
              }
            })}
          </Row>
        </Container>
      </Container>
      <Container>
        <div id="chart" ref={chartContainer}></div>
      </Container>
    </>
  );
}

export default LineChartForm;
