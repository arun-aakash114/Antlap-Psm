import React, { useState  } from 'react'
import { Box, CardContent,  Card } from '@mui/material'
import {   useNavigate, useLocation } from 'react-router-dom';
import InputLabel from "@mui/material/InputLabel";
import { Stack, Button, TextField } from '@mui/material'
import { backEndDomain } from '../../../service/apiserver';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { toast } from 'react-toastify';




function Createmenuapi() {
    const { state } = useLocation();
    const navigate = useNavigate();

    const initialState = {
        name: state && state.name ? state.name : "",
        levelid: state && state.levelid ? state.levelid : "",
        parentmenuid: state && state.parentmenuid ? state.parentmenuid : "",
        menuid: state && state.MenuId ? state.MenuId : "",



    };
    console.log("state", state)

    const [userData, setUserData] = useState(initialState);

    const handleClear = () => {
        setUserData(initialState);
    };
    const isSaveDisabled = userData.name === "" || userData.levelid === ""
    || userData.parentmenuid === ""
    ;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    console.log("id", state)

    const handleSubmit = (event) => {
        event.preventDefault();
        const MenuCodeData = {
            "TenantId": localStorage.getItem('TenantId'),
            "name": userData.name,
            "levelid": userData.levelid,
            "parentmenuid": userData.parentmenuid,
            "menuid" :userData.menuid


        }
        const apiUrl = state?.name
            ? `https://${backEndDomain}/masterapi/master/UpdateMenus`
            : `https://${backEndDomain}/masterapi/master/AddMenus`;
        const method = state?.name ? 'put' : 'post';

        axios({
            method: method,
            url: apiUrl,
            headers: {
                'Content-type': 'application/json',
                'token': localStorage.getItem('UserToken'),
            },
            data: MenuCodeData
        })
            .then(function (response) {
                console.log(response);
               
                // toast.success("Data saved successfully", {
            
                //     position: "top-center",
                //     autoClose: 1000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
        
                //     onClose: () => navigate('/managemenus')
                //   });
            })
            .catch(function (error) {
                console.log(error);
            });
    }







  return (
    <Box className='map'>
         {/* <ToastContainer /> */}
            <Card>
                <CardContent>
                    <InputLabel shrink htmlFor="bootstrap-input" className='input'>
                    Menu Name
                    </InputLabel>
                    <TextField id="outlined-basic"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        
                        fullWidth
                        type='text'
                        variant="outlined"
                    />
                    <InputLabel shrink htmlFor="bootstrap-input" className='input'>
                    Menu Level
                    </InputLabel>
                    
                        <TextField
                            id="outlined-multiline-static"
                            name="levelid"
                            value={userData.levelid}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            maxLength={true}
                            onKeyPress={(event) => {
                                if (!/\d/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            
                        />              
                 <InputLabel shrink htmlFor="bootstrap-input" className='input'>
                 Select Parent
                        </InputLabel>
                        <Select name="parentmenuid" value={userData.parentmenuid} onChange={handleChange}>
                           
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                            <MenuItem value="6">6</MenuItem>
                            <MenuItem value="7">7</MenuItem>
                            <MenuItem value="8">8</MenuItem>
                            <MenuItem value="9">9</MenuItem>

                        </Select>
                    <div className='riig'>
                        <Stack spacing={2} direction="row">
                            <Button variant="outlined" onClick={handleClear}  >Clear</Button>
                            <Button variant="contained" onClick={handleSubmit} disabled={isSaveDisabled }  >Save</Button>
                        </Stack>
                    </div>
                </CardContent>
            </Card>
        </Box>
  )
}

export default Createmenuapi;