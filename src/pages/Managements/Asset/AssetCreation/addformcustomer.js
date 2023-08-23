import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import {
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import axios from "axios";
import { backEndDomain } from "../../../../service/apiserver";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";

// import { ToastContainer, toast } from "react-toastify";

const Addformcustomer = (props) => {
  let navpage = useNavigate();

  console.log("custDta", props.custData);

  const [username, setUsername] = useState({
    CustomerName: "",
    serialno: "",
    status: "",
    date: "",
    errors: {},
  });

  // const handleClear = () => {
  //   // Clear all of the data in the text fields
  //   setUsername({
  //     CustomerName: "",
  //     serialno: "",
  //     status: "",
  //     date: "",
  //     CustomerNameErr: "",
  //     serialnoErr: "",
  //   });
  // };
  const [useId, setUseId] = useState("");
  console.log("username.date", username.date);

  // const [serial, setSerial] = useState("");

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setUsername({ ...username, [name]: value });

    // const keyVal = index.key;

    if (e.target.name === "CustomerName") {
      const indVal = index.props.id;
      setUseId(indVal);
      console.log("useid", useId);
    } else {
      console.log("no data");
    }

    // if (e.target.name === "CustomerName") {
    //   setUseId(indVal);

    //   // } else if (e.target.name === "EquipmentSerialNo") {
    //   //   setSerial(indVal);
    //   // } else {
    //   console.log("no data");
    // }
  };

  const handleClear = () => {
    setUsername({
      CustomerName: "",
      serialno: "",
      status: "",
      date: "",
      errors: {},
    });
  };

  console.log("useid2", useId);

  // const handleChange = (e,index) => {
  //   console.log(e.target);

  //   const { name, value } = e.target;
  //   let a = {
  //     ...username
  //   }
  //   a[`${name}`] = value
  //   setUsername(a);
  //   const indVal = index.props.id;
  //   const keyVal = index.key
  //   if(e.target.name === "CustomerName"){
  //     setSerial(indVal)
  //   } else if (e.target.name === "EquipmentSerialNo"){
  //     setuseId(indVal)
  //   } else {
  //     console.log("no data")
  //   }

  // };

  const handleChanges = (value) => {
    let a = { ...username };
    a.serialno = value;
    setUsername(a);
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  // const handlenotify = () => {
  //   toast("Wow so easy!");
  // }

  // console.log("username", props.custData.serialno);

  const [customer, setCustomers] = useState([]);

  useEffect(() => {
    try {
      axios({
        method: "get",
        url: `https://${backEndDomain}/masterapi/master/customerlistdropdown`,
        // url: `https://${backEndDomain}/masterapi/master/listcusmap`,
        headers: {
          "Content-type": "application/json",
          token: localStorage.getItem("UserToken"),
        },
      })
        .then(function (response) {
          console.log(response.data.Data);
          setCustomers(response.data.Data);
        })
        .catch(function (response) {
          //   if(response.response.status == 422){
          //  // console.log(response.response.status);
          //   }
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const [cus, setCus] = useState([]);

  useEffect(() => {
    try {
      axios({
        method: "get",
        url: `https://${backEndDomain}/masterapi/master/listequipserial?serialno=1`,
        headers: {
          "Content-type": "application/json",
          token: localStorage.getItem("UserToken"),
        },
      })
        .then(function (response) {
          console.log(response.data.Data);
          setCus(response.data.Data);
        })
        .catch(function (response) {
          //   if(response.response.status == 422){
          //  // console.log(response.response.status);
          //   }
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  //______________________ Validation _________________________

  // const validcusName = () => {
  //   const cusName = /^[a-zA-Z]+[a-zA-Z]+$/;
  //   if (!cusName.test(username.CustomerName)) {
  //     setUsername({
  //       ...username,
  //       CustomerNameErr: "Customer name is valid ",
  //     });
  //   } else {
  //     setUsername({ ...username, CustomerNameErr: "" });
  //   }
  // };

  // const validEquipment = () => {
  //   const equipmentNum = /[a-zA-Z0-9]{8,}$/;
  //   if (!equipmentNum.test(username.serialno)) {
  //     setUsername({ ...username, serialnoErr: '"Serial Number must be 8 "' });
  //   } else {
  //     setUsername({ ...username, serialnoErr: "" });
  //   }
  // };

  let errors = {};
  let isValid = true;

  // const validateEquipmentSerialNo = () => {
  //   const serialNumPattern = /[0-9]{8,}$/;
  //   if (!serialNumPattern.test(equipmentData.EquipmentSerialNo)) {
  //     errors.EquipmentSerialNo = "Serial Number must be 8 digits";
  //   } else {
  //     isValid = false;
  //   }
  //   setEquipmentData((prevState) => ({ ...prevState, errors: errors }));
  //   return isValid;
  // };

  const validatecustomer = () => {
    if (username.CustomerName.trim() === "") {
      errors.CustomerName = "Customer Name is required";
    } else {
      isValid = false;
    }
    setUsername((prevState) => ({ ...prevState, errors: errors }));
    return isValid;
  };

  const validateserial = () => {
    const serialNumPattern = /[a-zA-Z0-9]{8,}$/;
    if (!serialNumPattern.test(username.serialno)) {
      errors.serialno = "Serial Number must be 8 digits";
    } else {
      isValid = false;
    }
    setUsername((prevState) => ({ ...prevState, errors: errors }));
    return isValid;
  };

  const validatedate = () => {
    if (username.date.trim() === "") {
      errors.date = "Date is required";
    } else {
      isValid = false;
    }
    setUsername((prevState) => ({ ...prevState, errors: errors }));
    return isValid;
  };

  const validatestatus = () => {
    if (username.status.trim() === "") {
      errors.status = "Status is required";
    } else {
      isValid = false;
    }
    setUsername((prevState) => ({ ...prevState, errors: errors }));
    return isValid;
  };

  // if (username.serialno.trim() === "") {
  //   errors.serialno = "Serialno is required";
  //   isValid = false;
  // }

  // if (username.date.trim() === "") {
  //   errors.date = "DateofCommit is required";
  //   isValid = false;
  // }

  // if (username.status.trim() === "") {
  //   errors.status = "status is required";
  //   isValid = false;
  // }

  //   setUsername((prevState) => ({
  //     ...prevState,
  //     errors: errors
  //   }));

  //   return isValid;
  // };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    if (props.custData) {
      e.preventDefault();
      console.log("username", username.CustomerName);
      const datasubmit = {
        TenantId: localStorage.getItem("TenantId"),
        cusid: useId ? useId : props.custData.cusid,
        serialno: username.serialno
          ? username.serialno
          : props.custData.serialno,
        date: username.date ? username.date : props.custData.date,
        status: username.status ? username.status : props.custData.status,
        MappingId: props.custData.MappingId,
      }; // create an updated user object with the new user type

      console.log("datasubmit", datasubmit);

      try {
        axios({
          method: "put",
          url: `https://${backEndDomain}/masterapi/master/updatecusmap`,
          data: datasubmit,
          headers: {
            "Content-type": "application/json",
            token: localStorage.getItem("UserToken"),
          },
          // pass the updated user data as the request payload
        })
          .then(function (response) {
            console.log(response);
            navpage("/manageEqcustomer");
            // handle success response
          })
          .catch(function (response) {
            console.log(response);
            // handle error response
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      validatecustomer();
      validateserial();
      validatedate();
      validatestatus();

      if (
        username.CustomerName !== "" &&
        username.serialno !== "" &&
        username.date !== "" &&
        username.status !== ""
      ) {
        // e.preventDefault();
        const datasubmit = {
          // "cusid": username.CustomerId ,
          // "serialno": username.EquipmentSerialNo,
          // "serialno": username.EquipmentSerialNo,
          cusid: username.CustomerId,
          serialno: username.serialno,
          status: username.status,
          date: username.date,
          TenantId: localStorage.getItem("TenantId"),
        };
        console.log("datasubmit", datasubmit);
        try {
          axios({
            method: "post",
            url: `https://${backEndDomain}/masterapi/master/createcusmap`,
            data: datasubmit,
            headers: {
              "Content-type": "application/json",
              token: localStorage.getItem("UserToken"),
            },
          })
            .then(function (response) {
              // toast.success("Data saved successfully", {
              //   position: "top-center",
              //   autoClose: 1000,
              //   hideProgressBar: false,
              //   closeOnClick: true,
              //   pauseOnHover: true,
              //   draggable: true,
              //   progress: undefined,

              //   onClose: () => navpage("/manageEqcustomer"),
              // });
            })
            .catch(function (response) {
              console.log(response.data);
            });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <InputLabel shrink htmlFor="bootstrap-input" className="input">
        Customer
      </InputLabel>
      <Select
        defaultValue={
          username.CustomerName
            ? username.CustomerName
            : props.custData
            ? props.custData.CustomerName
            : ""
        }
        value={
          username.CustomerName
            ? username.CustomerName
            : props.custData
            ? props.custData.CustomerName
            : ""
        }
        name="CustomerName"
        onChange={handleChange}
        onBlur={validatecustomer}
        // disabled={props.custData}
      >
        {customer.map((Data, index) => (
          <MenuItem key={index} id={Data.CustomerId} value={Data.CustomerName}>
            {Data.CustomerName}
          </MenuItem>
        ))}
      </Select>
      {username.errors.CustomerName && (
        <Typography color="error">{username.errors.CustomerName}</Typography>
      )}
      <InputLabel shrink htmlFor="bootstrap-input" className="input">
        Equipment Serial No.
      </InputLabel>
      {/* <Select
                    value={username.EquipmentSerialNo} 
                    name='EquipmentSerialNo'
                    onChange={handleChange}
                   >
                 {cus.map((Data,index) => (
                  <MenuItem   
                  key={index} 
                  value={Data.EquipmentSerialNo}
                  >
                    {Data.EquipmentSerialNo}
                  </MenuItem>

                  ))}

                </Select> */}

      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={cus.map((username) => username.EquipmentSerialNo)}
        
        defaultValue={
          username.serialno
            ? username.serialno
            : props.custData
            ? props.custData.serialno
            : ""
        }
        value={
          username.serialno
            ? username.serialno
            : props.custData
            ? props.custData.serialno
            : ""
        }
        onBlur={validateserial}
        onChange={(e, v) => handleChanges(v)}
        renderInput={(params) => <TextField {...params} />}
      />
      {username.errors.serialno && (
        <Typography color="error">{username.errors.serialno}</Typography>
      )}

      <InputLabel shrink htmlFor="bootstrap-input" className="input">
        Date of Commissioning
      </InputLabel>

      <TextField
        id="outlined-basic"
        variant="outlined"
        size="small"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        // InputProps={{
        //   inputProps: { min: username.date.toString().slice(0, 10) },
        // }}
        name="date"
        defaultValue={
          username.date
            ? username.date
            : props.custData
            ? props.custData.date
            : ""
        }
        value={
          username.date
            ? username.date
            : props.custData
            ? props.custData.date
            : ""
        }
        onBlur={validatedate}
        onChange={handleChange}
        // disabled={props.custData ? (props.custData.date ? false : true) : (username.date ? false : true)}
      />

      {username.errors.date && (
        <Typography color="error">{username.errors.date}</Typography>
      )}
      <InputLabel shrink htmlFor="bootstrap-input" className="input">
        Status
      </InputLabel>
      <Select
        name="status"
        defaultValue={
          username.status
            ? username.status
            : props.custData
            ? props.custData.status
            : ""
        }
        value={
          username.status
            ? username.status
            : props.custData
            ? props.custData.status
            : ""
        }
        onBlur={validatestatus}
        onChange={handleChange}
      >
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
      </Select>
      {username.errors.status && (
        <Typography color="error">{username.errors.status}</Typography>
      )}

      <Box className="cs-btn btn-mrgn-20">
        <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Addformcustomer;
