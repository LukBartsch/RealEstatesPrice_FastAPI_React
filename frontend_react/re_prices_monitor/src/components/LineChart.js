import React from "react";
import { Line } from "react-chartjs-2";


function LineChart({ chartData }) {
  return (
    <div>
      {/* <h2 style={{ textAlign: "center" }}>Line Chart</h2> */}
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Average Real Estates Price for square meter",
            },
            legend: {
              display: true
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;