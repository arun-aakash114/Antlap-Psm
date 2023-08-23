import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { updateFaultCode, updateForm, addElement, updateProblemCode, removeElement, updateSMCSCode, updateParams, clearState } from '../../store/reducers/dataManageForm'
import { createIotData, createNonIotData, smcscodelist, problemcodelist, updateIotData, updateNonIotData } from '../../service/apiServices/aisourceCreation';
import { updateToast } from '../../store/reducers/toasters';
import Autocomplete from '@mui/material/Autocomplete';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



const ParamFaultForm = (props) => {
    let navigate = useNavigate()
    let dispatch = useDispatch()

    const [smcsList, setSmcsList] = React.useState([]);
    const [openinvalid, setInvalid] = React.useState(false);
    let formData = useSelector((state) => state.dataForm)
    // const [formData,setFormData] = React.useState(formData1)
    const [problemList, setProblemList] = React.useState([])
    const [protype, setproType] = React.useState('')



    useEffect(() => setproType(sessionStorage.getItem('proType')), []);


    const IconTextField = ({ iconStart, iconEnd, InputProps, ...props }) => {
        return (
            <TextField
                {...props}
                InputProps={{
                    ...InputProps,
                    startAdornment: iconStart ? (
                        <InputAdornment position="start">{iconStart}</InputAdornment>
                    ) : null,
                    endAdornment: iconEnd ? (
                        <InputAdornment position="end">{iconEnd}</InputAdornment>
                    ) : null
                }}
            />
        );
    };


    const addAndRemove = (field, i) => {
        if (i === 0) {
            dispatch(addElement({ field: field }))
        } else {
            dispatch(removeElement({ field: field, index: i }))
        }
    }
    const prefixSelection = async (model, i, source) => {
        if (source == 'problemCode') {
            dispatch(updateProblemCode({ field: 'code', index: i, val: model === null ? '' : model.slice(0, model.indexOf('-')) }))
            dispatch(updateProblemCode({ field: 'desc', index: i, val: model === null ? '' : model.slice(model.indexOf('-') + 1) }))
        } else {
            dispatch(updateSMCSCode({ index: i, desc: model === null ? '' : model }))
        }

    }

    const handleSearch = async (event, source) => {
        if (source == 'problem') {
            if (event.target.value.length !== 0) {
                let res = await problemcodelist(event.target.value);

                if (res.code === 200) {
                    setProblemList(res.problemCodeData)

                }
            } else {
                setProblemList([])
            }
        }
        else {
            if (event.target.value.length !== 0) {
                let res = await smcscodelist(event.target.value);

                if (res.code === 200) {
                    setSmcsList(res.SMCSComponentDesc)

                }
            } else {
                setSmcsList([])
            }
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    }

    const saveAndContinue = async () => {
        let { modelPrefix, serialNumber, faultCode, problemCode } = formData;
        if ((!modelPrefix || !serialNumber)) {
            alert('Give the correct Details')
        } else if (sessionStorage.getItem('proType') === 'IoT' && faultCode[0].code.length === 0) {
            alert('Give the please give the fault code')
        } else if (sessionStorage.getItem('proType') !== 'IoT' && problemCode[0].code.length === 0) {
            alert('Give the please give the problem code')
        } else {
            if (sessionStorage.getItem('proType') === 'IoT') {
                let faultCode = [];
                let faultDesc = [];
                formData.faultCode.forEach(element => {
                    faultCode.push(element.code);
                    faultDesc.push(element.desc);
                });

                let payload = props.canedit == 'edit' ? {
                    "tenantId": localStorage.getItem('TenantId'),
                    "model": formData.serialNumber,
                    "Prefix": formData.modelPrefix.join(','),
                    "serialNoRange": formData.serialNoRange,
                    "SMCScode": Array.prototype.map.call(formData.smcsCode, function (item) { return item.desc; }).join(","),
                    "faultCode": faultCode.join(','),
                    "faultCodeDes": faultDesc.join(','),
                    "sourceId": props.sourceid
                } : {
                    "tenantId": localStorage.getItem('TenantId'),
                    "model": formData.serialNumber,
                    "Prefix": formData.modelPrefix.join(','),
                    "serialNoRange": formData.serialNoRange,
                    "SMCScode": Array.prototype.map.call(formData.smcsCode, function (item) { return item.desc; }).join(","),
                    "faultCode": faultCode.join(','),
                    "faultCodeDes": faultDesc.join(',')
                }
                // let res = await createIotData(payload)
                // if (res.code === 200) {
                // sessionStorage.setItem('SourceId', 148)
                // navigate('/resolutionPath', { state: { data: payload } })
                // }

                let res = props.canedit == 'edit' ? await updateIotData(payload) : await createIotData(payload)
                if (res.code === 200) {
                    if (props.canedit == 'edit') {
                        sessionStorage.setItem('SourceId', props.sourceid)
                        navigate('/resolutions', { state: { data: payload, act: 'edit', id: props.sourceid } })
                    } else {
                        sessionStorage.setItem('SourceId', res.data.SourceId)
                        navigate('/resolutionPath', { state: { data: payload, act: 'edit' } })
                    }

                } else {
                    setInvalid(true);
                }


            } else {
                let { modelPrefix, serialNumber, problemCode } = formData;
                if (!(modelPrefix || serialNumber || problemCode[0].code)) {
                    alert('Give the correct Details')
                }
                let probCode = [];
                formData.problemCode.forEach(element => {
                    probCode.push(element.code + "-" + element.desc);
                });

                let payload = props.canedit == 'edit' ? {
                    "tenantId": localStorage.getItem('TenantId'),
                    "model": formData.serialNumber,
                    "Prefix": formData.modelPrefix.join(','),
                    "serialNoRange": formData.serialNoRange,
                    "SMCScode": Array.prototype.map.call(formData.smcsCode, function (item) { return item.desc; }).join(","),
                    "ProblemCode": probCode.join(','),
                    "complaintDes": formData.complaintDescripton,
                    "sourceId": props.sourceid
                } : {
                    "tenantId": localStorage.getItem('TenantId'),
                    "model": formData.serialNumber,
                    "Prefix": formData.modelPrefix.join(','),
                    "serialNoRange": formData.serialNoRange,
                    "SMCScode": Array.prototype.map.call(formData.smcsCode, function (item) { return item.desc; }).join(","),
                    "ProblemCode": probCode.join(','),
                    "complaintDes": formData.complaintDescripton,
                }
                console.log(payload)
                // let res = await createNonIotData(payload)
                // if (res.code === 200) {
                // sessionStorage.setItem('SourceId', 148)
                // navigate('/resolutionPath', { state: { data: payload } })
                // }
                let res = props.canedit == 'edit' ? await updateNonIotData(payload) : await createNonIotData(payload)
                if (res.code === 200) {
                    if (props.canedit == 'edit') {
                        sessionStorage.setItem('SourceId', props.sourceid)
                        navigate('/resolutions', { state: { data: payload, act: 'edit', id: props.sourceid } })
                    } else {
                        sessionStorage.setItem('SourceId', res.data.SourceId)
                        navigate('/resolutionPath', { state: { data: payload, act: 'edit' } })
                    }

                } else {
                    setInvalid(true);
                }
            }

        }
        // setInvalid(true);

    }

    const Text = (props) => {
        return (
            <IconTextField
                fullWidth
                key={props.index}
                label="Fault Code Description"
                name="Fault Code Description"
                value={props.row.desc}
                onChange={(e) => dispatch(updateFaultCode({ index: props.index, field: 'desc', val: e.target.value }))}
                iconEnd={<IconButton><CloseIcon onClick={() => removeDesc(props.index)} /></IconButton>}
                autoFocus={props.row.desc ? true : false}
            />
        )
    }

    const removeDesc = (i) => {
        dispatch(updateFaultCode({ index: i, field: 'desc', val: '' }))
        dispatch(updateFaultCode({ index: i, field: 'code', val: '' }))
    }

    return (
        <>
            <div className='divider divider-top'></div>
            {protype === 'IoT' && formData?.faultCode?.map((row, i) => (

                <div className='input-wrapper stage2' key={i}>
                    {/* <IconTextField
                fullWidth
                label="Fault Code"
                name="Fault Code"
                value={row.code}
                onChange={(e) => dispatch(updateFaultCode({ index: i, field: 'code', val: e.target.value }))}

            /> */}
                    <TextField id="outlined-basic" label="Fault Code" key={"code"} required variant="outlined" autoFocus={row.code ? true : false} value={row.code} onChange={(e) => dispatch(updateFaultCode({ index: i, field: 'code', val: e.target.value }))} />
                    {/* <Text index={i} row={row} autoFocus={row} /> */}
                    <TextField id="outlined-basic" label="Fault Code Description" variant="outlined" value={row.desc} onChange={(e) => dispatch(updateFaultCode({ index: i, field: 'desc', val: e.target.value }))} />
                    <Button className='ic-single btn-mrgn-10' variant="contained" size="medium" color="primary" onClick={() => addAndRemove('faultCode', i)}>
                        {i === 0 ?
                            <AddIcon /> :
                            <RemoveIcon />}
                    </Button>

                </div>
            ))}
            {protype === 'Non IoT' && formData?.problemCode?.map((row, i) => (
                <div className='input-wrapper stage2' key={i}>
                    <Autocomplete
                        freeSolo
                        id="outlined-basic"
                        disableClearable={false}
                        fullWidth
                        variant="outlined"
                        defaultValue={row.code ? row.code + '-' + row.desc : ''}
                        options={problemList.map((row) => row.ProblemCode + '-' + row.ProblemDescription)}
                        onChange={(e, v) => prefixSelection(v, i, 'problemCode')}
                        renderInput={(params) => <TextField {...params} style={{ width: '98%' }} onChange={(e) => handleSearch(e, 'problem')} fullWidth label="Problem / Description Code" />} />
                    {/* <TextField id="outlined-basic" label="Problem Code" required variant="outlined" value={row.code} onChange={(e) => dispatch(updateProblemCode({ field: 'code', index: i, val: e.target.value }))} />
            <TextField id="outlined-basic" label="Problem Code Description" required variant="outlined" value={row.desc} onChange={(e) => dispatch(updateProblemCode({ field: 'desc', index: i, val: e.target.value }))} /> */}
                    <Button className='ic-single btn-mrgn-10' variant="contained" size="medium" color="primary" onClick={() => addAndRemove('problemCode', i)}>
                        {i === 0 ?
                            <AddIcon /> :
                            <RemoveIcon />}
                    </Button>

                </div>
            ))}
            <div className='divider'></div>
            {formData?.smcsCode?.map((row, i) => (

                <div className='input-wrapper stage2 f-des' key={i}>
                    <Autocomplete
                        freeSolo
                        id="outlined-basic"
                        disableClearable={false}
                        fullWidth
                        variant="outlined"
                        defaultValue={row?.desc}
                        options={smcsList.map((row) => row)}
                        onChange={(e, v) => prefixSelection(v, i, 'smcs')}
                        renderInput={(params) => <TextField {...params} style={{ width: '98%' }} onChange={(e) => handleSearch(e, 'smcs')} fullWidth autoFocus={row.desc ? true : false} label="SMCS Component Code" />} />
                    {/* <TextField id="outlined-basic" label="SMCS Component Code" variant="outlined" value={row.desc} onChange={(e) => dispatch(updateSMCSCode({ index: i, desc: e.target.value }))} /> */}
                    <Button className='ic-single btn-mrgn-10' variant="contained" size="medium" color="primary" onClick={() => addAndRemove('smcs', i)}>
                        {i === 0 ?
                            <AddIcon /> :
                            <RemoveIcon />}
                    </Button>

                </div>
            ))}

            <div className='divider'></div>

            {protype === 'Non IoT' &&
                <div className='input-wrapper stage2 f-des'>
                    <TextField id="outlined-basic" multiline={true} label="Complaint Description" variant="outlined" value={formData.complaintDescripton} onChange={(e) => dispatch(updateForm({ field: 'complaint_desc', value: e.target.value }))} />
                </div>}
            <Box className='card-btns'>
                <Button variant="contained" size="medium" color="secondary" onClick={() => dispatch(updateToast({ field: 'clearForm' }))} startIcon={<CloseIcon />}>
                    Clear
                </Button>
                <Button variant="contained" size="medium" color="primary" startIcon={<SaveIcon />} onClick={() => saveAndContinue()}>
                    Save & Continue
                </Button>
            </Box>

            <Snackbar open={openinvalid} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="error" sx={{ width: '50%' }} onClose={handleClose}>
                    Duplicate Data not allowed
                </Alert>
            </Snackbar></>
    )
}

export default ParamFaultForm;