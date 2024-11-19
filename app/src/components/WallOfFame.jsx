import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Modal,
  Button,
  Popover,
} from "@mui/material";
import { getAllAchievements } from "../controllers/LocalTablesController";
import { format } from "date-fns";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import badgePlaceholder from "/assets/badge_placeholder.png";

const modalStyle = {
  // Layout and positioning
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // Box model
  width: "85%",
  maxWidth: "920px",
  height: "90%",
  padding: 2,
  borderRadius: "15px",
  overflowY: "auto",
  // Flexbox alignment
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "start",
  justifyContent: "center",
  columnGap: 1,
  rowGap: 0,
  // Visual effects
  bgcolor: "background.paper",
  boxShadow: 24,
};

export const WallOfFame = ({ userInfo = {} }) => {
  const [showAllBadges, setshowAllBadges] = useState(false);
  const [badges, setBadges] = useState([]); // Add badge user already earned to this array
  const [allBadges, setAllBadges] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(5);
  const [canNavigate, setCanNavigate] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const boxRef = useRef(null); // for ResizeObserver

  // Popover for Badge Description
  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverContent, setPopoverContent] = useState({});
  const open = Boolean(anchorEl);

  // Initialization
  useEffect(() => {
    // Fetch all badges and set to allBadges state
    const fetchAllBadges = async () => {
      const allBadgeData = await getAllAchievements();
      setAllBadges(allBadgeData);
    };
    fetchAllBadges();
  }, []);

  useEffect(() => {
    // Add badge user already earned to badges array
    if (userInfo?.achievements) {
      // Create a map of earned badges
      const earnedBadgesMap = new Map(
        userInfo?.achievements?.map((achievement) => [
          achievement.achievement_id,
          achievement,
        ])
      );

      // Create an array of 16 badges
      const earnedBadges = Array.from(
        { length: allBadges.length },
        (_, index) => {
          const badgeId = index + 1;
          const achievement = earnedBadgesMap.get(badgeId);
          const badgeInfo =
            allBadges.find((badge) => badge.id === badgeId) || {};

          return {
            id: badgeId,
            name: achievement?.name || badgeInfo.name || "",
            description:
              achievement?.description || badgeInfo.description || "",
            src: badgeInfo.badge_url,
            alt: achievement?.name || "Placeholder",
            earned_at: achievement?.earned_at || null,
          };
        }
      );
      earnedBadges.sort((a, b) => {
        if (!a.earned_at) return 1;
        if (!b.earned_at) return -1;
        return new Date(a.earned_at) - new Date(b.earned_at);
      });
      setBadges(earnedBadges);
    }

    // ResizeObserver to adjust the number of items to show
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      const newItemsToShow = width < 500 ? 3 : 5;
      setItemsToShow(newItemsToShow);

      if (badges.length > newItemsToShow) {
        setCanNavigate(true);
      } else {
        setCanNavigate(false);
        setCurrentIndex(0);
      }
    });

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, [userInfo, allBadges, itemsToShow]);

  // Check if the user can navigate to the next set of badges
  useEffect(() => {
    setCanNavigate(badges.length > itemsToShow);
  }, [badges, itemsToShow]);

  // Click to navigate to the next set of badges
  const handleNext = () => {
    if (canNavigate) {
      setCurrentIndex((prevIndex) => (prevIndex + itemsToShow) % badges.length);
    }
  };

  // Click to navigate to the previous set of badges
  const handlePrevious = () => {
    if (canNavigate) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - itemsToShow + badges.length) % badges.length
      );
    }
  };

  // Close AllBadges Modal
  const handleCloseAllBadges = () => {
    setshowAllBadges(false);
  };

  // Popover for Badge Description
  const handleBadgeClick = (event, name, description, earned_at) => {
    setAnchorEl(event.currentTarget);
    setPopoverContent({ name, description, earned_at });
  };

  // Popover for Badge Description
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const displayBadges = badges
    .slice(currentIndex, currentIndex + itemsToShow)
    .concat(
      Array(
        Math.max(
          0,
          itemsToShow -
            badges.slice(currentIndex, currentIndex + itemsToShow).length
        )
      ).fill({
        id: "",
        name: "",
        src: badgePlaceholder,
        alt: "Placeholder",
      })
    );

  return (
    <>
      <Box
        ref={boxRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          gap: 4,
        }}
      >
        <Typography variant="h6">Wall of Fame</Typography>
        <Box
          sx={{
            display: "flex",
            direction: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <IconButton
            sx={{
              padding: 0,
              "&:focus": { outline: "none" },
              "&:hover": { backgroundColor: "transparent" },
            }}
            onClick={handlePrevious}
            disabled={!canNavigate || currentIndex === 0}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          {displayBadges.map((badge, index) => (
            <Box key={index} sx={{ flex: "1 1 auto" }}>
              <Box
                component="img"
                src={badge.src}
                alt={badge.alt}
                sx={{
                  width: "100%",
                  maxWidth: "70px",
                  height: "auto",
                  objectFit: "contain",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
                className={badge.earned_at ? "" : "muted-icon"}
              />
            </Box>
          ))}

          <IconButton
            sx={{
              padding: 0,
              "&:focus": { outline: "none" },
              "&:hover": { backgroundColor: "transparent" },
            }}
            onClick={handleNext}
            disabled={
              !canNavigate || currentIndex + itemsToShow >= badges.length
            }
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
        <Typography>
          Keep up with your exercise plan to earn new surprises
        </Typography>
        <Button
          variant="contained"
          // sx={{ width: "50%" }}
          onClick={() => {
            setshowAllBadges(true);
          }}
        >
          View All
        </Button>
      </Box>

      {/* Show all badges model */}
      <Modal
        open={showAllBadges}
        onClose={handleCloseAllBadges}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            },
          },
        }}
      >
        <Box sx={modalStyle}>
          <IconButton
            aria-label="close"
            onClick={handleCloseAllBadges}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Typography variant="h6" gutterBottom>
              Wall of Fame
            </Typography>
            <Typography>
              Achieved: {badges.filter((badge) => badge.earned_at).length}
            </Typography>
          </Box>
          <Box
            className="custom-scrollbar"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              maxHeight: "85%",
              overflowY: "scroll",
            }}
          >
            {/* Listed All Badges */}
            {badges.map((badge, index) => (
              <Box
                key={index}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  gap: 1,
                  flexDirection: "column",
                  flexGrow: 1,
                  flexShrink: 1,
                  justifyContent: "start",
                  alignItems: "center",
                  textAlign: "center",
                  width: 200,
                  height: 150,
                }}
                onClick={(e) =>
                  handleBadgeClick(
                    e,
                    badge.name,
                    badge.description,
                    badge.earned_at
                  )
                }
              >
                <Box
                  component="img"
                  src={badge.src}
                  alt={badge.alt}
                  sx={{
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.2)",
                    },
                  }}
                  className={badge.earned_at ? "" : "muted-icon"}
                />
                <Typography sx={{ textAlign: "center" }}>
                  {badge.name}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Popover for Badge Description */}
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            disableRestoreFocus
            slotProps={{
              paper: {
                sx: {
                  overflow: "visible",
                  border: "1px solid #94DC8A",
                  borderRadius: "15px",
                  width: { xs: "50vw", sm: "30vw" },
                  maxWidth: "250px",
                  textAlign: "center",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  padding: "1rem",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: -15,
                    left: "50%",
                    transform: "translateX(-50%)",
                    borderWidth: "8px",
                    borderStyle: "solid",
                    borderColor: "transparent transparent white transparent",
                    zIndex: 1,
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: -17,
                    left: "50%",
                    transform: "translateX(-50%)",
                    borderWidth: "8px",
                    borderStyle: "solid",
                    borderColor: "transparent transparent #94DC8A transparent",
                    zIndex: 0,
                  },
                },
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Typography sx={{ fontWeight: "bold" }}>
                {popoverContent?.name || "Coming Soon!"}
              </Typography>
              <Typography>{popoverContent?.description || ""}</Typography>
              {popoverContent?.earned_at && (
                <Typography>
                  Unlocked on{" "}
                  {format(new Date(popoverContent.earned_at), "dd MMM yyyy")}
                </Typography>
              )}
            </Box>
          </Popover>
        </Box>
      </Modal>
    </>
  );
};

WallOfFame.propTypes = {
  userInfo: PropTypes.object,
};
