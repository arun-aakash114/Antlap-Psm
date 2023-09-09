/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { Card, CardContent, Grid, Typography } from '@mui/material';
import Layout from '../../components/expert/explayout';
import { useLocation } from 'react-router-dom';
import { Box, Container } from '@mui/system';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import VideocamIcon from '@mui/icons-material/Videocam';
import TextField from '@mui/material/TextField';
import meet from '../../assets/meet.png';
import { useNavigate } from 'react-router-dom';
import man from '../../assets/man.png';
import Modal from '@mui/material/Modal';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// import MySelect from "./MySelect";
import { components } from "react-select";
import makeAnimated from "react-select/animated";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { backEndDomain, aiApiDomain } from '../../service/apiserver'

import PropTypes from "prop-types";
import { default as ReactSelect } from "react-select";

const MySelect = props => {
  if (props.allowSelectAll) {
    return (
      <ReactSelect
        {...props}
        options={[props.allOption, ...props.options]}
        onChange={selected => {
          if (
            selected !== null &&
            selected.length > 0 &&
            selected[selected.length - 1].value === props.allOption.value
          ) {
            return props.onChange(props.options);
          }
          return props.onChange(selected);
        }}
      />
    );
  }

  return <ReactSelect {...props} />;
};


MySelect.propTypes = {
  options: PropTypes.array,
  value: PropTypes.any,
  onChange: PropTypes.func,
  allowSelectAll: PropTypes.bool,
  allOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string
  })
};

MySelect.defaultProps = {
  allOption: {
    label: "Select all",
    value: "*"
  }
};

const Option = props => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};
const MultiValue = props => (
  <components.MultiValue {...props}>
    <span>{props.data.label}</span>
  </components.MultiValue>
);

const animatedComponents = makeAnimated();

