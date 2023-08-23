import { Container } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import Explayout from '../../components/expert/explayout'
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStep, addSubStep, changeStage, revertStepAndSubStep } from '../../store/reducers/stages';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import SaveIcon from '@mui/icons-material/Save';
import { Circles } from 'react-loader-spinner'
import ShieldIcon from '@mui/icons-material/Shield';
import FormBom from '../../components/expert/formBom';
import { updateParams } from '../../store/reducers/dataManageForm';
import CreateGeneralResolution from '../../components/expert/createGeneralResolution';
import CreateResolutionPath from '../../components/expert/createResolutionPath';
import { addinfodata } from '../../service/apiServices/aisourceCreation';
import { addSolution } from '../../store/reducers/resolutionPath';
import { commonaddSolution } from '../../store/reducers/commonresolutionPath';
import { clearData } from '../../store/reducers/cardData';
import { DoneOutline } from '@mui/icons-material';
import { getDataForApi } from '../../store/reducers/cardData';
import { addinfostepdata, addinfosubstepdata, generalResolution, submit } from '../../service/apiServices/aisourceCreation';
import { updateToast } from '../../store/reducers/toasters';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';

const alphabets = [
    '', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]


const ResolutionPath = (props) => {
    let { stages, cardData, toaster } = useSelector(state => state);
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const location = useLocation();
    // ______________ Create General Resolution

    const [generalResol, setGeneralResol] = React.useState([]);
    const [disablestatus, setDisablestatus] = React.useState({});
    const [currentstage, setCurrentstage] = React.useState('');
    const [error, setError] = React.useState({});
    const creategeneralresref = useRef();
    const addgeneralresref = useRef();

    const [addindex, setAddIndex] = React.useState(1);


    useEffect(() => {
        sessionStorage.setItem('buttonsDisable', true)
        sessionStorage.setItem('resolutionPathInd', 1);
        sessionStorage.removeItem('res')
        setAddIndex(1)
    }, [])

    const addGeneralResol = () => {
        setCurrentstage('create')
        dispatch(clearData())
        const addGenRes = [...generalResol, []]
        dispatch(commonaddSolution({ value: generalResol }))
        setGeneralResol(addGenRes)
        sessionStorage.removeItem('res')
        console.log("genres", generalResol)
        dispatch((changeStage('GenaralRes')))
        setDisablestatus({ ...disablestatus, add: false, create: true })
    }

    // ______________ Delete General Resolution

    const delGeneralResol = (i) => {
        const delGenRes = [...generalResol]
        delGenRes.splice(i, 1)
        setGeneralResol(delGenRes)
    }

    // ______________ Create Resolution Path

    const [resolPath, setResolPath] = React.useState([]);


    const addResolPath = () => {
        let res = sessionStorage.getItem('res');
        if (!res || res.length === 0) {
            console.log('dafd');
            setCurrentstage('add')
            dispatch(clearData())
            dispatch(revertStepAndSubStep())
            dispatch(changeStage('Solution Path'))
            const addResPath = [...resolPath, []]
            dispatch(addSolution({ value: resolPath }))
            setResolPath(addResPath)
            sessionStorage.removeItem('res')
            setDisablestatus({ ...disablestatus, add: true })

            if (currentstage !== 'create' && currentstage !== '') {
                let resPathInd = sessionStorage.getItem('resolutionPathInd');
                sessionStorage.setItem('resolutionPathInd', Number(resPathInd) + 1)
                setAddIndex(Number(resPathInd) + 1)
            }
        } else {
            alert('Please save the data')
        }
    }


    // ______________ Create BOM

    const [bomSectn, setbomSectn] = React.useState([]);

    const addBomSectn = () => {
        const addBom = [...bomSectn, []]
        setbomSectn(addBom)
    }

    const submitForApproval = async () => {
        sessionStorage.removeItem('res')
        let res = await submit({ tenantId: localStorage.getItem('TenantId'), sourceId: sessionStorage.getItem('SourceId') });
        if (res.code === 200) {
            navigate('/solutionDashboard')
            window.location.reload(true)
        }
    }

    // ______________ BOM Data



    // _____________________  ai resolution path - Data submit

    const resPathDataSubmit = async () => {
        // console.log("res path")
        let val = creategeneralresref.current.getresolutionvalue();
        let reso = sessionStorage.getItem('res')
        if (reso.length < 10) {
            alert('Please enter resolution')
        } else {

            setError({
                resolution: ''
            })
            dispatch(updateToast({ field: 'valid' }));
            let proType = sessionStorage.getItem('proType');
            dispatch(getDataForApi())
            let payload
            if (stages.stage === 'Solution Path') {
                if (proType === 'Non IoT') {

                    payload = {
                        type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                        tenantId: localStorage.getItem('TenantId'),
                        model: location.state.data.model ? location.state.data.model : '',
                        Prefix: location.state.data.Prefix ? location.state.data.Prefix : '',
                        serialNoRange: location.state.data.serialNoRange ? location.state.data.serialNoRange : '',
                        SMCScode: location.state.data.SMCScode ? location.state.data.SMCScode : '',
                        path: alphabets[sessionStorage.getItem('resolutionPathInd')],
                        ProblemCode: location.state.data.ProblemCode ? location.state.data.ProblemCode : '',
                        complaintDes: location.state.data.complaintDes ? location.state.data.complaintDes : '',
                        sourceId: sessionStorage.getItem('SourceId'),
                        info: [
                            {
                                Resolutions: val ? val : reso,
                                CommonTools: [],
                                RequiredSpecialTools: [],
                                SupportingDocument: cardData.SupportingDocumentURL,
                                Photo: cardData.PhotoURL,
                                Video: cardData.VideoURL,
                                Note: cardData.Note,
                                NoteDocument: cardData.NoteDocumentURL
                            }
                        ]

                    }

                } else {
                    payload = {
                        type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                        tenantId: localStorage.getItem('TenantId'),
                        model: location.state.data.model ? location.state.data.model : '',
                        Prefix: location.state.data.Prefix ? location.state.data.Prefix : '',
                        serialNoRange: location.state.data.serialNoRange ? location.state.data.serialNoRange : '',
                        faultCode: location.state.data.faultCode ? location.state.data.faultCode : '',
                        faultCodeDes: location.state.data.faultDesc ? location.state.data.faultDesc : '',
                        SMCScode: location.state.data.SMCScode ? location.state.data.SMCScode : '',
                        path: alphabets[sessionStorage.getItem('resolutionPathInd')],
                        sourceId: sessionStorage.getItem('SourceId'),
                        info: [
                            {
                                Resolutions: val ? val : reso,
                                CommonTools: [],
                                RequiredSpecialTools: [],
                                SupportingDocument: [cardData.SupportingDocumentURL.toString()],
                                Photo: cardData.PhotoURL,
                                Video: cardData.VideoURL,
                                Note: cardData.Note,
                                NoteDocument: cardData.NoteDocumentURL
                            }
                        ]

                    }

                }
                payload.info[0].CommonTools.push(
                    {
                        PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentURL || ""
                    }
                )
                payload.info[0].RequiredSpecialTools.push(
                    {
                        PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentRsplURL || ""
                    }
                )
                for (let row of cardData.CommonTools) {
                    if (row.PartsNo.length !== 0) {
                        payload.info[0].CommonTools.push(row)
                    }
                }
                for (let row of cardData.RequiredSpecialTools) {
                    if (row.PartsNo.length !== 0) {
                        payload.info[0].RequiredSpecialTools.push(row)
                    }
                }
                let res = await addinfodata(payload);
                if (res.code === 200) {
                    alert('Data added successfully')
                    sessionStorage.setItem('buttonsDisable', false)
                    sessionStorage.removeItem('res')
                    dispatch(updateToast({ field: 'revertLoader' }));
                    dispatch(clearData())
                    setAddMore(false)
                    setDisablestatus({ ...disablestatus, create: true, add: false })
                }
            } else if (stages.stage === 'GenaralRes') {
                if (proType === 'Non IoT') {

                    payload = {
                        type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                        tenantId: localStorage.getItem('TenantId'),
                        model: location.state.data.model ? location.state.data.model : '',
                        Prefix: location.state.data.Prefix ? location.state.data.Prefix : '',
                        serialNoRange: location.state.data.serialNoRange ? location.state.data.serialNoRange : '',
                        SMCScode: location.state.data.SMCScode ? location.state.data.SMCScode : '',
                        ProblemCode: location.state.data.ProblemCode ? location.state.data.ProblemCode : '',
                        complaintDes: location.state.data.complaintDes ? location.state.data.complaintDes : '',
                        sourceId: sessionStorage.getItem('SourceId'),
                        commoninfo: [
                            {
                                Resolutions: val ? val : reso,
                                CommonTools: [],
                                RequiredSpecialTools: [],
                                SupportingDocument: cardData.SupportingDocumentURL,
                                Photo: cardData.PhotoURL,
                                Video: cardData.VideoURL,
                                Note: cardData.Note,
                                NoteDocument: cardData.NoteDocumentURL
                            }
                        ]

                    }

                } else {
                    console.log('');
                    payload = {
                        type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                        tenantId: localStorage.getItem('TenantId'),
                        model: location.state.data.model ? location.state.data.model : '',
                        Prefix: location.state.data.Prefix ? location.state.data.Prefix : '',
                        serialNoRange: location.state.data.serialNoRange ? location.state.data.serialNoRange : '',
                        faultCode: location.state.data.faultCode ? location.state.data.faultCode : '',
                        faultCodeDes: location.state.data.faultCodeDes ? location.state.data.faultCodeDes : '',
                        SMCScode: location.state.data.SMCScode ? location.state.data.SMCScode : '',
                        sourceId: sessionStorage.getItem('SourceId'),
                        commoninfo: [
                            {
                                Resolutions: val ? val : reso,
                                CommonTools: [],
                                RequiredSpecialTools: [],
                                SupportingDocument: cardData.SupportingDocumentURL,
                                Photo: cardData.PhotoURL,
                                Video: cardData.VideoURL,
                                Note: cardData.Note,
                                NoteDocument: cardData.NoteDocumentURL
                            }
                        ]

                    }
                }
                payload.commoninfo[0].CommonTools.push(
                    {
                        PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentURL || ""
                    }
                )
                payload.commoninfo[0].RequiredSpecialTools.push(
                    {
                        PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentRsplURL || ""
                    }
                )
                for (let row of cardData.CommonTools) {
                    if (row.PartsNo.length !== 0) {
                        payload.commoninfo[0].CommonTools.push(row)
                    }
                }
                for (let row of cardData.RequiredSpecialTools) {
                    if (row.PartsNo.length !== 0) {
                        payload.commoninfo[0].RequiredSpecialTools.push(row)
                    }
                }
                let res = await generalResolution(payload);
                if (res.code === 200) {
                    alert('Data added successfully')
                    sessionStorage.setItem('buttonsDisable', false)
                    dispatch(updateToast({ field: 'revertLoader' }));
                    dispatch(clearData())
                    setAddMore(false)
                    sessionStorage.removeItem('res')
                }

            } else if (stages.stage === 'Step') {
                if (proType === 'Non IoT') {
                    payload = {
                        type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                        tenantId: localStorage.getItem('TenantId'),
                        model: location.state.data.model ? location.state.data.model : '',
                        Prefix: location.state.data.Prefix ? location.state.data.Prefix : '',
                        serialNoRange: location.state.data.serialNoRange ? location.state.data.serialNoRange : '',
                        ProblemCode: location.state.data.ProblemCode ? location.state.data.ProblemCode : '',
                        complaintDes: location.state.data.complaintDes ? location.state.data.complaintDes : '',
                        SMCScode: location.state.data.SMCScode ? location.state.data.SMCScode : '',
                        sourceId: sessionStorage.getItem('SourceId'),
                        step: `Step ${stages.stepIndex}`,
                        path: alphabets[sessionStorage.getItem('resolutionPathInd')],
                        info: [
                            {
                                Resolutions: val ? val : reso,
                                CommonTools: [],
                                RequiredSpecialTools: [],
                                SupportingDocument: cardData.SupportingDocumentURL,
                                Photo: cardData.PhotoURL,
                                Video: cardData.VideoURL,
                                Note: cardData.Note,
                                NoteDocument: cardData.NoteDocumentURL
                            }
                        ]
                    }
                } else {
                    payload = {
                        type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                        tenantId: localStorage.getItem('TenantId'),
                        model: location.state.data.model ? location.state.data.model : '',
                        Prefix: location.state.data.Prefix ? location.state.data.Prefix : '',
                        serialNoRange: location.state.data.serialNoRange ? location.state.data.serialNoRange : '',
                        SMCScode: location.state.data.SMCScode ? location.state.data.SMCScode : '',
                        faultCode: location.state.data.faultCode ? location.state.data.faultCode : '',
                        faultCodeDes: location.state.data.faultDesc ? location.state.data.faultDesc : '',
                        step: `Step ${stages.stepIndex}`,
                        sourceId: sessionStorage.getItem('SourceId'),
                        path: alphabets[sessionStorage.getItem('resolutionPathInd')],
                        info: [
                            {
                                Resolutions: val ? val : reso,
                                CommonTools: [],
                                RequiredSpecialTools: [],
                                SupportingDocument: cardData.SupportingDocumentURL,
                                Photo: cardData.PhotoURL,
                                Video: cardData.VideoURL,
                                Note: cardData.Note,
                                NoteDocument: cardData.NoteDocumentURL
                            }
                        ]
                    }

                }
                payload.info[0].CommonTools.push(
                    {
                        PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentURL || "",
                    }
                )
                payload.info[0].RequiredSpecialTools.push(
                    {
                        PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentRsplURL || ""
                    }
                )
                for (let row of cardData.CommonTools) {
                    if (row.PartsNo.length !== 0) {

                        payload.info[0].CommonTools.push(row)
                    }
                }
                for (let row of cardData.RequiredSpecialTools) {
                    if (row.PartsNo.length !== 0) {

                        payload.info[0].RequiredSpecialTools.push(row)
                    }
                }

                let res = await addinfostepdata(payload);
                if (res.code === 200) {
                    alert('Data added successfully')
                    sessionStorage.setItem('buttonsDisable', false)
                    dispatch(updateToast({ field: 'revertLoader' }));
                    sessionStorage.removeItem('res')
                    dispatch(clearData())
                    setAddMore(false)
                    setDisablestatus({ ...disablestatus, add: false, create: true })
                }

            } else {
                //sub-step
                if (proType === 'Non IoT') {
                    payload = {
                        type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                        tenantId: localStorage.getItem('TenantId'),
                        model: location.state.data.model ? location.state.data.model : '',
                        Prefix: location.state.data.Prefix ? location.state.data.Prefix : '',
                        serialNoRange: location.state.data.serialNoRange ? location.state.data.serialNoRange : '',
                        ProblemCode: location.state.data.ProblemCode ? location.state.data.ProblemCode : '',
                        SMCScode: location.state.data.SMCScode ? location.state.data.SMCScode : '',
                        complaintDes: location.state.data.complaintDes ? location.state.data.complaintDes : '',
                        sourceId: sessionStorage.getItem('SourceId'),
                        step: `Sub Step ${stages.stepIndex}`,
                        path: alphabets[sessionStorage.getItem('resolutionPathInd')],
                        info: [
                            {
                                Resolutions: val ? val : reso,
                                CommonTools: [],
                                RequiredSpecialTools: [],
                                SupportingDocument: cardData.SupportingDocumentURL,
                                Photo: cardData.PhotoURL,
                                Video: cardData.VideoURL,
                                Note: cardData.Note,
                                NoteDocument: cardData.NoteDocumentURL
                            }
                        ]
                    }
                } else {
                    payload = {
                        type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                        tenantId: localStorage.getItem('TenantId'),
                        model: location.state.data.model ? location.state.data.model : '',
                        Prefix: location.state.data.Prefix ? location.state.data.Prefix : '',
                        serialNoRange: location.state.data.serialNoRange ? location.state.data.serialNoRange : '',
                        SMCScode: location.state.data.SMCScode ? location.state.data.SMCScode : '',
                        faultCode: location.state.data.faultCode ? location.state.data.faultCode : '',
                        faultCodeDes: location.state.data.faultDesc ? location.state.data.faultDesc : '',
                        sourceId: sessionStorage.getItem('SourceId'),
                        step: `Sub Step ${stages.stepIndex}`,
                        path: alphabets[sessionStorage.getItem('resolutionPathInd')],
                        info: [
                            {
                                Resolutions: val ? val : reso,
                                CommonTools: [],
                                RequiredSpecialTools: [],
                                SupportingDocument: cardData.SupportingDocumentURL,
                                Photo: cardData.PhotoURL,
                                Video: cardData.VideoURL,
                                Note: cardData.Note,
                                NoteDocument: cardData.NoteDocumentURL
                            }
                        ]
                    }

                }
                payload.info[0].CommonTools.push(
                    {
                        PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentURL || ""
                    }
                )
                payload.info[0].RequiredSpecialTools.push(
                    {
                        PartNumberSupportingDocument: cardData.PartNumberSupportingDocumentRsplURL || ""
                    }
                )
                for (let row of cardData.CommonTools) {
                    if (row.PartsNo.length !== 0) {

                        payload.info[0].CommonTools.push(row)
                    }
                }
                for (let row of cardData.RequiredSpecialTools) {
                    if (row.PartsNo.length !== 0) {

                        payload.info[0].RequiredSpecialTools.push(row)
                    }
                }

                let res = await addinfosubstepdata(payload);
                if (res.code === 200) {
                    alert('Data added successfully')
                    sessionStorage.setItem('buttonsDisable', false)
                    sessionStorage.removeItem('res')
                    setAddMore(false)
                    dispatch(updateToast({ field: 'revertLoader' }));
                    dispatch(clearData())
                }

            }
        }


    }
    const [addmore, setAddMore] = useState(true)
    const addMore = () => {
        dispatch(clearData());
        sessionStorage.setItem('buttonsDisable', true);
        sessionStorage.removeItem('res')
        setAddMore(true)
    }

    const editParams = () => {
        console.log(location.state.data)
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

    const ddStep = () => {
        let respo = sessionStorage.getItem('res');
        if (!respo) {
            if (stages.stepIndex > 0 && creategeneralresref.current.getresolutionvalue().length === 0 && sessionStorage.getItem('buttonsDisable') === 'true') {
                alert('Please enter the data and save it')

            } else {
                dispatch(addStep())
                // console.log('ddd', stages.stage);
                sessionStorage.setItem('stage', 'resolutionPathStep')
                dispatch(clearData())
                sessionStorage.setItem('buttonsDisable', true);
                sessionStorage.removeItem('res')
            }
        } else {
            alert('Please save the data')
        }
    }

    console.log(location.state.data.ProblemCode)

    return (
        <Explayout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {/* Create General Resolution layout ---------------------------------------------- */}
                {toaster.loader === true && <Circles
                    height="80"
                    width="80"
                    color="#2c79ff"
                    ariaLabel="circles-loading"
                    wrapperStyle={{
                        position: 'absolute',
                        top: '45%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                    wrapperClass="loader-style"
                    visible={true}
                />}

                <div className='crt-general-resolution'>
                    <div className='box-header dt-mgmt'>
                        <h2 className="page-heding">Create General Resolution </h2>

                        <div className='tb-btns'>
                            {/* <Button
                                className='back-btn'
                                variant="contained"
                                size="medium"
                                startIcon={<ChevronLeftIcon />}
                                onClick={() => {
                                    let resPathInd = sessionStorage.getItem('resolutionPathInd');
                                    if (resPathInd == 1) {
                                        navigate('/addSolution')
                                    }
                                    else {
                                        sessionStorage.setItem('resolutionPathInd', Number(resPathInd) - 1)
                                        setAddIndex(Number(resPathInd) - 1)
                                    }
                                }}
                            >
                                Back
                            </Button> */}

                            <Button variant="contained" size="medium" color={disablestatus.add ? "secondary" : 'primary'} disabled={disablestatus.add} startIcon={< ShieldIcon />} onClick={() => addResolPath()}>
                                Add Resolution Path
                            </Button>


                            < Button variant="contained" size="medium" color={disablestatus.create ? "secondary" : 'primary'} disabled={disablestatus.create} startIcon={<AddIcon />} onClick={() => addGeneralResol()}>
                                Create General Resolution
                            </Button>



                        </div>
                    </div>


                    <Box className='contact-info'>
                        {/* _____________________ Left Panel _____________________ */}
                        <Card className='model-cart'>
                            {location.state.act == 'edit' && <IconButton aria-label="delete" onClick={editParams} className='sidebaredit'>
                                <CreateIcon color='primary' fontSize='small' />
                            </IconButton>}
                            <CardContent sx={{ overflow: 'overlay', height: '100%' }}>
                                {/* {location.state.act === 'edit' && <Button className='back-btn' variant="contained" size="medium" startIcon={<ChevronLeftIcon />} onClick={editParams}>
                                    Edit
                                </Button>} */}
                                <div className="rowdata">
                                    <ul>
                                        <li><div className='iconwrap'></div> <div className='det_right'><Typography className='font-14'>Modal</Typography> <Typography className='text-bold'>{location.state.data.model} </Typography></div></li>

                                        <li>
                                            <div className='iconwrap'> </div>
                                            {location.state.data.Prefix &&
                                                <div className='det_right'>
                                                    <Typography className='font-14'>Serial Prefix</Typography >
                                                    <Typography className='text-bold'>{location.state.data.Prefix}</Typography>

                                                </div>
                                            }

                                        </li>

                                        <li>

                                            <div className='iconwrap'> </div>
                                            {location.state.data.serialNoRange &&

                                                <div className='det_right'>
                                                    <Typography className='font-14'>Serial No.Range</Typography>
                                                    <Typography className='text-bold'>{location.state.data.serialNoRange}</Typography>
                                                </div>
                                            }
                                        </li>
                                        {sessionStorage.getItem('proType') !== 'Non IoT' &&
                                            <><li>

                                                <div className='iconwrap'> </div>
                                                {
                                                    location.state.data.faultCode &&

                                                    <div className='det_right'>
                                                        <Typography className='font-14'>Fault Code</Typography>
                                                        <Typography className='text-bold'>{location.state.data.faultCode}</Typography>
                                                    </div>
                                                }
                                            </li><li>

                                                    <div className='iconwrap'> </div>

                                                    <div className='det_right'><Typography className='font-14'>Fault Code Description</Typography>
                                                        <Typography className='text-bold'>{location.state.data.faultCodeDes}</Typography>
                                                    </div>
                                                </li></>}

                                        {sessionStorage.getItem('proType') === 'Non IoT' &&
                                            <><li>

                                                <div className='iconwrap'> </div>
                                                <div className='det_right'>
                                                    <Typography className='font-14'>Problem / Description Code</Typography>
                                                    {
                                                        location.state.data.ProblemCode[0].split(',').map((prblm) =>
                                                            <Typography className='text-bold'>{prblm}</Typography>
                                                        )
                                                    }
                                                    <b></b> </div>
                                            </li></>}
                                        <li>

                                            <div className='iconwrap'> </div>
                                            {
                                                location.state.data.SMCScode &&
                                                <div className='det_right'>
                                                    <Typography className='font-14'>SMCS Component Code</Typography>
                                                    {(location.state.data && location.state.data.SMCScode[0]) ?
                                                        location.state.data.SMCScode[0].split(',').map((data) => (
                                                            <Typography className="text-bold">
                                                                {data}{" "}
                                                            </Typography>))
                                                        :
                                                        <div>No data available</div>
                                                    }
                                                </div>
                                            }
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
                            {/* _____________________ General Resolution _____________________ */}

                            {
                                stages.stage === 'GenaralRes' &&

                                <CreateGeneralResolution ref={creategeneralresref} />
                            }



                            {/* _____________________ Resolution Path _____________________ */}

                            <div className='add-resol-path'>
                                {
                                    (stages.stage === 'Solution Path' || stages.stage === 'Step' || stages.stage === 'Sub Step') &&
                                    <CreateResolutionPath ref={creategeneralresref} />
                                }

                            </div>

                            {/* _____________________ Add BOM _____________________ */}
                            {
                                stages.stage === 'Bom' &&

                                <div className='bom-content-wrapper'>
                                    <FormBom />
                                </div>
                            }
                            {error.resolution && <div className='error'>{error.resolution}</div>}
                            <Box className='card-btns'>
                                {
                                    (['GenaralRes', 'Solution Path', 'Step', 'Sub Step'].includes(stages.stage)) &&
                                    <Button variant="outlined" size="medium" color="primary" startIcon={<SaveIcon />} onClick={resPathDataSubmit}>
                                        Save
                                    </Button>
                                }
                                {
                                    (['Solution Path', 'Step', 'Sub Step'].includes(stages.stage)) &&
                                    <Button variant="contained" size="medium" color="primary" startIcon={< ShieldIcon />} onClick={() => ddStep()}>
                                        Add step
                                    </Button>
                                }
                                {
                                    (['Solution Path', 'GenaralRes'].includes(stages.stage)) &&
                                    <Button variant="contained" size="medium" color="primary" disabled={addmore} startIcon={< AddIcon />} onClick={() => addMore()}>
                                        Add More
                                    </Button>
                                }
                                {
                                    (['Sub Step', 'Step', 'Solution Path'].includes(stages.stage)) &&

                                    <Button variant="contained" size="medium" color="primary" disabled={sessionStorage.getItem('buttonsDisable') === 'true' ? true : false} startIcon={< AddIcon />} onClick={() => { dispatch(changeStage('Bom')); sessionStorage.setItem('buttonsDisable', true) }}>
                                        Add BOM
                                    </Button>
                                }
                                {
                                    (stages.stage === 'Step' || stages.stage === 'Sub Step') &&
                                    <Button variant="contained" disabled={sessionStorage.getItem('buttonsDisable') === 'true' ? true : false} size="medium" color="primary" startIcon={< AddIcon />} onClick={() => { dispatch(addSubStep()); sessionStorage.setItem('buttonsDisable', true); sessionStorage.removeItem('res') }}>
                                        Add SubStep
                                    </Button>
                                }
                                {
                                    (stages.stage === 'Bom') &&
                                    <Button variant="contained" size="medium" color="primary" startIcon={<DoneOutline />} onClick={() => submitForApproval()}>
                                        Submit for Approval
                                    </Button>
                                }
                            </Box>
                        </div>
                    </Box>
                </div>
            </Container>
        </Explayout >
    )
}

export default ResolutionPath
