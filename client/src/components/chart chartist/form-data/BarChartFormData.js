import { BarChart } from "chartist";

export const fields = [
  { name: "Labels", key: "labels", type: "input", default: true },
  { name: "Series", key: "series", type: "input", default: true },
  { name: "Offset Axis X", key: "offset_axisx", type: "input", default: false },
  { name: "Position Axis X", key: "position_axisx", type: "input", default: false },
  { name: "LabelOffsetX Axis X", key: "labelOffsetX_axisx", type: "input", default: false },
  { name: "LabelOffsetY Axis X", key: "labelOffsetY_axisx", type: "input", default: false },
  { name: "ShowLabel Axis X", key: "showLabel_axisx", type: "input", default: false },
  { name: "ShowGrid Axis X", key: "showGrid_axisx", type: "checkbox", default: false },
  { name: "LabelInterpolationFnc Axis X", key: "labelInterpolationFnc_axisx", type: "input", default: false },
  { name: "Type Axis X", key: "type_axisx", type: "input", default: false },
  { name: "OnlyInteger Axis X", key: "onlyInteger_axisx", type: "input", default: false },
  { name: "ScaleMinSpace Axis X", key: "scaleMinSpace_axisx", type: "input", default: false },

  { name: "Offset Axis Y", key: "offset_axisy", type: "input", default: false },
  { name: "Position Axis Y", key: "position_axisy", type: "input", default: false },
  { name: "LabelOffsetX Axis Y", key: "labelOffsetX_axisy", type: "input", default: false },
  { name: "LabelOffsetY Axis Y", key: "labelOffsetY_axisy", type: "input", default: false },
  { name: "ShowLabel Axis Y", key: "showLabel_axisy", type: "input", default: false },
  { name: "ShowGrid Axis Y", key: "showGrid_axisy", type: "checkbox", default: false },
  { name: "LabelInterpolationFnc Axis Y", key: "labelInterpolationFnc_axisy", type: "input", default: false },
  { name: "Type Axis Y", key: "type_axisy", type: "input", default: false },
  { name: "ScaleMinSpace Axis Y", key: "scaleMinSpace_axisy", type: "input", default: false },
  { name: "OnlyInteger Axis Y", key: "onlyInteger_axisy", type: "input", default: false },

  { name: "Width", key: "width", type: "input", default: true },
  { name: "Height", key: "height", type: "input", default: true },
  { name: "Low", key: "low", type: "input", default: false },
  { name: "High", key: "high", type: "input", default: false },
  { name: "Reference Value", key: "referenceValue", type: "input", default: false },
  { name: "Chart Padding Top", key: "chartPaddingTop", type: "input", default: false },
  { name: "Chart Padding Right", key: "chartPaddingRight", type: "input", default: false },
  { name: "Chart Padding Bottom", key: "chartPaddingBottom", type: "input", default: false },
  { name: "Chart Padding Left", key: "chartPaddingLeft", type: "input", default: false },

  { name: "Series Bar Distance", key: "seriesBarDistance", type: "input", default: false },
  { name: "Stack Bars", key: "stackBars", type: "input", default: false },
  { name: "Stack Mode", key: "stackMode", type: "input", default: false },
  { name: "Horizontal Bars", key: "horizontalBars", type: "input", default: false },
  { name: "Distribute Series", key: "distributeSeries", type: "input", default: false },
  { name: "Reverse Data", key: "reverseData", type: "input", default: false },
  { name: "Show Grid Background", key: "showGridBackground", type: "input", default: false },

  { name: "Chart Class", key: "chartClass", type: "input", default: false },
  { name: "Horizontal Bars Class", key: "horizontalBarsClass", type: "input", default: false },
  { name: "Label Class", key: "labelClass", type: "input", default: false },
  { name: "Label Group Class", key: "labelGroupClass", type: "input", default: false },
  { name: "Series Class", key: "seriesClass", type: "input", default: false },
  { name: "Bar Class", key: "barClass", type: "input", default: false },
  { name: "Grid Class", key: "gridClass", type: "input", default: false },
  { name: "Grid Group Class", key: "gridGroupClass", type: "input", default: false },
  { name: "Grid Background Class", key: "gridBackgroundClass", type: "input", default: false },
  { name: "Vertical Class", key: "verticalClass", type: "input", default: false },
  { name: "Horizontal Class", key: "horizontalClass", type: "input", default: false },
  { name: "Start Class", key: "startClass", type: "input", default: false },
  { name: "End Class", key: "endClass", type: "input", default: false },
];

