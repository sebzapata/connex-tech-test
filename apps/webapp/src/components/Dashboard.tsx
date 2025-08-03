import {
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { Weather } from './weather/Weather';
import { ContactsList } from './contacts/ContactsList';

export default function Dashboard() {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
        Connex Dashboard
      </Typography>
      <Weather />
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid
          size={{
            xs: 12,
            md: 4,
            lg: 2,
          }}
        >
          <ContactsList />
        </Grid>
        {/* Datatable */}
      </Grid>
    </Box>
  );
}
