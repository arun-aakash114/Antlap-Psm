import React from 'react'
import Explayout from '../../components/expert/explayout';
import { Button } from '@mui/material';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Card, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import PropTypes from 'prop-types';
import Plyr from "plyr-react"
import "plyr-react/plyr.css"
import ArticleIcon from '@mui/icons-material/Article';
import ConstructionIcon from '@mui/icons-material/Construction';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PhotoIcon from '@mui/icons-material/Photo';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import sam from '../../assets/sam.png';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ReactPlayer from 'react-player'
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

function Result() {

    const navigate = useNavigate();

    return (
        <><Explayout>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box className='box-header'>
                    <h2 className="page-heding">Result(s)found <span className='header-count'>02</span> </h2>
                </Box>
                <Box className='contact-info'>
                    <Card className='model-cart'>
                        <CardContent>
                            <Typography><b>Serial No</b> : RDZ02321&nbsp;&nbsp;  |  &nbsp;&nbsp;<b>Model/Prefix</b> : 320D2&nbsp;&nbsp;  |  &nbsp;&nbsp;<b>Sl. No Range</b> : RDZ00001-07921&nbsp;&nbsp;  |  &nbsp;&nbsp;<b>SMCS Component : 5454</b> - SWING RELIEF VALVE  </Typography>
                            <br/><Typography><b>Problem Code / Description</b> : 66 - Pressure Too Low</Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box className='contact-info'>
                    <Card className='model-cart'>
                        <CardContent>
                            <Box className='solution-box'>
                           
                                        <Typography className='fd-step'><span className='solution-count-result'>A</span>Solution path
                                           
                                            <Button
                                                type="submit"
                                                // size="large"
                                                variant="contained"
                                                className="btn_green"
                                                sx={{ mt: 3, mb: 2 }}
                                                onClick={() => { navigate('/view') }}                                                
                                            >
                                               <VisibilityOutlinedIcon/> View
                                            </Button>
                                            <Button
                                                type="submit"
                                                // size="large"
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                                onClick={() => { navigate('/execute') }}      
                                                className="btn_execute"
                                      
                                            >
                                               <ArrowRightAltIcon/> Execute
                                            </Button>
                                            </Typography>
                          
                            </Box>
                            <Box className='solution-box' sx={{ marginTop:1 }}>
                          
                                        <Typography className='fd-step'><span className='solution-count-result'>B</span>Solution path
                                            <Button
                                                type="submit"
                                                // size="large"
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                               // onClick={() => { navigate('/view') }}                                                
                                                className="btn_green"
                                            >
                                                <VisibilityOutlinedIcon/> View
                                            </Button>
                                            <Button
                                                type="submit"
                                                // size="large"
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2}}
                                              //  onClick={() => { navigate('/execute') }}      
                                            className="btn_execute"

                                            >
                                               <ArrowRightAltIcon/> Execute
                                            </Button></Typography>
                              
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

            </Container>
        </Explayout></>
    )
}

export default Result;