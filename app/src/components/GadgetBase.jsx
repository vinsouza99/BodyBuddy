// Reat and Material-UI
import PropTypes from "prop-types";
import { Paper, Typography } from '@mui/material';

export const GadgetBase = ({ title = null, frame = true, children }) => {
  return (
    <Paper 
      elevation={ frame ? 3 : 0}
      sx={{
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        padding: frame ? 2 : 0, 
        borderRadius: '15px',
        backgroundColor: frame ? 'white' : 'transparent',
      }}
    >
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      {children}
    </Paper>
  );
};

GadgetBase.propTypes = {
  title: PropTypes.string,
  frame: PropTypes.bool,
  children: PropTypes.node.isRequired,
}
