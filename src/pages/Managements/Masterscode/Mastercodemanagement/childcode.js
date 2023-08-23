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
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import { backEndDomain } from '../../../../service/apiserver';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));



function Childcode() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    let navigate = useNavigate()

    useEffect(() => {

        try {
            axios({
                method: 'get',
                url: `https://${backEndDomain}/masterapi/master/viewSMCSChild `,
                headers: {
                    'Content-type': 'application/json',
                    'token': localStorage.getItem('UserToken'),
                }
            })
                .then(function (response) {
                    setData(response.data.SMCSChildCodesData)
                    setUserdata(response.data.SMCSChildCodesData)
                    setLoading(false);


                    console.log("SMCSChildCodesData", response.data.SMCSChildCodesData)
                }).catch(function (response) {
                    //   if(response.response.status == 422){
                    //  // console.log(response.response.status);
                    //   }
                });
        } catch (err) {
            console.log(err);

        }

    }, [])




    const Updatecode = async (ChildCode, ChildDescription, ParentProblemtCodes_M_ParentCode, isActive) => {
        // const Data = await userdata.find((item) => item.MappingId === id);
        navigate('/createchildcodes',
            {

                state: {


                    ChildCode: ChildCode,
                    ChildDescription: ChildDescription,
                    ParentProblemCode: ParentProblemtCodes_M_ParentCode,
                    isActive: isActive




                }
            });
    }
    const [keyvalue, setKeyvalue] = useState('');
    const [userdata, setUserdata] = useState([]);

    const search = (e) => {
        const keyword = e.target.value;

        if (keyword !== '') {
            const results = userdata.filter((item) => {
                var filterParentCode = item.ChildCode.toLowerCase().startsWith(keyword.toLowerCase());
                var filterParentDescription = item.ChildDescription.toLowerCase().startsWith(keyword.toLowerCase());

                return filterParentCode || filterParentDescription
                // Use the toLowerCase() method to make it case-insensitive
            });
            setData(results);

        } else {
            setData(userdata);
            // If the text field is empty, show all users
        }

        setKeyvalue(keyword);
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
                                        Master Code Management
                                    </Link>
                                    <Typography color="text.primary">SMCS Child Codes List</Typography>
                                </Breadcrumbs>
                                <h2 className="page-heding">SMCS Child Codes List</h2>
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
                                <Link to="/createchildcodes" > <Button type='button' variant="outlined"> Create </Button></Link>
                            </div></div>

                        <div className='Problem_Codes_Card'>
                            {loading ? (
                                   <Card align="center" className='no_data' >
                                   <div className="loading-container">
                                    <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4, color: '#4b61ff' }} />
                                    <h5 className="loading_icon">Data Loading...</h5>
                                </div>
                                </Card>
                            ) : data.length === 0 ? (
                                <Card>
                                <Typography variant="h6" align="center" className='no_data'>
                                    No data available
                                </Typography>
                                </Card>
                            ) : (
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    {data.map((item, index) => (
                                        <Grid item xs={6} key={index} >

                                            <Item className="dist_card_edit_text" >
                                                {item.isActive === "1" ?
                                                    <span className="dist_card_edit_status1 active">
                                                        Active
                                                    </span>
                                                    :
                                                    <span className="dist_card_edit_status1 inactive">
                                                        Inactive
                                                    </span>
                                                }
                                                <span className="dist_card_edit_problem" > <EditIcon className="dist_card_edit_ic" onClick={() => Updatecode(item.ChildCode, item.ChildDescription, item.ParentProblemtCodes_M_ParentCode, item.isActive)} /></span>
                                                <h6> SMCS Parent Code</h6>
                                                <h4 > {item.ParentProblemtCodes_M_ParentCode}</h4><br />
                                                <h6> SMCS Child Code</h6>
                                                <h4 > {item.ChildCode}</h4><br />
                                                <h6 >  SMCS Child Code Descripition</h6>
                                                <h4>{item.ChildDescription}</h4>  </Item>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </div>


                    </Box>
                </Container>
            </Layout>
        </div>
    )
}

export default Childcode