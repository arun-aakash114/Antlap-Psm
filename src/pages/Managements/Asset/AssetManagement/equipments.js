import React, { useState, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Layout from "../../../../components/layout";
import {
  Button,
  Card,
  CardContent,
  Container,
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
import TableFooter from "@mui/material/TableFooter";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import { TablePagination } from "@mui/material";
import Axios from "axios";
import { backEndDomain } from "../../../../service/apiserver";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import loading from "./../../../../assets/Loading_icon.gif";

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

const Equipments = () => {
  let navigate = useNavigate();
  const [custo, setCusto] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    try {
      Axios({
        method: "get",
        url: ` https://${backEndDomain}/masterapi/master/listequipmentmaster`,
        headers: {
          "Content-type": "application/json",
          token: localStorage.getItem("UserToken"),
        },
      })
        .then(function (response) {
          console.log("response.data.Data", response.data.Data[0]);
          setCusto(response.data.Data);
          setFoundCustomers(response.data.Data);
          var utcDate = response.data.Data[0].EquipmentPurchaseDate;
          var localDate = new Date(utcDate);

          var formattedMonth = localDate.getMonth() + 1;
          var formattedYear = localDate.getFullYear();
          var formattedDate = localDate.getDate();
          var formattedCal =
            formattedDate + "-" + formattedMonth + "-" + formattedYear;
          console.log("localDate", formattedCal);
          setLoading(false);
        })
        .catch(function (response) {
          //   if(response.response.status == 422){
          //  // console.log(response.response.status);
          //   }
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  // Date Format

  // console.log("custo", custo)
  // if (MyDate.getMonth < 10) getMonth = "0" + getMonth;
  // if (MyDate.getDate < 10) getDate = "0" + getDate;

  function formatDatePurchase(datePurchase) {
    let date = new Date(datePurchase);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    return year + "-" + month + "-" + day;
  }

  function formatDateCommission(dateCommission) {
    let date = new Date(dateCommission);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    return year + "-" + month + "-" + day;
  }

  // ______________________ Pagination ___________________________

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ______________________ the search result ______________________

  const [custName, setCustName] = useState("");
  const [foundCustomers, setFoundCustomers] = useState(custo);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = custo.filter((cst) => {
        var EquipmentDescription =
          cst.EquipmentDescription.toLowerCase().startsWith(
            keyword.toLowerCase()
          );
        var EquipmentModel = cst.EquipmentModel.toLowerCase().startsWith(
          keyword.toLowerCase()
        );

        return EquipmentDescription || EquipmentModel;
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundCustomers(results);
    } else {
      setFoundCustomers(custo);
      // If the text field is empty, show all users
    }

    setCustName(keyword);
  };

  // ___________________ Get data for update user type ____________________

  const updateEquipmentMaster = async (EquipmentSerialNo, pdate, cdate) => {
    const getEquipData = custo.find(
      (item) => item.EquipmentSerialNo === EquipmentSerialNo
    );
    console.log("EquipmentSerialNo", getEquipData);
    navigate("/addequips", {
      state: {
        EquipmentSerialNo: getEquipData.EquipmentSerialNo,
        EquipmentDescription: getEquipData.EquipmentDescription,
        EquipmentPrefix: getEquipData.EquipmentPrefix,
        EquipmentModel: getEquipData.EquipmentModel,
        EquipmentMake: getEquipData.Make_M_EquipmentMake,
        EquipmentPurchaseDate: pdate,
        DateOfCommissioning: cdate,
      },
    });
  };

  return (
    <div>
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box>
            <div className="box-header dt-mgmt">
              <div className="left">
                <Breadcrumbs className="crumbs-master">
                  <Link color={"inherit"}>Masters</Link>
                  <Link color={"inherit"}>Asset Management</Link>
                  <Link color={"textPrimary"}>Manage Equipment's</Link>
                </Breadcrumbs>
                <h3 className="heading">Manage Equipments</h3>
              </div>
              <div className="right">
                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Search
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
                <Link to="/addequips">
                  <Button variant="contained" size="medium">
                    Create
                  </Button>
                </Link>
              </div>
            </div>

            <Card>
              <CardContent>
                {isLoading ? (
                  <div className="loader">
                    <img src={loading} />
                  </div>
                ) : (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Serial Number</TableCell>
                        <TableCell align="right">
                          Equipment Description
                        </TableCell>
                        <TableCell align="right">Model</TableCell>
                        <TableCell align="right">Prefix</TableCell>
                        <TableCell align="right">Make</TableCell>
                        <TableCell align="right">Purchase Date</TableCell>
                        <TableCell align="right">Commission Date</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>

                    {foundCustomers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="nodata-table">
                          <Typography
                            variant="h6"
                            align="center"
                            className="no_data"
                          >
                            No data available
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ) : (
                      foundCustomers
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((item) => (
                          <TableBody>
                            <TableCell align="right">
                              {item.EquipmentSerialNo}
                            </TableCell>
                            <TableCell align="right">
                              {item.EquipmentDescription}
                            </TableCell>
                            <TableCell align="right">
                              {item.EquipmentPrefix}
                            </TableCell>
                            <TableCell align="right">
                              {item.EquipmentModel}
                            </TableCell>
                            <TableCell align="right">
                              {item.Make_M_EquipmentMake}
                            </TableCell>

                            <TableCell align="right">
                              {`${new Date(item.EquipmentPurchaseDate)
                                .getDate()
                                .toString()
                                .padStart(2, "0")}/${(
                                new Date(
                                  item.EquipmentPurchaseDate
                                ).getMonth() + 1
                              )
                                .toString()
                                .padStart(2, "0")}/${new Date(
                                item.EquipmentPurchaseDate
                              ).getFullYear()}`}
                            </TableCell>

                            <TableCell align="right">
                              {`${new Date(item.DateOfCommissioning)
                                .getDate()
                                .toString()
                                .padStart(2, "0")}/${(
                                new Date(item.DateOfCommissioning).getMonth() +
                                1
                              )
                                .toString()
                                .padStart(2, "0")}/${new Date(
                                item.DateOfCommissioning
                              ).getFullYear()}`}
                            </TableCell>

                            <TableCell align="right">
                              <IconButton
                                onClick={() =>
                                  updateEquipmentMaster(
                                    item.EquipmentSerialNo,
                                    formatDatePurchase(
                                      item.EquipmentPurchaseDate
                                    ),
                                    formatDateCommission(
                                      item.DateOfCommissioning
                                    )
                                  )
                                }
                              >
                                <EditIcon />{" "}
                              </IconButton>
                            </TableCell>
                          </TableBody>
                        ))
                    )}

                    <TableFooter>
                      <TableRow>
                        {foundCustomers.length === 0 ? (
                          ""
                        ) : (
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            count={foundCustomers.length}
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
                        )}
                      </TableRow>
                    </TableFooter>
                  </Table>
                )}
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Layout>
    </div>
  );
};

export default Equipments;

// /* <TableCell align="right">
// {formatDatePurchase(item.EquipmentPurchaseDate)}
// {/* item.EquipmentPurchaseDate */
// </TableCell> */}

// <TableCell align="right">
// {formatDateCommission(item.DateOfCommissioning)}
// {/* item.EquipmentPurchaseDate */}
// </TableCell>
