import { useState, useRef, useEffect } from "react";
import "./Test.css";
import Frame from "react-frame-component";
//import chartistTest from "../../assets/html/chartistTest.html";
import myScript from "./testFunction.js";

function PluginTesting() {
  const [isVisible, setIsVisible] = useState(false);

  setTimeout(() => {
    setIsVisible(true);
  }, 2000);

  const scriptRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = myScript;
    script.async = true;
    scriptRef.current.appendChild(script);
  }, []);

  const script = `  
  <script type="text/javascript">
  // Data for the chart
  console.log("booty");
  /*
  var data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    series: [
      {meta: 'Sales', data: [5, 4, 3, 7, 5, 10, 3]},
      {meta: 'Expenses', data: [2, 5, 3, 2, 4, 6, 3]}
    ]
  };

  // Options for the chart
  var options = {
    axisX: {
      labelInterpolationFnc: function(value, index) {
        return index % 2 === 0 ? value : null;
      }
    }
  };

  // Create the chart
  var chart = new Chartist.Line('#chart', data, options);  
  */
  </script>
  `;

  return (
    <div id="myContent">
      <h1>Testing Features For updating Charts</h1>
      <div id="chart"></div>
      {isVisible && <div dangerouslySetInnerHTML={{ __html: script }} />}
      {/* 
      <Frame>
        <iframe src={chartistTest} title="My iframe" />
      </Frame>
      */}
    </div>
  );
}

export default PluginTesting;
