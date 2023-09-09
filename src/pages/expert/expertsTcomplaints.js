import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useNavigate } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { visuallyHidden } from '@mui/utils';
import Modal from '@mui/material/Modal';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { CardContent, Popper } from '@mui/material';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Fade from '@mui/material/Fade';
// import { makeStyles } from '@mui/styles';
import { green } from '@mui/material/colors';
import Explayout from '../../components/expert/explayout';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import axios from "axios";
import { Oval } from 'react-loader-spinner'
import { backEndDomain } from '../../service/apiserver';

// ___________for filter select field _____________________
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

// ____________modal style ________________
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 5
};

const style1 = {
  position: 'relative',
  width: 330,
  bgcolor: 'background.paper',
  p: 1,
};
// const useMenuStyles = makeStyles({
//   paper: {
//     maxHeight: "calc(100% - 96px)",
//     WebkitOverflowScrolling: "touch"
//   },
//   list: {
//     outline: 0
//   }
// });

// _____________for table data ______________________

function createData(customername, equipstatus, equiploc, contactnum, Prefix, Model, Status, complainttype, issue) {
  return {
    customername, equipstatus, equiploc, contactnum, Prefix, Model, Status, complainttype, issue
  };
}

const rows = [
  createData('Ada Lovelace', 'Breakdown', 'LA', 9878789874, '24Z', 'VIK12', 'Accepted', 'Oil leakeage', 'Oil leakeage while steering'),
  createData('Mike', 'Running', 'Hawkins', 9878789874, '24Z', 'VIK12', 'Declined', 'Oil leakeage', 'Oil leakeage while steering'),
  createData('Jonas', 'Breakdown', 'Hawkins', 9878789874, '24Z', 'VIK12', 'Accepted', 'Oil leakeage', 'Oil leakeage while steering'),
  createData('Max', 'Running', 'Hawkins', 9878789874, '24Z', 'VIK12', 'Accepted', 'Oil leakeage', 'Oil leakeage while steering'),
  createData('Wheeler', 'Breakdown', 'Hawkins', 9878789874, '24Z', 'VIK12', 'Accepted', 'Oil leakeage', 'Oil leakeage while steering'),
  createData('Hopper', 'Breakdown', 'Hawkins', 9878789874, '24Z', 'VIK12', 'Declined', 'Oil leakeage', 'Oil leakeage while steering'),
  createData('Eleven', 'Running', 'Upside Down', 9878789874, '24Z', 'VIK12', 'Accepted', 'Oil leakeage', 'Oil leakeage while steering')
];

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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'customerName',
    numeric: false,
    disablePadding: false,
    label: 'Customer Name',
  },
  {
    id: 'Equipment_Status',
    numeric: true,
    disablePadding: false,
    label: 'Equipment Status',
  },
  {
    id: 'address',
    numeric: true,
    disablePadding: false,
    label: 'Equipment Location',
  },
  {
    id: 'customerContact',
    numeric: true,
    disablePadding: false,
    label: 'Contact Number',
  },
  // {
  //   id: 'assignedeng',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Assigned Engineer',
  // },
  {
    id: 'EquipmentPrefix',
    numeric: true,
    disablePadding: false,
    label: 'Prefix',
  },
  {
    id: 'EquipmentModel',
    numeric: true,
    disablePadding: false,
    label: 'Model',
  },
  {
    id: 'StatusDescription',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  // {
  //   id: 'complainttype',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Complaint Type',
  // },
  {
    id: 'IssueDescription',
    numeric: true,
    disablePadding: false,
    label: 'Issue Description',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];


function ExpertsTcomplaints() {
  const navigate = useNavigate();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElf, setAnchorElfil] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const id = open ? "faked-reference-popper" : undefined;

  const [openf, setOpenf] = React.useState(false);
  const idf = openf ? "faked-reference-popper" : undefined;
  const [openassign, setOpenassign] = React.useState(false);
  const [tabledata, settabledata] = React.useState([]);
  const [nodata, setnodata] = React.useState(false);
  const [loader, setloader] = React.useState(false);
  const jwt = localStorage.getItem('UserToken')

  useEffect(() => {
    setloader(true)
    try {
      axios({
        method: 'get',
        url: `https://${backEndDomain}/webapi/webexpert/webComplaintList`,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          console.log(response.data.Complaints)
          response.data.Complaints.map((data) => {
            //console.log(data)
            if (data.StatusDescription === "Registered") {
              data.StatusDescription = "Open";
            } else if (data.StatusDescription === "Assigned") {
              data.StatusDescription = "Yet to accept";
            } else if (data.StatusDescription === "Job Initiated") {
              data.StatusDescription = "Inprogress";
            } else if (data.StatusDescription === "Job Initiated") {
              data.StatusDescription = "Inprogress";
            }
          });
          settabledata(response.data.Complaints)
          setloader(false)
          if (response.data.message == "No Data Found") {
            setnodata(true)
            // setloader(false)

          }
        }).catch(function (response) {
          //   if(response.response.status == 422){
          //  // console.log(response.response.status);
          //   }
        });
    } catch (err) {
      console.log(err);

    }

  }, [])


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const EnhancedTableToolbar = (props) => {
    const [age, setAge] = React.useState('');
    const [age1, setAge1] = React.useState('');
    const [age2, setAge2] = React.useState('');
    const [age3, setAge3] = React.useState('');
    const [age4, setAge4] = React.useState('');
    const [age5, setAge5] = React.useState('');

    const handlefilterChange = (event) => {
      setAge(event.target.value);
    };
    const handlefilterChange1 = (event) => {
      setAge1(event.target.value);
    };
    const handlefilterChange2 = (event) => {
      setAge2(event.target.value);
    };
    const handlefilterChange3 = (event) => {
      setAge3(event.target.value);
    };
    const handlefilterChange4 = (event) => {
      setAge4(event.target.value);
    };
    const [svalues, setValues] = React.useState({
      search: '',
    });

    const handleChangesearch = (prop) => (event) => {
      setValues({ ...svalues, [prop]: event.target.value });
    };
    return (
      <PopupState variant="popper" popupId="demo-popup-popper" >
        {(popupState) => (
          <div>
            <Box className='box-header'>
              <h2 className="page-heding"> Today's Complaint <span className='header-count'>{tabledata.length}</span></h2>


              {/* <Box className='Srch-fld'>
      
                         <FormControl  className='Srch-fld-color' size='small'> 
          <InputLabel size='small'>Search</InputLabel>
          <OutlinedInput
          size='small'
            type={svalues.search}
            value={svalues.search}
            onChange={handleChangesearch('search')}
              endAdornment={<InputAdornment position="end"> <SearchIcon className='search-icon'/></InputAdornment>}
            label="Search"
          />
        </FormControl>
                <Tooltip title="Filter list">

                  <IconButton >
                    <FilterAltOutlinedIcon {...bindToggle(popupState)} />
                  </IconButton>
                </Tooltip>
                <Popper {...bindPopper(popupState)} transition>
                  {({ TransitionProps }) => (
                    // <ClickAwayListener onClickAway={popupState.close} >

                      <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                          <MenuList  autoFocus>
                            <Box sx={style1}>

                              <Typography id="modal-modal-title" variant="h6" component="h2">
                                Choose Filter <CloseIcon sx={{ marginLeft: 20 }} onClick={popupState.close} />

                              </Typography>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={age}
                                  onChange={handlefilterChange}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                  Accepted
                                  </MenuItem>
                                  <MenuItem value={10}>Declined</MenuItem>
                                  <MenuItem value={20}>Yet to accept</MenuItem>
                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={age1}
                                  onChange={handlefilterChange1}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                  Breakdown
                                  </MenuItem>
                                  <MenuItem value={10}>Running</MenuItem>
                           
                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={age2}
                                  onChange={handlefilterChange2}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                  West Bengal
                                  </MenuItem>
                                  <MenuItem value={10}>LA</MenuItem>
                                  <MenuItem value={20}>Hawkins</MenuItem>
                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={age3}
                                  onChange={handlefilterChange3}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                  Kolkata
                                  </MenuItem>
                                  <MenuItem value={10}>TN</MenuItem>
                            
                                </Select>
                              </FormControl>
                              <FormControl className='filter-show-case1'>
                                <Select
                                  value={age4}
                                  onChange={handlefilterChange4}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                  Pin/Zip Code
                                  </MenuItem>
                                  <MenuItem value={10}>Declined</MenuItem>
                                  <MenuItem value={20}>Yet to accept</MenuItem>
                                </Select>
                              </FormControl>
    
                              <Box textAlign='center'>
                                <Button className='outline-btn'
                                  type="submit"
                                  size="large"
                                  variant="outlined"
                                  sx={{ mt: 3, mb: 2 }}

                                >
                                  Clear
                                </Button>
                                <Button className='apply-btn'
                                  type="submit"
                                  size="large"
                                  variant="contained"
                                  sx={{ mt: 3, mb: 2 }}

                                >
                                  Apply
                                </Button>
                              </Box>
                            </Box>
                          </MenuList>
                        </Paper>
                      </Fade>
                    // </ClickAwayListener>
                  )}
                </Popper>
              </Box> */}
            </Box>
          </div>
        )}
      </PopupState>
    );
  };

  function EnhancedTableHead(props) {
    const { order, orderBy, numSelected, rowCount, onRequestSort } =
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
              padding={headCell.disablePadding ? 'none' : 'normal'}
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const assignClose = () => setOpenassign(false);

  const openAssignModal = () => {
    setOpenassign(true);
  }
  return (
    <Explayout>
      <Container sx={{ width: '100%' }}>
        <div className={loader == true ? 'parentDisable' : ''} width="100%">

          {loader == true && <Oval
            height={80}
            width={80}
            color="#426e81"
            wrapperStyle={{
              position: 'absolute',
              top: '45%',
              left: '50%',
            }}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#2c79ff"
            strokeWidth={4}
            strokeWidthSecondary={4}

          />}
          <EnhancedTableToolbar />
          <Card sx={{ width: '100%', mb: 2, mt: 2 }}>
            <CardContent>

              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                // aria-labelledby="tableTitle"
                // size={dense ? 'small' : 'medium'}
                >
                  <EnhancedTableHead
                    // numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={tabledata.length}
                  />
                  <TableBody>
                    {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                    {stableSort(tabledata, getComparator(order, orderBy))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => {
                        // const isItemSelected = isSelected(row.name);
                        // const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            // onClick={(event) => handleClick(event, row.customername)}
                            // role="checkbox"
                            // aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.customername}
                          // selected={isItemSelected}
                          >
                            <TableCell
                              component="th"
                              // id={labelId}
                              scope="row"
                            >
                              {row.customerName}
                            </TableCell>
                            <TableCell align="right">{row.Equipment_Status != null ? row.Equipment_Status : "-"}</TableCell>
                            <TableCell align="right">{row.address}</TableCell>
                            <TableCell align="right">{row.customerContact}</TableCell>
                            <TableCell align="right">{row.EquipmentPrefix}</TableCell>
                            <TableCell align="right">{row.EquipmentModel}</TableCell>
                            <TableCell align="right" className={`status ${row.StatusDescription}`}>{row.StatusDescription}</TableCell>
                            {/* <TableCell align="right">{row.complainttype}</TableCell> */}
                            <TableCell align="right">{row.IssueDescription}</TableCell>
                            <TableCell>

                              <PopupState variant="popper" popupId="demo-popup-popper">
                                {(popupState) => (
                                  <div>
                                    <IconButton className='arrow-btn' {...bindToggle(popupState)}>
                                      <ArrowDropDownIcon />
                                    </IconButton>
                                    <Popper {...bindPopper(popupState)} transition>
                                      {({ TransitionProps }) => (
                                        <ClickAwayListener onClickAway={popupState.close} >

                                          <Fade {...TransitionProps} timeout={350}>
                                            <Paper>
                                              <MenuList  autoFocus>
                                                {/* <MenuItem onClick={openAssignModal}><TextSnippetIcon/>SME Notes</MenuItem> */}
                                                <MenuItem onClick={() => { navigate('/knowledgeBase', { state: { cid: row.RequestId, name: "expert" } }) }}><SearchIcon />&nbsp;Find Solution</MenuItem>
                                                <MenuItem onClick={() => { navigate('/expertview', { state: { id: "etodayscomplaints", cid: row.RequestId } }) }}><RemoveRedEye />&nbsp;View</MenuItem>
                                              </MenuList>
                                            </Paper>
                                          </Fade>
                                        </ClickAwayListener>
                                      )}
                                    </Popper>
                                  </div>
                                )}
                              </PopupState>
                            </TableCell>
                          </TableRow>
                        );
                      })}

                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tabledata.length}
                rowsPerPage={rowsPerPage}
                showFirstButton={true}
                showLastButton={true}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </div>
      </Container>
      <Modal
        open={openassign}
        onClose={assignClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            SME Notes
          </Typography>

          <Box className='show-case'>
            <Typography className='detail-text'>Some SME Notes here</Typography>
          </Box>
          <Box textAlign='right'>
            <Button
              type="submit"
              size="large"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="cancel-btn"
              onClick={() => { setOpenassign(false); }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="large"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="save-btn"
              onClick={() => { setOpenassign(false); }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </Explayout>
  );
}

export default ExpertsTcomplaints;
