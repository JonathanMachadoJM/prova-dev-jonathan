import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/Add';
import { Link as RouterLink } from 'react-router-dom';

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
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          component={RouterLink}
          to="/ticket"
        >
          <strong>Criar Ticket</strong>
        </Button>
      </Grid>
    </Grid>
  );
};

export default EmptyList;
