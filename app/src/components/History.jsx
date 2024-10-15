import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import Box from '@mui/material/Box';


// Data fetching experiment
const historyData = [
  { date: 'Oct 05', content: 'Routine Finished', calories: 600 },
  { date: 'Oct 06', content: 'Routine Finished', calories: 200 },
  { date: 'Oct 07', content: 'Routine Finished', calories: 300 },
  // OTHER DATA COMING
];

function History() {
  return (
    <Card sx={{ padding: 2, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h3" component="p" sx={{ margin: 1, fontWeight: 'bold' }}>
          History
        </Typography>
        <Typography variant="body2" component="p" sx={{ margin: 1 }}>
          SEE MORE
        </Typography>
      </Box>

      <List>
        {historyData.map((item) => (
          <ListItem key={item.date}>
            <ListItemIcon>
              {/* Example: <CircleIcon /> */}
            </ListItemIcon>
            {/* Example how to grab data?  */}
            <ListItemText primary={`${item.date} ${item.content}`} secondary={`Cal: ${item.calories}`} />
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
  
export default History;