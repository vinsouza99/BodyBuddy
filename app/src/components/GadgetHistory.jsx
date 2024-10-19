import { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from '@mui/material';
import { GadgetBase } from './GadgetBase';
import { WeekPicker } from './WeekPicker';
// import theme from '../theme';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const GadgetHistory = () => {
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const [ totalDuration, setTotalDuration ] = useState(0); 

  // !!!THIS IS DUMMY DATA!!!
  const [chartData, setChartData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Exercise Time (minutes)',
        data: [10, 30, 90, 50, 0, 40, 70],
        backgroundColor: '#94DC8A',
        borderColor: '#94DC8A',
        borderWidth: 1,
        borderRadius: 5,
        barThickness: 30,
      },
    ],
  });
  // !!!THIS IS DUMMY DATA GENERATOR!!!
  const generateRandomData = () => {
    const days = 7;
    const maxPerDay = 100;
    
    const randomData = Array(days).fill(0).map(() => {
      return Math.floor(Math.random() * maxPerDay);
    });
    
    return {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Exercise Time (minutes)',
          data: randomData,
          backgroundColor: '#94DC8A',
          borderColor: '#94DC8A',
          borderWidth: 1,
          borderRadius: 5,
          barThickness: 30,
        },
      ],
    };
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
        // display: true,
        // text: 'Weekly Exercise Time',
      },
    },
    scales: {
      x: {
        title: {
          // display: true,
          // text: 'Days of the Week',
        },
      },
      y: {
        title: {
          // display: true,
          // text: 'Exercise Time (minutes)',
        },
        beginAtZero: true,
        max: 100, // Maximum value of the y-axis
      },
    },
  };

  // Initialization
  useEffect(() => {
    const chartInstance = chartRef.current?.chartInstance;

    // Cleanup
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  // Update total duration
  useEffect(() => {
    setTotalDuration(chartData.datasets[0].data.reduce((acc, curr) => acc + curr, 0));
  }, [chartData]);

  const handleSelectDate = (day) => {
    console.log(day);
  };

  const handleNextWeek = (day) => {
    console.log(day);
    setChartData(generateRandomData());
  };

  const handlePreviousWeek = (day) => {
    console.log(day);
    setChartData(generateRandomData());
  };

  return (
    <GadgetBase>
      <WeekPicker onSelectDate={handleSelectDate} onClickNextWeek={handleNextWeek} onClickPreviousWeek={handlePreviousWeek} displayMode={null} />
      <Typography>
        {`Total: ${totalDuration} min`}
      </Typography>
      <Box sx={{ height: '300px', width: '100%' }}>
        <Bar data={chartData} options={options} />
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