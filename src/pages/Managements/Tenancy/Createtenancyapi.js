import React, { useState } from 'react'
import { Box, CardContent, Card } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom';
import InputLabel from "@mui/material/InputLabel";
import { Stack, Button, TextField } from '@mui/material'
import { backEndDomain } from '../../../service/apiserver';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { toast } from 'react-toastify';


function Createtenancyapi() {

    const { state } = useLocation();

    const navigate = useNavigate();

    const initialState = {
        name: state && state.name ? state.name : "",
        EffectiveFrom: state && state.EffectiveFrom ? state.EffectiveFrom.split("T")[0] : '',
        EffectiveTo: state && state.EffectiveTo ? state.EffectiveTo.split("T")[0] : '',




    };
    console.log("state", state)

    const [userData, setUserData] = useState(initialState);

    const handleClear = () => {
        setUserData(initialState);
    };
    const isSaveDisabled = userData.name === "" || userData.EffectiveFrom === ""
        || userData.EffectiveTo === ""
        ;

        const handleChange = (event) => {
            const { name, value } = event.target;
        
            if (name === 'EffectiveFrom') {
              setUserData({
                ...userData,
                [name]: value,
                EffectiveTo: '', // Reset EffectiveTo when EffectiveFrom changes
              });
            } else {
              setUserData({ ...userData, [name]: value });
            }
          };

    console.log("id", state)

    const handleSubmit = (event) => {
        event.preventDefault();
      
        const MenuCodeData = {
          "TenantId": localStorage.getItem('TenantId'),
          "name": userData.name,
          "EffectiveFrom": userData.EffectiveFrom,
          "EffectiveTo": userData.EffectiveTo,
        };
        const apiUrl = state?.name
          ? `https://${backEndDomain}/masterapi/master/UpdateTenants`
          : `https://${backEndDomain}/masterapi/master/AddTenants`;
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
            //   position: "top-center",
            //   autoClose: 1000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            //   onClose: () => navigate('/managetenancy')
            // });
          })
          .catch(function (error) {
            console.log(error);
            if (error.response && error.response.data && error.response.data.message) {
              // toast.error("Name Already Exists", {
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
        <div><Box className='map'>

            <Card>
                <CardContent>
                {/* <ToastContainer /> */}
                    <InputLabel shrink htmlFor="bootstrap-input" className='input'>
                        Name
                    </InputLabel>
                    <TextField
                        id="outlined-basic"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        fullWidth
                        type="text"
                        variant="outlined"
                        inputMode="text"
                    />
                    <InputLabel shrink htmlFor="bootstrap-input" className='input'>
                        Effective From
                    </InputLabel>
                    <TextField
                        id="outlined-multiline-static"
                        name="EffectiveFrom"
                        value={userData.EffectiveFrom}
                        onChange={handleChange}
                        type="date"

                        variant="outlined"
                        fullWidth
                    />
                    <InputLabel shrink htmlFor="bootstrap-input" className='input'>
                        Effective To
                    </InputLabel>
                    <TextField
              id="outlined-multiline-static"
              name="EffectiveTo"
              type="date"
              value={userData.EffectiveTo}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              disabled={!userData.EffectiveFrom} // Disable if EffectiveFrom is not selected
              inputProps={{
                min: userData.EffectiveFrom || undefined, // Minimum value based on EffectiveFrom
              }}
            />

                    <div className='riig'>
                        <Stack spacing={2} direction="row">
                            <Button variant="outlined" onClick={handleClear}  >Clear</Button>
                            <Button variant="contained" onClick={handleSubmit} disabled={isSaveDisabled}  >Save</Button>
                        </Stack>
                    </div>
                </CardContent>
            </Card>
        </Box></div>
    )
}

export default Createtenancyapi