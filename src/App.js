import './App.css';
// import Layout from './components/layout';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Dashboard from './pages/PSM/dashboard';
import Myprofile from './pages/PSM/myprofile';
import History from './pages/PSM/history';
import Report from './pages/PSM/report';
import Actionitems from './pages/PSM/actionitems';
import Informativeitems from './pages/PSM/informativeitems'
  ;
import Alldetails from './pages/PSM/alldetails';
import Todayscomplaints from './pages/PSM/todayscomplaints';


import Managemeeting from './pages/managemeeting';
import Joinmeeting from './pages/joinmeeting';
import Forgotpassword from './pages/forgotpassword';
import SignInSide from './pages/login';


import ExpertDashboard from './pages/expert/expertDashboard';
import AddKnowledgebase from './pages/expert/addKnowledgebase';
import ExpertProfile from './pages/expert/expertProfile';
import ExpertReport from './pages/expert/expertReport';
import ExpertsTcomplaints from './pages/expert/expertsTcomplaints';
import KnowledgeBase from './pages/expert/knowledgeBase';
import ServiceSummary from './pages/expert/serviceSummary';
import Expertview from './pages/expert/expertview';
import Result from './pages/searchSolution/result';
import Managemeetingexpert from './pages/expert/emanagemeeting';
import View from './pages/expert/view';
import Execute from './pages/expert/execute';
import FindSolution from './pages/expert/findSolution';
import Searchform from './pages/searchSolution/SearchForm';
import Search from './pages/searchSolution/searchResult'
import Viewresult from './pages/searchSolution/viewresult'
import Bom from './pages/searchSolution/bom'
import AiData from '../src/pages/expert/experData'
import SolDashboard from '../src/pages/expert/solutionDashboard'
import AddSolution from './pages/expert/addSolution';
import ResolutionPath from './pages/expert/resolutionPath';
import ViewResolutions from './pages/expert/viewResolutions';
import Editresolutions from './pages/expert/editResolutions';

//🧑🏻‍💼🧑🏻‍💼below imports are related to Management Module🧑🏻‍💼🧑🏻‍💼
import Custommanage from './pages/Managements/User/UserManagement/customManage';
import UserManage from './pages/Managements/User/UserManagement/userManage';
import UsertypeMapping from './pages/Managements/User/UserManagement/usertypeMapping';
import Customer from './pages/Managements/User/UserCreation/customer';
import User from './pages/Managements/User/UserCreation/user';
import Usermaptype from './pages/Managements/User/UserCreation/usermaptype';
import Mapeqcustomer from './pages/Managements/Asset/AssetManagement/mapEqCustomer';
import Equipments from './pages/Managements/Asset/AssetManagement/equipments';
import AddEquips from './pages/Managements/Asset/AssetCreation/addEquips';
import Addcustomer from './pages/Managements/Asset/AssetCreation/addCustomer';
import Newcontacts from './pages/Managements/User/UserCreation/newcontacts';
import Basic from './pages/Managements/User/UserManagement/basic';
// import Assetmanagement from './pages/PSM/assetmanagement';
import Viewcustomer from './pages/Managements/User/UserCreation/viewcustomer';
import AddNewContacts from './pages/Managements/User/UserCreation/addnewcontacts';
import Problemcode from './pages/Managements/Masterscode/Mastercodemanagement/problemcode';
import Parentcode from './pages/Managements/Masterscode/Mastercodemanagement/parentcode';
import Childcode from './pages/Managements/Masterscode/Mastercodemanagement/childcode';
import Createproblemcodes from './pages/Managements/Masterscode/Mastercodecreation/createproblemcodes';
 
import ViewCities from './pages/Managements/Region/Cities/viewCities';
import CreateCity from './pages/Managements/Region/Cities/createCity';
import ViewDistrict from './pages/Managements/Region/Districts/viewDistrict';
import CreateDistrict from './pages/Managements/Region/Districts/createDistrict';
import ViewStates from './pages/Managements/Region/States/viewStates';
import CreateState from './pages/Managements/Region/States/createState';
import ViewCountries from './pages/Managements/Region/Countries/viewCountries';
import CreateCountry from './pages/Managements/Region/Countries/createCountry';
import Createchildcode from './pages/Managements/Masterscode/Mastercodecreation/createchildcode';
import Createparentcode from './pages/Managements/Masterscode/Mastercodecreation/createparentcode';
import ManageMenus from './pages/Managements/Configuration Management/ManageMenus';
import CreateMenu from './pages/Managements/Configuration Management/CreateMenu';
import Managetenancy from "./pages/Managements/Tenancy/Managetenancy";
import Createtenancy from "./pages/Managements/Tenancy/Createtenancy";
import ManageService from "./pages/Managements/Service/SeviceManagement/ManageService";
import ServiceType from "./pages/Managements/Service/ServiceCreation/ServiceType";
import ManageRequest from "./pages/Managements/Service/SeviceManagement/ManageRequest";
import RequestType from "./pages/Managements/Service/ServiceCreation/RequestType";
import ManageRating from "./pages/Managements/Service/SeviceManagement/ManageRating";
import RatingType from "./pages/Managements/Service/ServiceCreation/RatingType";
import ManageResolution from "./pages/Managements/Service/SeviceManagement/ManageResolution";
import ResolutionType from "./pages/Managements/Service/ServiceCreation/ResolutionType";
import ManageAllocation from "./pages/Managements/Service/SeviceManagement/ManageAllocation";
import AllocationType from "./pages/Managements/Service/ServiceCreation/AllocationType";

