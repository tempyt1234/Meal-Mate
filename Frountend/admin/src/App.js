// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
// import { ToastContainer } from 'react-toastify';
// import NavbarComponent from './components/NavbarComponent';
// import FoodMenu from './components/FoodMenu';
// import MealPlansales from './components/MealPlansales';
// import MealPlans from './components/MealPlans';
// import Meals from './components/Meals';
// import AdminHome from './components/AdminHome';
// import Footer from './components/Footer';
// import UserTable from './components/UserTable';
// // import SalesReport from './components/SalesReport';

// const App = () => {
//   return (
//     <div>
//       <NavbarComponent />
//       {/* Position ToastContainer globally at the top-right */}
//       <ToastContainer
      
//       style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1050 }}
//         position="top-left"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       <div className="content" style={{ backgroundColor: '#def2f1', minHeight: '100vh' }}>
//         <Routes>
//           <Route path="/" element={<AdminHome />} />
//           <Route path="/food-menu" element={<FoodMenu />} />
//           <Route path="/sales-report" element={<MealPlansales />} />
//           <Route path="/meal-plan" element={<MealPlans />} />
//           <Route path="/meals" element={<Meals />} />
//           <Route path="/users" element={<UserTable />} />
//           {/* <Route path="/sales-report" element={<SalesReport />} /> */}
//           <Route path="*" element={<AdminHome />} />
//         </Routes>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from 'react-toastify';
import NavbarComponent from './components/NavbarComponent';
import AdminLogin from './components/AdminLogin';
import FoodMenu from './components/FoodMenu';
import MealPlansales from './components/MealPlansales';
import MealPlans from './components/MealPlans';
import Meals from './components/Meals';
import AdminHome from './components/AdminHome';
import Footer from './components/Footer';
import UserTable from './components/UserTable';
import SalesReport from './components/SalesReport';
import MealpanChart from './components/MealpanChart';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      <NavbarComponent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <ToastContainer
        style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1050 }}
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <div className="content" style={{ backgroundColor: '#def2f1', minHeight: '100vh' }}>
        <Routes>
          <Route path="/login" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/" element={isAuthenticated ? <AdminHome /> : <AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/food-menu" element={isAuthenticated ? <FoodMenu /> : <AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/sales-report" element={isAuthenticated ? <SalesReport/> : <AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/meal-plan" element={isAuthenticated ? <MealPlans /> : <AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/meals" element={isAuthenticated ? <Meals /> : <AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/users" element={isAuthenticated ? <UserTable /> : <AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<AdminHome />} />
          <Route path="/Mealpan-chart" element={isAuthenticated ? <MealpanChart  /> : <AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
         
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
