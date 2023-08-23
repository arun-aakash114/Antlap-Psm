/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import Layout from '../../components/searchLayout';
import { Button } from '@mui/material';
import { Container } from '@mui/system';
import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { aisearch, directsearch } from '../../service/apiServices/searchService'
import { resetForm } from '../../store/reducers/knowledgeBaseForm';

function Search() {
    let dispatch = useDispatch()
    const [allSolutions, setallSolutions] = React.useState();
    const [complaintdesclist, setcomplaintdesclist] = React.useState([]);
    // let data = useSelector((state) => state.apiResponce)
    const location = useLocation();

    const navigate = useNavigate();
    useEffect(() => {
        setallSolutions(location.state.length)
        if (location.state.ai === true) {
            setcomplaintdesclist(location.state.complaintDesc)
        } else {
            setcomplaintdesclist(location.state.complaintDesc)
        }
        dispatch(resetForm())

    }, [])
    // console.log("complaintdesclist", complaintdesclist)
    var N = location.state.length;
    // const value = Array.apply(null, { length: N }).map(Number.call, Number)

    const backfunction = () => {
        navigate('/knowledgeBase');
        localStorage.removeItem("fault");
        localStorage.removeItem("range")
        localStorage.removeItem("model")
    };

    const resultfunction = async (id, comdes) => {
        const modelprefix = location.state.modelprefix ? location.state.modelprefix.split("/") : '';
        const smcs = location.state.smcs ? location.state.smcs.split("-") : ''
        const pd = location.state.problemcode ? location.state.problemcode.split("-") : ''
        let fData = {
            "modelprefix": modelprefix[0] ? modelprefix[0].trim() : "",
            "serialno": modelprefix[1] ? modelprefix[1] : "",
            "serialnoRange": '',
            "problemdes": pd[0] ? pd[0].replace(/^0+/, '') : '',
            "smcs": smcs[0] ? smcs[0] : '',
            "faultcode": location.state.faultcode ? location.state.faultcode.toUpperCase() : '',
            'PCode_description': pd[1] ? pd[1] : "",
            'SCode_description': smcs[1] ? smcs[1] : "",
            'Actual_serialno': location.state.serialnumber && modelprefix[1],
            'probleminwords': location.state.probleminwords || '',       
         }
        let result;

        if (location.state.ai === true) {
            let response = await aisearch(id, fData);
            if (response.length !== 0) {
                result = response.data.results
            }
        } else {
            let responce = await directsearch(id, fData)
            if (responce.length !== 0) {
                result = responce.data.results
            }
        }

        let val = {
            serialno: location.state.serialno,
            modelprefix: location.state.modelprefix,
            range: location.state.range,
            smcs: location.state.smcs,
            faultcode: location.state.faultcode,
            problemcode: location.state.problemcode,
            length: location.state.length,
            results: result,
            CommonResolutionnumber: id,
            viewall: location.state.viewall,
            serialNo: location.state.serialnumber,
            complaintDesc: location.state.complaintDesc,
            probcode: location.state.probcode || "",
            smcscode: location.state.smcscode || "",
            probleminwords: location.state.probleminwords || "",
            comdes: comdes
        }

        navigate('/result', { state: val })

    }
    console.log(location.state)
    return (
        <><Layout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box className='box-header'>
                    <h2 className="page-heding">Result(s)Found <span className='header-count'>{allSolutions < 10 ? `0${allSolutions}` : allSolutions}</span> </h2>
                    <Button
                        type="submit"
                        variant="contained"
                        className='btn-secondary'
                        onClick={backfunction}
                    >
                        Back
                    </Button>

                </Box>
                <Card sx={{ marginTop: 0 }} className='result-card'>


                    {
                        <>{complaintdesclist.length > 0 &&
                            complaintdesclist.map((element, index) => {
                                return (
                                    <Card
                                        type="submit"
                                        variant="contained"
                                        className='result-count-btn results-list'
                                        onClick={() => resultfunction(index + 1, element)}
                                    >

                                        <a className="s-count">{index + 1 < 10 ? `0${index + 1}` : index + 1}</a>

                                        <div className='det_right'>
                                            <Typography className='font-14'>Complaint Description</Typography>
                                            <Typography className='rs-des'><b> {element}</b></Typography>
                                        </div>


                                    </Card>

                                )
                            })}</>
                    }


                </Card>
            </Container>
        </Layout></>
    )
}
export default Search;
