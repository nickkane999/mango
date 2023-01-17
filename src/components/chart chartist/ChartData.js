import { fields as barFields, createChart as barCreateChart } from "./forms/BarChartFormData";
import { fields as lineFields, createChart as lineCreateChart } from "./forms/LineChartFormData";

export const chartLayouts = {
  bar: {
    title: "Bar Chart",
    key: "bar",
    fields: barFields,
    createChart: barCreateChart,
  },
  line: {
    title: "Line Chart",
    key: "line",
    fields: lineFields,
    createChart: lineCreateChart,
  },
};
