import React, { useEffect } from 'react'
import { Divider, MenuItem } from '@mui/material'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button';
import '../../styles/filterForm.css'
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { filterIOTInput, filterNonIOTInput } from '../../service/apiServices/aisourceCreation';
import { updateForm } from '../../store/reducers/dataManageForm';
import { modellist, prefixlist } from '../../service/apiServices/aisourceCreation';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import { backEndDomain } from '../../service/apiserver';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
import { updateResponce } from '../../store/reducers/apiResponces';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Filterform = (props) => {
    let dispatch = useDispatch()
    const jwt = localStorage.getItem('UserToken')
    const TenantId = localStorage.getItem('TenantId');
    const [modelList, setModelList] = React.useState([])
    const [personName, setPersonName] = React.useState([]);
    const [prefixList, setPrefixlist] = React.useState([]);
    const [prefixFocus, setPrefixFocus] = React.useState(false)
    // const [selStatus, setSelStatus] = React.useState('')

    const [createdby, setCreatedby] = React.useState([]);
    const [filterData, setFiltedData] = React.useState(
        {
            "status": '',
            "CreatedBy": '',
            "Model": '',
            "SerialNo": '',
            "FaultCode": '',
            "ProblemCode": '',
            "SMCSCode": ''
        }
    )

    useEffect(() => {
        getCreatedBy();
    }, [])

    const getCreatedBy = () => {
        try {
            axios({
                method: 'get',
                url: `https://${backEndDomain}/webapi/webAISourceData/createdBy?tenantId=${TenantId}`,
                headers: {
                    'Content-type': 'application/json',
                    'token': jwt
                }
            })
                .then(function (response) {
                    console.log(response.data.Data)
                    setCreatedby(response.data.Data)



                }).catch(function (response) {
                    //   if(response.response.status == 422){
                    //  // console.log(response.response.status);
                    //   }
                });
        } catch (err) {
            console.log(err);

        }
    }
    const stateChane = (field, val) => {
        let data = { ...filterData };
        data[field] = val;
        setFiltedData(data)
    }

    const cleardata = () => {
        let data = { ...filterData };
        setPersonName([]);
        setModelList([]);
        dispatch(updateForm({ field: 'serial_number', value: "" }))
        for (let a in data) {
            data[a] = ''
        }
        setFiltedData(data)
    }
    const prefixSelection = async (model) => {
        if (model.length !== 0) {
            dispatch(updateForm({ field: 'serial_number', value: model }))
            let res = await prefixlist(model);
            if (res.code === 200) {
                setPrefixlist(res.data);
                setPrefixFocus(true)
            }
        }
    }

    const handleSearch = async (event) => {
        console.log('edadsada', event);
        dispatch(updateForm({ field: 'serial_number', value: event.target.value }))
        if (event.target.value.length !== 0) {
            let res = await modellist(event.target.value);

            if (res.code === 200) {
                setModelList(res.data)
                let data = { ...filterData };
                data['Model'] = event.target.value;
                setFiltedData(data)
            }
        } else {
            setModelList([])
        }
    };

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        let data = { ...filterData };
        data['SerialNo'] = event.target.value;
        setFiltedData(data)
        dispatch(updateForm({ field: 'model_prefix', value: event.target.value }))
    };

    const searchFunc = async () => {
        if (sessionStorage.getItem('proType') === 'IoT') {
            let payload = {
                "model": filterData.Model.length !== 0 ? filterData.Model : '',
                "prefix": filterData.SerialNo.length !== 0 ? filterData.SerialNo.join(',') : '',
                "SMCS": filterData.SMCSCode.length !== 0 ? filterData.SMCSCode : '',
                "faultCode": filterData.FaultCode.length !== 0 ? filterData.FaultCode : '',
                "status": filterData.status.length !== 0 ? filterData.status : '',
                "tenantId": localStorage.getItem('TenantId')
            }
            let res = await filterIOTInput(payload)
            if (res.code === 200 && res.message !== 'No Data Found!') {

                dispatch(updateResponce({ field: 'viewList', value: res.Data }))
                props.usedrawer(res.Data)
            } else {
                alert('Data not found')
                dispatch(updateResponce({ field: 'viewList', value: [] }))
                props.usedrawer([])
            }
        } else {
            let payload = {
                "model": filterData.Model.length !== 0 ? filterData.Model : '',
                "prefix": filterData.SerialNo.length !== 0 ? filterData.SerialNo.join(',') : '',
                "SMCS": filterData.SMCSCode.length !== 0 ? filterData.SMCSCode : '',
                "ProblemDesc": filterData.ProblemCode.length !== 0 ? filterData.ProblemCode : '',
                "status": filterData.status.length !== 0 ? filterData.status : '',
                "tenantId": localStorage.getItem('TenantId')
            }
            let res = await filterNonIOTInput(payload)
            if (res.code === 200 && res.message !== 'No Data Found!') {
                dispatch(updateResponce({ field: 'viewList', value: res.Data }))
                props.usedrawer(res.Data)
            } else {
                alert('Data not found')
                dispatch(updateResponce({ field: 'viewList', value: [] }))
                props.usedrawer([])
            }
        }
    }

    const status = [
        {
            id: 1,
            name: 'In progress'
        },
        {
            id: 2,
            name: 'Approved'
        },
        {
            id: 3,
            name: 'Waiting for approval'
        },
        {
            id: 4,
            name: 'Declined'
        }
    ]
    return (
        <>
            <div className='filerHead'>
                Filter
                <ClearSharpIcon onClick={() => window.location.reload(true)} />
            </div>
            <Divider />
            <div className='filterForm'>
                <div className='inputField'>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filterData.status}
                        label="Status"
                        onChange={(e) => stateChane('status', e.target.value)}
                        fullWidth
                    >
                        {
                            status.map((row) => (
                                <MenuItem value={row.name} >{row.name}</MenuItem>
                            ))
                        }
                    </Select>
                    <InputLabel id="demo-simple-select-label">Created By</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filterData.CreatedBy}
                        label="Created By"
                        fullWidth
                        onChange={(e) => stateChane('CreatedBy', e.target.value)}
                    >
                        {
                            createdby?.map((row) => (
                                <MenuItem value={row.CreatedBy} >{row.CreatedBy}</MenuItem>
                            ))
                        }
                    </Select>
                    <Autocomplete
                        freeSolo
                        id="outlined-basic"
                        disableClearable
                        fullWidth
                        variant="outlined"
                        options={modelList.map((row) => row.EquipmentModel)}
                        onChange={(e, v) => prefixSelection(v)}
                        renderInput={(params) => <TextField {...params} onChange={(e) => handleSearch(e)} fullWidth label="Model" />}
                    />
                    {/* <TextField id="outlined-basic" value={filterData.Model} label="Model" fullWidth variant="outlined" onChange={(e) => stateChane('Model', e.target.value)} /> */}
                    {/* <TextField id="outlined-basic" value={filterData.SerialNo} label="Serial Prefix" fullWidth variant="outlined" onChange={(e) => stateChane('SerialNo', e.target.value)} /> */}
                    <FormControl fullWidth>

                        <InputLabel id="demo-multiple-checkbox-label">Serial Prefix</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            // label='Prefix'
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                            autoFocus={prefixFocus}
                        >
                            {prefixList.map((name, i) => (
                                <MenuItem key={i} value={name.EquipmentPrefix}>
                                    <Checkbox checked={personName.indexOf(name.EquipmentPrefix) > -1} />
                                    <ListItemText primary={name.EquipmentPrefix} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    {
                        sessionStorage.getItem('proType') === 'IoT' &&
                        <TextField id="outlined-basic" value={filterData.FaultCode} label="Fault Code" fullWidth variant="outlined" onChange={(e) => stateChane('FaultCode', e.target.value)} />
                    }
                    {
                        sessionStorage.getItem('proType') === 'Non IoT' &&
                        <TextField id="outlined-basic" value={filterData.ProblemCode} label="Problem code" fullWidth variant="outlined" onChange={(e) => stateChane('ProblemCode', e.target.value)} />
                    }
                    <TextField id="outlined-basic" value={filterData.SMCSCode} label="SMCS code" fullWidth variant="outlined" onChange={(e) => stateChane('SMCSCode', e.target.value)} />
                </div>
                &nbsp;
                <div className='pp-btn'>

                    <Button

                        type="submit"
                        size="small"
                        variant="contained"
                        className="btn-secondary"
                        onClick={() => cleardata()}
                    >
                        <CloseIcon /> Clear
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        className='btn-primary'
                        onClick={searchFunc}
                    >
                        <SearchIcon />Apply
                    </Button>
                </div>
            </div>

        </>
    )
}

export default Filterform