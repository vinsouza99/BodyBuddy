import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import onboarding1 from "../assets/onboarding1.png";
import onboarding2 from "../assets/onboarding2.png";
import onboarding3 from "../assets/onboarding3.png";

export function Onboarding() {
  const images = [onboarding1, onboarding2, onboarding3];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 3000);
    return () => clearInterval(slideInterval);
  }, []);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {images.map((image, index) => (
        <Box
          key={index}
          component="img"
          src={image}
          alt={`Slide ${index + 1}`}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: currentSlide === index ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        />
      ))}

      {/* Dots */}
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1,
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={() => handleDotClick(index)}
            sx={{
              position: "relative",
              width: 22,
              height: 22,
              borderRadius: "50%",
              border: currentSlide === index ? "2px solid white" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: currentSlide === index ? "white" : "none",
                border: currentSlide === index ? "none" : "1px solid white",
                transition: "background-color 0.3s",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
