import { fields as barFields, createChart as barCreateChart, template as barChartTemplate, createChartData, createChartOptions } from "./BarChartFormData";
import { fields as lineFields, createChart as lineCreateChart, template as lineChartTemplate } from "./LineChartFormData";

export const chartLayouts = {
  bar: {
    title: "Bar Chart",
    key: "bar",
    settings: {
      fields: barFields,
      createChart: barCreateChart,
      template: barChartTemplate,
      createChartData: createChartData,
      createChartOptions: createChartOptions,
    },
  },
  line: {
    title: "Line Chart",
    key: "line",
    settings: {
      fields: lineFields,
      createChart: lineCreateChart,
      template: lineChartTemplate,
      createChartData: createChartData,
      createChartOptions: createChartOptions,
    },
  },
};