export const createChart = (chartRef, formData) => {
  console.log("creating chart");
  console.log(formData);
  let offset_axisx = formData.offset_axisx ? formData.offset_axisx : 10;
  console.log("creating chart");
  console.log(formData);
  new BarChart(
    chartRef.current,
    {
      // The labels array is used to describe the data points.
      labels: formData.labels ? formData.labels : ["Mon", "Tue", "Wed", "Thu", "Fri"],
      // The series array is used to store the data for the chart.
      series: formData.series ? formData.series : [[50, 20, 40, 20, 10]],
    },
    {
      // The options object is used to customize the chart.

      // Options for axis info. Found from https://gionkunz.github.io/chartist-js/api-documentation.html

      // API Recommended options
      // Options for X-Axis
      axisX: {
        // The offset of the chart drawing area to the border of the container
        offset: formData.offset_axisx ? Number(formData.offset_axisx) : 10,
        // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
        position: formData.position_axisx ? formData.position_axisx : "end",
        // Allows you to correct label positioning on this axis by positive or negative x and y offset.
        labelOffset: {
          x: formData.labelOffsetX_axisx ? Number(formData.labelOffsetX_axisx) : 0,
          y: formData.labelOffsetY_axisx ? Number(formData.labelOffsetY_axisx) : 0,
        },
        // If labels should be shown or not
        showLabel: formData.showLabel_axisx !== undefined ? formData.showLabel_axisx : true,
        // If the axis grid should be drawn or not
        showGrid: formData.showGrid_axisx !== undefined ? formData.showGrid_axisx : true,
        // Interpolation function that allows you to intercept the value from the axis label
        labelInterpolationFnc: function (value) {
          return value + " time";
        },
        // This value specifies the minimum width in pixel of the scale steps
        scaleMinSpace: formData.scaleMinSpace_axisx ? Number(formData.scaleMinSpace_axisx) : 30,
        // Use only integer values (whole numbers) for the scale steps
        onlyInteger: formData.onlyInteger_axisx !== undefined ? formData.onlyInteger_axisx : false,
      },
      // Options for Y-Axis
      axisY: {
        // The offset of the chart drawing area to the border of the container
        offset: formData.offset_axisy ? Number(formData.offset_axisy) : 40,
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
        showGrid: formData.showGrid_axisy !== undefined ? formData.showGrid_axisy : false,
        // Interpolation function that allows you to intercept the value from the axis label
        labelInterpolationFnc: function (value) {
          return "$" + value;
        },
        // This value specifies the minimum height in pixel of the scale steps
        scaleMinSpace: formData.scaleMinSpace_axisy ? Number(formData.scaleMinSpace_axisy) : 20,
        // Use only integer values (whole numbers) for the scale steps
        onlyInteger: formData.onlyInteger_axisy !== undefined ? formData.onlyInteger_axisy : false,
      },
      // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
      width: formData.width ? formData.width : undefined,
      // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
      height: formData.height ? formData.height : 400,
      // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
      high: formData.high ? formData.high : undefined,
      // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
      low: formData.low ? formData.low : undefined,
      // Unless low/high are explicitly set, bar chart will be centered at zero by default. Set referenceValue to null to auto scale.
      referenceValue: formData.referenceValue ? Number(formData.referenceValue) : 0,
      // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
      chartPadding: {
        top: formData.chartPaddingTop ? Number(formData.chartPaddingTop) : 30,
        right: formData.chartPaddingRight ? Number(formData.chartPaddingRight) : 5,
        bottom: formData.chartPaddingBottom ? Number(formData.chartPaddingBottom) : 30,
        left: formData.chartPaddingLeft ? Number(formData.chartPaddingLeft) : 5,
      },
      // Specify the distance in pixel of bars in a group
      seriesBarDistance: formData.seriesBarDistance ? Number(formData.seriesBarDistance) : 15,
      // If set to true this property will cause the series bars to be stacked. Check the `stackMode` option for further stacking options.
      stackBars: formData.stackBars !== undefined ? formData.stackBars : false,
      // If set to 'overlap' this property will force the stacked bars to draw from the zero line.
      // If set to 'accumulate' this property will form a total for each series point. This will also influence the y-axis and the overall bounds of the chart. In stacked mode the seriesBarDistance property will have no effect.
      stackMode: formData.stackMode ? formData.stackMode : "accumulate",
      // Inverts the axes of the bar chart in order to draw a horizontal bar chart. Be aware that you also need to invert your axis settings as the Y Axis will now display the labels and the X Axis the values.
      horizontalBars: formData.horizontalBars !== undefined ? formData.horizontalBars : false,
      // If set to true then each bar will represent a series and the data array is expected to be a one dimensional array of data values rather than a series array of series. This is useful if the bar chart should represent a profile rather than some data over time.
      distributeSeries: formData.distributeSeries !== undefined ? formData.distributeSeries : false,
      // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
      reverseData: formData.reverseData !== undefined ? formData.reverseData : false,
      // If the bar chart should add a background fill to the .ct-grids group.
      showGridBackground: formData.showGridBackground !== undefined ? formData.showGridBackground : false,
      // Override the class names that get used to generate the SVG structure of the chart
      classNames: {
        chart: formData.chartClass ? formData.chartClass : "ct-chart-bar",
        horizontalBars: formData.horizontalBarsClass ? formData.horizontalBarsClass : "ct-horizontal-bars",
        label: formData.labelClass ? formData.labelClass : "ct-label",
        labelGroup: formData.labelGroupClass ? formData.labelGroupClass : "ct-labels",
        series: formData.seriesClass ? formData.seriesClass : "ct-series",
        bar: formData.barClass ? formData.barClass : "ct-bar",
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

export const template = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  series: [[50, 20, 40, 20, 10]],
  offset_axisx: 30,
  position_axisx: "end",
  labelOffsetX_axisx: 0,
  labelOffsetY_axisx: 0,
  showLabel_axisx: true,
  showGrid_axisx: true,
  labelInterpolationFnc_axisx: "function (value) { return value + ' time'; }",
  scaleMinSpace_axisx: 30,
  onlyInteger_axisx: false,
  offset_axisy: 40,
  position_axisy: "start",
  labelOffsetX_axisy: 0,
  labelOffsetY_axisy: 0,
  showLabel_axisy: true,
  showGrid_axisy: false,
  labelInterpolationFnc_axisy: "function (value) { return '$' + value; }",
  scaleMinSpace_axisy: 20,
  onlyInteger_axisy: false,
  width: undefined,
  height: undefined,
  high: undefined,
  low: undefined,
  referenceValue: 0,
  chartPaddingTop: 30,
  chartPaddingRight: 5,
  chartPaddingBottom: 30,
  chartPaddingLeft: 5,
  seriesBarDistance: 15,
  stackBars: false,
  stackMode: "accumulate",
  horizontalBars: false,
  distributeSeries: false,
  reverseData: false,
  showGridBackground: false,
  chartClass: "ct-chart-bar",
  horizontalBarsClass: "ct-horizontal-bars",
  labelClass: "ct-label",
  labelGroupClass: "ct-labels",
  seriesClass: "ct-series",
  barClass: "ct-bar",
  gridClass: "ct-grid",
  gridGroupClass: "ct-grids",
  gridBackgroundClass: "ct-grid-background",
  verticalClass: "ct-vertical",
  horizontalClass: "ct-horizontal",
  startClass: "ct-start",
  endClass: "ct-end",
};
