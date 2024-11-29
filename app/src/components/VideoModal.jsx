import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient.js";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const VideoModal = ({ open, onclose, videoURL }) => {
  const [signedVideoURL, setSignedVideoURL] = useState(null);

  useEffect(() => {
    if (!videoURL) return;
    const fetchSignedUrl = async () => {
      if (videoURL) {
        const { data, error } = await supabase.storage
          .from("Training Videos")
          .createSignedUrl(videoURL, 60);

        if (error) {
          console.error("Error creating signed URL:", error.message);
          setSignedVideoURL(null);
        } else {
          setSignedVideoURL(data.signedUrl);
        }
      }
    };

    if (open) {
      fetchSignedUrl();
    }
  }, [videoURL, open]);

  return (
    <Dialog
      open={open}
      onClick={() => {
        setSignedVideoURL(null);
        onclose();
      }}
      fullWidth
      maxWidth="md"
      BackdropProps={{
        style: { backgroundColor: "rgba(71, 71, 71, 0.169)" },
      }}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 4,
          overflow: "hidden",
          padding: 1,
          backgroundColor: "#f7f7f7",
        },
      }}
    >
      <DialogTitle sx={{ padding: 0, display: "flex", justifyContent: "end" }}>
        <IconButton
          onClick={() => {
            setSignedVideoURL(null);
            onclose();
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
          width: "100%",
          height: "100%",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {signedVideoURL ? (
          <video autoPlay width="100%" height="100%" controls>
            <source src={signedVideoURL} type="video/webm" />
          </video>
        ) : (
          <p>Loading video...</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

VideoModal.propTypes = {
  open: PropTypes.bool,
  onclose: PropTypes.func,
  videoURL: PropTypes.string,
};
