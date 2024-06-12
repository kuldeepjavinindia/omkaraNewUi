// src/CustomChart.js
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@material-tailwind/react';

// Register required components with ChartJS
ChartJS.register(CategoryScale, ChartDataLabels, LinearScale, BarElement, Title, Tooltip, Legend);

// Define chart options with default settings and space between bars
const options = {
  indexAxis: 'y', // Make the chart horizontal
  scales: {
    x: {
      ticks: {
        display: true
      },
      grid: {
        display: false
      },
    },
    y: {
      ticks: {
        display: true,
      },
      grid: {
        display: false
      },
      barPercentage: 30, // Adjust to add space between bars
      categoryPercentage: 0.5, // Adjust to add space between categories
    }
  },
  layout: {
    padding: {
      left: 25,
      right: 25,
      top: 0,
    }
  },
  aspectRatio: 10 / 6, // Default aspect ratio
  plugins: {
    datalabels: {
      align: 'end',
      anchor: 'end',
      borderRadius: 4,
      color: 'black',
      display: true,
      padding: 10,
    },
    legend: {
      display: false,
      position: 'left',
    },
    title: {
      display: false,
    },
  },
};

const LineChart = () => {
  // Static demo values for chart labels and data
  const chartLabel = ['January', 'February', 'March', 'April'];
  const chartData = [65, 59, 80, 81]; // Demo data points
  const ratio_type = 'top_bottom'; // Demo ratio type

  const labels = chartLabel; // Using all provided labels

  // Define chart data structure with demo values
  const data = {
    labels,
    datasets: [
      {
        label: 'Demo Data',
        data: chartData,
        borderColor: (context) => (context.raw > 0 ? 'rgb(34, 132, 65)' : 'rgba(244, 67, 54)'),
        backgroundColor: (context) => (context.raw > 0 ? 'rgba(34, 132, 65, 0.5)' : 'rgba(244, 67, 54, 0.5)'),
      },
    ],
  };

  // Adjust aspect ratio based on ratio_type
  const adjustedOptions = {
    ...options,
    aspectRatio: ratio_type === 'top_bottom' ? 10 / 3 : 10 / 6,
  };

  return (
    <div style={{ paddingTop: 0 }}>
      <Typography style={{
        textAlign: "right",
        marginTop: 0,
        marginBottom: -1,
        marginRight: 3,
        fontWeight: '500',
        fontSize: 14
      }}>
        In Cr.
      </Typography>
      <Bar options={adjustedOptions} data={data} />
    </div>
  );
};

export default LineChart;
