import { fields as barFields, createChartVanillaJS as barCreateChart, template as barChartTemplate } from "./BarChartFormData";
import { fields as lineFields, createChartVanillaJS as lineCreateChart, template as lineChartTemplate } from "./LineChartFormData";

export const chartLayouts = {
  bar: {
    title: "Bar Chart",
    key: "bar",
    settings: {
      fields: barFields,
      createChartVanillaJS: barCreateChart,
      template: barChartTemplate,
    },
  },
  line: {
    title: "Line Chart",
    key: "line",
    settings: {
      fields: lineFields,
      createChartVanillaJS: lineCreateChart,
      template: lineChartTemplate,
    },
  },
};
