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
    accent: {
      //Green
      main: "#B8E8B1",
      contrastText: "#FFFFFF",
    },
    success: {
      // Accent Green
      main: "#64CC54", // Main accent color
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
      disabled: "#cccccc", // Disabled state text color (was #e0e0e0)
      disabledBackground: "#eeeeee", // Disabled state background color (#f5f5f5)
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
        disableElevation: false, // Disable shadow for contained buttons
      },
      styleOverrides: {
        root: {
          borderRadius: 10, // Default border-radius
          textTransform: "none", // Prevent uppercase text
          minHeight: "42px", // Default minimum height
          paddingLeft: "20px", // Default padding left
          paddingRight: "20px", // Default padding right
          outline: "none", // Remove the default outline

          "&:focus": {
            outline: "none", // Remove the focus outline
            boxShadow: "none", // Remove any box shadow on focus
          },

          "&.containedWhite": {
            backgroundColor: "#FFFFFF", // Primary background color
            color: "rgba(0, 0, 0, 0.5)", // Text color for readability
            boxShadow:
              "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
            "&:hover": {
              backgroundColor: "#fafafa", // Dark background on hover
              color: "#757575", // Dark grey label text on hover
              boxShadow:
                "0px 4px 5px -2px rgba(0,0,0,0.2), 0px 4px 4px 0px rgba(0,0,0,0.10), 0px 1px 8px 0px rgba(0,0,0,0.10)",
            },
            minWidth: "110px", // Default minimum width
          },

          "&.containedWhite.disabledButton": {
            opacity: "0.5",
          },

          "&.Mui-disabled": {
            opacity: 1, // Set opacity to 50% when disabled
            pointerEvents: "none", // Disable pointer events for better UX
          },
        },
        contained: {
          backgroundColor: "#000000", // Primary background color
          color: "primary.contrastText", // Text color for readability
          "&:hover": {
            backgroundColor: "#2782D3", // Dark background on hover
          },
          minWidth: "110px", // Default minimum width
        },
        outlined: {
          borderColor: "primary.main", // Border color
          color: "primary.main", // Text color
          "&:hover": {
            backgroundColor: "primary.light", // Light background on hover
            borderColor: "primary.dark", // Dark border on hover
          },
          minWidth: "110px", // Default minimum width
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
    /*          TEXTFIELD COMPONENT         */
    /****************************************/

    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255, 255, 255, 0.5)", // 50% opacity white background
            borderRadius: 4, // Slightly rounded corners
            "& fieldset": {
              borderColor: "lightgray", // Default border color
            },
            "&:hover fieldset": {
              borderColor: "lightgray", // Border remains lightgray on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FF118C", // Pink border when focused
            },
          },
        },
      },
    },

    /****************************************/
    /*         TAB / TABS COMPONENT         */
    /****************************************/

    MuiTab: {
      styleOverrides: {
        root: {
          "&:focus": {
            outline: "none", // Remove focus outline
          },
        },
      },
    },

    /****************************************/
    /*         ACCORDION COMPONENT          */
    /****************************************/

    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent", // Transparent background
          boxShadow: "none", // No shadow
          "&:before": {
            display: "none", // Remove default divider line
          },
        },
      },
    },

    /****************************************/
    /*            CARD COMPONENT            */
    /****************************************/
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "10px",
          border: "1px solid transparent",
          transition: "border 0.3s ease",
          position: "relative",

          "&.cardBorderHover": {
            // Use as className "cardBorderHover"
            position: "relative",
            border: "1px solid white",
            borderRadius: "10px",

            // Using ::before pseudo-element for styling
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              background: "linear-gradient(0deg, #FF118C, #2D90E0)", // Gradient colors
              padding: "2px 2.5px 2.5px 2px",
              mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              maskComposite: "exclude",
              transition: "opacity 0.3s ease", // Add transition here for hover effect
              opacity: 0, // Hide effect until hover
            },

            // Reveal hover effect for the card
            "&:hover::before": {
              opacity: 1,
            },
          },
        },
      },
    },
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
