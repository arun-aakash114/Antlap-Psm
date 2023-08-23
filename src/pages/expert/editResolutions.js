import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Explayout from '../../components/expert/explayout';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import { Card, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CreateGeneralResolution from '../../components/expert/createGeneralResolution';
import { updateParams } from '../../store/reducers/dataManageForm';
import EditFormBom from '../../components/expert/editformBom';
import { useDispatch } from 'react-redux';
import { getCarddataforEdit } from '../../service/apiServices/resultServices';
import { updateData } from '../../store/reducers/cardData';

const Editresolutions = (props) => {
    let location = useLocation();
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const [BOM, setBom] = useState([]);
    useEffect(() => {
        async function fetchData() {
            console.log(location.state)
            if (location.state.type == 'General') {
                let Generalresponse = await getCarddataforEdit(location.state.type, location.state.value)
                console.log(Generalresponse.data.data)
                let data = Generalresponse.data.data
                let supportingDocuments = [];
                let reqsupportingDocuments = [];
                for (let i = 0; i < data[0].CommonTools.length; i++) {
                    data[0].CommonTools[i]["Quantity"] = data[0].CommonTools[i]["Qty"];
                    delete data[0].CommonTools[i]["Qty"]; // delete the old key "Qty"
                    delete data[0].CommonTools[i]["SourceFiles_SourceFileId"];
                    // Add the new key "checked" with value false to each object
                    data[0].CommonTools[i]["checked"] = false;
                    supportingDocuments.push(data[0].CommonTools[i]["PartNumberSupportingDocument"]);
                    delete data[0].CommonTools[i]["PartNumberSupportingDocument"];

                }
                if (data[0].RequiredSpecialTools.length == 0) {
                    data[0].RequiredSpecialTools = [{ checked: false, PartsNo: '123', PartsDescription: '', Quantity: '1' }]
                    data[0]["PartNumberSupportingDocumentRspl"] = supportingDocuments[0]
                } else {
                    for (let i = 0; i < data[0].RequiredSpecialTools.length; i++) {
                        data[0].RequiredSpecialTools[i]["Quantity"] = data[0].RequiredSpecialTools[i]["Qty"];
                        delete data[0].RequiredSpecialTools[i]["Qty"]; // delete the old key "Qty"
                        delete data[0].RequiredSpecialTools[i]["SourceFiles_SourceFileId"];
                        // Add the new key "checked" with value false to each object
                        data[0].RequiredSpecialTools[i]["checked"] = false;
                        reqsupportingDocuments.push(data[0].RequiredSpecialTools[i]["PartNumberSupportingDocument"]);
                        delete data[0].RequiredSpecialTools[i]["PartNumberSupportingDocument"];

                    }
                    data[0]["PartNumberSupportingDocumentRspl"] = reqsupportingDocuments[0]
                }
                data[0]["PartNumberSupportingDocument"] = supportingDocuments[0]

                dispatch(updateData({ value: data }))
            } else if (location.state.type == 'BOM') {
                let BOMresponse = await getCarddataforEdit(location.state.type, location.state.value)
                console.log(BOMresponse.data.data)
                setBom(BOMresponse.data.data)
                console.log(BOM)
            }
        }
        fetchData();
    }, [])


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
            navigate('/addSolution')
        } else {
            dd.modelPrefix = location.state.data.Prefix.split(',')
            dd.serialNumber = location.state.data.model
            dd.complaintDescripton = location.state.data.complaintDes
            dd.serialNoRange = location.state.data.serialNoRange
            dd.problemCode = location.state.data.ProblemCode.split(',').map(str => {
                const [code, desc] = str.split('-');
                return { code, desc };
            })

            dd.smcsCode = location.state.data.SMCScode.split(',').map(str => {
                const [descc, ...rest] = str.split('-');
                const desc = descc + '-' + rest.join('-')
                return { desc };
            })
            dispatch(updateParams({ value: dd }))
            navigate('/addSolution')
        }

    }

    return (
        <Explayout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <div className='crt-general-resolution'>
                    <div className='box-header dt-mgmt'>
                        <div className='tb-btns'>
                            {/* <Button className='back-btn' variant="contained" size="medium" startIcon={<ChevronLeftIcon />}
                                onClick={() => {

                                    navigate('/resolutions', { state: { data: location.state.data } })

                                }}
                            >
                                Back
                            </Button> */}
                        </div>
                    </div>
                    <Box className='contact-info'>
                        <Card className='model-cart'>
                            <CardContent sx={{ overflow: 'overlay', height: '100%' }}>
                                {location.state.act === 'edit' && <Button className='back-btn' variant="contained" size="medium" startIcon={<ChevronLeftIcon />} onClick={editParams}>
                                    Edit
                                </Button>}
                                <div className="rowdata">
                                    <ul>
                                        <li><div className='iconwrap'></div> <div className='det_right'><Typography className='font-14'>Modal</Typography> <Typography className='text-bold'>{location.state.data.model} </Typography></div></li>

                                        <li>
                                            <div className='iconwrap'> </div>

                                            <div className='det_right'>
                                                <Typography className='font-14'>Serial Prefix</Typography >
                                                <Typography className='text-bold'>{location.state.data.Prefix}</Typography>

                                            </div>

                                        </li>

                                        <li>

                                            <div className='iconwrap'> </div>

                                            <div className='det_right'>
                                                <Typography className='font-14'>Serial No.Range</Typography>
                                                <Typography className='text-bold'>{location.state.data.serialNoRange}</Typography>
                                            </div>
                                        </li>
                                        {sessionStorage.getItem('proType') !== 'Non IoT' &&
                                            <><li>

                                                <div className='iconwrap'> </div>
                                                <div className='det_right'>
                                                    <Typography className='font-14'>Fault Code</Typography>
                                                    <Typography className='text-bold'>{location.state.data.faultCode}</Typography>
                                                    <b></b> </div>
                                            </li><li>

                                                    <div className='iconwrap'> </div>

                                                    <div className='det_right'><Typography className='font-14'>Fault Code Description</Typography>
                                                        <Typography className='text-bold'>{location.state.data.faultDesc}</Typography>
                                                    </div>
                                                </li></>}

                                        {sessionStorage.getItem('proType') === 'Non IoT' &&
                                            <><li>

                                                <div className='iconwrap'> </div>
                                                <div className='det_right'>
                                                    <Typography className='font-14'>Problem / Description Code</Typography>
                                                    <Typography className='text-bold'>{location.state.data.ProblemCode}</Typography>
                                                    <b></b> </div>
                                            </li></>}
                                        <li>

                                            <div className='iconwrap'> </div>
                                            <div className='det_right'>
                                                <Typography className='font-14'>SMCS Component Code</Typography>
                                                <Typography className='text-bold'>{location.state.data.SMCScode} </Typography>

                                            </div>
                                        </li>
                                        {sessionStorage.getItem('proType') === 'Non IoT' && <li>

                                            <div className='iconwrap'> </div>
                                            <div className='det_right'>
                                                <Typography className='font-14'>Complaint Description</Typography>
                                                <Typography className='text-bold'>{location.state.data.complaintDes} </Typography>

                                            </div>
                                        </li>}

                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                        <div className='resolution-path'>
                            {location.state.type == 'General' && <CreateGeneralResolution cardname={location.state.cardname} apiname={location.state.apiname} paramdatas={location.state.data} sourcefileid={location.state.value} />}
                            {location.state.type == 'BOM' && BOM.length !== 0 && <EditFormBom bomdata={BOM} paramdatas={location.state.data} />}
                        </div>
                    </Box>
                </div>
            </Container>
        </Explayout>
    )
}

export default Editresolutions;