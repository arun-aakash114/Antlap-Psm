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

const AddserviceType = (props) => {
  let navigate = useNavigate();
  const jwt = localStorage.getItem("UserToken");

  const [formserData, setFormserData] = useState({
    desc: "",
    TenantId: "",
  });

  const handleChange = (e) => {
    console.log(e.target);

    const { name, value } = e.target;
    let a = {
      ...formserData,
    };
    a[`${name}`] = value;
    setFormserData(a);
  };

  const handleClear = () => {
    setFormserData("");
   
  };

  const handleratSubmit = async (e) => {
    e.preventDefault();

    if (props.addService) {
      const payload = {
        desc: formserData.desc ? formserData.desc : props.addService.desc,
        id: props.addService.id,
      };
      console.log("payload", payload);
      try {
        axios({
          method: "put",
          url: ` https://${backEndDomain}/masterapi/master/updateservicetype`,
          data: payload,
          headers: {
            "Content-type": "application/json",
            token: localStorage.getItem("UserToken"),
          },
        }).then(function (response) {
          console.log(response.data.Data);
          navigate("/serviceManage");
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      let dataserapply = {
        desc: formserData.desc,
        TenantId: localStorage.getItem("TenantId"),
      };
      console.log("dataserapply", dataserapply);
      try {
        axios({
          method: "POST",
          url: `https://${backEndDomain}/masterapi/master/createservicetype`,
          data: dataserapply,
          headers: {
            "Content-type": "application/json",
            token: jwt,
          },
        })
          .then((response) => {
            console.log("response", response);
            if (!formserData.desc) {
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
    
              //   onClose: () => navigate('/serviceManage')
              // });
            }
          })
          // .catch((response) => toast.warning(response.response.data.message, {
          //   position: "top-center",
          //   autoClose: 1000,
          // }));
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  console.log("props", props);
  return (
    <>
      {/* <ToastContainer /> */}
      <Box>
        <InputLabel shrink htmlFor="bootstrap-input" className="input">
          Service Type
        </InputLabel>
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="large"
          name="desc"
          value={
            formserData.desc
              ? formserData.desc
              : props.addService
              ? props.addService.desc
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
          <Button variant="outlined" size="small" onClick={handleratSubmit}>
            Save
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default AddserviceType;

// .then(function (response) {
//   toast.success(response.data.message, {
//     position: "top-center",

//   });
// })
