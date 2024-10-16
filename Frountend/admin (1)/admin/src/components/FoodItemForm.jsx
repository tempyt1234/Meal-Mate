import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './FoodItemForm.css'; // Import the CSS file

const FoodItemForm = ({ itemToEdit, onSave, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [quantity, setQuantity] = useState(''); // Keep quantity as string
  const [unit, setUnit] = useState('select');  // Default value for unit
  const [errors, setErrors] = useState({});    // State for validation errors

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setDescription(itemToEdit.description);
      setCategory(itemToEdit.category);
      setImage(itemToEdit.image);

      // Extract quantity and unit
      const [itemQuantity, itemUnit] = itemToEdit.quantity.split(' '); 
      setQuantity(itemQuantity || ''); // Set quantity (default to empty string if undefined)
      setUnit(itemUnit || 'select');   // Set unit (default to 'select' if undefined)
    }
  }, [itemToEdit]);

  const validateForm = () => {
    const newErrors = {};

    // Name validation: Should not start with a number, allow alphanumeric, spaces, and parentheses
    const nameRegex = /^[a-zA-Z][a-zA-Z0-9\s()]*$/;
    if (!name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (name.length < 2 || name.length > 50) {
      newErrors.name = 'Name must be between 2 and 50 characters.';
    } else if (!nameRegex.test(name)) {
      newErrors.name = 'Name must start with a letter and can contain letters, numbers, spaces, and parentheses.';
    }

    // Description validation
    if (!description.trim()) {
      newErrors.description = 'Description is required.';
    } else if (description.length < 10 || description.length > 200) {
      newErrors.description = 'Description must be between 10 and 200 characters.';
    }

    // Category validation
    if (!category.trim()) {
      newErrors.category = 'Category is required.';
    } else if (category.length < 2 || category.length > 50) {
      newErrors.category = 'Category must be between 2 and 50 characters.';
    }

    // Quantity validation
    if (!quantity.trim()) {
      newErrors.quantity = 'Quantity is required.';
    } else if (isNaN(quantity) || Number(quantity) <= 0) {
      newErrors.quantity = 'Quantity must be a positive number.';
    }

    // Unit validation
    if (unit === 'select') {
      newErrors.unit = 'Please select a valid unit.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;  // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newItem = {
      foodItemId: itemToEdit ? itemToEdit.foodItemId : `MealMate_${Date.now()}`,
      name,
      description,
      category,
      image,
      quantity: `${quantity} ${unit}`, // Concatenate quantity with unit
    };
    onSave(newItem);
    // Reset the form fields
    setName('');
    setDescription('');
    setCategory('');
    setImage('');
    setQuantity(''); // Keep quantity as string
    setUnit('select');  // Reset unit to default
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Name: <span style={{ color: 'red' }}>*</span></Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            isInvalid={!!errors.name} // Apply invalid styling if there's an error
          />
          <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Description: <span style={{ color: 'red' }}>*</span></Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            isInvalid={!!errors.description} // Apply invalid styling if there's an error
          />
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Category: <span style={{ color: 'red' }}>*</span></Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            isInvalid={!!errors.category} // Apply invalid styling if there's an error
          />
          <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Image URL:</Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">Quantity: <span style={{ color: 'red' }}>*</span></Form.Label>
        <Col sm="4">
          <Form.Control
            type="text" // Change to text to allow string handling
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)} // Ensure this updates the state correctly
            isInvalid={!!errors.quantity} // Apply invalid styling if there's an error
          />
          <Form.Control.Feedback type="invalid">{errors.quantity}</Form.Control.Feedback>
        </Col>
        <Col sm="6">
          <Form.Control
            as="select"
            value={unit}
            onChange={(e) => setUnit(e.target.value)} // Ensure this updates the state correctly
            isInvalid={!!errors.unit} // Apply invalid styling if there's an error
          >
            <option value="select">Select units</option>
            <option value="grams">grams</option>
            <option value="pieces">pieces</option>
            <option value="ml">ml</option>
            <option value="kg">kg</option>
            <option value="liters">liters</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">{errors.unit}</Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm="10">
          <Button type="submit" variant="primary">
            {itemToEdit ? 'Save Changes' : 'Add Food Item'}
          </Button>
          <Button variant="secondary" onClick={onClose} className="ms-2">Cancel</Button>
        </Col>
      </Form.Group>
    </Form>
  );
};

export default FoodItemForm;
