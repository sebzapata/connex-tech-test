import { Grid } from '@mui/material';
import { useWeather } from '../../lib/api';
import { WeatherCard } from './WeatherCard';

export const Weather = () => {
  const { data } = useWeather();
  const locationTemps = data?.data.data;

  return (
    <Grid
      container
      spacing={2}
      columns={12}
      sx={{ mb: (theme) => theme.spacing(2) }}
    >
      {locationTemps?.map((locationTemp) => (
        <Grid size={{ xs: 6, sm: 4, lg: 2 }}>
          <WeatherCard
            location={locationTemp.location ?? 'Loading...'}
            temp={locationTemp.temp ?? 0}
          />
        </Grid>
      ))}
    </Grid>
  );
};
