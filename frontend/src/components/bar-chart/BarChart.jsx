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
import faker from "faker";

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
  "rgba(255, 99, 132)",
  "rgba(53, 162, 235)",
  "rgba(139, 195, 74)",
  "rgba(255, 193, 7)",
]

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 5000 })),
//       backgroundColor: "rgba(255, 99, 132)"
//     },
//     {
//       label: "Dataset 2",
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: "rgba(53, 162, 235)"
//     },
//     {
//       label: "Dataset 3",
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: "rgba(139, 195, 74)"
//     },
//     {
//       label: "Dataset 4",
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: "rgba(255, 193, 7)"
//     }
//   ]
// };

export function BarChart({ stats }) {
  if (!stats.data) {
    return <div>Loading...</div>;
  }

  // const chartData = stats.labels.map((label) => {
  //   const matchingData = stats.data.find((data) => data.x === label);
  //   return matchingData ? matchingData.y : 0;
  // });

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
