import React, { useState, useEffect } from 'react'
import Explayout from '../../components/expert/explayout';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Modal from '@mui/material/Modal';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import SearchIcon from '@mui/icons-material/Search';
import { Card, Grid } from '@mui/material';
import { Container } from '@mui/system';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Fade from '@mui/material/Fade';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
// import { makeStyles } from '@mui/styles';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import CloseIcon from '@mui/icons-material/Close';
import InputAdornment from '@mui/material/InputAdornment';
import { Oval } from 'react-loader-spinner'
import axios from "axios";
import meet from './../../assets/meet.png';
import { backEndDomain } from '../../service/apiserver';

// const useMenuStyles = makeStyles({
//   paper: {
//     maxHeight: "calc(100% - 96px)",
//     WebkitOverflowScrolling: "touch"
//   },
//   list: {
//     outline: 0
//   }
// });


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
function createData(customername, equipstatus, equiploc, contactnum, assignedeng, Prefix, Model, complainttype, issue) {
  return {
    customername, equipstatus, equiploc, contactnum, assignedeng, Prefix, Model, complainttype, issue
  };
}

const rows = [
  createData('Ada Lovelace', 'Breakdown', 'LA', 9878789874, 'John L', '24Z', 'VIK12', 'Oil leakeage', 'Oil leakeage while steering'),
  createData('Mike', 'Running', 'Hawkins', 9878789874, 'Demagorgan', '24Z', 'VIK12', 'Oil leakeage', 'Oil leakeage while steering'),
  createData('Jonas', 'Breakdown', 'Hawkins', 9878789874, 'John L', '24Z', 'VIK12', 'Oil leakeage', 'Oil leakeage while steering'),
  createData('Max', 'Running', 'Hawkins', 9878789874, 'John L', '24Z', 'VIK12', 'Oil leakeage', 'Oil leakeage while steering'),
  createData('Wheeler', 'Breakdown', 'Hawkins', 9878789874, 'Demagorgan', '24Z', 'VIK12', 'Oil leakeage', 'Oil leakeage while steering'),
  createData('Hopper', 'Breakdown', 'Hawkins', 9878789874, 'Yuri', '24Z', 'VIK12', 'Oil leakeage', 'Oil leakeage while steering'),
  createData('Eleven', 'Running', 'Upside Down', 9878789874, 'Vecna', '24Z', 'VIK12', 'Oil leakeage', 'Oil leakeage while steering')
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
    id: 'customername',
    numeric: false,
    disablePadding: true,
    label: 'Customer Name',
  },
  {
    id: 'Equipmentstatus',
    numeric: true,
    disablePadding: false,
    label: 'Equipment Status',
  },
  {
    id: 'City',
    numeric: true,
    disablePadding: false,
    label: 'Equipment Location',
  },
  {
    id: 'customernumber',
    numeric: true,
    disablePadding: false,
    label: 'Contact Number',
  },
  {
    id: 'UserName',
    numeric: true,
    disablePadding: false,
    label: 'Assigned Engineer',
  },
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
  //  {
  //    id: 'complainttype',
  //    numeric: true,
  //    disablePadding: false,
  //    label: 'Complaint Type',
  //  },
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
function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
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



