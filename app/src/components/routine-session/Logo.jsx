import { Box } from '@mui/material';
import LogoImage from "../../assets/bodybuddy_logo_color.svg";

export const Logo = () => {
  return (
    <Box
      component="img"
      src={LogoImage}
      alt="BodyBuddy"
      sx={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        width: '50px',
        height: '50px',
        objectFit: 'contain',
        zIndex: 1000,
      }}
    />
  )
}