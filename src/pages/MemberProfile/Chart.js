var React = require("react");
var Component = React.Component;
import CanvasJSReact from "src/canvasjs.react";
// var CanvasJSReact = require("./canvasjs.react");
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export default function ChartJs({ target, earning }) {
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2", // "light1", "dark1", "dark2"
    title: {
      text: "90 Day Tracker",
    },
    axisY: {
      //   title: "Bounce Rate",
      suffix: "",
    },
    axisX: {
      //   title: "Week of Year",
      prefix: "",
      interval: 300,
    },
    data: [
      {
        type: "area",
        toolTipContent: " {x}: {y}",
        dataPoints: [
          { x: 0, y: 0 },
          { x: 500, y: 500 },
          { x: 1000, y: 1000 },
          { x: 1500, y: 1500 },
          { x: 2000, y: 2000 },
        ],
      },
    ],
  };
  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}
