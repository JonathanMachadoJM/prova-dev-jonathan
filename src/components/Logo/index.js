import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import React from 'react';

const Logo = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const logoDarkUrl = 'https://inbox.taugor.app/static/media/logo_dark.6b571a1b46feca7b071fd717b83e77f1.svg';
  const logoLightUrl = 'https://inbox.taugor.app/static/media/logo_light.4943842c7f33a505e7de3f389cc76d89.svg';

  return (
    <Box
      component="img"
      sx={{
        height: 112.5,
        width: 200,
        maxHeight: { xs: 233, md: 167 },
        maxWidth: { xs: 350, md: 250 },
      }}
      alt="Logo"
      src={isDark ? logoDarkUrl : logoLightUrl}
    />
  );
};

export default Logo;
