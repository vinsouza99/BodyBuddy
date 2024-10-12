import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import ProgressBar from "../components/ProgressBar";
import { Form } from "react-router-dom";
import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Box,
  Typography,
  Container,
} from "@mui/material";

const CreateProgram = () => {
  const [step, setStep] = useState(1);

  function previousStep() {
    if (step > 1) {
      setStep(step - 1);
      console.log(step);
    }
  }
  function nextStep() {
    //TODO: validate user input on the current step (check if they have entered a valid input before proceeding)
    if (step < 5) {
      setStep(step + 1);
      console.log(step);
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
            maxWidth: "500px",
          }}
        >
          <Grid
            container
            spacing={3}
            direction={"column"}
            minHeight={400}
            padding={"1rem"}
          >
            <Box component={"div"} maxWidth={"50%"}>
              <ProgressBar progress={(step / 6) * 100} />
            </Box>
            <Form method="post" action="/signup">
              <Box component={"div"} display={step == 1 ? "block" : "none"}>
                <FormControl>
                  <FormLabel id="genderLabel">
                    <Typography variant="h3">What is your gender?</Typography>
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="genderLabel"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="I’m not comfortable to share"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box component={"div"} display={step == 2 ? "block" : "none"}>
                <FormControl>
                  <FormLabel id="primaryGoalLabel">
                    <Typography variant="h3">
                      What is your primary goal?
                    </Typography>
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="genderLabel"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="I’m not comfortable to share"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box component={"div"} display={step == 3 ? "block" : "none"}>
                <FormControl>
                  <FormLabel id="pastExerciseFrequencyLabel">
                    <Typography variant="h3">
                      How often do you exercise in the past?
                    </Typography>
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="genderLabel"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="I’m not comfortable to share"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box component={"div"} display={step == 4 ? "block" : "none"}>
                <FormControl>
                  <FormLabel id="intensityLabel">
                    <Typography variant="h3">
                      How intense you want to exercise?
                    </Typography>
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="genderLabel"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="I’m not comfortable to share"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Box component={"div"} display={step == 5 ? "block" : "none"}>
                <FormControl>
                  <FormLabel id="availabilityLabel">
                    <Typography variant="h3">When can you exercise?</Typography>
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="genderLabel"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="I’m not comfortable to share"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              <Grid
                container
                width="100%"
                justifyContent={"center"}
                direction="row"
                spacing={2}
              >
                <Button variant="outlined" onClick={() => previousStep()}>
                  Back
                </Button>
                <Button variant="contained" onClick={() => nextStep()}>
                  Next
                </Button>
              </Grid>
            </Form>
          </Grid>
        </Container>
      </Grid>
    </>
  );
};
export default CreateProgram;
