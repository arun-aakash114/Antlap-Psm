import { TextField } from '@mui/material'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updateForm } from '../store/reducers/knowledgeBaseForm'
import { updateToast } from '../store/reducers/toasters'
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import { modelPrefixApi } from '../service/apiServices/knoledgeBaseService'



function ModelPrefix() {
    const [paper, setpaper] = React.useState(false);
    const [modaldata, setModelData] = React.useState('');
    let dispatch = useDispatch()
    let formData = useSelector((state) => state.knowledgeForm);

    const modelFunc = async (field, value) => {
        if (field === 'serialno') {
            dispatch(updateForm({ field: 'serial_number', value: value }))

            if (value.length >= 3) {
                let modelValue = await modelPrefixApi(value.slice(0, 3));
                if (value.length === 8) {
                    let modelValueStatus = modelPrefixApi(value.slice(0, 3));
                    if (modelValueStatus.length !== 0) {
                        dispatch(updateForm({ field: 'model_status' }));
                    }
                }
                if (modelValue.length === 0) {
                    dispatch(updateToast({ field: 'model_prefix' }))
                } else {
                    dispatch(updateForm({ field: 'model_prefix', value: modelValue[0].trim() }))
                }
            }

            if (value.length === 0) {
                dispatch(updateForm({ field: 'model_prefix', value: '' }))
            }

        } else if (field === 'modelprefix') {
            dispatch(updateForm({ field: 'model_prefix', value: value.trim() }));
            if (value.length >= 3) {
                let modelValue = await modelPrefixApi(value);
                if (modelValue.length === 0) {
                    dispatch(updateToast({ field: 'model_prefix' }))
                } else {
                    setpaper(true);
                    setModelData(modelValue)
                }
            }
            if (!value) {
                setpaper(false)
            }
        }

    }

    const chooseitem = (value) => {
        dispatch(updateForm({ field: 'model_prefix', value: value.trim() }))
        setpaper(false)
    }
    return (
        <>
            <TextField
                margin="normal"
                fullWidth
                id="serialno"
                label="Serial No"
                name="serialno"
                value={formData.serialNumber}
                onChange={(e) => modelFunc('serialno', e.target.value)}
                inputProps={{ maxLength: 8, readOnly: true, }}
                autoCorrect='off'
                autoComplete='off'
            />
            {/* <Typography sx={{ marginRight: 2 }}>or</Typography> */}
            <div className='modelprefix' style={{ marginBottom: '2px' }}>
                <TextField
                    margin="normal"
                    label="Model/Prefix"
                    name="modelprefix"
                    fullWidth
                    value={formData.modelPrefix}
                    onChange={(e) => modelFunc('modelprefix', e.target.value)}
                    placeholder='Model/Prefix'
                    autoCorrect='off'
                    autoComplete='off'
                    inputProps={
                        { readOnly: true, }}
                />
                {paper &&
                    <Paper elevation={3} >
                        {/* <Box  sx={{ width: 100, height: 100 }}> */}
                        {modaldata.map((value, key) => (
                            <MenuItem value={value} onClick={() => chooseitem(value)}>{value}</MenuItem>

                        ))}
                    </Paper>
                }
            </div>
            {/* <Typography sx={{ marginRight: 2 }}>or</Typography> */}
            <TextField
                id="issueDesc"
                margin="normal"
                label="Issue Description"
                name="issueDesc"
                fullWidth
                value={formData.serialNoRange}
                onChange={(e) => dispatch(updateForm({ field: 'serial_no_range', value: e.target.value }))}
                placeholder="Issue Description"
                autoCorrect='off'
                autoComplete='off'
                inputProps={
                    { readOnly: true, }}
            />
        </>
    )
}

export default ModelPrefix