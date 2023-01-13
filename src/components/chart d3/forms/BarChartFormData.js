import * as d3 from 'd3';

export const fields = [
    { name: 'Title', key: 'title', type: "Styling", },
    { name: 'Margin Top', key: 'marginTop', type: "Styling" },
    { name: 'Margin Right', key: 'marginRight', type: "Styling" },
    { name: 'Margin Left', key: 'marginLeft', type: "Styling" },
    { name: 'Margin Bottom', key: 'marginBottom', type: "Styling" },
    { name: 'Width', key: 'width', type: "Styling" },
    { name: 'Height', key: 'height', type: "Styling" },
    { name: 'xPadding', key: 'xPadding', type: "Styling" },
    { name: 'yFormat', key: 'yFormat', type: "Styling", default: "%" },
    { name: 'yLabel', key: 'yLabel', type: "Styling", default: "↑ value" },
    { name: 'Color', key: 'color', type: "Styling", default: "steelblue" },
    { name: 'Data', key: 'data', type: "Data" },
];

export const data = [
    {key: "A", value: 0.08167},
    {key: "B", value: 0.01492},
    {key: "C", value: 0.02782},
    {key: "D", value: 0.04253},
    {key: "E", value: 0.12702},
    {key: "F", value: 0.02288},
    {key: "G", value: 0.02015},
    {key: "H", value: 0.06094},
    {key: "I", value: 0.06966},
    {key: "J", value: 0.00153},
    {key: "K", value: 0.00772},
    {key: "L", value: 0.04025},
    {key: "M", value: 0.02406},
    {key: "N", value: 0.06749},
    {key: "O", value: 0.07507},
    {key: "P", value: 0.01929},
    {key: "Q", value: 0.00095},
    {key: "R", value: 0.05987},
    {key: "S", value: 0.06327},
    {key: "T", value: 0.09056},
    {key: "U", value: 0.02758},
    {key: "V", value: 0.00978},
    {key: "W", value: 0.0236},
    {key: "X", value: 0.0015},
    {key: "Y", value: 0.01974},
    {key: "Z", value: 0.00074},
  ]

  export const settings = {
    x: d => d.key,
    y: d => d.value,
    xDomain: d3.groupSort(data, ([d]) => -d.value, d => d.key), // sort by descending value
  }

  export const settings_old = {
    x: d => d.key,
    y: d => d.value,
    xDomain: d3.groupSort(data, ([d]) => -d.value, d => d.key), // sort by descending value
    yFormat: "%",
    yLabel: "↑ Frequency",
    width: 1000,
    height: 500,
    color: "steelblue"
  }