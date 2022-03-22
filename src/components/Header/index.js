import React from 'react';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Container, Logo, LogoButton, LogoText } from './styles';
import { ColorModeContext } from '../ToggleColorMode';

const Header = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const isDark = theme.palette.mode === 'dark';
  const logoDarkUrl = 'https://inbox.taugor.app/static/media/logo_dark.6b571a1b46feca7b071fd717b83e77f1.svg';
  const logoLightUrl = 'https://inbox.taugor.app/static/media/logo_light.4943842c7f33a505e7de3f389cc76d89.svg';

  return (
    <Container>
      <LogoButton>
        <Logo src={isDark ? logoDarkUrl : logoLightUrl} />
        <LogoText> Gestor de Ticket/Protocolo - PRT</LogoText>
      </LogoButton>

      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Container>
  );
};

export default Header;
