// import React, {useState} from 'react';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import { createTheme, ThemeProvider } from "@mui/material";
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';// import QuiltedImageList from "../components/ImageLists";

// const theme = createTheme( {
//     components: {
//         MuiTypography: {
//             variants: [
//                 {
//                     props: {
//                         variant: "body2",
//                     },
//                     style: {
//                         fontSize: 11,
//                     },
//                 },
//                 {
//                     props: {
//                         variant: "body3",
//                     },
//                     style: {
//                         fontSize: 9,
//                     },
//                 },
//             ],
//         },
//     },
// });

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };
  
// const TrainingCard = () => {
// const [open, setOpen] = React.useState(false);
// const handleOpen = () => setOpen(true);
// const handleClose = () => setOpen(false);

//   return (
//     <Grid item xs={3}>
//     <ThemeProvider theme={theme}>
//         <Paper elevation={5}>
//             <Box sx={{
//                     display: "inline",
//                     textAlign: "center",
//                     padding: "1.5rem"
//             }}>
//                 <Typography variant="h6" component="h3" align="center">
//                 {/* {program.name} */}
//                   Increace Strength Program
//                 </Typography>
//                 <div>
//                     <Button onClick={handleOpen}>Learn More...</Button>
//                 </div>
//                 <div>
//                 <Modal
//                   open={open}
//                   onClose={handleClose}
//                   aria-labelledby="modal-modal-title"
//                   aria-describedby="modal-modal-description"
//                 >
//                   <Box sx={style} > 
//                     <Typography variant="h6" component="h3" align="center">
//                       {/* {program.name} */}
//                       Increace Strength Program
//                     </Typography>
//                     <div>
//                       <Typography variant="h6" component="p" align="center">
//                         {/* {program.description} */}
//                         Routine Description Routine Description Routine Description Routine Description Routine Description
//                       </Typography>
//                     </div>
//                   </Box>
                  
//                   <Grid>
//                     <Box marginTop={3}>
//                         {/* Image comes here */}
//                     </Box>
//                     <Box sx={style} > 
//                         <Typography variant="h6" component="h3">
//                         Exercise 1
//                         </Typography>
//                         <Typography variant="h6" component="h3">
//                         Exercise Description
//                         </Typography>
//                     </Box>
//                   </Grid>
//                 </Modal>
//                 </div>
//             </Box>
//         </Paper>
//     </ThemeProvider>

//     </Grid>

    
//   );
// }

// export default TrainingCard;

import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const theme = createTheme({
    components: {
        MuiTypography: {
            variants: [
                { props: { variant: "body2" }, style: { fontSize: 11 } },
                { props: { variant: "body3" }, style: { fontSize: 9 } },
            ],
        },
    },
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const TrainingCard = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Grid item xs={3}>
            <ThemeProvider theme={theme}>
                <Paper elevation={5}>
                    <Box sx={{ display: "inline", textAlign: "center", padding: "1.5rem" }}>
                        <Typography variant="h6" component="h3" align="center">
                            Increace Strength Program
                        </Typography>
                        <div>
                            <Button onClick={handleOpen}>Learn More...</Button>
                        </div>
                        <div>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography variant="h6" component="h3" align="center">
                                        Increace Strength Program
                                    </Typography>
                                    <div>
                                        <Typography variant="h6" component="p" align="center">
                                            Routine Description Routine Description Routine Description...
                                        </Typography>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                    </Box>
                </Paper>
            </ThemeProvider>
        </Grid>
    );
}

export default TrainingCard;