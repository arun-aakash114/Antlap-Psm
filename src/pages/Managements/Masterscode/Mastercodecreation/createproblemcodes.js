import React from 'react'
import Layout from '../../../../components/layout'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import FormControl from "@mui/material/FormControl";
import Button from '@mui/material/Button';
import Createplbapi from './createplbapi';




function Createproblemcodes() {


  
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
                    to="/manageproblemcodes"
                  >
                    Problem Codes List
                  </Link>

                  <Typography color="text.primary">Create</Typography>
                </Breadcrumbs>
                <h2 className="page-heding">Create Problem Codes</h2>
              </div>  <div className='right'>
                <FormControl variant="outlined">

                </FormControl>
                <Link to="/manageproblemcodes" > <Button variant="outlined"> Back </Button></Link>
              </div></div>
              <Createplbapi/>
       
          </Box>
        </Container>
      </Layout>
    </div>
  )
}

export default Createproblemcodes