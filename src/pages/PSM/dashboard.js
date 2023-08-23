import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout';
import { useLocation } from 'react-router-dom';
// import 'chart.js/auto';
import DonutChart from "react-donut-chart";
import { Card, Grid, IconButton } from '@mui/material';
import { Container } from '@mui/system';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import Fade from '@mui/material/Fade';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';
// import { makeStyles } from '@mui/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import man from '../../assets/man.png';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from "axios";
import { Oval } from 'react-loader-spinner'
import meet from './../../assets/meet.png';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { backEndDomain } from '../../service/apiserver';

function createData(customername, equipstatus, equiploc, contactnum, assignedeng, Prefix, Model, Status, issue) {
  return {
    customername, equipstatus, equiploc, contactnum, assignedeng, Prefix, Model, Status, issue
  };
}

const rows = [
  createData('Ada Lovelace', 'Breakdown', 'LA', 9878789874, 'John L', '24Z', 'VIK12', 'Accepted', 'Oil leakeage while steering'),
  createData('Mike', 'Running', 'Hawkins', 9878789874, 'Demagorgan', '24Z', 'VIK12', 'Accepted', 'Oil leakeage while steering'),
  createData('Jonas', 'Breakdown', 'Hawkins', 9878789874, 'John L', '24Z', 'VIK12', 'Accepted', 'Oil leakeage while steering'),
  createData('Max', 'Running', 'Hawkins', 9878789874, 'John L', '24Z', 'VIK12', 'Accepted', 'Oil leakeage while steering'),
  createData('Wheeler', 'Breakdown', 'Hawkins', 9878789874, 'Demagorgan', '24Z', 'VIK12', 'Accepted', 'Oil leakeage while steering'),
  createData('Hopper', 'Breakdown', 'Hawkins', 9878789874, 'Yuri', '24Z', 'VIK12', 'Accepted', 'Oil leakeage while steering'),
  createData('Eleven', 'Running', 'Upside Down', 9878789874, 'Vecna', '24Z', 'VIK12', 'Accepted', 'Oil leakeage while steering')
];
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
// const useMenuStyles = makeStyles({
//   paper: {
//     maxHeight: "calc(100% - 96px)",
//     WebkitOverflowScrolling: "touch"
//   },
//   list: {
//     outline: 0
//   }
// });

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
  console.log(stabilizedThis)

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
  {
    id: 'AssignedEngineer',
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
  {
    id: 'StatusDescription',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
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
  // numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


function Dashboard() {
  const location = useLocation();

  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const id = open ? "faked-reference-popper" : undefined;

  const navigate = useNavigate();
  const [openassign, setOpenassign] = React.useState(false);
  const [openlogin, setOpenlogin] = React.useState(false);
  const jwt = localStorage.getItem('UserToken')
  const [loader, setloader] = React.useState(false);
  const [wffeedback, setwffeedback] = React.useState([]);
  const [declined, setdeclined] = React.useState([]);
  const [Total, setTotal] = React.useState([]);
  const [opened, setopened] = React.useState([]);
  const [yettoaccept, setyettoaccept] = React.useState([]);
  const [tabledata, settabledata] = React.useState([]);
  const [nodata, setnodata] = React.useState(false);
  const [chartData, setChartData] = useState({});
  const [acceptcount, setaccept] = React.useState();
  const [resolvecount, setresolve] = React.useState();
  const [inprogresscount, setinprogress] = React.useState();
  const [closedcount, setclosed] = React.useState();
  const [overduecount, setoverdue] = React.useState();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(tabledata);
  const [warrentyStatus, setwarrentyStatus] = React.useState([]);
  const [successmsg, setsuccessmsg] = React.useState(false);

  const handleClose = () => {
    setOpenlogin(false);
  };

  useEffect(() => {
    if (localStorage.getItem('alert')) {
      setOpenlogin(true)
      setTimeout(() => {
        localStorage.removeItem("alert");
      }, 3000)
    } else {
      setOpenlogin(false);

    }

    setloader(true)
    tablefunction()
    try {
      axios({
        method: 'get',
        url: `https://${backEndDomain}/webapi/profile`,
        //data: UserId,
        headers: {
          'Content-type': 'application/json',
          'token': localStorage.getItem('UserToken'),
        }
      })
        .then(function (response) {
          console.log(response.data.data)
          // setprofileimg(response.data.data.ImgPath)
          localStorage.setItem('Profilepic', response.data.data.ImgPath);
          // setprofilepic(response.data.data.ImgPath)

        }).catch(function (response) {
          if (response.response.status == 422) {
            console.log(response.response.status);
          }
        });
    } catch (err) {
      console.log(err);

    }


    try {
      axios({
        method: 'get',
        url: `https://${backEndDomain}/webapi/webuserInput/webtotalCount`,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          console.log(response.data.totalCount, response.data)

          if (response.data.message == "No Records Found") {
            setdeclined(0)
            setwffeedback(0)
            setopened(0)
            setyettoaccept(0)
            setloader(false)
            console.log(declined, "oi")
          } else {
            setdeclined(response.data.totalCount[3].Declined)
            setwffeedback(response.data.totalCount[2].Waitingforfeedback)
            setopened(response.data.totalCount[0].Registered)
            setyettoaccept(response.data.totalCount[1].Assigned)
            setTotal(response.data.totalCount[5].Totalcount)
            setloader(false)
          }
        }).catch(function (response) {
          //   if(response.response.status == 422){
          //  // console.log(response.response.status);
          //   }
        });
    } catch (err) {
      console.log(err);

    }


    try {
      axios({
        method: 'get',
        url: `https://${backEndDomain}/webapi/webuserInput/webweekCount`,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          console.log(response.data.weekCount)
          setaccept(response.data.weekCount[1].Accepted)
          setresolve(response.data.weekCount[2].Resolved)
          setinprogress(response.data.weekCount[4].InProgress)
          setclosed(response.data.weekCount[3].Closed)
          setoverdue(response.data.weekCount[5].MTTROverdue)
          setloader(false)

        }).catch(function (response) {
          //   if(response.response.status == 422){
          //  // console.log(response.response.status);
          //   }
        });
    } catch (err) {
      console.log(err);

    }
    try {
      axios({
        method: 'get',
        url: `https://${backEndDomain}/webapi/webuserInput/webwarrentyStatus`,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          console.log(response.data.warrentyStatus)
          setwarrentyStatus(response.data.warrentyStatus)



        }).catch(function (response) {
          //   if(response.response.status == 422){
          //  // console.log(response.response.status);
          //   }
        });
    } catch (err) {
      console.log(err);

    }

  }, [])

  const tablefunction = () => {
    try {
      axios({
        method: 'get',
        url: `https://${backEndDomain}/webapi/webuserInput/webpsmtdycomplaint`,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          console.log(response.data.Complaints)
          response.data.Complaints.map((data) => {
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
          if (response.data.message == "No new complaints available for the day") {
            setnodata(true)
          }
        }).catch(function (response) {
          //   if(response.response.status == 422){
          //  // console.log(response.response.status);
          //   }
        });
    } catch (err) {
      console.log(err);

    }
  }


  const assignClose = () => setOpenassign(false);
  const [cidd, setcidd] = React.useState('');

  const openAssignModal = (cid) => {
    setcidd(cid)
    setOpenassign(true);
    setAnchorEl(null);

  }

  const Assignmodal = () => {
    const [Wstatus, setWstatus] = React.useState('');
    const [searchvalue, setsearchvalue] = React.useState('');
    const [paper, setpaper] = React.useState(false);
    const [employeeData, setemployeeData] = React.useState([]);
    const [employeeSkillLevel, setemployeeSkillLevel] = React.useState([]);

    const handleSearch = (event) => {
      setsearchvalue(event.target.value)
      if (event.target.value.length == 0) {
        setpaper(false)

      }
      let employeeDetail = {
        "employeeDetail": event.target.value
      }
      try {
        axios({
          method: 'post',
          url: `https://${backEndDomain}/webapi/webuserInput/webemployeeDetail`,
          data: employeeDetail,
          headers: {
            'Content-type': 'application/json',
            'token': jwt,
          }
        })
          .then(function (response) {
            console.log(response.data)

            if (response.data.employeeData.length > 0) {
              setemployeeData(response.data.employeeData)
              setpaper(true)
            } else {
              setpaper(false)
            }

          }).catch(function (response) {
            //   if(response.response.status == 422){
            //  // console.log(response.response.status);
            //   }
          });
      } catch (err) {
        console.log(err);

      }


    }
    const chooseitem = (val, value) => {
      console.log(val, value)
      setsearchvalue(val)
      setpaper(false)

      try {
        axios({
          method: 'get',
          url: `https://${backEndDomain}/webapi/webuserInput/webskillLevel?employeeid=${value.userid}`,
          headers: {
            'Content-type': 'application/json',
            'token': jwt,
          }
        })
          .then(function (response) {
            console.log(response.data)
            setemployeeSkillLevel(response.data.skilldata)


          }).catch(function (response) {
            //   if(response.response.status == 422){
            //  // console.log(response.response.status);
            //   }
          });
      } catch (err) {
        console.log(err);

      }
    }

    const handleChangeWStatus = (event) => {
      setWstatus(event.target.value);
      console.log(event.target.value)
    };

    const assignfun = () => {
      console.log(cidd)
      let assign = {
        "warrentyStatus": Wstatus,
        "employeeDetail": searchvalue,
        "skillLevel": employeeSkillLevel.SkillsDescription,
        "CreatedBy": "admin",
        "ModifiedBy": "admin",
        "requestId": cidd,
        "tenantId": localStorage.getItem('TenantId')
      }
      try {
        axios({
          method: 'post',
          url: `https://${backEndDomain}/webapi/webuserInput/webassign`,
          data: assign,
          headers: {
            'Content-type': 'application/json',
            'token': jwt,
          }
        })
          .then(function (response) {
            console.log(response.data.message == "Complaint Assigned Successfully")
            if (response.data.message == "Complaint Assigned Successfully") {
              assignClose()
              setsuccessmsg(true)
              tablefunction()

            }


          }).catch(function (response) {
            //   if(response.response.status == 422){
            //  // console.log(response.response.status);
            //   }
          });
      } catch (err) {
        console.log(err);

      }
    }
    return (<>
      <Modal className="assign"
        open={openassign}
        onClose={assignClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <CloseIcon className="actnSvg" onClick={handleClose}/> */}
          <CloseIcon className="actnSvg" onClick={assignClose} />
          <Box className='pp-content'>
            <img className='pp-img' src={man}></img>
          </Box>
          <Typography className='main-title' variant="h5" component="div" >
            Allocation
          </Typography>
          <Typography className='title-hlp' variant="h6" component="div">
            Complaint ID :{cidd}
          </Typography>
          <Box className='inputs'>
            <InputLabel htmlFor="anrede">Warranty Status</InputLabel>
            <FormControl className='filter-show-case1'>
              <Select
                value={Wstatus}
                onChange={handleChangeWStatus}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value="">
                </MenuItem>
                {warrentyStatus.map((value, key) => (
                  <MenuItem value={value.StatusDescription}>{value.StatusDescription}</MenuItem>


                ))}
              </Select>
            </FormControl>
            <InputLabel htmlFor="anrede">Employee Name</InputLabel>
            <FormControl className='filter-show-case1'>

              <TextField
                fullWidth
                // label="Employee Name"
                name="Employee Name"
                value={searchvalue}
                onChange={(event) => handleSearch(event)}
                autoCorrect='off'
                autoComplete='off'
                autoFocus="autofocus"
                placeholder='Type here'
              />
              {paper &&

                <Paper elevation={3} >
                  {employeeData.map((value, key) => (
                    <MenuItem value={value.username} onClick={() => chooseitem(value.username, value)}>{value.username}</MenuItem>


                  ))}

                </Paper>

              }

            </FormControl>
            {/* <PopupState variant="popover" popupId="demoMenu" className="assignpop">
    {(popupState) => (
      <div>
         <InputLabel htmlFor="anrede">Employee Name</InputLabel>
         <FormControl className='filter-show-case1'>
                             
  <TextField 
     fullWidth
       // label="Employee Name"
        name="Employee Name"
         value={searchvalue}
          onChange={(event) =>handleSearch(event)}
             autoCorrect='off'
                autoComplete='off'
                   autoFocus="autofocus" 
                       placeholder='Type here'
                           {...bindTrigger(popupState)}
                                />

 <Menu {...bindMenu(popupState)}>

    {employeeData.map((value, key) => (
    <MenuItem value={value} onClick={() => chooseitem(value)}>{value}</MenuItem>
                             
                             
    ))} 
     </Menu>
</FormControl>
      </div>
    )}
  </PopupState> */}

            <InputLabel htmlFor="anrede">Employee Skill Level</InputLabel>

            <FormControl className='filter-show-case1'>
              <TextField
                fullWidth
                value={employeeSkillLevel.SkillsDescription}
                autoCorrect='off'
                autoComplete='off'
                placeholder='Employee Skill Level'
              />
              {/* <Select
                                  value={skilllevel}
                                  onChange={handleChangeskilllevel}
                                  displayEmpty
                                  inputProps={{ 'aria-label': 'Without label' }}
                                >
                                  <MenuItem value="">
                                  Employee Skill Level
                                  </MenuItem>
                         <MenuItem value={employeeSkillLevel.SkillsDescription}>{employeeSkillLevel.SkillsDescription}</MenuItem>


                                </Select> */}
            </FormControl>
          </Box>
          <Button className='assignbtn' variant="contained" onClick={assignfun}>Assign</Button>

        </Box>
      </Modal>
    </>)
  }
  const reactDonutChartdata = [
    // {
    //   label: "Assigned",
    //   originaldata: "Yet to accept",
    //   value: 25,
    //   color: "#4B61FF"
    // },
    {
      label: "Accepted",
      originaldata: "Accepted",
      value: parseInt(acceptcount),//65
      color: "#774DCB"
    },
    {
      label: "Resolved",
      originaldata: "Waiting for feedback",
      value: parseInt(resolvecount),//15
      color: "#21B457"
    },
    {
      label: "InProgress",
      originaldata: "InProgress",
      value: parseInt(inprogresscount),//100
      color: "#FFBD4A"
    },
    {
      label: "Closed",
      originaldata: "Closed",
      value: parseInt(closedcount),//15
      color: "#FFDB4D"
    },
    {
      label: "MTTR OD",
      originaldata: "Overdue",
      value: parseInt(overduecount),//15
      color: "#FF774D"
    },

  ];
  const reactDonutChartBackgroundColor = [
    "#774dcb",//"#4B61FF",
    "#21b457",//"#774DCB",
    "#ffbd4a",//"#FFBD4A",
    "#ffdb4d",// "#FF774D",
    "#ff774d",

    "#FFDB4D"
  ];
  const reactDonutChartInnerRadius = 0.5;
  const reactDonutChartSelectedOffset = 0.04;

  let reactDonutChartStrokeColor = "#FFFFFF";
  const reactDonutChartOnMouseEnter = (item) => {
    console.log(item)
    let color = reactDonutChartdata.find((q) => q.label === item.label).color;
    reactDonutChartStrokeColor = color;
  };

  // const openAssignModal = ()=> {
  //   setOpenassign(true);
  //  }
  //  const assignClose = () => setOpenassign(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const reactDonutChartHandleClick = (item, toggled) => {
    console.log(item.label)
    navigate('/informationitems', { state: { id: item.originaldata, type: "Week" } })
  };




  const state = {
    labels: ['Assigned', 'Accepted', 'InProgress',
      'Resolved', 'MTTR Overdue', 'Closed'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: [
          '#B21F00',
          '#C9DE00',
          '#2FDE00',
          '#00A6B4',
          '#6800B4',
          '#FFA500'
        ],
        hoverBackgroundColor: [
          '#501800',
          '#4B5000',
          '#175000',
          '#003350',
          '#35014F',
          '#FF8C00'
        ],
        data: [40, 10, 10, 10, 10, 10]
      }
    ]
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const myFunction = () => {
    document.getElementById("myDropdown").classList.toggle("show");
    console.log("hi")
  }

  // Close the dropdown if the user clicks outside of it
  window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  return (

    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
          <h2 className="page-heding">Service Summary ({Total}) - YTD</h2>
          <Grid container spacing={3} className="fo-mob">
            {/* ------------ Action Items ------------ */}
            <Grid item lg={5} md={12} sm={12} >
              <Card className='it-height'>
                <CardContent className='st-pd'>
                  <Typography gutterBottom variant="h5" component="div">
                    Action Items
                  </Typography>
                  <Stack direction="row" spacing={2} className="actnItem">

                    {/* ------------ Item1 ------------ */}
                    <Item sx={{ background: '#4B61FF', cursor: "pointer" }} className="parent brrd" onClick={() => { navigate('/actionitems', { state: { id: "open", type: "Total" } }) }}>
                      <Box className="itemInner">
                        <Typography className="numbr">{opened}</Typography>
                        <CheckIcon />
                      </Box>
                      <Typography className="txt">Open</Typography>
                    </Item>

                    {/* ------------ Item2------------ */}
                    <Item sx={{ background: '#35B729', cursor: "pointer" }} className="parent brrd" onClick={() => { navigate('/actionitems', { state: { id: "Yet to accept", type: "Total" } }) }}>
                      {/* onClick={() => { navigate('/actionitems',{state:{id:"Yet to accept"}}) }} */}
                      <Box className="itemInner">
                        <Typography className="numbr">{yettoaccept}</Typography>
                        <HistoryToggleOffIcon />
                      </Box>
                      <Typography className="txt">Yet to accept</Typography>
                    </Item>
                  </Stack>
                  <Stack direction="row" spacing={2} className="actnItem">

                    {/* ------------ Item3------------ */}
                    <Item sx={{ background: '#FF5C5C', cursor: "pointer" }} className="parent brrd" onClick={() => { navigate('/actionitems', { state: { id: "Declined", type: "Total" } }) }}>
                      <Box className="itemInner">
                        <Typography className="numbr">{declined}</Typography>
                        <ThumbDownOffAltIcon />
                      </Box>
                      <Typography className="txt">Declined</Typography>
                    </Item>

                    {/* ------------ Item4------------ */}
                    <Item sx={{ background: '#FFBD4A', cursor: "pointer" }} className="parent brrd" onClick={() => { navigate('/actionitems', { state: { id: "Waiting for feedback", type: "Total" } }) }}>
                      <Box className="itemInner">
                        <Typography className="numbr">{wffeedback}</Typography>
                        <TimelapseIcon />
                      </Box>
                      <Typography className="txt">Waiting for Feedback</Typography>
                    </Item>
                  </Stack>
                </CardContent>
              </Card>

            </Grid>
            {/* ------------ Doughnut Chart ------------ */}
            <Grid item lg={7} md={12} sm={12}>
              <Card className='it-height'>
                <CardContent className='fo-height st-pd'>
                  <Box className='itemInner'>
                    <Typography gutterBottom variant="h5" component="div">
                      Informative Items
                    </Typography>
                    <Typography color="primary" variant="caption" display="block" gutterBottom>Last 7 days<DateRangeIcon className='date-btn' /></Typography>
                  </Box>
                  <DonutChart
                    onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
                    width={320}
                    height={210} //210
                    strokeColor={reactDonutChartStrokeColor}
                    data={reactDonutChartdata}
                    colors={reactDonutChartBackgroundColor}
                    innerRadius={reactDonutChartInnerRadius}
                    selectedOffset={reactDonutChartSelectedOffset}
                    onClick={(item, toggled) => reactDonutChartHandleClick(item, toggled)}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ width: '100%', mb: 2, mt: 2 }}>
                <CardContent>
                  <Box className='box-header'>
                    <Typography variant="h6" component="div">
                      Today's Complaint
                      {nodata == false ? <span className='header-count'>{tabledata.length}</span> : <span className='header-count'>0</span>}
                    </Typography>

                    {nodata == false ? <Button className="outlined" endIcon={<ArrowForwardIcon />} onClick={() => { navigate('/todayscomplaints') }}>View All</Button> : ""}

                  </Box>


                  {/* <Box sx={{ width: '100%' }}> */}

                  {nodata == false ? <TableContainer  >
                    <Table

                    >
                      <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={tabledata.length}
                      />
                      <TableBody>
                        {stableSort(tabledata, getComparator(order, orderBy))
                          .slice(0, 9)
                          .map((row, index) => {


                            return (
                              <TableRow
                                hover

                                tabIndex={-1}
                                key={row.customername}
                              >
                                <TableCell
                                  component="th"
                                  scope="row"
                                >
                                  {row.customerName}
                                </TableCell>
                                <TableCell align="right">{row.Equipment_Status != null ? row.Equipment_Status : "-"}</TableCell>
                                <TableCell align="right">{row.address}</TableCell>
                                <TableCell align="right">{row.customerContact}</TableCell>
                                <TableCell align="right">{row.AssignedEngineer != null ? row.AssignedEngineer : "-"}</TableCell>
                                <TableCell align="right">{row.EquipmentPrefix}</TableCell>
                                <TableCell align="right">{row.EquipmentModel}</TableCell>
                                <TableCell align="right" className={`status ${row.StatusDescription}`}>{row.StatusDescription}</TableCell>
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
                                                    {row.StatusDescription == "Resolved" ? <MenuItem onClick={() => { navigate('/alldetails', { state: { id: "todayscomplaints", cid: row.RequestId } }) }}><RemoveRedEyeIcon />&nbsp;View</MenuItem> : ""}
                                                    {row.StatusDescription == "Open" ? <>
                                                      <MenuItem onClick={() => openAssignModal(row.RequestId)}><PersonAddAltIcon /> &nbsp;Assign</MenuItem>
                                                      <MenuItem onClick={() => { navigate('/alldetails', { state: { id: "todayscomplaints", cid: row.RequestId } }) }}><RemoveRedEyeIcon />&nbsp;View</MenuItem></> : ""}
                                                    {row.StatusDescription == "Inprogress" ? <MenuItem onClick={() => { navigate('/alldetails', { state: { id: "todayscomplaints", cid: row.RequestId } }) }}><RemoveRedEyeIcon />&nbsp;View</MenuItem> : ""}
                                                    {row.StatusDescription == "Accepted" ? <MenuItem onClick={() => { navigate('/alldetails', { state: { id: "todayscomplaints", cid: row.RequestId } }) }}><RemoveRedEyeIcon />&nbsp;View</MenuItem> : ""}
                                                    {row.StatusDescription == "Yet to accept" ?
                                                      <><MenuItem onClick={() => openAssignModal(row.RequestId)}><PersonAddAltIcon /> &nbsp;Re-Assign</MenuItem><MenuItem onClick={() => { navigate('/alldetails', { state: { id: "todayscomplaints", cid: row.RequestId } }) }}><RemoveRedEyeIcon />&nbsp;View</MenuItem></> : ""}

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
                    : <Box className="fo-bg-wrap">
                      <img src={meet}></img>
                      <Typography className='no-available'>No complaints available at the moment</Typography>
                    </Box>}

                </CardContent>
              </Card>
              {nodata == false ? <Typography className='show-txt'>Showing {tabledata.length} of {tabledata.length}<Button className="outlined" endIcon={<ArrowForwardIcon />} onClick={() => { navigate('/todayscomplaints') }}>View All</Button></Typography> : ""}

            </Grid>
          </Grid>
          {/* ____________________Assign modal____________ */}
          <Assignmodal />


          <Snackbar className='loginalert' open={openlogin} autoHideDuration={2000} onClose={handleClose}>
            <Alert severity="success" sx={{ width: '50%' }}>
              Login successfully
            </Alert>
          </Snackbar>
          <Snackbar open={successmsg} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} className="alert-leng">
            <Alert severity="success" sx={{ width: '50%' }}>
              Complaint Assigned Successfully
            </Alert>
          </Snackbar>
        </div>
      </Container>

    </Layout>
  )
}

export default Dashboard;

// loginalert