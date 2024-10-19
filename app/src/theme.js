import { createTheme } from "@mui/material/styles";

// Theme setup with palette colors and button styles
const theme = createTheme({
  /****************************************/
  /*            COLOR PALETTE             */
  /****************************************/

  // Use https://m2.material.io/inline-tools/color/ to get light and dark shades

  palette: {
    // BodyBuddy palette
    primary: {
      // Primary Blue
      main: "#2D90E0", // Main primary color
      light: "#489FE4", // Lighter shade for hover/outlines (1 shade lighter)
      dark: "#2782D3", // Darker shade for hover effects (1 shade darker)
      contrastText: "#FFFFFF", // Text color for primary buttons
    },
    secondary: {
      // Secondary Pink
      main: "#FF118C", // Main secondary color
      light: "#FE53A3", // Lighter shade for hover/outlines (1 shade lighter)
      dark: "#FF0074", // Darker shade for hover effects (1 shade darker)
      contrastText: "#FFFFFF", // Text color for secondary buttons
    },
    success: {
      // Accent Green
      main: "#4DC53C", // Main accent color
      light: "#6BCE5B", // Lighter shade for hover/outlines (1 shade lighter)
      dark: "#3CB534", // Darker shade for hover effects (1 shade darker)
      contrastText: "#FFFFFF", // Text color for accent buttons
    },
    background: {
      default: "#fafafa", // Default background color
      paper: "#fff", // Background color for paper components
      light: "#ccc", // Light background color
    },
    text: {
      // Black
      primary: "#000000", // Primary text color
      secondary: "#757575", // Secondary text color
      disabled: "#9e9e9e", // Disabled text color
    },

    // Other default MUI colors (TODO)
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
    action: {
      active: "#000000", // Active state color
      hover: "#f5f5f5", // Hover background color
      selected: "#e0e0e0", // Selected item background color
      disabled: "#e0e0e0", // Disabled state background color
      disabledBackground: "#f5f5f5", // Disabled background color
    },
    divider: "#e0e0e0", // Color for dividers
  },

  /****************************************/
  /*            TYPOGRAPHY                */
  /****************************************/

  typography: {
    fontFamily: "'Montserrat', 'Arial', sans-serif", // Default font for general text (Montserrat)

    // Headings will use Urbanist
    h1: {
      fontFamily: "'Urbanist', 'Arial', sans-serif",
      fontSize: "3rem",
      fontWeight: 400,
    },
    h2: {
      fontFamily: "'Urbanist', 'Arial', sans-serif",
      fontSize: "2rem",
      fontWeight: 400,
    },
    h3: {
      fontFamily: "'Urbanist', 'Arial', sans-serif",
      fontSize: "1.75rem",
      fontWeight: 400,
    },
    h4: {
      fontFamily: "'Urbanist', 'Arial', sans-serif",
      fontSize: "1.5rem",
      fontWeight: 400,
    },
    h5: {
      fontFamily: "'Urbanist', 'Arial', sans-serif",
      fontSize: "1.25rem",
      fontWeight: 400,
    },
    h6: {
      fontFamily: "'Urbanist', 'Arial', sans-serif",
      fontSize: "1.5rem",
      fontWeight: 400,
    },

    // Body text uses Montserrat
    body1: {
      fontFamily: "'Montserrat', 'Arial', sans-serif",
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontFamily: "'Montserrat', 'Arial', sans-serif",
      fontSize: "0.85rem",
      fontWeight: 400,
    },
    body3: {
      fontFamily: "'Montserrat', 'Arial', sans-serif",
      fontSize: "0.75rem",
      fontWeight: 400,
    },
  },

  components: {
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

    /****************************************/
    /*      GLOBAL STYLES (NOT IN USE)      */
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

    // MuiCssBaseline: {
    //   styleOverrides: {
    //     body: {
    //       fontFamily: "'Montserrat', 'Arial', sans-serif",
    //     },

    //     p: {
    //       fontFamily: "'Montserrat', 'Arial', sans-serif",
    //       fontSize: "1.5rem",
    //       fontWeight: 300,
    //     },

    //     h1: {
    //       fontFamily: "'Urbanist', 'Arial', sans-serif",
    //       fontSize: "3rem",
    //       fontWeight: 700,
    //     },

    //     h2: {
    //       fontFamily: "'Urbanist', 'Arial', sans-serif",
    //       fontSize: "2rem",
    //       fontWeight: 700,
    //     },

    //     h3: {
    //       fontFamily: "'Urbanist', 'Arial', sans-serif",
    //       fontSize: "1.75rem",
    //       fontWeight: 700,
    //     },

    //     h4: {
    //       fontFamily: "'Urbanist', 'Arial', sans-serif",
    //       fontSize: "1.5rem",
    //       fontWeight: 700,
    //     },

    //     h5: {
    //       fontFamily: "'Urbanist', 'Arial', sans-serif",
    //       fontSize: "1.25rem",
    //       fontWeight: 700,
    //     },

    //     h6: {
    //       fontFamily: "'Urbanist', 'Arial', sans-serif",
    //       fontSize: "1rem",
    //       fontWeight: 700,
    //     },
    //   },
    // },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 950,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