function App() {
  return (
    <Router>
      <Routes>
        {/* _______________Below Routes are common for EXPERT & PSM____________________ */}
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route index element={<SignInSide />} />
        <Route path="/managemeet" element={<Managemeeting />} />
        <Route path="/joinmeeting" element={<Joinmeeting />} />


        {/* __________________Below Routes belongs to PSM only__________________ */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/myprofile" element={<Myprofile />} />
        <Route path="/history" element={<History />} />
        <Route path="/actionitems" element={<Actionitems />} />
        <Route path="/informationitems" element={<Informativeitems />} />
        <Route path="/alldetails" element={<Alldetails />} />
        <Route path="/todayscomplaints" element={<Todayscomplaints />} />

        {/* _____________Below Routes belongs to expert only________________ */}
        <Route path="/expertDashboard" element={<ExpertDashboard />} />
        <Route path="/addKnowledgebase" element={<AddKnowledgebase />} />
        <Route path='/expertData' element={<AiData />} />
        <Route path='/solutionDashboard' element={<SolDashboard />} />
        <Route path='/resolutionpath' element={<ResolutionPath />} />
        <Route path='/addSolution' element={<AddSolution />} />
        <Route path='/resolutions' element={<ViewResolutions />} />
        <Route path='/editresolutions' element={<Editresolutions />} />


        <Route path="/expertProfile" element={<ExpertProfile />} />
        <Route path="/etodayscomplaints" element={<ExpertsTcomplaints />} />
        <Route path="/knowledgeBase" element={<Searchform />} />
        <Route path='/searchresult' element={<Search />} />

        <Route path="/servicestat" element={<ServiceSummary />} />
        <Route path="/expertview" element={<Expertview />} />
        <Route path="/result" element={<Result />} />
        <Route path="/managemeeting" element={<Managemeetingexpert />} />
        <Route path="/view" element={<View />} />
        <Route path="/execute" element={<Execute />} />
        <Route path="/viewresult" element={<Viewresult />} />
        <Route path="/bom" element={<Bom />} />

       {/* _____________Below Routes belongs to Mangements________________ */}
       <Route path="/managecustomers" element={<Custommanage />} />
       <Route path="/manageusers" element={<UserManage />} />
       <Route path="/usertypemapping" element={<UsertypeMapping />} />
       <Route path="/createcustomer" element={<Customer />} />
       <Route path="/createuser" element={<User />} />
       <Route path="/createmaptype" element={<Usermaptype />} />
       <Route path="/manageEqcustomer" element={<Mapeqcustomer />} /> 
       <Route path="/manageequips" element={<Equipments />} />
       <Route path="/addequips" element={<AddEquips />} />
       <Route path="/addcustomer" element={<Addcustomer />} />
       <Route path="/viewcustomer" element={ <Newcontacts />} />
       <Route path="/viewcities" element={ <ViewCities/>} />
       <Route path="/createcity" element={ <CreateCity/>} />
       <Route path="/viewdistrict" element={ <ViewDistrict/>} />
       <Route path="/createdistrict" element={ <CreateDistrict />} />
       <Route path="/viewstates" element={ <ViewStates/>} />
       <Route path="/createstate" element={ <CreateState/>} />
       <Route path="/viewcountries" element={ <ViewCountries/>} />
       <Route path="/createcountry" element={ <CreateCountry/>} />
       {/* <Route path='/Masters' element={<Assetmanagement />}/> */}
       <Route path='/ManageCustomers/Viewcustomer' element={ <Viewcustomer />}/> 
       <Route path='/basicjs' element={<Basic/>}/>
       <Route path='/addnewcontacts' element={<AddNewContacts />}/>
       {/* _____________Below Routes belongs to Master Code Management________________ */}

       <Route path='/manageproblemcodes' element={<Problemcode />}/>
       <Route path='/manageparentcodes' element={<Parentcode />}/>
       <Route path='/managechildcodes' element={<Childcode />}/>
       <Route path='/createproblemcodes' element={<Createproblemcodes />}/>
       <Route path='/createchildcodes' element={<Createchildcode/>}/>
       <Route path='/createparentcodes' element={<Createparentcode />}/>
       {/* _____________Below Routes belongs to Configuration Management________________ */}
       <Route path='/managemenus' element={<ManageMenus/>}/>
       <Route path='/createmenu' element={<CreateMenu/>}/>

        {/* _____________Below Routes belongs to Tenancy Management________________ */}
        <Route path="/managetenancy" element ={<Managetenancy/>}/>
       <Route path="/createtenancy" element={<Createtenancy/>}/>

 {/* <Route path='/Masters' element={<Assetmanagement />}/> */}
 <Route path="/serviceManage" element={<ManageService />} />
        <Route path="/typeService" element={<ServiceType />} />
        <Route path="/requestManage" element={<ManageRequest />} />
        <Route path="/typeRequest" element={<RequestType />} />
        <Route path="/ratingManage" element={<ManageRating />} />
        <Route path="/typeRating" element={<RatingType />} />
        <Route path="/resolutionManage" element={<ManageResolution />} />
        <Route path="/typeResolution" element={<ResolutionType />} />
        <Route path="/allocationManage" element={<ManageAllocation />} />
        <Route path="/typeAllocation" element={<AllocationType />} />

        
      

      </Routes>
    </Router>

  );
}

export default App;
