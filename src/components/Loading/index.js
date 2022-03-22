import { CircularProgress, Grid } from '@mui/material';
import React from 'react';

const Loading = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '100vh',
      }}>
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};

export default Loading;
