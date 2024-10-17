import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Button,
  FormGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Box,
  Typography,
  Container,
  Checkbox,
} from "@mui/material";
import "./CreateProgram.css";
import { getAllGoals } from "../controllers/GoalsController.js";
import { useAuth } from "../utils/AuthProvider.jsx";

const CreateProgram = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState("F");
  const [primaryGoals, setPrimaryGoals] = useState([]);
  const [pastExerciseFrequency, setPastExerciseFrequency] = useState("");
  const [intensity, setIntensity] = useState("");
  const [availability, setAvailability] = useState([]);
  const [primaryGoalsOptions, setPrimaryGoalsOptions] = useState([]);

  useEffect(() => {
    async function getGoals() {
      const data = await getAllGoals();
      setPrimaryGoalsOptions(data);
    }
    getGoals();
  }, []);

  const toggleOptions = (array, value) => {
    let index = array.findIndex((element) => element == value);
    if (index == -1) {
      array.push(value);
    } else {
      array.splice(array, 1);
    }
    console.log(array);
  };

  const pastExerciseFrequencyOptions = [
    "Less than once a month",
    "Less than once a week",
    "At least once a week",
    "At least 3 times a week",
    "Almost every day",
  ];
  const intensityOptions = [
    "Not intense",
    "Little intense",
    "Quite intense",
    "Intense",
    "Very intense",
  ];
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  function previousStep() {
    if (step > 1) {
      setStep(step - 1);
    }
  }
  function nextStep() {
    //TODO: validate user input on the current step (check if they have entered a valid input before proceeding)
    if (step < 5) {
      setStep(step + 1);
    }
  }

  function GenderStep() {
    return (
      <>
        <FormControl>
          <FormLabel id="genderLabel">
            <Typography variant="h3">What is your gender?</Typography>
          </FormLabel>
          <RadioGroup
            aria-labelledby="genderLabel"
            defaultValue="F"
            name="radio-buttons-group"
            value={gender}
          >
            <FormControlLabel
              value="F"
              control={<Radio />}
              label="Female"
              onChange={() => setGender("F")}
            />
            <FormControlLabel
              value="M"
              control={<Radio />}
              label="Male"
              onChange={() => setGender("M")}
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="I’m not comfortable to share"
              onChange={() => setGender(null)}
            />
          </RadioGroup>
        </FormControl>
      </>
    );
  }

  function PrimaryGoalStep() {
    return (
      <FormControl>
        <FormLabel id="primaryGoalLabel">
          <Typography variant="h3">What is your primary goal?</Typography>
        </FormLabel>
        <FormGroup aria-labelledby="primaryGoalLabel" name="checkbox-group">
          {primaryGoalsOptions?.map((goal, index) => (
            <Accordion className="formAccordion" key={index}>
              <AccordionSummary
                key={index}
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <FormControlLabel
                  key={index}
                  value={goal.id}
                  control={<Checkbox />}
                  label={goal.name}
                  onChange={(e) => toggleOptions(primaryGoals, e.target.value)}
                />
              </AccordionSummary>
              <AccordionDetails className="details" key={index}>
                {goal.description}
              </AccordionDetails>
            </Accordion>
          ))}
        </FormGroup>
        <Typography variant="body1">
          Click <ExpandMoreIcon /> to learn how this goal determine your
          exercise plan.
        </Typography>
      </FormControl>
    );
  }

  function PastExerciseFrequencyStep() {
    return (
      <FormControl>
        <FormLabel id="pastExerciseFrequencyLabel">
          <Typography variant="h3">
            How often do you exercise in the past?
          </Typography>
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="pastExerciseFrequencyLabel"
          name="radio-buttons-group2"
          value={pastExerciseFrequency}
        >
          {pastExerciseFrequencyOptions.map((frequency, index) => (
            <FormControlLabel
              className="inlineRadioButton"
              key={index}
              value={index + 1}
              control={<Radio />}
              label={frequency}
              labelPlacement="bottom"
              onChange={(e) => setPastExerciseFrequency(e.target.value)}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }
  function IntensityStep() {
    return (
      <FormControl>
        <FormLabel id="intensityLabel">
          <Typography variant="h3">
            How intense you want to exercise?
          </Typography>
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="intensityLabel"
          name="radio-buttons-group3"
          value={intensity}
        >
          {intensityOptions.map((intensity, index) => (
            <FormControlLabel
              className="inlineRadioButton"
              key={index}
              value={index + 1}
              control={<Radio />}
              label={intensity}
              labelPlacement="bottom"
              onChange={(e) => setIntensity(e.target.value)}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }
  function AvailabilityStep() {
    return (
      <FormControl>
        <FormLabel id="availabilityLabel">
          <Typography variant="h3">When can you exercise?</Typography>
        </FormLabel>
        <FormGroup
          row
          aria-labelledby="intensityLabel"
          name="radio-buttons-group4"
          value={availability}
        >
          {weekdays.map((day, index) => (
            <FormControlLabel
              key={index}
              value={day}
              control={<Checkbox />}
              label={day.substring(0, 3)}
              labelPlacement="bottom"
              onChange={(e) => toggleOptions(availability, e.target.value)}
            />
          ))}
        </FormGroup>
      </FormControl>
    );
  }
  async function submitForm() {
    const formResponse = {
      gender: gender,
      primary_goals: primaryGoals,
      past_exercise_frequency: pastExerciseFrequency,
      desired_intensity: intensity,
      availability: availability,
    };
    if (user) {
      navigate("/training", {
        state: { userResponses: formResponse },
      });
    } else {
      navigate("/signup", { state: { userResponses: formResponse } });
    }
  }
  return (
    <>
      <Grid
        container
        direction={"column"}
        alignItems={"center"}
        rowGap={5}
        sx={{
          backgroundColor: "lightgray",
          minHeight: "100vh",
          padding: "2rem 1rem",
        }}
      >
        <img src="./src/assets/bodybuddy.svg" alt="BodyBuddy" width={50} />
        <Container
          sx={{
            backgroundColor: "white",
            borderRadius: 3,
          }}
          className="formWrapper"
        >
          <Grid
            container
            spacing={3}
            direction={"column"}
            minHeight={400}
            padding={"1rem"}
          >
            <Box component={"div"} sx={{ margin: "0 auto", width: "50%" }}>
              <ProgressBar progress={(step / 6) * 100} />
            </Box>
            <form
              method="post"
              action="#"
              className="createProgramForm"
              onSubmit={(e) => {
                e.preventDefault();
                submitForm(e);
              }}
            >
              <Box component={"div"} display={step == 1 ? "block" : "none"}>
                <GenderStep />
              </Box>
              <Box component={"div"} display={step == 2 ? "block" : "none"}>
                <PrimaryGoalStep />
              </Box>
              <Box component={"div"} display={step == 3 ? "block" : "none"}>
                <PastExerciseFrequencyStep />
              </Box>
              <Box component={"div"} display={step == 4 ? "block" : "none"}>
                <IntensityStep />
              </Box>
              <Box component={"div"} display={step == 5 ? "block" : "none"}>
                <AvailabilityStep />
              </Box>
              <Grid
                container
                width="100%"
                justifyContent={"center"}
                direction="row"
                spacing={2}
              >
                <Button
                  variant="outlined"
                  onClick={() => previousStep()}
                  disabled={step == 1}
                >
                  Back
                </Button>
                {step == 5 ? (
                  <Button variant="contained" onClick={() => submitForm()}>
                    Submit
                  </Button>
                ) : (
                  <Button variant="contained" onClick={() => nextStep()}>
                    Next
                  </Button>
                )}
              </Grid>
            </form>
          </Grid>
        </Container>
      </Grid>
    </>
  );
};
export default CreateProgram;
