import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
// import onboarding1 from "../assets/onboarding1.png";
// import onboarding2 from "../assets/onboarding2.png";
// import onboarding3 from "../assets/onboarding3.png";
import onboardingVideo from "../assets/onboarding.webm";

// export function Onboarding() {
//   const images = [onboarding1, onboarding2, onboarding3];

//   // Get the current displayed onboarding slide or start from the first
//   // This is to load current displayed slide when user clicks Sign In
//   const savedSlide = parseInt(localStorage.getItem("currentSlide")) || 0;

//   // State to track the current slide
//   const [currentSlide, setCurrentSlide] = useState(savedSlide);

//   // Function to move to the next slide
//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   };

//   // Fade-in-out slides every 3 seconds
//   useEffect(() => {
//     const slideInterval = setInterval(nextSlide, 3000);
//     return () => clearInterval(slideInterval);
//   }, []);

//   // Save the current slide index to localStorage when it changes
//   // This is to load current displayed slide when user clicks Sign In
//   useEffect(() => {
//     localStorage.setItem("currentSlide", currentSlide);
//   }, [currentSlide]);

//   // Pagination dots for onboarding slides
//   const handleDotClick = (index) => {
//     setCurrentSlide(index);
//   };

//   return (
//     <Box
//       sx={{
//         position: "relative",
//         height: "100vh",
//         width: "100%",
//         overflow: "hidden",
//       }}
//     >
//       {/* Display onboarding slides */}
//       {images.map((image, index) => (
//         <Box
//           key={index}
//           component="img"
//           src={image}
//           alt={`Slide ${index + 1}`}
//           sx={{
//             position: "absolute",
//             inset: 0,
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             opacity: currentSlide === index ? 1 : 0,
//             transition: "opacity 0.5s ease-in-out",
//           }}
//         />
//       ))}

//       {/* Pagination dots styling */}
//       <Box
//         sx={{
//           position: "absolute",
//           bottom: 20,
//           left: "50%",
//           transform: "translateX(-50%)",
//           display: "flex",
//           gap: 1,
//         }}
//       >
//         {images.map((_, index) => (
//           // This shows a border around the current pagination dot
//           <Box
//             key={index}
//             onClick={() => handleDotClick(index)}
//             sx={{
//               position: "relative",
//               width: 22,
//               height: 22,
//               borderRadius: "50%",
//               border: currentSlide === index ? "2px solid white" : "none", // Highlight the active dot
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             {/* This shows a solid dot for the current pagination dot */}
//             <Box
//               sx={{
//                 width: 12,
//                 height: 12,
//                 borderRadius: "50%",
//                 backgroundColor: currentSlide === index ? "white" : "none", // Highlight active dot
//                 border: currentSlide === index ? "none" : "1px solid white",
//                 transition: "background-color 0.3s",
//                 cursor: "pointer",
//                 "&:hover": {
//                   backgroundColor: "white", // Hover effect for dot
//                 },
//               }}
//             />
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// }

// Use video for onboarding
export function Onboarding() {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
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
    </Box>
  );
}
