import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import '../components/Mealplan.css'; // Optional: For custom styles
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Modal,Carousel } from 'react-bootstrap';
import Login from './Login';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Login1 from './Login1';

const MealPlan = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const [showCustomDate, setShowCustomDate] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  

  const user = useSelector(state => state.user);
  const isLoggedIn = !!user;
  const userId = user?.userId;

  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:9090/mealmate-admin/mealPlans')
      .then(response => {
        setMealPlans(response.data);
        console.log(userId)
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the meal plan data:', error);
        setLoading(false);
      });
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedType(null);
    setSelectedDuration(null);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setSelectedDuration(null);
  };

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration);
  };


  const calculateCustomDuration = () => {
    if (startDate && endDate) {
      const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      handleDurationSelect(duration);
      setShowCustomDate(false); // Close the custom date picker after selecting
    }
  };

  const getNextDays = (numDays) => {
    const daysOfWeek = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    const today = new Date().getDay();
    const nextDays = [];
    for (let i = 1; i <= numDays; i++) {
      nextDays.push(daysOfWeek[(today + i) % 7]);
    }
    return nextDays;
  };

  const filteredMealPlans = mealPlans.filter(mealPlan => {
    return mealPlan.dietType === `${selectedCategory}-${selectedType}`;
  });

  // const calculatePrice = (meals, duration) => {
  //   const nextDays = getNextDays(duration);
  //   return meals
  //     .filter(meal => nextDays.includes(meal.dayOfTheWeek))
  //     .reduce((total, meal) => total + meal.meal.mealPrice, 0);
  // };


  const calculatePrice = (meals, duration) => {
    const nextDays = getNextDays(duration);
    
    // Filter the meals to only include the days in `nextDays`
    const filteredMeals = meals.filter(meal => nextDays.includes(meal.dayOfTheWeek));
  
    // Calculate the total price
    const totalPrice = filteredMeals.reduce((total, meal) => total + meal.meal.mealPrice, 0);
    
    // If duration exceeds 7 days, repeat the meal prices for the extra weeks
    const fullWeeks = Math.floor(duration / 7);
    const remainingDays = duration % 7;
    
    const priceForFullWeeks = totalPrice * fullWeeks; // Price for complete weeks
    const priceForRemainingDays = meals
      .filter(meal => getNextDays(remainingDays).includes(meal.dayOfTheWeek))
      .reduce((total, meal) => total + meal.meal.mealPrice, 0); // Price for remaining days
  
    return priceForFullWeeks + priceForRemainingDays;
  };
  

  const handleSubscription = (mealPlan) => {
    if (!mealPlan || !mealPlan.meals) {
      console.error('Meal plan or meals are undefined:', mealPlan);
      return;
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + selectedDuration);
    const nextDays = getNextDays(selectedDuration);
    const meals = mealPlan.meals.filter(meal => nextDays.includes(meal.dayOfTheWeek));
    const price = calculatePrice(meals, selectedDuration);
    const subscription = {
      userId: userId,
      subscriptionId: `MealMate_${Date.now()}`, // Leave as null for auto-generation
      mealPlanId: mealPlan.mealPlanId,
      dietType: mealPlan.dietType,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      price: price
    };
    setSubscriptionData(subscription);

    if (!isLoggedIn) {
      setShowLoginModal(true); // Show login modal if user is not logged in
      return;
    }

    navigate('/PaymentGateway', { state: { subscriptionDetails: subscription } });
  };

  const handleCloseLoginModal = () => setShowLoginModal(false);

  const handleLoginSuccess = () => {
    setShowLoginModal(false); // Close the login modal
    // Additional logic after successful login if needed
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <Container className="meal-plan">
      <div className="mb-4">
        <h2 className="meal-plan-title">Select Your Diet Type</h2>
        <div className="selection-container">
          <Button
            variant="primary"
            className="card-button"
            style={{ backgroundImage: 'url(https://media.istockphoto.com/id/2161742309/photo/morning-routine-a-man-running-by-the-beach.jpg?s=612x612&w=0&k=20&c=u1Z1KY4ZpFjzPeMWlg-fCX7kZr2wMUtwI_MCgDhh26c=)' }}
            onClick={() => handleCategorySelect('Weight Loss')}
          >
            <span>Weight Loss</span>
          </Button>
          <Button
            variant="primary"
            className="card-button"
            style={{ backgroundImage: 'url(https://media.istockphoto.com/id/1151947503/vector/healthy-food-concept.jpg?s=612x612&w=0&k=20&c=DsdjYISZpjGBFU3SamSDvIshSYDxWzOD6FZplvQXpGA=)' }}
            onClick={() => handleCategorySelect('Balanced')}
          >
            <span>Balanced</span>
          </Button>
          <Button
            variant="primary"
            className="card-button"
            style={{ backgroundImage: 'url(https://news.uga.edu/wp-content/uploads/2022/09/BMI_scale-v1.png)' }}
            onClick={() => handleCategorySelect('Weight Gain')}
          >
            <span>Weight Gain</span>
          </Button>
        </div>
      </div>

      {selectedCategory && (
        <div className="mb-4">
          <h3 className="meal-plan-title">Order Preference in {selectedCategory}</h3>
          <div className="selection-container">
            <Button
              variant="secondary"
              className="card-button"
              style={{ backgroundImage: 'url(https://i.etsystatic.com/15783215/r/il/d6ddc1/5095747659/il_fullxfull.5095747659_ie7o.jpg)' }}
              onClick={() => handleTypeSelect('Veg')}
            >
              <span>Vegetarian</span>
            </Button>
            <Button
              variant="secondary"
              className="card-button"
              style={{ backgroundImage: 'url(https://tse2.mm.bing.net/th/id/OIP.S7JYjcSRaC1CZF9zJHXTbwHaHa?rs=1&pid=ImgDetMain' }}
              onClick={() => handleTypeSelect('Non-Veg')}
            >
              <span>Non<br />Vegetarian</span>
            </Button>
          </div>
        </div>
      )}

      {selectedType && (
        <div className="mb-4">
          <h3 className="meal-plan-title">Choose Your Meal Period</h3>
          <div className="selection-container">
            <Button variant="success" onClick={() => handleDurationSelect(1)}>1 Day</Button>
            <Button variant="success" onClick={() => handleDurationSelect(3)}>3 Days</Button>
            <Button variant="success" onClick={() => handleDurationSelect(7)}>7 Days</Button>
            <Button variant="success" onClick={() => setShowCustomDate(true)}>Customise Your Days</Button>
          </div>

          {/* Custom Date Range Picker */}
          {showCustomDate && (
            <div className="custom-date-picker">
              <h4>Select Start and End Date</h4>
              <div className="date-picker-container">
                <div className="date-picker-wrapper">
                  <label className="date-label">Start Date</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()} // Block past dates for start date
                    placeholderText="Start Date"
                    className="date-picker"
                  />
                </div>
                <div className="date-picker-wrapper">
                  <label className="date-label">End Date</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate || new Date()} // Block past dates for end date and ensure it's after start date
                    className="date-picker"
                    placeholderText="End Date"
                  />
                </div>
              </div>
              <Button variant="success" onClick={calculateCustomDuration}>Calculate Duration</Button>
            </div>
          )}
        </div>
      )}

      {selectedDuration && filteredMealPlans.length > 0 && (
        <div className="meal-plan-details">
          <h3 className="meal-plan-title">Meal Plan for {selectedCategory} - {selectedType} (Next {selectedDuration} Day{selectedDuration > 1 ? 's' : ''})</h3>
          {filteredMealPlans.map((mealPlan) => (
            <div className="mb-5" key={mealPlan.mealPlanId}>
              <h3 className="meal-plan-title">Menu</h3>
              <Carousel>
                {mealPlan.meals
                  .filter(meal => getNextDays(selectedDuration).includes(meal.dayOfTheWeek))
                  .map((meal) => (
                    <Carousel.Item key={meal.id}>
                      <Row className="justify-content-center">
                        <Col md={3} lg={11} className="mb-4">
                          <Card className="text-center meal-card">
                            <Card.Header>
                              <Card.Title>{meal.dayOfTheWeek}</Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">Meal Price: {meal.meal.mealPrice}/-</Card.Subtitle>
                            </Card.Header>
                            <Card.Body>
                              <ListGroup className="list-group-flush">
                                <div className="d-flex flex-wrap justify-content-center">
                                  {meal.meal.foodItems.map((item) => (
                                    <ListGroup.Item
                                      key={item.foodItemId}
                                      className="me-3 mb-3 text-center food-item"
                                    >
                                      <h5>{item.name}</h5>
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="img-fluid"
                                      />
                                      <p>Quantity: {item.quantity}</p>
                                    </ListGroup.Item>
                                  ))}
                                </div>
                              </ListGroup>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Carousel.Item>
                  ))}
              </Carousel>
              <center>
                <Button onClick={() => handleSubscription(mealPlan)} className="subscribe_button">Subscribe</Button>
              </center>
              {console.log(subscriptionData)}

              {/* Login Modal */}
              <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* Pass the handleLoginSuccess function to Login */}
                  <Login1 onLoginSuccess={handleLoginSuccess} />
                </Modal.Body>
              </Modal>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
  
  
}
export default MealPlan;  