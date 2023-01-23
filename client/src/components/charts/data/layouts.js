import { fields as barFields, createChart as barCreateChart, createChart as barCreateChartVanillaJS, template as barChartTemplate } from "./BarChartFormData";
import { fields as lineFields, createChart as lineCreateChart, createChartVanillaJS as lineCreateChartVanillaJS, template as lineChartTemplate } from "./LineChartFormData";

export const chartLayouts = {
  bar: {
    title: "Bar Chart",
    key: "bar",
    settings: {
      fields: barFields,
      createChart: barCreateChart,
      createChartVanillaJS: barCreateChartVanillaJS,
      template: barChartTemplate,
    },
  },
  line: {
    title: "Line Chart",
    key: "line",
    settings: {
      fields: lineFields,
      createChart: lineCreateChart,
      createChartVanillaJS: lineCreateChartVanillaJS,
      template: lineChartTemplate,
    },
  },
};
