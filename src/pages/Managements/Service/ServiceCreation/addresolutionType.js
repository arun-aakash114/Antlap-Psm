import React from "react";
import { useState } from "react";
import { InputLabel, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import axios from "axios";
import { backEndDomain } from "../../../../service/apiserver";
import { useNavigate } from 'react-router-dom';

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const AddresolutionType = (props) => {
  let navigate = useNavigate()
  const jwt = localStorage.getItem("UserToken");

  const [formresData, setFormresData] = useState({
    desc: "",
    TenantId: "",
  });


  const handleClear = () => {
    setFormresData("");
   
  };

  const handleChange = (e) => {
    console.log(e.target);

    const { name, value } = e.target;
    let a = {
      ...formresData,
    };
    a[`${name}`] = value;
    setFormresData(a);
  };

  const handleresSubmit = async (e) => {
    e.preventDefault();

    if(props.addResolution) {

      const payload = { 
          "desc":(formresData.desc ? formresData.desc : props.addResolution.desc),
          "id":props.addResolution.id,
         }; 
        console.log("payload", payload)
        try {
          axios({
            method: "put",
            url: ` https://${backEndDomain}/masterapi/master/updateresolution`,
            data: payload ,
            headers: {
              "Content-type": "application/json",
              token: localStorage.getItem("UserToken"),
            },
          })
            .then(function (response) {
              console.log(response.data.Data);
              navigate ('/resolutionManage')
            })
      
        } catch (err) {
          console.log(err);
        }

   } else {

    let dataresapply = {
      "desc": formresData.desc,
      "TenantId": localStorage.getItem("TenantId"),
    };
    console.log("dataresapply", dataresapply);
    try {
      axios({
        method: "POST",
        url: `https://${backEndDomain}/masterapi/master/createresolution`,
        data: dataresapply,
        headers: {
          "Content-type": "application/json",
          token: jwt,
        },
      }) .then((response) => {
        console.log("response", response);
        if (!formresData.desc) {
          // toast.error(response.data.message, {
          //   position: "top-center",
          //   autoClose: 1000,
          // });
        } else 
        {
          // toast.success("Data saved successfully", {
            
          //   position: "top-center",
          //   autoClose: 1000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,

          //   onClose: () => navigate('/resolutionManage')
          // })
        }
      })
      // .catch((response) => toast.warning(response.response.data.message, {
      //   position: "top-center",
      //   autoClose: 1000,
      // }));
    } catch (error) {
      console.log(error);
    }
  }
  };
  return (
    <>
          {/* <ToastContainer /> */}
      <Box>
        <InputLabel shrink htmlFor="bootstrap-input" className="input">
        Resolution Status
        </InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="large"
          name="desc"
          value={formresData.desc ? formresData.desc 
            : (props.addResolution ? props.addResolution.desc : '')}
          onChange={handleChange}
        />

        <Stack
          spacing={2}
          direction="row"
          sx={{ marginTop: "10px", marginRight: "40px" }}
        >
          <Button variant="outlined" size="small" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="outlined" size="small" onClick={handleresSubmit}>
            Save
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default AddresolutionType;
