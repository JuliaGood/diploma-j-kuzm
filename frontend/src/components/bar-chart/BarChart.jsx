import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: 'white', // Set legend text color to white
      },
    },
    title: {
      display: false,
      text: '',
      color: 'white', // Set title text color to white
    },
  },
  scales: {
    x: {
      ticks: {
        color: 'white', // Set X-axis tick color to white
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.2)', // Set X-axis grid color to a light color
      },
    },
    y: {
      ticks: {
        color: 'white', // Set Y-axis tick color to white
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.2)', // Set Y-axis grid color to a light color
      },
    },
  },
};

const backgroundColors = [
  "rgba(255, 193, 7)", // yellow - Kitchen #1
  "rgba(139, 195, 74)", // green - Living room #2  
  "rgba(53, 162, 235)", // blue - Bathroom  #3
  "rgba(255, 99, 132)", // pink (purple) - Bedroom #4
]

export function BarChart({ stats }) {
  if (!stats.data) {
    return <div>Loading...</div>;
  }

  const datasets = Object.entries(stats.data)
    .map(([roomName, values], index) => {
      return {
        label: roomName,
        data: values.map((value) => {
          return {
            x: value.dimension,
            y: value.totalTime
          }
        }),
        backgroundColor: backgroundColors[index]
      }
    });


  const data = {
    labels: stats.labels,
    datasets: datasets
  }

  return <Bar options={options} data={data} />;
}
