import { Alert as MaterialAlert, AlertTitle, Container } from '@mui/material';
import React from 'react';

const Alert = ({ message, isError, onCloseAlert }) => {
  return (
    <Container maxWidth="xs">
      {message &&
      <MaterialAlert
        onClose={onCloseAlert}
        severity={isError ? 'error' : 'success'}
      >
        <AlertTitle>
          <strong>
            {isError ? 'Erro!' : 'Sucesso!'}
          </strong>
        </AlertTitle>
        {message}
      </MaterialAlert>}
    </Container>
  );
};

export default Alert;
