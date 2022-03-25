import React from 'react';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link as RouterLink, } from 'react-router-dom';
import { Container, Logo, LogoButton, LogoText, Menu} from './styles';
import { ColorModeContext } from '../ToggleColorMode';
import MenuAvatar from '../MenuAvatar';
import { auth } from '../../firebase-config';

const Header = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const isDark = theme.palette.mode === 'dark';
  const logoDarkUrl = 'https://inbox.taugor.app/static/media/logo_dark.6b571a1b46feca7b071fd717b83e77f1.svg';
  const logoLightUrl = 'https://inbox.taugor.app/static/media/logo_light.4943842c7f33a505e7de3f389cc76d89.svg';
  const user = auth.currentUser;

  return (
    <Container>
      <LogoButton>
        <Logo src={isDark ? logoDarkUrl : logoLightUrl} />
        <LogoText> Gestor de Ticket/Protocolo - PRT</LogoText>
      </LogoButton>
      <Menu>
        <Button
          component={RouterLink}
          to="/Home"
          color="inherit"
          href="#text-buttons"
          sx={{ ml: 1 }}
        >
          Tickets
        </Button>
        <Button
          component={RouterLink}
          to="/Ticket"
          color="inherit"
          startIcon={<AddCircleIcon />}
          sx={{ ml: 1 }}
        >
          Novo Ticket
        </Button>
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        {user && <MenuAvatar />}
      </Menu>
    </Container>
  );
};

export default Header;
