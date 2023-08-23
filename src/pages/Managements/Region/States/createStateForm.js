import React, { useState, useEffect, useRef } from "react";
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
import Autocomplete from "@mui/material/Autocomplete";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from 'react-router-dom';

const CreateStateForm = (props) => {
  console.log("stateDta", props.stateDta);
  const [age, setAge] = React.useState("");
  const [countryList, setCountryList] = useState([]);
  const [stateData, setStateData] = useState({
    state: "",
  });


  const handleClear = () => {
    setStateData({ state: "" });
    setSelectedCountry(null); // Clear the selected country value
    setCountryList([]);
  };

  const [selectedCountry, setSelectedCountry] = useState([]);

  console.log("selectedCountry", selectedCountry)
  useEffect(() => {
    try {
      Axios({
        method: "get",
        url: `https:${backEndDomain}/masterapi/master/viewCountry`,
        headers: {
          "Content-type": "application/Json",
          token: localStorage.getItem("UserToken"),
        },
      }).then(function (response) {
        const nbaData = response.data.districtData;

        console.log("nbaData", nbaData);
        setCountryList(nbaData);

      });
    } catch (error) { }
  }, []);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleAddState = (e) => {
    const { name, value } = e.target;
    setStateData({ ...stateData, [name]: value });
  };


  const isFormValid = () => {
    return (
      stateData.state.trim() !== "" &&
      selectedCountry !== null &&
      selectedCountry.CountryName !== ""
    );
  };
  //_____________________Handle Save_________________________
  const navigate = useNavigate();

  const handleSave = () => {

    if (props.stateDta) {
      var payload = {
        state: stateData.state
          ? stateData.state
          : props.stateDta.state,
        country: selectedCountry.CountryName
          ? selectedCountry.CountryName
          : props.stateDta.country,
        stateId: props.stateDta.stateId

      }
      console.log("payload", payload);
      try {
        Axios({
          method: "PUT",
          url: `https:${backEndDomain}/masterapi/master/updateState`,
          headers: {
            "Content-type": "application/Json",
            token: localStorage.getItem("UserToken"),
          },
          data: payload,
        }).then(function (response) {
          const nbaData = response.data.message;

          console.log("nbaData", nbaData);
          // toast(nbaData);

          // toast.success("Data Update successfully", {

          //   position: "top-center",
          //   autoClose: 1000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,

          //   onClose: () => navigate('/viewstates')
          // });
        });
      } catch (error) { }

    } else {
      if (!selectedCountry.CountryName && !stateData.state) {
        // toast.error("Enter Valid Data");
      }
      var payload = {
        state: stateData.state,
        country: selectedCountry,
      };
      console.log("payload", payload);
      try {
        Axios({
          method: "POST",
          url: `https:${backEndDomain}/masterapi/master/addState`,
          headers: {
            "Content-type": "application/Json",
            token: localStorage.getItem("UserToken"),
          },
          data: payload,
        }).then(function (response) {
          const nbaData = response.data.message;
          // toast.success("Data saved successfully", {

          //   position: "top-center",
          //   autoClose: 1000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,

          //   onClose: () => navigate('/viewstates')
          // });

          console.log("nbaData", nbaData);
          // toast(nbaData);
        });
      } catch (error) { }

    }



  };

  return (
    <Card>
      {/* <ToastContainer /> */}
      <CardContent>
        <Box sx={{ mt: 2 }}>


          <Autocomplete

            disablePortal

            key={countryList}
            id="combo-box-demo"
            // options={countryList}
            defaultValue={props.stateDta ? props.stateDta.country : ""}
            // inputValue={selectedCountry.CountryName ? selectedCountry.CountryName : ""}
            options={countryList.map((row) => row.CountryName)}
            // getOptionLabel={(option) => option.CountryName}
            // getOptionSelected={(option, value) => option.value === props.stateDta.country}
            onChange={(event, value) => setSelectedCountry(value)}
            name="country"
            renderInput={(params) => (
              <TextField {...params} label="Country Name" />
            )}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            id="outlined-basic"
            name="state"
            value={stateData.state
              ? stateData.state
              : props.stateDta
                ? props.stateDta.state
                : ""}
            label="State Name"
            variant="outlined"
            onChange={handleAddState}
          />
        </Box>
        <div className='riig'>
          <Stack spacing={2} direction="row" sx={{ marginTop: "10px" }}>
            <Button variant="outlined" onClick={handleClear}  >Clear</Button>
            <Button variant="contained" onClick={handleSave} disabled={!isFormValid()} >
              Save
            </Button>
          </Stack>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateStateForm;
