import React, {useState} from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
} from '@mui/material';

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../../firebase-config";

const SignUp = () => {

  const [, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
      const user = await createUserWithEmailAndPassword(
        auth,
        data.get('email'),
        data.get('password')
      );
      console.log(user);
      console.log(await user.getIdToken());
      console.log(await auth.getIdToken());
    } catch (error) {
      console.log(error.message);
    }
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
        <Box
          component="img"
          sx={{
            height: 112.5,
            width: 200,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="The house from the offer."
          src="https://inbox.taugor.app/static/media/logo_dark.6b571a1b46feca7b071fd717b83e77f1.svg"
        />
        <Box
          component="form"
          onSubmit={handleSubmit}
          flexDirection='column'
          noValidate
          sx={{
            mt: 3,
            display: 'flex'
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="Name"
            label="Nome"
            name="Name"
            autoComplete="given-name"
            autoFocus
            sx={{
              height: 56,
              width: 300,
              mt: 3,
              mb: 2
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Usuário"
            name="email"
            autoComplete="email"
            sx={{
              height: 56,
              width: 300,
              mt: 3,
              mb: 2
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
                mb: 2
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
                mb: 2
              }}
            >
              Inscrever-se
            </Button>
          </Grid>
          <Grid container>
            <Grid item>
              <Link href="/login" variant="body2">
                {"Já possui uma conta? Entrar!"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
