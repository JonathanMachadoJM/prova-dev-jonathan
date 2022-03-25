import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Link as MaterialLink
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link as RouterLink } from 'react-router-dom';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from '../../firebase-config';

const ITEM_HEIGHT = 48;

const MenuList = ({url, id}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [urlDownload, setUrlDownload] = React.useState('');
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  getDownloadURL(ref(storage, url)).then((e) => {
    setUrlDownload(e);
  });

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem key="Visualizar" selected={true}>
          <MaterialLink underline="none" component={RouterLink} to={`/ticket?id=${id}`}>Visualizar</MaterialLink>
        </MenuItem>
        <MenuItem key="Baixar Anexo">
          <MaterialLink underline="none" target="_blank" href={urlDownload}>Baixar Anexo</MaterialLink>
        </MenuItem>
        <MenuItem key="Mostrar Logs">
          <MaterialLink underline="none" component={RouterLink} to={`/cadastro?id=${id}`}>Mostrar Logs</MaterialLink>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default MenuList;
