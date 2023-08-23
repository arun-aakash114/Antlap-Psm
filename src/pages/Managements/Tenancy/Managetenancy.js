import React, { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { backEndDomain } from '../../../service/apiserver';

function Managetenancy() {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [keyvalue, setKeyvalue] = useState('');
  const [userdatasar, setUserdatasar] = useState([]);
  const [userData, setUserData] = useState(userdatasar);

  useEffect(() => {
    try {
      axios({
        method: 'get',
        url: `https://${backEndDomain}/masterapi/master/viewTenants?`,
        headers: {
          'Content-type': 'application/json',
          'token': localStorage.getItem('UserToken'),
        }
      })
        .then(function (response) {
          console.log("API response:", response.data.data);
          setUserData(response.data.data);
          setUserdatasar(response.data.data);
          setLoading(false);
        })
        .catch(function (error) {
          console.log("API error:", error);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const Updatecode = async (name, EffectiveFrom, EffectiveTo) => {
    navigate('/createtenancy', {
      state: {
        name: name,
        EffectiveFrom: EffectiveFrom,
        EffectiveTo: EffectiveTo,
      }
    });
  }

  const search = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = userdatasar.filter((item) => {
        const filterTenantName = item.TenantName.toLowerCase().startsWith(keyword.toLowerCase());
        const filterEffectiveFrom = String(item.EffectiveFrom).toLowerCase().startsWith(keyword.toLowerCase());
        const filterEffectiveTo = String(item.EffectiveTo).toLowerCase() === keyword.toLowerCase();

        return filterTenantName || filterEffectiveFrom || filterEffectiveTo
      });

      setUserData(results);
    } else {
      setUserData(userdatasar);
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
                    Tenancy Management
                  </Link>
                </Breadcrumbs>
                <h2 className="page-heding">Manage Tenancy</h2>
              </div>
              <div className='right'>
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
                          <SearchOutlinedIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Link to="/createtenancy">
                  <Button type='button' variant="contained">Create</Button>
                </Link>
              </div>
            </div>
            <Card>
              <CardContent>
                {loading ? (
                   
                    <div className='no_data'>
                     <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4, color: '#4b61ff' }} />
                     <h5 className="loading_icon">Data Loading...</h5>
                 </div>
           
                ) : (
                  <Table>
                    <TableHead>
                      <TableRow className='sorting' >
                        <TableCell >
                          <Button onClick={() => handleSort("TenantName")}>
                            Name
                            {sortBy === "TenantName" && (
                              <ArrowDropDownIcon
                                fontSize="small"
                                sx={{ transform: `rotate(${sortOrder === "asc" ? "0deg" : "180deg"})` }}
                              />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <Button onClick={() => handleSort("EffectiveFrom")}>
                            Effective From
                            {sortBy === "EffectiveFrom" && (
                              <ArrowDropDownIcon
                                fontSize="small"
                                sx={{ transform: `rotate(${sortOrder === "asc" ? "0deg" : "180deg"})` }}
                              />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <Button onClick={() => handleSort("EffectiveTo")}>
                            Effective To
                            {sortBy === "EffectiveTo" && (
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
                      {userData.length === 0 ? (
                       <TableRow>
                       <TableCell colSpan={4} className='nodata-table'>
                         <Typography variant="h6" align="center" className='no_data'>
                           No data available
                         </Typography>
                     </TableCell>
                     </TableRow>
                      ) : (
                        userData
                          .sort((a, b) => {
                            if (sortBy === "TenantName") {
                              return sortOrder === "asc"
                                ? a.TenantName.localeCompare(b.TenantName)
                                : b.TenantName.localeCompare(a.TenantName);
                            } else if (sortBy === "EffectiveFrom") {
                              return sortOrder === "asc"
                                ? new Date(a.EffectiveFrom) - new Date(b.EffectiveFrom)
                                : new Date(b.EffectiveFrom) - new Date(a.EffectiveFrom);
                            } else if (sortBy === "EffectiveTo") {
                              return sortOrder === "asc"
                                ? new Date(a.EffectiveTo) - new Date(b.EffectiveTo)
                                : new Date(b.EffectiveTo) - new Date(a.EffectiveTo);
                            }
                          })
                          .map((item, index) => (
                            <TableRow key={index}>
                              <TableCell align="right">{item.TenantName}</TableCell>
                              <TableCell align="right">
                                {`${new Date(item.EffectiveFrom).getDate().toString().padStart(2, '0')}/${(new Date(item.EffectiveFrom).getMonth() + 1).toString().padStart(2, '0')}/${new Date(item.EffectiveFrom).getFullYear()}`}
                              </TableCell>
                              <TableCell align="right">
                                {`${new Date(item.EffectiveTo).getDate().toString().padStart(2, '0')}/${(new Date(item.EffectiveTo).getMonth() + 1).toString().padStart(2, '0')}/${new Date(item.EffectiveTo).getFullYear()}`}
                              </TableCell>
                              <TableCell align="right">
                                <IconButton>
                                  <EditIcon
                                    className="dist_card_edit_ic"
                                    onClick={() => Updatecode(item.TenantName, item.EffectiveFrom, item.EffectiveTo)}
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
  );
}

export default Managetenancy;
