import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
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

// Chart.js initialization
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import theme from "../theme.js";

export const GadgetHistory = ({ history = [] }) => {
  const navigate = useNavigate();
  const chartRef = useRef(null);
  const [totalDuration, setTotalDuration] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [mode, setMode] = useState("week-simple");
  const [startOfCurrentWeek, setStartOfCurrentWeek] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [startOfCurrentMonth, setStartOfCurrentMonth] = useState(
    startOfMonth(new Date())
  );
  const [startOfCurrentYear, setStartOfCurrentYear] = useState(
    startOfYear(new Date())
  );
  const [options, setOptions] = useState({
    font: {
      family: "'Montserrat', 'Arial', sans-serif",
    },
    theme: theme,
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        padding: 10,
        titleColor: "#000",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderColor: "rgba(0, 0, 0, 0.5)",
        borderWidth: 1,
        bodyColor: "#000",
        titleFont: { size: 16, weight: "bold" },
        bodyFont: { size: 16 },
        caretSize: 10,
        cornerRadius: 15,
        position: "average",
        yAlign: "bottom",
      },
    },
    scales: {
      x: {
        ticks: {
          align: "end",
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 70,
      },
    },
    animation: {
      duration: 500,
      easing: "easeInOutQuad",
    },
  });
  const [chartData, setChartData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      // For minutes
      {
        label: "Minutes (min)",
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#B8E8B1",
        borderColor: "#B8E8B1",
        borderRadius: 5,
        barPercentage: 1,
      },
      // For calories
      {
        label: "Calories (kcal)",
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#489FE4",
        borderColor: "#489FE4",
        borderRadius: 5,
        barThickness: 0,
      },
    ],
  });

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

  // Add char resize event listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    // Initial resize
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Chart resize
  useEffect(() => {
    chartRef.current.resize();
  }, [windowWidth]);

  // When the mode is changed, reset the start date of the week or month
  useEffect(() => {
    const today = new Date();
    setStartOfCurrentWeek(startOfWeek(today, { weekStartsOn: 1 }));
    setStartOfCurrentMonth(startOfMonth(today));
    setStartOfCurrentYear(startOfYear(today));
  }, [mode]);

  // Switch chart views between week, month, and year
  useEffect(() => {
    if (mode === "week-simple") {
      handleWeeklyView();
    } else if (mode === "month-simple") {
      handleMonthlyView();
    } else if (mode === "year-simple") {
      handleYearlyView();
    }
  }, [history, startOfCurrentWeek, startOfCurrentMonth, startOfCurrentYear]);

  const handleModeChange = (event, newMode) => {
    if (newMode) {
      setMode(newMode);
    }
  };

  const handleWeeklyView = () => {
    const endOfCurrentWeek = addDays(startOfCurrentWeek, 6);
    const weeklyMinutesData = Array(7).fill(0);
    const weeklyCaloriesData = Array(7).fill(0);

    history.forEach((entry) => {
      const entryDate = parseISO(entry.date);
      if (
        isWithinInterval(entryDate, {
          start: startOfCurrentWeek,
          end: endOfCurrentWeek,
        })
      ) {
        const dayOfWeek = (parseInt(format(entryDate, "i")) - 1 + 7) % 7;
        weeklyMinutesData[dayOfWeek] += entry.minutes;
        weeklyCaloriesData[dayOfWeek] += entry.calories;
      }
    });
    setChartData((prevChartData) => ({
      ...prevChartData,
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        { ...prevChartData.datasets[0], data: weeklyMinutesData }, // minutes
        { ...prevChartData.datasets[1], data: weeklyCaloriesData }, // calories
      ],
    }));
    setOptions((prevOptions) => ({
      ...prevOptions,
      scales: {
        ...prevOptions.scales,
        y: {
          ...prevOptions.scales.y,
          max: Math.max(...weeklyMinutesData) + 5,
        },
      },
    }));
    setTotalDuration(weeklyMinutesData.reduce((acc, curr) => acc + curr, 0));
    setTotalCalories(weeklyCaloriesData.reduce((acc, curr) => acc + curr, 0));
  };

  const handleMonthlyView = () => {
    const endOfCurrentMonth = endOfMonth(startOfCurrentMonth);
    const daysInMonth = getDate(endOfCurrentMonth);
    const monthlyMinutesData = Array(daysInMonth).fill(0);
    const monthlyCaloriesData = Array(daysInMonth).fill(0);

    history.forEach((entry) => {
      const entryDate = parseISO(entry.date);
      if (
        isWithinInterval(entryDate, {
          start: startOfCurrentMonth,
          end: endOfCurrentMonth,
        })
      ) {
        const dayOfMonth = getDate(entryDate) - 1;
        monthlyMinutesData[dayOfMonth] += entry.minutes;
        monthlyCaloriesData[dayOfMonth] += entry.calories;
      }
    });
    setChartData((prevChartData) => ({
      ...prevChartData,
      labels: Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString()),
      datasets: [
        { ...prevChartData.datasets[0], data: monthlyMinutesData },
        { ...prevChartData.datasets[1], data: monthlyCaloriesData },
      ],
    }));
    setOptions((prevOptions) => ({
      ...prevOptions,
      scales: {
        ...prevOptions.scales,
        y: {
          ...prevOptions.scales.y,
          max: Math.max(...monthlyMinutesData) + 5,
        },
      },
    }));
    setTotalDuration(monthlyMinutesData.reduce((acc, curr) => acc + curr, 0));
    setTotalCalories(monthlyCaloriesData.reduce((acc, curr) => acc + curr, 0));
  };

  const handleYearlyView = () => {
    const endOfCurrentYear = endOfYear(startOfCurrentYear);
    const yearlyMinutesData = Array(12).fill(0);
    const yearlyCaloriesData = Array(12).fill(0);

    history.forEach((entry) => {
      const entryDate = parseISO(entry.date);
      if (
        isWithinInterval(entryDate, {
          start: startOfCurrentYear,
          end: endOfCurrentYear,
        })
      ) {
        const monthOfYear = getMonth(entryDate);
        yearlyMinutesData[monthOfYear] += entry.minutes;
        yearlyCaloriesData[monthOfYear] += entry.calories;
      }
    });
    setChartData((prevChartData) => ({
      ...prevChartData,
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        { ...prevChartData.datasets[0], data: yearlyMinutesData },
        { ...prevChartData.datasets[1], data: yearlyCaloriesData },
      ],
    }));
    setOptions((prevOptions) => ({
      ...prevOptions,
      scales: {
        ...prevOptions.scales,
        y: {
          ...prevOptions.scales.y,
          max: Math.max(...yearlyMinutesData) + 50,
        },
      },
    }));
    setTotalDuration(yearlyMinutesData.reduce((acc, curr) => acc + curr, 0));
    setTotalCalories(yearlyCaloriesData.reduce((acc, curr) => acc + curr, 0));
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

  return (
    <GadgetBase>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={handleModeChange}
          aria-label="mode"
          sx={{
            "& .MuiToggleButton-root": {
              border: "1px solid #ccc",
              "&.Mui-selected": {
                borderColor: "transparent",
                outline: "none",
                backgroundColor: "#94DC8A",
              },
              "&:focus": {
                borderColor: "transparent",
                outline: "none",
              },
            },
          }}
        >
          <ToggleButton
            value="week-simple"
            aria-label="week"
            sx={{
              padding: "4px 10px",
            }}
          >
            Week
          </ToggleButton>
          <ToggleButton
            value="month-simple"
            aria-label="month"
            sx={{
              padding: "4px 10px",
            }}
          >
            Month
          </ToggleButton>
          <ToggleButton
            value="year-simple"
            aria-label="month"
            sx={{
              padding: "4px 10px",
            }}
          >
            Year
          </ToggleButton>
        </ToggleButtonGroup>
        <Box width={{ md: "100%", lg: "65%" }}>
          <WeekPicker
            onClickNextWeek={handleNext}
            onClickPreviousWeek={handlePrevious}
            displayMode={mode}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2, alignContent: "baseline" }}>
          <Typography variant="body1">Total: </Typography>
          <Typography
            variant="body1"
            fontSize={"1.2rem"}
            sx={{ fontWeight: "700" }}
          >{`${totalDuration} min, ${totalCalories} kcal`}</Typography>
        </Box>
        <Box sx={{ height: "300px", width: "100%" }}>
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
      </Box>
      <Typography>
        We help you track your progress as data and video as you becoming a
        better version of yourself.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/profile")}>
        My History
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
