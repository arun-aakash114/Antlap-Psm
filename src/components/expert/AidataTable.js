import React, { useEffect } from 'react'
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { visuallyHidden } from '@mui/utils';
import TableSortLabel from '@mui/material/TableSortLabel';
import { aiDataTable, approve, getCode } from '../../service/apiServices/aisourceCreation';
import TablePagination from '@mui/material/TablePagination';
import CreateIcon from '@mui/icons-material/Create';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useDispatch } from 'react-redux';
import { updateToast } from '../../store/reducers/toasters';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { revertDec } from '../../store/reducers/toasters';
import { declineReasons } from '../../service/apiServices/aisourceCreation';
import { decline } from '../../service/apiServices/aisourceCreation';
import { updateResponce } from '../../store/reducers/apiResponces';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { statuschange } from '../../service/apiServices/aisourceCreation';
// improve approve

const headCellsNonIoT = [
    {
        id: 'Model',
        numeric: false,
        disablePadding: false,
        label: 'Model',
        sortable: true
    },
    {
        id: 'Prefix',
        numeric: true,
        disablePadding: false,
        label: 'Serial Prefix',
        sortable: true
    },
    {
        id: 'SerialNumber',
        numeric: false,
        disablePadding: true,
        label: 'Serial No Range',
        sortable: true
    },
    {
        id: 'Complaint_Description',
        numeric: true,
        disablePadding: false,
        label: 'Complaint Description',
        sortable: true
    },
    {
        id: 'ProblemDescription',
        numeric: true,
        disablePadding: false,
        label: 'Problem/Desc Code',
        sortable: true
    },
    {
        id: 'SMCS',
        numeric: true,
        disablePadding: false,
        label: 'SMCS Comp.Code',
        sortable: true
    },
    {
        id: 'StatusDescription',
        numeric: true,
        disablePadding: false,
        label: 'Status',
        sortable: true
    },
    {
        id: 'CreatedBy',
        numeric: true,
        disablePadding: false,
        label: 'Created By',
        sortable: true
    },
    {
        id: 'CreatedDate',
        numeric: true,
        disablePadding: false,
        label: 'Created On',
        sortable: true
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Action',
        sortable: false
    },
];

const headCellIoT = [
    {
        id: 'Model',
        numeric: false,
        disablePadding: false,
        label: 'Model',
        sortable: true
    },
    {
        id: 'Prefix',
        numeric: true,
        disablePadding: false,
        label: 'Serial Prefix',
        sortable: true
    },
    {
        id: 'SerialNumber',
        numeric: false,
        disablePadding: true,
        label: 'Serial No Range',
        sortable: true
    },
    {
        id: 'FaultCode',
        numeric: true,
        disablePadding: false,
        label: 'Fault code',
        sortable: true
    },
    {
        id: 'FalutCodeDescription',
        numeric: true,
        disablePadding: false,
        label: 'Fault code Description',
        sortable: true
    },
    {
        id: 'SMCS',
        numeric: true,
        disablePadding: false,
        label: 'SMCS Comp.Code',
        sortable: true
    },
    {
        id: 'StatusDescription',
        numeric: true,
        disablePadding: false,
        label: 'Status',
        sortable: true
    },
    {
        id: 'CreatedBy',
        numeric: true,
        disablePadding: false,
        label: 'Created By',
        sortable: true
    },
    {
        id: 'CreatedDate',
        numeric: true,
        disablePadding: false,
        label: 'Created On',
        sortable: true
    },
    {
        id: 'action',
        numeric: true,
        disablePadding: false,
        label: 'Action',
        sortable: false
    },

]

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        // if (property == 'action' || property == 'complaintDesc') {

        // } else { onRequestSort(event, property); }
        onRequestSort(event, property);

    };
    let headCells = [];
    if (sessionStorage.getItem('proType') === 'Non IoT') {
        headCells = [...headCellsNonIoT]
    } else {
        headCells = [...headCellIoT]
    }

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            disabled={!headCell.sortable ? true : false}
                        // hideSortIcon={true}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    
};

