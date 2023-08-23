import React, { useState, useEffect } from "react";
import Layout from "../../../../components/layout";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {
  CardContent,
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell from "@mui/material/TableCell";
import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import { alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Card from "@mui/material/Card";
import Select from "@mui/material/Select";
import axios from 'axios';
import { backEndDomain } from '../../../../service/apiserver';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';





  
const options = ['Option 1', 'Option 2'];

const Fromcustomercreate = () => {

  const [stateList, setStateList]=useState([]);
  const [cityList, setCityList]=useState([]);
  const [countryList, setCountryList] = useState([]);
  const [switchValue, setSwitchValue] = useState(true);
  const [switchInp, setSwitchInp] = useState();
  const [companyName, setCompanyName] = useState("")
  const [address, setAddress] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState("")
  const [selectedStateId, setSelectedStateId] = useState("")
  const [selectedCityId, setSelectedCityId] = useState("")
  const [selectedZip, setSelectedZip] = useState("");

  const [finalCountryId, setFinalCountryId] = useState("");
  const [finalStateId, setFinalStateId] = useState(0);
  const [finalCityId, setFinalCityId] = useState("");

  console.log("newvalue", selectedCountryId )

  useEffect(() => {
    if(switchValue === true){
      setSwitchInp("Active")
    } else {
      setSwitchInp("In Active")
    }
  })
  

  console.log("companyName", companyName)
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
      }));

    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        "label + &": {
          marginTop: theme.spacing(3),
        },
        "& .MuiInputBase-input": {
          borderRadius: 4,
          position: "relative",
          backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
          border: "1px solid #ced4da",
          fontSize: 16,
          width: "auto",
          padding: "10px 12px",
          transition: theme.transitions.create([
            "border-color",
            "background-color",
            "box-shadow",
          ]),
          // Use the system font instead of the default Roboto font.
          fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(","),
          "&:focus": {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
          },
        },
      }));
  
      const label = { inputProps: { "aria-label": "Switch demo" } };
  
      const [age, setAge] = React.useState("");

// Get Country list

useEffect(() => {
 
  try {
    axios({
      method: 'get',
      url: `https://${backEndDomain}/masterapi/master/viewCountry`,
      headers: {
        'Content-type': 'application/json',
        'token': localStorage.getItem('UserToken'),
      }
    })
      .then(function (response) {
        console.log("country", response.data.districtData)
        setCountryList(response.data.districtData)
      }).catch(function (response) {
        //   if(response.response.status == 422){
        //  // console.log(response.response.status);
        //   }
      });
  } catch (err) {
    console.log(err);

  }

}, [])   



// Get State list

useEffect(() => {
 
  try {
    axios({
      method: 'get',
      url: `https://${backEndDomain}/masterapi/master/viewState`,
      headers: {
        'Content-type': 'application/json',
        'token': localStorage.getItem('UserToken'),
      }
    })
      .then(function (response) {
        console.log("State", response.data.districtData)
        setStateList(response.data.districtData)
      }).catch(function (response) {
        //   if(response.response.status == 422){
        //  // console.log(response.response.status);
        //   }
      });
  } catch (err) {
    console.log(err);

  }

}, [])

// Get City list

useEffect(() => {
 
  try {
    axios({
      method: 'get',
      url: `https://${backEndDomain}/masterapi/master/viewcity`,
      headers: {
        'Content-type': 'application/json',
        'token': localStorage.getItem('UserToken'),
      }
    })
      .then(function (response) {
        console.log("City view", response.data.cityData)
        setCityList(response.data.cityData)
      }).catch(function (response) {
        //   if(response.response.status == 422){
        //  // console.log(response.response.status);
        //   }
      });
  } catch (err) {
    console.log(err);

  }

}, [])

//  handleSubmit

const handleSubmit = () => {


    const payload = {
      "CompanyName": companyName,
      "password": "iKR6%@R3$dN5",
      "Address": address,
      "StateId": finalStateId,
      "CityId": finalCityId,
      "CountryID": finalCountryId,
      "status": switchInp,
      "zipcode": availableZipCode.length > 0 ? availableZipCode[0].ZipCode : ""
    }

    console.log("payload", payload)
    
    try {
      axios({
        method: 'post',
        url: `https://${backEndDomain}/masterapi/master/createcustomer`,
        data: payload ,
        headers: {
          'Content-type': 'application/json',
          'token': localStorage.getItem('UserToken'),
        }
      })
        .then(function (response) {
          // console.log("City view", response.data.cityData)
          // setCityList(response.data.cityData)
        }).catch(function (response) {
          //   if(response.response.status == 422){
          //  // console.log(response.response.status);
          //   }
        });
    } catch (err) {
      console.log(err);
  
    }

}



