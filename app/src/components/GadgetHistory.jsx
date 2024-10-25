import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { GadgetBase } from "./GadgetBase";
import { WeekPicker } from "./WeekPicker";
import { format, parseISO, startOfWeek, isWithinInterval, addDays } from "date-fns";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const GadgetHistory = ({ history = [] }) => {
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const [totalDuration, setTotalDuration] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [startOfCurrentWeek, setStartOfCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 })); // 現在の週の月曜日

  const [chartData, setChartData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Exercise Time (minutes)",
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#94DC8A",
        borderColor: "#94DC8A",
        borderWidth: 1,
        borderRadius: 5,
        barThickness: 30,
      },
    ],
  });
  // !!!THIS IS DUMMY DATA GENERATOR!!!
  // const generateRandomData = () => {
  //   const days = 7;
  //   const maxPerDay = 100;

  //   const randomData = Array(days)
  //     .fill(0)
  //     .map(() => {
  //       return Math.floor(Math.random() * maxPerDay);
  //     });

  //   return {
  //     labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //     datasets: [
  //       {
  //         label: "Exercise Time (minutes)",
  //         data: randomData,
  //         backgroundColor: "#94DC8A",
  //         borderColor: "#94DC8A",
  //         borderWidth: 1,
  //         borderRadius: 5,
  //         barThickness: 30,
  //       },
  //     ],
  //   };
  // };

  useEffect(() => {
    if (history && history.length > 0) {
      const endOfCurrentWeek = addDays(startOfCurrentWeek, 6);
      const weeklyData = Array(7).fill(0);

      history.forEach((entry) => {
        const entryDate = parseISO(entry.date);
        if (isWithinInterval(entryDate, { start: startOfCurrentWeek, end: endOfCurrentWeek })) {
          const dayOfWeek = (parseInt(format(entryDate, "i")) - 1 + 7) % 7;
          weeklyData[dayOfWeek] += entry.minutes;
        }
      });

      setChartData((prevChartData) => ({
        ...prevChartData,
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: weeklyData,
          },
        ],
      }));

      setTotalDuration(weeklyData.reduce((acc, curr) => acc + curr, 0));
    }
  }, [history, startOfCurrentWeek]);

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
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

  // Chart resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Update total duration
  useEffect(() => {
    setTotalDuration(
      chartData.datasets[0].data.reduce((acc, curr) => acc + curr, 0)
    );
  }, [chartData]);

  const handleSelectDate = (day) => {
    console.log(day);
  };

  const handleNextWeek = (day) => {
    console.log(day);
    // setChartData(generateRandomData());
    setStartOfCurrentWeek((prev) => addDays(prev, 7));
  };

  const handlePreviousWeek = (day) => {
    console.log(day);
    // setChartData(generateRandomData());
    setStartOfCurrentWeek((prev) => addDays(prev, -7));
  };

  return (
    <GadgetBase>
      <WeekPicker
        onSelectDate={handleSelectDate}
        onClickNextWeek={handleNextWeek}
        onClickPreviousWeek={handlePreviousWeek}
        displayMode={null}
      />
      <Typography>{`Total: ${totalDuration} min`}</Typography>
      <Box sx={{ height: "300px", width: "100%" }}>
        {/* <Bar
          data={chartData}
          options={options}
          key={windowWidth}
          ref={chartRef}
        /> */}
        {chartData && chartData.datasets && chartData.datasets[0].data ? (
          <Bar 
            data={chartData} 
            options={options} 
            key={windowWidth} 
            ref={chartRef} 
          />
        ) : (
          <Typography>No data available</Typography>
        )}
      </Box>
      <Typography>
        We help you track your progress as data and video as you becoming a
        better version of yourself.
      </Typography>
      <Button
        variant="contained"
        sx={{
          width: "50%",
        }}
        onClick={() => navigate("/profile")}
      >
        My history
      </Button>
    </GadgetBase>
  );
};

GadgetHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      minutes: PropTypes.number.isRequired,
      user_id: PropTypes.string.isRequired,
    })
  ).isRequired,
};