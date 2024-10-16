// import React from 'react';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { NavLink } from 'react-router-dom';
// import logo from '../components/MealMatelogo.png';
// import './NavbarComponent.css';
// import { FaUsers } from 'react-icons/fa';
// import { GiHotMeal, GiMeal } from 'react-icons/gi';
// import { MdOutlineFastfood } from 'react-icons/md';
// import { BiSolidReport } from 'react-icons/bi';

// const NavbarComponent = () => {
//   return (
//     <Navbar expand="lg" className="navbar" style={{borderTopRightRadius:'1em',borderTopLeftRadius:'1em',minHeight:'5.8em'}}>
//       <Container>
//         {/* Navbar Logo */}
//         <NavLink to="/" className="navbar-logo">
//           <Navbar.Brand>
//             <img src={logo} alt="MealMate Logo" className="logo-img" />
//           </Navbar.Brand>
//         </NavLink>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             <NavLink
//               to="/sales-report"
//               className="nav-link"
//               activeClassName="active-link"
//               style={{ display: 'flex', alignItems: 'center' }}
//             >
//               <BiSolidReport size={24} style={{ marginRight: '5px' }} />
//               Sales Report
//             </NavLink>
//             <NavLink
//               to="/food-menu"
//               className="nav-link"
//               activeClassName="active-link"
//               style={{ display: 'flex', alignItems: 'center' }}
//             >
//               <MdOutlineFastfood size={24} style={{ marginRight: '5px' }} />
//               Food Items
//             </NavLink>
//             <NavLink
//               to="/meals"
//               className="nav-link"
//               activeClassName="active-link"
//               style={{ display: 'flex', alignItems: 'center' }}
//             >
//               <GiHotMeal size={24} style={{ marginRight: '5px' }} />
//               Meals
//             </NavLink>
//             <NavLink
//               to="/meal-plan"
//               className="nav-link"
//               activeClassName="active-link"
//               style={{ display: 'flex', alignItems: 'center' }}
//             >
//               <GiMeal size={24} style={{ marginRight: '5px' }} />
//               Meal Plan
//             </NavLink>
//             <NavLink
//               to="/users"
//               className="nav-link"
//               activeClassName="active-link"
//               style={{ display: 'flex', alignItems: 'center' }}
//             >
//               <FaUsers size={24} style={{ marginRight: '5px' }} />
//               Users
//             </NavLink>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavbarComponent;



import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../components/MealMatelogo.png';
import './NavbarComponent.css';
import { FaUsers } from 'react-icons/fa';
import { GiHotMeal, GiMeal } from 'react-icons/gi';
import { MdOutlineFastfood } from 'react-icons/md';
import { FaChartBar } from 'react-icons/fa';

import { BiLogInCircle, BiLogOut, BiLogOutCircle, BiSolidReport } from 'react-icons/bi';

const NavbarComponent = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   setIsAuthenticated(false);
  //   navigate('/login'); // Redirect to login page after logout

  // };
const handleLogout = () => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('adminEmail');
  setIsAuthenticated(false);
  navigate('/login'); // Redirect to login page
};

  return (
    <Navbar expand="lg" className="navbar" style={{borderTopRightRadius:'1em',borderTopLeftRadius:'1em',minHeight:'5.8em'}}>
      <Container>
        <NavLink to="/" className="navbar-logo">
          <Navbar.Brand>
            <img src={logo} alt="MealMate Logo" className="logo-img" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">

          <NavLink
              to="/Mealpan-chart"
              className="nav-link"
              activeClassName="active-link"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <FaChartBar size={24} style={{ marginRight: '5px' }} />
              Meal Plans chart
            </NavLink>
          

            <NavLink to="/sales-report" className="nav-link" activeClassName="active-link">
              <BiSolidReport size={24} style={{ marginRight: '5px' }} />
              Sales Report
            </NavLink>
            <NavLink to="/food-menu" className="nav-link" activeClassName="active-link">
              <MdOutlineFastfood size={24} style={{ marginRight: '5px' }} />
              Food Items
            </NavLink>
            <NavLink to="/meals" className="nav-link" activeClassName="active-link">
              <GiHotMeal size={24} style={{ marginRight: '5px' }} />
              Meals
            </NavLink>
            <NavLink to="/meal-plan" className="nav-link" activeClassName="active-link">
              <GiMeal size={24} style={{ marginRight: '5px' }} />
              Meal Plan
            </NavLink>
            <NavLink to="/users" className="nav-link" activeClassName="active-link">
              <FaUsers size={24} style={{ marginRight: '5px' }} />
              Users
            </NavLink>
            {isAuthenticated ? (
              <Nav.Link onClick={handleLogout} className="nav-link">
              <BiLogOutCircle size={24} style={{ marginRight: '5px' }} />  Logout
              </Nav.Link>
            ) : (
              <NavLink to="/login" className="nav-link" activeClassName="active-link">
               <BiLogInCircle size={24} style={{ marginRight: '5px' }} />   Login
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