const [selectedCountry, setSelectedCountry] = React.useState();
  const [selectedState, setSelectedState] = React.useState();
  const [selectedCity, setSelectedCity] = React.useState();

  const [defCountry, setDefCountry] = React.useState("");
  const [countryValue, setCountryValue] = React.useState("");
  const [stateValue, setStateValue] = React.useState("");
  const [cityValue, setCityValue] = React.useState("");
console.log("countryValue", countryValue)


// State & City Filter
const availableCountry = countryList.filter((cntry) => cntry.CountryName === countryValue);
console.log("availableCountry", availableCountry)




if(availableCountry.length === 0){
  var availableState = []
  
} else {
  availableState = stateList.filter((c) => c.Countries_M_CountryId === availableCountry[0].CountryId);
  
}


  
  

console.log("availableState 123", availableState)

if(availableState.length === 0){
  var availableCity = [];
  
} else {
  availableCity = availableState.filter((cityFil) => cityFil.StateName === stateValue);
console.log("availableCity", availableCity.map((cm) => cm.StateId))  
}

 
// var lnth = Object.keys(availableCity).length
// console.log("test", lnth)
console.log("citylistasdas", !stateValue )

if(!stateValue){
  console.log("no value")
} else {
  console.log("Avail City", availableCity)
}


if (!stateValue) {
 var availableCities = []
} else {
  
  const lnth = availableCity.map((cm) => cm.StateId);
  console.log("availableCity inner", lnth[0])
  availableCities = cityList.filter((s) => s.States_M_StateId === lnth[0]);
  // setFinalStateId(lnth[0])
  console.log("availableCities new", availableCities)
}

console.log("SelectedCityId", selectedCityId)

// Find City Id

const availablecityId = availableCities.filter((citId) => citId.Locality === cityValue);
console.log("availableCityId", availablecityId)

if (!cityValue) {
  var availableZipCode = []
 } else {
   
  const citlnth = availablecityId.map((citZip) => citZip.CityId);
  availableZipCode = availableCities.filter((zip) => zip.CityId === citlnth[0]);
  // setFinalCityId(citlnth[0])
   console.log("availableCities zip", availableZipCode)
 }

  // const  availableCities = cityList.filter(
  //   (s) => s.States_M_StateId === availableCity[0].StateId
  // );

  useEffect(() => {
    if(!countryValue){
      setFinalCountryId("");
    } else {
      setFinalCountryId(availableCountry[0].CountryId);
      console.log("finalCountryId", finalCountryId)
    }

    if(!stateValue){ 
      setFinalStateId("test");
    } else {
      var lnthNew = availableCity.map((cm) => cm.StateId);
      var lnthNew1 = lnthNew[0]
      setFinalStateId(lnthNew1);
      console.log("finalStateId final", finalStateId)
      
    };
    
    if(!cityValue){
      setFinalCityId("");
    } else {
      var citlnthnew = availablecityId.map((citZip) => citZip.CityId);
      var citlnthnew1 = citlnthnew[0]
      setFinalCityId(citlnthnew1);
      console.log("finalCityId", citlnthnew)
    }
  })

  
  console.log("finalStateId final2", finalStateId)
  console.log("finalCityId2", finalCityId)

// var availableCities = []
// if(stateValue === null){
//   console.log('data not available')
// } else if (availableCity.length === 0){
//   //   availableCities = cityList.filter(
//   //   (s) => s.States_M_StateId === availableCity[0].StateId
//   // );
//   console.log('data available')
// } else {
//   console.log("no data")
// }

