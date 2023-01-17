import React, { useEffect, useState, useRef } from "react";
import { Form, FormGroup, Container, Button } from "react-bootstrap";
import { BarChart } from "chartist";
import "./ChartFormChartist.css";
import Chartist from "chartist";
import { fields, data, settings, styling } from "./BarChartFormData";

function BarChartForm() {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
    //createChart();
  };
  const chartContainer = useRef(null);

  const createChart = (formData) => {
    console.log(formData);
    const chart = new BarChart(
      chartContainer.current,
      {
        // The labels array is used to describe the data points.
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        // The series array is used to store the data for the chart.
        series: formData.data ? JSON.parse(formData.data) : [[50, 20, 40, 20, 10]],
      },
      {
        // The options object is used to customize the chart.

        // Options for axis info. Found from https://gionkunz.github.io/chartist-js/api-documentation.html

        /*
        // If high is specified then the axis will display values explicitly up to this value and the computed maximum from the data is ignored
        high: 100,
        // If low is specified then the axis will display values explicitly down to this value and the computed minimum from the data is ignored
        low: 0,
        // This option will be used when finding the right scale division settings. The amount of ticks on the scale will be determined so that as many ticks as possible will be displayed, while not violating this minimum required space (in pixel).
        scaleMinSpace: 20,
        // Can be set to true or false. If set to true, the scale will be generated with whole numbers only.
        onlyInteger: true,
        // The reference value can be used to make sure that this value will always be on the chart. This is especially useful on bipolar charts where the bipolar center always needs to be part of the chart.
        referenceValue: 5,

        // If specified then the value range determined from minimum to maximum (or low and high) will be divided by this number and ticks will be generated at those division points. The default divisor is 1.
        divisor: 4,
        // If ticks is explicitly set, then the axis will not compute the ticks with the divisor, but directly use the data in ticks to determine at what points on the axis a tick need to be generated.
        ticks: [1, 10, 20, 30],

        // Ticks to be used to distribute across the axis length. As this axis type relies on the index of the value rather than the value, arbitrary data that can be converted to a string can be used as ticks.
        ticks: ["One", "Two", "Three"],
        // If set to true the full width will be used to distribute the values where the last value will be at the maximum of the axis length. If false the spaces between the ticks will be evenly distributed instead.
        stretch: true,
        */

        // API Recommended options
        // Options for X-Axis
        axisX: {
          // The offset of the chart drawing area to the border of the container
          offset: 30,
          // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
          position: "end",
          // Allows you to correct label positioning on this axis by positive or negative x and y offset.
          labelOffset: {
            x: 0,
            y: 0,
          },
          // If labels should be shown or not
          showLabel: true,
          // If the axis grid should be drawn or not
          showGrid: true,
          // Interpolation function that allows you to intercept the value from the axis label
          labelInterpolationFnc: function (value) {
            return value + " time";
          },
          // This value specifies the minimum width in pixel of the scale steps
          scaleMinSpace: 30,
          // Use only integer values (whole numbers) for the scale steps
          onlyInteger: false,
        },
        // Options for Y-Axis
        axisY: {
          // The offset of the chart drawing area to the border of the container
          offset: 40,
          // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
          position: "start",
          // Allows you to correct label positioning on this axis by positive or negative x and y offset.
          labelOffset: {
            x: 0,
            y: 0,
          },
          // If labels should be shown or not
          showLabel: true,
          // If the axis grid should be drawn or not
          showGrid: false,
          // Interpolation function that allows you to intercept the value from the axis label
          labelInterpolationFnc: function (value) {
            return "$" + value;
          },
          // This value specifies the minimum height in pixel of the scale steps
          scaleMinSpace: 20,
          // Use only integer values (whole numbers) for the scale steps
          onlyInteger: false,
        },
        // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
        width: undefined,
        // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
        height: undefined,
        // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
        high: undefined,
        // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
        low: undefined,
        // Unless low/high are explicitly set, bar chart will be centered at zero by default. Set referenceValue to null to auto scale.
        referenceValue: 0,
        // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
        chartPadding: {
          top: 15,
          right: 15,
          bottom: 5,
          left: 10,
        },
        // Specify the distance in pixel of bars in a group
        seriesBarDistance: 15,
        // If set to true this property will cause the series bars to be stacked. Check the `stackMode` option for further stacking options.
        stackBars: false,
        // If set to 'overlap' this property will force the stacked bars to draw from the zero line.
        // If set to 'accumulate' this property will form a total for each series point. This will also influence the y-axis and the overall bounds of the chart. In stacked mode the seriesBarDistance property will have no effect.
        stackMode: "accumulate",
        // Inverts the axes of the bar chart in order to draw a horizontal bar chart. Be aware that you also need to invert your axis settings as the Y Axis will now display the labels and the X Axis the values.
        horizontalBars: false,
        // If set to true then each bar will represent a series and the data array is expected to be a one dimensional array of data values rather than a series array of series. This is useful if the bar chart should represent a profile rather than some data over time.
        distributeSeries: false,
        // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
        reverseData: false,
        // If the bar chart should add a background fill to the .ct-grids group.
        showGridBackground: false,
        // Override the class names that get used to generate the SVG structure of the chart
        classNames: {
          chart: "ct-chart-bar",
          horizontalBars: "ct-horizontal-bars",
          label: "ct-label",
          labelGroup: "ct-labels",
          series: "ct-series",
          bar: "ct-bar",
          grid: "ct-grid",
          gridGroup: "ct-grids",
          gridBackground: "ct-grid-background",
          vertical: "ct-vertical",
          horizontal: "ct-horizontal",
          start: "ct-start",
          end: "ct-end",
        },

        // ChatGPT options
        /*
        fullWidth: true,
        chartPadding: {
          right: 40,
        },
        axisX: {
          offset: 30,
          labelInterpolationFnc: function (value) {
            return value + "km";
          },
          showLabel: true,
        },
        axisY: {
          offset: 40,
          labelInterpolationFnc: function (value) {
            return value + "%";
          },
          showLabel: true,
        },
        height: 300,
        width: 800,
        seriesBarDistance: 20,
        stackBars: true,
        horizontalBars: true,
        */
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
        <Form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <Form.Group key={field.key}>
              <Form.Label>{field.name}</Form.Label>
              <Form.Control
                placeholder={field.name}
                onChange={handleChange}
                name={field.key}
                /* value={field.default ? field.default : ''} */
              />
            </Form.Group>
          ))}
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Container>
      <Container>
        <div id="chart" ref={chartContainer}></div>
      </Container>
    </>
  );
}

export default BarChartForm;
