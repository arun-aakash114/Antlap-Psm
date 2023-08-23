import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { Card, CardContent, Stack, MenuItem, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Axios from "axios";
import { backEndDomain } from "../../../../service/apiserver";
import Autocomplete from "@mui/material/Autocomplete";
import { useLocation } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateCityForm = () => {
  const { state } = useLocation();
  const [age, setAge] = React.useState("");
  const [country, setCountry] = useState([]);
  const [stateInp, setStateInp] = useState([]);
  const [district, setDistrict] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(" ");
  const [city, setCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedStateVal, setSelectedStateVal] = useState(" ");
  const [zipCode, setZipCode] = useState("");
  const [selectedDist, setSelectedDist] = useState();

  console.log("stateFrmView", state);
  console.log("selectedState", selectedState);

  // __________________________ Get Country __________________________

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
        console.log("country", nbaData);
        setCountry(nbaData);
      });
    } catch (error) { }
  }, []);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  console.log("selectedCountry", selectedCountry);
  console.log(typeof selectedCountry);

  useEffect(() => {
    // Check if any required field is empty
    const isAnyFieldEmpty = !selectedCountry || !selectedState || !selectedDist || !zipCode || !city;
    setIsSaveDisabled(isAnyFieldEmpty);
  }, [selectedCountry, selectedState, selectedDist, zipCode, city]);

  // __________________________ Get States __________________________

  const handleState = (selCountry) => {
    try {
      Axios({
        method: "get",
        url: `https:${backEndDomain}/masterapi/master/viewState`,
        headers: {
          "Content-type": "application/Json",
          token: localStorage.getItem("UserToken"),
        },
      }).then(function (response) {
        const stateDataResp = response.data.districtData;
        const selectedStateResp = stateDataResp.filter(
          (items) => items.CountryName === selCountry
        );
        console.log("selectedState", selectedStateResp);
        setStateInp(selectedStateResp);
      });
    } catch (error) { }
  };

  // __________________________ Get District __________________________

  const handleDist = (selState) => {
    try {
      Axios({
        method: "get",
        url: `https:${backEndDomain}/masterapi/master/viewDistrict`,
        headers: {
          "Content-type": "application/Json",
          token: localStorage.getItem("UserToken"),
        },
      }).then(function (response) {
        const distDataResp = response.data.arr;
        const selectedDistResp = distDataResp.filter(
          (items) => items.stateName === selState
        );
        console.log("distDataResp", selectedDistResp);
        setDistrict(selectedDistResp);
      });
    } catch (error) { }
  };

  const handleClear = () => {
    setSelectedCountry("");
    setSelectedState("");
    setSelectedStateVal("");
    setZipCode("");
    setCity("");
    setSelectedDist("");
    setStateInp([])
    setDistrict([]);
    setCountry([]);
  };

  const handleClearAutocomplete = () => {
    // setCountry([]);
    setStateInp([]);
    setDistrict([]);
    setSelectedState("");
    setSelectedDist("");
  };

  // Create Country Post Method
  const navigate = useNavigate();

  const handleSave = () => {
    if (state) {
      const payload = {
        country: selectedCountry ? selectedCountry : state.country,
        state: selectedState ? selectedState : state.state,
        district: selectedDist ? selectedDist : state.district,
        ZipCode: zipCode ? zipCode : state.ZipCode,
        cityName: city ? city : state.cityName,
        CityId: state.CityId,
      };
      console.log("payload", payload);
      try {
        Axios({
          method: "PUT",
          url: `https:${backEndDomain}/masterapi/master/updateCity`,
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

          //   onClose: () => navigate("/viewcities"),
          // });
          console.log("nbaData", nbaData);
        });
      } catch (error) { }
    } else {
      if (
        !selectedCountry &&
        !selectedState &&
        !selectedDist &&
        !zipCode &&
        !city
      ) {
        // toast.error("Enter Valid Data");
      }
      const payload = {
        country: selectedCountry,
        stateInp: selectedState,
        district: selectedDist,
        ZipCode: zipCode,
        cityName: city,
      };
      console.log("payload", payload);
      try {
        Axios({
          method: "POST",
          url: `https:${backEndDomain}/masterapi/master/addCity`,
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

          //   onClose: () => navigate("/viewcities"),
          // });

          console.log("nbaData", nbaData);
        });
      } catch (error) { }
    }
  };

  // useEffect(() => {
  //     try {
  //       Axios({
  //         method: "get",
  //         url: `https:${backEndDomain}/masterapi/master/viewDistrict`,
  //         headers: {
  //           "Content-type": "application/Json",
  //           token: localStorage.getItem("UserToken"),
  //         },
  //       }).then(function (response) {
  //         const distDataResp = response.data.arr;
  //         console.log("district", distDataResp);
  //       });
  //     } catch (error) {}
  //   }, []);

  // console.log("state", state)

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Card>
      {/* <ToastContainer /> */}
      <CardContent>
        <Box>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            key={country}
            defaultValue={state ? state.country : ""}
            options={country.map((row) => row.CountryName)}
            onChange={(event, value) => {
              console.log("onChange", value);
              if (value === null) {
                handleClearAutocomplete();
                console.log("handleClearAutocomplete");
              } else {
                setSelectedCountry(value);
                handleState(value);
                setDistrict([]);
              }
            }}
            name="stateInp"
            renderInput={(params) => <TextField {...params} label="Country" />}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            key={stateInp}
            // inputValue={selectedState}
            defaultValue={state ? state.state : ""}
            options={stateInp.map((row) => row.StateName)}
            onChange={(event, value) => {
              setSelectedState(value);
              handleDist(value);
            }}
            name="state"
            renderInput={(params) => <TextField {...params} label="State" />}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            key={district}
            // inputValue={selectedDist}
            defaultValue={state ? state.district : ""}
            options={district.map((row) => row.DistrictName)}
            onChange={(event, value) => setSelectedDist(value)}
            name="state"
            renderInput={(params) => <TextField {...params} label="District" />}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-label">City Name</InputLabel>
          <TextField
            variant="outlined"
            name="City"
            value={city ? city : state ? state.cityName : ""}
            onChange={(e) => setCity(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <InputLabel id="demo-simple-select-label">Zip Code</InputLabel>
          <TextField
            variant="outlined"
            name="zipCode"
            value={zipCode ? zipCode : state ? state.ZipCode : ""}
            onChange={(e) => setZipCode(e.target.value)}
            onKeyPress={(event) => {
              if (!/\d/.test(event.key)) {
                event.preventDefault();
              }
            }}
            inputProps={{
              maxLength: 6,
            }}
          />


        </Box>
        {/* <Box sx={{mt:2}}>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    </Box> */}


        <div className='riig'>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={handleClear}  >Clear</Button>
            <Button variant="contained" onClick={handleSave} disabled={isSaveDisabled} >Save</Button>
          </Stack>
        </div>

      </CardContent>
    </Card>
  );
};

export default CreateCityForm;
