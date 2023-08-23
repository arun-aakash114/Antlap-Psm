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
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Axios from "axios";
import { backEndDomain } from "../../../../service/apiserver";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";

import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

// Table with Pagination

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
        aria-label="first page">
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page">
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page">
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page">
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
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



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ViewCountries = () => {
  let navpage = useNavigate();
  const [distData, setDistData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [perPage] = useState(10);
  const [offset, setOffset] = useState(0);

  const [contName, setContName] = useState('');
  const [foundCountry, setFoundCountry] = useState(distData);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    try {
      Axios({
        method: "get",
        url: `https:${backEndDomain}/masterapi/master/viewCountry`,
        headers: {
          "Content-type": "application/Json",
          token: localStorage.getItem("UserToken"),
        },
      }).then(function (response) {
        const nbaData = response.data.districtData;

        console.log("nbaData", nbaData);
        setDistData(nbaData);
        setFoundCountry(nbaData)
        setLoading(false);

      });
    } catch (error) { }
  }, []);

  // Get currCards
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = distData.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // console.log(cardsPerPage, movieCard.length, paginate);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    console.log(selectedPage * perPage);

    setOffset((selectedPage + 1) * perPage);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - foundCountry.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  // ______________________ Update Country ______________________ 

  const updateCountry = (countryId) => {
    const getCountryData = distData.find((items) => items.CountryId == countryId);
    // const getData =  await cus.find((item) => item.MappingId === mapId);
    console.log("CountryId", getCountryData);


    navpage("/createcountry", {
      state: {
        twoDigitCode: getCountryData.TwoDigitCode,
        threeDigitCode: getCountryData.ThreeDigitCode,
        countryName: getCountryData.CountryName,
        countryId: getCountryData.CountryId,
      },
    });
  };

  // ______________________ the search result ______________________ 

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = distData.filter((dstdat) => {
        var CountryNameFiltr = dstdat.CountryName.toLowerCase().startsWith(keyword.toLowerCase());

        return CountryNameFiltr
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundCountry(results);
    } else {
      setFoundCountry(distData);
      // If the text field is empty, show all users
    }

    setContName(keyword);
    setSortBy("");
    setSortOrder("asc");
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
                  <Typography color="text.primary">Manage Countries</Typography>
                </Breadcrumbs>
                <h2 className="page-heding">Manage Countries</h2>
              </div>
              <div className="right">
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Search...
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    label="Search..."
                    value={contName}
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
                <Link to="/createcountry">
                  <Button type="button" variant="contained">
                    Create
                  </Button>
                </Link>
              </div>
            </div>
            {loading ? ( // If isLoading is true, show the CircularProgress
              <Card align="center" className='no_data' >
                <div className="loading-container">
                  <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4, color: '#4b61ff' }} />
                  <h5 className="loading_icon">Data Loading...</h5>
                </div>
              </Card>
            ) : (

              <Grid container spacing={2} className="dist_card">


                <Card className="table_width_full">
                  <CardContent>
                    <Table aria-label="custom pagination table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Button onClick={() => handleSort("CountryName")}>
                              Country Name
                              {sortBy === "CountryName" && (
                                <ArrowDropDownIcon
                                  fontSize="small"
                                  sx={{ transform: `rotate(${sortOrder === "asc" ? "0deg" : "180deg"})` }}
                                />
                              )}
                            </Button>

                          </TableCell>
                          <TableCell align="right">
                            <Button onClick={() => handleSort("TwoDigitCode")}>
                              Two Digit Code
                              {sortBy === "TwoDigitCode" && (
                                <ArrowDropDownIcon
                                  fontSize="small"
                                  sx={{ transform: `rotate(${sortOrder === "asc" ? "0deg" : "180deg"})` }}
                                />
                              )}
                            </Button>

                          </TableCell>
                          <TableCell align="right">

                            <Button onClick={() => handleSort("ThreeDigitCode")}>
                              Three Digit Code

                              {sortBy === "ThreeDigitCode" && (
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
                        {foundCountry
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .sort((a, b) => {
                            if (sortBy === "CountryName") {
                              return sortOrder === "asc"
                                ? a.CountryName.localeCompare(b.CountryName)
                                : b.CountryName.localeCompare(a.CountryName);
                            } else if (sortBy === "TwoDigitCode") {
                              return sortOrder === "asc"
                                ? a.TwoDigitCode.localeCompare(b.TwoDigitCode)
                                : b.TwoDigitCode.localeCompare(a.TwoDigitCode);
                            } else if (sortBy === "ThreeDigitCode") {
                              return sortOrder === "asc"
                                ? a.ThreeDigitCode.localeCompare(b.ThreeDigitCode)
                                : b.ThreeDigitCode.localeCompare(a.ThreeDigitCode);
                            }
                          })

                          .map((row) => (
                            <TableRow key={row.CountryId}>
                              <TableCell component="th" scope="row">
                                {row.CountryName}
                              </TableCell>
                              <TableCell align="right">
                                {row.TwoDigitCode}
                              </TableCell>
                              <TableCell align="right">
                                {row.ThreeDigitCode}
                              </TableCell>
                              <IconButton onClick={() =>
                                updateCountry(
                                  row.CountryId
                                )
                              }>

                                <EditIcon color="blue" size="small" />
                              </IconButton>
                            </TableRow>
                          ))
                          
                          
                          
                          
                          
                          }

                        {/* {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )} */}
                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[
                              5,
                              10,
                              25,
                              { label: "All", value: -1 },
                            ]}
                            colSpan={3}
                            count={distData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                              inputProps: {
                                "aria-label": "rows per page",
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
                  </CardContent>
                </Card>

              </Grid>
            )}
          </Box>
        </Container>
      </Layout>
    </div>
  );
};

export default ViewCountries;
