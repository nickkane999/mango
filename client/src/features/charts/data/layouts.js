import { fields as barFields, createChartData as barCreateChartData, template as barChartTemplate } from "./BarChartFormData";
import { fields as lineFields, createChartData as lineCreateChartData, template as lineChartTemplate } from "./LineChartFormData";

export const chartLayouts = {
  bar: {
    title: "Bar Chart",
    key: "bar",
    settings: {
      fields: barFields,
      createChartData: barCreateChartData,
      template: barChartTemplate,
    },
  },
  line: {
    title: "Line Chart",
    key: "line",
    settings: {
      fields: lineFields,
      createChartData: lineCreateChartData,
      template: lineChartTemplate,
    },
  },
};
