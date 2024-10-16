// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import '../components/Register.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { toast } from 'react-toastify';

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// const Register = () => {
//   const [formData, setFormData] = useState({
//     userId: `MealMate_User_${Date.now()}`,
//     name: '',
//     emailId: '',
//     password: '',
//     confirmPassword: '',
//     phone: '',
//     deliveryAddress: ''
//   });

//   const [otpData, setOtpData] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');
//   const navigate = useNavigate();

//   // Validation functions...
//   const validateName = (name) => {
//     if (!name) return 'Name is required.';
//     if (name.trim().length < 3) return 'Name must be at least 3 characters long.';
//     if (!/^[A-Za-z\s]+$/.test(name)) return 'Name can only contain letters and spaces.';
//     return '';
//   };

//   const validateEmail = (email) => {
//     if (!email) return 'Email is required.';
//     if (!/^[a-zA-Z][^\s@]{2,}@gmail\.com$/.test(email)) return 'Email must start with a letter and have at least 3 characters before @gmail.com.';
//     return '';
//   };

//   const validatePassword = (password) => {
//     if (!password) return 'Password is required.';
//     if (password.length < 8 || password.length > 16) return 'Password must be between 8 and 16 characters.';
//     if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter.';
//     if (!/(?=.*[!@#$%^&*])/.test(password)) return 'Password must contain at least one special character.';
//     if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one digit.';
//     return '';
//   };

//   const validateConfirmPassword = (password, confirmPassword) => {
//     if (!confirmPassword) return 'Please confirm your password.';
//     if (password !== confirmPassword) return 'Passwords do not match.';
//     return '';
//   };

//   const validatephone = (phone) => {
//     if (!phone) return 'Phone number is required.';
//     if (!/^[6789]\d{9}$/.test(phone)) return 'Phone number must start with 6, 7, 8, or 9 and be exactly 10 digits.';
//     return '';
//   };

//   const validateAddress = (address) => {
//     const addressParts = address.split(',');
//     if (addressParts.length !== 4) return 'Address must include Flat No, Street, City, and Pincode separated by commas.';
//     const [flatNo, street, city, pincode] = addressParts.map(part => part.trim());
//     if (!/^\d+$/.test(flatNo)) return 'Flat No must be numerical only.';
//     if (!street) return 'Street is required.';
//     if (!city) return 'City is required.';
//     if (!/^\d{6}$/.test(pincode)) return 'Pincode must be exactly 6 digits.';
//     return '';
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({ ...prevData, [name]: value }));
//   };

//   // Handle input blur to mark fields as touched
//   const handleBlur = (e) => {
//     const { name } = e.target;
//     setTouched(prevTouched => ({ ...prevTouched, [name]: true }));
//   };

//   useEffect(() => {
//     if (isOtpVerified) {
//       handleSubmit({ preventDefault: () => {} }); // Automatically trigger form submission
//     }
//   }, [isOtpVerified]);

//   // useEffect for real-time validation of confirmPassword
//   useEffect(() => {
//     if (formData.confirmPassword) {
//       const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
//       setErrors(prevErrors => ({ ...prevErrors, confirmPassword: confirmPasswordError }));
//     }
//   }, [formData.password, formData.confirmPassword]);

//   // useEffect for real-time validation of other fields
//   useEffect(() => {
//     const nameError = touched.name ? validateName(formData.name) : '';
//     const emailError = touched.emailId ? validateEmail(formData.emailId) : '';
//     const passwordError = touched.password ? validatePassword(formData.password) : '';
//     const phoneError = touched.phone ? validatephone(formData.phone) : '';
//     const addressError = touched.deliveryAddress ? validateAddress(formData.deliveryAddress) : '';

//     setErrors(prevErrors => ({
//       ...prevErrors,
//       name: nameError,
//       emailId: emailError,
//       password: passwordError,
//       phone: phoneError,
//       deliveryAddress: addressError
//     }));
//   }, [formData.name, formData.emailId, formData.password, formData.phone, formData.deliveryAddress, touched]);




//   async function registerUser(formData) {
//     const newUser = { ...formData, id: formData.userId };
  
