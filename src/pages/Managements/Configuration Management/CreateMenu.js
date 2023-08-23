import React from 'react'
import Layout from '../../../components/layout';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import FormControl from "@mui/material/FormControl";
import Button from '@mui/material/Button';
import Createmenuapi from './createmenuapi';
 
 function CreateMenu() {
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
              Configuration Management
               </Link>
               <Link
                 underline="hover"
                 color="inherit"
                 to="/manageproblemcodes"
               >
                Manage Menus
               </Link>

               <Typography color="text.primary">Create</Typography>
             </Breadcrumbs>
             <h2 className="page-heding">Create Menu</h2>
           </div>  <div className='right'>
             <FormControl variant="outlined">

             </FormControl>
             <Link to="/managemenus" > <Button  type='button' variant="contained"> Back </Button></Link>
           </div></div>
           <Createmenuapi/>
          
    
       </Box>
     </Container>
   </Layout>
   </div>
   )
 }
 
 export default CreateMenu;