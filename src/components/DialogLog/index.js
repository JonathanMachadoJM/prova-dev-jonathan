import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
import Loading from '../Loading';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogLog = ({ open, handleClose, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const getTicketLog = async (id) => {
    setIsLoading(true);
    const logTicketRef = collection(db, 'log-ticket');
    const ticketLog = query(logTicketRef, where('idTicket', '==', id));
    const dataLogs = await getDocs(ticketLog);

    setLogs(dataLogs.docs.map(doc => {
      const log = doc.data();
      const texto = `Ticket ${log.acao === 'I' ? 'inserido' : 'alterado'} pelo usuário ${log.username}`;

      return {
        id: doc.id,
        ...log,
        texto,
        date: new Date(JSON.parse(log.log).datetime).toLocaleString('pt-br'),
      };
    }));
    setIsLoading(false);
  };

  useEffect(async () => {
    if (id) getTicketLog(id);
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Logs #{id}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Fechar
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {logs.map((log) => (
            <React.Fragment key={log.id}>
              <ListItem>
                <ListItemText primary={log.texto} secondary={log.date} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Dialog>
    </div>
  );
};

export default DialogLog;
