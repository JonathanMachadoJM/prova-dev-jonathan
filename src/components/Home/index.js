import * as React from 'react';
import { styled } from '@mui/system';
import { createTheme } from '@mui/material/styles';

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
  Typography,
} from '@mui/material';
import Header from '../Header';

const theme = createTheme();

function createData(name, email, phone, carbs, protein) {
  return { name, email, phone, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 1, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 2, 9.0, 37, 4.3),
  createData('Eclair', 3, 16.0, 24, 6.0),
  createData('Cupcake', 4, 3.7, 67, 4.3),
  createData('Gingerbread', 5, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 6, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 7, 9.0, 37, 4.3),
  createData('Eclair', 8, 16.0, 24, 6.0),
  createData('Cupcake', 9, 3.7, 67, 4.3),
  createData('Gingerbread', 10, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 11, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 12, 9.0, 37, 4.3),
  createData('Eclair', 13, 16.0, 24, 6.0),
  createData('Cupcake', 14, 3.7, 67, 4.3),
  createData('Gingerbread', 15, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 1, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 2, 9.0, 37, 4.3),
  createData('Eclair', 3, 16.0, 24, 6.0),
  createData('Cupcake', 4, 3.7, 67, 4.3),
  createData('Gingerbread', 5, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 6, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 7, 9.0, 37, 4.3),
  createData('Eclair', 8, 16.0, 24, 6.0),
  createData('Cupcake', 9, 3.7, 67, 4.3),
  createData('Gingerbread', 10, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 11, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 12, 9.0, 37, 4.3),
  createData('Eclair', 13, 16.0, 24, 6.0),
  createData('Cupcake', 14, 3.7, 67, 4.3),
  createData('Gingerbread', 30, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 31, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 2, 9.0, 37, 4.3),
  createData('Eclair', 3, 16.0, 24, 6.0),
  createData('Cupcake', 4, 3.7, 67, 4.3),
  createData('Gingerbread', 5, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 6, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 7, 9.0, 37, 4.3),
  createData('Eclair', 8, 16.0, 24, 6.0),
  createData('Cupcake', 9, 3.7, 67, 4.3),
  createData('Gingerbread', 10, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 11, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 12, 9.0, 37, 4.3),
  createData('Eclair', 13, 16.0, 24, 6.0),
  createData('Cupcake', 14, 3.7, 67, 4.3),
  createData('Gingerbread', 15, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 1, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 2, 9.0, 37, 4.3),
  createData('Eclair', 3, 16.0, 24, 6.0),
  createData('Cupcake', 4, 3.7, 67, 4.3),
  createData('Gingerbread', 5, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 6, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 7, 9.0, 37, 4.3),
  createData('Eclair', 8, 16.0, 24, 6.0),
  createData('Cupcake', 9, 3.7, 67, 4.3),
  createData('Gingerbread', 10, 16.0, 49, 3.9),
  createData('Frozen yoghurt', 11, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 12, 9.0, 37, 4.3),
  createData('Eclair', 13, 16.0, 24, 6.0),
  createData('Cupcake', 14, 3.7, 67, 4.3),
  createData('Gingerbread', 15, 16.0, 49, 3.9),
];

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

const Home = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Header />
      <StyledPaper>
        <StyledTable aria-label="tabela de solicitações">
          <TableHead>
            <TableRow>
              <StyledTableHeaderCell align="left">Solicitações</StyledTableHeaderCell>
              <StyledTableHeaderCell align="center">Entrada</StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow
                    hover
                    key={row.name + i}
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
                              Finalizado
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
                              {'#' + row.email}
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
                            {'YOPEN - Mudaças na API - intagração'}
                          </Typography>
                          <Typography
                            color="textSecondary"
                            variant="caption">
                            {'Produto ou serviços YOPEN'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell sx={{ width: '120px', borderLeft: `1px solid ${theme.palette.background.default}` }}>
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
                          {'2021'}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="body1"
                          sx={{
                            fontWeight: 'bold',
                          }}
                        >
                          {'19 AGO'}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="caption"
                        >
                          {'16:18'}
                        </Typography>
                      </Grid>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableFooter>
        </StyledTable>
      </StyledPaper>
    </>
  );
};

export default Home;
