import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent } from '@mui/material';
import { Stack, TextField } from '@mui/material';
import InputLabel from "@mui/material/InputLabel";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { backEndDomain } from '../../../../service/apiserver';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { toast } from 'react-toastify';


function Createplbapi() {
    const { state } = useLocation();

    const navigate = useNavigate();
    const initialState = {
        ProblemCode: state && state.ProblemCode ? state.ProblemCode : "",
        ProblemDescription: state && state.ProblemDescription ? state.ProblemDescription : ""
    };

    const [userData, setUserData] = useState(initialState);

    const handleClear = () => {
        setUserData(initialState);
    };
    const isSaveDisabled = userData.ProblemCode === "" || userData.ProblemDescription === "";

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    console.log("id", state)

    const handleSubmit = (event) => {
        event.preventDefault();
      
        const problemCodeData = {
          "TenantId": localStorage.getItem('TenantId'),
          "ProblemCode": userData.ProblemCode,
          "ProblemDescription": userData.ProblemDescription,
        };
        const apiUrl = state?.ProblemCode
          ? `https://${backEndDomain}/masterapi/master/updateProblemCode`
          : `https://${backEndDomain}/masterapi/master/addProblemCode`;
        const method = state?.ProblemCode ? 'put' : 'post';
      
        axios({
          method: method,
          url: apiUrl,
          headers: {
            'Content-type': 'application/json',
            'token': localStorage.getItem('UserToken'),
          },
          data: problemCodeData
        })
          .then(function (response) {
            console.log(response);
      
            // toast.success("Data saved successfully", {
            //   position: "top-center",
            //   autoClose: 1000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            //   onClose: () => navigate('/manageproblemcodes')
            // });
          })
          .catch(function (error) {
            console.log(error);
            if (
              error.response &&
              error.response.data &&
              error.response.data.message &&
              error.response.status === 500 // Assuming 409 indicates that the data already exists
            ) {
              // toast.error("Problem Code Already Exists!", {
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
      };
      

    return (
        <Box className='map'>
            {/* <ToastContainer /> */}
            <Card>
                <CardContent>
                    <InputLabel shrink htmlFor="bootstrap-input" className='input'>
                        Problem Code
                    </InputLabel>
                    <TextField id="outlined-basic"
                        name="ProblemCode"
                        value={userData.ProblemCode}
                        onChange={handleChange}
                        onKeyPress={(event) => {
                            if (!/\d/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        variant="outlined"
                        fullWidth
                    />

                    <InputLabel shrink htmlFor="bootstrap-input" className='input'>
                        Problem Code Desc
                    </InputLabel>
                    
                        <TextField
                            id="outlined-multiline-static"
                            multiline
                            rows={6}
                            name="ProblemDescription"
                            value={userData.ProblemDescription}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            type='text'
                            wrap={true}
                            className="custom-textfield" // Add a custom class to the TextField component
                        />
                     

                    <div className='riig'>
                        <Stack spacing={2} direction="row">
                            <Button variant="outlined" onClick={handleClear} >Clear</Button>
                            <Button variant="contained" onClick={handleSubmit} disabled={isSaveDisabled}>Save</Button>
                        </Stack>
                    </div>
                </CardContent>


            </Card>
        </Box>

    )
}

export default Createplbapi

