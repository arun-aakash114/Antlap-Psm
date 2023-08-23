import React, { useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { updateForm, updateParams } from '../../store/reducers/dataManageForm';
import Popover from '@mui/material/Popover';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { modellist, prefixlist } from '../../service/apiServices/aisourceCreation';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import ListItemText from '@mui/material/ListItemText';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
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
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));
const ModelForm = (props) => {
    const [value, setValue] = React.useState('');
    const [modelList, setModelList] = React.useState([])
    const [anchorElmodel, setAnchorElmodel] = React.useState(null);
    const [anchorElPrefix, setanchorElPrefix] = React.useState(null)
    let dispatch = useDispatch()
    let formData = useSelector((state) => state.dataForm)
    const handleSearch = async (event) => {
        dispatch(updateForm({ field: 'serial_number', value: event.target.value }))
        if (event.target.value.length !== 0) {
            let res = await modellist(event.target.value);
            if (res.code === 200) {
                setModelList(res.data)
                setPersonName([]);
            }
        } else {
            setModelList([])
        }
    };
    const handlePrefixChange = (event) => {
        setanchorElPrefix(event.currentTarget);
        // dispatch(updateForm({ field: 'model_prefix', value: event.target.value }))
    }
    const selectPrefix = (e, val) => {
        if (e.target.checked) {
            dispatch(updateForm({ field: 'model_prefix', value: val }))
        }
    }
    const prefixOpen = Boolean(anchorElPrefix)
    const prefixId = prefixOpen ? 'simple-popover' : undefined;
    // const open = Boolean(anchorElmodel);
    // const id = open ? 'simple-popover' : undefined;
    const [personName, setPersonName] = React.useState([]);
    const [prefixList, setPrefixlist] = React.useState([]);
    const [prefixFocus, setPrefixFocus] = React.useState(false)
    const prefixSelection = async (model) => {
        if (model.length !== 0) {
            dispatch(updateForm({ field: 'serial_number', value: model }))
            let res = await prefixlist(model);
            if (res.code === 200) {
                console.log(res.data)
                setPrefixlist(res.data);
                setPersonName([])
                setPrefixFocus(true)
            }
        }
    }
    useEffect(() => {
        async function fetchData() {
            if (props.canedit == 'edit') {
                let res = await modellist(formData.serialNumber);
                if (res.code === 200) {
                    setModelList(res.data)
                    setPersonName([formData.modelPrefix[0]]);
                }
            }
        }
        fetchData();
    }, [])
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        dispatch(updateForm({ field: 'model_prefix', value: value }))
    };
    return (
        <>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <Grid item xs={4}>
                    <Autocomplete
                        freeSolo
                        id="outlined-basic"
                        disableClearable
                        variant="outlined"
                        inputValue={formData.serialNumber}
                        options={modelList.map((row) => row.EquipmentModel)}
                        onChange={(e, v) => prefixSelection(v)}
                        renderInput={(params) => <TextField {...params} className='autoCompleteText' onChange={(e) => handleSearch(e)} fullWidth label="Model" />}
                    />
                </Grid>

                <Grid item xs={4}>
                    <FormControl fullWidth>
                <FormControl
            variant="outlined"
            margin={"1"}
            style={{ width: "100%", marginBottom: 25 }}
          >
                        <InputLabel id="demo-multiple-checkbox-label">Serial Prefix</InputLabel>

                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            // label='Prefix'
                            label="Serial Prefix"
                            className='SelectPrefix'

                            value={personName}
                            // defaultValue={formData.modelPrefix[0]? formData.modelPrefix : personName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Serial Prefix" />}
                            renderValue={(selected) => selected.join(',')}
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
                        </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <TextField id="outlined-basic" label="Serial No. Range" variant="outlined" value={formData.serialNoRange} onChange={(e) => dispatch(updateForm({ field: 'serial_no_range', value: e.target.value }))} />
                </Grid>
            </Grid>
        </>
    )
}
export default ModelForm