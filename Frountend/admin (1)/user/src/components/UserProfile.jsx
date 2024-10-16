import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../components/UserProfile.css';
const UserProfile = () => {
  const userFromStore = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: '',
    emailId: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    deliveryAddress: ''
  });
  const [errors, setErrors] = useState({});
  // Fetch user data from local storage or store on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : userFromStore;
    if (user) {
      setFormData({
        name: user.name,
        emailId: user.emailId,
        password: user.password,
        confirmPassword: user.password,
        phoneNumber: user.phoneNumber,
        deliveryAddress: user.deliveryAddress
      });
    }
  }, [userFromStore]);
  // Updated validation functions matching Register page
  const validateName = (name) => {
    if (!name) {
      return 'Name is required. Example: John Doe';
    } else if (name.trim().length < 3) {
      return 'Name must be at least 3 characters long. Example: John';
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      return 'Name can only contain letters and spaces. Example: John Doe';
    }
    return '';
  };
  const validateEmail = (email) => {
    if (!email) {
      return 'Email is required. Example: john.doe@gmail.com';
    } else if (!/^[a-zA-Z][^\s@]{2,}@gmail\.com$/.test(email)) {
      return 'Email must start with a letter and have at least 3 characters before @gmail.com. Example: john.doe@gmail.com';
    }
    return '';
  };
  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required. Must be 8-16 characters with 1 lowercase, 1 special character, 1 digit. Example: password@123';
    } else if (password.length < 8 || password.length > 16) {
      return 'Password must be between 8 and 16 characters. Example: password@123';
    } else if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter. Example: password@123';
    } else if (!/(?=.*[!@#$%^&*])/.test(password)) {
      return 'Password must contain at least one special character. Example: password@123';
    } else if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one digit. Example: password@123';
    }
    return '';
  };
  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      return 'Please confirm your password. It must match the password entered above.';
    } else if (password !== confirmPassword) {
      return 'Passwords do not match. Example: If password is password@123, confirm password should be the same.';
    }
    return '';
  };
  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) {
      return 'Phone number is required. Example: 9876543210';
    } else if (!/^[6789]\d{9}$/.test(phoneNumber)) {
      return 'Phone number must start with 6, 7, 8, or 9 and be exactly 10 digits. Example: 9876543210';
    }
    return '';
  };
  const validateAddress = (address) => {
    const addressParts = address.split(',');
    if (addressParts.length !== 4) {
      return 'Address must include Flat No, Street, City, and Pincode separated by commas. Example: 123, First Street, New York, 123456';
    }
    const [flatNo, street, city, pincode] = addressParts.map((part) => part.trim());
    if (!/^\d+$/.test(flatNo)) {
      return 'Flat No must be numerical only. Example: 123';
    }
    if (!street) {
      return 'Street is required. Example: First Street';
    } else if (!city) {
      return 'City is required. Example: New York';
    } else if (!/^\d{6}$/.test(pincode)) {
      return 'Pincode must be exactly 6 digits. Example: 123456';
    }
    return '';
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    let errorMsg = '';
    switch (name) {
      case 'name':
        errorMsg = validateName(value);
        break;
      case 'emailId':
        errorMsg = validateEmail(value);
        break;
      case 'password':
        errorMsg = validatePassword(value);
        break;
      case 'confirmPassword':
        errorMsg = validateConfirmPassword(formData.password, value);
        break;
      case 'phoneNumber':
        errorMsg = validatePhoneNumber(value);
        break;
      case 'deliveryAddress':
        errorMsg = validateAddress(value);
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: errorMsg });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      return;
    }
    try {
      // const updatedUser = { ...formData, id: userFromStore.id };
      const response = await axios.put(`http://localhost:9090/mealmate-user/userProfile/${formData.emailId}`, {
        name: formData.name,
        emailId: formData.emailId,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        deliveryAddress: formData.deliveryAddress
      }
);
      if (response.status === 200) {
        alert('Profile updated successfully!');
      } else {
        alert('Failed to update profile');
      }
    } catch (error) {
      console.error('There was an error updating the profile!', error);
      alert('Error updating profile');
    }
  };
  return (
    <Container className="profile-container">
      <h2 className="profile-title">User Profile</h2>
      <Form className="profile-form" onSubmit={handleSubmit}>
        {/* Name Field */}
        <Form.Group className="form-group" controlId="formName">
          <Form.Label className="form-label">Name</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
            placeholder="Enter your full name"
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        {/* Email Field */}
        <Form.Group className="form-group" controlId="formEmail">
          <Form.Label className="form-label">Email</Form.Label>
          <Form.Control
            className="form-control"
            type="email"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            isInvalid={!!errors.emailId}
            placeholder="Enter your email"
            readOnly
          />
          <Form.Control.Feedback type="invalid">
            {errors.emailId}
          </Form.Control.Feedback>
        </Form.Group>
        {/* Password Field
        <Form.Group className="form-group" controlId="formPassword">
          <Form.Label className="form-label">Password</Form.Label>
          <Form.Control
            className="form-control"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
            placeholder="Enter your new password"
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group> */}
        {/* Confirm Password Field */}
        {/* <Form.Group className="form-group" controlId="formConfirmPassword">
          <Form.Label className="form-label">Confirm Password</Form.Label>
          <Form.Control
            className="form-control"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            isInvalid={!!errors.confirmPassword}
            placeholder="Confirm your password"
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group> */}
                {/* Phone Number Field */}
                <Form.Group className="form-group" controlId="formPhoneNumber">
          <Form.Label className="form-label">Phone Number</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            isInvalid={!!errors.phoneNumber}
            placeholder="Enter your phone number"
          />
          <Form.Control.Feedback type="invalid">
            {errors.phoneNumber}
          </Form.Control.Feedback>
        </Form.Group>
        {/* Delivery Address Field */}
        <Form.Group className="form-group" controlId="formDeliveryAddress">
          <Form.Label className="form-label">Delivery Address</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            isInvalid={!!errors.deliveryAddress}
            placeholder="Enter your delivery address"
          />
          <Form.Control.Feedback type="invalid">
            {errors.deliveryAddress}
          </Form.Control.Feedback>
        </Form.Group>
        {/* Submit Button */}
        <Button className="profile-button" variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </Container>
  );
};
export default UserProfile;