console.log("citylist", selectedStateId)
  
  // console.log("availableCities", availableCities)

  console.log("inputValue", availableState[0])
  const handleChangeselect = (event) => {
    setDefCountry(event.target.value);
  };
 
 
  const [inputValue, setInputValue] = React.useState('');

  console.log("defCountry", cityValue)

  // Find Unique City
  // const uniqueCity = [];
  // availableCities.map(x => uniqueCity.filter(a => a.DistrictName == x.DistrictName).length > 0 ? null : uniqueCity.push(x));
  // console.log("uniqueCity", uniqueCity)
  
  // const availableZipCode = uniqueCity.filter(c => c.DistrictName === cityValue)

  //   console.log("availableZipCode", availableZipCode)
  // Create Customer post



  useEffect(() => {
 
    try {
      axios({
        method: 'post',
        url: `https://${backEndDomain}/masterapi/master/listcustomermaster`,
        headers: {
          'Content-type': 'application/json',
          'token': localStorage.getItem('UserToken'),
        }
      })
        .then(function (response) {
        //   console.log(response.data.Data)
        //   setCustomerData(response.data.Data)
        }).catch(function (response) {
            if(response.response.status == 422){
           console.log("err", response.response.status);
            }
        });
    } catch (err) {
      console.log(err);

    }

  }, [])




  return (
    <>
      <div className="top">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-building-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h3v-3.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V16h3a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H3Zm1 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                    <FormControl variant="standard">

                    </FormControl>
                    <TextField 
                    id="outlined-basic" 
                    label="Outlined" 
                    variant="outlined" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}/>
                    <div className="toggle">
                      <label>Status</label>
                      <Switch {...label} onChange={(e) => setSwitchValue(!switchValue)}/>
                    </div>
                    <div className="status">
                      {!switchValue ? 
                      (<Typography className="success" variant="h6">
                        Active
                      </Typography>) 
                      :
                      (<Typography className="danger" variant="h6">
                      In Active
                    </Typography>)
                      }               
                  </div>
                  </div>
                  <div className="inputs-wrapper mt:2">
                   
                    <Box sx={{ flexGrow: 1, mt:2 }}>
                      <Grid container spacing={2}>
                      <Grid item xs={3}>
                          <Item>  

                              <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              options={countryList.map((country) => country.CountryName)}
                              sx={{ width: 300 }}
                              value={countryValue}
                              onChange={(event, newValue, index) => {
                                    setCountryValue(newValue);
                                    setSelectedCountryId(parseInt(event.target.dataset.optionIndex)+1)
                                    console.log("nv", newValue, event);
                                    
                              }}
                              renderInput={(params) => <TextField {...params} label="Country" /> 
                              
                            }
                            
                          />
                          </Item>
                        </Grid>                        
                        <Grid item xs={3}>
                          <Item>  


                              <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              options={availableState.map((state) => state.StateName)}
                              sx={{ width: 300 }}
                              value={stateValue}
                              onChange={(event, newValue) => {
                                    setStateValue(newValue);
                                    setSelectedStateId(parseInt(event.target.dataset.optionIndex)+1)
                                    setCityValue("");
                                  }}
                              renderInput={(params) => <TextField {...params} label="State" /> 
                            }
                          />
{/* <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Controllable" />}
      /> */}


                          </Item>
                        </Grid>
                        <Grid item xs={3}>
                          <Item>
                            <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={availableCities.map((city) => city.Locality)}
                            sx={{ width: 300 }}
                            value={cityValue}
                            onChange={(event, newValue) => {
                                setCityValue(newValue);
                                setSelectedCityId(parseInt(event.target.dataset.optionIndex)+1)
                                }}
                            renderInput={(params) => <TextField {...params} label="City" /> 
                        }
                        />
                          </Item>
                        </Grid>
                        <Grid item xs={3}>
                          <Item>
                            {/* <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={availableZipCode}
                            sx={{ width: 300 }}
                            value={availableZipCode}
                            onChange={(event, newValue) => {
                                setCityValue(newValue);
                                }}
                            renderInput={(params) => <TextField {...params} label="Zip Code" /> 
                        }
                        /> */}
                        <TextField
                          
                          id="outlined-required"
                          label="Zip Code"
                          value={availableZipCode.length > 0 ? availableZipCode[0].ZipCode : ""}
                          // onChange={(e) => setSelectedZip(availableZipCode.length > 0 ? availableZipCode[0].ZipCode : "")}
                        />
                          </Item>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box sx={{ flexGrow: 1, mb: 2, mt: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          
                            
                              
                              <TextField
                              label="Address"
                                placeholder="Enter Address"
                                onChange={(e) => setAddress(e.target.value)}
                              />
                            
                          
                        </Grid>
                      </Grid>
                    </Box>
                  </div>
                  <Button style={{marginLeft:'auto', display:'block'}}
                type="submit"
                variant="contained"
                className='btn-primary'
                onClick={handleSubmit}
            >
                Save
            </Button>
    </>
  )
}

export default Fromcustomercreate
