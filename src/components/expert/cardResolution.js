import React, { useState, useEffect } from 'react'
import { Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import 'react-slideshow-image/dist/styles.css';
import "plyr-react/plyr.css"
import { useNavigate } from 'react-router-dom';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import setting from '../../assets/settingsicon.svg';
import notes from '../../assets/notes.svg';
import file from '../../assets/file.svg';
import toolicon from '../../assets/toolicon.svg';
import cam from '../../assets/cam.svg';
import document from '../../assets/document.svg';
import { getCardDataAi, getCardData } from '../../service/apiServices/cardDataservices'
import { getIcondata } from '../../service/apiServices/resultServices';
import CreateIcon from '@mui/icons-material/Create';


function ResolutionCarddata(props) {
    const navigate = useNavigate();
    const [resolutionData, setResolutionData] = useState([])
    const [iconName, setIconName] = useState('Resolution')
    useEffect(() => {
        setResolutionData(props.Resolution)
    }, [])

    const iconfunction = async (iconname, id,backendicon) => {
        console.log(backendicon)
        let response = await getIcondata(iconname,id)
        if(response.status === 200){
            if(iconname == 'Resolution'){
                setResolutionData([response.data.data[0][backendicon]])
                setIconName(iconname)
            }else {
                setResolutionData(response.data.data[0][backendicon])
                setIconName(iconname)
            }

            
        }
}


    return (
        <>
            {props.commoninfo && <>   <Card className='resolution-box1 common-info' >
            

                <Typography>{iconName == "Resolution" ? <span><img src={document} className='title_icon'></img>Resolution</span>
                    : iconName == "CommonTools" ? <span> <img src={setting} className='title_icon'></img>Common Tool</span>
                        : iconName == "RequiredSpecialTools" ? <span><img src={toolicon} className='title_icon'></img>Required Special Tool</span>
                            : iconName == "SupportingDocuments" ? <span><img src={file} className='title_icon'></img>Supporting Document</span>
                                : iconName == "Note" ? <span><img src={notes} className='title_icon'></img>Note </span>
                                    : iconName == "Photo" ? <span><img src={cam} className='title_icon'></img> Photo</span>
                                        : iconName == "Video" ? <span> <VideocamOutlinedIcon className='title_icon' />Video</span>
                                            : "Title"}

                </Typography>
               {props.act == 'edit' && <IconButton aria-label="delete" className='resultedit' onClick={()=> {navigate('/editresolutions',{state:{data:props.statedata,value:props.source,type:'General',cardname:props.cardname,apiname:'updategeneralResolution'}})}}>
                    <CreateIcon color='primary' fontSize='small' />
                 </IconButton>}
            </Card>

                <Card className='resolution-cart-step'>
                    <CardContent>

                        <div className='resol_wrap'>
                            <div className='resol_left'>
                                {resolutionData?.length > 0 ? 
                                        <div  className="line-sp">
                                            {/* {iconName =="resolution" ? <> {elem.split("\n").map((element)=>
                                              <Typography  > {element}</Typography>                                                
                                         )}</>
                                         :<>{iconName =="pdf" ? <>{elem ? <a href={elem} target="_blank">{elem}</a> : <Typography>No Data Available</Typography>}</>:
            <>{iconName =="camera" ? <a href={elem} target="_blank">{elem ? elem : 'No Data Available'}</a>:
            <>{iconName =="common_tools" ? <a href={elem} target="_blank">{elem ? elem : 'No Data Available'}</a>:
            <>{iconName =="video" ? <a href={elem} target="_blank">{elem ? elem : 'No Data Available'}</a>:

            <Typography>{elem ? elem : 'No Data Available'}</Typography>}</>}</>}</>}</>} */}
                                            {/* {elem?.split("/")[0] == "https:" ?
                                                <a href={elem} target="_blank">{elem}</a> :
                                                <>{iconName == "resolution" ? <> {elem.split("\n").map((element) =>
                                                    <Typography  > {element}</Typography>
                                                )}</>
                                                    :
                                                    <Typography>{elem}</Typography>}</>
                                            } */}
                                                    <>{resolutionData?.map((element) =>
                                                    <Typography  > {element}</Typography>
                                                )} </>
                                        </div>
                                
                                    :
                                    <Typography>No Data Available</Typography>
                                }
                            </div>
                            <div className='resol_right'>
                                <div className='icon-vertical-alien'>
                                    <IconButton className={iconName == "Resolution" ? 'resol_btn_active' : 'info_btn'} onClick={() => iconfunction("Resolution", props.source,"Resolutions")}>  <img src={document} className="res-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "CommonTools" ? 'resol_btn_active' : 'info_btn'} onClick={() => iconfunction("CommonTools", props.source,"CommonTools")}>   <img src={setting} className="set-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "RequiredSpecialTools" ? 'resol_btn_active' : 'info_btn'} onClick={() => iconfunction("RequiredSpecialTools", props.source,"RequiredSpecialTools")}>   <img src={toolicon} className="stool-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "SupportingDocuments" ? 'resol_btn_active' : 'info_btn'} onClick={() => iconfunction("SupportingDocuments", props.source,"SupportingDocument")} >   <img src={file} className="file-icon"></img></IconButton><br />
                                    <IconButton className={iconName == "Note" ? 'resol_btn_active' : 'info_btn'} onClick={() => iconfunction("Note", props.source,"NoteDocument")}>   <img src={notes} className="note-icon" ></img></IconButton><br />
                                    <IconButton className={iconName == "Photo" ? 'resol_btn_active' : 'info_btn'} onClick={() => iconfunction("Photo", props.source,"Photo")}>  <img src={cam} className="cam-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "Video" ? 'resol_btn_active' : 'info_btn'} onClick={() => iconfunction("Video", props.source,"Video")}>  <VideocamOutlinedIcon /> </IconButton><br />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card></>}

            {props.info && <>   <Card className='resolution-box1 common-step' >


                <Typography>{iconName == "Resolution" ? <span><img src={document} className='title_icon'></img>Resolution</span>
                    : iconName == "CommonTools" ? <span> <img src={setting} className='title_icon'></img>Common Tool</span>
                        : iconName == "RequiredSpecialTools" ? <span><img src={toolicon} className='title_icon'></img>Required Special Tool</span>
                            : iconName == "SupportingDocuments" ? <span><img src={file} className='title_icon'></img>Supporting Document</span>
                                : iconName == "Note" ? <span><img src={notes} className='title_icon'></img>Note </span>
                                    : iconName == "Photo" ? <span><img src={cam} className='title_icon'></img> Photo</span>
                                        : iconName == "Video" ? <span> <VideocamOutlinedIcon className='title_icon' />Video</span>
                                            : "Title"}

                </Typography>
                {props.act == 'edit' && <IconButton aria-label="delete"  className='resultedit' onClick={()=> {navigate('/editresolutions',{state:{data:props.statedata,value:props.source,type:'General',cardname:props.cardname,apiname:'updateinfodata'}})}}>
                    <CreateIcon color='primary' fontSize='small' />
                 </IconButton>}
            </Card>

                <Card className='resolution-cart-step'>
                    <CardContent>

                        <div className='resol_wrap'>
                            <div className='resol_left'>
                            { resolutionData?.length > 0 ?
                                        <div className="line-sp">

                                            {/* {iconName =="resolution" ? <> {elem.split("\n").map((element)=>
                                              <Typography  > {element}</Typography>                                                
                                         )}</>
                                         :<>{iconName =="pdf" ? <>{elem ? <a href={elem} target="_blank">{elem}</a> : <Typography>No Data Available</Typography>}</>:
            <>{iconName =="camera" ? <a href={elem} target="_blank">{elem ? elem : 'No Data Available'}</a>:
            <>{iconName =="common_tools" ? <a href={elem} target="_blank">{elem ? elem : 'No Data Available'}</a>:
            <>{iconName =="video" ? <a href={elem} target="_blank">{elem ? elem : 'No Data Available'}</a>:

            <Typography>{elem ? elem : 'No Data Available'}</Typography>}</>}</>}</>}</>} */}

                                            {/* {elem?.split("/")[0] == "https:" ?
                                                <a href={elem} target="_blank">{elem}</a> :
                                                <>{iconName == "resolution" ? <> {elem.split("\n").map((element) =>
                                                    <Typography  > {element}</Typography>
                                                )}</>
                                                    :
                                                    <Typography>{elem}</Typography>}</>
                                            } */}
                                                   <>{resolutionData?.map((element) =>
                                                    <Typography  > {element}</Typography>
                                                )} </>
                                                   
                                        </div>
        
                                    :
                                    <Typography>No Data Available</Typography>
                                } 
                            </div>
                            <div className='resol_right'>
                                <div className='icon-vertical-alien'>
                                    <IconButton className={iconName == "Resolution" ? 'resol_btn_active' : 'step_btn'} onClick={() => iconfunction("Resolution", props.source,"Resolutions")}>  <img src={document} className="res-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "CommonTools" ? 'resol_btn_active' : 'step_btn'} onClick={() => iconfunction("CommonTools", props.source,"CommonTools")}>   <img src={setting} className="set-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "RequiredSpecialTools" ? 'resol_btn_active' : 'step_btn'} onClick={() => iconfunction("RequiredSpecialTools", props.source,"RequiredSpecialTools")}>   <img src={toolicon} className="stool-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "SupportingDocuments" ? 'resol_btn_active' : 'step_btn'} onClick={() => iconfunction("SupportingDocuments", props.source,"SupportingDocument")} >   <img src={file} className="file-icon"></img></IconButton><br />
                                    <IconButton className={iconName == "Note" ? 'resol_btn_active' : 'step_btn'} onClick={() => iconfunction("Note", props.source,"NoteDocument")}>   <img src={notes} className="note-icon" ></img></IconButton><br />
                                    <IconButton className={iconName == "Photo" ? 'resol_btn_active' : 'step_btn'} onClick={() => iconfunction("Photo", props.source,"Photo")}>  <img src={cam} className="cam-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "Video" ? 'resol_btn_active' : 'step_btn'} onClick={() => iconfunction("Video", props.source,"Video")}>  <VideocamOutlinedIcon /> </IconButton><br /></div>
                            </div>
                        </div>
                    </CardContent>
                </Card></>}

            {props.step && <>   <Card className='resolution-box1 common-substep' >

                <Typography>{iconName == "Resolution" ? <span><img src={document} className='title_icon'></img>Resolution</span>
                    : iconName == "CommonTools" ? <span> <img src={setting} className='title_icon'></img>Common Tool</span>
                        : iconName == "RequiredSpecialTools" ? <span><img src={toolicon} className='title_icon'></img>Required Special Tool</span>
                            : iconName == "SupportingDocuments" ? <span><img src={file} className='title_icon'></img>Supporting Document</span>
                                : iconName == "Note" ? <span><img src={notes} className='title_icon'></img>Note </span>
                                    : iconName == "Photo" ? <span><img src={cam} className='title_icon'></img> Photo</span>
                                        : iconName == "Video" ? <span> <VideocamOutlinedIcon className='title_icon' />Video</span>
                                            : "Title"}

                </Typography>
                {props.act == 'edit' && <IconButton aria-label="delete"  className='resultedit' onClick={()=> {navigate('/editresolutions',{state:{data:props.statedata,value:props.source,type:'General',cardname:props.cardname,apiname:'updateinfostepdata'}})}}>
                    <CreateIcon color='primary' fontSize='small' />
                 </IconButton>}
            </Card>

                <Card className='resolution-cart-step'>
                    <CardContent>

                        <div className='resol_wrap'>
                            <div className='resol_left'>
                                {resolutionData?.length > 0 ? 
                                        <div  className="line-sp">

                                            {/* {iconName =="resolution" ? <> {elem.split("\n").map((element)=>
                                              <Typography  > {element}</Typography>                                                
                                         )}</>
                                         :<>{iconName =="pdf" ? <>{elem ? <a href={elem} target="_blank">{elem}</a> : <Typography>No Data Available</Typography>}</>:
            <>{iconName =="camera" ? <a href={elem} target="_blank">{elem ? elem : 'No Data Available'}</a>:
            <>{iconName =="common_tools" ? <a href={elem} target="_blank">{elem ? elem : 'No Data Available'}</a>:
            <>{iconName =="video" ? <a href={elem} target="_blank">{elem ? elem : 'No Data Available'}</a>:

            <Typography>{elem ? elem : 'No Data Available'}</Typography>}</>}</>}</>}</>} */}
                                            {/* {elem?.split("/")[0] == "https:" ?
                                                <a href={elem} target="_blank">{elem}</a> :
                                                <>{iconName == "resolution" ? <> {elem.split("\n").map((element) =>
                                                    <Typography  > {element}</Typography>
                                                )}</>
                                                    :
                                                    <Typography>{elem}</Typography>}</>
                                            } */}
                                                     <>{resolutionData?.map((element) =>
                                                    <Typography  > {element}</Typography>
                                                )} </>
                                            {/* <Typography>{resolutionData.Resolutions}</Typography> */}
                                        </div>
                                    :
                                    <Typography>No Data Available</Typography>
                                }
                            </div>
                            <div className='resol_right'>
                                <div className='icon-vertical-alien'>
                                    
                                    {/* <IconButton className={iconName == "resolution" ? 'resol_btn_active' : 'substep_btn'}  onClick={() =>  iconfunction("resolution",props.source)}>  <ArticleOutlinedIcon/> </IconButton><br/>
<IconButton className={iconName == "common_tools" ? 'resol_btn_active' : 'substep_btn'}  onClick={() => iconfunction("common_tools",props.source)}>  <BuildIcon/> </IconButton><br/>
<IconButton className={iconName == "special_tools" ? 'resol_btn_active' : 'substep_btn'}  onClick={() => iconfunction("special_tools",props.source)}>  <LocalHospitalOutlinedIcon/> </IconButton><br/>
<IconButton className={iconName == "pdf" ? 'resol_btn_active' : 'substep_btn'}   onClick={() => iconfunction("pdf",props.source)} >  <InsertDriveFileIcon/> </IconButton><br/>
<IconButton className={iconName == "Note" ? 'resol_btn_active' : 'substep_btn'}  onClick={() => iconfunction("Note",props.source)}>  <EventNoteOutlinedIcon/> </IconButton><br/>
<IconButton className={iconName == "camera" ? 'resol_btn_active' : 'substep_btn'}  onClick={() => iconfunction("camera",props.source)}>  <CameraAltOutlinedIcon/> </IconButton><br/>
<IconButton className={iconName == "video" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("video",props.source)}>  <VideocamOutlinedIcon/> </IconButton><br/> */}
                                    <IconButton className={iconName == "Resolution" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("Resolution", props.source,"Resolutions")}>  <img src={document} className="res-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "CommonTools" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("CommonTools", props.source,"CommonTools")}>   <img src={setting} className="set-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "RequiredSpecialTools" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("RequiredSpecialTools", props.source,"RequiredSpecialTools")}>   <img src={toolicon} className="stool-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "SupportingDocuments" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("SupportingDocuments", props.source,"SupportingDocument")} >   <img src={file} className="file-icon"></img></IconButton><br />
                                    <IconButton className={iconName == "Note" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("Note", props.source,"NoteDocument")}>   <img src={notes} className="note-icon" ></img></IconButton><br />
                                    <IconButton className={iconName == "Photo" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("Photo", props.source,"Photo")}>  <img src={cam} className="cam-icon"></img> </IconButton><br />
                                    <IconButton className={iconName == "Video" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("Video", props.source,"Video")}>  <VideocamOutlinedIcon /> </IconButton><br />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card></>}
                {props.substep && <>   <Card className='resolution-box1 common-substep' >

<Typography>{iconName == "Resolution" ? <span><img src={document} className='title_icon'></img>Resolution</span>
    : iconName == "CommonTools" ? <span> <img src={setting} className='title_icon'></img>Common Tool</span>
        : iconName == "RequiredSpecialTools" ? <span><img src={toolicon} className='title_icon'></img>Required Special Tool</span>
            : iconName == "SupportingDocuments" ? <span><img src={file} className='title_icon'></img>Supporting Document</span>
                : iconName == "Note" ? <span><img src={notes} className='title_icon'></img>Note </span>
                    : iconName == "Photo" ? <span><img src={cam} className='title_icon'></img> Photo</span>
                        : iconName == "Video" ? <span> <VideocamOutlinedIcon className='title_icon' />Video</span>
                            : "Title"}

</Typography>
{props.act == 'edit' && <IconButton aria-label="delete"  className='resultedit' onClick={()=> {navigate('/editresolutions',{state:{data:props.statedata,value:props.source,type:'General',cardname:props.cardname,apiname:'updateinfosubstepdata'}})}}>
                    <CreateIcon color='primary' fontSize='small' />
                 </IconButton>}
</Card>

<Card className='resolution-cart-step'>
    <CardContent>

        <div className='resol_wrap'>
            <div className='resol_left'>
                {resolutionData?.length > 0 ? 
                        <div  className="line-sp">

                            {/* {iconName =="resolution" ? <> {elem.split("\n").map((element)=>
                              <Typography  > {element}</Typography>                                                
                         )}</>
                         :<>{iconName =="pdf" ? <>{elem ? <a href={elem} target="_blank">{elem}</a> : <Typography>No Data Available</Typography>}</>:
<>{iconName =="camera" ? <a href={elem} target="_blank">{elem ? elem : 'No Data Available'}</a>:
<>{iconName =="common_tools" ? <a href={elem} target="_blank">{elem ? elem : 'No Data Available'}</a>:
<>{iconName =="video" ? <a href={elem} target="_blank">{elem ? elem : 'No Data Available'}</a>:

<Typography>{elem ? elem : 'No Data Available'}</Typography>}</>}</>}</>}</>} */}
                            {/* {elem?.split("/")[0] == "https:" ?
                                <a href={elem} target="_blank">{elem}</a> :
                                <>{iconName == "resolution" ? <> {elem.split("\n").map((element) =>
                                    <Typography  > {element}</Typography>
                                )}</>
                                    :
                                    <Typography>{elem}</Typography>}</>
                            } */}
                                     <>{resolutionData?.map((element) =>
                                                    <Typography  > {element}</Typography>
                                                )} </>
                            {/* <Typography>{resolutionData.Resolutions}</Typography> */}
                        </div>
                    :
                    <Typography>No Data Available</Typography>
                }
            </div>
            <div className='resol_right'>
                <div className='icon-vertical-alien'>
                    {/* <IconButton className={iconName == "resolution" ? 'resol_btn_active' : 'substep_btn'}  onClick={() =>  iconfunction("resolution",props.source)}>  <ArticleOutlinedIcon/> </IconButton><br/>
<IconButton className={iconName == "common_tools" ? 'resol_btn_active' : 'substep_btn'}  onClick={() => iconfunction("common_tools",props.source)}>  <BuildIcon/> </IconButton><br/>
<IconButton className={iconName == "special_tools" ? 'resol_btn_active' : 'substep_btn'}  onClick={() => iconfunction("special_tools",props.source)}>  <LocalHospitalOutlinedIcon/> </IconButton><br/>
<IconButton className={iconName == "pdf" ? 'resol_btn_active' : 'substep_btn'}   onClick={() => iconfunction("pdf",props.source)} >  <InsertDriveFileIcon/> </IconButton><br/>
<IconButton className={iconName == "Note" ? 'resol_btn_active' : 'substep_btn'}  onClick={() => iconfunction("Note",props.source)}>  <EventNoteOutlinedIcon/> </IconButton><br/>
<IconButton className={iconName == "camera" ? 'resol_btn_active' : 'substep_btn'}  onClick={() => iconfunction("camera",props.source)}>  <CameraAltOutlinedIcon/> </IconButton><br/>
<IconButton className={iconName == "video" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("video",props.source)}>  <VideocamOutlinedIcon/> </IconButton><br/> */}
                    <IconButton className={iconName == "Resolution" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("Resolution", props.source,"Resolutions")}>  <img src={document} className="res-icon"></img> </IconButton><br />
                    <IconButton className={iconName == "CommonTools" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("CommonTools", props.source,"CommonTools")}>   <img src={setting} className="set-icon"></img> </IconButton><br />
                    <IconButton className={iconName == "RequiredSpecialTools" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("RequiredSpecialTools", props.source,"RequiredSpecialTools")}>   <img src={toolicon} className="stool-icon"></img> </IconButton><br />
                    <IconButton className={iconName == "SupportingDocuments" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("SupportingDocuments", props.source,"SupportingDocument")} >   <img src={file} className="file-icon"></img></IconButton><br />
                    <IconButton className={iconName == "Note" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("Note", props.source,"NoteDocument")}>   <img src={notes} className="note-icon" ></img></IconButton><br />
                    <IconButton className={iconName == "Photo" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("Photo", props.source,"Photo")}>  <img src={cam} className="cam-icon"></img> </IconButton><br />
                    <IconButton className={iconName == "Video" ? 'resol_btn_active' : 'substep_btn'} onClick={() => iconfunction("Video", props.source,"Video")}>  <VideocamOutlinedIcon /> </IconButton><br />
                </div>
            </div>
        </div>
    </CardContent>
</Card></>}
        </>

    )
}
export default ResolutionCarddata;