//     try {
//       const response = await axios.post('http://localhost:8090/userRegistration', newUser);
//       console.log(response.data);
//     } catch (error) {
//       console.error('Error registering user:', error);
//     }
//   }
//   // Send OTP
//   const sendOtp = async (email) => {
//     try {
//       await axios.post(`http://localhost:8090/generateOtp/${email}`);
//       setSnackbarMessage('OTP sent to your email!');
//       setSnackbarSeverity('success');
//       setOpenSnackbar(true);
//       setIsOtpSent(true);
//     } catch (error) {
//       console.error('Failed to send OTP', error);
//       setSnackbarMessage('Failed to send OTP');
//       setSnackbarSeverity('error');
//       setOpenSnackbar(true);
//     }
//   };

//   // Handle OTP verification
//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`http://localhost:8090/verifyOtp/${formData.emailId}/${otpData}`);
//       if (response.status === 200) {
//         setSnackbarMessage('OTP verified successfully!');
//         setSnackbarSeverity('success');
//         setOpenSnackbar(true);
//         setIsOtpVerified(true);
//       } else {
//         setSnackbarMessage('Invalid OTP');
//         setSnackbarSeverity('error');
//         setOpenSnackbar(true);
//       }
//     } catch (error) {
//       console.error('Failed to verify OTP', error);
//       setSnackbarMessage('Failed to verify OTP');
//       setSnackbarSeverity('error');
//       setOpenSnackbar(true);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isOtpVerified) {
//       // Send OTP if not verified
//       const emailError = validateEmail(formData.emailId);
//       if (emailError) {
//         setErrors(prevErrors => ({ ...prevErrors, emailId: emailError }));
//         return;
//       }
//       await sendOtp(formData.emailId);
//       return;
//     }

//     // Validate the form data
//     const nameError = validateName(formData.name);
//     const emailError = validateEmail(formData.emailId);
//     const passwordError = validatePassword(formData.password);
//     const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
//     const phoneError = validatephone(formData.phone);
//     const addressError = validateAddress(formData.deliveryAddress);

//     if (nameError || emailError || passwordError || confirmPasswordError || phoneError || addressError) {
//       setErrors({
//         name: nameError,
//         emailId: emailError,
//         password: passwordError,
//         confirmPassword: confirmPasswordError,
//         phone: phoneError,
//         deliveryAddress: addressError
//       });
//       return; // Prevent form submission if there are validation errors
//     }

//     try {
//       const newUser = { ...formData, id: formData.userId };
//       const response = await axios.post('http://localhost:8090/userRegisteration', newUser);

