import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import './MealPlansForm.css';

const daysOfWeek = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

const MealPlansForm = ({ meals, onAddMealPlan, editMealPlan }) => {
  const [dietType, setDietType] = useState('');
  const [mealplanPrice, setMealplanPrice] = useState(0);
  const [selectedMeals, setSelectedMeals] = useState(Array(7).fill({ meal: {} }));

  useEffect(() => {
    if (editMealPlan) {
      setDietType(editMealPlan.dietType);
      setSelectedMeals(editMealPlan.meals);
      calculateMealPlanPrice(editMealPlan.meals);
    }
  }, [editMealPlan]);

  useEffect(() => {
    calculateMealPlanPrice(selectedMeals);
  }, [selectedMeals]);

  const calculateMealPlanPrice = (meals) => {
    const totalPrice = meals.reduce((total, meal) => {
      return total + (meal.meal.mealPrice || 0);
    }, 0);
    setMealplanPrice(totalPrice);
  };

  const handleMealChange = (dayIndex, mealId) => {
    const meal = meals.find(meal => meal.mealId === mealId);
    const updatedMeals = [...selectedMeals];

    updatedMeals[dayIndex] = {
      id: dayIndex + 1,
      dayOfTheWeek: daysOfWeek[dayIndex],
      meal
    };

    setSelectedMeals(updatedMeals);
    calculateMealPlanPrice(updatedMeals); // Recalculate the price after updating the meals
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newMealPlan = {
      mealPlanId: editMealPlan ? editMealPlan.mealPlanId : `MealPlan_${Date.now()}`,
      dietType,
      mealplanPrice,
      meals: selectedMeals
    };
    
    onAddMealPlan(newMealPlan);
  };

  return (
    <div className="meal-plans-form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="dietType">
          <Form.Label>Diet Type<span style={{color:'red'}}>*</span></Form.Label>
          <Form.Control
            type="text"
            value={dietType}
            onChange={(e) => setDietType(e.target.value)}
            required
            className="form-input"
          />
        </Form.Group>
        
        <Form.Group controlId="mealplanPrice">
          <Form.Label>Meal Plan Price<span style={{color:'red'}}>*</span></Form.Label>
          <Form.Control
            type="number"
            value={mealplanPrice}
            readOnly
            className="form-input"
          />
        </Form.Group>
        
        {daysOfWeek.map((day, index) => (
          <Form.Group controlId={day} key={day}>
            <Form.Label>{day}<span style={{color:'red'}}>*</span></Form.Label>
            <Form.Control
              as="select"
              value={selectedMeals[index]?.meal?.mealId || ''}
              onChange={(e) => handleMealChange(index, e.target.value)}
              required
              className="form-input"
            >
              <option value="">Select a meal</option>
              {meals.map(meal => (
                <option key={meal.mealId} value={meal.mealId}>
                  {meal.foodItems.map(item => item.name).join(', ')}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        ))}
        
        <div className="d-flex justify-content-center">
          <Button type="submit" className="btn btn-dark">Save Meal Plan</Button>
        </div>
      </Form>
    </div>
  );
};

export default MealPlansForm;
