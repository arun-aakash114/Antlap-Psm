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
import CircularProgress from "@mui/material/CircularProgress";

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
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const tableCellClasses = {
  head: "MuiTableCell-head",
  body: "MuiTableCell-body",
};

const columns = [
  { id: "name", label: "Name" },
  { id: "population", label: "Population" },
  { id: "area", label: "Area (km²)" },
  { id: "gdp", label: "GDP ($)" },
];

const ViewCountries = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("");

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await Axios.get(`${backEndDomain}/countries`);
      setCountries(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    // Perform search based on searchQuery
    // Code for search functionality goes here
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      // If the same column is clicked, toggle the sorting order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If a different column is clicked, set the sorting column and order
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, countries.length - page * rowsPerPage);

  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: "#F5F5F5",
          flexGrow: 1,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Container maxWidth="xl">
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
            <Link
              underline="hover"
              color="inherit"
              to="/dashboard"
              style={{ textDecoration: "none" }}
            >
              Dashboard
            </Link>
            <Typography color="text.primary">Countries</Typography>
          </Breadcrumbs>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="search-input">
                  Search by Name, Area, or Population
                </InputLabel>
                <OutlinedInput
                  id="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearch}>
                        <SearchOutlinedIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Search by Name, Area, or Population"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <StyledTableCell
                        key={column.id}
                        align="left"
                        onClick={() => handleSort(column.id)}
                      >
                        {column.label}
                      </StyledTableCell>
                    ))}
                    <StyledTableCell align="left">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? countries.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : countries
                  ).map((country) => (
                    <TableRow key={country.id}>
                      <TableCell>{country.name}</TableCell>
                      <TableCell>{country.population}</TableCell>
                      <TableCell>{country.area}</TableCell>
                      <TableCell>{country.gdp}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() =>
                            navigate(`/dashboard/countries/${country.id}`)
                          }
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}

                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={columns.length + 1} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 50, { label: "All", value: -1 }]}
                      colSpan={columns.length + 1}
                      count={countries.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default ViewCountries;
