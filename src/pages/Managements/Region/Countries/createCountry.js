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
import CreateCountryForm from "./createCountryForm";
import { useLocation } from 'react-router-dom';




const CreateCountry = () => {
  const { state } = useLocation();
  console.log('state', state)
  const [age, setAge] = React.useState("");
  

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  

  return (
    <div>
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box>
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
                    Region Management
                  </Link>
                  <Typography color="text.primary">Country</Typography>
                  <Typography color="text.primary">Create</Typography>
                </Breadcrumbs>
                <h2 className="page-heding">Create Country</h2>
              </div>
              <div className="right">
                <Link to="/viewcountries">
                  <Button   type="button" variant="contained">
                    Back
                  </Button>
                </Link>
              </div>
            </div>

            <Box className="map">
              <CreateCountryForm countryDta={state}/>
            </Box>
          </Box>
        </Container>
      </Layout>
    </div>
  );
};

export default CreateCountry;
