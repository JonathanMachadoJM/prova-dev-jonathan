import React from 'react';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Container, Logo, LogoButton, LogoText} from './styles';
import {ColorModeContext} from '../ToggleColorMode';

const Header = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Container>
      <LogoButton>
        <Logo src="https://inbox.taugor.app/static/media/logo_light.4943842c7f33a505e7de3f389cc76d89.svg" ></Logo>
        <LogoText> Gestor de Ticket/Protocolo - PRT</LogoText>
      </LogoButton>

      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Container>
  )
}

export default Header;
