import React from "react";
import { useState, useEffect } from "react";
import { Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Axios from "axios";
import { backEndDomain } from "../../../../service/apiserver";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AddEquipForm = (props) => {
  let navigate = useNavigate();
  console.log("Equip Data", props.equipData);

  const [equipmentData, setEquipmentData] = useState({
    EquipmentSerialNo: "",
    EquipmentMake: "",
    EquipmentDescription: "",
    EquipmentPurchaseDate: "",
    DateOfCommissioning: "",
    EquipmentModel: "",
    EquipmentPrefix: "",
    EquipStatus: "",
    errors: {},
  });

  const handleClears = () => {
    setEquipmentData({
      EquipmentSerialNo: "",
      EquipmentMake: "",
      EquipmentDescription: "",
      EquipmentPurchaseDate: "",
      DateOfCommissioning: "",
      EquipmentModel: "",
      EquipmentPrefix: "",
      EquipStatus: "",
      errors: {},
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipmentData({ ...equipmentData, [name]: value });
  };

  console.log("equipmentData", equipmentData);

  //__________________Make Equipment GET API____________________

  const [customer, setCustomers] = useState([]);

  useEffect(() => {
    try {
      Axios({
        method: "get",
        url: `https://${backEndDomain}/masterapi/master/listmakemaster`,
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

  //______________________ Validation _________________________

  // const validateSerialNum = () => {
  //     const serialNumPattern = /[a-zA-Z0-9]{8,}$/;
  //     if (!serialNumPattern.test(equipmentData.EquipmentSerialNo)) {
  //     setEquipmentData({ ...equipmentData, SerialNumError: '"Serial Number must be 8 "' });
  //     } else {
  //         setEquipmentData({ ...equipmentData, SerialNumError: '' });
  //     }
  // };

  let errors = {};
  let isValid = true;

  const validateEquipmentSerialNo = () => {
    const serialNumPattern = /[0-9]{8,}$/;
    if (!serialNumPattern.test(equipmentData.EquipmentSerialNo)) {
      errors.EquipmentSerialNo = "Serial Number must be 8 digits";
    } else {
      isValid = false;
    }
    setEquipmentData((prevState) => ({ ...prevState, errors: errors }));
    return isValid;
  };

  const validateEquipmentMake = () => {
    if (equipmentData.EquipmentMake.trim() === "") {
      errors.EquipmentMake = "EquipmentMake is required";
    } else {
      isValid = false;
    }
    setEquipmentData((prevState) => ({ ...prevState, errors: errors }));
    return isValid;
  };

  // const validateEquipmentDescription = () => {
  //   const descNumPattern = /[^a-zA-Z0-9]/;
  //   if (!descNumPattern.test(equipmentData.EquipmentDescription)) {
  //     errors.EquipmentDescription = "Description must be alpha numeric.";
  //   } else {
  //     isValid = false;
  //   }
  //   setEquipmentData((prevState) => ({ ...prevState, errors: errors }));
  //   return isValid;
  // };

  const validateEquipmentDescription = () => {
    const alphanumericPattern = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]+$/;
    if (!alphanumericPattern.test(equipmentData.EquipmentDescription)) {
      errors.EquipmentDescription = "Description must be alpha numeric.";
      setEquipmentData((prevState) => ({ ...prevState, errors: errors }));
    } else {
      isValid = false;
    }
    return isValid;
  };

  const validateEquipmentPurchaseDate = () => {
    if (equipmentData.EquipmentPurchaseDate.trim() === "") {
      errors.EquipmentPurchaseDate = "EquipmentPurchaseDate is required";
    } else {
      isValid = false;
    }
    setEquipmentData((prevState) => ({ ...prevState, errors: errors }));
    return isValid;
  };

  const validateDateOfCommissioning = () => {
    if (equipmentData.DateOfCommissioning.trim() === "") {
      errors.DateOfCommissioning = "DateOfCommissioning is required";
    } else {
      isValid = false;
    }
    setEquipmentData((prevState) => ({ ...prevState, errors: errors }));
    return isValid;
  };

  const validateEquipmentModel = () => {
    const modelNumPattern = /[0-9]$/;
    if (!modelNumPattern.test(equipmentData.EquipmentModel)) {
      errors.EquipmentModel = "EquipmentModel is required";
    } else {
      isValid = false;
    }
    setEquipmentData((prevState) => ({ ...prevState, errors: errors }));
    return isValid;
  };

  const validateEquipmentPrefix = () => {
    const alphanumericPatternprefix = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]+$/;
    if (!alphanumericPatternprefix.test(equipmentData.EquipmentPrefix)) {
      errors.EquipmentPrefix = "Prefix must be alpha numeric.";
      setEquipmentData((prevState) => ({ ...prevState, errors: errors }));
    } else {
      isValid = false;
    }
    return isValid;
  };

  // const validateEquipmentPrefix = () => {
  //   const alphanumericPatternprefix = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]+$/;
  //   if (alphanumericPatternprefix.test(equipmentData.EquipmentPrefix)) {
  //     errors.EquipmentPrefix = "EquipmentPrefix is required";
  //   } else {
  //     isValid = false;
  //   }
  //   setEquipmentData((prevState) => ({ ...prevState, errors: errors }));
  //   return isValid;
  // };

  //_________________________ Post Equipment ______________________

  const handleSave = () => {
    if (props.equipData) {
      console.log("equipData", props);
      const payload = {
        EquipmentSerialNo: equipmentData.EquipmentSerialNo
          ? equipmentData.EquipmentSerialNo
          : props.equipData.EquipmentSerialNo,
        EquipmentDescription: equipmentData.EquipmentDescription
          ? equipmentData.EquipmentDescription
          : props.equipData.EquipmentDescription,
        EquipmentPrefix: equipmentData.EquipmentPrefix
          ? equipmentData.EquipmentPrefix
          : props.equipData.EquipmentPrefix,
        EquipmentModel: equipmentData.EquipmentModel
          ? equipmentData.EquipmentModel
          : props.equipData.EquipmentModel,
        EquipmentMake: equipmentData.EquipmentMake
          ? equipmentData.EquipmentMake
          : props.equipData.EquipmentMake,
        EquipmentPurchaseDate: equipmentData.EquipmentPurchaseDate
          ? equipmentData.EquipmentPurchaseDate
          : props.equipData.EquipmentPurchaseDate,
        TenantId: localStorage.getItem("TenantId"),
        DateOfCommissioning: equipmentData.DateOfCommissioning
          ? equipmentData.DateOfCommissioning
          : props.equipData.DateOfCommissioning,
      };

      // create an updated user object with the new user type

      console.log("payload", payload);
      try {
        Axios({
          method: "put",
          url: ` https://${backEndDomain}/masterapi/master/updateequipmentmaster`,
          data: payload,
          headers: {
            "Content-type": "application/json",
            token: localStorage.getItem("UserToken"),
          },
        })
          .then(function (response) {
            console.log(response.data.Data);
            navigate("/manageequips");
          })
          .catch(function (response) {
            //   if(response.response.status == 422){
            //  // console.log(response.response.status);
            //   }
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      validateEquipmentSerialNo();
      validateEquipmentMake();
      validateEquipmentDescription();
      validateEquipmentPurchaseDate();
      validateDateOfCommissioning();
      validateEquipmentModel();
      validateEquipmentPrefix();

      if (
        equipmentData.EquipmentSerialNo !== "" &&
        equipmentData.EquipmentMake !== "" &&
        equipmentData.EquipmentDescription !== "" &&
        equipmentData.EquipmentPurchaseDate !== "" &&
        equipmentData.DateOfCommissioning !== "" &&
        equipmentData.EquipmentModel !== "" &&
        equipmentData.EquipmentPrefix !== ""
      ) {
        const payload = {
          EquipmentSerialNo: equipmentData.EquipmentSerialNo,
          EquipmentDescription: equipmentData.EquipmentDescription,
          EquipmentPrefix: equipmentData.EquipmentPrefix,
          EquipmentModel: equipmentData.EquipmentModel,
          EquipmentMake: equipmentData.EquipmentMake,
          EquipmentPurchaseDate: equipmentData.EquipmentPurchaseDate,
          TenantId: localStorage.getItem("TenantId"),
          DateOfCommissioning: equipmentData.DateOfCommissioning,
        };

        // create an updated user object with the new user type

        console.log("payload", payload);
        try {
          Axios({
            method: "post",
            url: ` https://${backEndDomain}/masterapi/master/create`,
            data: payload,
            headers: {
              "Content-type": "application/json",
              token: localStorage.getItem("UserToken"),
            },
          })
            .then(function (response)   {
              // toast.success("Data saved successfully", {
            
              //   position: "top-center",
              //   autoClose: 1000,
              //   hideProgressBar: false,
              //   closeOnClick: true,
              //   pauseOnHover: true,
              //   draggable: true,
              //   progress: undefined,
    
              //   onClose: () => navigate('/manageequips')
              // });
            })
            .catch(function (response) {
              //   if(response.response.status == 422){
              //  // console.log(response.response.status);
              //   }
            });
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return (
    <>
     {/* <ToastContainer /> */}
      <Box className="addEqipForm">
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <InputLabel className="input">Serial Number</InputLabel>
            <Item>
              <TextField
                placeholder="Type Here"
                variant="outlined"
                size="small"
                type="text"
                name="EquipmentSerialNo"
                value={
                  equipmentData.EquipmentSerialNo
                    ? equipmentData.EquipmentSerialNo
                    : props.equipData
                    ? props.equipData.EquipmentSerialNo
                    : ""
                }
                onChange={handleChange}
                onBlur={validateEquipmentSerialNo}
                disabled={props.equipData}
              />
            </Item>
            {equipmentData.errors.EquipmentSerialNo && (
              <Typography color="error">
                {equipmentData.errors.EquipmentSerialNo}
              </Typography>
            )}
          </Grid>

          <Grid item xs={6} md={6}>
            <InputLabel className="input">Equipment Make</InputLabel>
            <Item>
              <Select
                defaultValue={
                  equipmentData.EquipmentMake
                    ? equipmentData.EquipmentMake
                    : props.equipData
                    ? props.equipData.EquipmentMake
                    : ""
                }
                value={
                  equipmentData.EquipmentMake
                    ? equipmentData.EquipmentMake
                    : props.equipData
                    ? props.equipData.EquipmentMake
                    : ""
                }
                name="EquipmentMake"
                size="small"
                onChange={handleChange}
                onBlur={validateEquipmentMake}
                // disabled={props.custData}
              >
                {customer.map((Data, index) => (
                  <MenuItem key={index} value={Data.EquipmentMake}>
                    {Data.EquipmentMake}
                  </MenuItem>
                ))}
              </Select>
              {/* <TextField
                placeholder="Type Here"
                variant="outlined"
                size="small"
                name="EquipmentMake"
                value={
                  equipmentData.EquipmentMake
                    ? equipmentData.EquipmentMake
                    : props.equipData
                    ? props.equipData.EquipmentMake
                    : ""
                }
                onChange={handleChange}
                onBlur={validateEquipmentMake}
              /> */}
              {equipmentData.errors.EquipmentMake && (
                <Typography color="error">
                  {equipmentData.errors.EquipmentMake}
                </Typography>
              )}
            </Item>
          </Grid>

          <Grid item xs={12} md={12}>
            <InputLabel className="input">Equipment Description</InputLabel>
            <Item>
              <TextField
                placeholder="Type Here"
                variant="outlined"
                size="small"
                name="EquipmentDescription"
                value={
                  equipmentData.EquipmentDescription
                    ? equipmentData.EquipmentDescription
                    : props.equipData
                    ? props.equipData.EquipmentDescription
                    : ""
                }
                onChange={handleChange}
                onBlur={validateEquipmentDescription}
              />
              {equipmentData.errors.EquipmentDescription && (
                <Typography color="error">
                  {equipmentData.errors.EquipmentDescription}
                </Typography>
              )}
            </Item>
          </Grid>

          <Grid item xs={6} md={6}>
            <InputLabel className="input">Model</InputLabel>
            <Item>
              <TextField
                placeholder="Type Here"
                variant="outlined"
                size="small"
                name="EquipmentModel"
                value={
                  equipmentData.EquipmentModel
                    ? equipmentData.EquipmentModel
                    : props.equipData
                    ? props.equipData.EquipmentModel
                    : ""
                }
                onChange={handleChange}
                onBlur={validateEquipmentModel}
              />
              {equipmentData.errors.EquipmentModel && (
                <Typography color="error">
                  {equipmentData.errors.EquipmentModel}
                </Typography>
              )}
            </Item>
          </Grid>

          <Grid item xs={6} md={6}>
            <InputLabel className="input">Prefix</InputLabel>
            <Item>
              <TextField
                placeholder="Type Here"
                variant="outlined"
                size="small"
                name="EquipmentPrefix"
                value={
                  equipmentData.EquipmentPrefix
                    ? equipmentData.EquipmentPrefix
                    : props.equipData
                    ? props.equipData.EquipmentPrefix
                    : ""
                }
                onChange={handleChange}
                onBlur={validateEquipmentPrefix}
              />
              {equipmentData.errors.EquipmentPrefix && (
                <Typography color="error">
                  {equipmentData.errors.EquipmentPrefix}
                </Typography>
              )}
            </Item>
          </Grid>

          <Grid item xs={6} md={6}>
            <InputLabel className="input">Purchase Date</InputLabel>
            <Item>
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                name="EquipmentPurchaseDate"
                // defaultValue={
                //   equipmentData.EquipmentPurchaseDate
                //   ? equipmentData.EquipmentPurchaseDate
                //   : props.equipData
                //   ? props.equipData.EquipmentPurchaseDate
                //   : ""
                // }

                value={
                  equipmentData.EquipmentPurchaseDate
                    ? equipmentData.EquipmentPurchaseDate
                    : props.equipData
                    ? props.equipData.EquipmentPurchaseDate
                    : ""
                }
                onChange={handleChange}
                onBlur={validateEquipmentPurchaseDate}
                // disabled={props.custData ? (props.custData.date ? false : true) : (username.date ? false : true)}
              />
              {/* <TextField
                placeholder="Type Here"
                variant="outlined"
                size="small"
                type="date"
                name="EquipmentPurchaseDate"
                defaultValue={
                  equipmentData.EquipmentPurchaseDate
                    ? equipmentData.EquipmentPurchaseDate
                    : props.equipData
                    ? props.equipData.EquipmentPurchaseDate
                    : ""
                }
                value={
                  equipmentData.EquipmentPurchaseDate
                    ? equipmentData.EquipmentPurchaseDate
                    : props.equipData
                    ? props.equipData.EquipmentPurchaseDate
                    : ""
                }
                onChange={handleChange}
                onBlur={validateEquipmentPurchaseDate}
              /> */}
              {equipmentData.errors.EquipmentPurchaseDate && (
                <Typography color="error">
                  {equipmentData.errors.EquipmentPurchaseDate}
                </Typography>
              )}
            </Item>
          </Grid>

          <Grid item xs={6} md={6}>
            <InputLabel className="input">Commissioning Date</InputLabel>
            <Item>
              <TextField
                placeholder="Type Here"
                variant="outlined"
                size="small"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: {
                    min: equipmentData.EquipmentPurchaseDate.toString().slice(
                      0,
                      10
                    ),
                  },
                }}
                // InputProps={{
                //   endAdornment: <InputAdornment position="end"><CalendarMonthIcon/></InputAdornment>,
                // }}
                name="DateOfCommissioning"
                defaultValue={
                  equipmentData.DateOfCommissioning
                    ? equipmentData.DateOfCommissioning
                    : props.equipData
                    ? props.equipData.DateOfCommissioning
                    : ""
                }
                value={
                  equipmentData.DateOfCommissioning
                    ? equipmentData.DateOfCommissioning
                    : props.equipData
                    ? props.equipData.DateOfCommissioning
                    : ""
                }
                onChange={handleChange}
                onBlur={validateDateOfCommissioning}
                // disabled={props.equipData ? (props.equipData.EquipmentPurchaseDate ? false : true) : (equipmentData.EquipmentPurchaseDate ? false : true)}
              />
              {equipmentData.errors.DateOfCommissioning && (
                <Typography color="error">
                  {equipmentData.errors.DateOfCommissioning}
                </Typography>
              )}
            </Item>
          </Grid>
        </Grid>
        <Box className="cs-btn btn-mrgn-20">
          <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={handleClears}>
              Clear
            </Button>
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default AddEquipForm;

// <TextField
// id="outlined-basic"
// variant="outlined"
// size="small"
// type="date"
// InputProps={{
//   inputProps: { min: username.date.toString().slice(0, 10) },
// }}
// name="date"
// defaultValue={
//   username.date
//     ? username.date
//     : props.custData
//     ? props.custData.date
//     : ""
// }
// value={
//   username.date
//     ? username.date
//     : props.custData
//     ? props.custData.date
//     : ""
// }
// onBlur={validatedate}
// onChange={handleChange}
// // disabled={props.custData ? (props.custData.date ? false : true) : (username.date ? false : true)}
// />
