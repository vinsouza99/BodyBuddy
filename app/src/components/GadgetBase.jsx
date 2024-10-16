// Reat and Material-UI
import PropTypes from "prop-types";
import { Paper, Typography } from '@mui/material';

export const GadgetBase = ({ title, children }) => {
  return (
    <Paper 
      elevation={3} 
      sx={{
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        padding: 2, 
        borderRadius: '15px',
        backgroundColor: '#f5f5f5'
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};

GadgetBase.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
