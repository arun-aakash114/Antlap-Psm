import Breadcrumbs from "@mui/material/Breadcrumbs";
import Box from "@mui/material/Box";
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Layout from "../../../../components/layout";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from '@mui/material/TableContainer';
import TableRow from "@mui/material/TableRow";
import TableFooter from '@mui/material/TableFooter';
import EditIcon from "@mui/icons-material/Edit";
import { useTheme } from '@mui/material/styles';
import { TablePagination } from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
// import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { backEndDomain } from '../../../../service/apiserver';



function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


const ManageAllocation=()=> {

  let navigate = useNavigate()


  const [usealldata, setAllocationdata]= useState([]);

  useEffect(() => {
 
    try {
      axios({
        method: 'get',
        url: `https://${backEndDomain}/masterapi/master/viewAllocationtype?TenantId=GAINWELL_01`,
        headers: {
          'Content-type': 'application/json',
          'token': localStorage.getItem('UserToken'),

        }
      })
        .then(function (response) {
          console.log(response.data.data)
          setAllocationdata(response.data.data)
          setFoundCustomers(response.data.data)
        }).catch(function (response) {
          //   if(response.response.status == 422){
          //  // console.log(response.response.status);
          //   }
        });
    } catch (err) {
      console.log(err);
    }

  }, [])

  

const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);

const handleChangePage = (event, newPage) => {
  setPage(newPage)
}

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
}


const [custName, setCustName] = useState("");
const [foundCustomers, setFoundCustomers] = useState(usealldata);

const filter = (e) => {
  const keyword = e.target.value;

  if (keyword !== "") {
    const results = usealldata.filter((cst) => {
      var AllocationTypeDesc = cst.AllocationTypeDesc.toLowerCase().startsWith(
        keyword.toLowerCase()
      );

      return AllocationTypeDesc;
      // Use the toLowerCase() method to make it case-insensitive
    });
    setFoundCustomers(results);
  } else {
    setFoundCustomers(usealldata);
    // If the text field is empty, show all users
  }

  setCustName(keyword);
};



const updateAllocation =  async (AllocationTypeId) => {
  const getAllocationData =  usealldata.find((item) => item.AllocationTypeId === AllocationTypeId);
  console.log("AllocationTypeId", getAllocationData);
  navigate('/typeAllocation',
          {
              state: {
                AllocationTypeId: getAllocationData.AllocationTypeId,
                description:getAllocationData.AllocationTypeDesc,
             
              }
              
          });
          console.log("AllocationTypeId", getAllocationData);
}


  return (
  <div>
<Layout >
  <Box className='table1'> 
  {/* <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}> */}

  <div className="box-header dt-mgmt">
            <div className="left">
              <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                  Masters
                </Link>
                <Link
                  underline="hover"
                  color="inherit"
                  href="/material-ui/getting-started/installation/"
                >
                 Service Management
                </Link>
                <Typography color="text.primary">
                Manage Allocation Type
                </Typography>
              </Breadcrumbs>
              <h2 className="page-heding">Manage Allocation Type</h2>
            </div>
            <div className="right">
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Search...
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  label="Search..."
                  autoFocus
                  value={custName}
                  onChange={filter}
                  type="text"
                  size="small"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton size="small" edge="end">
                        {<SearchOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Link to="/typeAllocation">
                {" "}
                <Button type="button" variant="contained">
                  {" "}
                  Create{" "}
                </Button>
              </Link>
            </div>
          </div>
       <Box>
    <Card>
<CardContent className='custom'>
<TableContainer component={Paper}>
      <Table sx={{ 'tr:nth-child(even)': { backgroundColor:  "#F1F1F1" }  }} >
        <TableHead>
          <TableRow >
            <TableCell>Allocation Type</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
             <TableCell align="right"></TableCell>
            <TableCell align="right">Action</TableCell>
           </TableRow>
        </TableHead>
        <TableBody>
        {foundCustomers.length === 0 ? (
                <TableRow>
                <TableCell colSpan={5} className='nodata-table'>
                  <Typography variant="h6" align="center" className='no_data'>
                    No data available
                  </Typography>
              </TableCell>
              </TableRow>
                ) : ( 
     
          foundCustomers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((Data,row) => (
                
            <TableRow
              key={row}
              
            >
              <TableCell component="th" scope="row">
                {Data.AllocationTypeDesc}
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            
              <TableCell align="right">
                          <IconButton onClick={() => updateAllocation(Data.AllocationTypeId)}>
                            <EditIcon />
                          </IconButton>
                        </TableCell>
               
            </TableRow>
          
          ))
                )}
                  </TableBody>
        <TableFooter>
              <TableRow>
              {foundCustomers.length === 0 ? (
                  ""
                ) : (
                <TablePagination
                  rowsPerPageOptions={[2, 5, 10]}
                  
                  count={usealldata.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />)}
              </TableRow>
            </TableFooter>
      </Table>
    </TableContainer>
</CardContent>
</Card>
</Box>
</Box>
</Layout> 
</div>
  )
}

export default ManageAllocation


























