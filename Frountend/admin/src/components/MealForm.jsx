import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const MealForm = ({ categories, foodItems, mealToEdit, onSave, onClose }) => {
  const [newMeal, setNewMeal] = useState({ foodItems: [], mealPrice: 0 });
  const [selectedFoodItems, setSelectedFoodItems] = useState({});
  const [priceError, setPriceError] = useState('');
  const [foodItemsError, setFoodItemsError] = useState('');

  useEffect(() => {
    if (mealToEdit) {
      setNewMeal({ mealPrice: mealToEdit.mealPrice, foodItems: mealToEdit.foodItems });
      setSelectedFoodItems(
        mealToEdit.foodItems.reduce((acc, item) => {
          acc[item.category] = item.foodItemId;
          return acc;
        }, {})
      );
    } else {
      setNewMeal({ foodItems: [], mealPrice: 0 });
      setSelectedFoodItems({});
    }
  }, [mealToEdit]);

  const handleCategoryChange = (category, itemId) => {
    setSelectedFoodItems({ ...selectedFoodItems, [category]: itemId });
  };

  const handleSave = () => {
    let hasError = false;

    // Price validation: Should not be empty or less than or equal to zero
    if (newMeal.mealPrice <= 0) {
      setPriceError('Meal price should be a positive number.');
      hasError = true;
    } else {
      setPriceError('');
    }

    // Food items validation: Ensure at least one food item is selected
    const selectedFoodItemsArray = foodItems.filter(
      item => selectedFoodItems[item.category] === item.foodItemId
    );

    if (selectedFoodItemsArray.length === 0) {
      setFoodItemsError('Please select at least one food item.');
      hasError = true;
    } else {
      setFoodItemsError('');
    }

    if (hasError) return;

    const mealWithFoodItems = {
      ...newMeal,
      foodItems: selectedFoodItemsArray,
      mealId: mealToEdit ? mealToEdit.mealId : `Meal_${Date.now()}`, // Generate or use existing mealId
      id: mealToEdit ? mealToEdit.mealId : `Meal_${Date.now()}` // Ensure id matches mealId
    };

    onSave(mealWithFoodItems);
  };

  return (
    <Form>


      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Meal Price:<span style={{ color: 'red' }}>*</span></Form.Label>
        <Col sm="10">
          <Form.Control
            type="number"
            value={newMeal.mealPrice}
            onChange={(e) => setNewMeal({ ...newMeal, mealPrice: parseFloat(e.target.value) })}
            isInvalid={!!priceError} // Apply invalid styling if there's an error
          />
          <Form.Control.Feedback type="invalid">{priceError}</Form.Control.Feedback>
        </Col>
      </Form.Group>

      {categories.map((category) => (
        <Form.Group as={Row} className="mb-3" key={category}>
          <Form.Label column sm="2">{category}:</Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              value={selectedFoodItems[category] || ''}
              onChange={(e) => handleCategoryChange(category, e.target.value)}
            >
              <option value="">Select {category}</option>
              {foodItems
                .filter(item => item.category === category)
                .map(item => (
                  <option key={item.foodItemId} value={item.foodItemId}>
                    {item.name}
                  </option>
                ))}
            </Form.Control>
          </Col>
        </Form.Group>
      ))}

      {foodItemsError && (
        <Row className="mb-3">
          <Col sm="10">
            <p className="text-danger">{foodItemsError}</p>
          </Col>
        </Row>
      )}

      <Form.Group as={Row} className="mb-3">
        <Col sm="10">
          <Button variant="primary" onClick={handleSave}>
            {mealToEdit ? 'Save Changes' : 'Add Meal'}
          </Button>
          <Button variant="secondary" onClick={onClose} className="ms-2">Cancel</Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default MealForm;