//       if (response.status === 201) {
//         setSnackbarMessage('Registration successful!');
//         setSnackbarSeverity('success');
//         setOpenSnackbar(true);
//         setTimeout(() => {
//           navigate('/login');
//         }, 100);
//       } else {
//         toast.error('Failed to register');
//       }
//     } catch (error) {
//       if (error.response) {
//         toast.error(`${error.response.data}`);
//       } else if (error.request) {
//         toast.error('No response received from the server.');
//       } else {
//         toast.error('An unexpected error occurred.');
//       }
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   return (
//     <div className="register-container">
//       <h2 className="register-title">Register</h2>
//       {!isOtpSent ? (
//         <form className="register-form" onSubmit={handleSubmit} noValidate>
//           {/* Name Field */}
//           <div className="form-group">
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               className={`form-control ${errors.name ? 'is-invalid' : ''}`}
//               value={formData.name}
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />
//             {errors.name && <div className="invalid-feedback">{errors.name}</div>}
//           </div>

//           {/* Email Field */}
//           <div className="form-group">
//             <label htmlFor="email">Email:</label>
//             <input
//               type="email"
//               id="email"
//               name="emailId"
//               className={`form-control ${errors.emailId ? 'is-invalid' : ''}`}
//               value={formData.emailId}
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />
//             {errors.emailId && <div className="invalid-feedback">{errors.emailId}</div>}
//           </div>

//           {/* Password Field */}
//           <div className="form-group">
//             <label htmlFor="password">Password:</label>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               id="password"
//               name="password"
//               className={`form-control ${errors.password ? 'is-invalid' : ''}`}
//               value={formData.password}
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />
//             {errors.password && <div className="invalid-feedback">{errors.password}</div>}
//           </div>

//           {/* Confirm Password Field */}
//           <div className="form-group">
//             <label htmlFor="confirmPassword">Confirm Password:</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />
//             {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
//           </div>

//           {/* Phone Number Field */}
//           <div className="form-group">
//             <label htmlFor="phone">Phone Number:</label>
//             <input
//               type="text"
//               id="phone"
//               name="phone"
//               className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
//               value={formData.phone}
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />
//             {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
//           </div>

//           {/* Delivery Address Field */}
//           <div className="form-group">
//             <label htmlFor="deliveryAddress">Delivery Address:</label>
//             <textarea
//               id="deliveryAddress"
//               name="deliveryAddress"
//               className={`form-control ${errors.deliveryAddress ? 'is-invalid' : ''}`}
//               value={formData.deliveryAddress}
//               onChange={handleChange}
//               onBlur={handleBlur}
//             />
//             {errors.deliveryAddress && <div className="invalid-feedback">{errors.deliveryAddress}</div>}
//           </div>

//           <button type="submit" className="btn btn-primary">
//             Register
//           </button>
//         </form>
//       ) : (
//         <form onSubmit={handleVerifyOtp}>
//           <div className="form-group">
//             <label htmlFor="otp">Enter OTP:</label>
//             <input
//               type="text"
//               id="otp"
//               className="form-control"
//               value={otpData}
//               onChange={(e) => setOtpData(e.target.value)}
//               />
//             </div>
//             <button type="button" className="btn btn-primary" onClick={registerUser(formData)} >
//               Verify OTP  {console.log('Hiii sarath:'+formData)}
//             </button>
//           </form>
//         )}
  
//         {/* Snackbar for notifications */}
//         <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
//           <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
//             {snackbarMessage}
//           </Alert>
//         </Snackbar>
//       </div>
//     );
//   };
  
//   export default Register;
  

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import '../components/Register.css';

import { toast } from 'react-toastify';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
  const [formData, setFormData] = useState({
    userId: `MealMate_User_${Date.now()}`,
    name: '',
    emailId: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    deliveryAddress: ''
  });

  const [otpData, setOtpData] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  // Validation functions...
  const validateName = (name) => {
    if (!name) return 'Name is required.';
    if (name.trim().length < 3) return 'Name must be at least 3 characters long.';
    if (!/^[A-Za-z\s]+$/.test(name)) return 'Name can only contain letters and spaces.';
    return '';
  };

  const validateEmail = (email) => {
    if (!email) return 'Email is required.';
    if (!/^[a-zA-Z][^\s@]{2,}@gmail\.com$/.test(email)) return 'Email must start with a letter and have at least 3 characters before @gmail.com.';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required.';
    if (password.length < 8 || password.length > 16) return 'Password must be between 8 and 16 characters.';
    if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter.';
    if (!/(?=.*[!@#$%^&*])/.test(password)) return 'Password must contain at least one special character.';
    if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one digit.';
    return '';
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) return 'Please confirm your password.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    return '';
  };

  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return 'Phone number is required.';
    if (!/^[6789]\d{9}$/.test(phoneNumber)) return 'Phone number must start with 6, 7, 8, or 9 and be exactly 10 digits.';
    return '';
  };

  const validateAddress = (address) => {
    const addressParts = address.split(',');
    if (addressParts.length !== 4) return 'Address must include Flat No, Street, City, and Pincode separated by commas.';
    const [flatNo, street, city, pincode] = addressParts.map(part => part.trim());
    if (!/^\d+$/.test(flatNo)) return 'Flat No must be numerical only.';
    if (!street) return 'Street is required.';
    if (!city) return 'City is required.';
    if (!/^\d{6}$/.test(pincode)) return 'Pincode must be exactly 6 digits.';
    return '';
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Handle input blur to mark fields as touched
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prevTouched => ({ ...prevTouched, [name]: true }));
  };
  useEffect(() => {
    if (isOtpVerified) {
      handleSubmit({ preventDefault: () => {} }); // Automatically trigger form submission
    }
  }, [isOtpVerified]);
  // useEffect for real-time validation of confirmPassword
  useEffect(() => {
    if (formData.confirmPassword) {
      const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
      setErrors(prevErrors => ({ ...prevErrors, confirmPassword: confirmPasswordError }));
    }
  }, [formData.password, formData.confirmPassword]);

  // useEffect for real-time validation of other fields
  useEffect(() => {
    const nameError = touched.name ? validateName(formData.name) : '';
    const emailError = touched.emailId ? validateEmail(formData.emailId) : '';
    const passwordError = touched.password ? validatePassword(formData.password) : '';
    const phoneError = touched.phoneNumber ? validatePhoneNumber(formData.phoneNumber) : '';
    const addressError = touched.deliveryAddress ? validateAddress(formData.deliveryAddress) : '';

    setErrors(prevErrors => ({
      ...prevErrors,
      name: nameError,
      emailId: emailError,
      password: passwordError,
      phoneNumber: phoneError,
      deliveryAddress: addressError
    }));
  }, [formData.name, formData.emailId, formData.password, formData.phoneNumber, formData.deliveryAddress, touched]);

  // Send OTP
  const sendOtp = async (email) => {
    try {
      await axios.post(`http://localhost:9090/mealmate-user/generateOtp/${email}`);
      setSnackbarMessage('OTP sent to your email!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setIsOtpSent(true);
    } catch (error) {
      console.error('Failed to send OTP', error);
      setSnackbarMessage('Failed to send OTP');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:9090/mealmate-user/verifyOtp/${formData.emailId}/${otpData}`);
      if (response.status === 200) {
        setSnackbarMessage('OTP verified successfully!');
        handleRegister();
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setIsOtpVerified(true);
      } else {
        setSnackbarMessage('Invalid OTP');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Failed to verify OTP', error);
      setSnackbarMessage('Failed to verify OTP');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isOtpVerified) {
      // Send OTP if not verified
      const emailError = validateEmail(formData.emailId);
      if (emailError) {
        setErrors(prevErrors => ({ ...prevErrors, emailId: emailError }));
        return;
      }
      await sendOtp(formData.emailId);
      return;
    }

    // Validate the form data
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.emailId);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
    const phoneError = validatePhoneNumber(formData.phoneNumber);
    const addressError = validateAddress(formData.deliveryAddress);

    if (nameError || emailError || passwordError || confirmPasswordError || phoneError || addressError) {
      setErrors({
        name: nameError,
        emailId: emailError,
        password: passwordError,
        confirmPassword: confirmPasswordError,
        phoneNumber: phoneError,
        deliveryAddress: addressError
      });
      return; // Prevent form submission if there are validation errors
    }


  };
const handleRegister=async()=>{
  try {
    console.log('HANDLED');
    const newUser = { ...formData, id: formData.userId };
    const response = await axios.post('http://localhost:9090/mealmate-user/userRegisteration', newUser);

    if (response.status === 201) {
      setSnackbarMessage('Registration successful!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate('/login');
      }, 0);
    } else {
      toast.error('Failed to register');
    }
  } catch (error) {
    if (error.response) {
      toast.error(`${error.response.data}`);
    } else if (error.request) {
      toast.error('No response received from the server.');
    } else {
      toast.error('An unexpected error occurred.');
    }
  }
}
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      {!isOtpSent ? (
        <form className="register-form" onSubmit={handleSubmit} noValidate>
          {/* Name Field */}
          <div className="form-group">
            <label>Name</label>
            <span style={{ color: 'red' }}>*</span>
            <input
              type="text"
              name="name"
              className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label>Email</label> 
            <span style={{ color: 'red' }}>*</span>
            <input
              type="email"
              name="emailId"
              className={`form-control ${touched.emailId && errors.emailId ? 'is-invalid' : ''}`}
              placeholder="Enter your email"
              value={formData.emailId}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.emailId && errors.emailId && <div className="invalid-feedback">{errors.emailId}</div>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label>Password</label>
            <span style={{ color: 'red' }}>*</span>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label>Confirm Password</label>
            <span style={{ color: 'red' }}>*</span>
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}`}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.confirmPassword && errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>

          {/* Phone Number Field */}
          <div className="form-group">
            <label>Phone Number</label>
            <span style={{ color: 'red' }}>*</span>
            <input
              type="text"
              name="phoneNumber"
              className={`form-control ${touched.phoneNumber && errors.phoneNumber ? 'is-invalid' : ''}`}
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.phoneNumber && errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
          </div>

          {/* Address Field */}
          <div className="form-group">
            <label>Delivery Address</label>
            <span style={{ color: 'red' }}>*</span>
            <input
              type="text"
              name="deliveryAddress"
              className={`form-control ${touched.deliveryAddress && errors.deliveryAddress ? 'is-invalid' : ''}`}
              placeholder="Enter your delivery address"
              value={formData.deliveryAddress}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.deliveryAddress && errors.deliveryAddress && <div className="invalid-feedback">{errors.deliveryAddress}</div>}
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            {/* Send OTP  */}
            Register
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <div className="form-group">
            <label>OTP</label>
            <input
              type="text"
              name="otp"
              className="form-control"
              placeholder="Enter the OTP sent to your email"
              value={otpData}
              onChange={(e) => setOtpData(e.target.value)}
            />
          </div>
          <center>
          <button type="submit" className="btn btn-primary btn-block">
            Verify OTP
          </button>
          </center>
        </form>
      )}

    

      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;

