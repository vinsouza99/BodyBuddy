import { createTheme } from "@mui/material/styles";

// Theme setup with palette colors and button styles
const theme = createTheme({
  /****************************************/
  /*            COLOR PALETTE             */
  /****************************************/

  palette: {
    primary: {
      main: "#1976d2", // Main primary color
      light: "#4791db", // Lighter shade for hover/outlines
      dark: "#115293", // Darker shade for hover effects
      contrastText: "#fff", // Text color for primary buttons
    },
    secondary: {
      main: "#dc004e", // Main secondary color
      light: "#ff5c8d", // Lighter shade for hover/outlines
      dark: "#9a0036", // Darker shade for hover effects
      contrastText: "#fff", // Text color for secondary buttons
    },
    error: {
      main: "#d32f2f", // Main error color
      light: "#ef5350", // Lighter error color
      dark: "#c62828", // Darker error color
      contrastText: "#fff", // Text color for error buttons
    },
    warning: {
      main: "#ed6c02", // Main warning color
      light: "#ff9800", // Lighter warning color
      dark: "#e65100", // Darker warning color
      contrastText: "#fff", // Text color for warning buttons
    },
    info: {
      main: "#0288d1", // Main info color
      light: "#03a9f4", // Lighter info color
      dark: "#01579b", // Darker info color
      contrastText: "#fff", // Text color for info buttons
    },
    success: {
      main: "#2e7d32", // Main success color
      light: "#4caf50", // Lighter success color
      dark: "#1b5e20", // Darker success color
      contrastText: "#fff", // Text color for success buttons
    },
    background: {
      default: "#fafafa", // Default background color
      paper: "#fff", // Background color for paper components
    },
    text: {
      primary: "#000000", // Primary text color
      secondary: "#757575", // Secondary text color
      disabled: "#9e9e9e", // Disabled text color
    },
    action: {
      active: "#000000", // Active state color
      hover: "#f5f5f5", // Hover background color
      selected: "#e0e0e0", // Selected item background color
      disabled: "#e0e0e0", // Disabled state background color
      disabledBackground: "#f5f5f5", // Disabled background color
    },
    divider: "#e0e0e0", // Color for dividers
  },

  components: {
    /****************************************/
    /*             GLOBAL STYLES            */
    /****************************************/

    /* Global styles for common tags */
    /* Tags need to be wrapped with: */
    /*
        return (
          <ThemeProvider theme={theme}>
            <CssBaseline>
              <>
                <h1>Heading Here</h1>
                <p>Lorem ipsum dolor sit amet</p>
              </>
            </CssBaseline>
          </ThemeProvider>
        );
    */

    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        },

        h1: {
          fontSize: "3rem",
          fontWeight: 700,
        },

        h2: {
          fontSize: "2rem",
          fontWeight: 700,
        },

        p: {
          fontSize: "1.5rem",
          fontWeight: 300,
        },
      },
    },

    /****************************************/
    /*           BUTTON COMPONENT           */
    /****************************************/

    MuiButton: {
      defaultProps: {
        disableElevation: true, // Disable shadow for contained buttons
      },
      styleOverrides: {
        root: {
          borderRadius: 4, // Default border-radius
          textTransform: "none", // Prevent uppercase text
        },
        contained: {
          backgroundColor: "primary.main", // Primary background color
          color: "primary.contrastText", // Text color for readability
          "&:hover": {
            backgroundColor: "primary.dark", // Dark background on hover
          },
        },
        outlined: {
          borderColor: "primary.main", // Border color
          color: "primary.main", // Text color
          "&:hover": {
            backgroundColor: "primary.light", // Light background on hover
            borderColor: "primary.dark", // Dark border on hover
          },
        },
        text: {
          color: "primary.main", // Text color for text buttons
          "&:hover": {
            backgroundColor: "primary.light", // Light background on hover
          },
        },
      },
    },

    /****************************************/
    /*          ADD COMPONENT NAME          */
    /****************************************/
  },
});

export default theme;
