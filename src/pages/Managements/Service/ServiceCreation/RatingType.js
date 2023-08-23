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
import AddratingType from "./addratingType";
import { useLocation } from 'react-router-dom';



const RatingType = () => {
  
  const { state, mapServiceMode } = useLocation();

 

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
                 Service Management
                </Link>
                <Link underline="hover" color="inherit" href="/">
                Create Rating Type
                </Link>
                <Typography color="text.primary">Create</Typography>
              </Breadcrumbs>
              <h2 className="page-heding">Create Rating Type</h2>
            </div>
            <div className="right">
              <Link to="/ratingManage">
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
                <AddratingType addRating={state}/>
         
              </CardContent>
     
            </Card>
          </Container>
        </Container>
      </Box>
    </Layout>
  );
};

export default RatingType;
