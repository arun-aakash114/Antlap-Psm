/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import face from '../../assets/face.svg';
import Layout from '../../components/searchLayout'
import { Container } from '@mui/system';
import { Circles } from 'react-loader-spinner'
import Box from '@mui/material/Box';
import { Card, CardContent, Typography } from '@mui/material';
import ModelPrefix from '../../components/modelPrefix'
import FaultCodeText from '../../components/faultCodeText'
import { Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { revertToast } from '../../store/reducers/toasters'
import FooterButton from '../../components/footerButton';
import Modal from '@mui/material/Modal';
import AiButtons from '../../components/aibuttons';
import { updateToast } from '../../store/reducers/toasters'
import { useLocation } from 'react-router-dom';
import { getModelForm } from '../../service/apiServices/knoledgeBaseService'
import { modelForm, resetForm } from '../../store/reducers/knowledgeBaseForm'
import { useNavigate } from 'react-router-dom';


function Searchform() {
    let navigate = useNavigate()
    const location = useLocation();
    let dispatch = useDispatch()
    let toaster = useSelector((state) => state.toaster);

    const style1 = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const backFunc = () => {
        let type = localStorage.getItem('type')
        if (type === '4') {
            navigate('/expertDashboard')
        } else {

            let key = sessionStorage.getItem('allDetailsKey')
            let cid = sessionStorage.getItem('allDetailsCID')

            let val = {
                id: key,
                cid: cid
            }
            navigate('/alldetails', { state: val })
        }
        dispatch(resetForm())
    }
    useEffect(() => {
        (async () => {
            if (location.state?.place) {
                sessionStorage.setItem('place', location.state.place);
            }
            if (location.state?.cid) {
                let id = location.state.id ? location.state.id : ''
                sessionStorage.setItem('allDetailsKey', id);
                sessionStorage.setItem('allDetailsCID', location.state.cid)
                let resData = await getModelForm(location.state.cid)
                dispatch(modelForm({ data: resData.data.findSolutionData }))
            } else {
                let cid = sessionStorage.getItem('allDetailsCID')
                let resData = await getModelForm(cid)
                dispatch(modelForm({ data: resData.data.findSolutionData }))
            }
        })();
    }, [])

    return (
        <>
            <Layout>
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <div className={toaster.loader === true ? 'parentDisable' : ''} width='100%'>
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
                        <Box className='box-header'>
                            <h3 className="page-heading">Search Solution </h3>
                            <Button
                                type="submit"
                                variant="contained"
                                className='btn-secondary'
                                onClick={backFunc}
                            >
                                Back
                            </Button>
                        </Box>
                        <Card style={{ overflow: 'unset' }}>
                            <CardContent className="src-box">
                                <Box className='flx-input'>
                                    <>
                                        <ModelPrefix />
                                    </>
                                </Box>
                            </CardContent>
                        </Card>
                        <Box className='knowledgebase_input_wrapperr'>
                            <Card className='fc-box'>
                                <Typography className='section-header'>Select the 'Fault Code' or 'Problem Code' & 'SMCS Component'&nbsp;&nbsp;<span className='required-field'></span></Typography>
                                <CardContent>
                                    <>
                                        <FaultCodeText />
                                    </>
                                </CardContent>
                            </Card>
                        </Box>
                        <Snackbar open={toaster.toast} autoHideDuration={2000} onClose={() => dispatch(revertToast())} className="pop-alert" anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                            <Alert severity="error" sx={{ width: '100%' }}>
                                Prefix not found
                            </Alert>
                        </Snackbar>
                        <Snackbar open={toaster.match} autoHideDuration={2000} onClose={() => dispatch(updateToast({ field: 'revertMatch' }))} className="pop-alert" anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                            <Alert severity="error" sx={{ width: '100%' }}>
                                No match found
                            </Alert>
                        </Snackbar>
                        <Snackbar open={toaster.valide} autoHideDuration={2000} onClose={() => dispatch(updateToast({ field: 'revert_valid' }))} className="pop-alert" anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                            <Alert severity="error" sx={{ width: '100%' }}>
                                Please give Problem Code or SMCS Code
                            </Alert>
                        </Snackbar>
                        <Box className="btn_align_right">
                            <div className='err-msg'>
                                <FooterButton />
                            </div>

                        </Box>
                    </div>
                </Container>
                <Modal
                    open={toaster.reasonopen}
                    onClose={() => dispatch(updateToast({ field: 'reasonRevert' }))}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style1}>
                        <div className="face-align">
                            <img src={face}  ></img>
                        </div>

                        <p className='no-data'>No exact match found.Do you want to continue with AI?</p>
                        <AiButtons onClose={() => dispatch(updateToast({ field: 'reasonRevert' }))}/>
                    </Box>
                </Modal>
            </Layout>
        </>
    )
}

export default Searchform