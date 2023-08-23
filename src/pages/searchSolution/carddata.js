import React, { useState, useEffect } from 'react'
import { Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import 'react-slideshow-image/dist/styles.css';
import "plyr-react/plyr.css"
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import setting from '../../assets/settingsicon.svg';
import notes from '../../assets/notes.svg';
import file from '../../assets/file.svg';
import toolicon from '../../assets/toolicon.svg';
import cam from '../../assets/cam.svg';
import document from '../../assets/document.svg';
import { getCardDataAi, getCardData } from '../../service/apiServices/cardDataservices'

function Carddata(props) {
    const [resolutionData, setResolutionData] = useState([])
    const [iconName, setIconName] = useState('resolution')
    useEffect(() => {
        setResolutionData(props.Resolution)
    }, [])

    const iconfunction = async (iconname, id) => {
        const obj = {
            "modelprefix": props.searchedval.modelprefix ? props.searchedval.modelprefix : '',
            "serialno": props.searchedval.serialno ? props.searchedval.serialno : '',
            "serialnoRange": props.searchedval.serialnoRange,
            "problemdes": props.searchedval.problemdes ? props.searchedval.problemdes : '',
            "smcs": props.searchedval.smcs ? props.searchedval.smcs : '',
            "faultcode": props.searchedval.faultcode ? props.searchedval.faultcode : '',
            "CommonResolutionnumber": props.searchedval.CommonResolutionnumber ? props.searchedval.CommonResolutionnumber.toString() : '',
            "Path_name": props.pathName ? props.pathName : "",
            "Step_number": id,
            "iconname": iconname,
            "infonumber": "",
            "probleminwords": props.searchedval.probleminwords || ""
        }
        //  console.log('objjj',obj);
        if (props.info) {
            const infoObj = {
                "modelprefix": props.searchedval.modelprefix ? props.searchedval.modelprefix : '',
                "serialno": props.searchedval.serialno ? props.searchedval.serialno : "",
                "serialnoRange": props.searchedval.serialnoRange ? props.searchedval.serialnoRange : '',
                "problemdes": props.searchedval.problemdes ? props.searchedval.problemdes : '',
                "smcs": props.searchedval.smcs ? props.searchedval.smcs : '',
                "faultcode": props.searchedval.faultcode ? props.searchedval.faultcode : '',
                "CommonResolutionnumber": props.searchedval.CommonResolutionnumber ? props.searchedval.CommonResolutionnumber.toString() : '',
                "probleminwords": props.searchedval.probleminwords || "",
                "Path_name": props.pathName,
                "iconname": iconname,
                "infonumber": String(id + 1)
            }
            //   console.log('resolutionObj',infoObj)
            if (props.info && props.ai) {
                let response = await getCardDataAi('info', infoObj);

                setResolutionData(response.data.data)
                setIconName(iconname)

            } else {
                let response = await getCardData('info', infoObj);
                setResolutionData(response.data.data)
                setIconName(iconname)

            }

        }
        else if (props.steps) {
            if (props.steps && props.ai) {
                let response = await getCardDataAi('stepname', obj);
                setResolutionData(response.data.data)
                setIconName(iconname)

            } else {
                let response = await getCardData('stepname', obj);

                setResolutionData(response.data.data)
                setIconName(iconname)
            }


        }
        else if (props.substeps) {
            const substepsObj = {
                "modelprefix": props.searchedval.modelprefix ? props.searchedval.modelprefix : '',
                "serialno": props.searchedval.serialno ? props.searchedval.serialno : '',
                "serialnoRange": props.searchedval.serialnoRange ? props.searchedval.serialnoRange : '',
                "problemdes": props.searchedval.problemdes ? props.searchedval.problemdes : '',
                "smcs": props.searchedval.smcs ? props.searchedval.smcs : '',
                "faultcode": props.searchedval.faultcode ? props.searchedval.faultcode : '',
                "CommonResolutionnumber": props.searchedval.CommonResolutionnumber ? props.searchedval.CommonResolutionnumber.toString() : '',
                "Path_name": props.pathName ? props.pathName : '',
                "probleminwords": props.searchedval.probleminwords || "",
                "Step_number": String(props.stepsIndex + 1),
                "sub_step_number": String(id + 1),
                "iconname": iconname,
                "infonumber": ""
            }
            if (props.steps && props.ai) {
                let response = await getCardDataAi('substeps', substepsObj);

                setResolutionData(response.data.data)
                setIconName(iconname)

            } else {
                let response = await getCardData('substeps', substepsObj);
                setResolutionData(response.data.data)
                setIconName(iconname)

            }
        }


    }


    return (
        <>
            {props.info && <>   <Card className='resolution-box1 common-info' >


                <Typography>{iconName == "resolution" ? <span><img src={document} className='title_icon'></img>Resolution</span>
                    : iconName == "common_tools" ? <span> <img src={setting} className='title_icon'></img>Common Tool</span>
                        : iconName == "special_tools" ? <span><img src={toolicon} className='title_icon'></img>Required Special Tool</span>
                            : iconName == "pdf" ? <span><img src={file} className='title_icon'></img>Supporting Document</span>
                                : iconName == "note" ? <span><img src={notes} className='title_icon'></img>Note </span>
                                    : iconName == "camera" ? <span><img src={cam} className='title_icon'></img> Photo</span>
                                        : iconName == "video" ? <span> <VideocamOutlinedIcon className='title_icon' />Video</span>
                                            : "Title"}

                </Typography>
            </Card>

                <Card className='resolution-cart-step'>
                    <CardContent>

                        <div className='resol_wrap'>
                            <div className='resol_left'>
                                {resolutionData?.length > 0 ? resolutionData.map((elem, ids) => {
                                    return (
                                        <div key={ids} className="line-sp">
                                            {/* {iconName =="resolution" ? <> {elem.split("\n").map((element)=>
                                              <Typography  > {element}</Typography>                                                
                                         )}</>
                                         :<>{iconName =="pdf" ? <>{elem ? <a href={elem} target="_blank">{elem}</a> : <Typography>No Data Available</Typography>}</>:
            <>{iconName =="camera" ? <a href={elem} target="_blank">{elem ? elem : 'No Data Available'}</a>:
            <>{iconName =="common_tools" ? <a href={elem} target="_blank">{elem ? elem : 'No Data Available'}</a>:
            <>{iconName =="video" ? <a href={elem} target="_blank">{elem ? elem : 'No Data Available'}</a>:

            <Typography>{elem ? elem : 'No Data Available'}</Typography>}</>}</>}</>}</>} */}
                                            {elem?.split("/")[0] == "https:" ?
                                                <a href={elem} target="_blank">{elem}</a> :
                                                <>{iconName == "resolution" ? <> {elem.split("\n").map((element) =>
                                                    <Typography  > {element}</Typography>
                                                )}</>
                                                    :
                                                    <Typography>{elem}</Typography>}</>
                                            }
                                        </div>
                                    )
                                })
                                    :
                                    <Typography>No Data Available</Typography>
                                }
                            </div>
                            <div className='resol_right'>
                                <div className='icon-vertical-alien'>
                                    <IconButton className={iconName == "resolution" ? 'resol_btn_active' : 'info_btn'} onClick={() => iconfunction("resolution", props.ids)}>  <img src={document} className="res-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "common_tools" ? 'resol_btn_active' : 'info_btn'} onClick={() => iconfunction("common_tools", props.ids)}>   <img src={setting} className="set-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "special_tools" ? 'resol_btn_active' : 'info_btn'} onClick={() => iconfunction("special_tools", props.ids)}>   <img src={toolicon} className="stool-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "pdf" ? 'resol_btn_active' : 'info_btn'} onClick={() => iconfunction("pdf", props.ids)} >   <img src={file} className="file-icon"></img></IconButton><br />
                                    <IconButton className={iconName == "note" ? 'resol_btn_active' : 'info_btn'} onClick={() => iconfunction("note", props.ids)}>   <img src={notes} className="note-icon" ></img></IconButton><br />
                                    <IconButton className={iconName == "camera" ? 'resol_btn_active' : 'info_btn'} onClick={() => iconfunction("camera", props.ids)}>  <img src={cam} className="cam-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "video" ? 'resol_btn_active' : 'info_btn'} onClick={() => iconfunction("video", props.ids)}>  <VideocamOutlinedIcon /> </IconButton><br />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card></>}

            {props.steps && <>   <Card className='resolution-box1 common-step' >


                <Typography>{iconName == "resolution" ? <span><img src={document} className='title_icon'></img>Resolution</span>
                    : iconName == "common_tools" ? <span> <img src={setting} className='title_icon'></img>Common Tool</span>
                        : iconName == "special_tools" ? <span><img src={toolicon} className='title_icon'></img>Required Special Tool</span>
                            : iconName == "pdf" ? <span><img src={file} className='title_icon'></img>Supporting Document</span>
                                : iconName == "note" ? <span><img src={notes} className='title_icon'></img>Note </span>
                                    : iconName == "camera" ? <span><img src={cam} className='title_icon'></img> Photo</span>
                                        : iconName == "video" ? <span> <VideocamOutlinedIcon className='title_icon' />Video</span>
                                            : "Title"}

                </Typography>
            </Card>

                <Card className='resolution-cart-step'>
                    <CardContent>

                        <div className='resol_wrap'>
                            <div className='resol_left'>
                                {resolutionData?.length > 0 ? resolutionData.map((elem, ids) => {
                                    return (
                                        <div key={ids} className="line-sp">

                                            {/* {iconName =="resolution" ? <> {elem.split("\n").map((element)=>
                                              <Typography  > {element}</Typography>                                                
                                         )}</>
                                         :<>{iconName =="pdf" ? <>{elem ? <a href={elem} target="_blank">{elem}</a> : <Typography>No Data Available</Typography>}</>:
            <>{iconName =="camera" ? <a href={elem} target="_blank">{elem ? elem : 'No Data Available'}</a>:
            <>{iconName =="common_tools" ? <a href={elem} target="_blank">{elem ? elem : 'No Data Available'}</a>:
            <>{iconName =="video" ? <a href={elem} target="_blank">{elem ? elem : 'No Data Available'}</a>:

            <Typography>{elem ? elem : 'No Data Available'}</Typography>}</>}</>}</>}</>} */}

                                            {elem?.split("/")[0] == "https:" ?
                                                <a href={elem} target="_blank">{elem}</a> :
                                                <>{iconName == "resolution" ? <> {elem.split("\n").map((element) =>
                                                    <Typography  > {element}</Typography>
                                                )}</>
                                                    :
                                                    <Typography>{elem}</Typography>}</>
                                            }
                                        </div>
                                    )
                                })
                                    :
                                    <Typography>No Data Available</Typography>
                                }
                            </div>
                            <div className='resol_right'>
                                <div className='icon-vertical-alien'>
                                    <IconButton className={iconName == "resolution" ? 'resol_btn_active' : 'step_btn'} onClick={() => iconfunction("resolution", props.ids)}>  <img src={document} className="res-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "common_tools" ? 'resol_btn_active' : 'step_btn'} onClick={() => iconfunction("common_tools", props.ids)}>   <img src={setting} className="set-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "special_tools" ? 'resol_btn_active' : 'step_btn'} onClick={() => iconfunction("special_tools", props.ids)}>   <img src={toolicon} className="stool-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "pdf" ? 'resol_btn_active' : 'step_btn'} onClick={() => iconfunction("pdf", props.ids)} >   <img src={file} className="file-icon"></img></IconButton><br />
                                    <IconButton className={iconName == "note" ? 'resol_btn_active' : 'step_btn'} onClick={() => iconfunction("note", props.ids)}>   <img src={notes} className="note-icon" ></img></IconButton><br />
                                    <IconButton className={iconName == "camera" ? 'resol_btn_active' : 'step_btn'} onClick={() => iconfunction("camera", props.ids)}>  <img src={cam} className="cam-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "video" ? 'resol_btn_active' : 'step_btn'} onClick={() => iconfunction("video", props.ids)}>  <VideocamOutlinedIcon /> </IconButton><br /></div>
                            </div>
                        </div>
                    </CardContent>
                </Card></>}

            {props.substeps && <>   <Card className='resolution-box1 common-substep' >


                {/* <Typography>{iconName == "resolution" ? <span><ArticleOutlinedIcon className='title_icon'/> Resolution</span> 
: iconName == "common_tools" ? <span><BuildIcon className='title_icon'/> Common Tools</span> 
: iconName == "special_tools" ? <span><LocalHospitalOutlinedIcon className='title_icon'/> Special Tools</span>
: iconName == "pdf" ? <span><InsertDriveFileIcon className='title_icon'/> Supporting Documents</span>
: iconName == "Note" ? <span><EventNoteOutlinedIcon className='title_icon'/>Notes</span>
: iconName == "camera" ? <span><CameraAltOutlinedIcon className='title_icon'/> Photo</span>
: iconName == "video" ? <span><VideocamOutlinedIcon className='title_icon'/> Video</span>
: "Title"} 
            
            </Typography> */}
                <Typography>{iconName == "resolution" ? <span><img src={document} className='title_icon'></img>Resolution</span>
                    : iconName == "common_tools" ? <span> <img src={setting} className='title_icon'></img>Common Tool</span>
                        : iconName == "special_tools" ? <span><img src={toolicon} className='title_icon'></img>Required Special Tool</span>
                            : iconName == "pdf" ? <span><img src={file} className='title_icon'></img>Supporting Document</span>
                                : iconName == "note" ? <span><img src={notes} className='title_icon'></img>Note </span>
                                    : iconName == "camera" ? <span><img src={cam} className='title_icon'></img> Photo</span>
                                        : iconName == "video" ? <span> <VideocamOutlinedIcon className='title_icon' />Video</span>
                                            : "Title"}

                </Typography>
            </Card>

                <Card className='resolution-cart-step'>
                    <CardContent>

                        <div className='resol_wrap'>
                            <div className='resol_left'>
                                {resolutionData?.length > 0 ? resolutionData.map((elem, ids) => {
                                    return (
                                        <div key={ids} className="line-sp">

                                            {/* {iconName =="resolution" ? <> {elem.split("\n").map((element)=>
                                              <Typography  > {element}</Typography>                                                
                                         )}</>
                                         :<>{iconName =="pdf" ? <>{elem ? <a href={elem} target="_blank">{elem}</a> : <Typography>No Data Available</Typography>}</>:
            <>{iconName =="camera" ? <a href={elem} target="_blank">{elem ? elem : 'No Data Available'}</a>:
            <>{iconName =="common_tools" ? <a href={elem} target="_blank">{elem ? elem : 'No Data Available'}</a>:
            <>{iconName =="video" ? <a href={elem} target="_blank">{elem ? elem : 'No Data Available'}</a>:

            <Typography>{elem ? elem : 'No Data Available'}</Typography>}</>}</>}</>}</>} */}
                                            {elem?.split("/")[0] == "https:" ?
                                                <a href={elem} target="_blank">{elem}</a> :
                                                <>{iconName == "resolution" ? <> {elem.split("\n").map((element) =>
                                                    <Typography  > {element}</Typography>
                                                )}</>
                                                    :
                                                    <Typography>{elem}</Typography>}</>
                                            }
                                        </div>
                                    )
                                })
                                    :
                                    <Typography>No Data Available</Typography>
                                }
                            </div>
                            <div className='resol_right'>
                                <div className='icon-vertical-alien'>
                                    {/* <IconButton className={iconName == "resolution" ? 'resol_btn_active' : 'substep_btn'}  onClick={() =>  iconfunction("resolution",props.ids)}>  <ArticleOutlinedIcon/> </IconButton><br/>
<IconButton className={iconName == "common_tools" ? 'resol_btn_active' : 'substep_btn'}  onClick={() => iconfunction("common_tools",props.ids)}>  <BuildIcon/> </IconButton><br/>
<IconButton className={iconName == "special_tools" ? 'resol_btn_active' : 'substep_btn'}  onClick={() => iconfunction("special_tools",props.ids)}>  <LocalHospitalOutlinedIcon/> </IconButton><br/>
<IconButton className={iconName == "pdf" ? 'resol_btn_active' : 'substep_btn'}   onClick={() => iconfunction("pdf",props.ids)} >  <InsertDriveFileIcon/> </IconButton><br/>
<IconButton className={iconName == "Note" ? 'resol_btn_active' : 'substep_btn'}  onClick={() => iconfunction("Note",props.ids)}>  <EventNoteOutlinedIcon/> </IconButton><br/>
<IconButton className={iconName == "camera" ? 'resol_btn_active' : 'substep_btn'}  onClick={() => iconfunction("camera",props.ids)}>  <CameraAltOutlinedIcon/> </IconButton><br/>
<IconButton className={iconName == "video" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("video",props.ids)}>  <VideocamOutlinedIcon/> </IconButton><br/> */}
                                    <IconButton className={iconName == "resolution" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("resolution", props.ids)}>  <img src={document} className="res-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "common_tools" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("common_tools", props.ids)}>   <img src={setting} className="set-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "special_tools" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("special_tools", props.ids)}>   <img src={toolicon} className="stool-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "pdf" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("pdf", props.ids)} >   <img src={file} className="file-icon"></img></IconButton><br />
                                    <IconButton className={iconName == "note" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("note", props.ids)}>   <img src={notes} className="note-icon" ></img></IconButton><br />
                                    <IconButton className={iconName == "camera" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("camera", props.ids)}>  <img src={cam} className="cam-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "video" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("video", props.ids)}>  <VideocamOutlinedIcon /> </IconButton><br />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card></>}
        </>

    )
}
export default Carddata;
