import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import logo from "/assets/bodybuddy_logo_color.svg";
import bgImage from "/assets/create-program.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
  TextField,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import "./CreateProgram.css";
import CloseIcon from "@mui/icons-material/Close"; // Close Icon
import {
  getAllGoals,
  getAllIntensities,
} from "../controllers/LocalTablesController.js";
import { useAuth } from "../utils/AuthProvider.jsx";
import CheckIcon from "@mui/icons-material/Check"; // TODO: change to svg icon from design file
import dayjs from "dayjs";
import theme from "../theme.js";

const CreateProgram = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState("other");
  const [birthday, setBirthday] = useState(null);
  const [weight, setWeight] = useState(null);
  const [weightUnit, setWeightUnit] = useState("lbs");
  const [selectedGoal, setSelectedGoal] = useState(1);
  const [pastExerciseFrequency, setPastExerciseFrequency] = useState(1);
  const [intensity, setIntensity] = useState(1);
  const [schedule, setSchedule] = useState(["Monday"]);
  const [primaryGoalsOptions, setPrimaryGoalsOptions] = useState([]);
  const [intensityOptions, setIntensityOptions] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        setPrimaryGoalsOptions(await getAllGoals());
        setIntensityOptions(await getAllIntensities());
      } catch (e) {
        navigate("/error", {
          errorDetails:
            "There was an error while loading form information... try again later.",
        });
      }
    }
    getData();
  }, []);

  const toggleOptions = (array, value) => {
    let index = array.findIndex((element) => element == value);
    if (index == -1) {
      array.push(value);
    } else {
      array.splice(index, 1);
    }
  };

  const pastExerciseFrequencyOptions = [
    "Less than once a month",
    "Less than once a week",
    "At least once a week",
    "At least 3 times a week",
    "Almost every day",
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
    if (step < 6) {
      setStep(step + 1);
    }
  }

  function GenderStep() {
    return (
      <>
        <FormControl>
          <FormLabel id="genderLabel">
            <Typography variant="h4" sx={{ marginBottom: "20px" }}>
              What sex were you assigned at birth?
            </Typography>
          </FormLabel>
          <RadioGroup
            aria-labelledby="genderLabel"
            defaultValue="F"
            name="radio-buttons-group"
            value={gender}
            sx={{ margin: "0 auto" }}
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
              label="Prefer not to say"
              onChange={() => setGender("other")}
            />
          </RadioGroup>
          <Typography
            variant="body2"
            sx={{ textAlign: "left", margin: "1rem 0" }}
          >
            Your sex can affect hormonal balance, muscle composition, and fat
            distribution, which influence how individuals respond to different
            types of exercise and nutritional strategies.
          </Typography>
        </FormControl>
      </>
    );
  }

  function PrimaryGoalStep() {
    return (
      <FormControl>
        <FormLabel id="primaryGoalLabel">
          <Typography variant="h4" sx={{ marginBottom: "20px" }}>
            What is your primary goal?
          </Typography>
        </FormLabel>

        <RadioGroup
          aria-labelledby="primaryGoalLabel"
          name="radio-buttons-group4"
          value={selectedGoal}
          onChange={(e) => {
            setSelectedGoal(e.target.value);
          }}
        >
          {primaryGoalsOptions?.map((goal, index) => (
            <Accordion className="formAccordion" key={index}>
              <AccordionSummary
                key={index}
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                {/* FormControlLabel for the radio button */}
                <FormControlLabel
                  key={index}
                  value={goal.id}
                  control={<Radio />}
                  label={goal.name}
                />
              </AccordionSummary>
              <AccordionDetails className="details" key={index}>
                {goal.description}
              </AccordionDetails>
            </Accordion>
          ))}
        </RadioGroup>
      </FormControl>
    );
  }

  function PastExerciseFrequencyStep() {
    return (
      <FormControl>
        <FormLabel id="pastExerciseFrequencyLabel">
          <Typography variant="h4">
            How often do you exercise in the past?
          </Typography>
        </FormLabel>
        <Box
          sx={{
            // Create line behind radio buttons
            position: "absolute",
            width: "76%",
            borderTop: "1px solid",
            borderColor: "background.light",
            left: "50%",
            transform: "translateX(-50%)",
            top: "80px", // Adjust to align vertically with radio buttons
            [theme.breakpoints.down("sm")]: {
              borderTop: "none", // Remove the borderTop for small screens
            },
          }}
        ></Box>
        <RadioGroup
          row
          aria-labelledby="pastExerciseFrequencyLabel"
          name="radio-buttons-group2"
          value={pastExerciseFrequency}
          sx={{ display: "flex", justifyContent: "center" }} // Center horizontally
        >
          {pastExerciseFrequencyOptions.map((frequency, index) => (
            <FormControlLabel
              className="inlineRadioButton"
              sx={{
                // Custom styling for FormControlLabel if not using className="inlineRadioButton"
                "& .MuiFormControlLabel-label": {
                  lineHeight: 1.2, // Apply line height to the label
                },
              }}
              key={index}
              value={index + 1}
              control={
                // Cocoy: Custom styling for radio buttons
                // TODO: MOVE TO THEME.JS?
                <Radio
                  sx={{
                    // Hide native input radio button
                    "& .MuiSvgIcon-root": {
                      display: "none",
                    },
                    // Create custom radio button
                    marginTop: "30px",
                    marginBottom: "20px",
                    width: "36px",
                    height: "36px",
                    padding: "10px",
                    borderRadius: "50%",
                    backgroundColor: "background.light",
                    position: "relative",
                    transition: "background-color 0.3s ease",

                    // Style for selected radio button
                    "&.Mui-checked": {
                      color: "primary.main",
                      backgroundColor: "primary.main",
                    },

                    // Style for hover
                    "&:hover": {
                      backgroundColor: "primary.main",
                    },

                    // Custom radio button numbers using ::before
                    "&::before": {
                      content: "attr(data-value)", // Use the data-value attribute to insert the number
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "background.paper",
                      fontWeight: "bold",
                    },
                  }}
                  data-value={index + 1} // Increment data-value attribute
                />
              }
              label={frequency}
              labelPlacement="bottom"
              onChange={(e) => setPastExerciseFrequency(e.target.value)}
            />
          ))}
        </RadioGroup>
        <Typography
          variant="body2"
          sx={{ textAlign: "left", margin: "1rem 0" }}
        >
          Past experience sets the foundation for the plan, dictating the
          starting intensity and progression rate.
        </Typography>
      </FormControl>
    );
  }

  function IntensityStep() {
    return (
      <FormControl>
        <FormLabel id="intensityLabel">
          <Typography variant="h4">
            How intensely do you want to exercise?
          </Typography>
        </FormLabel>
        <Box
          sx={{
            // Create line behind radio buttons
            position: "absolute",
            width: "76%",
            borderTop: "1px solid",
            borderColor: "background.light",
            left: "50%",
            transform: "translateX(-50%)",
            top: "80px", // Adjust to align vertically with radio buttons
            [theme.breakpoints.down("sm")]: {
              borderTop: "none", // Remove the borderTop for small screens
            },
          }}
        ></Box>
        <RadioGroup
          row
          aria-labelledby="intensityLabel"
          name="radio-buttons-group3"
          value={intensity}
          sx={{ display: "flex", justifyContent: "center" }} // Center horizontally
        >
          {intensityOptions.map((intensity, index) => (
            <FormControlLabel
              className="inlineRadioButton"
              sx={{
                // Custom styling for FormControlLabel if not using className="inlineRadioButton"

                "& .MuiFormControlLabel-label": {
                  lineHeight: 1.2, // Apply line height to the label
                },
              }}
              key={index}
              value={intensity.id}
              control={
                // Cocoy: Custom styling for radio buttons
                // TODO: MOVE TO THEME.JS?
                <Radio
                  sx={{
                    // Hide native input radio button
                    "& .MuiSvgIcon-root": {
                      display: "none",
                    },
                    // Create custom radio button
                    marginTop: "30px",
                    marginBottom: "20px",
                    width: "36px",
                    height: "36px",
                    padding: "10px",
                    borderRadius: "50%",
                    backgroundColor: "background.light",
                    position: "relative",
                    transition: "background-color 0.3s ease",

                    // Style for selected radio button
                    "&.Mui-checked": {
                      color: "primary.main",
                      backgroundColor: "primary.main",
                    },

                    // Style for hover
                    "&:hover": {
                      backgroundColor: "primary.main",
                    },

                    // Add number inside custom radio button using ::before
                    "&::before": {
                      content: "attr(data-value)", // Use the data-value attribute to insert the number
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "background.paper",
                      fontWeight: "bold",
                    },
                  }}
                  data-value={index + 1} // Increment data-value attribute
                />
              }
              label={intensity.name}
              labelPlacement="bottom"
              onChange={(e) => setIntensity(e.target.value)}
            />
          ))}
        </RadioGroup>
        <Typography
          variant="body2"
          sx={{ textAlign: "left", margin: "1rem 0" }}
        >
          This determines the frequency and difficulty of workouts you expect
          for the plan, helping to balance progress with recovery. You can
          always go back to adjust later for your next programs.
        </Typography>
      </FormControl>
    );
  }

  function ScheduleStep() {
    return (
      <FormControl>
        <FormLabel id="scheduleLabel">
          <Typography variant="h4">When can you exercise?</Typography>
        </FormLabel>
        <FormGroup
          row
          aria-labelledby="intensityLabel"
          name="radio-buttons-group4"
          value={schedule}
          sx={{ display: "flex", justifyContent: "center" }} // Center horizontally
        >
          {weekdays.map((day, index) => (
            <FormControlLabel
              key={index}
              value={day}
              control={
                // Cocoy: Custom styling for checkbox
                // TODO: MOVE TO THEME.JS
                <Checkbox
                  sx={{
                    // Hide native checkbox
                    "& .MuiSvgIcon-root": {
                      display: "none",
                    },
                    // Create custom checkbox
                    marginTop: "30px",
                    marginBottom: "20px",
                    width: "36px",
                    height: "36px",
                    padding: "10px",
                    borderRadius: "50%",
                    border: "2px solid",
                    backgroundColor: "background.paper",
                    position: "relative",
                    transition: "background-color 0.3s ease",

                    // Style for selected Checkbox
                    "&.Mui-checked": {
                      color: "primary.main",
                      backgroundColor: "primary.main",
                    },
                    // Style for hover
                    "&:hover": {
                      backgroundColor: "primary.main",
                      borderColor: "primary.main",
                    },

                    // Display custom check icon
                    "&.Mui-checked .MuiSvgIcon-root": {
                      display: "block",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "background.paper",
                    },
                  }}
                  // Custom checkbox icon
                  checkedIcon={<CheckIcon />}
                />
              }
              label={day.substring(0, 3)}
              labelPlacement="bottom"
              // Display a default selection
              checked={schedule.includes(day)}
              onChange={(e) => {
                toggleOptions(schedule, day);
                setSchedule([...schedule]);
              }}
            />
          ))}
        </FormGroup>
        <Typography
          variant="body2"
          sx={{ textAlign: "left", margin: "1rem 0" }}
        >
          Based on your availability, we will suggest the optimal exercise
          schedule that can efficiently deliver your goal. However, you can
          always be flexible in choosing exercises and what time you want to do
          them.
        </Typography>
      </FormControl>
    );
  }
  async function submitForm() {
    const formResponse = {
      gender: gender,
      goal_id: selectedGoal,
      past_exercise_frequency: pastExerciseFrequency,
      intensity_id: intensity,
      schedule: schedule,
      birthday: birthday,
      weight: weight,
      weight_unit: weightUnit,
    };
    if (user) {
      navigate("/dashboard", { state: formResponse });
    } else {
      navigate("/signup", { state: { userResponses: formResponse } });
    }
  }
  const handleClickClose = () => {
    navigate("/enter");
  };
  return (
    <>
      <Grid
        container
        direction={"column"}
        alignItems={"center"}
        rowGap={5}
        sx={{
          backgroundColor: "lightgray",
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: "top right",
          backgroundSize: "cover",
          minHeight: "100vh",
          padding: "2rem 1rem",
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleClickClose}
          sx={{ position: "absolute", right: "1rem", top: "1rem" }}
        >
          <CloseIcon />
        </IconButton>
        <img src={logo} alt="BodyBuddy" width={70} />
        <Container
          maxWidth="sm"
          sx={{
            backgroundColor: "rgba(255, 255, 255, .8)",
            backdropFilter: "blur(10px)",
            border: "2px solid white",
            borderRadius: 4,
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
            <Box sx={{ margin: "0 auto", width: "75%" }}>
              <ProgressBar progress={(step / 7) * 100} />
            </Box>
            <form
              method="post"
              action="#"
              className="createProgramForm"
              onSubmit={(e) => {
                e.preventDefault();
                submitForm();
              }}
            >
              <Box display={step == 1 ? "block" : "none"}>
                <GenderStep />
              </Box>
              <Box display={step == 2 ? "block" : "none"}>
                <PrimaryGoalStep />
              </Box>
              <Box display={step == 3 ? "block" : "none"}>
                <PastExerciseFrequencyStep />
              </Box>
              <Box display={step == 4 ? "block" : "none"}>
                <IntensityStep />
              </Box>
              <Box display={step == 5 ? "block" : "none"}>
                <ScheduleStep />
              </Box>
              <Box display={step == 6 ? "block" : "none"}>
                <FormControl>
                  <FormLabel id="personalInfoLabel">
                    <Typography variant="h4">
                      Last but not least! Please input your date of birth and
                      weight
                    </Typography>
                  </FormLabel>

                  <Grid
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr", // Define the grid with 3 equal columns
                      gap: ".5rem", // Add space between the columns
                      margin: "0 auto",
                      marginTop: "20px", // Add margin to the top for spacing
                      width: "60%",
                      minWidth: "240px",
                    }}
                  >
                    {/* Birthday Input with DatePicker */}
                    <Grid item xs={12} sx={{ gridColumn: "span 3" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ width: "100%", marginBottom: "0.5rem" }} // Ensure full width
                          label="Date of Birth"
                          value={birthday ? dayjs(birthday) : null} // Pass a dayjs object or null
                          fullWidth
                          onChange={(newValue) => {
                            setBirthday(dayjs(newValue).format("YYYY-MM-DD")); // Format the date only when saving to state
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>

                    {/* Weight input */}
                    <Grid item xs={12} sm={8} sx={{ gridColumn: "span 2" }}>
                      <TextField
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        label="Weight"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>

                    {/* Weight Unit Selector */}
                    <Grid item xs={12} sm={4}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel id="weight-unit-label">Unit</InputLabel>
                        <Select
                          labelId="weight-unit-label"
                          value={weightUnit}
                          onChange={(e) => setWeightUnit(e.target.value)}
                          label="Unit"
                        >
                          <MenuItem value="lbs">Lbs</MenuItem>
                          <MenuItem value="kg">Kg</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Grid container sx={{ margin: "0 auto" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        textAlign: "left",
                        margin: "1rem 0",
                      }}
                    >
                      These factors influence the starting point, caloric needs,
                      and the intensity of the plan to ensure it's realistic and
                      sustainable.
                    </Typography>
                  </Grid>
                </FormControl>
              </Box>

              <Grid
                container
                width="100%"
                justifyContent={"center"}
                direction="row"
                spacing={2}
                sx={{
                  marginTop: "20px",
                }}
              >
                <Button
                  className={`containedWhite ${step === 1 ? "disabledButton" : ""}`}
                  onClick={() => previousStep()}
                  disabled={step == 1}
                >
                  Back
                </Button>
                {step == 6 ? (
                  <Button variant="contained" onClick={() => submitForm()}>
                    Complete
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
