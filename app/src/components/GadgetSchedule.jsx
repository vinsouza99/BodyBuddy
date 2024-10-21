import { useEffect, useState, useRef, memo } from "react";
import { GadgetBase } from './GadgetBase';
import { WeekPicker } from "./WeekPicker";
import { Box, Typography } from "@mui/material";
import { RoutineCard } from "../components/RoutineCard";
import { useAuth } from "../utils/AuthProvider.jsx";
import { getRoutinesFromProgram } from "../controllers/RoutineController";
import { getAllUserPrograms } from "../controllers/ProgramController";

export const GadgetSchedule = memo(() => {
  const { user } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [programRoutines, setProgramRoutines] = useState([]);
  const [loading, setLoading] = useState(true);

  // For data cashing
  const dataCacheRef = useRef({
    userId: null,
    programRoutines: null,
  });

  // Initialization
  useEffect(() => {
    // Check if the data is already loaded
    if (
      dataCacheRef.current.userId === user.id &&
      dataCacheRef.current.programRoutines
    ) {
      setProgramRoutines(dataCacheRef.current.programRoutines);
      setLoading(false);
      console.log("Data loaded from cache");
      return;
    }

    const loadData = async () => {
      try {
        const programs = await getAllUserPrograms(user.id);
        setPrograms(programs);

        const routines = await getRoutinesFromProgram(programs[0].id);
        setProgramRoutines(routines);

        // Cache the data
        dataCacheRef.current = {
          userId: user.id,
          programRoutines: routines,
        };

      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <GadgetBase>
      <WeekPicker />
      {/* Program Schedule */}
      {!loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            gap: 2,
          }}
        >
          {programs[0] 
            ? 
              <>
                <Typography
                  sx={{ fontVariationSettings: "'wght' 800"}}
                >
                  {programs[0].name}
                </Typography>
                <Typography 
                  sx={{ textAlign: "left" }}
                >
                  {programs[0].description ? programs[0].description : "Description is undefined"}
                </Typography>
              </>
            : <Typography>No programs available</Typography>
          }

          {programRoutines
            ? programRoutines.map((routine) => (
                <RoutineCard key={routine.id} routine={routine} />
              ))
            : <Typography>No routines available</Typography>
          }

        </Box>
      )}
    </GadgetBase>
  );
});

GadgetSchedule.displayName = 'GadgetSchedule';