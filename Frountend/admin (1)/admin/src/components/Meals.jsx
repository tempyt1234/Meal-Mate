import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, ListGroup, Button, Modal, Alert } from 'react-bootstrap';
import MealForm from './MealForm';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import './Meals.css'; // Import the CSS file
import './AdminPanel.css'; // Import the Admin Panel CSS file for pagination styling
import { toast } from 'react-toastify';

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [mealToEdit, setMealToEdit] = useState(null);
  const [mealToDelete, setMealToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const mealsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mealsResponse = await axios.get('http://localhost:9090/mealmate-admin/meals');
        const foodItemsResponse = await axios.get('http://localhost:9090/mealmate-admin/foodItems');
        setMeals(mealsResponse.data);
        setFoodItems(foodItemsResponse.data);
        if (mealsResponse.data.length === 0) {
          setErrorMessage('No meals available.');
        } else {
          setErrorMessage('');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage('Failed to fetch food items.');
        }
      }
    };
    fetchData();
  }, []);

  const handleEdit = (meal) => {
    setMealToEdit(meal);
    setShowForm(true);
  };

  const handleAddNewMeal = () => {
    setMealToEdit(null);
    setShowForm(true);
  };

  const handleSave = async (meal) => {
    try {
      const mealPrice = meal.mealPrice !== undefined && meal.mealPrice !== null ? parseFloat(meal.mealPrice) : 0;

      if (mealToEdit) {
        await axios.put(`http://localhost:9090/mealmate-admin/meal/${mealToEdit.mealId}`, { ...meal, mealPrice });
        setMeals(meals.map(m => (m.mealId === meal.mealId ? { ...meal, mealPrice } : m)));
        toast.success('Meal Updated Successfully');
      } else {
        const newMeal = { ...meal, mealPrice, mealId: `Meal_${Date.now()}` };
        const response = await axios.post('http://localhost:9090/mealmate-admin/meal', newMeal);
        toast.success('Meal Added Successfully');
        setMeals([...meals, response.data]);
      }
      setShowForm(false);
      setErrorMessage('');
    } catch (error) {
      console.error('Error saving meal:', error);
      setErrorMessage('Failed to save meal.');
    }
  };

  const confirmDelete = (mealId) => {
    setMealToDelete(mealId);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:9090/mealmate-admin/meal/${mealToDelete}/delete`);
      setMeals(meals.filter(m => m.mealId !== mealToDelete));
      setShowDeleteModal(false);
      toast.success('Meal deleted successfully');
      if (meals.length === 1) {
        setErrorMessage('No meals available.');
      }
    } catch (error) {
      console.error('Error deleting meal:', error);
      toast.error('Failed to delete meal.');
    }
  };

  // Pagination logic
  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);
  const totalPages = Math.ceil(meals.length / mealsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <center>
      <Container className="meals-container">
        <Row className="mb-3">
          <div className='d-flex justify-content-center'>
            <h2 className="meals-title">Meals</h2>
          </div>
          <Col className='d-flex justify-content-center'>
            <Button onClick={handleAddNewMeal} className="btn btn-dark">Add New Meal</Button>
          </Col>
        </Row>

        <Modal show={showForm} onHide={() => setShowForm(false)} className="meal-custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>{mealToEdit ? 'Edit Meal' : 'Add New Meal'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MealForm
              categories={[...new Set(foodItems.map(item => item.category))]}
              foodItems={foodItems}
              mealToEdit={mealToEdit}
              onSave={handleSave}
              onClose={() => setShowForm(false)}
            />
          </Modal.Body>
        </Modal>

        {errorMessage && (
          <Alert variant="info" className="message">{errorMessage}</Alert>
        )}

        <Row>
          <Col>
            <ListGroup className="meals-list">
              {currentMeals.map(meal => (
                <ListGroup.Item key={meal.mealId} className="meal-item">
                  <div>
                    <strong>Meal ID:</strong> {meal.mealId}
                  </div>
                  <div>
                    <strong>Price:</strong> {meal.mealPrice}
                  </div>
                  <div>
                    <strong>Food Items:</strong>
                    <ul>
                      {meal.foodItems.map(foodItem => (
                        <li key={foodItem.foodItemId}>{foodItem.name}</li>
                      ))}
                    </ul>
                  </div>
                  <Button variant="warning" onClick={() => handleEdit(meal)} className="me-2 action-button">
                    <FaEdit />
                  </Button>
                  <Button variant="danger" onClick={() => confirmDelete(meal.mealId)} className="action-button">
                    <RiDeleteBin6Line />
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this meal?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
          </Modal.Footer>
        </Modal>

        {/* Pagination controls */}
        {meals.length > mealsPerPage && (
          <div className="pagination-controls">
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <span>{currentPage} / {totalPages}</span>
            <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        )}
      </Container>
    </center>
  );
};

export default Meals;
