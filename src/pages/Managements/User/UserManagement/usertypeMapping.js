import React from 'react'
import Layout from '../../../../components/layout'
import Box from '@mui/material/Box';
import { Card, CardContent } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from '@mui/material/Button';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import { Link } from 'react-router-dom';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { backEndDomain } from '../../../../service/apiserver';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';




const UsertypeMapping = () => {

  let navigate = useNavigate()
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
 
    try {
      axios({
        method: 'get',
        url: `https://${backEndDomain}/masterapi/master/viewusertypemap?TenantId=GAINWELL_01`,
        headers: {
          'Content-type': 'application/json',
          'token': localStorage.getItem('UserToken'),
        }
      })
        .then(function (response) {
          console.log(response.data.data)
          setUserdata(response.data.data)
          setFoundUserData(response.data.data)
          setLoading(false);

          
        }).catch(function (response) {
          //   if(response.response.status == 422){
          //  // console.log(response.response.status);
          //   }
        });
    } catch (err) {
      console.log(err);

    }

  }, []);

  // Get data for update user type
  const updateusertypemap =  async (mappingId) => {
    const getMappingData =  await userdata.find((item) => item.MappingId === mappingId);
    console.log("mappingId", getMappingData);
    navigate('/createmaptype',
            {
              mapEditMode: "test",
                state: {
                  usertypeid: getMappingData.UserType_M_UserTypeId,
                  userId: getMappingData.Users_M_UserId,
                  mappingid:getMappingData.MappingId,
                  userEmail:getMappingData.userEmail,
                  UserType:getMappingData.UserType
                    
                }
            });
  }

  const [userdata, setUserdata]= useState([]);
// the search result
const [kname, setKname] = useState('');
const [foundUserData, setFoundUserData] = useState(userdata);

const filter = (e) => {
  const keyword = e.target.value;

  if (keyword !== '') {
    const results = userdata.filter((usr) => {
      var filterEmail = usr.userEmail.toLowerCase().startsWith(keyword.toLowerCase());
      var filterType = usr.UserType.toLowerCase().startsWith(keyword.toLowerCase());

      return filterEmail || filterType
      // Use the toLowerCase() method to make it case-insensitive
    });
    setFoundUserData(results);
  } else {
    setFoundUserData(userdata);
    // If the text field is empty, show all users
  }

  setKname(keyword);
};


  return (
    <div>

      <Layout >

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
                    User Management
                  </Link>
                  <Typography color="text.primary">Assign User Type </Typography>
                </Breadcrumbs>
                <h2 className="page-heding">Assign User Type</h2>
              </div>  <div className='right'>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Search...
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    label="Search..."
                    autoFocus
                    value={kname}
                    onChange={filter}
                    type="text"
                    size="small"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton size="small" edge="end">
                          {<SearchOutlinedIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Link to="/createmaptype" > <Button type='button'    variant="contained"> Assign   </Button></Link>
                
              </div></div>
            
            <Card>
              <CardContent>
              {loading ? ( // If isLoading is true, show the CircularProgress
                            <div className="no_data">
                            <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4, color: '#426e81' }} />
                            <h5 className="loading_icon">Data Loading...</h5>
                        </div>
                        ) : ( 
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User Email</TableCell>
                      <TableCell align="right">User Type</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {foundUserData.map((data,index) => ( 
                  <TableRow
                          key={index} >
                    <TableCell align="right">{data.userEmail}</TableCell>
                    <TableCell align="right">{data.UserType}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => updateusertypemap(data.MappingId)}>
                        <ModeEditIcon   color='blue' size="small" />
                      </IconButton>
                    </TableCell>
                    </TableRow>
                       ))}
                       

                  </TableBody>
            
                </Table>
                    )}
              </CardContent>
            </Card>


          </Box>
        </Container>
      </Layout>


    </div>
  )
}

export default UsertypeMapping