import * as d3 from "d3";

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

export const data = [
  { key: "A", value: 0.08167 },
  { key: "B", value: 0.01492 },
  { key: "C", value: 0.02782 },
  { key: "D", value: 0.04253 },
  { key: "E", value: 0.12702 },
  { key: "F", value: 0.02288 },
  { key: "G", value: 0.02015 },
  { key: "H", value: 0.06094 },
  { key: "I", value: 0.06966 },
  { key: "J", value: 0.00153 },
  { key: "K", value: 0.00772 },
  { key: "L", value: 0.04025 },
  { key: "M", value: 0.02406 },
  { key: "N", value: 0.06749 },
  { key: "O", value: 0.07507 },
  { key: "P", value: 0.01929 },
  { key: "Q", value: 0.00095 },
  { key: "R", value: 0.05987 },
  { key: "S", value: 0.06327 },
  { key: "T", value: 0.09056 },
  { key: "U", value: 0.02758 },
  { key: "V", value: 0.00978 },
  { key: "W", value: 0.0236 },
  { key: "X", value: 0.0015 },
  { key: "Y", value: 0.01974 },
  { key: "Z", value: 0.00074 },
];

export const settings = {
  x: (d) => d.key,
  y: (d) => d.value,
  xDomain: d3.groupSort(
    data,
    ([d]) => -d.value,
    (d) => d.key
  ), // sort by descending value
};

export const settings_old = {
  x: (d) => d.key,
  y: (d) => d.value,
  xDomain: d3.groupSort(
    data,
    ([d]) => -d.value,
    (d) => d.key
  ), // sort by descending value
  yFormat: "%",
  yLabel: "↑ Frequency",
  width: 1000,
  height: 500,
  color: "steelblue",
};
