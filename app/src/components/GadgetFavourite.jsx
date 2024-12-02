import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GadgetBase } from "./GadgetBase";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export const GadgetFavourite = ({ exerciseInfo = null }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const containerRef = useRef(null);
  const totalPages = Math.ceil(exerciseInfo.length / itemsPerPage);

  const currentItems = exerciseInfo?.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;

      if (width < 480) {
        setItemsPerPage(1);
      } else if (width < 700) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  const filledItems = [...currentItems];
  while (filledItems.length < itemsPerPage) {
    filledItems.push({
      id: `dummy-${filledItems.length}`,
      name: "dummy",
    });
  }

  return (
    <GadgetBase title="Master the moves">
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          direction: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <IconButton
          sx={{
            padding: 0,
            "&:focus": { outline: "none" },
            "&:hover": { backgroundColor: "transparent" },
            alignSelf: "center",
          }}
          onClick={handlePrevious}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        {filledItems.map((exercise) => (
          <Box
            key={exercise.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/learn/${exercise.id}`)}
          >
            <Box
              sx={{
                display: "block",
                width: "200px",
                height: "200px",
                backgroundColor: "white",
                padding: "10px",
                boxSizing: "border-box",
                borderRadius: "15px",
                border: exercise.name == "dummy" ? "" : "1px solid #E8E8E8",
              }}
            >
              {exercise.name == "dummy" ? null : (
                <img
                  src={exercise.demo_url}
                  alt={exercise.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    backgroundColor: "white",
                  }}
                />
              )}
            </Box>
            <Box padding={1}>
              <Typography variant="body1" sx={{ fontWeight: "700" }}>
                {exercise.name == "dummy" ? "" : exercise.name}
              </Typography>
            </Box>
          </Box>
        ))}

        <IconButton
          onClick={handleNext}
          sx={{
            padding: 0,
            "&:focus": { outline: "none" },
            "&:hover": { backgroundColor: "transparent" },
            alignSelf: "center",
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Typography>
        Learning how to move correctly would significantly increase your
        efficiency. We have some good tips for you, check it out!
      </Typography>
      <Button variant="contained" onClick={() => navigate("/learning")}>
        Start Learning
      </Button>
    </GadgetBase>
  );
};

GadgetFavourite.propTypes = {
  exerciseInfo: PropTypes.array,
};
