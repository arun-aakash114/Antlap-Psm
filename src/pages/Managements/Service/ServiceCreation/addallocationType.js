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

const AddallocationType = (props) => {
  let navigate = useNavigate();

  const jwt = localStorage.getItem("UserToken");

  const [formallData, setFormallData] = useState({
    description: "",
    TenantId: "",
  });

    
  const handleClear = () => {
    setFormallData("");
   
  };


  const handleChange = (e) => {
    console.log(e.target);

    const { name, value } = e.target;
    let a = {
      ...formallData,
    };
    a[`${name}`] = value;
    setFormallData(a);
  };

  const handleserSubmit = async (e) => {
    e.preventDefault();

    if (props.addAllocation) {
      const payload = {
        description: formallData.description
          ? formallData.description
          : props.addAllocation.description,
        TenantId: localStorage.getItem("TenantId"),
        AllocationTypeId: props.addAllocation.AllocationTypeId,
      };
      console.log("payload", payload);
      try {
        axios({
          method: "put",
          url: ` https://${backEndDomain}/masterapi/master/UpdateAllocationtype`,
          data: payload,
          headers: {
            "Content-type": "application/json",
            token: localStorage.getItem("UserToken"),
          },
        }).then(function (response) {
          console.log(response.data.Data);

          navigate("/allocationManage");
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      let dataallapply = {
        description: formallData.description,
        TenantId: localStorage.getItem("TenantId"),
      };
      console.log("dataallapply", dataallapply);
      try {
        axios({
          method: "POST",
          url: `https://${backEndDomain}/masterapi/master/AddAllocationtype`,
          data: dataallapply,
          headers: {
            "Content-type": "application/json",
            token: jwt,
          },
        })
        .then((response) => {
          console.log("response", response);
          if (!formallData.description) {
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
  
            //   onClose: () => navigate('/allocationManage')
            // });         
           }
        })
        // .catch((response) => toast.warning(response.response.data.message, {
        //   position: "top-center",
        //   autoClose: 1000,
        // }));
      } 
      catch (error) {
        console.log("err");
      }
    }
  };
  console.log("props", props);
  return (
    <>
      {/* <ToastContainer /> */}
      <Box>
        <InputLabel shrink htmlFor="bootstrap-input" className="input">
          Allocation Type
        </InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="large"
          name="description"
          value={
            formallData.description
              ? formallData.description
              : props.addAllocation
              ? props.addAllocation.description
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

export default AddallocationType;
