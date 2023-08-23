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

const AddratingType = (props) => {
  let navigate = useNavigate()
  const jwt = localStorage.getItem("UserToken");

  const [formratData, setFormratData] = useState({
    desc: "",
    TenantId: "",
  });


  
  
  const handleClear = () => {
    setFormratData("");
   
  };

  const handleChange = (e) => {
    console.log(e.target);

    const { name, value } = e.target;
    let a = {
      ...formratData,
    };
    a[`${name}`] = value;
    setFormratData(a);
  };

  const handleserSubmit = async (e) => {
    e.preventDefault();

    if(props.addRating) {

      const payload = { 
          "desc":(formratData.desc ? formratData.desc : props.addRating.desc),
          "id":props.addRating.id,
         }; 
        console.log("payload", payload)
        try {
          axios({
            method: "put",
            url: ` https://${backEndDomain}/masterapi/master/updateratingtype`,
            data: payload ,
            headers: {
              "Content-type": "application/json",
              token: localStorage.getItem("UserToken"),
            },
          })
            .then(function (response) {
              console.log(response.data.Data);
              navigate ('/ratingManage')
            })
      
        } catch (err) {
          console.log(err);
        }

   } else {

    let dataratapply = {
      "RatingTypeDescription": formratData.desc,
      "TenantId": localStorage.getItem("TenantId"),
    };
    console.log("dataratapply", dataratapply);
    try {
      axios({
        method: "POST",
        url: `https://${backEndDomain}/masterapi/master/createratingtype`,
        data: dataratapply,
        headers: {
          "Content-type": "application/json",
          token: jwt,
        },
      }).then((response) => {
        console.log("response", response);
        if (!formratData.RatingTypeDescription) {
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

          //   onClose: () =>  navigate ('/ratingManage')
          // });
     
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
        Rating Type
        </InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="large"
          name="desc"
          value={formratData.desc ? formratData.desc 
            : (props.addRating ? props.addRating.desc : '')}
          onChange={handleChange}
        />

        <Stack
          spacing={2}
          direction="row"
          sx={{ marginTop: "10px", marginRight: "40px" }}
        >
          <Button variant="outlined" size="small"onClick={handleClear}>
            Clear
          </Button>
          <Button variant="outlined" size="small" onClick={handleserSubmit}>
            Save
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default AddratingType;