const AidataTable = (props) => {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let { toaster, apiResponce } = useSelector((state) => state);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [declinereason, setDeclineReason] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [order, setOrder] = React.useState('');
    const [orderBy, setOrderBy] = React.useState('');
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleRequestSort = (event, property) => {
        console.log(property, "SORT CALL")
        setOrderBy(property);
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');

    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const handleClick = async (event, id) => {
        console.log(id)
        setAnchorEl(event.currentTarget);
        let res = await declineReasons(id);
        if (res.code === 200) {
            setDeclineReason(res.Data)
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [declineReasonList, setdeclineReasonList] = React.useState([])
    const [decReason, setdecReason] = React.useState('')
    const [commands, setCommands] = React.useState('')
    const reasonFunc = async (id) => {
        let res = await declineReasons(id);
        if (res.code === 200) {

            res.Data.forEach((row) => {
                setdeclineReasonList(res.Data)
            })
        }
        // console.log('ads', declineReasonList);
    }

    const decLine = async () => {
        let payload = {
            "tenantId": localStorage.getItem('TenantId'),
            "reason": decReason,
            "comment": commands,
            "sourceId": sessionStorage.getItem('sourceId')
        }
        let res = await decline(payload);
        if (res.code === 200) {
            sessionStorage.removeItem('sourceId')
            window.location.reload(true)
        } else {
            sessionStorage.removeItem('sourceId')
            alert('Data not declined')
            window.location.reload(true)
        }
    }

    const Actions = async (allData, act) => {
        let response = await getCode(allData.SourceId);
        if (act == 'approve') {
            let payload = {
                "tenantId": localStorage.getItem('TenantId'),
                "sourceId": Number(allData.SourceId)
            }
            let res = await approve(payload);
            if (res.code === 200) {
                window.location.reload(true)
            }
        } else if (act == 'view' || act == 'edit') {
            let payload = sessionStorage.getItem('proType') !== 'IoT' ? {
                "model": allData.Model,
                "Prefix": allData.Prefix,
                "serialNoRange": allData.SerialNumber,
                // "SMCScode": (allData.SMCS !== null && Array.isArray(allData.SMCS)) ? allData.SMCS.join(',') : allData.SMCS[0],
                "SMCScode": response.data.SMCS,
                "ProblemCode": response.data.ProblemDescription,
                "complaintDes": allData.Complaint_Description
            } : {
                "model": allData.Model,
                "Prefix": allData.Prefix,
                "serialNoRange": allData.SerialNumber,
                "SMCScode": response.data.SMCS,
                // "SMCScode": allData.SMCS !==null ? allData.SMCS.join(',') : "",
                // "SMCScode": (allData.SMCS !== null && Array.isArray(allData.SMCS)) ? allData.SMCS.join(',') : allData.SMCS == null ? '' : allData.SMCS[0],
                "faultCode": allData.FaultCode,
                "faultDesc": allData.FalutCodeDescription
            }
            if (localStorage.getItem('userDesc') === 'Expert Admin') {

                let res = await statuschange({ tenantId: localStorage.getItem('TenantId'), sourceId: Number(allData.SourceId) })
                if (res.code === 200) {

                    navigate('/resolutions', { state: { data: payload, act: act, id: allData.SourceId } })
                }
            } else {
                navigate('/resolutions', { state: { data: payload, act: act, id: allData.SourceId } })
            }


        }

    }
    useEffect(() => {

        (async () => {

            if (props.filterdata.length === 0) {
                if (apiResponce.viewList.length === 0) {

                    let res = await aiDataTable(sessionStorage.getItem('proType') === 'IoT' ? 'IOT' : 'NONIOT')
                    if (res.code === 200) {
                        // setSourceDataList(res.Data)
                        dispatch(updateResponce({ field: 'viewList', value: res.Data }));
                    }
                }
            } else {

            }

            // console.log('ddd', res)
        })();
        reasonFunc();



    }, [])
    return (
        <>
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={'medium'}
                >
                    <EnhancedTableHead
                        // numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={apiResponce.viewList?.length}
                    />
                    <TableBody>
                        {
                            stableSort(apiResponce.viewList, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, i) => (
                                    <>
                                        {
                                            sessionStorage.getItem('proType') === 'Non IoT' &&

                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={i}
                                            >
                                                <TableCell >{row.Model}</TableCell>
                                                <TableCell >{row.Prefix}</TableCell>
                                                <TableCell >{row.SerialNumber}</TableCell>
                                                <TableCell >{row.Complaint_Description}</TableCell>
                                                <TableCell >{row.ProblemDescription}</TableCell>
                                                <TableCell >{row.SMCS}</TableCell>
                                                <TableCell style={{ whiteSpace: 'nowrap' }}><span className={row.StatusDescription === 'In Progress' ? 'status-inprogress'
                                                    : row.StatusDescription === 'Declined' ? 'status-declined'
                                                        : row.StatusDescription === 'Approved' ? 'status-approved'
                                                            : row.StatusDescription === 'Waiting for Approval' ? 'status-waitingApproval'
                                                                : 'status'}>{row.StatusDescription}</span> {row.StatusDescription === 'Declined' && <InfoOutlinedIcon className='info' aria-describedby={id} onClick={(e) => { handleClick(e, row.SourceId) }} />}
                                                    <span>{row.StatusDescription === 'Declined' && <>

                                                        <Popover
                                                            id={id}
                                                            open={open}
                                                            anchorEl={anchorEl}
                                                            onClose={handleClose}
                                                            anchorOrigin={{
                                                                vertical: 'bottom',
                                                                horizontal: 'left',
                                                            }}
                                                        >
                                                            <div className='poppercontent'>
                                                                <h5 >Reason</h5>
                                                                {/* <Typography sx={{ p: 2 }} >{declinereason[0]?.ReasonCodes_M_ReasonCode}</Typography> */}
                                                                <h6  >{declinereason[0]?.ReasonCodes_M_ReasonCode}</h6>

                                                                <h5 style={{ marginTop: '10px' }}>Comment</h5>
                                                                {/* <Typography sx={{ p: 2 }} >{declinereason[0]?.Comments}</Typography> */}
                                                                <h6  >{declinereason[0]?.Comments}</h6>
                                                            </div>
                                                        </Popover>
                                                    </>}</span></TableCell>
                                                <TableCell >{row.CreatedBy}</TableCell>
                                                <TableCell >{new Date(row.CreatedDate).toDateString()}</TableCell>
                                                <TableCell style={{ display: 'flex', justifyContent: 'center' }}>
                                                    {(row.StatusDescription === 'Waiting For Approval' && localStorage.getItem('userDesc') === 'Expert Admin') &&
                                                        <>
                                                            <IconButton aria-label="delete" className='tablebutton success' onClick={() => Actions(row, 'approve')} >
                                                                <DoneIcon color='success' fontSize='small' />
                                                            </IconButton>
                                                            <IconButton aria-label="delete" className='tablebutton error' onClick={() => Actions(row, 'decline')} >
                                                                <CancelIcon sx={{ color: 'red' }} fontSize='small' onClick={() => { dispatch(updateToast({ field: 'declineState' })); reasonFunc(); sessionStorage.setItem('sourceId', row.SourceId) }} />
                                                            </IconButton>

                                                        </>

                                                    }
                                                    {
                                                        (localStorage.getItem('userDesc') === 'Expert Admin' && (row.StatusDescription === 'Approved' || row.StatusDescription === 'Waiting For Approval')) &&

                                                        <IconButton aria-label="delete" onClick={() => Actions(row, 'edit')} className='tablebutton primary'>
                                                            <CreateIcon color='primary' fontSize='small' />
                                                        </IconButton>
                                                    }
                                                    {
                                                        (localStorage.getItem('userDesc') === 'Expert' && (row.StatusDescription == 'In Progress' || row.StatusDescription == 'Declined')) &&

                                                        <IconButton aria-label="delete" onClick={() => Actions(row, 'edit')} className='tablebutton primary'>
                                                            <CreateIcon color='primary' fontSize='small' />
                                                        </IconButton>
                                                    }
                                                    {
                                                        row.StatusDescription !== 'In Progress' &&
                                                        <IconButton aria-label="delete" onClick={() => Actions(row, 'view')} className='tablebutton grey'>
                                                            <VisibilityIcon fontSize='small' />

                                                        </IconButton>
                                                    }





                                                </TableCell>

                                            </TableRow>
                                        }
                                        {
                                            sessionStorage.getItem('proType') !== 'Non IoT' &&
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                                key={i}
                                            >
                                                <TableCell >{row.Model}</TableCell>
                                                <TableCell >{row.Prefix}</TableCell>
                                                <TableCell >{row.SerialNumber}</TableCell>
                                                {/* <TableCell >{row.Complaint_Description}</TableCell> */}
                                                <TableCell >{row.FaultCode}</TableCell>
                                                <TableCell >{row.FalutCodeDescription}</TableCell>
                                                <TableCell >{row.SMCS}</TableCell>
                                                <TableCell style={{ whiteSpace: 'nowrap' }}><span className={row.StatusDescription === 'In Progress' ? 'status-inprogress'
                                                    : row.StatusDescription === 'Declined' ? 'status-declined'
                                                        : row.StatusDescription === 'Approved' ? 'status-approved'
                                                            : row.StatusDescription === 'Waiting for Approval' ? 'status-waitingApproval'
                                                                : 'status'}>{row.StatusDescription}</span><span>{row.StatusDescription === 'Declined' && <>
                                                                    <InfoOutlinedIcon aria-describedby={id} onClick={(e) => { handleClick(e, row.SourceId) }} />
                                                                    <Popover
                                                                        id={id}
                                                                        open={open}
                                                                        anchorEl={anchorEl}
                                                                        onClose={handleClose}
                                                                        anchorOrigin={{
                                                                            vertical: 'bottom',
                                                                            horizontal: 'left',
                                                                        }}
                                                                    >
                                                                        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                                                                    </Popover>
                                                                </>}</span></TableCell>
                                                <TableCell >{row.CreatedBy}</TableCell>
                                                <TableCell >{new Date(row.CreatedDate).toDateString()}</TableCell>
                                                <TableCell style={{ display: 'flex', justifyContent: 'center' }}>
                                                    {(row.StatusDescription === 'Waiting For Approval' && localStorage.getItem('userDesc') === 'Expert Admin') &&
                                                        <>
                                                            <IconButton aria-label="delete" onClick={() => Actions(row, 'approve')} className='tablebutton success'>
                                                                <DoneIcon fontSize='small' />
                                                            </IconButton>
                                                            <IconButton aria-label="delete" className='tablebutton error' fontSize='small' onClick={() => { dispatch(updateToast({ field: 'declineState' })); reasonFunc(); sessionStorage.setItem('sourceId', row.SourceId) }} >
                                                                <CancelIcon fontSize='small' />
                                                            </IconButton>

                                                        </>

                                                    }
                                                    {
                                                        (localStorage.getItem('userDesc') === 'Expert Admin' && (row.StatusDescription == 'Approved' || row.StatusDescription == 'Waiting for Approval')) &&
                                                        <IconButton aria-label="delete" onClick={() => Actions(row, 'edit')} className='tablebutton primary'>
                                                            <CreateIcon color='primary' fontSize='small' />
                                                        </IconButton>

                                                    }
                                                    {
                                                        (localStorage.getItem('userDesc') === 'Expert' && (row.StatusDescription == 'In Progress' || row.StatusDescription == 'Declined')) &&

                                                        <IconButton aria-label="delete" onClick={() => Actions(row, 'edit')} className='tablebutton primary'>
                                                            <CreateIcon color='primary' fontSize='small' />
                                                        </IconButton>
                                                    }
                                                    {row.StatusDescription !== 'In Progress' &&
                                                        <IconButton aria-label="delete" onClick={() => Actions(row, 'view')} className='tablebutton grey'>
                                                            <VisibilityOutlinedIcon fontSize='small' />
                                                        </IconButton>}

                                                </TableCell>

                                            </TableRow>
                                        }
                                    </>
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={apiResponce.viewList.length}
                labelRowsPerPage={"Show"}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                showFirstButton={true}
                showLastButton={true}
                onRowsPerPageChange={handleChangeRowsPerPage} />

            <Modal
                open={toaster.declineState}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={() => dispatch(revertDec())}
            >
                <Box sx={style} className='decline-box'>
                    <div className='close-btn-modal'>
                        <Typography id="modal-modal-title1" variant="h6" component="h2">Decline</Typography>
                        <CloseIcon className='civ' onClick={() => dispatch(revertDec())} />
                    </div>
                    {/* <div>{declineReasonList}</div> */}

                    <TextField
                        id="outlined-select-currency"
                        select
                        label='Select Reason'
                        fullWidth
                    >
                        {
                            declineReasonList.map((row, i) => (
                                <MenuItem key={i} value={row.Reasons} onClick={() => setdecReason(row.Reasons)} >{row.Reasons}</MenuItem>
                            ))
                        }

                    </TextField>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <TextField id="outlined-basic" placeholder='Enter in Detail' multiline variant="outlined" value={commands} onChange={(e) => setCommands(e.target.value)} />

                    <div className='decline-btn'>
                        <Button variant="contained" size="medium" color="secondary" startIcon={<CloseIcon />} onClick={() => { setCommands(''); dispatch(revertDec()) }} >
                            No
                        </Button>
                        <Button variant="contained" size="medium" color="primary" startIcon={<DoneIcon />} onClick={() => decLine()}>
                            Yes
                        </Button>

                    </div>
                </Box>

            </Modal>

        </>
    )
}

export default AidataTable