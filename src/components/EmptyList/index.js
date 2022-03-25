import { Button, Grid, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/Add';
import React from 'react';

const EmptyList = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '80vh',
      }}>
      <Grid item>
        <Typography variant="h4">Nenhum ticket encontrado.</Typography>
      </Grid>
      <br />
      <Grid item>
        <Button variant="contained" startIcon={<AddCircleIcon />}>
          <strong>Criar Ticket</strong>
        </Button>
      </Grid>
    </Grid>
  );
};

export default EmptyList;
