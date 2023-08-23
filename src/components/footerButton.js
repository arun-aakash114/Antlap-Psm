import React from 'react'
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux';
import { resetForm } from '../store/reducers/knowledgeBaseForm';
import { formSubmit, webAISearchHistory, dataNumber } from '../service/apiServices/knoledgeBaseService'
import { useNavigate } from 'react-router-dom';
import { updateToast } from '../store/reducers/toasters'
import { updateResponce } from '../store/reducers/apiResponces'

function FooterButton() {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let formData = useSelector((state) => state.knowledgeForm);
    let { serialNumber, modelPrefix, modelPrefixStatus, serialNoRange, faultCode, problemCode, smcsCode, complaintDescription } = formData;

    const cleardata = () => {
        dispatch(resetForm());
    }

    const handleSubmit = async () => {

        if (!faultCode && !problemCode && !complaintDescription) {
            dispatch(updateToast({ field: 'valid' }));
        } else {
            dispatch(updateToast({ field: 'loader' }));

            let responce = await formSubmit(formData);
            if (responce.data.length === 0) {
                dispatch(updateToast({ field: 'reasonopen' }))
            } else {
                dispatch(updateResponce({ field: 'directsearchlength', value: responce.data.complaintDesc }))

                if (responce.data.length !== 0) {
                    await webAISearchHistory(formData);
                    let complaintDescdata = faultCode.length !== 0 ? responce.data.faultCodeDesc : responce.data.complaintDesc;
                    if (responce.data.length === 1) {
                        let res = await dataNumber(responce.data.length, formData);
                        if (res.data.results.length !== 0) {
                            const results = res.data.results;
                            console.log('res', results);

                            let val = {
                                serialno: serialNumber.length === 8 ? serialNumber.toUpperCase() : '',
                                modelprefix: modelPrefix ? modelPrefix : '',
                                range: serialNoRange ? serialNoRange : '',
                                smcs: smcsCode ? smcsCode : '',
                                faultcode: faultCode ? faultCode.toUpperCase() : '',
                                problemcode: problemCode ? problemCode : '',
                                length: responce.data.length,
                                results: results,
                                CommonResolutionnumber: 1,
                                complaintDesc: complaintDescdata.length > 0 ? complaintDescdata[0] : "",
                                comdes: complaintDescdata.length > 0 ? complaintDescdata[0] : "",                                
                                probcode: responce.data.probcode || "",
                                smcscode : responce.data.smcscode  || "",
                                probleminwords: complaintDescription || "",
                            };
                            navigate('/result', { state: val })

                        } else {
                            dispatch(updateToast({ field: 'match' }))
                        }
                    } else {

                        let val = {
                            serialno: serialNumber.length === 8 ? serialNumber.toUpperCase() : '',
                            modelprefix: modelPrefix ? modelPrefix : '',
                            range: serialNoRange ? serialNoRange : '',
                            smcs: smcsCode ? smcsCode : '',
                            faultcode: faultCode ? faultCode.toUpperCase() : '',
                            problemcode: problemCode ? problemCode : '',
                            length: responce.data.length,
                            viewall: true,
                            serialnumber: modelPrefixStatus,
                            complaintDesc: complaintDescdata,                                
                            probcode: responce.data.probcode || "",
                            smcscode : responce.data.smcscode  || "",
                            probleminwords: complaintDescription || "",
                        }
                        navigate('/searchresult', { state: val });
                    }

                }
            }
            dispatch(updateToast({ field: 'revertLoader' }));
        }

        // dispatch(resetForm())

    }

    return (
        <div>
            <Button
                sx={{ mr: 1 }}
                type="submit"
                size="small"
                variant="contained"
                className="btn-secondary"
                onClick={cleardata}
            >
                <CloseIcon /> Clear
            </Button>


            <Button
                type="submit"
                variant="contained"
                className='btn-primary'
                onClick={handleSubmit}
            >
                <SearchIcon />Search
            </Button>
        </div>
    )
}

export default FooterButton