function Managemeeting() {
  const navigate = useNavigate();
  const theme = useTheme();

  const style = {
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


  const jitsi = () => {
    // console.log("hi")
    navigate('/joinmeeting')

  };
  const [resdata, setresdata] = React.useState([]);
  const [paper, setpaper] = React.useState(false);
  const [complaintid, setcomplaintid] = React.useState([]);
  const jwt = localStorage.getItem('UserToken')
  const [nodata, setnodata] = React.useState(false);

  useEffect(() => {
    setpaper(false)

    try {
      axios({
        method: 'get',
        url: `https://${backEndDomain}/webapi/webmeetings/webupcomingMeetingList`,
        headers: {
          'Content-type': 'application/json',

        }
      })
        .then(function (response) {
          console.log(response.data.Data)
          if (response.data.message == "The Scheduled Meeting has been Canceled") {
            setnodata(true)

          } else {
            let dataaa1 = []
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            response.data.Data.map((data) => {
              var d = new Date(data.StartDateTime);
              const startdata = d.getDate() + "th" + " " + months[d.getMonth()] + " " + d.getFullYear()
              console.log(startdata)
              //  data.replace(data.StartDateTime, startdata);
              let hlo = {
                EndDateTime: data.EndDateTime,
                MeetingUrl: data.MeetingUrl,
                Reuests_RequestId: data.Reuests_RequestId,
                RoomId: data.RoomId,
                StartDateTime: startdata,
              }
              dataaa1.push(hlo)
            })
            console.log(dataaa1)
            setresdata(dataaa1)
          }


        }).catch(function (response) {
          //   if(response.response.status == 422){
          //  // console.log(response.response.status);
          //   }
        });
    } catch (err) {
      console.log(err);

    }


    try {
      axios({
        method: 'get',
        url: `https://${backEndDomain}/webapi/webmeetings/webrequestlist`,
        headers: {
          'Content-type': 'application/json',

        }
      })
        .then(function (response) {
          console.log(response.data.Data)
          setcomplaintid(response.data.Data)



        }).catch(function (response) {
          //   if(response.response.status == 422){
          //  // console.log(response.response.status);
          //   }
        });
    } catch (err) {
      console.log(err);

    }


    try {
      axios({
        method: 'get',
        url: `https://${backEndDomain}/webapi/webmeetings/webaddParticipantList?participants=`,
        // data:participants,
        headers: {
          'Content-type': 'application/json',

        }
      })
        .then(function (response) {
          console.log(response.data)
          let dataa = []
          response.data.Data.map((data) => {

            let hlo = {
              value: data,
              label: data,
            }
            dataa.push(hlo)
          })
          console.log(dataa)
          setparticipantsData(dataa)
          //setpaper(true)

        }).catch(function (response) {
          //   if(response.response.status == 422){
          //  // console.log(response.response.status);
          //   }
        });
    } catch (err) {
      console.log(err);

    }
  }, [])
  const location = useLocation();
  const [open1, setOpen1] = React.useState(false);

  const [meetopen, setmeetopen] = React.useState(false);
  const handleClose = () => {
    setOpen1(false);
    setmeetopen(false)
  };
  const [rid, setrid] = React.useState('');

  const cancelfun = (requestId) => {
    setOpen1(true);
    setrid(requestId)
    console.log(requestId)
  }
  const [personName, setPersonName] = React.useState([]);
  const [searchvalue, setsearchvalue] = React.useState('');
  const [participantsData, setparticipantsData] = React.useState([]);
  const [id, setid] = React.useState('');

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log(value)

    // setpaper(true)
  };
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };
  const handleChangeid = (event) => {
    setid(event.target.value);
    console.log(event.target.value)
  };
  const createmeet = () => {
    //    let emailname1=[]
    //     personName.map((data) => {
    // const emailname=data.split("-")[1].split(" ")[1]
    // emailname1.push(emailname)     

    //       })
    let email = []
    selectdata.optionSelected.map((data) => {
      const emailid = data.label.split("-")[1].split(" ")[1]
      email.push(emailid)

    })
    //  console.log(selectdata.optionSelected,email) 
    let Data = {
      "TenantId": localStorage.getItem('TenantId'),
      "email": email.toString(),//emailname1.toString(),//handleChangesearchvalue[0].split("-")[1].split(" ")[1],personName[0].split("-")[1].split(" ")[1]
      "RequestId": id
    }
    try {
      axios({
        method: 'post',
        url: `https://${backEndDomain}/webapi/webmeetings/webcreatemeeting`,
        data: Data,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          console.log(response.data)
          if (response.data.message == "Meeting created Successfully") {
            setmeetopen(true)
            try {
              axios({
                method: 'get',
                url: `https://${backEndDomain}/webapi/webmeetings/webupcomingMeetingList`,
                headers: {
                  'Content-type': 'application/json',

                }
              })
                .then(function (response) {
                  console.log(response.data.Data)

                  let dataaa1 = []
                  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                  response.data.Data.map((data) => {
                    var d = new Date(data.StartDateTime);
                    const startdata = d.getDate() + "th" + " " + months[d.getMonth()] + " " + d.getFullYear()
                    console.log(startdata)
                    //  data.replace(data.StartDateTime, startdata);
                    let hlo = {
                      EndDateTime: data.EndDateTime,
                      MeetingUrl: data.MeetingUrl,
                      Reuests_RequestId: data.Reuests_RequestId,
                      RoomId: data.RoomId,
                      StartDateTime: startdata,
                    }
                    dataaa1.push(hlo)
                  })
                  console.log(dataaa1)
                  setresdata(dataaa1)
                  setid('')
                  setselect({ optionSelected: null })

                }).catch(function (response) {
                  //   if(response.response.status == 422){
                  //  // console.log(response.response.status);
                  //   }
                });
            } catch (err) {
              console.log(err);

            }
          }

        }).catch(function (response) {
          //   if(response.response.status == 422){
          //  // console.log(response.response.status);
          //   }
        });
    } catch (err) {
      console.log(err);

    }
  }
  const [handleChangesearchvalue, sethandleChangesearchvalue] = React.useState([]);

  const handleChangesearch = (event) => {
    sethandleChangesearchvalue(event.target.value)
    if (event.target.value.length == 0) {
      setpaper(false)
    }
    try {
      axios({
        method: 'get',
        url: `https://${backEndDomain}/webapi/webmeetings/webaddParticipantList?participants=${event.target.value}`,
        // data:participants,
        headers: {
          'Content-type': 'application/json',

        }
      })
        .then(function (response) {
          console.log(response.data)
          setparticipantsData(response.data.Data)
          setpaper(true)

        }).catch(function (response) {
          //   if(response.response.status == 422){
          //  // console.log(response.response.status);
          //   }
        });
    } catch (err) {
      console.log(err);

    }
    const {
      target: { value },
    } = event;
    sethandleChangesearchvalue(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  }
  const selectemail = (name) => {
    // const {
    //   target: { value },
    // } = event;
    let mail = []
    mail.push(name)
    sethandleChangesearchvalue(mail);
    console.log(mail)
  }

  const handleCancle = () => {
    let canceldata = {
      "requestid": rid,

    }
    try {
      axios({
        method: 'put',
        url: `https://${backEndDomain}/webapi/webmeetings/webcancelmeeting`,
        data: canceldata,
        headers: {
          'Content-type': 'application/json',
          'token': jwt,
        }
      })
        .then(function (response) {
          console.log(response.data.message)
          if (response.data.message == "Meeting Cancelled Successfully") {
            setOpen1(false);
            try {
              axios({
                method: 'get',
                url: `https://${backEndDomain}/webapi/webmeetings/webupcomingMeetingList`,
                headers: {
                  'Content-type': 'application/json',

                }
              })
                .then(function (response) {
                  console.log(response.data.Data)

                  let dataaa1 = []
                  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                  response.data.Data.map((data) => {
                    var d = new Date(data.StartDateTime);
                    const startdata = d.getDate() + "th" + " " + months[d.getMonth()] + " " + d.getFullYear()
                    console.log(startdata)
                    //  data.replace(data.StartDateTime, startdata);
                    let hlo = {
                      EndDateTime: data.EndDateTime,
                      MeetingUrl: data.MeetingUrl,
                      Reuests_RequestId: data.Reuests_RequestId,
                      RoomId: data.RoomId,
                      StartDateTime: startdata,
                    }
                    dataaa1.push(hlo)
                  })
                  console.log(dataaa1)
                  setresdata(dataaa1)



                }).catch(function (response) {
                  //   if(response.response.status == 422){
                  //  // console.log(response.response.status);
                  //   }
                });
            } catch (err) {
              console.log(err);

            }
          }

        }).catch(function (response) {

        });
    } catch (err) {
      console.log(err);

    }
  }
  const [selectdata, setselect] = React.useState({
    optionSelected: null
  });

  const handleChangeselect = selected => {
    setselect({
      optionSelected: selected
    });
    console.log(selected)
  };
  // const [selectedOption, setSelectedOption] = useState("none");
  // const handleTypeSelect = e => {
  //   setSelectedOption(e.value);
  // const copyIcon = (row) => {
  //   // navigator.clipboard.writeText('')?
  //   navigator.clipboard.writeText(row.MeetingUrl)
  //   // document.execCommand('copy', true, row.MeetingUrl)
  // }
  // };
  return (

    <Layout>
      <Container className="meetings" maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} >
          {nodata == false ? <Grid item md={8} sm={12}>
            <Card>
              <CardContent>
                <Typography className='card-heading'> Upcoming Meetings : <span>{resdata.length}</span> </Typography>
                {resdata.map((row) => {
                  return (
                    <Box className="meet-bg-indicator">
                      <Box>
                        <Typography sx={{ mb: 1 }}>Complaint Id: <span>{row.Reuests_RequestId}</span></Typography>
                        <Stack direction="row" spacing={0} sx={{ whiteSpace: 'nowrap' }}>
                          <Typography>Meeting Link:&nbsp;</Typography>
                          <a href='#' ><Typography>{row.MeetingUrl} </Typography></a>
                          <CopyToClipboard text={row.MeetingUrl}>
                            <ContentCopyIcon sx={{ color: '#426e81', marginLeft: '5px', cursor: 'pointer' }} />
                          </CopyToClipboard>
                        </Stack>
                        <Box sx={{ mt: 2 }}>
                          <Typography>Created Date: <span>{row.StartDateTime}</span></Typography>
                        </Box>
                      </Box>
                      <Box sx={{ mt: 2 }} className='meet-btn'>
                        <Button variant="contained" onClick={() => { navigate(`/joinmeeting?${row.Reuests_RequestId}`) }} > <VideocamIcon />Join Meeting</Button>
                        <Button variant="outlined" onClick={() => cancelfun(row.Reuests_RequestId)} > - Cancel Meeting</Button>

                      </Box>
                    </Box>)
                })}
                {/* onClick={() => { navigate('/joinmeeting', { state: { roomname: row.Reuests_RequestId } }) }} */}
              </CardContent>
            </Card>
          </Grid> :
            <Grid item md={8} sm={12}>
              <Card>
                <CardContent>
                  <Typography className='card-heading'> Upcoming Meetings </Typography>
                  <Typography className="cancel-mmet-txt">The scheduled meeting has been canceled!</Typography>
                </CardContent>
              </Card>
            </Grid>}
          <Grid item md={4} sm={12}>
            <Card>
              <CardContent>
                <Box className="fo-bg-wrap">
                  <img src={meet}></img>
                  <Typography sx={{ mb: 2 }} className='card-heading'> Create Meeting</Typography>

                  <Box className="meet-field">
                    {/* <TextField
                  margin="normal"
                  // required
                  fullWidth
                  id="complaintid"
                  label="Enter Complaint ID"
                  name="complaintid"
                  // autoComplete="complaintid"
                  // autoFocus
                   /> */}

                    <Box>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"> Complaint ID</InputLabel>

                        <Select
                          id="demo-simple-select-label"
                          value={id}
                          onChange={handleChangeid}
                          // displayEmpty
                          // inputProps={{ 'aria-label': 'Without label' }}
                          input={<OutlinedInput label="Complaint ID" />}
                        >
                          <MenuItem value="">
                            Complaint ID
                          </MenuItem>
                          {complaintid.map((value, key) => (
                            <MenuItem value={value.RequestId}>{value.RequestId}</MenuItem>


                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                      <FormControl fullWidth>

                        <MySelect
                          options={participantsData}
                          isMulti
                          closeMenuOnSelect={false}
                          hideSelectedOptions={false}
                          components={{ Option, MultiValue, animatedComponents }}
                          onChange={handleChangeselect}
                          allowSelectAll={true}
                          value={selectdata.optionSelected}
                        />
                      </FormControl>
                    </Box>




                  </Box>
                  <Button variant="contained" sx={{ mt: 3, mb: 2 }} onClick={createmeet} > + Create Meeting</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Snackbar className='pwdalert' open={meetopen} autoHideDuration={2000} onClose={handleClose} >
          <Alert severity="success" sx={{ width: '50%' }}>
            Meeting created successfully
          </Alert>
        </Snackbar>
      </Container>
      {/* ____________________ modal____________ */}

      <Modal className="assign"
        open={open1}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className='pp-content'>
            <img className='pp-img' src={man}></img>
          </Box>
          <Typography>Are you sure you want to
            cancel the meeting?</Typography>
          <div style={{ marginLeft: '85px' }}>

            <Button variant="contained" size="large" sx={{ mt: 3, mb: 2 }} className='meetcancelbtn' onClick={handleClose}>No</Button>
            <Button variant="contained" style={{ marginRight: '30px' }} size="large" sx={{ mt: 3, mb: 2 }} className='meetbtn' onClick={handleCancle}>Yes</Button>
          </div>

        </Box>
      </Modal>
    </Layout>
    //}
    //  </>

  )
}

export default Managemeeting;