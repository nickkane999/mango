import { LineChart } from "chartist";

export const fields = [
  { name: "Labels", key: "labels", type: "input", default: true },
  { name: "Series", key: "series", type: "input", default: true },
  { name: "Offset Axis X", key: "offset_axisx", type: "input", default: true },
  { name: "Position Axis X", key: "position_axisx", type: "input", default: false },
  { name: "LabelOffsetX Axis X", key: "labelOffsetX_axisx", type: "input", default: false },
  { name: "LabelOffsetY Axis X", key: "labelOffsetY_axisx", type: "input", default: false },
  { name: "ShowLabel Axis X", key: "showLabel_axisx", type: "checkbox", default: false },
  { name: "ShowGrid Axis X", key: "showGrid_axisx", type: "checkbox", default: false },
  { name: "LabelInterpolationFnc Axis X", key: "labelInterpolationFnc_axisx", type: "input", default: false },
  { name: "Type Axis X", key: "type_axisx", type: "input", default: false },

  { name: "Offset Axis Y", key: "offset_axisy", type: "input", default: false },
  { name: "Position Axis Y", key: "position_axisy", type: "input", default: false },
  { name: "LabelOffsetX Axis Y", key: "labelOffsetX_axisy", type: "input", default: false },
  { name: "LabelOffsetY Axis Y", key: "labelOffsetY_axisy", type: "input", default: false },
  { name: "ShowLabel Axis Y", key: "showLabel_axisy", type: "checkbox", default: false },
  { name: "ShowGrid Axis Y", key: "showGrid_axisy", type: "checkbox", default: false },
  { name: "LabelInterpolationFnc Axis Y", key: "labelInterpolationFnc_axisy", type: "input", default: false },
  { name: "Type Axis Y", key: "type_axisy", type: "input", default: false },
  { name: "ScaleMinSpace Axis Y", key: "scaleMinSpace_axisy", type: "input", default: false },
  { name: "OnlyInteger Axis Y", key: "onlyInteger_axisy", type: "checkbox", default: false },

  { name: "Width", key: "width", type: "input", default: true },
  { name: "Height", key: "height", type: "input", default: true },
  { name: "ShowLine", key: "showLine", type: "checkbox", default: false },
  { name: "ShowPoint", key: "showPoint", type: "checkbox", default: true },
  { name: "ShowArea", key: "showArea", type: "checkbox", default: false },
  { name: "Area Base", key: "areaBase", type: "input", default: false },
  { name: "LineSmooth", key: "lineSmooth", type: "checkbox", default: false },
  { name: "Show Grid Background", key: "showGridBackground", type: "checkbox", default: false },
  { name: "Low", key: "low", type: "input", default: false },
  { name: "High", key: "high", type: "input", default: false },
  { name: "Chart Padding Top", key: "chartPaddingTop", type: "input", default: false },
  { name: "Chart Padding Right", key: "chartPaddingRight", type: "input", default: false },
  { name: "Chart Padding Bottom", key: "chartPaddingBottom", type: "input", default: false },
  { name: "Chart Padding Left", key: "chartPaddingLeft", type: "input", default: false },
  { name: "Full Width", key: "fullWidth", type: "checkbox", default: true },
  { name: "Reverse Data", key: "reverseData", type: "checkbox", default: false },

  { name: "Chart Class", key: "chartClass", type: "input", default: false },
  { name: "Label Class", key: "labelClass", type: "input", default: false },
  { name: "Label Group Class", key: "labelGroupClass", type: "input", default: false },
  { name: "Series Class", key: "seriesClass", type: "input", default: false },
  { name: "Line Class", key: "lineClass", type: "input", default: false },
  { name: "Point Class", key: "pointClass", type: "input", default: false },
  { name: "Area Class", key: "areaClass", type: "input", default: false },
  { name: "Grid Class", key: "gridClass", type: "input", default: false },
  { name: "Grid Group Class", key: "gridGroupClass", type: "input", default: false },
  { name: "Grid Background Class", key: "gridBackgroundClass", type: "input", default: false },
  { name: "Vertical Class", key: "verticalClass", type: "input", default: false },
  { name: "Horizontal Class", key: "horizontalClass", type: "input", default: false },
  { name: "Start Class", key: "startClass", type: "input", default: false },
  { name: "End Class", key: "endClass", type: "input", default: false },
];

export const createChart = (chartRef, formData) => {
  new LineChart(
    chartRef.current,
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
