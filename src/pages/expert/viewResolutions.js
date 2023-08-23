import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../App.css';
import Explayout from '../../components/expert/explayout';
import { getResolutions } from '../../service/apiServices/resultServices';
import CreateIcon from '@mui/icons-material/Create';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import { Card, CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as Icon from 'react-bootstrap-icons';
import LayersIcon from '@mui/icons-material/Layers';
import setting from '../../assets/settingsicon.svg';
import 'react-slideshow-image/dist/styles.css';
import { Button } from '@mui/material';
import "plyr-react/plyr.css"
import notes from '../../assets/notes.svg';
import file from '../../assets/file.svg';
import toolicon from '../../assets/toolicon.svg';
import cam from '../../assets/cam.svg';
import document from '../../assets/document.svg';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import IconButton from '@mui/material/IconButton';
import Layout from '../../components/searchLayout';
import { getIcondata } from '../../service/apiServices/resultServices';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import { updateParams } from '../../store/reducers/dataManageForm';
import ResolutionCarddata from '../../components/expert/cardResolution';
import ResolutionPath from './resolutionPath';

const ViewResolutions = () => {
    let location = useLocation();
    const navigate = useNavigate();
    let dispatch = useDispatch()
    console.log(location.state)
    const [resolutions, setResolutions] = useState([]);
    const [commenresolutiondata, setcommenresolutiondata] = React.useState([]);
    const [pathResolution, setPathResolution] = React.useState([]);
    const [viewedit, setViewEdit] = React.useState();
    const [iconName, setIconName] = React.useState('Resolution')
    const [pathiconName, setPathIconName] = React.useState('Resolution')



    useEffect(() => {
        getResolution();
    }, [])

    const getResolution = async () => {
        let response = await getResolutions(location.state.id);
        sessionStorage.setItem('SourceId', location.state.id)
        if (response.status === 200 && response.data.data.length !== 0) {
            setResolutions(response.data.data)
            console.log(response.data.data)
            setcommenresolutiondata(response.data.data)
            setPathResolution(response.data.data)
            // setStep(response.data.data)
            setViewEdit(true)
        } else {
            setViewEdit(false)
        }
    }

    const recommentationfunction = async (icon, id, index) => {
        let response = await getIcondata(icon, id)
        if (response.status === 200) {
            console.log(response.data.data[0])
            let array = [...commenresolutiondata]
            let objIndex = array[0]?.Resolution?.findIndex((obj => obj.SourceFileId == id))
            console.log(objIndex)
            array[0].Resolution[objIndex].Resolutionvalue = response.data.data[0].icon;
            console.log(array, "New DATA")
            // setcommenresolutiondata(response.data.data)
            setIconName(icon)
        }
    }

    const pathResolutionfunction = async (icon, id) => {
        let response = await getIcondata(icon, id)
        if (response.status === 200) {
            console.log(response.data.data)
            setPathResolution(response.data.data)
            setPathIconName(icon)
        }
    }

    const editParams = () => {
        let dd = {}
        if (sessionStorage.getItem('proType') === 'IoT') {
            dd.serialNumber = location.state.data.model
            dd.serialNoRange = location.state.data.serialNoRange
            dd.modelPrefix = location.state.data.Prefix.split(',')
            dd.faultCode = location.state.data.faultCode.split(',').map((str, i) => {
                const [code, desc] = str.split('-');
                return { code, desc };
            })
            dd.smcsCode = location.state.data.SMCScode.split(',').map(str => {
                const [descc, ...rest] = str.split('-');
                const desc = descc + '-' + rest.join('-')
                return { desc };
            })
            dispatch(updateParams({ value: dd }))
            navigate('/addSolution', { state: { act: location.state.act, id: location.state.id } })
        } else {
            dd.modelPrefix = location.state.data.Prefix.split(',')
            dd.serialNumber = location.state.data.model
            dd.complaintDescripton = location.state.data.complaintDes
            dd.serialNoRange = location.state.data.serialNoRange
            dd.problemCode = location.state.data.ProblemCode.split(',').map(str => {
                const [code, desc] = str.split('-');
                return { code, desc };
            })

            dd.smcsCode =
                location.state.data.SMCScode.split(',').map(str => {
                    const [descc, ...rest] = str.split('-');
                    const desc = descc + '-' + rest.join('-')
                    return { desc };
                })
            dispatch(updateParams({ value: dd }))
            navigate('/addSolution', { state: { act: location.state.act, id: location.state.id } })
        }

    }


    return (
        <>{viewedit ?
            <>
                <Layout>
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Box className='box-header'>
                            <h3 className="page-heading">{location.state.act} Solution</h3>
                            <Button
                                type="submit"
                                variant="contained"
                                className='btn-secondary'
                                onClick={() => navigate('/solutionDashboard')}
                            >
                                Back
                            </Button>
                        </Box>
                        <Box className='contact-info'>

                            <Card className='model-cart'>
                                {location.state.act == 'edit' && <IconButton aria-label="delete" onClick={editParams} className='sidebaredit'>
                                    <CreateIcon color='primary' fontSize='small' />
                                </IconButton>}
                                <CardContent sx={{ overflow: 'overlay', height: '100%' }}>

                                    <div className="rowdata d-block">
                                        <ul>
                                            {location.state.data.serialNoRange !== "" && <li><div className='iconwrap'><Icon.DatabaseFill className='icon' /></div> <div className='det_right'><Typography className='font-14'>Serial No :</Typography> <Typography className='text-bold'> {location.state.data.serialNoRange}</Typography></div></li>}

                                            <li>
                                                <div className='iconwrap'><Icon.GearFill className='icon' /> </div>

                                                <div className='det_right'>
                                                    <Typography className='font-14'>Model/Prefix :</Typography >
                                                    <Typography className='text-bold'>{location.state.data.model}</Typography>

                                                </div>

                                            </li>

                                            {sessionStorage.getItem('proType') !== 'Non IoT' &&
                                                <><li>

                                                    <div className='iconwrap'><Icon.ExclamationCircleFill className='icon' /> </div>
                                                    <div className='det_right'>
                                                        <Typography className='font-14'>Fault Code :</Typography>
                                                        <Typography className='text-bold'>
                                                            {
                                                                location.state.data.faultCode.split(',').map((data) => (
                                                                    <Typography className='text-bold'>{data}</Typography>
                                                                ))
                                                            }
                                                        </Typography>
                                                    </div>
                                                </li><li>
                                                        <div className='iconwrap'><Icon.ChatRightTextFill className='icon' /> </div>

                                                        <div className='det_right'><Typography className='font-14'>Fault Code Description:</Typography>

                                                            <Typography className='text-bold'>{location.state.data.faultDesc}</Typography>
                                                        </div></li></>}



                                            {sessionStorage.getItem('proType') === 'Non IoT' && <li>

                                                <div className='iconwrap'><Icon.ChatRightTextFill className='icon' /> </div>

                                                <div className='det_right'><Typography className='font-14'>Problem Code / Description :</Typography>
                                                    <Typography className='text-bold'>
                                                        {location.state.data.ProblemCode[0].split(',').map(
                                                            (probCode) => (
                                                                <Typography className="text-bold">
                                                                    {probCode}{" "}
                                                                </Typography>
                                                            )
                                                        )}
                                                    </Typography>
                                                </div>
                                            </li>}

                                            {location.state.data.SMCScode !== "" && <li>

                                                <div className='iconwrap'><Icon.BoxSeamFill className='icon' /> </div>
                                                <div className='det_right'>
                                                    <Typography className='font-14'>SMCS Component :</Typography>
                                                    <Typography className='text-bold'>
                                                        {(location.state.data && location.state.data.SMCScode[0]) ?
                                                            location.state.data.SMCScode[0].split(',').map((data) => (
                                                                <Typography className="text-bold">
                                                                    {data}{" "}
                                                                </Typography>))
                                                            :
                                                            <div>No data available</div>
                                                        }
                                                    </Typography>

                                                </div>
                                            </li>}




                                            {sessionStorage.getItem('proType') === 'Non IoT' && <li>

                                                <div className='iconwrap'><Icon.ChatRightTextFill className='icon' /> </div>
                                                <div className='det_right'><Typography className='font-14'>Complaint Description:</Typography>

                                                    <Typography className='text-bold'>{location.state.data.complaintDes}</Typography>
                                                </div></li>}

                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className='resolution-box1'>





                                {commenresolutiondata[0]?.Resolution?.map((elem, ids) => {
                                    return (
                                        <Card style={{ marginTop: '10px' }} className='solutionpath-box fo-width' >
                                            <CardContent>
                                                <ResolutionCarddata Resolution={[elem.Resolutionvalue]} commoninfo={true} source={elem.SourceFileId} statedata={location.state.data} index={ids} cardname={`General Resolution-${ids + 1}`} act={location.state.act} />
                                            </CardContent>
                                        </Card>


                                    )
                                })}
                                {resolutions[0]?.SolutionPath?.map((value, key) => (
                                    <><Card style={{ marginTop: '10px' }} className='solutionpath-box fo-width'>
                                        <CardContent>
                                            <div className='bom-align'>
                                                <Typography className='fo-border'><span className='solution-count'>{value.ResolutionPath}</span>Solution Path

                                                </Typography>
                                            </div>
                                            {value.Resolutions.map((val, key) => (
                                                <ResolutionCarddata Resolution={[val.Resolutions]} info={true} source={val.SourceFileId} statedata={location.state.data} index={key} cardname={`${value.ResolutionPath} Path Resolution-${key + 1}`} act={location.state.act} />


                                            ))}
                                            {value.Step.map((data, key) => (
                                                <><h2 className='border'>{data.ResolutionSteps}</h2>
                                                    <ResolutionCarddata Resolution={data.Resolutions} step={true} statedata={location.state.data} source={data.SourceFileId} cardname={`${value.ResolutionPath} ${data.ResolutionSteps}`} index={key} act={location.state.act} />

                                                    {data.substep.map((valu, i) => (
                                                        <><h2 className='border'>Substep{i + 1}</h2>
                                                            <ResolutionCarddata Resolution={[valu.Resolutions]} source={valu.SourceFileId} statedata={location.state.data} substep={true} index={i} act={location.state.act} cardname={`${value.ResolutionPath} Sub Step ${i + 1}`} />

                                                        </>
                                                    ))}
                                                </>
                                            ))}
                                            <>
                                                {value.Bom.length !== 0 && <Card className='resolution-box1 common-step'>
                                                    <Typography> <span> <LayersIcon className='title_icon' />BOM</span>
                                                    </Typography>
                                                    {location.state.act == 'edit' && <IconButton aria-label="delete" className='resultedit' onClick={() => { navigate('/editresolutions', { state: { data: location.state.data, value: value.Bom[0].SourceFiles_SourceFileId, type: 'BOM', apiname: 'updatebomdata' } }) }}>
                                                        <CreateIcon color='primary' fontSize='small' />
                                                    </IconButton>}
                                                </Card>}
                                                {value.Bom.length !== 0 && <Card className='resolution-cart-step'>
                                                    <CardContent>
                                                        {value.Bom.map((data, ids) => {
                                                            if (data.PartsNo != "")
                                                                return (
                                                                    <> <Accordion>
                                                                        <AccordionSummary
                                                                            expandIcon={<ExpandMoreIcon />}
                                                                            aria-controls="panel1a-content"
                                                                            id="panel1a-header"
                                                                            className='bom-box'
                                                                        >
                                                                            {/* <Card sx={{marginTop:0}} className='bom-box'>

<CardContent >    */}
                                                                            <Typography >Parts No. {data.PartsNo}</Typography>
                                                                            {/* </CardContent></Card>       */}
                                                                        </AccordionSummary>
                                                                        <AccordionDetails className='solutionaccdetails'>
                                                                            {/* 
                <Box className='knowledgebase_input_wrapperr'>
                    <Card sx={{marginTop:0,marginBottom:2}}>
                        <CardContent> */}

                                                                            <div className='bom-det'>
                                                                                <Typography>Description:</Typography>
                                                                                {data.PartsDescription &&
                                                                                    <a className="bom-txt">{data.PartsDescription}</a> || "Not Available"
                                                                                }
                                                                            </div>

                                                                            <div className='bom-det'>
                                                                                <Typography>Qty: </Typography>

                                                                                {data.Qty &&
                                                                                    <a className="bom-txt">{Math.round(data.Qty)}</a> || "Not Available"
                                                                                }
                                                                            </div>

                                                                            <div className='bom-det'>
                                                                                <Typography >Supporting Document:
                                                                                </Typography>
                                                                                <>
                                                                                    {data.PartNumberSupportingDocument && data.PartNumberSupportingDocument.split(",").map((item) => {
                                                                                        return (
                                                                                            <div>
                                                                                                <a className="bom-txt">{item}</a>
                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                        || "Not Available"
                                                                                    }
                                                                                </>
                                                                                {/* <a className="bom-txt">{data.document ?
                                                        <>{data.document.map((elem, ids) => {
                                                            return (<a className="bom-txt" href={elem} target="_blank">{elem}<br /></a>)
                                                        })}</> : <a className="bom-txt">Not Available</a>}</a> */}
                                                                            </div>
                                                                            <div className='bom-det'>
                                                                                <Typography>Note: </Typography>
                                                                                {data.Note ? <div>{data.Note}</div> :
                                                                                    <>
                                                                                        {data.NoteDocument && data.NoteDocument.split(",").map((item) => {
                                                                                            return (
                                                                                                <div>
                                                                                                    <a className="bom-txt">{item} </a>
                                                                                                </div>
                                                                                            )
                                                                                        })
                                                                                            ||
                                                                                            "Not Available"
                                                                                        }
                                                                                    </>
                                                                                }
                                                                            </div>
                                                                            {/* </CardContent></Card>
 
                </Box>   */}
                                                                        </AccordionDetails>
                                                                    </Accordion>
                                                                    </>)
                                                        })}
                                                    </CardContent>
                                                </Card>}</>
                                        </CardContent>
                                    </Card> </>


                                ))}
                            </div>

                        </Box>

                    </Container>
                </Layout>
            </>

            : <ResolutionPath />}
        </>


    )
}


export default ViewResolutions;