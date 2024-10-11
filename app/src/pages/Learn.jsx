import React from "react";
import { useEffect } from "react";
import { setPageTitle } from "../utils/utils";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { LearningCard } from "../components/LearningCard";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export const Learn = (props) => {
  useEffect(() => {
    setPageTitle(props.title);
  }, [props.title]);

  const [value, setValue] = React.useState(0);

  const [age, setAge] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setAge(event.target.value);
  };

  return (
    <>
      <Box display="flex" alignItems="flex-start">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Exercises by Muscle" />
          <Tab label="Exercises by Goal" />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <Box display="flex" gap={1} sx={{ marginTop: 2, marginBottom: 4 }}>
          <FormControl sx={{ width: 200 }}>
            <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>All Levels</MenuItem>
              <MenuItem value={20}>Beginner</MenuItem>
              <MenuItem value={30}>Intermediate</MenuItem>
              <MenuItem value={30}>Advanced</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained">Shoulders</Button>
          <Button variant="contained">Chest</Button>
          <Button variant="contained">Back</Button>
          <Button variant="contained">Arms</Button>
          <Button variant="contained">Core</Button>
          <Button variant="contained">Hips</Button>
          <Button variant="contained">Legs</Button>
        </Box>

        <Grid container spacing={3}>
          <Grid size={4}>
            <LearningCard />
          </Grid>
          <Grid size={4}>
            <LearningCard />
          </Grid>
          <Grid size={4}>
            <LearningCard />
          </Grid>
          <Grid size={4}>
            <LearningCard />
          </Grid>
          <Grid size={4}>
            <LearningCard />
          </Grid>
          <Grid size={4}>
            <LearningCard />
          </Grid>
        </Grid>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <Box display="flex" gap={1} sx={{ marginTop: 2, marginBottom: 4 }}>
          <FormControl sx={{ width: 200 }}>
            <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>All Levels</MenuItem>
              <MenuItem value={20}>Beginner</MenuItem>
              <MenuItem value={30}>Intermediate</MenuItem>
              <MenuItem value={30}>Advanced</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained">Gain Muscle</Button>
          <Button variant="contained">Lose Body Fat</Button>
          <Button variant="contained">Get Stronger</Button>
          <Button variant="contained">Stretch</Button>
          <Button variant="contained">Warm Up</Button>
        </Box>

        <Grid container spacing={3}>
          <Grid size={4}>
            <LearningCard />
          </Grid>
          <Grid size={4}>
            <LearningCard />
          </Grid>
          <Grid size={4}>
            <LearningCard />
          </Grid>
          <Grid size={4}>
            <LearningCard />
          </Grid>
          <Grid size={4}>
            <LearningCard />
          </Grid>
          <Grid size={4}>
            <LearningCard />
          </Grid>
        </Grid>
      </CustomTabPanel>
    </>
  );
};
