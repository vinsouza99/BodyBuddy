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
import CheckIcon from "@mui/icons-material/Check"; // TODO: change to svg icon from design file

const CreateProgram = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState(null); // Gender, no default radio selected
  const [selectedGoal, setSelectedGoal] = useState(1); // Goal, no default radio selected
  const [pastExerciseFrequency, setPastExerciseFrequency] = useState("");
  const [intensity, setIntensity] = useState("");
  const [availability, setAvailability] = useState([]);
  const [primaryGoalsOptions, setPrimaryGoalsOptions] = useState([]);

  useEffect(() => {
    async function getGoals() {
      //const data = await getAllGoals(); //uncomment this line when database configuration is done
      //setPrimaryGoalsOptions(data); //uncomment this line when database configuration is done

      setPrimaryGoalsOptions([
        //delete this block of code when database configuration is done
        {
          id: 1,
          name: "Build Muscles & Size",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi dolore vitae voluptates tempore placeat, consequatur aut dolorem rem id ex.",
        },
        {
          id: 2,
          name: "Lose Weight & Burn Fat",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi dolore vitae voluptates tempore placeat, consequatur aut dolorem rem id ex.",
        },
        {
          id: 3,
          name: "Increase Strength",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi dolore vitae voluptates tempore placeat, consequatur aut dolorem rem id ex.",
        },
        {
          id: 4,
          name: "Tone Up",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi dolore vitae voluptates tempore placeat, consequatur aut dolorem rem id ex.",
        },
        {
          id: 5,
          name: "Get Fitter & Feel Healthy",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi dolore vitae voluptates tempore placeat, consequatur aut dolorem rem id ex.",
        },
        {
          id: 6,
          name: "Increase Mobility",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi dolore vitae voluptates tempore placeat, consequatur aut dolorem rem id ex.",
        },
      ]);
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
            <Typography variant="h3" sx={{ marginBottom: "20px" }}>
              What is your gender?
            </Typography>
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
              label="Prefer not to say"
              onChange={() => setGender("other")}
            />
          </RadioGroup>
        </FormControl>
      </>
    );
  }

  // function PrimaryGoalStep() {
  //   return (
  //     <FormControl>
  //       <FormLabel id="primaryGoalLabel">
  //         <Typography variant="h3" sx={{ marginBottom: "20px" }}>
  //           What is your primary goal?
  //         </Typography>
  //       </FormLabel>
  //       <FormGroup aria-labelledby="primaryGoalLabel" name="checkbox-group">
  //         {primaryGoalsOptions?.map((goal, index) => (
  //           <Accordion className="formAccordion" key={index}>
  //             <AccordionSummary
  //               key={index}
  //               expandIcon={<ExpandMoreIcon />}
  //               aria-controls={`panel${index}-content`}
  //               id={`panel${index}-header`}
  //             >
  //               <FormControlLabel
  //                 key={index}
  //                 value={goal.id}
  //                 control={<Checkbox />}
  //                 label={goal.name}
  //                 onChange={(e) => {
  //                   toggleOptions(primaryGoals, e.target.value);
  //                   console.log("primaryGoals:", primaryGoals);
  //                   console.log("Selected Radio Button Value:", e.target.value);
  //                 }}
  //               />
  //             </AccordionSummary>
  //             <AccordionDetails className="details" key={index}>
  //               {goal.description}
  //             </AccordionDetails>
  //           </Accordion>
  //         ))}
  //       </FormGroup>
  //       <Typography variant="body1">
  //         Click <ExpandMoreIcon /> to learn how this goal determine your
  //         exercise plan.
  //       </Typography>
  //     </FormControl>
  //   );
  // }

  function PrimaryGoalStep() {
    return (
      <FormControl>
        <FormLabel id="primaryGoalLabel">
          <Typography variant="h3" sx={{ marginBottom: "20px" }}>
            What is your primary goal?
          </Typography>
        </FormLabel>

        <RadioGroup
          aria-labelledby="primaryGoalLabel"
          name="radio-buttons-group4"
          value={selectedGoal}
          onChange={(e) => {
            // onChange was moved up to RadioGroup
            setSelectedGoal(e.target.value);
            console.log("Selected Radio Button Value:", e.target);
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
                  value={goal.id} // COCOY TODO: CHECK IF THIS IS CORRECT, IT USED TO BE GOAL.ID BUT IT WASN'T WORKING
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

        <Typography variant="body1">
          Click <ExpandMoreIcon /> to learn how this goal determines your
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
        <Box
          sx={{
            // Create line behind radio buttons
            position: "absolute",
            width: "80%",
            borderTop: "1px solid",
            borderColor: "background.light",
            left: "50%",
            transform: "translateX(-50%)",
            top: "80px", // Adjust to align vertically with radio buttons
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
                // minWidth: "30px",
                // maxWidth: "60px",
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
        <Box
          sx={{
            // Create line behind radio buttons
            position: "absolute",
            width: "80%",
            borderTop: "1px solid",
            borderColor: "background.light",
            left: "50%",
            transform: "translateX(-50%)",
            top: "80px", // Adjust to align vertically with radio buttons
          }}
        ></Box>
        <RadioGroup
          row
          aria-labelledby="intensityLabel"
          name="radio-buttons-group3"
          value={intensity}
        >
          {intensityOptions.map((intensity, index) => (
            <FormControlLabel
              className="inlineRadioButton"
              sx={{
                // Custom styling for FormControlLabel if not using className="inlineRadioButton"
                // minWidth: "30px",
                // maxWidth: "60px",
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
                  // TODO: change to svg icon from design file
                  checkedIcon={<CheckIcon />}
                />
              }
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
      goal_id: selectedGoal,
      past_exercise_frequency: pastExerciseFrequency,
      intensity_id: intensity,
      availability: availability,
      birthday: null,
      weight: 180,
      weight_units: "lbs",
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
        <img
          src="./src/assets/bodybuddy_logo_color.svg"
          alt="BodyBuddy"
          width={70}
        />
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
                sx={{
                  marginTop: "20px",
                }}
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
