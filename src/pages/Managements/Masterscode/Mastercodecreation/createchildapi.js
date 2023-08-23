import React, { useState, useEffect, useRef } from 'react';
import {   useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Card, CardContent } from '@mui/material';
import { Stack , TextField} from '@mui/material';
import InputLabel from "@mui/material/InputLabel";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { backEndDomain } from '../../../../service/apiserver';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { toast } from 'react-toastify';
import Autocomplete from '@mui/material/Autocomplete';


function Createchildapi() {

    const [childdata, SetChilddata] = useState([])
    const { state } = useLocation();

    console.log("state", state)

    const navigate = useNavigate();
    const initialState = {
        ChildCode: state && state.ChildCode ? state.ChildCode : "",
        ChildDescription: state && state.ChildDescription ? state.ChildDescription : "",
        Status: state && state.isActive ? state.isActive : "",
        ParentCode: state && state.ParentProblemCode ? state.ParentProblemCode : "",

    };

    const [userData, setUserData] = useState(initialState);
    const [selectedParentCode, setSelectedParentCode] = useState("");


    const handleClear = () => {
        setUserData(initialState);
        setSelectedParentCode("");
        SetChilddata([])


    };
    const isSaveDisabled = userData.ChildCode === "" || userData.ChildDescription === "" || userData.Status === "" ||   userData.selectedParentCode === "";

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        setUserData({ ...userData, [name]: value });
    };

    // const handleParentCodeChange = (event, value) => {
    //     console.log(value, "value")
    //     setSelectedParentCode(value ? value.ParentCode : "");
    // };

    console.log("id", state)

    const handleSubmit = (event) => {
        event.preventDefault();
        const ChildCodeData = {

            "TenantId": localStorage.getItem('TenantId'),
            "ChildCode": userData.ChildCode,
            "ChildDescription": userData.ChildDescription,
            "ParentProblemCode": userData.ParentCode,
            "isActive": userData.Status

        }
        const apiUrl = state?.ChildCode
            ? `https://${backEndDomain}/masterapi/master/updateSMCSChild`
            : `https://${backEndDomain}/masterapi/master/addSMCSChild`;
        const method = state?.ChildCode ? 'put' : 'post';

        axios({
            method: method,
            url: apiUrl,
            headers: {
                'Content-type': 'application/json',
                'token': localStorage.getItem('UserToken'),
            },
            data: ChildCodeData
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
        
                //     onClose: () => navigate('/managechildcodes')
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
                    // toast.error("Child Code Already Exists!", {
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

  

    useEffect(() => {

        try {
            axios({
                method: 'get',
                url: `https://${backEndDomain}/masterapi/master/viewSMCSParent `,
                headers: {
                    'Content-type': 'application/json',
                    'token': localStorage.getItem('UserToken'),
                }
            })
                .then(function (response) {
                    SetChilddata(response.data.SMCSParentCodesData)  

                    console.log("SMCSChildCodesData", response.data.SMCSChildCodesData)
                }).catch(function (response) {
                    //   if(response.response.status == 422){
                    //  // console.log(response.response.status);
                    //   }
                });
        } catch (err) {
            console.log(err);

        }

    }, [])

    return (
        <div>
            <Box className='map'>
                <Card>
                {/* <ToastContainer /> */}
                    <CardContent>
                        <InputLabel shrink htmlFor="bootstrap-input" className="input">
                            SMCS Parent Code
                        </InputLabel>
                        <Autocomplete
                            key={childdata}
                            disablePortal
                            defaultValue={userData.ParentCode ?  userData.ParentCode: ""}
                            options={childdata.map((row) => row.ParentCode)}
                            onChange={(event, value) => {  setUserData({ ...userData, ['ParentCode']: value });}}
                            name="ParentCode"
                            renderInput={(params) => (
                                <TextField {...params} variant="outlined" />
                            )}
                        />                          
                        <InputLabel shrink htmlFor="bootstrap-input" className='input'>
                            SMCS Child Code
                        </InputLabel>
                        <TextField id="outlined-basic"
                            name="ChildCode"
                            value={userData.ChildCode}
                            onChange={handleChange}
                            onKeyPress={(event) => {
                                if (!/\d/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            fullWidth
                            variant="outlined"
                        />
                        <InputLabel shrink htmlFor="bootstrap-input" className='input'>
                            SMCS Child Desc
                        </InputLabel>
                        <form className='input' noValidate autoComplete="off">
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={4}
                                name="ChildDescription"
                                value={userData.ChildDescription}
                                onChange={handleChange}
                                variant="outlined"
                                type='text'
                                fullWidth
                                wrap={true}
                            />
                        </form>
                   

                        <InputLabel shrink htmlFor="bootstrap-input" className='input'>
                            Status
                        </InputLabel>
                        <Select name="Status" value={userData?.Status} onChange={handleChange}>
                            <MenuItem value="1">Active</MenuItem>
                            <MenuItem value="0">Inactive</MenuItem>
                        </Select>
                        <div className='riig'>
                            <Stack spacing={2} direction="row">
                                <Button variant="outlined" onClick={handleClear}  >Clear</Button>
                                <Button variant="contained" onClick={handleSubmit} disabled={isSaveDisabled}  >Save</Button>
                            </Stack>   
                        </div>
                    </CardContent>
                </Card>
            </Box>
            
        </div>
    )
}

export default Createchildapi