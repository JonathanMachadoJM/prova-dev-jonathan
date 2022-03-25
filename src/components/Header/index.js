import React from 'react';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Container, Logo, LogoButton, Menu } from './styles';
import { ColorModeContext } from '../ToggleColorMode';
import MenuAvatar from '../MenuAvatar';
import { Box, Typography } from '@mui/material';
import { auth } from '../../firebase-config';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Header = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const isDark = theme.palette.mode === 'dark';
  const logoDarkUrl = 'https://inbox.taugor.app/static/media/logo_dark.6b571a1b46feca7b071fd717b83e77f1.svg';
  const logoLightUrl = 'https://inbox.taugor.app/static/media/logo_light.4943842c7f33a505e7de3f389cc76d89.svg';
  const user = auth.currentUser;
  const { pathname } = useLocation();

  return (
    <Container>
      {pathname === '/ticket' &&
      <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none', lg: 'none' } }}>
        <Button
          component={RouterLink}
          to="/home"
          color="inherit"
          startIcon={<ArrowBackIcon />}
          sx={{ fontWeight: 'bold' }}
        >Voltar</Button>
      </Box>
      }
      <LogoButton>
        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' }, direction: 'column', alignItems: 'center' }}>
          <Logo src={isDark ? logoDarkUrl : logoLightUrl} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Gestor de Ticket/Protocolo - PRT
          </Typography>
        </Box>
      </LogoButton>
      <Menu>
        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
          {user && <div>
            <Button
              component={RouterLink}
              to="/home"
              color="inherit"
              href="#text-buttons"
              sx={{ ml: 1, fontWeight: 'bold' }}
            >
              Tickets
            </Button>
            <Button
              component={RouterLink}
              to="/ticket"
              color="inherit"
              startIcon={<AddCircleIcon />}
              sx={{ ml: 1, fontWeight: 'bold' }}
            >
              Novo Ticket
            </Button>
          </div>}
        </Box>
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        {user && <MenuAvatar />}
      </Menu>
    </Container>
  );
};

export default Header;
