import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { GadgetBase } from "./GadgetBase";
import { WeekPicker } from "./WeekPicker";
import { 
  format,
  parseISO,
  startOfWeek,
  startOfMonth, 
  startOfYear,
  endOfMonth, 
  endOfYear,
  isWithinInterval, 
  addDays, 
  addMonths, 
  getDate,
  getMonth,
 } from "date-fns";
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
  const [mode, setMode] = useState("week-simple"); 
  const [startOfCurrentWeek, setStartOfCurrentWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [startOfCurrentMonth, setStartOfCurrentMonth] = useState(startOfMonth(new Date()));
  const [startOfCurrentYear, setStartOfCurrentYear] = useState(startOfYear(new Date()));
  const [selectedChartElement, setSelectedChartElement] = useState(null);
  const [chartData, setChartData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Exercise Time (minutes)",
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#94DC8A",
        borderColor: "#94DC8A",
        borderWidth: 1,
        borderRadius: 2,
        barThickness: 15,
      },
    ],
  });

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: mode === "year-simple" ? 300 : 100,
      },
    },
    animation: {
      duration: 500,
      easing: 'easeInOutCubic',
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

  // When the mode is changed, reset the start date of the week or month
  useEffect(() => {
    const today = new Date();
    setStartOfCurrentWeek(startOfWeek(today, { weekStartsOn: 1 }));
    setStartOfCurrentMonth(startOfMonth(today));
    setStartOfCurrentYear(startOfYear(today));
  }, [mode]);

  useEffect(() => {
    if (mode === "week-simple") {
      updateWeeklyData();
    } else if (mode === "month-simple") {
      updateMonthlyData();
    } else if (mode === "year-simple") {
      updatedYearlyData();
    }
  }, [history, startOfCurrentWeek, startOfCurrentMonth, startOfCurrentYear]);

  const updateWeeklyData = () => {
    const endOfCurrentWeek = addDays(startOfCurrentWeek, 6);
    const weeklyData = Array(7).fill(0);
    // console.log("startOfCurrentWeek - endOfCurrentWeek", startOfCurrentWeek, endOfCurrentWeek);

    history.forEach((entry) => {
      const entryDate = parseISO(entry.date);
      if (isWithinInterval(entryDate, { start: startOfCurrentWeek, end: endOfCurrentWeek })) {
        const dayOfWeek = (parseInt(format(entryDate, "i")) - 1 + 7) % 7;
        weeklyData[dayOfWeek] += entry.minutes;
      }
    });
    setChartData((prevChartData) => ({
      ...prevChartData,
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [{ ...prevChartData.datasets[0], data: weeklyData }],
    }));
    setTotalDuration(weeklyData.reduce((acc, curr) => acc + curr, 0));
  };

  const updateMonthlyData = () => {
    const endOfCurrentMonth = endOfMonth(startOfCurrentMonth);
    const daysInMonth = getDate(endOfCurrentMonth);
    const monthlyData = Array(daysInMonth).fill(0);
    // console.log("startOfCurrentMonth - endOfCurrentMonth", startOfCurrentMonth, endOfCurrentMonth);

    history.forEach((entry) => {
      const entryDate = parseISO(entry.date);
      if (isWithinInterval(entryDate, { start: startOfCurrentMonth, end: endOfCurrentMonth })) {
        const dayOfMonth = getDate(entryDate) - 1;
        monthlyData[dayOfMonth] += entry.minutes;
      }
    });
    // console.log("monthlyData", monthlyData);

    setChartData((prevChartData) => ({
      ...prevChartData,
      labels: Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString()),
      datasets: [{ ...prevChartData.datasets[0], data: monthlyData }],
    }));
    setTotalDuration(monthlyData.reduce((acc, curr) => acc + curr, 0));
  };

  const updatedYearlyData = () => {
    const endOfCurrentYear = endOfYear(startOfCurrentYear);
    const yearlyData = Array(12).fill(0); 
    // console.log("startOfCurrentYear - endOfCurrentYear", startOfCurrentYear, endOfCurrentYear);

    history.forEach((entry) => {
      const entryDate = parseISO(entry.date);
      if (isWithinInterval(entryDate, { start: startOfCurrentYear, end: endOfCurrentYear })) {
        const monthOfYear = getMonth(entryDate);
        yearlyData[monthOfYear] += entry.minutes;
      }
    });
    // console.log("yearlyData", yearlyData);

    setChartData((prevChartData) => ({
      ...prevChartData,
      // labels: Array.from({ length: 12 }, (_, i) => (i + 1).toString()),
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [{ ...prevChartData.datasets[0], data: yearlyData }],
    }));
    setTotalDuration(yearlyData.reduce((acc, curr) => acc + curr, 0));
  };

  const handleModeChange = (event, newMode) => {
    if (newMode) {
      setMode(newMode);
    }
  };

  const handleNext = () => {
    if (["week-basic", "week-simple"].includes(mode)) {
      setStartOfCurrentWeek((prev) => addDays(prev, 7));
    } else if (mode === "month-simple") {
      setStartOfCurrentMonth((prev) => addMonths(prev, 1));
    } else if (mode === "year-simple") {
      setStartOfCurrentYear((prev) => addMonths(prev, 12));
    }
  };

  const handlePrevious = () => {
    if (["week-basic", "week-simple"].includes(mode)) {
      setStartOfCurrentWeek((prev) => addDays(prev, -7));
    } else if (mode === "month-simple") {
      setStartOfCurrentMonth((prev) => addMonths(prev, -1));
    } else if (mode === "year-simple") {
      setStartOfCurrentYear((prev) => addMonths(prev, -12));
    }
  };

  const handleChartClick = (event) => {
    const chart = chartRef.current;
    if (!chart) return;

    const elements = chart.getElementsAtEventForMode(event.nativeEvent, 'nearest', { intersect: true }, true);

    if (elements.length > 0) {
      const { index } = elements[0];
      const label = chartData.labels[index];
      const value = chartData.datasets[0].data[index];
      setSelectedChartElement({ label, value });
    }
  }

  return (
    <GadgetBase>
      <Box 
        sx={{ 
          width: "100%", 
          display: "flex", 
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2 
        }}
      >
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleModeChange}
          aria-label="mode"
          sx={{ flexGrow: 1}}
        >
          <ToggleButton 
            value="week-simple" 
            aria-label="week" 
            sx={{ 
              padding: "5px 10px",
              "&.Mui-selected": {
                outline: "none", // Removes the blue border for the selected tab
                border: "none", // Removes border
              },
              "&:focus": {
                outline: "none", // Removes focus outline on keyboard focus
              },
            }}
          >
            Week
          </ToggleButton>
          <ToggleButton
            value="month-simple" 
            aria-label="month" 
            sx={{ 
              padding: "5px 10px",
              "&.Mui-selected": {
                outline: "none", // Removes the blue border for the selected tab
                border: "none", // Removes border
              },
              "&:focus": {
                outline: "none", // Removes focus outline on keyboard focus
              },
            }}
          >
            Month
          </ToggleButton>
          <ToggleButton
            value="year-simple" 
            aria-label="month" 
            sx={{ 
              padding: "5px 10px",
              "&.Mui-selected": {
                outline: "none", // Removes the blue border for the selected tab
                border: "none", // Removes border
              },
              "&:focus": {
                outline: "none", // Removes focus outline on keyboard focus
              },
            }}
          >
            Year
          </ToggleButton>
        </ToggleButtonGroup>
        <WeekPicker
          onClickNextWeek={handleNext}
          onClickPreviousWeek={handlePrevious}
          displayMode={mode}
        />
        <Typography>{`Total: ${totalDuration} min`}</Typography>
        <Box sx={{ height: "300px", width: "100%" }}>
          {chartData && chartData.datasets && chartData.datasets[0].data ? (
            <Bar 
              data={chartData} 
              options={options} 
              key={windowWidth} 
              ref={chartRef}
              onClick={handleChartClick}  
            />
          ) : (
            <Typography>No data available</Typography>
          )}
        </Box>
        {selectedChartElement && (
        <Box 
          sx={{ 
            border: "1px solid #94DC8A",
            borderRadius: "25px",
            padding: "4px 16px",
          }}
          >
            <Typography>
              {selectedChartElement?.value} min
            </Typography>
        </Box>
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