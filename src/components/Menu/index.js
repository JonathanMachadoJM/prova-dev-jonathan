import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Link as MaterialLink,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../firebase-config';
import { useEffect } from 'react';

const ITEM_HEIGHT = 48;

const MenuList = ({ row, handleOpenDialog }) => {
  const [urlDownload, setUrlDownload] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickOpenDialog = () => {
    handleOpenDialog(row.id);
    handleClose();
  };

  useEffect(() => {
    if (open) {
      getDownloadURL(ref(storage, row.anexo)).then((e) => {
        setUrlDownload(e);
      });
    }
  }, [open]);

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
        <MaterialLink underline="none" component={RouterLink} to={`/ticket?id=${row.id}`}>
          <MenuItem key="Editar" selected={true}>
            Editar
          </MenuItem>
        </MaterialLink>
        <MaterialLink underline="none" target="_blank" href={urlDownload}>
          <MenuItem key="Baixar Anexo">
            Baixar Anexo
          </MenuItem>
        </MaterialLink>
        <MaterialLink underline="none" onClick={handleClickOpenDialog}>
          <MenuItem key="Mostrar Logs">
            Mostrar Logs
          </MenuItem>
        </MaterialLink>
      </Menu>
    </div>
  );
};

export default MenuList;
