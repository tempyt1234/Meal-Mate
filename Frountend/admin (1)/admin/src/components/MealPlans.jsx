import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MealPlansForm from './MealPlansForm'; // Ensure this is the correct path to the MealPlansForm component
import './MealPlans.css'; // Ensure the CSS file is correctly imported
import { Card, Button, Container, Row, Col, Spinner, Form, Alert, Modal } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const MealPlans = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [dietTypes, setDietTypes] = useState([]); // State to store unique diet types
  const [selectedDietType, setSelectedDietType] = useState(''); // State to store selected diet type
  const [editMealPlan, setEditMealPlan] = useState(null); // State to handle editing a meal plan
  const [errorMessage, setErrorMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State for delete confirmation modal
  const [mealPlanToDelete, setMealPlanToDelete] = useState(null); // State to store meal plan ID to delete

  // Fetch meal plans from db2.json
  useEffect(() => {
    axios.get('http://localhost:9090/mealmate-admin/mealPlans')
      .then(response => {
        setMealPlans(response.data);
        setIsLoading(false);
        // Extract unique diet types
        const uniqueDietTypes = [...new Set(response.data.map(plan => plan.dietType))];
        setDietTypes(uniqueDietTypes);
      })
      .catch(error => {
        console.error('Error fetching meal plans:', error);
        setIsLoading(false); // Set loading to false in case of error
      });
  }, []);

  // Fetch meals from db.json
  useEffect(() => {
    axios.get('http://localhost:9090/mealmate-admin/meals') // Correct endpoint for meals
      .then(response => {
        setMeals(response.data); // Set meals state
        setErrorMessage(''); // Clear error message on successful fetch
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);  // Display the backend exception message
        } else {
          setErrorMessage('Failed to fetch food items.');
        } // Set error message
      });
  }, []);

  // Handle adding a new meal plan
  const handleAddMealPlan = (newMealPlan) => {
    if (editMealPlan) {
      axios.put(`http://localhost:9090/mealmate-admin/mealPlan/${editMealPlan.mealPlanId}/update`, { ...newMealPlan, id: editMealPlan.mealPlanId })
        .then(response => {
          setMealPlans(prevMealPlans => prevMealPlans.map(plan => plan.mealPlanId === editMealPlan.mealPlanId ? response.data : plan));
          setShowForm(false); // Hide the form after updating the meal plan
          setEditMealPlan(null); // Reset the edit state
          toast.success('MealPlan Updated Successfully');
        })
        .catch(error => {
          console.error('Error updating meal plan:', error);
        });
    } else {
      const newMealPlanWithId = {
        ...newMealPlan,
        mealPlanId: `MealPlan_${Date.now()}`, // Generate ID in the format MealPlan_<timestamp>
        id: `MealPlan_${Date.now()}` // Ensure id is the same as mealPlanId
      };
      axios.post('http://localhost:9090/mealmate-admin/mealPlan', newMealPlanWithId)
        .then(response => {
          setMealPlans(prevMealPlans => [...prevMealPlans, response.data]);
          setShowForm(false); // Hide the form after adding a meal plan
          toast.success('MealPlan Added Successfully');
        })
        .catch(error => {
          console.error('Error adding new meal plan:', error);
        });
    }
  };

  // Handle deleting a meal plan
  const handleDeleteMealPlan = (mealPlanId) => {
    setMealPlanToDelete(mealPlanId);
    setShowDeleteConfirm(true); // Show confirmation modal
  };

  // Confirm deletion
  const confirmDeleteMealPlan = () => {
    axios.delete(`http://localhost:9090/mealmate-admin/mealPlan/${mealPlanToDelete}/delete`)
      .then(() => {
        setMealPlans(prevMealPlans => prevMealPlans.filter(plan => plan.mealPlanId !== mealPlanToDelete));
        toast.success('MealPlan deleted Successfully');
      })
      .catch(error => {
        console.error('Error deleting meal plan:', error);
      })
      .finally(() => {
        setShowDeleteConfirm(false); // Close the confirmation modal
        setMealPlanToDelete(null); // Reset the meal plan to delete
      });
  };

  // Handle editing a meal plan
  const handleEditMealPlan = (plan) => {
    setEditMealPlan(plan);
    setShowForm(true);
  };

  // Handle diet type selection
  const handleDietTypeChange = (e) => {
    setSelectedDietType(e.target.value);
  };

  // Function to sort days of the week
  const sortDaysOfWeek = (meals) => {
    const dayOrder = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    return meals.sort((a, b) => dayOrder.indexOf(a.dayOfTheWeek) - dayOrder.indexOf(b.dayOfTheWeek));
  };

  // Filter meal plans based on selected diet type
  const filteredMealPlans = selectedDietType
    ? mealPlans.filter(plan => plan.dietType === selectedDietType)
    : mealPlans;

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '10em' }}>
        <Spinner animation="border" role="status" variant="danger">
          <span className="sr-only" style={{ color: 'black' }}></span>
        </Spinner>
      </div>
    );
  }
  return (
    <Container className='meal-plans-container'>
      <h2 className="mealplan-title">Meal Plans</h2>
      <div className="d-flex justify-content-center">
        <Button onClick={() => setShowForm(true)} className="btn btn-dark">Add Meal Plan</Button>
      </div>
      <Form.Group controlId="dietTypeFilter" style={{ paddingBottom: '1em' }}>
        <Form.Label>Filter by Diet Type:</Form.Label>
        <Form.Control as="select" value={selectedDietType} onChange={handleDietTypeChange}>
          <option value="">All</option>
          {dietTypes.map((dietType, index) => (
            <option key={index} value={dietType}>{dietType}</option>
          ))}
        </Form.Control>
      </Form.Group>
  
      <Row className="meal-plan-card-container">
        {filteredMealPlans.length > 0 ? (
          filteredMealPlans.map((plan) => (
            <Col key={plan.mealPlanId} xs={12} className="mb-4">
              <Card className="meal-plan-card">
                <Card.Body>
                  <Card.Title className="meal-plan-title">
                    {plan.dietType} - Rs.{plan.mealplanPrice}
                    <div className="float-right">
                      <Button variant="warning" onClick={() => handleEditMealPlan(plan)} className="me-2">
                        <FaEdit />
                      </Button>
                      <Button variant="danger" onClick={() => handleDeleteMealPlan(plan.mealPlanId)}>
                        <FaTrashAlt />
                      </Button>
                    </div>
                  </Card.Title>
  
                  <Row className="meal-day-card-container d-flex justify-content-center">
                    {sortDaysOfWeek(plan.meals).map((meal) => (
                      <Col key={meal.dayOfTheWeek} xs={12} md={3}>
                        <Card className="meal-day-card">
                          <Card.Body>
                            <Card.Title>{meal.dayOfTheWeek}</Card.Title>
                            {meal.meal.foodItems.map((item) => (
                              <div className="food-item" key={item.foodItemId}>
                                <strong>{item.name}</strong> ({item.quantity})
                              </div>
                            ))}
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div>
            {errorMessage && <Alert variant="danger" className="message">{errorMessage}</Alert>}
            {!errorMessage && <Alert variant="info" className="message">No meal plans found.</Alert>}
          </div>
        )}
      </Row>
  

  
      <Modal show={showForm} onHide={() => setShowForm(false)} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>{editMealPlan ? 'Edit Meal Plan' : 'Adding Meal Plan'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MealPlansForm meals={meals} onAddMealPlan={handleAddMealPlan} editMealPlan={editMealPlan} />
        </Modal.Body>
      </Modal>
  
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this meal plan?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteMealPlan}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
  
};

export default MealPlans;
