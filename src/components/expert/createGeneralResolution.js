import React, { useEffect, useImperativeHandle, useState } from 'react'
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';

// import '../../App.css'
import cam from '../../assets/cam.svg';
import setting from '../../assets/settingsicon.svg';
import notes from '../../assets/notes.svg';
import file from '../../assets/file.svg';
import toolicon from '../../assets/toolicon.svg';
import document from '../../assets/document.svg';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Checkbox from '@mui/material/Checkbox';
import { addData, addRow, deleteRow, checkboxclick, commonToolsData, specialToolsData, clearData, deleteURL, getDataForApi, updateFiles } from '../../store/reducers/cardData';
import { Deletefiles, updateAPI } from '../../service/apiServices/aisourceCreation';
import { updateToast } from '../../store/reducers/toasters';
import { fileHandleing } from '../../service/apiServices/aisourceCreation';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CreateGeneralResolution = React.forwardRef((props, ref) => {
    const dispatch = useDispatch()
    let { cardData } = useSelector(state => state)
    const [iconName, setIconName] = React.useState(sessionStorage.getItem('cardPanel'))
    const [solIconName, setSolIconName] = React.useState('General')
    const [resolutionText, setResolutionText] = React.useState('');
    const recommentationfunction = (e, index, data) => {
        e.preventDefault();
        setIconName(data + index);
        sessionStorage.setItem('cardPanel', data + index)
        sessionStorage.setItem('focus', 'PartsNo0')
        // console.log('data', index)
    }

    //_____________________ Bootstrap Input
    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        'label + &': {
            marginTop: theme.spacing(3),
        },
        '& .MuiInputBase-input': {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
            border: '1px solid #ced4da',
            fontSize: 16,
            width: 'auto',
            padding: '10px 12px',
            transition: theme.transitions.create([
                'border-color',
                'background-color',
                'box-shadow',
            ]),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
                borderColor: theme.palette.primary.main,
            },
        },
    }));

    // ______________ Accordion Table
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    // ______________ Accordion Expand

    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (index, panel) => (isExpanded) => {
        setExpanded(isExpanded ? panel : false);

        setIconName(`gr_resolution${index}`);
        // console.log('index', index)
    };




    // ______________ Create Sub General Resolution

    const [subGeneralResol, setSubGeneralResol] = React.useState([]);
    const [subGenIndex, setSubGenIndex] = React.useState([]);

    useEffect(() => {
        addSubGeneralResol();
        if (props.cardname) {
            // console.log('fdafsdafdags');
            sessionStorage.setItem('res', cardData.Resolutions)
        }
    }, [])

    const addSubGeneralResol = (index) => {

        const addSubGenRes = [...subGeneralResol, []]
        setSubGeneralResol(addSubGenRes)

        setSubGenIndex(index)

        // console.log("subGenIndex", subGeneralResol)

    }

    // ______________ BOM Data

    function createData(partno, desc, qty, sdoc, notes) {
        return { partno, desc, qty, sdoc, notes };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    // _________________________  Common Tools Form

    // const [ctForm, setCtForm] = useState("");
    const [ctFormData, setCtFormData] = useState([
        {
            checkbox: false,
            partNo: '',
            partDesc: '',
            quty: ''
        }
    ]);

    // const { pno, pdesc, pqty } = ctForm;

    const ctFormHandleChange = (e, i, field) => {
        let arrayData = [...ctFormData];
        arrayData[i].field = e.target.value;
        setCtFormData(arrayData)
    };

    // _________________________  Add Common Tools Row

    const AddCtForm = (e) => {
        e.preventDefault();
        let array = [...ctFormData]
        array.push(
            {
                checkbox: false,
                partNo: '',
                partDesc: '',
                quty: ''
            }
        )
        setCtFormData(array)
        // console.log('ddd', ctFormData)
    };


    //___________________________ Common Tools check box change event
    const ctCbhandleChange = (e, i) => {
        let arrayData = [...ctFormData]
        arrayData[i].checkbox = e.target.checked
    }


    //___________________________ Delete Common Tools Row

    const DelCtForm = (e) => {
        const delCtForm = [...ctFormData]
        delCtForm.forEach((row, i) => {
            if (row.checkbox) {
                delCtForm.splice(i, 1)
            }
        })
        setCtFormData(delCtForm)

    }

    const handleDelete = (name, value, index) => {
        console.log(name, value, index)
        dispatch(deleteURL({ name: name, index: index }))
    }
    const handleClick = (name, value, index) => {
        window.open(value, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    }

    const [files, setFiles] = React.useState([])
    const getFile = (e) => {
        setFiles([...files, e.target.files[0]])
    }
    const fileUpload = async (file, field, url) => {
        // let arr = [];
        console.log('file', file)
        let docName = []
        const formData = new FormData();
        for (let i = 0; i < file.length; i++) {
            if (!cardData[field].includes(file[i].name)) {
                docName.push(file[i].name)
                formData.append("files", file[i]);
            }
        }
        let count = 0;
        for (let i of formData.keys()) {
            count += 1;
        }
        if (count) {
            let res = await fileHandleing(formData)
            if (res.status === 200) {
                dispatch(addData({ field: field, value: docName }));
                dispatch(addData({ field: url, value: res.path }))
            }
        }
    }

    const SaveEditData = async () => {
        console.log(props.apiname)
        dispatch(updateToast({ field: 'valid' }));
        let proType = sessionStorage.getItem('proType');
        dispatch(getDataForApi())
        let payload
        if (props.apiname === 'updateinfodata') {
            if (proType === 'Non IoT') {

                payload = {
                    type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                    tenantId: localStorage.getItem('TenantId'),
                    model: props.paramdatas.model ? props.paramdatas.model : '',
                    Prefix: props.paramdatas.Prefix ? props.paramdatas.Prefix : '',
                    serialNoRange: props.paramdatas.serialNoRange ? props.paramdatas.serialNoRange : '',
                    SMCScode: props.paramdatas.SMCScode ? props.paramdatas.SMCScode : '',
                    ProblemCode: props.paramdatas.ProblemCode ? props.paramdatas.ProblemCode : '',
                    complaintDes: props.paramdatas.complaintDes ? props.paramdatas.complaintDes : '',
                    sourceId: sessionStorage.getItem('SourceId'),
                    SourceFileId: props.sourcefileid,
                    info: [
                        {
                            Resolutions: resolutionText ? resolutionText : cardData.Resolutions,
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
                    model: props.paramdatas.model ? props.paramdatas.model : '',
                    Prefix: props.paramdatas.Prefix ? props.paramdatas.Prefix : '',
                    serialNoRange: props.paramdatas.serialNoRange ? props.paramdatas.serialNoRange : '',
                    faultCode: props.paramdatas.faultCode ? props.paramdatas.faultCode : '',
                    faultCodeDes: props.paramdatas.faultDesc ? props.paramdatas.faultDesc : '',
                    SMCScode: props.paramdatas.SMCScode ? props.paramdatas.SMCScode : '',
                    sourceId: sessionStorage.getItem('SourceId'),
                    SourceFileId: props.sourcefileid,
                    info: [
                        {
                            Resolutions: resolutionText ? resolutionText : cardData.Resolutions,
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
            let res = await updateAPI(props.apiname, payload);
            if (res.code === 200) {
                alert('Data Edited successfully')
                dispatch(updateToast({ field: 'revertLoader' }));
                dispatch(clearData())
                sessionStorage.setItem('buttonsDisable', false)
            }
        } else if (props.apiname === 'updategeneralResolution') {
            if (proType === 'Non IoT') {

                payload = {
                    type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                    tenantId: localStorage.getItem('TenantId'),
                    model: props.paramdatas.model ? props.paramdatas.model : '',
                    Prefix: props.paramdatas.Prefix ? props.paramdatas.Prefix : '',
                    serialNoRange: props.paramdatas.serialNoRange ? props.paramdatas.serialNoRange : '',
                    SMCScode: props.paramdatas.SMCScode ? props.paramdatas.SMCScode : '',
                    ProblemCode: props.paramdatas.ProblemCode ? props.paramdatas.ProblemCode : '',
                    complaintDes: props.paramdatas.complaintDes ? props.paramdatas.complaintDes : '',
                    sourceId: sessionStorage.getItem('SourceId'),
                    SourceFileId: props.sourcefileid,
                    commoninfo: [
                        {
                            Resolutions: resolutionText ? resolutionText : cardData.Resolutions,
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
                    model: props.paramdatas.model ? props.paramdatas.model : '',
                    Prefix: props.paramdatas.Prefix ? props.paramdatas.Prefix : '',
                    serialNoRange: props.paramdatas.serialNoRange ? props.paramdatas.serialNoRange : '',
                    faultCode: props.paramdatas.faultCode ? props.paramdatas.faultCode : '',
                    faultCodeDes: props.paramdatas.faultDesc ? props.paramdatas.faultDesc : '',
                    SMCScode: props.paramdatas.SMCScode ? props.paramdatas.SMCScode : '',
                    sourceId: sessionStorage.getItem('SourceId'),
                    SourceFileId: props.sourcefileid,
                    commoninfo: [
                        {
                            Resolutions: resolutionText ? resolutionText : cardData.Resolutions,
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
            let res = await updateAPI('updategeneralResolution', payload);
            if (res.code === 200) {
                alert('Data Edited successfully')
                dispatch(updateToast({ field: 'revertLoader' }));
                dispatch(clearData())
                sessionStorage.setItem('buttonsDisable', false)
            }

        } else if (props.apiname === 'updateinfostepdata') {
            let [pathname, ...stepname] = props.cardname.split(" ");
            if (proType === 'Non IoT') {
                payload = {
                    type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                    tenantId: localStorage.getItem('TenantId'),
                    model: props.paramdatas.model ? props.paramdatas.model : '',
                    Prefix: props.paramdatas.Prefix ? props.paramdatas.Prefix : '',
                    serialNoRange: props.paramdatas.serialNoRange ? props.paramdatas.serialNoRange : '',
                    ProblemCode: props.paramdatas.ProblemCode ? props.paramdatas.ProblemCode : '',
                    complaintDes: props.paramdatas.complaintDes ? props.paramdatas.complaintDes : '',
                    SMCScode: props.paramdatas.SMCScode ? props.paramdatas.SMCScode : '',
                    sourceId: sessionStorage.getItem('SourceId'),
                    SourceFileId: props.sourcefileid,
                    step: stepname,
                    path: pathname,
                    info: [
                        {
                            Resolutions: resolutionText ? resolutionText : cardData.Resolutions,
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
                    model: props.paramdatas.model ? props.paramdatas.model : '',
                    Prefix: props.paramdatas.Prefix ? props.paramdatas.Prefix : '',
                    serialNoRange: props.paramdatas.serialNoRange ? props.paramdatas.serialNoRange : '',
                    SMCScode: props.paramdatas.SMCScode ? props.paramdatas.SMCScode : '',
                    faultCode: props.paramdatas.faultCode ? props.paramdatas.faultCode : '',
                    faultCodeDes: props.paramdatas.faultDesc ? props.paramdatas.faultDesc : '',
                    step: stepname,
                    sourceId: sessionStorage.getItem('SourceId'),
                    SourceFileId: props.sourcefileid,
                    path: pathname,
                    info: [
                        {
                            Resolutions: resolutionText ? resolutionText : cardData.Resolutions,
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

            let res = await updateAPI('updateinfostepdata', payload);
            if (res.code === 200) {
                alert('Data Edited successfully')
                dispatch(updateToast({ field: 'revertLoader' }));
                dispatch(clearData())
                sessionStorage.setItem('buttonsDisable', false)
            }

        } else {
            //sub-step
            let [pathname, ...stepname] = props.cardname.split(" ");
            if (proType === 'Non IoT') {
                payload = {
                    type: sessionStorage.getItem('proType') === 'Non IoT' ? 'NonIOT' : 'IOT',
                    tenantId: localStorage.getItem('TenantId'),
                    model: props.paramdatas.model ? props.paramdatas.model : '',
                    Prefix: props.paramdatas.Prefix ? props.paramdatas.Prefix : '',
                    serialNoRange: props.paramdatas.serialNoRange ? props.paramdatas.serialNoRange : '',
                    ProblemCode: props.paramdatas.ProblemCode ? props.paramdatas.ProblemCode : '',
                    SMCScode: props.paramdatas.SMCScode ? props.paramdatas.SMCScode : '',
                    complaintDes: props.paramdatas.complaintDes ? props.paramdatas.complaintDes : '',
                    sourceId: sessionStorage.getItem('SourceId'),
                    SourceFileId: props.sourcefileid,
                    step: stepname,
                    path: pathname,
                    info: [
                        {
                            Resolutions: resolutionText ? resolutionText : cardData.Resolutions,
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
                    model: props.paramdatas.model ? props.paramdatas.model : '',
                    Prefix: props.paramdatas.Prefix ? props.paramdatas.Prefix : '',
                    serialNoRange: props.paramdatas.serialNoRange ? props.paramdatas.serialNoRange : '',
                    SMCScode: props.paramdatas.SMCScode ? props.paramdatas.SMCScode : '',
                    faultCode: props.paramdatas.faultCode ? props.paramdatas.faultCode : '',
                    faultCodeDes: props.paramdatas.faultDesc ? props.paramdatas.faultDesc : '',
                    sourceId: sessionStorage.getItem('SourceId'),
                    step: stepname,
                    path: pathname,
                    info: [
                        {
                            Resolutions: resolutionText ? resolutionText : cardData.Resolutions,
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

            let res = await updateAPI('updateinfosubstepdata', payload);
            if (res.code === 200) {
                alert('Data Edited successfully')
                dispatch(updateToast({ field: 'revertLoader' }));
                dispatch(clearData())
                sessionStorage.setItem('buttonsDisable', false)
            }

        }
    }

    useImperativeHandle(ref, () => {
        return {
            getresolutionvalue: () => {
                return resolutionText;
            }
        }
    }, [resolutionText]);

    const removeSpecialToolfiles = async (file, key1, key2) => {
        const dataURL = cardData[key2];
        const data = cardData[key1];
        const index = data.findIndex((e) => e === file)

        let res = await Deletefiles({ Url: [dataURL[index]] });
        if (res.code === 200) {
            dispatch(updateFiles({ file, key1, key2 }))
        }
    }

    return (
        <div>
            <div>
                <Card>
                    <CardContent className='remove-padding'>
                        <Accordion expanded={true} onChange={handleChange(0, `panel${0}`)}>
                            <AccordionSummary className='rm-bs'
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <div className='iconNameSol'>General Resolution
                                    <div className="right-btns">
                                        {/* <Button variant="text" startIcon={<AddIcon />} onClick={() => addSubGeneralResol(0)}>Add General Resolution</Button> */}
                                        {/* <IconButton aria-label="delete">
                                            <DeleteIcon onClick={(i) => props.delGeneralResol(i)} />
                                        </IconButton> */}
                                    </div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='resol_wrap'>
                                    <div className='resol_left'>
                                        {iconName === `gr_resolution${0}` &&
                                            <div className="line-sp">
                                                <typography>Resolution</typography>
                                                <TextField
                                                    className='autoheight'
                                                    multiline
                                                    maxRows={10} setResolutionText
                                                    height='auto'
                                                    placeholder="Type here"
                                                    name="Resolutions"
                                                    value={resolutionText ? resolutionText : sessionStorage.getItem('res')}
                                                    onChange={(e) => {
                                                        setResolutionText(e.target.value)
                                                        sessionStorage.setItem('res', e.target.value);
                                                    }}
                                                />

                                            </div>
                                        }
                                        {iconName === `gr_common_tools${0}` &&
                                            <div className="line-sp commn_tool_tbl">

                                                <div className='inner-table-header'>
                                                    <Typography>Common Tools</Typography>
                                                    <div className='right'>
                                                        <Button
                                                            variant="text"
                                                            component="label"
                                                        >
                                                            <AttachFileIcon
                                                                fontSize='small'
                                                            /> &nbsp; Upload Document
                                                            <input
                                                                type="file"
                                                                hidden
                                                                multiple
                                                                accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
                                                                // onChange={(e) => Dispatch(addData({ field: 'PartNumberSupportingDocument', value: e.target.files[0].name }))}
                                                                onChange={(e) => fileUpload(e.target.files, 'PartNumberSupportingDocument', 'PartNumberSupportingDocumentURL')}
                                                            />
                                                        </Button>
                                                        <Button className='text-light' variant="text" onClick={() => dispatch(addRow({ field: 'CommonTools' }))} startIcon={<AddIcon />}>Add More</Button>
                                                        <IconButton className='bg-danger' aria-label="delete" onClick={e => dispatch(deleteRow({ field: 'CommonTools' }))}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </div>

                                                </div>

                                                {/* table content and input goes here */}
                                                <TableContainer component={Paper} className="">
                                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <StyledTableCell>#</StyledTableCell>
                                                                <StyledTableCell>Parts No.</StyledTableCell>
                                                                <StyledTableCell >Parts Description</StyledTableCell>
                                                                <StyledTableCell >Quantity</StyledTableCell>

                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {cardData.CommonTools.map((row, rowIndex) => (
                                                                <StyledTableRow key={rowIndex}>
                                                                    <StyledTableCell>
                                                                        <Checkbox {...label} checked={cardData.CommonTools[rowIndex].checked} onClick={(e) => dispatch(checkboxclick({ lineIndex: rowIndex, value: e.target.checked, field: 'CommonTools' }))} />
                                                                    </StyledTableCell>

                                                                    <StyledTableCell >
                                                                        <FormControl variant="standard">

                                                                            <BootstrapInput placeholder='Type here' name="PartsNo" autoFocus={sessionStorage.getItem('focus') === `PartsNo${rowIndex}` ? true : false} value={row.PartsNo} onChange={(e) => { dispatch(commonToolsData({ value: e.target.value, rowIndex: rowIndex, column: "PartsNo" })); sessionStorage.setItem('focus', `PartsNo${rowIndex}`) }} />
                                                                        </FormControl>
                                                                    </StyledTableCell>



                                                                    <StyledTableCell >
                                                                        <FormControl variant="standard">

                                                                            <BootstrapInput placeholder='Type here' name="PartsDescription" autoFocus={sessionStorage.getItem('focus') === `PartsDescription${rowIndex}` ? true : false} value={row.PartsDescription} onChange={(e) => { dispatch(commonToolsData({ value: e.target.value, rowIndex: rowIndex, column: "PartsDescription" })); sessionStorage.setItem('focus', `PartsDescription${rowIndex}`) }} />
                                                                        </FormControl>
                                                                    </StyledTableCell>

                                                                    <StyledTableCell >
                                                                        <FormControl variant="standard">

                                                                            <BootstrapInput placeholder='Type here' name="Quantity" autoFocus={sessionStorage.getItem('focus') === `Quantity${rowIndex}` ? true : false} value={row.Quantity} onChange={(e) => { dispatch(commonToolsData({ value: e.target.value, rowIndex: rowIndex, column: "Quantity" })); sessionStorage.setItem('focus', `Quantity${rowIndex}`) }} />
                                                                        </FormControl>
                                                                    </StyledTableCell>
                                                                </StyledTableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>


                                                {<div className='attachments'>
                                                    {
                                                        props.cardname ?
                                                            <Stack direction="row" spacing={1}>
                                                                {cardData.PartNumberSupportingDocumentURL.map((row, i) => (
                                                                    <Chip key={i} label={row.substring(0, 20)} variant="filled" name="PartNumberSupportingDocumentURL" onDelete={() => { handleDelete('PartNumberSupportingDocumentURL', row, i) }} onClick={() => { handleClick('PartNumberSupportingDocumentURL', row, i) }} clickable />
                                                                ))}
                                                            </Stack> :
                                                            <Stack direction="column" flexWrap='wrap' spacing={1}>
                                                                {cardData.PartNumberSupportingDocument.map((row, i) => (
                                                                    <Chip key={i} label={row} variant="filled" onDelete={() => { removeSpecialToolfiles(row, 'PartNumberSupportingDocument', 'PartNumberSupportingDocumentURL') }} />
                                                                ))}
                                                            </Stack>
                                                    }

                                                </div>}
                                            </div>
                                        }
                                        {iconName === `gr_special_tools${0}` &&
                                            <div className="line-sp">

                                                <div className='inner-table-header'>
                                                    <Typography>Special tools</Typography>
                                                    <div className='right'>
                                                        <Button
                                                            variant="text"
                                                            component="label"
                                                        >
                                                            <AttachFileIcon
                                                                fontSize='small'
                                                            /> &nbsp; Upload Document
                                                            <input
                                                                type="file"
                                                                hidden
                                                                multiple
                                                                accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
                                                                // onChange={(e) => Dispatch(addData({ field: 'PartNumberSupportingDocumentRspl', value: e.target.files[0].name }))}
                                                                onChange={(e) => {
                                                                    fileUpload(e.target.files, 'PartNumberSupportingDocumentRspl', 'PartNumberSupportingDocumentRsplURL')
                                                                }}
                                                            />
                                                        </Button>

                                                        <Button className='text-light' variant="text" onClick={() => dispatch(addRow({ field: 'RequiredSpecialTools' }))} startIcon={<AddIcon />}>Add More</Button>
                                                        <IconButton className='bg-danger' aria-label="delete" onClick={() => dispatch(deleteRow({ field: 'RequiredSpecialTools' }))}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </div>

                                                </div>

                                                <TableContainer component={Paper}>
                                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <StyledTableCell>#</StyledTableCell>
                                                                <StyledTableCell>Parts No.</StyledTableCell>
                                                                <StyledTableCell >Parts Description</StyledTableCell>
                                                                <StyledTableCell >Quantity</StyledTableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {cardData.RequiredSpecialTools.map((row, rowIndex) => (
                                                                <StyledTableRow key={rowIndex}>
                                                                    <StyledTableCell>
                                                                        <Checkbox {...label} checked={cardData.RequiredSpecialTools[rowIndex].checked} onClick={(e) => dispatch(checkboxclick({ lineIndex: rowIndex, field: 'RequiredSpecialTools', value: e.target.checked }))} />
                                                                    </StyledTableCell>

                                                                    <StyledTableCell >
                                                                        <FormControl variant="standard">
                                                                            <BootstrapInput placeholder='Type here' id="bootstrap-input" name="PartsNo" autoFocus={sessionStorage.getItem('focus') === `PartsNo${rowIndex}` ? true : false} value={row.PartsNo} onChange={(e) => { dispatch(specialToolsData({ value: e.target.value, rowIndex: rowIndex, column: 'PartsNo' })); sessionStorage.setItem('focus', `PartsNo${rowIndex}`) }} />
                                                                        </FormControl>
                                                                    </StyledTableCell>

                                                                    <StyledTableCell >
                                                                        <FormControl variant="standard">
                                                                            <BootstrapInput placeholder='Type here' id="bootstrap-input" name="PartsDescription" autoFocus={sessionStorage.getItem('focus') === `PartsDescription${rowIndex}` ? true : false} value={row.PartsDescription} onChange={(e) => { dispatch(specialToolsData({ value: e.target.value, rowIndex: rowIndex, column: 'PartsDescription' })); sessionStorage.setItem('focus', `PartsDescription${rowIndex}`) }} />
                                                                        </FormControl>
                                                                    </StyledTableCell>

                                                                    <StyledTableCell >
                                                                        <FormControl variant="standard">
                                                                            <BootstrapInput placeholder='Type here' id="bootstrap-input" name="Quantity" autoFocus={sessionStorage.getItem('focus') === `Quantity${rowIndex}` ? true : false} value={row.Quantity} onChange={(e) => { dispatch(specialToolsData({ value: e.target.value, rowIndex: rowIndex, column: 'Quantity' })); sessionStorage.setItem('focus', `Quantity${rowIndex}`) }} />
                                                                        </FormControl>
                                                                    </StyledTableCell>
                                                                </StyledTableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                                {<div className='attachments'>
                                                    {
                                                        props.cardname ?
                                                            <Stack direction="row" spacing={1}>
                                                                {cardData.PartNumberSupportingDocumentRsplURL.map((row, i) => (
                                                                    <Chip key={i} label={row.substring(0, 20)} variant="filled" name="PartNumberSupportingDocumentRsplURL" onDelete={() => { handleDelete('PartNumberSupportingDocumentRsplURL', row, i) }} onClick={() => { handleClick('PartNumberSupportingDocumentRsplURL', row, i) }} clickable />
                                                                ))}
                                                            </Stack> :
                                                            <Stack direction="column" flexWrap='wrap' spacing={1}>
                                                                {
                                                                    cardData.PartNumberSupportingDocumentRspl.map((row, i) => (
                                                                        <Chip key={i} label={row} variant="filled" onDelete={() => { removeSpecialToolfiles(row, 'PartNumberSupportingDocumentRspl', 'PartNumberSupportingDocumentRsplURL') }} />
                                                                    ))
                                                                }
                                                            </Stack>
                                                    }
                                                </div>}
                                            </div>
                                        }
                                        {iconName === `gr_pdf${0}` &&
                                            <div className="line-sp">

                                                <Typography>Supporting Documents</Typography>
                                                <Button
                                                    variant="text"
                                                    component="label"
                                                    className='upload_box'
                                                >
                                                    <AttachmentTwoToneIcon
                                                        fontSize='small'
                                                    /> &nbsp; Upload File
                                                    <input
                                                        type="file"
                                                        hidden
                                                        multiple
                                                        
                                                        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
                                                        // onChange={(e) => Dispatch(addData({ field: 'SupportingDocument', value: e.target.files[0].name }))}
                                                        onChange={(e) => fileUpload(e.target.files, 'SupportingDocument', 'SupportingDocumentURL')}
                                                    />
                                                </Button>

                                                {<div className='attachments'>
                                                    {
                                                        props.cardname ?
                                                            <Stack direction="row" spacing={1}>
                                                                {cardData.SupportingDocumentURL.map((row, i) => (
                                                                    <Chip key={i} label={row.substring(0, 20)} variant="filled" name="SupportingDocument" onDelete={() => { handleDelete('SupportingDocumentURL', row, i) }} onClick={() => { handleClick('SupportingDocumentURL', row, i) }} clickable />
                                                                ))}
                                                            </Stack> :
                                                            <Stack direction="column" flexWrap='wrap' alignItems='center' spacing={1}>
                                                                {cardData.SupportingDocument.map((row, i) => (
                                                                    <Chip key={i} label={row} variant="filled" onDelete={() => { removeSpecialToolfiles(row, 'SupportingDocument', 'SupportingDocumentURL') }} />
                                                                ))}
                                                            </Stack>
                                                    }
                                                </div>}
                                            </div>
                                        }
                                        {iconName === `gr_note${0}` &&
                                            <div className="line-sp">

                                                <Typography>Notes</Typography>
                                                <TextField
                                                    aria-label="empty textarea"
                                                    placeholder="Type here"
                                                    // name="Resolutions"
                                                    autoFocus={cardData.Note ? true : false}
                                                    value={cardData.Note}
                                                    onChange={(e) => dispatch(addData({ field: 'Note', value: e.target.value }))}

                                                />
                                                <Button
                                                    variant="text"
                                                    component="label"
                                                >
                                                    <AttachmentTwoToneIcon
                                                        fontSize='small'
                                                    /> &nbsp; Upload File
                                                    <input
                                                        type="file"
                                                        hidden
                                                        multiple
                                                        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/*"
                                                        // onChange={(e) => Dispatch(addDocument({ field: 'notes', data: { resType: 'resolutionPath', resolutionIndex: index, cardIndex: i, val: e.target.files[0] } }))}
                                                        onChange={(e) => fileUpload(e.target.files, 'NoteDocument', 'NoteDocumentURL')}
                                                    />
                                                </Button>
                                                {<div className='attachments'>
                                                    {props.cardname ? <Stack direction="row" spacing={1}>
                                                        {cardData.NoteDocumentURL.map((row, i) => (
                                                            <Chip key={i} label={row.substring(0, 20)} variant="filled" name="NoteDocument" onDelete={() => { handleDelete('NoteDocumentURL', row, i) }} onClick={() => { handleClick('NoteDocumentURL', row, i) }} clickable />
                                                        ))}
                                                    </Stack> : <Stack direction="column" flexWrap='wrap' spacing={1}>
                                                        {cardData.NoteDocument.map((row, i) => (
                                                            <Chip key={i} label={row} variant="filled" onDelete={() => { removeSpecialToolfiles(row, 'NoteDocument', 'NoteDocumentURL') }} />
                                                        ))}
                                                    </Stack>}
                                                </div>}
                                            </div>
                                        }
                                        {iconName === `gr_camera${0}` &&
                                            <div className="line-sp">

                                                <Typography>Photo</Typography>
                                                <Button
                                                    variant="text"
                                                    component="label"
                                                    className='upload_box'
                                                >
                                                    <AttachmentTwoToneIcon
                                                        fontSize='small'
                                                    /> &nbsp; Upload File
                                                    <input
                                                        type="file"
                                                        hidden
                                                        multiple
                                                        accept="image/png, image/jpeg"
                                                        // onChange={(e) => Dispatch(addDocument({ field: 'photo', data: { resType: 'resolutionPath', resolutionIndex: index, cardIndex: i, val: e.target.files[0] } }))}
                                                        onChange={(e) => fileUpload(e.target.files, 'Photo', 'PhotoURL')}
                                                    />
                                                </Button>
                                                {<div className='attachments'>
                                                    {props.cardname ? <Stack direction="row" spacing={1}>
                                                        {cardData.PhotoURL.map((row, i) => (
                                                            <Chip key={i} label={row.substring(0, 20)} variant="filled" name="PhotoURL" onDelete={() => { handleDelete('PhotoURL', row, i) }} onClick={() => { handleClick('PhotoURL', row, i) }} clickable />
                                                        ))}
                                                    </Stack> : <Stack direction="column" flexWrap='wrap' spacing={1}>
                                                        {cardData.Photo.map((row, i) => (
                                                            <Chip key={i} label={row} variant="filled" onDelete={() => { removeSpecialToolfiles(row, 'Photo', 'PhotoURL') }} />
                                                        ))}
                                                    </Stack>}
                                                </div>}
                                            </div>
                                        }
                                        {iconName === `gr_video${0}` &&
                                            <div className="line-sp">

                                                <Typography>Video</Typography>
                                                <Button
                                                    variant="text"
                                                    component="label"
                                                    className='upload_box'
                                                >
                                                    <AttachmentTwoToneIcon
                                                        fontSize='small'
                                                    /> &nbsp; Upload File
                                                    <input
                                                        type="file"
                                                        hidden
                                                        multiple
                                                        accept="video/mp4,video/x-m4v,video/*"
                                                        // onChange={(e) => Dispatch(addDocument({ field: 'video', data: { resType: 'resolutionPath', resolutionIndex: index, cardIndex: i, val: e.target.files[0] } }))}
                                                        onChange={(e) => fileUpload(e.target.files, 'Video', 'VideoURL')}
                                                    />
                                                </Button>
                                                {<div className='attachments'>
                                                    {props.cardname ? <Stack direction="row" spacing={1}>
                                                        {cardData.VideoURL.map((row, i) => (
                                                            <Chip key={i} label={row.substring(0, 20)} variant="filled" name="VideoURL" onDelete={() => { handleDelete('VideoURL', row, i) }} onClick={() => { handleClick('VideoURL', row, i) }} clickable />
                                                        ))}
                                                    </Stack> : <Stack direction="column" spacing={1}>
                                                        {cardData.Video.map((row, i) => (
                                                            <Chip key={i} label={row} variant="filled" onDelete={() => { removeSpecialToolfiles(row, 'Video', 'VideoURL') }} />
                                                        ))}
                                                    </Stack>}
                                                </div>}
                                            </div>
                                        }
                                    </div>
                                    <div className='resol_right'>
                                        <div className='icon-vertical-alien'>

                                            <IconButton className={iconName === `gr_resolution${0}` ? 'resol_btn_active' : 'resol_btn'} onClick={(e) => recommentationfunction(e, 0, "gr_resolution")}>  <img src={document} className="res-icon"></img></IconButton><br />
                                            <IconButton className={iconName === `gr_common_tools${0}` ? 'resol_btn_active' : 'resol_btn'} onClick={(e) => recommentationfunction(e, 0, "gr_common_tools")}> <img src={setting} className="set-icon"></img> </IconButton><br />
                                            <IconButton className={iconName == `gr_special_tools${0}` ? 'resol_btn_active' : 'resol_btn'} onClick={(e) => recommentationfunction(e, 0, "gr_special_tools")}>  <img src={toolicon} className="stool-icon"></img></IconButton><br />
                                            <IconButton className={iconName == `gr_pdf${0}` ? 'resol_btn_active' : 'resol_btn'} onClick={(e) => recommentationfunction(e, 0, "gr_pdf")}> <img src={file} className="file-icon"></img></IconButton><br />
                                            <IconButton className={iconName == `gr_note${0}` ? 'resol_btn_active' : 'resol_btn'} onClick={(e) => recommentationfunction(e, 0, "gr_note")}>    <img src={notes} className="note-icon" ></img></IconButton><br />
                                            <IconButton className={iconName == `gr_camera${0}` ? 'resol_btn_active' : 'resol_btn'} onClick={(e) => recommentationfunction(e, 0, "gr_camera")}> <img src={cam} className="cam-icon"></img> </IconButton><br />
                                            <IconButton className={iconName == `gr_video${0}` ? 'resol_btn_active' : 'resol_btn'} onClick={(e) => recommentationfunction(e, 0, "gr_video")}>  <VideocamOutlinedIcon /> </IconButton><br />
                                        </div>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        {props.cardname && <Box className='card-btns commonresbutton'>

                            <Button variant="contained" size="medium" color="primary" startIcon={<SaveIcon />} onClick={SaveEditData}>
                                Save
                            </Button>
                        </Box>}
                    </CardContent>
                </Card>
                {/* <div>

                        {subGeneralResol.map((item, index) => (
                            <div>step {index + 1}</div>
                        ))}

                    </div> */}

            </div>

        </div >
    )
})

export default CreateGeneralResolution;
