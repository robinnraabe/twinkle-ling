import React from "react";
import { Line } from "react-chartjs-2";

function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <h3 style={{ textAlign: "center", color: 'aliceblue' }}>Your Weekly Progress</h3>
      <Line
        data={chartData}
        options={{
            clip: false,
            aspectRatio: 3,
            scales: {
                x: {
                    min: 0,
                    max: 7,
                    grid: {color: '#181818'},
                    ticks: { 
                        color: ['aliceblue'],
                        backgroundColor: 'black',
                        font: {size: 14, weight: 'normal'},
                        maxRotation: 30,
                        minRotation: 30,
                        stepSize: 1,
                        autoSkip: false,
                        padding: 20 }
                },
                y: {
                    min: 0,
                    max: Math.floor(chartData.yMax + 5),
                    grid: {color: '#282828'},
                    ticks: { 
                        color: ['#000000', 'aliceblue'], 
                        font: {size: 18},
                        beginAtZero: true,
                        stepSize: 5,
                        autoSkip: false,
                        padding: 20 }
                }
            },
          plugins: {
            title: {
              display: false,
              text: "Weekly Progress"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;