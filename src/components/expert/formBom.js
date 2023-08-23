import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import Button from '@mui/material/Button';
import BomCrud from './bomCrud';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import { Card } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { useLocation } from 'react-router-dom';
import { addBomdata, fileHandleing } from '../../service/apiServices/aisourceCreation';

const alphabets = [
  '', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

const initialState = {
  partno: '',
  desc: '',
  qty: '',
  notes: ''
}
const FormBom = (props) => {
  const [state, setState] = useState(initialState);

  const [noteDoc, setNoteDoc] = useState([]);
  const [noteDocUrl, setNoteDocUrl] = useState([]);
  const [noteDocApi, setNoteDocApi] = useState([]);

  const [supportDocumentName, setSupportDocumentName] = useState([]);
  const [supportDocTable, setSupportDocTable] = useState([])
  const [supportDocumentUrl, setSupportDocumentUrl] = useState([])
  const [supportDocApi, setSupportDocApi] = useState([])

  const [bomData, setBomData] = useState([]);
  const location = useLocation();

  const { partno, desc, qty, notes } = state;

  const bomHandleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value })
  };

  const addMoreFunc = (e) => {
    e.preventDefault();
    if (partno) {

      setBomData(newdata => [...newdata, state])
      let stateVal = { ...state }
      stateVal.desc = '';
      stateVal.partno = '';
      stateVal.qty = '';
      stateVal.notes = '';
      setState(stateVal)
      setNoteDoc([])

      let supportDoc = [...supportDocApi];
      supportDoc.push(supportDocumentUrl);
      setSupportDocApi(supportDoc)
      setSupportDocumentUrl([])

      let noteDoc = [...noteDocApi];
      noteDoc.push(noteDocUrl);
      setNoteDocApi(noteDoc)
      setNoteDocUrl([])

      let suportDocTable = [...supportDocTable];
      suportDocTable.push(supportDocumentName);
      setSupportDocTable(suportDocTable);
      setSupportDocumentName([])

    } else {
      alert('Please enter BOM data')
    }
  };

  const fileUpload = async (val, field, index) => {
    let res = await fileHandleing({ files: val })

    if (res.status === 200) {
      if (field === 'supportingDocuments') {
        let name = [...supportDocumentName];
        name.push(val.name);
        setSupportDocumentName(name);

        let url = [...supportDocumentUrl];
        url.push(res.path[0]);
        setSupportDocumentUrl(url)

      } else {
        let name = [...noteDoc];
        name.push(val.name);
        setNoteDoc(name);

        let url = [...noteDocUrl];
        url.push(res.path[0])
        setNoteDocUrl(url)
      }
    }
  }

  const saveFunc = async () => {
    if (bomData.length !== 0) {

      let payload = {
        type: sessionStorage.getItem('proType') === "Non IoT" ? 'NonIOT' : 'IOT',
        tenantId: localStorage.getItem('TenantId'),
        path: alphabets[sessionStorage.getItem('resolutionPathInd')],
        model: location.state.data.model ? location.state.data.model : '',
        Prefix: location.state.data.Prefix ? location.state.data.Prefix : '',
        serialNoRange: location.state.data.serialNoRange ? location.state.data.serialNoRange : '',
        SMCScode: location.state.data.SMCScode ? location.state.data.SMCScode : '',
        sourceId: sessionStorage.getItem('SourceId'),
        BomData: []
      }

      for (let [i, val] of bomData.entries()) {
        // console.log('ddd', val)
        if (val.partno.length !== 0) {

          let obj = {
            PartsNo: val.partno,
            PartsDescription: val.desc,
            Quantity: val.qty,
            Notes: val.notes,
            NotesDocument: noteDocApi[i].length !== 0 ? [noteDocApi[i].toString()] : [],
            PartNumberSupportingDocument: supportDocApi[i].length !== 0 ? [supportDocApi[i].toString()] : []
          }

          payload.BomData.push(obj)
        }
      }

      if (sessionStorage.getItem('proType') === 'Non IoT') {
        payload.ProblemCode = location.state.data.ProblemCode;
        payload.complaintDes = location.state.data.complaintDes;
      } else {
        payload.faultCode = location.state.data.faultCode;
        payload.faultCodeDes = location.state.data.faultDesc
      }


      let res = await addBomdata(payload)
      if (res.code === 200) {
        alert('Bom added successfully')
      }
    } else {
      alert('Please save BOM data')
    }
  }

  return (

    <div>

      <Card>
        <CardContent>
          <div className='bom-form' >
            <Box
              component="form"
              noValidate
              autoComplete="off"
            >
              <div className='input-wrapper top'>
                <TextField id="outlined-basic" label="Parts No." variant="outlined" name="partno" value={partno} onChange={bomHandleChange} />
                <TextField id="outlined-basic" label="Quantity" variant="outlined" name="desc" value={desc} onChange={bomHandleChange} />

              </div>
              <div className='stage-fullwidth'>
                <TextField
                  id="outlined-multiline-static"
                  label="Part Description"
                  multiline
                  rows={3}
                  value={qty}
                  name="qty"
                  onChange={bomHandleChange}

                />
                <div className='field-wrap'>
                  <TextField
                    id="outlined-multiline-static"
                    // label="Supporting Documents"
                    placeholder='Supporting Documents'
                    multiline
                    rows={1}
                    value={supportDocumentName}
                    name="sdoc"
                    // onChange={bomHandleChange}
                    inputProps={{
                      readOnly: true,
                    }}
                  />
                  <IconButton color="primary" aria-label="delete" style={{ position: 'absolute', right: '6px', top: '6px' }} component="label">
                    < input hidden onChange={(e) => fileUpload(e.target.files[0], 'supportingDocuments')} type="file" />
                    <InsertDriveFileIcon />
                  </IconButton>
                </div>
                <div className='field-wrap'>
                  <TextField
                    id="outlined-multiline-static"
                    label="Notes"
                    multiline
                    rows={1}
                    value={notes}
                    name="notes"
                    onChange={bomHandleChange}
                  />
                  <IconButton color="primary" aria-label="delete" style={{ position: 'absolute', right: '6px', top: '6px' }} component="label">
                    <input hidden onChange={(e) => fileUpload(e.target.files[0], 'notes')} type="file" />
                    <StickyNote2Icon />
                  </IconButton>

                </div>
                {<div className='attachments'>
                  <Stack direction="row" spacing={1}>
                    {noteDoc.map((row, i) => (
                      <Chip label={row} key={i} variant="filled" />
                    ))
                    }
                  </Stack>
                </div>}
              </div>




              <Box className='card-btns'>

                <Button variant="contained" size="medium" disabled={bomData.length !== 0 ? false : true} color="primary" startIcon={<SaveIcon />} onClick={saveFunc}>
                  Save
                </Button>
                <Button variant="contained" size="medium" color="primary" startIcon={<AddIcon />} onClick={addMoreFunc}>
                  Add more
                </Button>
              </Box>
            </Box>
          </div>
          <TableContainer component={Paper}>
            <BomCrud bomDatas={bomData} supportDoc={supportDocTable} />

          </TableContainer>
        </CardContent>
      </Card>

    </div>
  )
}

export default FormBom
