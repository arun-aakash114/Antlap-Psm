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
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const theme = createTheme({
    components: {
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    color: 'black', // Text color for inactive pages
                    backgroundColor: 'white', // Background color for inactive pages
                    '&.Mui-selected': {
                        color: 'white', // Text color for active page
                        backgroundColor: 'blue', // Background color for active page
                    },
                },
            },
        },
    },
});


function Problemcode() {

    let navigate = useNavigate()

    const [loading, setLoading] = useState(true);

    useEffect(() => {


        try {
            axios({
                method: 'get',
                url: `https://${backEndDomain}/masterapi/master/viewProblemCode `,
                headers: {
                    'Content-type': 'application/json',
                    'token': localStorage.getItem('UserToken'),
                }
            })
                .then(function (response) {
                    setData(response.data.ProblemCodeData)
                    setUserdata(response.data.ProblemCodeData)
                    setLoading(false);


                    console.log("response", response.data.ProblemCodeData)
                }).catch(function (response) {
                    //   if(response.response.status == 422){
                    //  // console.log(response.response.status);
                    //   }
                });
        } catch (err) {
            console.log(err);

        }

    }, []);

    const Updatecode = async (ProblemCode, ProblemDescription) => {
        // const Data = await userdata.find((item) => item.MappingId === id);
        navigate('/createproblemcodes',
            {

                state: {


                    ProblemCode: ProblemCode,
                    ProblemDescription: ProblemDescription

                }
            });
    }

    const [keyvalue, setKeyvalue] = useState('');
    const [userdata, setUserdata] = useState([]);
    const [data, setData] = useState(userdata);

    const search = (e) => {
        const keyword = e.target.value;

        if (keyword !== '') {
            const results = userdata.filter((item) => {
                var filterProblemCode = item.ProblemCode.toLowerCase().startsWith(keyword.toLowerCase());
                var filterProblemDescription = item.ProblemDescription.toLowerCase().startsWith(keyword.toLowerCase());

                return filterProblemCode || filterProblemDescription
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
                                    <Typography color="text.primary">Problem Codes List</Typography>
                                </Breadcrumbs>
                                <h2 className="page-heding">Problem Codes List</h2>
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
                                <Link to="/createproblemcodes" > <Button type='button' variant="contained"> Create </Button></Link>
                            </div></div>
                            {loading ? ( // If isLoading is true, show the CircularProgress
                            <Card align="center" className='no_data' >
                            <div className="loading-container">
                             <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4, color: '#426e81' }} />
                             <h5 className="loading_icon">Data Loading...</h5>
                         </div>
                         </Card>
                        ) : (   
                        <div className='Problem_Codes_Card'>
                            {data.length === 0 ? (
                                <Card>
                                <Typography variant="h6" align="center" className='no_data'>
                                    No data available
                                </Typography>
                                </Card>
                            ) : (
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    {data.map((item, index) => (
                                        <Grid item xs={6} >
                                            <Item className="dist_card_edit_text" key={index}>
                                                <span className="dist_card_edit_status1 active">
                                                    Active
                                                </span>
                                                <span className="dist_card_edit_problem" > <EditIcon className="dist_card_edit_ic" onClick={() => Updatecode(item.ProblemCode, item.ProblemDescription)} /></span>
                                                <h6> Problem Code</h6>
                                                <h4 > {item.ProblemCode}</h4><br />
                                                <h6  >  Problem Code Description</h6>
                                                <h4>{item.ProblemDescription}</h4>   </Item>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </div>
)}

                        {/* <ThemeProvider theme={theme}>
                            <Container>
                                <Pagination count={50} variant="outlined" shape="rounded" color="primary" />
                            </Container>
                        </ThemeProvider> */}
                    </Box>

                </Container>


            </Layout>
        </div>
    )
}

export default Problemcode