import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { alpha, useTheme } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Rating from '@mui/material/Rating';
import TablePagination from '@mui/material/TablePagination';
import Avatar from '@mui/material/Avatar';
import profilePhoto from '../../assets/user-profile.png';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import OutlinedInput from '@mui/material/OutlinedInput';
import { visuallyHidden } from '@mui/utils';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Modal from '@mui/material/Modal';
import { CardContent } from '@mui/material';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { Card } from '@mui/material';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import { makeStyles } from '@mui/styles';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import men from '../../assets/men.png';
import settings from '../../assets/settings.png';
import sam from '../../assets/sam.png';
import CloseIcon from '@mui/icons-material/Close';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import InputAdornment from '@mui/material/InputAdornment';
import axios from "axios";
import { Oval } from 'react-loader-spinner'
import meet from './../../assets/meet.png';
import { backEndDomain } from '../../service/apiserver';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
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

function createData(customername, equipstatus, equiploc, contactnum, assignedeng, Prefix, Model, servicetype) {
  return {
    customername, equipstatus, equiploc, contactnum, assignedeng, Prefix, Model, servicetype
  };
}
const rows = [
  createData('Ada Lovelace', 'Breakdown', 'LA', 9878789874, 'John L', '24Z', 'VIK12', 'Out of Warranty'),
  createData('Mike', 'Running', 'Hawkins', 9878789874, 'Demagorgan', '24Z', 'VIK12', 'Out of Warranty'),
  createData('Jonas', 'Breakdown', 'Hawkins', 9878789874, 'John L', '24Z', 'VIK12', 'Out of Warranty'),
  createData('Max', 'Running', 'Hawkins', 9878789874, 'John L', '24Z', 'VIK12', 'Out of Warranty'),
  createData('Wheeler', 'Breakdown', 'Hawkins', 9878789874, 'Demagorgan', '24Z', 'VIK12', 'Out of Warranty'),
  createData('Hopper', 'Breakdown', 'Hawkins', 9878789874, 'Yuri', '24Z', 'VIK12', 'Out of Warranty'),
  createData('Eleven', 'Running', 'Upside Down', 9878789874, 'Vecna', '24Z', 'VIK12', 'Out of Warranty')
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
    id: 'equipstatus',
    numeric: true,
    disablePadding: false,
    label: 'Equipment Status',
  },
  {
    id: 'equiploc',
    numeric: true,
    disablePadding: false,
    label: 'Equipment Location',
  },
  {
    id: 'contactnum',
    numeric: true,
    disablePadding: false,
    label: 'Contact Number',
  },
  {
    id: 'assignedeng',
    numeric: true,
    disablePadding: false,
    label: 'Assigned Engineer',
  },
  {
    id: 'Prefix',
    numeric: true,
    disablePadding: false,
    label: 'Prefix',
  },
  {
    id: 'Model',
    numeric: true,
    disablePadding: false,
    label: 'Model',
  },
  // {
  //   id: 'servicetype',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Service Type',
  // },
  // {
  //   id: 'issue',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Issue Description',
  // },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
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




