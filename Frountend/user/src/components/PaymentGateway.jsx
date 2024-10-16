import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '../components/PaymentGateway.css';

import { showAlert } from '../components/OrderConfirmAlert';

const PaymentGateway = () => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false); // State to control payment form visibility
  const navigate = useNavigate();
  const location = useLocation();
  const { subscriptionDetails } = location.state || {};
  const [paymentDetails, setPaymentDetails] = useState({
    paymentId: `MealMate_User_${Date.now()}`,
    userId: subscriptionDetails.userId,
    amount: subscriptionDetails.price,
    dateOfPayment: new Date(),
    cancellation: "null",
    refundableAmount: 0,
    refundStatus: "null"
  });

  const [subscriptionDetailsofUser, setsubscriptionDetailsofUser] = useState({
    subscriptionId: subscriptionDetails.subscriptionId,
    price: subscriptionDetails.price,
    startDate: subscriptionDetails.startDate,
   
    mealPlanId: subscriptionDetails.mealPlanId,
    dietType: subscriptionDetails.dietType,
    endDate: subscriptionDetails.endDate,
    
    user: {
      userId: subscriptionDetails.userId
    }
  });

  const handlePaymentMethodChange = (method) => {
    setSelectedMethod(method);
  };

  const handlePayment = () => {
    // Validate form fields here
    setLoading(true);
    sendPaymentData(paymentDetails);
  };

  const sendPaymentData = (paymentDetails) => {
    axios.post('http://localhost:9090/mealmate-user/processUserPayment', paymentDetails)
      .then(response => {
        console.log('Subscription successful:', response.data);
        setLoading(false);
        
        sendSubscriptionData(subscriptionDetailsofUser); 
        showAlert('Payment successful! Your delicious meal is coming soon');
        // OrderConfirmAlert.showAlert();
        
        navigate('/OrderStatus', { state: { subscriptionData: subscriptionDetails } });
      })
      .catch(error => {
        console.error('Error subscribing to meal plan:', error);
        setError('Payment failed. Please try again.');
        setLoading(false);
      });
  };

  const sendSubscriptionData = (subscription) => {
    axios.post('http://localhost:9090/mealmate-user/createUserSubscription', subscription)
      .then(response => {
        console.log('Subscription successful:', response.data);
      })
      .catch(error => {
        console.error('Error subscribing to meal plan:', error);
      });
  };

  return (
    <Container className="payment-gateway">
      <div className="payment-details">
        <p>User ID: {subscriptionDetails.userId}</p>
        <p>Meal Plan ID: {subscriptionDetails.mealPlanId}</p>
        <p>Diet Type: {subscriptionDetails.dietType}</p>
        <p>Start Date: {subscriptionDetails.startDate}</p>
        <p>End Date: {subscriptionDetails.endDate}</p>
        <p>Total Price: ₹{subscriptionDetails.price}</p>
        {!showPaymentForm && (
          <Button className='payment-button' onClick={() => setShowPaymentForm(true)}>
            Proceed to Payment
          </Button>
        )}
      </div>

      {showPaymentForm && (
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Card className="payment-form">
              <Card.Body>
                <h2 className="payment-gateway-title text-center mb-4">Choose Payment Method</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Row>
                  <Col md={6} className="mb-3">
                    <Button
                      variant={selectedMethod === 'card' ? 'info' : ''}
                      className="w-100"
                      onClick={() => handlePaymentMethodChange('card')}
                    >
                      <i className="fas fa-credit-card"></i> Card
                    </Button>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Button
                      variant={selectedMethod === 'upi' ? 'info' : ''}
                      className="w-100"
                      onClick={() => handlePaymentMethodChange('upi')}
                    >
                      <i className="fas fa-mobile-alt"></i> UPI
                    </Button>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Button
                      variant={selectedMethod === 'netbanking' ? 'info' : ''}
                      className="w-100"
                      onClick={() => handlePaymentMethodChange('netbanking')}
                    >
                      <i className="fas fa-university"></i> Net Banking
                    </Button>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Button
                      variant={selectedMethod === 'wallet' ? 'info' : ''}
                      className="w-100"
                      onClick={() => handlePaymentMethodChange('wallet')}
                    >
                      <i className="fas fa-wallet"></i> Wallet
                    </Button>
                  </Col>
                </Row>

                <Form>
                  {selectedMethod === 'card' && (
                    <div>
                      <Form.Group className="form-group">
                        <Form.Label className="form-label">Card Number</Form.Label>
                        <Form.Control className="form-control card-number-input" type="text" placeholder="Enter card number" />
                      </Form.Group>
                      <Form.Group className="form-group expiry-cvv-group">
                        <div className="expiry-input">
                          <Form.Label className="form-label">Expiry Date</Form.Label>
                          <Form.Control className="form-control" type="text" placeholder="MM/YY" />
                        </div>
                        <div className="cvv-input">
                          <Form.Label className="form-label">CVV</Form.Label>
                          <Form.Control className="form-control" type="text" placeholder="CVV" />
                        </div>
                      </Form.Group>
                    </div>
                  )}

                  {selectedMethod === 'upi' && (
                    <div>
                      <Form.Group className="form-group">
                        <Form.Label className="form-label">UPI ID</Form.Label>
                        <Form.Control className="form-control" type="text" placeholder="Enter UPI ID" />
                      </Form.Group>
                    </div>
                  )}

                  {selectedMethod === 'netbanking' && (
                    <div>
                      <Form.Group className="form-group">
                        <Form.Label className="form-label">Bank</Form.Label>
                        <Form.Control className="form-control" as="select">
                          <option>Select your bank</option>
                          <option>Bank 1</option>
                          <option>Bank 2</option>
                          <option>Bank 3</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                  )}

                  {selectedMethod === 'wallet' && (
                    <div>
                      <Form.Group className="form-group">
                        <Form.Label className="form-label">Wallet</Form.Label>
                        <Form.Control className="form-control" as="select">
                          <option>Select your wallet</option>
                          <option>Wallet 1</option>
                          <option>Wallet 2</option>
                          <option>Wallet 3</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                  )}

                  <center>
                  <Button variant="" className="payment-button" onClick={handlePayment} disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Pay Here'}
                  </Button>
                  </center>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );

};

export default PaymentGateway;
