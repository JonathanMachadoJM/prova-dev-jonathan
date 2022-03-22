import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Link as MaterialLink,
  TextField,
} from '@mui/material';
import {
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase-config';
import Logo from '../Logo';
import Alert from '../Alert';

const SignInput = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [isError, setIsError] = useState(true);
  const setError = (message) => {
    setIsError(true);
    setAlertMessage(message);
  };
  const setSuccess = (message) => {
    setIsError(false);
    setAlertMessage(message);
  };
  const handleCloseAlert = () => {
    setAlertMessage('');
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    handleCloseAlert();
    const data = new FormData(event.currentTarget);
    signInWithEmailAndPassword(
      auth,
      data.get('email'),
      data.get('password'),
    ).then(() => {
      setSuccess('Usuário autenticado, redirecionando...');

      setTimeout(() => {
        navigate('/home');
      }, 1000);
    }).catch(err => {
      if (err.message.indexOf('user-not-found') > 0) return setError('Usuário não encontrado.');
      if (err.message.indexOf('wrong-password)') > 0) return setError('Senha incorreta.');

      setError('Ocorreu um erro ao logar.');
      console.error(err);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Logo />
        <Alert message={alertMessage} isError={isError} onCloseAlert={handleCloseAlert} />
        <Box
          component="form"
          onSubmit={handleSubmit}
          flexDirection="column"
          noValidate
          sx={{
            mt: 3,
            display: 'flex',
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Usuário"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{
              height: 56,
              width: 300,
              mt: 3,
              mb: 2,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{
              height: 56,
              width: 300,
              mt: 3,
              mb: 2,
            }}
          />
          <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center"
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                height: 36.5,
                width: 100,
                mt: 3,
                mb: 2,
              }}
            >
              Entrar
            </Button>
          </Grid>
          <Grid container alignItems="center" direction="column">
            <Grid item>
              <MaterialLink component={RouterLink} to="/cadastro">Não possui uma conta? Criar!</MaterialLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignInput;
