import { useBrowser } from "../BrowserProvider";
import { Box } from "@mui/material";
import onboardingVideo from "/assets/onboarding.webm";
import illustrationImg from "/assets/landingpage_features_image_2.png";

// Use video or image for onboarding
export function Onboarding() {
  const { isSafari } = useBrowser();
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {isSafari ? (
        <Box
          component="img"
          src={illustrationImg}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      ) : (
        <Box
          component="video"
          src={onboardingVideo}
          autoPlay
          loop
          muted
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      )}
    </Box>
  );
}
