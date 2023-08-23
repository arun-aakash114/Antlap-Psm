import Breadcrumbs from "@mui/material/Breadcrumbs";
import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
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
  TableFooter,
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { TablePagination } from "@mui/material";
import { backEndDomain } from "../../../../service/apiserver";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import CircularProgress from '@mui/material/CircularProgress';

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

const Mapeqcustomer = () => {
  let navpage = useNavigate();
  const [customer, setCustomers] = useState([]);

  useEffect(() => {
    try {
      axios({
        method: "get",
        url: `https://${backEndDomain}/masterapi/master/listcusmap`,
        headers: {
          "Content-type": "application/json",
          token: localStorage.getItem("UserToken"),
        },
      })
        .then(function (response) {
          console.log("resp", response.data.Data);
          setCustomers(response.data.Data);
          setFoundCustomers(response.data.Data);
          var ucDate = response.data.Data[0].date;
          var localDate = new Date(ucDate);

          var foMonth = localDate.getMonth() + 1;
          var foYear = localDate.getFullYear();
          var foDate = localDate.getDate();
          var foCal = foDate + "-" + foMonth + "-" + foYear;
          console.log("localDate", foCal);
          setLoading(false);

        })
        .catch(function (response) {
          //   if(response.response.status == 422){
          //  // console.log(response.response.status);
          //   }
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  function Dateofcommmit(datecommit) {
    let date = new Date(datecommit);
    let year = date.getFullYear();
    // let month = (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1);
    // let day = (date.getDate() < 9 ? "0" : "") + (date.getDate());
    let month = date.getMonth() + 1;
    let day = date.getDate();

    console.log("month", month);

    
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }



    return year + "-" + month + "-" + day;
  }

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [custName, setCustName] = useState("");
  const [foundCustomers, setFoundCustomers] = useState(customer);

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = customer.filter((cst) => {
        var CustomerName = cst.CustomerName.toLowerCase().startsWith(
          keyword.toLowerCase()
        );
        var Equipments_M_EquipmentSerialNo =
          cst.Equipments_M_EquipmentSerialNo.toLowerCase().startsWith(
            keyword.toLowerCase()
          );

        return CustomerName || Equipments_M_EquipmentSerialNo;
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundCustomers(results);
    } else {
      setFoundCustomers(customer);
      // If the text field is empty, show all users
    }

    setCustName(keyword);
  };

  // const [customer, setCustomers] = useState([]);

  // useEffect(() => {
  //   try {
  //     axios({
  //       method: "get",
  //       url: `https://${backEndDomain}/masterapi/master/customerlistdropdown`,
  //       headers: {
  //         "Content-type": "application/json",
  //         token: localStorage.getItem("UserToken"),
  //       },
  //     })
  //       .then(function (response) {
  //         console.log(response.data.Data);
  //         setCustomers(response.data.Data);
  //       })
  //       .catch(function (response) {
  //         //   if(response.response.status == 422){
  //         //  // console.log(response.response.status);
  //         //   }
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  // const [cus, setCus] = useState([]);

  // useEffect(() => {
  //   try {
  //     axios({
  //       method: "get",
  //       url: `https://${backEndDomain}/masterapi/master/listequipserial?serialno=1`,
  //       headers: {
  //         "Content-type": "application/json",
  //         token: localStorage.getItem("UserToken"),
  //       },
  //     })
  //       .then(function (response) {
  //         console.log(response.data.Data);
  //         setCus(response.data.Data);
  //       })
  //       .catch(function (response) {
  //         //   if(response.response.status == 422){
  //         //  // console.log(response.response.status);
  //         //   }
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  const updateuser = async (mapId, CommencedDate) => {
    const getMapData = await customer.find((items) => items.MappingId == mapId);
    // const getData =  await cus.find((item) => item.MappingId === mapId);
    console.log("mapId", getMapData.Equipments_M_EquipmentSerialNo);
    console.log("customer", CommencedDate);

    navpage("/addcustomer", {
      setUpdate: "test",
      state: {
        // cusid: getMapData.CustomerName,
        // serialno: getMapData.EquipmentSerialNo,
        cusid: getMapData.Customer_M_CustomerId,
        serialno: getMapData.Equipments_M_EquipmentSerialNo,
        MappingId: getMapData.MappingId,
        status: getMapData.Status_M_StatusId,
        CustomerName: getMapData.CustomerName,
        date: CommencedDate,

        // EquipmentSerialNo:getMapData.EquipmentSerialNo,
      },
    });
  };

  // const handleSubmit = (e) => {

  //   e.preventDefault();

  //   const datasubmit = {

  //     "TenantId":localStorage.getItem('TenantId'),
  //     "cusid":customer.Customer_M_CustomerId,
  //     "serialno":customer.Equipments_M_EquipmentSerialNo,

  //    }; // create an updated user object with the new user type
  //   try {
  //     Axios({
  //       method: 'put',
  //       url: `https://${backEndDomain}/masterapi/master/updatecusmap`,
  //       data:  datasubmit,
  //       headers: {
  //         'Content-type': 'application/json',
  //         'token': localStorage.getItem('UserToken'),
  //       },
  //       // pass the updated user data as the request payload
  //     })
  //       .then(function (response) {
  //         console.log(response);
  //         navpage ('/addcustomer')
  //         // handle success response
  //       }).catch(function (response) {
  //         console.log(response);
  //         // handle error response
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <Box>
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
                  Asset Management
                </Link>
                <Typography color="text.primary">
                  Map Equipment's & Customers
                </Typography>
              </Breadcrumbs>
              <h2 className="page-heding">Map Equipment's & Customers</h2>
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
              <Link to="/addcustomer">
                {" "}
                <Button type="button" variant="contained">
                  {" "}
                  Create{" "}
                </Button>
              </Link>
            </div>
          </div>

          <Card>
            <CardContent>
            {loading ? ( // If isLoading is true, show the CircularProgress
                <div className="no_data">
                  <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4, color: '#4b61ff' }} />
                  <h5 className="loading_icon">Data Loading...</h5>
                </div>
              ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Equipment Serial No</TableCell>
                    <TableCell align="right">Date of Commissioning</TableCell>
                    <TableCell align="right">Status</TableCell>

                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                 
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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((items, index) => (
                      <TableBody>
                        <TableRow key={index}>
                          <TableCell align="right">
                            {items.CustomerName}
                          </TableCell>
                          <TableCell align="right">
                            {items.Equipments_M_EquipmentSerialNo}
                          </TableCell>
                          <TableCell align="right">
                            {`${new Date(items.CommencedDate)
                              .getDate()
                              .toString()
                              .padStart(2, "0")}/${(
                              new Date(items.CommencedDate).getMonth() + 1
                            )
                              .toString()
                              .padStart(2, "0")}/${new Date(
                              items.CommencedDate
                            ).getFullYear()}`}
                            {/* {Dateofcommmit(items.CommencedDate)} */}
                          </TableCell>
                          <TableCell align="right">
                            {items.Status_M_StatusId}
                          </TableCell>
                          <TableCell align="right">
                            {/* <Link to="/addcustomer">
                          <IconButton>
                            <EditIcon color="blue" />{" "}
                          </IconButton>
                        </Link> */}
                            <IconButton
                              onClick={() =>
                                updateuser(
                                  items.MappingId,
                                  Dateofcommmit(items.CommencedDate)
                                )
                              }
                            >
                              <EditIcon color="blue" size="small" />{" "}
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ))
                )}
                <TableFooter>
                  <TableRow>
                  {foundCustomers.length === 0 ? (
                  ""
                ) : (   <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  count={customer.length}
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
                />)}
                   
                  </TableRow>
                </TableFooter>
              </Table>
              )}
            </CardContent>

          </Card>

        </Container>
      </Layout>
    </Box>
  );
};

