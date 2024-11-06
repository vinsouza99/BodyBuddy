import PropTypes from "prop-types";
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export const VideoModal = ({ open, onclose, videoURL }) => {
  return (
    <Dialog
      open={open}
      onClose={onclose}
      fullWidth
      maxWidth="md"
      BackdropProps={{
        style: { backgroundColor: 'rgba(71, 71, 71, 0.169)' },
      }}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 4,
          overflow: 'hidden',
          padding: 1,
          backgroundColor: '#f7f7f7',
        },
      }}
    >
      <DialogTitle sx={{ padding: 0, display: "flex", justifyContent: "end" }}>
        <IconButton onClick={onclose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        width: "100%",
        height: "100%",
        borderRadius: "8px",
        overflow: 'hidden',
      }}>
        <video autoPlay width="100%" height="100%" controls>
          <source src={videoURL} type="video/webm" />
        </video>
      </DialogContent>
    </Dialog>
  )
}

VideoModal.propTypes = {
  open: PropTypes.bool,
  onclose: PropTypes.func,
  videoURL: PropTypes.string,
}