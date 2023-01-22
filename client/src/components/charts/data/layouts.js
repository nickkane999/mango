import { fields as barFields, createChart as barCreateChart, template as barChartTemplate } from "./BarChartFormData";
import { fields as lineFields, createChart as lineCreateChart, template as lineChartTemplate } from "./LineChartFormData";
import { createChart as testCreateChart, testData } from "./ChartCodeRaw";

export const chartLayouts = {
  bar: {
    title: "Bar Chart",
    key: "bar",
    settings: {
      fields: barFields,
      createChart: barCreateChart,
      template: barChartTemplate,
      testCreateChart: testCreateChart,
      testTemplate: testData,
    },
  },
  line: {
    title: "Line Chart",
    key: "line",
    settings: {
      fields: lineFields,
      createChart: lineCreateChart,
      template: lineChartTemplate,
      testCreateChart: testCreateChart,
      testTemplate: testData,
    },
  },
};
