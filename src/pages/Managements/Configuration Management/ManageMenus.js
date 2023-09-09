import React from 'react'
import Layout from '../../../components/layout';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import FormControl from "@mui/material/FormControl";
import Button from '@mui/material/Button';
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import IconButton from "@mui/material/IconButton";
import { Card, CardContent } from '@mui/material';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { backEndDomain } from '../../../service/apiserver';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


function ManageMenus() {

  let navigate = useNavigate()

  const [foundUserData, setFoundUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");


  useEffect(() => {

    try {
      axios({
        method: 'get',
        url: `https://${backEndDomain}/masterapi/master/viewMenus?TenantId=GAINWELL_01`,
        headers: {
          'Content-type': 'application/json',
          'token': localStorage.getItem('UserToken'),
        }
      })
        .then(function (response) {
          console.log("setFoundUserData", response.data.data)

          setFoundUserData(response.data.data)
          setUserdata(response.data.data)
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


  const Updatecode = async (name, levelid, parentmenuid, MenuId) => {
    // const Data = await userdata.find((item) => item.MappingId === id);
    navigate('/createmenu',
      {

        state: {


          name: name,
          levelid: levelid,
          parentmenuid: parentmenuid,
          MenuId: MenuId

        }
      });
  }

  const [keyvalue, setKeyvalue] = useState('');
  const [userdata, setUserdata] = useState([]);

  const search = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = userdata.filter((item) => {
        const filterParentCode = item.MenuName.toLowerCase().startsWith(keyword.toLowerCase());
        const filterParentDescription = String(item.MenuLevel).toLowerCase().startsWith(keyword.toLowerCase());
        const filterDescription = String(item.ParentMenuId).toLowerCase().startsWith(keyword.toLowerCase());

        return filterParentCode || filterParentDescription || filterDescription;
      });
      setFoundUserData(results);
    } else {
      setFoundUserData(userdata);
    }

    setKeyvalue(keyword);
    setSortBy("");
    setSortOrder("asc");
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };


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
                </Breadcrumbs>
                <h2 className="page-heding">   Manage Menus</h2>
              </div>  <div className='right'>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Search...
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    label="Search..."
                    autoFocus
                    value={keyvalue}
                    onChange={search}
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
                <Link to="/createmenu" > <Button type='button' variant="contained"> Create </Button></Link>
              </div></div>
             
            <Card>
              <CardContent>
              {loading ? (  
                 
                            <div  className='no_data'>
                             <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4, color: '#426e81' }} />
                             <h5 className="loading_icon">Data Loading...</h5>
                         </div>
                       
                        ) : ( 
                <Table>
                  <TableHead>
                    <TableRow className='sorting' >
                      <TableCell>
                      <Button onClick={() => handleSort("MenuName")}>
                        Menu Name
                        {sortBy === "MenuName" && (
                              <ArrowDropDownIcon
                                fontSize="small"
                                sx={{ transform: `rotate(${sortOrder === "asc" ? "0deg" : "180deg"})` }}
                              />
                            )}
                          </Button>
                        </TableCell>
                      <TableCell align="right">
                      <Button onClick={() => handleSort("MenuLevel")}>
                        Menu Level
                        {sortBy === "MenuLevel" && (
                              <ArrowDropDownIcon
                                fontSize="small"
                                sx={{ transform: `rotate(${sortOrder === "asc" ? "0deg" : "180deg"})` }}
                              />
                            )}
                          </Button>
                        </TableCell>
                      <TableCell align="right">
                      <Button onClick={() => handleSort("ParentMenuId")}>
                        Parent Name
                        {sortBy === "ParentMenuId" && (
                              <ArrowDropDownIcon
                                fontSize="small"
                                sx={{ transform: `rotate(${sortOrder === "asc" ? "0deg" : "180deg"})` }}
                              />
                            )}
                          </Button>
                        </TableCell>
                      <TableCell align="right" className='action_color'>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {foundUserData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className='nodata-table'>
                          <Typography variant="h6" align="center" className='no_data'>
                            No data available
                          </Typography>
                      </TableCell>
                      </TableRow>

                    ) : (
                      foundUserData
                      
                      
                      .sort((a, b) => {
                        if (sortBy === "MenuName") {
                          return sortOrder === "asc"
                            ? a.MenuName.localeCompare(b.MenuName)
                            : b.MenuName.localeCompare(a.MenuName);
                        } else if (sortBy === "MenuLevel") {
                          return sortOrder === "asc"
                            ? String(a.MenuLevel).localeCompare(String(b.MenuLevel))
                            : String(b.MenuLevel).localeCompare(String(a.MenuLevel));
                        } else if (sortBy === "ParentMenuId") {
                          return sortOrder === "asc"
                            ? String(a.ParentMenuId).localeCompare(String(b.ParentMenuId))
                            : String(b.ParentMenuId).localeCompare(String(a.ParentMenuId));
                        }
                      })
                      .map((item, index) => (
                        <TableRow key={index}>
                          <TableCell align="right">{item.MenuName}</TableCell>
                          <TableCell align="right">{item.MenuLevel}</TableCell>
                          <TableCell align="right">{item.ParentMenuId}</TableCell>
                          <TableCell align="right">
                            <IconButton>
                              <EditIcon
                                className="dist_card_edit_ic"
                                onClick={() => Updatecode(item.MenuName, item.MenuLevel, item.ParentMenuId, item.MenuId)}
                              />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
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

export default ManageMenus;  