import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import EnhancedTableHead from '../molecules/EnhancedTableHead.jsx';
import { EMPTY_ARRAY, NOOP } from '../../../../utils/DefaultProps.js';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  {
    id: 'name', numeric: false, disablePadding: true, label: 'Ime i prezime',
  },
  {
    id: 'age', numeric: true, disablePadding: false, label: 'Starost',
  },
  {
    id: 'address', numeric: false, disablePadding: false, label: 'Adresa',
  },
  {
    id: 'sponsor', numeric: false, disablePadding: false, label: 'Sponzor',
  },
  {
    id: 'situation', numeric: true, disablePadding: false, label: 'Situacija',
  },
];

const CustomTable = (props) => {
  const classes = useStyles();

  const { entries, onRowClick } = props;

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('age');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const rowsSelection = parseInt(event.target.value, 10);
    setRowsPerPage(rowsSelection);
    setPage(0);
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.tableWrapper}>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            headCells={headCells}
          />
          <TableBody>
            {stableSort(entries, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={() => onRowClick(row)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.name}
                  >
                    <TableCell padding="checkbox" />
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.name}
                    </TableCell>
                    <TableCell
                      style={{ width: '10%' }}
                      align="right"
                    >
                      {row.age}
                    </TableCell>
                    <TableCell style={{ width: '40%' }} align="left">{row.address}</TableCell>
                    <TableCell style={{ width: '10%' }} align="left">{row.sponsor}</TableCell>
                    <TableCell style={{ width: '10%' }} align="right">{row.situation}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={entries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

CustomTable.propTypes = {
  entries: PropTypes.array,
  onRowClick: PropTypes.func,
};

CustomTable.defaultProps = {
  entries: EMPTY_ARRAY,
  onRowClick: NOOP,
};

export default CustomTable;
