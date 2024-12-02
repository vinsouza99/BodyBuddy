import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid2 } from "@mui/material";
import { GadgetBase } from "./GadgetBase";
import { MetricCard } from "./routine-session/MetricCard";
import { WeekPicker } from "./WeekPicker";
import {
  parseISO,
  startOfWeek,
  addWeeks,
  isBefore,
  isSameWeek,
} from "date-fns";
import flame1 from "/assets/flame-solid_1.svg";
import flame2 from "/assets/flame-solid_2.svg";

export const GadgetStreaks = ({ userInfo = null, history = [] }) => {
  const navigate = useNavigate();

  const calculateCurrentAndMaxStreak = (history) => {
    if (!history || history?.length === 0) {
      return { currentStreak: 0, maxStreak: 0 };
    }

    // Sort history by date in ascending order
    const sortedHistory = history.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    let currentStreak = 0;
    let maxStreak = 0;
    let ongoingStreak = 0;
    let currentStreakActive = true;
    let weekRecords = [];

    // Group revords by week
    sortedHistory.forEach((entry) => {
      const date = parseISO(entry.date);
      const weekStart = startOfWeek(date, { weekStartsOn: 1 });
      const weekKey = weekStart.toISOString();

      // Initialize the set if it doesn't exist
      if (!weekRecords[weekKey]) {
        weekRecords[weekKey] = new Set();
      }
      // Add the day of the week to the set
      // Monday = 1, Sunday = 7
      weekRecords[weekKey].add(date.getDay());
    });

    // Fill in missing weeks
    const oldestWeek = startOfWeek(parseISO(Object.keys(weekRecords)[0]), {
      weekStartsOn: 1,
    });
    const currentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
    let weekPointer = oldestWeek;
    while (
      isBefore(weekPointer, currentWeek) ||
      isSameWeek(weekPointer, currentWeek, { weekStartsOn: 1 })
    ) {
      const weekKey = weekPointer.toISOString();
      if (!weekRecords[weekKey]) {
        weekRecords[weekKey] = new Set();
      }
      weekPointer = addWeeks(weekPointer, 1);
    }

    // Calculate streaks
    const weeks = Object.keys(weekRecords).sort(
      (a, b) => new Date(b) - new Date(a)
    );

    for (let i = 0; i < weeks.length; i++) {
      if (weekRecords[weeks[i]].size >= 3) {
        ongoingStreak += 1;
        if (currentStreakActive) {
          currentStreak = ongoingStreak;
        }
        maxStreak = Math.max(maxStreak, ongoingStreak);
      } else {
        if (i !== 0) {
          currentStreakActive = false;
        }
        ongoingStreak = 0;
      }
    }
    return { currentStreak, maxStreak };
  };
  const streak = calculateCurrentAndMaxStreak(history);

  const scheduledDates = history.map((h) => h.date);
  return (
    <GadgetBase>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <Box>
          <img src={flame1} alt="Flame 1"></img>
          <MetricCard
            title="Week Streaks"
            value={userInfo ? streak.currentStreak : 0}
            color="black"
          />
        </Box>
        <Box>
          <img src={flame2} alt="Flame 2"></img>
          <MetricCard
            title="Best Streaks"
            value={userInfo ? streak.maxStreak : 0}
            color="black"
          />
        </Box>
      </Box>
      <Grid2 container width={"100%"} gap={2} justifyContent={"center"}>
        <Typography variant="body1">This Week</Typography>
        <WeekPicker
          scheduledDates={scheduledDates}
          scheduledDatesBorderColor={"transparent"}
          scheduledDatesBgColor={"accent.main"}
        />
      </Grid2>

      <Typography>
        Exercise at least 3 times a week to keep your streak not reset
      </Typography>
      <Button variant="contained" onClick={() => navigate("/training")}>
        Today&apos;s Routine
      </Button>
    </GadgetBase>
  );
};

GadgetStreaks.propTypes = {
  userInfo: PropTypes.object,
  history: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      minutes: PropTypes.number.isRequired,
      user_id: PropTypes.string.isRequired,
    })
  ).isRequired,
};
