import React, { useEffect, useRef } from "react";
import "./Test.css";
import { myScript } from "./testScript";
import { user } from "../../util/general";

function Test() {
  const scriptRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = myScript;
    script.async = true;
    scriptRef.current.appendChild(script);
  }, []);

  return (
    <div>
      <h1>JS Test</h1>
      <div ref={scriptRef} />
      <div id="chart"></div>
    </div>
  );
}

export default Test;
