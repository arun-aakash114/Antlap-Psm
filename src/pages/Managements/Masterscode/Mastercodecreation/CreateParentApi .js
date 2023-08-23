import React, { useState  } from 'react'
import { Box, CardContent,  Card } from '@mui/material'
import {   useNavigate, useLocation } from 'react-router-dom';
import InputLabel from "@mui/material/InputLabel";
import { Stack, Button, TextField } from '@mui/material'
import { backEndDomain } from '../../../../service/apiserver';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { toast } from 'react-toastify';

function CreateParentApi() {

    const { state } = useLocation();

    const navigate = useNavigate();
    const initialState = {
        ParentCode: state && state.ParentCode ? state.ParentCode : "",
        ParentDescription: state && state.ParentDescription ? state.ParentDescription : "",
        Status: state && state.isActive ? state.isActive : "",

    };
    console.log("state", state)

    const [userData, setUserData] = useState(initialState);

    const handleClear = () => {
        setUserData(initialState);
    };
    const isSaveDisabled = userData.ParentCode === "" || userData.ParentDescription === ""
    || userData.Status === ""
    ;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    console.log("id", state)

    const handleSubmit = (event) => {




        event.preventDefault();
        const ParentCodeData = {
            "TenantId": localStorage.getItem('TenantId'),
            "ParentCode": userData.ParentCode,
            "ParentDescription": userData.ParentDescription,
            "isActive": userData.Status
        }
        const apiUrl = state?.ParentCode
            ? `https://${backEndDomain}/masterapi/master/updateSMCSParent`
            : `https://${backEndDomain}/masterapi/master/addSMCSParent`;
        const method = state?.ParentCode ? 'put' : 'post';

        axios({
            method: method,
            url: apiUrl,
            headers: {
                'Content-type': 'application/json',
                'token': localStorage.getItem('UserToken'),
            },
            data: ParentCodeData
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
        
                //     onClose: () => navigate('/manageparentcodes')
                //   });
                 
            })
            .catch(function (error) {
                console.log(error);
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message &&
                    error.response.status === 500 // Assuming 409 indicates that the data already exists
                  ) {
                    // toast.error("Parent Code Already Exists!", {
                    //   position: "top-center",
                    //   autoClose: 2000,
                    //   hideProgressBar: false,
                    //   closeOnClick: true,
                    //   pauseOnHover: true,
                    //   draggable: true,
                    //   progress: undefined
                    // });
                  }
            });
    }




    return (
        <Box className='map'>
            <Card>
            {/* <ToastContainer /> */}
                <CardContent>
                    <InputLabel shrink htmlFor="bootstrap-input" className='input'>
                        SMCS Parent Code
                    </InputLabel>
                    <TextField id="outlined-basic"
                        name="ParentCode"
                        value={userData.ParentCode}
                        onChange={handleChange}
                        fullWidth
                        onKeyPress={(event) => {
                            if (!/\d/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        variant="outlined"
                    />
                    <InputLabel shrink htmlFor="bootstrap-input" className='input'>
                        SMCS Parent Code Desc
                    </InputLabel>
                    
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={4}
                            name="ParentDescription"
                            value={userData.ParentDescription}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            maxLength={true}
                            type='text'
                            
                        />              
                 <InputLabel shrink htmlFor="bootstrap-input" className='input'>
                            Status
                        </InputLabel>
                        <Select name="Status" value={userData?.Status} onChange={handleChange}>
                            <MenuItem value="1">Active</MenuItem>
                            <MenuItem value="0">Inactive</MenuItem>
                        </Select>
                    <div className='riig'>
                        <Stack spacing={2} direction="row">
                            <Button variant="outlined" onClick={handleClear} >Clear</Button>
                            <Button variant="contained" onClick={handleSubmit} disabled={isSaveDisabled } >Save</Button>
                        </Stack>
                    </div>
                </CardContent>
            </Card>
        </Box>
    )
}

export default CreateParentApi;
