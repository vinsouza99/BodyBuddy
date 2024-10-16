import { useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from '@mui/material';
import { GadgetBase } from './GadgetBase';
import theme from '../theme';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const GadgetHistory = () => {
  const navigate = useNavigate();
  const chartRef = useRef(null);

  // Dummy data for the chart
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Exercise Time (minutes)',
        data: [10, 30, 90, 50, 0, 40, 70],
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
        borderWidth: 1,
        borderRadius: 5,
        barThickness: 30,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Weekly Exercise Time',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Days of the Week',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Exercise Time (minutes)',
        },
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    const chartInstance = chartRef.current?.chartInstance;

    // Cleanup
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <GadgetBase title="Your activity">
      <Box sx={{ height: '300px', width: '100%' }}>
        <Bar data={data} options={options} />
      </Box>
      <Typography>
        We help you track your progress as data and video as you becoming a better version of yourself.
      </Typography>
      <Button
        variant="contained" 
        sx={{ 
          width: '50%',
        }}
        onClick={() => navigate('/profile')}
      >
        My history
      </Button>
    </GadgetBase>
  );
};