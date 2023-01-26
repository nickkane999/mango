import ChartMenu from "../../features/charts/pages/ChartMenu";
import { ChartProvider } from "../../features/charts/context/chartStore";
import "./Chart.css";

function Chart() {
  return (
    <div>
      <h1>Chart Builder - Chartist</h1>
      <ChartProvider>
        <ChartMenu />
      </ChartProvider>
    </div>
  );
}

export default Chart;
