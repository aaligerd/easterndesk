import React,{useEffect,useState} from 'react';
import {stories} from './Stories'
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useDispatch, useSelector } from 'react-redux';
import { updateErrorMsg, updateStories } from '../../redux/stories/storySlice';
import { getCurrentDatetimeString } from '../../utils/GetDateStructure';
import { useNavigate } from 'react-router-dom';





function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: 'Headline',
    numeric: false,
    disablePadding: true,
    label: 'Headline',
  },
  {
    id: 'Status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'Category',
    numeric: false,
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'Subcategory',
    numeric: false,
    disablePadding: false,
    label: 'Subcategory',
  },
  {
    id: 'Lables',
    numeric: false,
    disablePadding: false,
    label: 'Lables',
  },
  {
    id: 'Created By',
    numeric: false,
    disablePadding: false,
    label: 'Created By',
  },
  {
    id: 'Created On',
    numeric: false,
    disablePadding: false,
    label: 'Created On',
  },
  {
    id: 'Updated By',
    numeric: false,
    disablePadding: false,
    label: 'Updated By',
  },
  {
    id: 'Updated On',
    numeric: false,
    disablePadding: false,
    label: 'Updated On',
  }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };


  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding='normal'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function Story() {
  const{stories,errormsg}=useSelector((state)=>state.stories);
  const dispatch=useDispatch();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
 const [rows, setRows] = useState([]);
  const navigator=useNavigate();
  useEffect(() => {
    const fetchStories = async () => {
      console.log("Fetching stories...");
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/story/get/cms/dashboard`);
        const data = await response.json();
        dispatch(updateStories(data.data))
      } catch (error) {
        dispatch(updateErrorMsg("Error while fetching Stories"));
      }
    }
    fetchStories();
  },[]);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) { 
      const newSelected = rows.map((n) => n.blog_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    window.open(`/update/story/${id}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...stories]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage,stories],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.blog_id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.blog_id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.blog_id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' 
                    
                    }}
                    
                  >

                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="normal"
                    >
                      {row.title}
                    </TableCell>
                    <TableCell align="left">{row.status}</TableCell>
                    <TableCell align="left">{row.category_id}</TableCell>
                    <TableCell align="left">{row.subcategory_id}</TableCell>
                    <TableCell align="left">{row.lables}</TableCell>
                    <TableCell align="left">{row.created_by}</TableCell>
                    <TableCell align="left">{getCurrentDatetimeString(row.created_at)}</TableCell>
                    <TableCell align="left">{row.updated_by}</TableCell>
                    <TableCell align="left">{getCurrentDatetimeString(row.updated_at)}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
