// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Navigation from './components/Navigation';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import Footer from './components/Footer';
// import PaymentGateway from './components/PaymentGateway';
// import MealPlanComponent from './components/MealPlan';
// import Home from './components/Home';
// import About from './components/About';
// import Services from './components/Services';
// import Privacy from './components/Privacy';
// import Contact from './components/Contact'; 
// import Login from './components/Login';
// import Register from './components/Register';
// import UserProfile from './components/UserProfile';
// import UpdateProfile from './components/UpdateProfile';
// import OrderStatus from './components/OrderStatus';
// import SubscriptionCards from './components/SubscriptionCards';
// import SubscriptionList from './components/SubscriptionList';
// import SalesComponent from './components/SalesComponent';
// import { ToastContainer,toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';




// function App() {
//   return (
//     <div className="App">
    
    
//        <Router>
//             <Navigation/>

//             <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         toastClassName="custom-toast"
//         bodyClassName="custom-toast-body"
//       />            
            
//             <Routes>
               
//                 <Route path="/" element={<Home/>} />
//                 <Route path="/about" element={<About />} />
//                 <Route path="/services" element={<Services />} />
//                 <Route path="/privacy" element={<Privacy />} />
//                 <Route path="/contact" element={<Contact />} /> 
//                 <Route path="/home"  element={<Home />} />
//                 <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
         
//           <Route path="/PaymentGateway" element={<PaymentGateway />}/>
//           <Route path="/mealplan" element={<MealPlanComponent/>} />
//           <Route path="/OrderStatus" element={<OrderStatus/>} />
//           <Route path="/subscriptions" element={<SubscriptionList />} />
//             </Routes>
            
//             <Footer/>
//         {/* <SalesComponent/> */}
//         </Router>
      
//     </div>
//   );
// }

// export default App;


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';

import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';
import PaymentGateway from './components/PaymentGateway';
import MealPlanComponent from './components/MealPlan';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Privacy from './components/Privacy';
import Contact from './components/Contact'; 
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
// import UpdateProfile from './components/UpdateProfile';
import OrderStatus from './components/OrderStatus';
import SubscriptionCards from './components/SubscriptionCards';
import SubscriptionList from './components/SubscriptionList';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login1 from './components/Login1';
// index.js or App.js






function App() {
  return (
    <div className="App">
    
    
       <Router>
            <Navigation/>
            <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
      />            
            <Routes>
               
                <Route path="/" element={<Home/>} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/contact" element={<Contact />} /> 
                <Route path="/home" element={<Home/>} />
                
                <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
         
          <Route path="/PaymentGateway" element={<PaymentGateway />}/>
          <Route path="/mealplan" element={<MealPlanComponent/>} />
          <Route path="/OrderStatus" element={<OrderStatus/>} />
          <Route path="/subscriptions" element={<SubscriptionList />} />
          <Route path="/profile" element={<UserProfile/>}/>
            </Routes>
            
            <Footer/>
         {/* <Login1/> */}
        </Router>
      
    </div>
  );
}

export default App;


