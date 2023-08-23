import Breadcrumbs from "@mui/material/Breadcrumbs";
import Box from "@mui/material/Box";

import Layout from "../../../../components/layout";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Container,

  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Addformcustomer from "./addformcustomer";

const Addcustomer = () => {
  const { state,updatstate } = useLocation();

  console.log("state", state);

  let navpage = useNavigate();



  return (
    <Layout>
      <Box>
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
                  Map Equipment's & Customers
                </Link>
                <Typography color="text.primary">Create</Typography>
              </Breadcrumbs>
              <h2 className="page-heding">Create</h2>
            </div>
            <div className="right">
              <Link to="/manageEqcustomer">
                {" "}
                <Button type="button" variant="contained" color="secondary">
                  {" "}
                  Back{" "}
                </Button>
              </Link>
            </div>
          </div>
          <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Card>
              <CardContent>
                <Addformcustomer custData={state} />
              </CardContent>
            </Card>
          </Container>
        </Container>
      </Box>
    </Layout>
  );
};

export default Addcustomer;
