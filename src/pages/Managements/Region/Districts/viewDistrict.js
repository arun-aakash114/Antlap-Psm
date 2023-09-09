import React, { useState, useEffect } from "react";
import Layout from "../../../../components/layout";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Button from "@mui/material/Button";
import { Card, CardContent } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import { Table, TableBody, TableHead, TableRow, Grid } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Axios from "axios";
import { backEndDomain } from "../../../../service/apiserver";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
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
  
  function createData(name, calories, fat) {
    return { name, calories, fat };
  }
  
  const rows = [
    createData('Cupcake', 305, 3.7),
    createData('Donut', 452, 25.0),
    createData('Eclair', 262, 16.0),
    createData('Frozen yoghurt', 159, 6.0),
    createData('Gingerbread', 356, 16.0),
    createData('Honeycomb', 408, 3.2),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Jelly Bean', 375, 0.0),
    createData('KitKat', 518, 26.0),
    createData('Lollipop', 392, 0.2),
    createData('Marshmallow', 318, 0),
    createData('Nougat', 360, 19.0),
    createData('Oreo', 437, 18.0),
  ].sort((a, b) => (a.calories < b.calories ? -1 : 1));


const ViewDistrict = () => {
  let navpage = useNavigate();
  const [districtData, setDisctrictData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [distName, setDistName] = useState("")
  const [filterDist, setFilterDist] = useState([])
  const [loading, setLoading] = useState(true);


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - districtData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    try {
      Axios({
        method: "get",
        url: `https:${backEndDomain}/masterapi/master/viewDistrict`,
        headers: {
          "Content-type": "application/Json",
          token: localStorage.getItem("UserToken"),
        },
      }).then(function (response) {
        const distDataResp = response.data.arr;
        console.log("distDataResp", distDataResp);
        setDisctrictData(distDataResp);
        setFilterDist(distDataResp)
        setLoading(false)

      });
    } catch (error) {
      setLoading(false)

    }
  }, []);


// ______________________ Update District ______________________ 

const updateDistrict =  (state, district, districtId) => {
  navpage("/createdistrict", {
    state: {
      state: state,
      district: district,
      districtId: districtId
    }, 
  });
  console.log("state", state)
};

// ______________________ the search result ______________________ 

const filter = (e) => {
  const keyword = e.target.value;

  if (keyword !== '') {
    const results = districtData.filter((distdat) => {
      var DistNameFiltr = distdat.DistrictName.toLowerCase().startsWith(keyword.toLowerCase());
      var StateNameFiltr = distdat.stateName.toLowerCase().startsWith(keyword.toLowerCase());

      return DistNameFiltr || StateNameFiltr
      // Use the toLowerCase() method to make it case-insensitive
    });
    setFilterDist(results);
  } else {
    setFilterDist(districtData);
    // If the text field is empty, show all users
  }

  setDistName(keyword);
  setSortBy("");
  setSortOrder("asc");
};

const [sortBy, setSortBy] = useState("");
const [sortOrder, setSortOrder] = useState("asc");

const handleSort = (column) => {
  if (sortBy === column) {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  } else {
    setSortBy(column);
    setSortOrder("asc");
  }
}; 
  return (
    <div>
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box>
            <div className="box-header dt-mgmt">
              <div className="left">
                <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" color="inherit" href="/">
                    Masters
                  </Link>
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/">
                    Region Management
                  </Link>
                  <Typography color="text.primary">Manage Districts</Typography>
                </Breadcrumbs>
                <h2 className="page-heding">Manage Districts</h2>
              </div>
              <div className="right">
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Search...
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    label="Search..."
                    value={distName}
                    onChange={filter}
                    autoFocus
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
                <Link to="/createdistrict">                 
                  <Button type="button" variant="contained">                   
                    Create
                  </Button>
                </Link>
              </div>
            </div>
            <Card>
              {loading ? (
               
                                   <div className="no_data">
                                    <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4, color: '#426e81' }} />
                                    <h5 className="loading_icon">Data Loading...</h5>
                                </div>
                          
              ) : (
                <CardContent>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
                      <TableRow>
                   
                      <TableCell>
                          <Button onClick={() => handleSort("StateName")}>                     
                            State Name
                            {sortBy === "StateName" && (
                                <ArrowDropDownIcon
                                  fontSize="small"
                                  sx={{ transform: `rotate(${sortOrder === "asc" ? "0deg" : "180deg"})` }}
                                />
                              )}
                            </Button>
                            </TableCell>
                        <TableCell>
                        <Button onClick={() => handleSort("DistrictName")}>      
                          District Name
                          
                          {sortBy === "DistrictName" && (
                                <ArrowDropDownIcon
                                  fontSize="small"
                                  sx={{ transform: `rotate(${sortOrder === "asc" ? "0deg" : "180deg"})` }}
                                />
                              )}
                            </Button>
                          </TableCell>
                        <TableCell align="right" className='action_color' >Action</TableCell>
                      </TableRow>
                    </TableHead>
        <TableBody>
          {
          filterDist
          .slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )


          .sort((a, b) => {
            if (sortBy === "StateName") {
              return sortOrder === "asc"
                ? a.StateName.localeCompare(b.StateName)
                : b.StateName.localeCompare(a.StateName);
            } else if (sortBy === "DistrictName") {
              return sortOrder === "asc"
                ? a.DistrictName.localeCompare(b.DistrictName)
                : b.DistrictName.localeCompare(a.DistrictName);
            }  
          })
          .map((row) => (
            <TableRow key={row.DistrictId}>
              <TableCell component="th" scope="row">
                {row.stateName}
              </TableCell>
              <TableCell >
                {row.DistrictName}
              </TableCell>
              <IconButton  onClick={() =>
                              updateDistrict(
                                row.stateName, row.DistrictName, row.DistrictId
                              )}>                              
                <EditIcon color="blue" size="small" />
              </IconButton>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={districtData.length}
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
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </CardContent>
              )}
            </Card>        
          </Box>
        </Container>
      </Layout>
    </div>
  );
};

export default ViewDistrict;
