import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Link as MaterialLink,
  TextField,
} from '@mui/material';
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase-config';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import Alert from '../Alert';

const SignUp = () => {
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

    if (!data.get('email')) return setError('Por favor, informe o seu e-mail.');
    if (!data.get('password')) return setError('Por favor, informe sua senha.');
    if (!data.get('name')) return setError('Por favor, informe seu nome.');

    createUserWithEmailAndPassword(
      auth,
      data.get('email'),
      data.get('password'),
    ).then(user => {
      updateProfile(user.user, {
        displayName: data.get('name'),
      });
      return user;
    }).then(() => {
      setSuccess('Seu usuário foi cadastrado. Redirecionando...');

      setTimeout(() => {
        navigate('/login');
      }, 1000);
    })
      .catch((err) => {
        if (err.message.indexOf('email-already-in-use') > 0) return setError('E-mail já cadastrado.');

        setError('Ocorreu um erro ao salvar seu cadastro.');
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
            id="name"
            label="Nome"
            name="name"
            autoComplete="given-name"
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
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
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
            autoComplete="new-password"
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
                width: 145,
                mt: 3,
                mb: 2,
              }}
            >
              Inscrever-se
            </Button>
          </Grid>
          <Grid container alignItems="center" direction="column">
            <Grid item>
              <MaterialLink
                component={RouterLink}
                to="/login"
                underline="hover"
              >Já possui uma conta? Entrar!</MaterialLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
