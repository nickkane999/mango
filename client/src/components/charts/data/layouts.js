import { fields as barFields, createChart as barCreateChart, template as barChartTemplate } from "./BarChartFormData";
import { fields as lineFields, createChart as lineCreateChart, template as lineChartTemplate } from "./LineChartFormData";

export const chartLayouts = {
  bar: {
    title: "Bar Chart",
    key: "bar",
    settings: {
      fields: barFields,
      createChart: barCreateChart,
      template: barChartTemplate,
    },
  },
  line: {
    title: "Line Chart",
    key: "line",
    settings: {
      fields: lineFields,
      createChart: lineCreateChart,
      template: lineChartTemplate,
    },
  },
};
