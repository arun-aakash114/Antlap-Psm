import React from "react";
import { useState } from "react";
import { InputLabel, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import axios from "axios";
import { backEndDomain } from "../../../../service/apiserver";
import { useNavigate } from "react-router-dom";

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";







const AddrequestType = (props) => {
  let navigate = useNavigate();

  

  const jwt = localStorage.getItem("UserToken");

  const [formreqData, setFormreqData] = useState({
    requestType: "",
    TenantId: "",
  });

  
  const handleClear = () => {
    setFormreqData("");
   
  };

  const handleChange = (e) => {
    console.log(e.target);

    const { name, value } = e.target;
    let a = {
      ...formreqData,
    };
    a[`${name}`] = value;
    setFormreqData(a);
  };

  const handleserSubmit = async (e) => {
    e.preventDefault();

    if (props.addRequest) {
      const payload = {
        requestType: formreqData.requestType
          ? formreqData.requestType
          : props.addRequest.requestType,
        requestTypeId: props.addRequest.RequestTypeId,
      };
      console.log("payload", payload);
      try {
        axios({
          method: "put",
          url: ` https://${backEndDomain}/masterapi/master/updateRequestType`,
          data: payload,
          headers: {
            "Content-type": "application/json",
            token: localStorage.getItem("UserToken"),
          },
        }).then(function (response) {
          console.log(response.data.Data);
          navigate("/requestManage");
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      let datareqapply = {
        requestType: formreqData.requestType,
        TenantId: localStorage.getItem("TenantId"),
      };
      console.log("datareqapply", datareqapply);
      try {
        axios({
          method: "POST",
          url: `https://${backEndDomain}/masterapi/master/addrequestType`,
          data: datareqapply,
          headers: {
            "Content-type": "application/json",
            token: jwt,
          },
        })
        .then((response) => {
          console.log("response", response);
          if (!formreqData.requestType) {
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
  
            //   onClose: () => navigate('/requestManage')
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
  console.log("props", props);
  return (
    <>
      {/* <ToastContainer/> */}
              
      <Box>
        <InputLabel shrink htmlFor="bootstrap-input" className="input">
          Request Type
        </InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="large"
          name="requestType"
          value={
            formreqData.requestType
              ? formreqData.requestType
              : props.addRequest
              ? props.addRequest.requestType
              : ""
          }
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
          <Button variant="outlined" size="small" onClick={handleserSubmit}>
            Save
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default AddrequestType;
