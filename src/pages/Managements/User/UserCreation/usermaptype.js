import { CardContent, Box, Card, MenuItem, Stack } from "@mui/material";
import React from "react";
import Layout from "../../../../components/layout";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { useState, useEffect } from "react";
import { backEndDomain } from "../../../../service/apiserver";
import Select from "@mui/material/Select";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Usermaptype = () => {


   
  const { state, mapEditMode } = useLocation();
  console.log("state", state);
  let navigate = useNavigate();

  const [username, setUsername] = useState({
    userEmail: "",
    UserType: "",
  });

  const handleClear = () => {
    // Clear all of the data in the text fields
    setUsername({
      userEmail: "",
    UserType: "",
    });
  };

  const [usrId, setUserId] = useState("");
  const [typId, setTypeId] = useState("");

  console.log("username", username);
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setUsername({ ...username, [name]: value });
    const indVal = index.props.id;
    const keyVal = index.key;
    if (e.target.name === "userEmail") {
      setUserId(indVal);
    } else if (e.target.name === "UserType") {
      setTypeId(indVal);
    } else {
      console.log("no data");
    }
  };

  const loadState = () => {
    setUsername({});
    console.log("username", username);
  };

  console.log("data", usrId, typId);

  const [user, setUser] = useState([]);
 
  useEffect(() => {
    loadState();

    try {
      axios({
        method: "get",
        url: `https://${backEndDomain}/masterapi/master/viewalluserdata`,
        headers: {
          "Content-type": "application/json",
          token: localStorage.getItem("UserToken"),
        },
      })
        .then(function (response) {
          console.log("response.data.data", response.data.data);
          setUser(response.data.data);
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

  const [type, setType] = useState([]);

  useEffect(() => {
    try {
      axios({
        method: "get",
        url: `https://${backEndDomain}/masterapi/master/ViewUserTypedata`,
        headers: {
          "Content-type": "application/json",
          token: localStorage.getItem("UserToken"),
        },
      })
        .then(function (response) {
          console.log("response.type", response.data.data);
          setType(response.data.data);
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

  console.log("top username", username);
  console.log("state", state);
  const handleSave = (e) => {
    if (state) {
      e.preventDefault();
      console.log("username", username);
      const payload = {
        TenantId: localStorage.getItem("TenantId"),
        userid: usrId ? usrId : state.userId,
        usertypeid: typId ? typId : state.usertypeid,
        mappingid: state.mappingid,
      }; // create an updated user object with the new user type

      console.log("payload", payload);
      try {
        axios({
          method: "put",
          url: `https://${backEndDomain}/masterapi/master/updateusertypemap`,
          data: payload,
          headers: {
            "Content-type": "application/json",
            token: localStorage.getItem("UserToken"),
          },
          // pass the updated user data as the request payload
        })
          .then(function (response) {
            console.log(response);
            navigate("/usertypemapping");
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
      e.preventDefault();
      console.log("username", username);
      const payload = {
        TenantId: localStorage.getItem("TenantId"),
        userid: usrId,
        usertypeid: typId,
      }; // create an updated user object with the new user type

      console.log("payload", payload);
      try {
        axios({
          method: "post",
          url: `https://${backEndDomain}/masterapi/master/UserTypemapping`,
          data: payload,
          headers: {
            "Content-type": "application/json",
            token: localStorage.getItem("UserToken"),
          },
          // pass the updated user data as the request payload
        })
          .then(function (response) {
            console.log(response);
            navigate("/usertypemapping");
            // handle success response
          })
          .catch(function (response) {
            console.log(response);
            // handle error response
          });
      } catch (err) {
        console.log(err);
      }
    }
  };
  const isSaveDisabled = !username.userEmail || !username.UserType;
  const handleDdChange = (index) => {
    console.log("data", index);
  };

  return (
    <div>
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <div className="box-header dt-mgmt">
            <div className="left">
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                  Masters
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  href="/material-ui/getting-started/installation/">
                  User Management
                </Link>
                <Typography color="text.primary">Assign User Type </Typography>
              </Breadcrumbs>
              <h2 className="page-heding">
                {state ? "Edit User Type" : "Assign User Type"}
              </h2>
            </div>{" "}
            <div className="right">
              <Link to="/usertypemapping">
                {" "}
                <Button className="bck-btn" type="button" variant="contained">
                  {" "}
                  Back{" "}
                </Button>
              </Link>
            </div>
          </div>
          <Box className="map">
            <Card>
              <CardContent>
                <InputLabel shrink htmlFor="bootstrap-input" className="input">
                  Select User
                </InputLabel>

                <Select
                  defaultValue={state ? state.userEmail : username.userEmail}
                  value={username.userEmail}
                  name="userEmail"
                  onChange={handleChange}>
                  {user.map((data, index) => (
                    <MenuItem key={index} id={data.UserId} value={data.Email}>
                      {data.Email}
                    </MenuItem>
                  ))}
                </Select>

                <CardContent></CardContent>
                <InputLabel shrink htmlFor="bootstrap-input" className="input">
                  User Type
                </InputLabel>

                <Select
                  defaultValue={state ? state.UserType : username.UserType}
                  value={username.UserType}
                  name="UserType"
                  onChange={handleChange}>
                  {type.map((data, index) => (
                    <MenuItem
                      key={index}
                      id={data.UserTypeId}
                      value={data.UserTypeDescription}>
                      {data.UserTypeDescription}
                    </MenuItem>
                  ))}
                </Select>
                <div className='riig'>
                <Stack spacing={2} direction="row">
                <Button variant="outlined"  onClick={handleClear}>Clear</Button>
                  <Button variant="contained"   onClick={handleSave}  disabled={isSaveDisabled} >
                    Save
                  </Button>
                </Stack>
                </div>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Layout>
    </div>
  );
};

export default Usermaptype;
 