function ServiceSummary() {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [openassign, setOpenassign] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openf, setOpenf] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const menuClasses = useMenuStyles()
  const [nodata, setnodata] = React.useState(false);
  const [loader, setloader] = React.useState(false);
  const jwt = localStorage.getItem('UserToken')
  const [tabledata, settabledata] = React.useState([]);
  const [equipstatus1, setequipstatus1] = React.useState([]);
  const [state1, setstate1] = React.useState([]);
  const [status1, setstatus1] = React.useState([]);

  useEffect(() => {
    setloader(true)
    console.log(location.state.id)
    try {
      axios({
        method: 'get',
        url: `https://${backEndDomain}/webapi/webuserInput/allocationdata?status=${location.state.id}&TenantId=${localStorage.getItem('TenantId')}`,
        //data: Data,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          console.log(response.data.data)
          // let dataaa= response.data.data

          if (response.data.data.length == 0) {
            setnodata(true)
            setloader(false)

          } else {
            let dataaa1 = []
            response.data.data.map((data) => {
              // console.log(data)
              if (data.AssignedEngineer) {
                let hlo = {
                  customername: data.customerdetails.customername,
                  Equipmentstatus: data.equipmentdata.Equipmentstatus,
                  State: data.State,
                  City: data.City,
                  District: data.District,
                  // Address:data.Address,
                  customernumber: data.customerdetails.customernumber,
                  EquipmentPrefix: data.equipmentdata.EquipmentPrefix,
                  EquipmentModel: data.equipmentdata.EquipmentModel,
                  IssueDescription: data.equipmentdata.IssuDescription,
                  UserName: data.AssignedEngineer.UserName,
                  RequestId: data.RequestId


                }
                dataaa1.push(hlo)

              } else {
                let hlo = {
                  customername: data.customerdetails.customername,
                  Equipmentstatus: data.equipmentdata.Equipmentstatus,
                  State: data.State,
                  City: data.City,
                  District: data.District,
                  // Address:data.Address,
                  customernumber: data.customerdetails.customernumber,
                  EquipmentPrefix: data.equipmentdata.EquipmentPrefix,
                  EquipmentModel: data.equipmentdata.EquipmentModel,
                  IssueDescription: data.equipmentdata.IssuDescription,
                  // UserName:data.AssignedEngineer.UserName,
                  RequestId: data.RequestId


                }
                dataaa1.push(hlo)
                console.log(dataaa1)

              }

            });
            settabledata(dataaa1)
            // settabledata(getfilterdata)
            setloader(false)
          }


        }).catch(function (response) {
          if (response.response.data.message == "Data Not Found") {
            console.log(response.response);
            setnodata(true)
            setloader(false)
          }
        });
    } catch (err) {
      console.log(err);

    }
    //  try {
    //   axios({
    //     method: 'get',
    //     url: `http://15.207.50.230:3001/webapi/webuserInput/webequipmentStatus`,
    //     headers: {
    //       'Content-type': 'application/json',
    //       'token' : jwt,
    //    }
    //   })
    //   .then(function (response) {
    //           console.log(response.data.equipmentStatus)
    //           setequipstatus1(response.data.equipmentStatus)



    //     }) .catch(function (response) {
    //     //   if(response.response.status == 422){
    //     //  // console.log(response.response.status);
    //     //   }
    //     });
    //   }catch (err) {
    //   console.log(err);

    //   }


    //   try {
    //     axios({
    //       method: 'get',
    //       url: `http://15.207.50.230:3001/webapi/webuserInput/webstate`,
    //       headers: {
    //         'Content-type': 'application/json',
    //         'token' : jwt,
    //      }
    //     })
    //     .then(function (response) {
    //             console.log(response.data.stateData)
    //             setstate1(response.data.stateData)


    //       }) .catch(function (response) {
    //       //   if(response.response.status == 422){
    //       //  // console.log(response.response.status);
    //       //   }
    //       });
    //     }catch (err) {
    //     console.log(err);

    //     }

    //     try {
    //       axios({
    //         method: 'get',
    //         url: `http://15.207.50.230:3001/webapi/webuserInput/webStatus`,
    //         headers: {
    //           'Content-type': 'application/json',
    //           'token' : jwt,
    //        }
    //       })
    //       .then(function (response) {
    //               console.log(response.data.Status)
    //               setstatus1(response.data.Status)


    //         }) .catch(function (response) {
    //         //   if(response.response.status == 422){
    //         //  // console.log(response.response.status);
    //         //   }
    //         });
    //       }catch (err) {
    //       console.log(err);

    //       }
  }, [])


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const assignClose = () => setOpenassign(false);

  const openAssignModal = () => {
    setOpenassign(true);
  }
  const EnhancedTableToolbar = (props) => {
    const [status, setstatus] = React.useState('');
    const [equipstatus, setequipstatus] = React.useState('');
    const [state, setstate] = React.useState('');
    const [city, setcity] = React.useState('');
    const [pincode, setpincode] = React.useState('');
    const [pincode1, setpincode1] = React.useState('');
    const [city1, setcity1] = React.useState([]);

    const handlefilterChange = (event) => {
      setstatus(event.target.value);
    };
    const handlefilterChange1 = (event) => {
      setequipstatus(event.target.value);
      console.log(event.target.value)
    };
    const handlefilterChange2 = (event) => {
      setstate(event.target.value);
      console.log(event.target.value)
      let stateid = {
        "StateId": event.target.value.StateId
      }
      try {
        axios({
          method: 'post',
          url: `https://${backEndDomain}/webapi/webuserInput/webcity`,
          data: stateid,
          headers: {
            'Content-type': 'application/json',
            'token': jwt,
          }
        })
          .then(function (response) {
            console.log(response.data.cityData)
            setcity1(response.data.cityData)

          }).catch(function (response) {
            //   if(response.response.status == 422){
            //  // console.log(response.response.status);
            //   }
          });
      } catch (err) {
        console.log(err);

      }
    };
    const handlefilterChange3 = (event) => {
      setcity(event.target.value);
      setpincode1(event.target.value.ZipCode)
    };
    const handlefilterChange4 = (event) => {
      setpincode(event.target.value);
    };
    const applyfilter = () => {
      let applydata = {
        "state": state.StateName,
        "city": city.Locality,
        "pincode": city.ZipCode,
        "equipmentStatus": equipstatus,
        "status": status
      }
      try {
        axios({
          method: 'post',
          url: `https://${backEndDomain}/webapi/webuserInput/webfilter`,
          data: applydata,
          headers: {
            'Content-type': 'application/json',
            'token': jwt,
          }
        })
          .then(function (response) {
            console.log(response.data)
            //  setcity1(response.data.cityData)

          }).catch(function (response) {
            //   if(response.response.status == 422){
            //  // console.log(response.response.status);
            //   }
          });
      } catch (err) {
        console.log(err);

      }
    }
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
              {location.state.id == "open" && <h2 className="page-heding"> Open <span className='header-count'>{tabledata.length}</span></h2>}
              {location.state.id == "InProgress" && <h2 className="page-heding"> In Progress <span className='header-count'>{tabledata.length}</span></h2>}
              {/* {nodata==false && location.state.id == "open" ?
              <Box className='Srch-fld'>
             
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
                              value={status}
                              onChange={handlefilterChange}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem value="">
                              Status
                              </MenuItem>
                              {status1.map((value, key) => (
                     <MenuItem value={value.StatusId}>{value.StatusId}</MenuItem>


    ))}
                            </Select>
                          </FormControl>
                          <FormControl className='filter-show-case1'>
                            <Select
                              value={equipstatus}
                              onChange={handlefilterChange1}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem value="">
                              Equipment Status
                              </MenuItem>
                              {equipstatus1.map((value, key) => (
                     <MenuItem value={value.StatusId}>{value.StatusId}</MenuItem>


    ))}
                           
                            </Select>
                          </FormControl>
                          <FormControl className='filter-show-case1'>
                            <Select
                              value={state}
                              onChange={handlefilterChange2}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem value="" >
                              State                                 
                               </MenuItem>
                               {state1.map((value, key) => (
                     <MenuItem value={value}>{value.StateName}</MenuItem>


    ))}
                
                            </Select>
                          </FormControl>
                          <FormControl className='filter-show-case1'>
                            <Select
                              value={city}
                              onChange={handlefilterChange3}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem value="">
                              City
                              </MenuItem>
                              
                              {city1.map((value, key) => (
                     <MenuItem value={value}>{value.Locality}</MenuItem>


    ))}
                    
                            </Select>
                          </FormControl>
                          <FormControl className='filter-show-case1'>
                            <Select
                              value={pincode}
                              onChange={handlefilterChange4}
                              displayEmpty
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                            <MenuItem value="">
                              Pin/Zip Code
                              </MenuItem>
                              {pincode1 ? ( <MenuItem value="">{pincode1}</MenuItem>)
                             : ''}
        
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
                              onClick={applyfilter}

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
              </Box>:""} */}
            </Box>
          </div>
        )}
      </PopupState>
    );
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <Explayout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>


        {/* __________from 287 to 378 will be rendered only if location value is open_____________ */}
        {location.state.id == "open" && <><Box sx={{ width: '100%' }}>
          <EnhancedTableToolbar />
          <Card sx={{ width: '100%', mb: 2 }}>
            <CardContent>
              {nodata == false ?
                <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                  >
                    <EnhancedTableHead
                      // numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onRequestSort={handleRequestSort}
                      rowCount={tabledata.length} />
                    <TableBody>
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
                              key={row.name}
                            // selected={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                              </TableCell>
                              <TableCell
                                component="th"
                                // id={labelId}
                                scope="row"
                                padding="none"
                              >
                                {row.customername}
                              </TableCell>
                              <TableCell align="right">{row.Equipmentstatus}</TableCell>
                              <TableCell align="right">{row.City},{row.District},{row.State}</TableCell>
                              <TableCell align="right">{row.customernumber}</TableCell>
                              <TableCell align="right">{row.UserName ? row.UserName : "-"}</TableCell>
                              <TableCell align="right">{row.EquipmentPrefix}</TableCell>
                              <TableCell align="right">{row.EquipmentModel}</TableCell>
                              {/* <TableCell align="right" >{row.complainttype}</TableCell> ,{row.City},{row.State}*/}
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
                                                  <MenuItem onClick={() => { navigate('/knowledgeBase', { state: { cid: row.RequestId } }) }}><SearchIcon />&nbsp;Find Solution</MenuItem>

                                                  <MenuItem onClick={() => { navigate('/expertview', { state: { id: "etodayscomplaints", cid: row.RequestId } }) }}><RemoveRedEyeIcon />&nbsp;View</MenuItem>
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
                      {/* {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )} */}
                    </TableBody>
                  </Table>
                </TableContainer> :
                <Box className="fo-bg-wrap">
                  <img src={meet}></img>
                  <Typography className='no-available'>No results available at the moment</Typography>
                </Box>
              }
              {nodata == false ? <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tabledata.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                showFirstButton={true}
                showLastButton={true}
                onRowsPerPageChange={handleChangeRowsPerPage} /> : ""}
            </CardContent>
          </Card>
        </Box>
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
          </Modal></>
        }

        {/* ________________render another table if location value is inprogress_______________ */}
        {location.state.id == "InProgress" && <><Box sx={{ width: '100%' }}>
          <EnhancedTableToolbar />
          <Card sx={{ width: '100%', mb: 2 }}>
            <CardContent>
              {nodata == false ?
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
                      rowCount={tabledata.length} />
                    <TableBody>
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
                              key={row.name}
                            // selected={isItemSelected}
                            >
                              <TableCell padding="checkbox">
                              </TableCell>
                              <TableCell
                                component="th"
                                // id={labelId}
                                scope="row"
                                padding="none"
                              >
                                {row.customername}
                              </TableCell>
                              <TableCell align="right">{row.Equipmentstatus}</TableCell>
                              <TableCell align="right">{row.City},{row.District},{row.State}</TableCell>
                              <TableCell align="right">{row.customernumber}</TableCell>
                              <TableCell align="right">{row.UserName}</TableCell>
                              <TableCell align="right">{row.EquipmentPrefix}</TableCell>
                              <TableCell align="right">{row.EquipmentModel}</TableCell>
                              {/* <TableCell align="right" >{row.complainttype}</TableCell> ,{row.City},{row.State}*/}
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
                                                  <MenuItem onClick={() => { navigate('/expertview', { state: { id: "etodayscomplaints", cid: row.RequestId } }) }}><RemoveRedEyeIcon />&nbsp;View</MenuItem>
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
                      {/* {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )} */}
                    </TableBody>
                  </Table>
                </TableContainer> :
                <Box className="fo-bg-wrap">
                  <img src={meet}></img>
                  <Typography className='no-available'>No results available at the moment</Typography>
                </Box>
              }
              {nodata == false ? <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tabledata.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                showFirstButton={true}
                showLastButton={true}
                onRowsPerPageChange={handleChangeRowsPerPage} /> : ""}
            </CardContent>
          </Card>
        </Box><Modal
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
          </Modal></>
        }

      </Container>
    </Explayout>
  )
}

export default ServiceSummary;


