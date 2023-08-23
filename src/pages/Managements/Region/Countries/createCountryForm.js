import React, { useState, useEffect } from "react";
import Layout from "../../../../components/layout";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Button from "@mui/material/Button";
import { Card, CardContent, Stack, MenuItem, Grid } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { Table, TableBody, TableHead, TableRow } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Margin } from "@mui/icons-material";
import Axios from "axios";
import { backEndDomain } from "../../../../service/apiserver";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import {   useNavigate, useLocation } from 'react-router-dom';



const CreateCountryForm = (props) => {
  console.log("countryDta", props.countryDta);

  const [countryData, setCountryData] = useState({
    twoDigitCode: "",
    threeDigitCode: "",
    countryName: "",
  });

  const navigate = useNavigate();

  const handleClear = () => {
    // Clear all of the data in the text fields
    setCountryData({
      twoDigitCode: "",
      threeDigitCode: "",
      countryName: "",
    });
  };
  const handleAddCountry = (e) => {
    const { name, value } = e.target;
    setCountryData({ ...countryData, [name]: value });
  };
  const isFormValid = () => {
    const { twoDigitCode, threeDigitCode, countryName } = countryData;
    return twoDigitCode.trim() !== "" && threeDigitCode.trim() !== "" && countryName.trim() !== "";
  };
  // Create Country Post Method
  const handleSave = () => {
    
    if (props.countryDta) {
      const payload = {
        twoDigitCode: countryData.twoDigitCode
          ? countryData.twoDigitCode
          : props.countryDta.twoDigitCode,
        threeDigitCode: countryData.threeDigitCode
          ? countryData.threeDigitCode
          : props.countryDta.threeDigitCode,
        countryName: countryData.countryName
          ? countryData.countryName
          : props.countryDta.countryName,
        countryId: props.countryDta.countryId,
      };
      console.log("payload", payload);
      try {
        Axios({
          method: "PUT",
          url: `https:${backEndDomain}/masterapi/master/updateCountry`,
          headers: {
            "Content-type": "application/Json",
            token: localStorage.getItem("UserToken"),
          },
          data: payload,
        }).then(function (response) {
          const nbaData = response.data;
          // toast.success("Data Update successfully", {
            
          //   position: "top-center",
          //   autoClose: 1000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,

          //   onClose: () => navigate('/viewcountries')
          // });
          

          console.log("nbaData", nbaData);
        });
      } catch (error) {}
    } else {
      if(!countryData.twoDigitCode && !countryData.threeDigitCode && !countryData.countryName) {
        // toast.error("Enter Valid Data");
      } 
      const payload = {
        twoDigitCode: countryData.twoDigitCode,
        threeDigitCode: countryData.threeDigitCode,
        countryName: countryData.countryName,
      };
      console.log("payload", payload);
      try {
        Axios({
          method: "POST",
          url: `https:${backEndDomain}/masterapi/master/addCountry`,
          headers: {
            "Content-type": "application/Json",
            token: localStorage.getItem("UserToken"),
          },
          data: payload,
        }).then(function (response) {
          const nbaData = response.data;

          // toast.success("Data saved successfully", {
            
          //   position: "top-center",
          //   autoClose: 1000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,

          //   onClose: () => navigate('/viewcountries')
          // });
          

          console.log("nbaData", nbaData);
        });
      } catch (error) {}
    }
  };

  console.log("countryData", countryData);

  return (
    <Card>
      {/* <ToastContainer /> */}
      <CardContent>
        <Box>
          <TextField
            id="outlined-basic"
            label="Country Name"
            variant="outlined"
            name="countryName"
            value={
              countryData.countryName
                ? countryData.countryName
                : props.countryDta
                ? props.countryDta.countryName
                : ""
            }
            onChange={handleAddCountry}
          />
        </Box>
        <div className="country_code_create">
          <Box sx={{ mt: 2 }}>
            <TextField
              id="outlined-basic"
              label="II Digit Code"
              variant="outlined"
              name="twoDigitCode"
              inputProps={{ maxLength: 2 }}
              value={
                countryData.twoDigitCode
                  ? countryData.twoDigitCode
                  : props.countryDta
                  ? props.countryDta.twoDigitCode
                  : ""
              }
              onChange={handleAddCountry}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              id="outlined-basic"
              label="III Digit Code"
              variant="outlined"
              name="threeDigitCode"
              inputProps={{ maxLength: 3 }}
              value={
                countryData.threeDigitCode
                  ? countryData.threeDigitCode
                  : props.countryDta
                  ? props.countryDta.threeDigitCode
                  : ""
              }
              onChange={handleAddCountry}
            />
          </Box>
        </div>

        <div className='riig'>
          <Stack spacing={2} direction="row">
            <Button variant="outlined"   onClick={handleClear}  >Clear</Button>
            <Button variant="contained"  onClick={handleSave} disabled={!isFormValid()} >Save</Button>
          </Stack>
        </div>
         
      </CardContent>
    </Card>
  );
};

export default CreateCountryForm;
