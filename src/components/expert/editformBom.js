import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import CardContent from '@mui/material/CardContent';
import { Card } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { useLocation } from 'react-router-dom';
import { addBomdata, fileHandleing, updateBomdata } from '../../service/apiServices/aisourceCreation';
import EditBomCrud from './editbomCrud';

const alphabets = [
  '', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]


const initialState = {
    id: '',
    PartsNo: '',
    PartsDescription: '',
    Qty: '',
    PartNumberSupportingDocument: [],
    // sdocURL: [],
    Note: '',
    PartNumberSupportingDocumentName: [],
    // NoteDocument : []
}
const EditFormBom = (props) => {
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

  const {PartsNo, PartsDescription, Qty, PartNumberSupportingDocumentName, Note } = state;

  useEffect(() => {
    console.log(props.bomData)
    setBomData(props.bomdata)
}, [])

const setDataforEdit = (data,index)=> {
    setNoteDocUrl(['https','https'])
    data.PartNumberSupportingDocumentName = []
    setSupportDocumentUrl([data.PartNumberSupportingDocument])
    setState(data)
  }

  const handleDelete = (data,i)=> {
    const newArray = [...noteDocUrl.slice(0, i), ...noteDocUrl.slice(i+1)];
    setNoteDocUrl(newArray);
  }


  const handleDeletesupDoc = (data,i)=> {
    const newArray = [...supportDocumentUrl.slice(0, i), ...supportDocumentUrl.slice(i+1)];
    setSupportDocumentUrl(newArray);
  }

  const bomHandleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value })
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
    let payload = {
      type: sessionStorage.getItem('proType') === "Non IoT" ? 'NonIOT' : 'IOT',
      tenantId: localStorage.getItem('TenantId'), 
      model: props.paramdatas.model ? props.paramdatas.model : '',
      Prefix: props.paramdatas.Prefix ? props.paramdatas.Prefix : '',
      serialNoRange: props.paramdatas.serialNoRange ? props.paramdatas.serialNoRange : '',
      SMCScode: props.paramdatas.SMCScode ? props.paramdatas.SMCScode : '',
      sourceId: sessionStorage.getItem('SourceId'),
      BOMPartId: state.BOMPartId,
      BomData: []
    }


        let obj = {
          PartsNo: state.PartsNo,
          PartsDescription: state.PartsDescription,
          Quantity: state.Qty,
          Notes: state.Note,
          NotesDocument: noteDocUrl.length !== 0 ? [noteDocUrl.toString()] : [],
          PartNumberSupportingDocument: supportDocumentUrl.length !== 0 ? [noteDocUrl.toString()] : []
        }

        payload.BomData.push(obj)
      
    

    if (sessionStorage.getItem('proType') === 'Non IoT') {
      payload.ProblemCode = props.paramdatas.ProblemCode;
      payload.complaintDes = props.paramdatas.complaintDes;
    } else {
      payload.faultCode = props.paramdatas.faultCode;
      payload.faultCodeDes = props.paramdatas.faultDesc
    }


    let res = await updateBomdata(payload)
    if (res.code === 200) {
      alert('Bom Edited successfully')
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
                <TextField id="outlined-basic" label="Parts No." variant="outlined" name="PartsNo" value={PartsNo} onChange={bomHandleChange} />
                <TextField id="outlined-basic" label="Quantity" variant="outlined" name="Qty" value={Qty} onChange={bomHandleChange} />

              </div>
              <div className='stage-fullwidth'>
                <TextField
                  id="outlined-multiline-static"
                  label="Part Description"
                  multiline
                  rows={3}
                  value={PartsDescription}
                  name="PartsDescription"
                  onChange={bomHandleChange}

                />
                <div className='field-wrap'>
                  <TextField
                    id="outlined-multiline-static"
                    // label="Supporting Documents"
                    placeholder='Supporting Documents'
                    multiline
                    rows={1}
                    value={PartNumberSupportingDocumentName}
                    name="PartNumberSupportingDocumentName"
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
               <div className='attachments'>
                <Stack direction='row' spacing={1}>
                    {
                      supportDocumentUrl.map((row, i) => (
                        <Chip key={i} label={row} variant='filled' onDelete={()=> {handleDeletesupDoc(row,i)}}/>
                      ))
                    }
                  </Stack>
                </div>
                <div className='field-wrap'>
                  <TextField
                    id="outlined-multiline-static"
                    label="Notes"
                    multiline
                    rows={1}
                    value={Note}
                    name="Note"
                    onChange={bomHandleChange}
                  />
                  <IconButton color="primary" aria-label="delete" style={{ position: 'absolute', right: '6px', top: '6px' }} component="label">
                    <input hidden onChange={(e) => fileUpload(e.target.files[0], 'notes')} type="file" />
                    <StickyNote2Icon />
                  </IconButton>

                </div>
                {<div className='attachments'>
                  <Stack direction="row" spacing={1}>
                    {noteDocUrl.map((row, i) => (
                      <Chip label={row} key={i} variant="filled" onDelete={()=> {handleDelete(row,i)}}/>
                    ))
                    }
                  </Stack>
                </div>}
              </div>




              <Box className='card-btns'>

              {state.PartsDescription !=="" && <Button variant="contained" size="medium" color="primary" startIcon={<SaveIcon />} onClick={saveFunc}>
                  Save
                </Button>}
              </Box>
            </Box>
          </div>
          <TableContainer component={Paper}>
            <EditBomCrud bomDatas={bomData}  editcall={setDataforEdit}/>

          </TableContainer>
        </CardContent>
      </Card>

    </div>
  )
}

export default EditFormBom
