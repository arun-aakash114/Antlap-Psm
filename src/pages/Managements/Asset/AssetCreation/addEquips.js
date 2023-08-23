import Breadcrumbs from "@mui/material/Breadcrumbs";
import Box from "@mui/material/Box";
import React from "react";
import Layout from "../../../../components/layout";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Card, CardContent, Container, Grid,  InputAdornment, InputLabel, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Stack from '@mui/material/Stack';
import { useState, useEffect } from 'react';
import AddEquipForm from "./addEquipForm";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


const AddEquips = () => {

  const { state, mapEditMode } = useLocation();
  console.log('state', state)
  let navigate = useNavigate()




  return (
    <div>
    <Layout>
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ flexGrow: 1 }}>
        <div className='box-header dt-mgmt'>
          <div className="left">
            <Breadcrumbs className="crumbs-master">
              <Link color={"inherit"}>Masters</Link>
              <Link color={"inherit"}>Asset Management</Link>
              <Link color={"textPrimary"}>Manage Equipment's</Link>
              <Link>Create</Link>

            </Breadcrumbs>
            <h3 className="heading">Create</h3>
          </div>
          <div className="right">
            <Link to="/manageequips">
              <Button variant="contained">Back</Button>
            </Link>
          </div>
        </div>
        <Card className='user'>
          <CardContent>
            <AddEquipForm equipData={state}/>
          </CardContent>
        </Card>

      </Box>
      </Container>
    </Layout>
    </div>
  );
};

export default AddEquips;
