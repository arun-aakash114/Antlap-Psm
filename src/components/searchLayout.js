import React, { useState, useEffect } from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TimelineIcon from '@mui/icons-material/Timeline';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
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
import LogoutIcon from '@mui/icons-material/Logout';
import CancelIcon from '@mui/icons-material/Cancel';
import Footer from './footer';
// import Logo from '../assets/logo.png';
// import Logo_icon from './../assets/logo_icon.png';
import userHeader from './../assets/user-header.jpg';
import { red } from '@mui/material/colors';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

import LogoLrg from '../assets/logo-lrg1.png';
import '../searchApp.scss'
import axios from "axios";
import * as Icon from 'react-bootstrap-icons';
import { backEndDomain } from '../service/apiserver';
// import { useNavigate } from 'react-router-dom';


function Layout({ children }) {
    const navigate = useNavigate();
    const [openlog, setlogOpen] = React.useState(false);
    const [activeclass, setClass] = React.useState('');
    // const [profilepic, setprofilepic] = React.useState( );


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

    useEffect(() => {
        // try {
        // if (['/knowledgeBase', '/bom', '/result', '/searchresult'].includes(window.location.pathname)) {
        //     console.log('sss')
        //     require('../searchApp.css');
        // } else {
        //     require('../App.css')
        // }
        //   axios({
        //     method: 'get',
        //     url: `http://${backEndDomain}/webapi/profile`,
        //     //data: UserId,
        //     headers: {
        //       'Content-type': 'application/json',
        //       'token' : localStorage.getItem('UserToken'),
        //    }
        //   })
        //   .then(function (response) {
        //           console.log(response.data.data)
        //         // setprofileimg(response.data.data.ImgPath)
        //         //  localStorage.setItem('Profilepic',response.data.data.ImgPath);
        //         setprofilepic(response.data.data.ImgPath)

        //     }) .catch(function (response) {
        //       if(response.response.status == 422){
        //       console.log(response.response.status);
        //       }
        //     });
        // }catch (err) {
        //  console.log(err);

        // }

    }, [])
    const drawerWidth = 240;
    const mdTheme = createTheme({
        overrides: {
            MuiButton: {
                label: {
                    color: "red",
                    fontFamily: 'Poppins',
                },
                // regular: {
                //   '@media(min-width:600px)' : {
                //     minHeight:"px"
                //   }
                // }
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
        const navigate = useNavigate();
        const [open, setOpen] = React.useState(false);
        const toggleDrawer = () => {
            setOpen(!open);
        };
        const username = localStorage.getItem('Username')
        const profilepic = localStorage.getItem('Profilepic')
        const Email = localStorage.getItem('email')

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

                            {/* <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1, color: 'black' }}
              > 

              </Typography>*/}
                            <Box className='logo-header'>
                                <div onClick={() => navigate('/knowledgeBase')}>
                                    <img src={LogoLrg} className='img-logo'></img>
                                </div>
                            </Box>
                            <Box sx={{
                                display: 'flex',
                            }}>
                                <Button className='lg-icon' onClick={() => { setlogOpen(true); }}> <Icon.Power /></Button>

                                <Stack className='user-profile-wrapper'>


                                    <Box>
                                        <Typography color="primary">Welcome</Typography>
                                        <Typography color="primary" variant="caption" display="block" gutterBottom>{Email}</Typography>
                                    </Box>
                                    <Box className='user-profile-sml' onClick={() => { navigate('/myprofile'); }}>
                                        {/* onClick={() => { navigate('/myprofile'); } } */}
                                        <img className="profilepic" src={profilepic} alt={userHeader}></img>

                                        {/* <img src={userHeader}></img> */}
                                    </Box>
                                </Stack>

                            </Box>
                        </Toolbar>
                    </AppBar>

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
                        {/* <Button
                                                type="submit"
                                                // size="large"
                                                variant="contained"
                                                className='spl-tool'
                                            >
                                               hlo
                                            </Button> */}
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
                        <Typography id="modal-modal-title">
                            Are you sure you want to logout?
                            {/* sure */}
                        </Typography>

                        <Box className='btn-flx' sx={{ mt: 3, marginLeft: '50px' }}>
                            <Button variant="contained" startIcon={<LogoutIcon />} sx={{ mr: 1 }} onClick={logout}>Okay</Button>
                            <Button variant="outlined" startIcon={<CancelIcon />} onClick={() => { setlogOpen(false); }}>Cancel</Button>
                        </Box>

                    </Box>
                </Modal>
            </>

        );
    }




    return (
        <div className='searchLayout'><HeaderContent /></div>
    )

}
export default Layout;