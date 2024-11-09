import { Box, Typography, Button } from "@mui/material";

export const ErrorMessage = (props) => {
  const { message, callback, callbackAction } = props;
  return (
    <>
      <Box>
        <Typography variant="body2">
          {message ? message : "There was an error... Try again later"}
        </Typography>
        {callback ? (
          <Button
            variant="contained"
            onClick={() => {
              callback();
            }}
          >
            {callbackAction}
          </Button>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};
