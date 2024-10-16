import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/actions';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'; // Import the CSS file
import Snackbar from '@mui/material/Snackbar'; // Material UI Snackbar
import Alert from '@mui/material/Alert'; // Material UI Alert
import { toast } from 'react-toastify';

const Login1 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Success for green, error for red
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  // Snackbar close handler
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Validation functions
  const validateEmail = (email) => {
    if (!email) {
      return 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    } else if (password.length < 8 || password.length > 16) {
      return 'Password must be between 8 and 16 characters';
    } else if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
      return 'Password must contain at least one special character';
    }
    return '';
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: '' })); // Clear email error on change
    setGeneralError(''); // Clear general error
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: '' })); // Clear password error on change
    setGeneralError(''); // Clear general error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous general errors
    setGeneralError('');

    // Validate inputs
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return; // Stop form submission if there are validation errors
    }

    try {
      const response = await axios.get(`http://localhost:9090/mealmate-user/userlogin/${email}/${password}`);
      const user = response.data;

      if (user) {
        dispatch(loginSuccess(user));
        localStorage.setItem('user', JSON.stringify(user)); // Store user data in local storage
        localStorage.setItem('isAuthenticated', 'true'); // Store authentication status
        setSnackbarSeverity('success'); // Set Snackbar to green for success
        toast.success('Login success');
        setSnackbarOpen(true); // Show Snackbar on success
        setTimeout(() => {
         // navigate('/home'); // Redirect to home after successful login
        }, 3000); // Wait 3 seconds before redirecting
      } else {
        setSnackbarSeverity('error'); // Set Snackbar to red for errors
        setSnackbarMessage('Invalid email or password');
        setSnackbarOpen(true); // Show Snackbar on error
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
  };

  return (
    <Container className="login-container">
      <h2 className="login-title">Login</h2>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Group controlId="formEmail">
          <Form.Label className="form-label">Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={handleChangeEmail} // Update on change
            isInvalid={!!errors.email}
            placeholder="Enter your email address"
            required
            className="form-control"
          />
          {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label className="form-label">Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={handleChangePassword} // Update on change
            isInvalid={!!errors.password}
            placeholder="Enter your password (8-16 chars, 1 special & 1 lowercase)"
            required
            className="form-control"
          />
          {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
        </Form.Group>

        <Button variant="primary" type="submit" className="login-button">
          Login
        </Button>
      </Form>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login1;





