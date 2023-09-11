import React from 'react'
import Layout from '../../../../components/layout'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Button from '@mui/material/Button';
import { Card, CardContent } from '@mui/material';
import { makeStyles } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import Select from '@mui/material/Select';
import { MenuItem, Stack } from '@mui/material'
import Createchildapi from './createchildapi';

function Createchildcode() {


  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));


  const classes = useStyles();
  return (
    <div>
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box>
            <div className='box-header dt-mgmt'>
              <div className='left'>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" color="inherit" href="/">
                    Masters
                  </Link>
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                  >
                    Master Code Management
                  </Link>
                  <Link
                    underline="hover"
                    color="inherit"
                    to="/managechildcodes"
                  >
                    SMCS Child Codes List
                  </Link>

                  <Typography color="text.primary">Create</Typography>
                </Breadcrumbs>
                <h2 className="page-heding">Create SMCS Child Code</h2>
              </div>  <div className='right'>
                <FormControl variant="outlined">

                </FormControl>
                <Link to="/managechildcodes" > <Button type='button' variant="contained"  > Back </Button></Link>
              </div></div>
            <Createchildapi />
          </Box>
        </Container>
      </Layout>
    </div>
  )
}

export default Createchildcode;