export default Mapeqcustomer;

// {foundCustomers.length === 0 ? (
//   <p>No data found.</p>
// ) : ( {foundCustomers
// .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// .map((items, index) => (
//   <TableBody>
//     <TableRow key={index}>
//       <TableCell align="right">
//         {items.CustomerName}
//       </TableCell>
//       <TableCell align="right">
//         {items.Equipments_M_EquipmentSerialNo}
//       </TableCell>
//       <TableCell align="right">
//       {`${new Date(items.CommencedDate).getDate().toString().padStart(2, '0')}/${(new Date(items.CommencedDate).getMonth() + 1).toString().padStart(2, '0')}/${new Date(items.CommencedDate).getFullYear()}`}
//         {/* {Dateofcommmit(items.CommencedDate)} */}
//       </TableCell>
//       <TableCell align="right">
//         {items.Status_M_StatusId}
//       </TableCell>
//       <TableCell align="right">
//         {/* <Link to="/addcustomer">
//         <IconButton>
//           <EditIcon color="blue" />{" "}
//         </IconButton>
//       </Link> */}
//         <IconButton
//           onClick={() =>
//             updateuser(
//               items.MappingId,
//               Dateofcommmit(items.CommencedDate)
//             )
//           }
//         >
//           <EditIcon color="blue" size="small" />{" "}
//         </IconButton>
//       </TableCell>
//     </TableRow>
//   </TableBody>
// ))})
