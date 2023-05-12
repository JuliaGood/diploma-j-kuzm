import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1', //room Name 
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'Dataset 3', //room Name 
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(139, 195, 74)',
      backgroundColor: 'rgba(139, 195, 74, 0.5)',
    },
    {
      label: 'Dataset 4',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 193, 7)',
      backgroundColor: 'rgba(255, 193, 7, 0.5)',
    },
  ],
};

export function LineChart() {
  return <Line options={options} data={data} />;
}
