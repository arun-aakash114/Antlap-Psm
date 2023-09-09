import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ListItemIcon from '@mui/material/ListItemIcon';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Badge, Stack } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, useNavigate } from 'react-router-dom';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LogoutIcon from '@mui/icons-material/Logout';
import CancelIcon from '@mui/icons-material/Cancel';
import Footer from '../footer';
import Logo from '../../assets/logo.png';
import Logo_icon from '../../assets/logo_icon.png';
import userHeader from '../../assets/user-header.jpg';
import '../../App.css';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { backEndDomain } from '../../service/apiserver'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import ListItem, { listItemClasses } from "@mui/material/ListItem";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import bulb from '../../assets/bulb.svg';
import axios from "axios";
import Done from '@mui/icons-material/Done';
import { useDispatch, useSelector } from 'react-redux';
import { clearState } from '../../store/reducers/dataManageForm';
import { revertDiscard } from '../../store/reducers/toasters';
function Explayout({ children }) {
  let dispatch = useDispatch()
  const navigate = useNavigate();
  const [openlog, setlogOpen] = React.useState(false);
  let toaster = useSelector((state) => state.toaster)


  const handleClose = () => setlogOpen(false);
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
  function MyNavLink(props) {
    return <NavLink {...props} activeClassName="active" />;
  }
  const mainListItems = (
    <div className='sidebar'>
      <List
        sx={{
          [`& .active`]: {
            color: "#426e81",
            fontWeight: "bold",
            "& svg": {
              fill: "#426e81"
            }

          }
        }}
      >
        <ListItem to="/expertDashboard" component={MyNavLink} className='sb_icon' >

          <ListItemIcon>
            {/* <DashboardIcon /> */}
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem component={MyNavLink} to="/managemeeting" className='sb_icon'>

          <ListItemIcon>
            {/* <PeopleIcon/> */}
            <EventAvailableIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Meeting" />
        </ListItem>

        <ListItem component={MyNavLink} to="/solutionDashboard" className='sb_icon'>

          <ListItemIcon>
            <LightbulbIcon />
          </ListItemIcon>
          <ListItemText primary="AI Data Mgnt" />
        </ListItem>

        <ListItem component={MyNavLink} to="/expertProfile" className='sb_icon'>

          <ListItemIcon>
            <PermIdentityIcon />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItem>

        <ListItem className='sb_icon' onClick={() => { setlogOpen(true); }}>

          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
  const drawerWidth = 240;
  const mdTheme = createTheme({
    overrides: {
      MuiButton: {
        label: {
          color: "red",
          fontFamily: 'Poppins',
        },
      },
    }
  });
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

  const logout = () => {
    const jwt = localStorage.getItem('UserToken')
    let Data = {
      "userid": localStorage.getItem('userid')
    }


    try {
      axios({
        method: 'post',
        url: `https://${backEndDomain}/webapi/webauthentication/logout`,
        //data: Data,
        headers: {
          'Content-type': 'application/json',
          //'Authorization' : `${jwt}`,
          'token': jwt,
        }
      })
        .then(function (response) {
          console.log(response)
          if (response.data.message == "You Are LoggedOut Successfully") {
            navigate('/')
            localStorage.setItem('logout', "logout");
            localStorage.removeItem("Profilepic");

          }
        }).catch(function (response) {
          console.log(response)

        });
    } catch (err) {
      console.log(err);
    }
  }

  function HeaderContent() {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
      setOpen(!open);
    };
    const usermail = localStorage.getItem('email')
    const profilepic = localStorage.getItem('Profilepic')

    const handleRoute = () => {
      let type = localStorage.getItem('type');
      if (type === '4') {
        navigate('/expertProfile')
      } else {
        navigate('/myprofile')
      }
    }

    return (
      <><ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', background: 'white'
              }}
            >
              <IconButton onClick={toggleDrawer} sx={{
                marginRight: '36px',
                ...(!open && { display: 'none' }),
              }}>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                edge="start"

                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1, color: 'black' }}
              >

              </Typography>
              <Box sx={{
                display: 'flex',
              }}>

                <Stack className='user-profile-wrapper'>
                  <Box>
                    <Typography color="primary">Welcome</Typography>
                    <Typography color="primary" variant="caption" display="block" gutterBottom>{usermail}</Typography>
                  </Box>
                  <Box className='user-profile-sml' onClick={() => handleRoute()}>
                    <img className="profilepic" src={profilepic} alt={userHeader}></img>
                  </Box>
                </Stack>

              </Box>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open} PaperProps={{
            sx: {
              backgroundColor: "#426e81",
              color: "red",
            }
          }}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: [1],
                background: "white"
              }}
            >

              <img src={Logo_icon} className="logo_icon"></img>
              <img src={Logo} className="logo_title"></img>


            </Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) => theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            {children}
            <Footer />
          </Box>
        </Box>
      </ThemeProvider>
        <Modal
          open={openlog}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {/* Are you sure want to logout? */}
              Are you sure you want to logout?
            </Typography>
            <Box className='fo-right'>
              <Box className='btn-flx'>
                <Button className='btn-primary mr' variant="contained" startIcon={<LogoutIcon />} sx={{ mr: 2 }} onClick={logout}>Okay</Button>
                <Button variant="outlined" startIcon={<CancelIcon />} onClick={() => { setlogOpen(false); }}>Cancel</Button>
              </Box>
            </Box>
          </Box>
        </Modal>
        <Modal
          open={toaster.clearForm}
          onClose={() => dispatch(revertDiscard())}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to discard the changes?
            </Typography>
            <Box className='fo-right'>
              <Box className='btn-flx'>
                <Button className='btn-primary mr' variant="contained" startIcon={<Done />} sx={{ mr: 2 }} onClick={() => { dispatch(clearState()); dispatch(revertDiscard()) }}>Okay</Button>
                <Button variant="outlined" startIcon={<CancelIcon />} onClick={() => dispatch(revertDiscard())}>Cancel</Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </>

    );
  }




  return (
    <><HeaderContent /></>
    //_____________
  )

}
export default Explayout;