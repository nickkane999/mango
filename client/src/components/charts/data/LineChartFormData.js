import { LineChart } from "chartist";
import { pullChartistInfo, updateChartistInfo, generateChart } from "../util/charts";

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
  return;
};

export const createChartVanillaJS = ({ formData, chartType, pluginID }) => {
  const { plugin } = pullChartistInfo(pluginID);
  const data = {
    labels: formData.labels ? formData.labels : ["Mon", "Tue", "Wed", "Thu", "Fri"],
    series: formData.series ? formData.series : [[50, 20, 40, 20, 10]],
  };
  const options = {
    axisX: {
      offset: formData.offset_axisx ? Number(formData.offset_axisx) : 30,
      position: formData.position_axisx ? formData.position_axisx : "end",
      labelOffset: {
        x: formData.labelOffsetX_axisx ? Number(formData.labelOffsetX_axisx) : 0,
        y: formData.labelOffsetY_axisx ? Number(formData.labelOffsetY_axisx) : 0,
      },
      showLabel: formData.showLabel_axisx !== undefined ? formData.showLabel_axisx : true,
      showGrid: formData.showGrid_axisx !== undefined ? formData.showGrid_axisx : true,
      labelInterpolationFnc: formData.labelInterpolationFnc_axisx
        ? formData.labelInterpolationFnc_axisx
        : function (value) {
            return value;
          },
      type: formData.type_axisx ? formData.type_axisx : undefined,
    },
    axisY: {
      offset: formData.offset_axisy ? Number(formData.offset_axisy) : 30,
      position: formData.position_axisy ? formData.position_axisy : "start",
      labelOffset: {
        x: formData.labelOffsetX_axisy ? Number(formData.labelOffsetX_axisy) : 0,
        y: formData.labelOffsetY_axisy ? Number(formData.labelOffsetY_axisy) : 0,
      },
      showLabel: formData.showLabel_axisy !== undefined ? formData.showLabel_axisy : true,
      showGrid: formData.showGrid_axisy !== undefined ? formData.showGrid_axisy : true,
      labelInterpolationFnc: formData.labelInterpolationFnc_axisy
        ? formData.labelInterpolationFnc_axisy
        : function (value) {
            return value;
          },
      type: formData.type_axisy ? formData.type_axisy : undefined,
      scaleMinSpace: formData.scaleMinSpace_axisy ? Number(formData.scaleMinSpace_axisy) : 30,
      onlyInteger: formData.onlyInteger_axisy !== undefined ? formData.onlyInteger_axisy : false,
    },
    width: formData.width ? formData.width : undefined,
    height: formData.height ? formData.height : undefined,
    showLine: formData.showLine !== undefined ? formData.showLine : true,
    showPoint: formData.showPoint !== undefined ? formData.showPoint : true,
    showArea: formData.showArea !== undefined ? formData.showArea : false,
    areaBase: formData.areaBase ? Number(formData.areaBase) : 0,
    lineSmooth: formData.lineSmooth !== undefined ? formData.lineSmooth : true,
    showGridBackground: formData.showGridBackground !== undefined ? formData.showGridBackground : false,
    low: formData.low !== null ? formData.low : undefined,
    high: formData.high ? formData.high : undefined,
    chartPadding: {
      top: formData.chartPaddingTop ? Number(formData.chartPaddingTop) : 15,
      right: formData.chartPaddingRight ? Number(formData.chartPaddingRight) : 5,
      bottom: formData.chartPaddingBottom ? Number(formData.chartPaddingBottom) : 5,
      left: formData.chartPaddingLeft ? Number(formData.chartPaddingLeft) : 10,
    },
    fullWidth: formData.fullWidth !== undefined ? formData.fullWidth : false,
    reverseData: formData.reverseData !== undefined ? formData.reverseData : false,
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
  };

  updateChartistInfo(data, options, plugin);
  generateChart(pluginID, chartType);
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
  labelInterpolationFnc_axisx: function (value) {
    return value;
  },
  type_axisx: null,
  offset_axisy: 30,
  position_axisy: "start",
  labelOffsetX_axisy: 0,
  labelOffsetY_axisy: 0,
  showLabel_axisy: true,
  showGrid_axisy: true,
  labelInterpolationFnc_axisy: function (value) {
    return value;
  },
  type_axisy: null,
  scaleMinSpace_axisy: 30,
  onlyInteger_axisy: false,
  width: 0,
  height: 300,
  showLine: true,
  showPoint: true,
  showArea: false,
  areaBase: 0,
  lineSmooth: true,
  showGridBackground: false,
  low: 0,
  high: null,
  chartPaddingTop: 15,
  chartPaddingRight: 5,
  chartPaddingBottom: 5,
  chartPaddingLeft: 10,
  fullWidth: false,
  reverseData: false,
  chartClass: "ct-chart-line",
  labelClass: "ct-label",
  labelGroupClass: "ct-labels",
  seriesClass: "ct-series",
  lineClass: "ct-line",
  pointClass: "ct-point",
  areaClass: "ct-area",
  gridClass: "ct-grid",
  gridGroupClass: "ct-grids",
  gridBackgroundClass: "ct-grid-background",
  verticalClass: "ct-vertical",
  horizontalClass: "ct-horizontal",
  startClass: "ct-start",
  endClass: "ct-end",
};
