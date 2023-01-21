import ChartMenu from "../../components/charts/sections/ChartMenu";
import { ChartProvider } from "../../components/charts/context/chartStore";
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
