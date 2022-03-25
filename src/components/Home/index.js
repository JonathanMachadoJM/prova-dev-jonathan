import React, { useEffect } from 'react';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { collection, onSnapshot } from "firebase/firestore";
import MenuList from '../../components/Menu';
import { db } from '../../firebase-config';
import Header from '../Header';


const theme = createTheme();

const StyledPaper = styled(Paper, {})({
  borderRadius: 15,
  maxWidth: '100%',
});

const StyledTable = styled(Table, {})({
  minWidth: 650,
});

const StyledTableHeaderCell = styled(TableCell, {})({
  fontWeight: 'bold',
  // backgroundColor: theme.palette.primary.dark,
  color: theme.palette.getContrastText(theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.dark),
});

const monthNames = ["Jan", "Fev", "Mar", "Apr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

const Home = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);
  const [rows, setRows] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const montarStatus = (status) => {
    switch (parseInt(status)) {
      case 0:
        return 'Aberto';
      case 1:
        return 'Em análise';
      case 2:
        return 'Finalizado';
      default:
        return "";
    }
  };

  useEffect(() => {
    onSnapshot(collection(db, "ticket"), (snapshot) => {
      setRows(snapshot.docs.map(doc => {
        return {id: doc.id, ...doc.data(), url: doc.data().anexo}
      }));
    });
  }, []);

  return (
    <>
      <Header />
      {rows == null || rows.length == 0 ?
      <>
        Vazio
      </>
      :
      <StyledPaper>
        <StyledTable aria-label="tabela de solicitações">
          <TableHead>
            <TableRow>
              <StyledTableHeaderCell align="left">Solicitações</StyledTableHeaderCell>
              <StyledTableHeaderCell align="center">Entrada</StyledTableHeaderCell>
              <StyledTableHeaderCell align="center">Ações</StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const status = montarStatus(row.status);
                const createDate = new Date(row.datetime.seconds*1000);
                return (
                  <TableRow
                    hover
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <Grid container
                            flexDirection="row"
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                      >
                        <Grid>
                          <Grid
                            flexDirection="row"
                            sx={{
                              display: 'flex',
                            }}
                          >
                            <Typography
                              color="textSecondary"
                              variant="caption"
                            >
                              {status}
                            </Typography>
                            <Typography
                              color="textSecondary"
                              variant="caption"
                            >
                              &nbsp;|&nbsp;
                            </Typography>
                            <Typography
                              color="textSecondary"
                              variant="caption"
                            >
                              fulano
                            </Typography>
                          </Grid>
                          <Typography
                            color="textSecondary"
                            variant="body1"
                            sx={{
                              fontWeight: 'bold',
                            }}>
                            {row.titulo}
                          </Typography>
                          <Typography
                            color="textSecondary"
                            variant="caption">
                            {row.produto}
                          </Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell sx={{ width: '120px' }}>
                      <Grid
                        flexDirection="column"
                        alignItems="center"
                        sx={{
                          display: 'flex',
                        }}
                      >
                        <Typography
                          color="textSecondary"
                          variant="caption"
                        >
                          {
                            createDate.getFullYear()
                          }
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="body1"
                          sx={{
                            fontWeight: 'bold',
                          }}
                        >
                         {
                           createDate.getDate().toString().padStart(2, '0') + " " + monthNames[createDate.getMonth()]
                         }
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="caption"
                        >
                          {createDate.getHours().toString().padStart(2, '0') + ":" + createDate.getMinutes().toString().padStart(2, '0')}
                        </Typography>
                      </Grid>
                    </TableCell>
                    <TableCell sx={{ width: '80px' }}>
                      <MenuList url={row.url} id={row.id}/>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableRow>
          </TableFooter>
        </StyledTable>
      </StyledPaper>
      }
    </>
  );
};

export default Home;
