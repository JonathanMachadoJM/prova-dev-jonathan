import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import { collection, onSnapshot, query, where, startAt, endAt, getDocs, orderBy } from 'firebase/firestore';
import { visuallyHidden } from '@mui/utils';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { db } from '../../firebase-config';
import MenuList from '../Menu';
import Header from '../Header';
import Loading from '../Loading';
import DialogLog from '../DialogLog';
import EmptyList from '../EmptyList';
import Alert from '../Alert';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const theme = createTheme();
const StyledPaper = styled(Paper, {})({
  borderRadius: 15,
  maxWidth: '100%',
});
const StyledTable = styled(Table, {})({
  minWidth: 350,
});
const StyledTableHeaderCell = styled(TableCell, {})({
  fontWeight: 'bold',
  color: theme.palette.getContrastText(theme.palette.mode === 'dark' ?
    theme.palette.secondary.light : theme.palette.secondary.dark),
});
const monthNames = ['Jan', 'Fev', 'Mar', 'Apr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
];
const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
};
const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};
const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
};
const headCells = [
  {
    id: 'titulo',
    align: 'left',
    label: 'Ticket',
  },
  {
    id: 'seconds',
    align: 'center',
    label: 'Data',
  },
  {
    id: 'action',
    align: 'center',
    label: 'Ações',
  },
];
const montarStatus = (status) => {
  switch (parseInt(status)) {
    case 1:
      return 'Aberto';
    case 2:
      return 'Em análise';
    case 3:
      return 'Finalizado';
    default:
      return '';
  }
};
const arrStatus = [
  {
    value: '0',
    label: 'Todos',
  },
  {
    value: '1',
    label: 'Aberto',
  },
  {
    value: '2',
    label: 'Em Análise',
  },
  {
    value: '3',
    label: 'Finalizado',
  },
];
const EnhancedTableToolbar = ({ onShowFilter }) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: '1 1 100%', fontWeight: 'bold' }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Tickets
      </Typography>
      <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none', lg: 'none' } }}>
        <Button
          component={RouterLink}
          to="/ticket"
          color="inherit"
          startIcon={<AddIcon />}
          sx={{ ml: 1, fontWeight: 'bold' }}
        />
      </Box>
      <Tooltip title="Filtro" onClick={onShowFilter}>
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    if (property !== 'action') {
      onRequestSort(event, property);
    }
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableHeaderCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id === 'action' ? headCell.label :
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'ordenado descendente' : 'ordenado ascendente'}
                  </Box>
                ) : null}
              </TableSortLabel>
            }
          </StyledTableHeaderCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
const Filter = ({ handleSubmit, setTitulo, setStatus, titulo, status }) => {
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        name="status"
        id="status"
        select
        size="small"
        label="Status"
        value={status}
        onChange={e => setStatus(e.target.value)}
      >
        {arrStatus.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="titulo"
        name="titulo"
        size="small"
        label="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
      />
      <Button type="submit" variant="contained" margin="normal" size="medium"
              sx={{ marginTop: '10px', marginLeft: '8px' }}>
        <SearchIcon />&nbsp;<strong>Pesquisar</strong>
      </Button>
    </Box>
  );
};
const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};
const Home = () => {
  const queryUrl = useQuery();
  const acao = queryUrl.get('acao');
  const [order, setOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('titulo');
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [status, setStatus] = useState(0);
  const [titulo, setTitulo] = useState('');
  const alertMsg = acao === 'I' ? 'Ticket criado com sucesso!' : acao === 'U' ? 'Ticket salvo com sucesso!' : '';
  const [alertMessage, setAlertMessage] = useState(alertMsg);
  const handleRequestSort = (event, property) => {
    const isAsc = sortBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setSortBy(property);
  };
  const handleOpenDialog = (id) => {
    setCurrentId(id);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };
  const handleCloseAlert = () => {
    setAlertMessage('');
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const handleClickFilter = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const t = formData.get('titulo');
    const s = formData.get('status');
    const queryConstraints = [];
    if (s !== '0') queryConstraints.push(where('status', '==', s));
    const q = query(collection(db, 'ticket'),
      ...queryConstraints,
      orderBy('titulo'),
      startAt(t),
      endAt(t + '\uf8ff'),
    );
    const data = await getDocs(q);
    setRows(data.docs.map(doc => {
      const info = doc.data();

      return { id: doc.id, seconds: info.datetime.seconds, ...info };
    }));
    setIsLoading(false);
  };

  useEffect(() => {
    onSnapshot(collection(db, 'ticket'), (snapshot) => {
      setRows(snapshot.docs.map(doc => {
        const info = doc.data();

        return { id: doc.id, seconds: info.datetime.seconds, ...info };
      }));
      setIsLoading(false);
    });
    if (alertMessage) {
      setTimeout(() => {
        handleCloseAlert();
      }, 3000);
    }
  }, []);

  if (isLoading) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  if (rows == null || rows.length === 0) {
    return (
      <>
        <Header />
        <StyledPaper>
          <EnhancedTableToolbar onShowFilter={handleShowFilter} />
          {showFilter && <Filter
            handleSubmit={handleClickFilter}
            status={status}
            setStatus={setStatus}
            titulo={titulo}
            setTitulo={setTitulo} />}
        </StyledPaper>
        <EmptyList />
      </>
    );
  }

  return (
    <>
      <Header />
      <DialogLog open={openDialog} handleClose={handleCloseDialog} id={currentId} />
      <StyledPaper>
        <EnhancedTableToolbar onShowFilter={handleShowFilter} />
        {showFilter && <Filter
          handleSubmit={handleClickFilter}
          status={status}
          setStatus={setStatus}
          titulo={titulo}
          setTitulo={setTitulo} />}
        <Alert message={alertMessage} isError={false} onCloseAlert={handleCloseAlert} />
        <StyledTable aria-label="Tabela de tickets">
          <EnhancedTableHead
            order={order}
            orderBy={sortBy}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, sortBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const status = montarStatus(row.status);
                const createDate = new Date(row.datetime.seconds * 1000);
                return (
                  <TableRow
                    hover
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      <Grid
                        container
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
                              {row.username}
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
                            createDate.getDate().toString().padStart(2, '0') + ' ' + monthNames[createDate.getMonth()]
                          }
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="caption"
                        >
                          {createDate.getHours().toString().padStart(2, '0') + ':' + createDate.getMinutes().toString().padStart(2, '0')}
                        </Typography>
                      </Grid>
                    </TableCell>
                    <TableCell sx={{ width: '80px' }}>
                      <MenuList row={row} handleOpenDialog={handleOpenDialog} />
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 99 * emptyRows,
                }}
              >
                <TableCell colSpan={3} />
              </TableRow>
            )}
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
    </>
  );
};

export default Home;
