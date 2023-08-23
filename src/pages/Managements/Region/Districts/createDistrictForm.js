import React, { useState, useEffect, useRef  } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { Card, CardContent, Stack, MenuItem, Grid } from "@mui/material";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Axios from "axios";
import { backEndDomain } from "../../../../service/apiserver";
import Autocomplete from "@mui/material/Autocomplete";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from 'react-router-dom';




const CreateDistrictForm = (props) => {
  console.log("distDta", props.distDta);

  const [age, setAge] = React.useState("");

  const [stateData, setStateData] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [distName, setDistName] = useState("");

  const handleClear = () => {
    setSelectedState("");
    setDistName("");
    setStateData([])
     // Clear the selected state in Autocomplete
  };

  

  const isFormValid = () => {
    return (
     
      selectedState !== null &&
      distName  !== ""
    );
  };


  useEffect(() => {
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

        console.log("stateDataResp", stateDataResp);
        setStateData(stateDataResp);
      });
    } catch (error) { }
  }, []);

  console.log("selectedState", selectedState);
  const navigate = useNavigate();

  const handleSave = () => {

    if (props.distDta) {
      var payload = {
        state: selectedState
          ? selectedState
          : props.distDta.state,
        district: distName ? distName : props.distDta.district,
        districtId: props.distDta.districtId
      };
      console.log("payload", payload);
      try {
        Axios({
          method: "PUT",
          url: `https:${backEndDomain}/masterapi/master/updateDistrict`,
          headers: {
            "Content-type": "application/Json",
            token: localStorage.getItem("UserToken"),
          },
          data: payload,
        }).then(function (response) {
          const nbaData = response.data.message;

          // toast.success("Data Update successfully", {
            
          //   position: "top-center",
          //   autoClose: 1000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,

          //   onClose: () => navigate('/viewdistrict')
          // });

          console.log("nbaData", nbaData);
        });
      } catch (error) { }
    } else {
      if (!props.distDta && !distName) {
        // toast.error("Enter Valid Data");
      }
      var payload = {
        state: selectedState,
        district: distName,
      };
      console.log("payload", payload);
      try {
        Axios({
          method: "POST",
          url: `https:${backEndDomain}/masterapi/master/addDistrict`,
          headers: {
            "Content-type": "application/Json",
            token: localStorage.getItem("UserToken"),
          },
          data: payload,
        }).then(function (response) {
          const nbaData = response.data.message;
         

// toast.success("Data saved successfully", {
            
//                     position: "top-center",
//                     autoClose: 1000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
        
//                     onClose: () => navigate('/viewdistrict')
//                   });

          console.log("nbaData", nbaData);
        });
      } catch (error) { }
    }



  };
 
  const [autocompleteValue, setAutocompleteValue] = useState("");

  return (
    <Card>
      {/* <ToastContainer /> */}
      <CardContent>
        <Box>
          <Autocomplete
            disablePortal
         
            key={stateData}
             
            id="combo-box-demo"
            
            // options={countryList}
            // defaultValue={stateData.StateName}
            defaultValue={props.distDta ? props.distDta.state : ""}
            options={stateData.map((row) => row.StateName)}
            // getOptionLabel={(option) => option.CountryName}
            // getOptionSelected={(option, value) => option.value === props.stateDta.country}
            onChange={(event, value) => {
              setSelectedState(value);
              setAutocompleteValue(value); // Update the Autocomplete value state
            }}
            name="state"
            renderInput={(params) => (
              <TextField {...params} label="State Name" />
            )}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            id="outlined-basic"
            label="District"
            variant="outlined"
            value={distName
              ? distName
              : props.distDta
                ? props.distDta.district
                : ""}
            onChange={(e) => setDistName(e.target.value)}
          />
        </Box>
        <div className='riig'>
        <Stack spacing={2} direction="row" sx={{ marginTop: "10px" }}>
          <Button variant="outlined" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="contained"  onClick={handleSave} disabled={!isFormValid()} >
            Save
          </Button>
  
        </Stack>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateDistrictForm;