function History() {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElf, setAnchorElfil] = React.useState(null);
  const [personName, setPersonName] = React.useState([]);
  const [open, setView] = React.useState(false);
  const id = open ? "faked-reference-popper" : undefined;
  const theme = useTheme();
  const [openf, setOpenf] = React.useState(false);
  const idf = openf ? "faked-reference-popper" : undefined;
  const [opened, setOpen] = React.useState(false);

  const [ratingopened, ratingOpen] = React.useState(false);
  const [feedback, setfeedback] = React.useState([]);
  const [RegDate, setRegDate] = React.useState([]);
  const [ResolvedDate, setResolvedDate] = React.useState([]);
  const ratingmodOpen = (cid) => {
    ratingOpen(true);
    try {
      axios({
        method: 'get',
        url: `https://${backEndDomain}/webapi/webuserInput/Feedback?cid=${cid}&TenantId=${localStorage.getItem('TenantId')}`,
        //data: Data,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          console.log(response.data.data)
          setfeedback(response.data.data)
          var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          var reg = new Date(response.data.data.RegDate);
          const RegDated = reg.getDate() + " " + months[reg.getMonth()] + " " + reg.getFullYear()
          setRegDate(RegDated)
          var res = new Date(response.data.data.ResolvedDate);
          const ResolvedDated = res.getDate() + " " + months[res.getMonth()] + " " + res.getFullYear()
          setResolvedDate(ResolvedDated)
        }).catch(function (response) {
          //   if(response.response.status == 422){
          //  // console.log(response.response.status);
          //   }
        });
    } catch (err) {
      console.log(err);

    }
  }
  const ratingClose = () => ratingOpen(false);
  const jwt = localStorage.getItem('UserToken')
  const [loader, setloader] = React.useState(false);




  const [equipstatus1, setequipstatus1] = React.useState([]);
  const [state1, setstate1] = React.useState([]);
  const [status1, setstatus1] = React.useState([]);

  const [tabledata, settabledata] = React.useState([]);
  const [nodata, setnodata] = React.useState(false);

  useEffect(() => {
    setloader(true)
    try {
      axios({
        method: 'get',
        url: `https://${backEndDomain}/webapi/webuserInput/allocationdata?status=Closed&TenantId=${localStorage.getItem('TenantId')}&Type=Total`,
        //data: Data,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          console.log(response.data.data)
          let dataaa1 = []
          response.data.data.map((data) => {
            // console.log(data)
            let hlo = {
              customername: data.customerdetails.customername,
              Equipmentstatus: data.equipmentdata.Equipmentstatus,
              State: data.State,
              City: data.City,
              Address: data.Address,
              customernumber: data.customerdetails.customernumber,
              EquipmentPrefix: data.equipmentdata.EquipmentPrefix,
              EquipmentModel: data.equipmentdata.EquipmentModel,
              IssueDescription: data.equipmentdata.IssuDescription,
              UserName: data.AssignedEngineer.UserName,
              RequestId: data.RequestId


            }
            dataaa1.push(hlo)
          });

          settabledata(dataaa1)
          setloader(false)


        }).catch(function (response) {
          if (response.response.data.message == "Data Not Found") {
            console.log(response.response);
            setnodata(true)
            setloader(false)
          }
          // if(response.response.status == 409){
          //  // console.log(response.response.status);
          //  setnodata(true)
          //  setloader(false) 


          //   }
        });
    } catch (err) {
      console.log(err);

    }


    // try {
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
            <Box className='box-header' >
              <h2 className="page-heding support">   Closed <span className='header-count'>{tabledata.length}</span></h2>

              {/* {nodata==false ?
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
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  return (
    <><Layout>
      <Container sx={{ width: '100%' }}>
        <div className={loader == true ? 'parentDisable' : ''} width="100%">

          {loader == true && <Oval
            height={80}
            width={80}
            color="#4b61ff"
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
          <Card sx={{ width: '100%', mb: 2 }}>
            <CardContent>

              {nodata == false ? <TableContainer>
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
                            <TableCell align="right">{row.Address}</TableCell>
                            <TableCell align="right">{row.customernumber}</TableCell>
                            <TableCell align="right">{row.UserName}</TableCell>
                            <TableCell align="right">{row.EquipmentPrefix}</TableCell>
                            <TableCell align="right">{row.EquipmentModel}</TableCell>

                            {/* <TableCell align="right" className={`status ${row.Status}`}>{row.Status}</TableCell> */}
                            {/* <TableCell align="right">{row.servicetype}</TableCell> */}

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
                                                <MenuItem onClick={() => ratingmodOpen(row.RequestId)}><StarOutlineIcon /> Rating</MenuItem>
                                                <MenuItem onClick={() => { navigate('/alldetails', { state: { id: 'Closed', cid: row.RequestId } }) }}><RemoveRedEyeIcon />View</MenuItem>
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
              </TableContainer> : <Box className="fo-bg-wrap">
                <img src={meet}></img>
                <Typography className='no-available'>No results available at the moment</Typography>
              </Box>}
              {nodata == false ? <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={tabledata.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                showFirstButton={true}
                showLastButton={true}
                onRowsPerPageChange={handleChangeRowsPerPage}
              /> : ""}
            </CardContent>
          </Card>
        </div>
      </Container>
      {/* __________________Rating modal for Closed item _________________  */}
      <Modal className='rating-modal'
        open={ratingopened}
        onClose={ratingClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='rating-modal'>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Feedback <CloseIcon onClick={ratingClose} sx={{ marginLeft: 95 }} />
          </Typography>

          <Box className='rcontent'>

            {/* {sam} */}
            <Box className='profile-av-holder'>
              <Avatar alt="Remy Sharp" src={feedback.serviceEngineerImg} className="profile-avatar" />
              <Typography gutterBottom variant="h5" component="div" className="profile-title">{feedback.serviceEngineer}</Typography>
              {/* <Typography gutterBottom variant="subtitle2" component="div">Jr Service Engineer</Typography> */}

            </Box>

            <Box className='text-section'>

              <box className='top'>
                <Typography component="div">Reg Date : <strong>{RegDate}</strong></Typography>
                <Typography component="div" sx={{ ml: 3 }}>Resolved Date : <strong>{ResolvedDate}</strong></Typography>
              </box>

              <box className='crd-flx'>
                <Card>
                  <CardContent> <img src={settings}></img>
                    <Box>
                      <Typography component="div">Rate the Experience</Typography>
                      <Rating name="read-only" value={feedback.RatetheExperience} readOnly />
                    </Box>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent><img src={men}></img>
                    <Box>
                      <Typography component="div">Rate the Engineer</Typography>
                      <Rating name="read-only" value={feedback.RatetheEngineer} readOnly />
                    </Box>
                  </CardContent>
                </Card>
              </box>
              <Typography sx={{ mt: 3, mb: 1 }}>Comments</Typography>
              {/* <TextareaAutosize
  aria-label="empty textarea"
  // placeholder="Type you comments here"
  value={feedback.comments}
  style={{ width: 200 }}
  InputProps={{
    readOnly: true,
  }} 
/> */}
              <TextField
                // id="outlined-read-only-input"
                // label="Read Only"
                aria-label="empty textarea"
                value={feedback.comments}
                style={{ width: 550 }}
                multiline
                rows={3}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Layout>
    </>
  )
}

export default History;