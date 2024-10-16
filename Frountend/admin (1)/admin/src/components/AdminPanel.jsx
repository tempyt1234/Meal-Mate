import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Modal, Pagination, Form } from 'react-bootstrap';
import './AdminPanel.css';  // Import the CSS file
import FoodItemList from './FoodItemList';
import FoodItemForm from './FoodItemForm';
import { toast } from 'react-toastify';

const AdminPanel = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Category Filter state
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('http://localhost:9090/mealmate-admin/foodItems');
        setFoodItems(response.data);
      } catch (error) {
        if (error.response && error.response.data) {
          toast.error(error.response.data);
        } else {
          toast.error('Failed to fetch food items.');
        }
      }
    };
    fetchFoodItems();
  }, []);

  const handleSave = async (item) => {
    try {
      const existingItem = foodItems.find(f => f.foodItemId === item.foodItemId);
      if (existingItem) {
        await axios.put(`http://localhost:9090/mealmate-admin/foodItem/${item.foodItemId}`, item);
        setFoodItems(prevItems => prevItems.map(f => (f.foodItemId === item.foodItemId ? item : f)));
        toast.success("Item updated successfully.");
      } else {
        const response = await axios.post('http://localhost:9090/mealmate-admin/foodItem', item);
        setFoodItems(prevItems => [...prevItems, response.data]);
        toast.success("Food item added successfully!");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(`${error.response.data.message || error.response.data}`);
      } else {
        toast.error('Failed to save the item. Please try again.');
      }
    }
    setItemToEdit(null);
    setIsFormVisible(false);
  };

  const handleEdit = (item) => {
    setItemToEdit(item);
    setIsFormVisible(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:9090/mealmate-admin/foodItem/${itemToDelete}/delete`);
      setFoodItems(prevItems => prevItems.filter(f => f.foodItemId !== itemToDelete));
      toast.success('Item deleted successfully.');
    } catch (error) {
      toast.error('Failed to delete item.');
    }
    setShowConfirmModal(false);
  };

  const handleDeleteConfirmation = (foodItemId) => {
    setItemToDelete(foodItemId);
    setShowConfirmModal(true);
  };

  const handleAddNewItem = () => {
    setItemToEdit(null);
    setIsFormVisible(true);
  };

  // Filter and Pagination logic
  const filteredItems = selectedCategory === 'All'
    ? foodItems
    : foodItems.filter(item => item.category === selectedCategory);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const getPaginationItems = () => {
    const maxPageNumbersToShow = 3;
    const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    const paginationItems = [];
    for (let number = startPage; number <= endPage; number++) {
      paginationItems.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
          {number}
        </Pagination.Item>
      );
    }

    return paginationItems;
  };

  return (
   <center>
     <Container className="admin-panel" style={{ padding: '1em' }}>
      <Row className="justify-content-center mb-3">
        <div className='d-flex justify-content-center' style={{ paddingTop: '2.5rem' }}>
          <h2 className="meals-title">Food Menu</h2>
        </div>
        <Col xs="auto">
          <Button onClick={handleAddNewItem} style={{ backgroundColor: '#17252a', color: '#fff' }}>
            Add Food Item
          </Button>
        </Col>
      </Row>

      {/* Category Filter */}
      <Row className="mb-3">
        <Col xs="auto">
          <Form.Group controlId="categoryFilter">
            <Form.Label>Filter by Category</Form.Label>
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1); // Reset to first page when category changes
              }}
            >
              <option value="All">All</option>
              {[...new Set(foodItems.map(item => item.category))].map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <FoodItemList foodItems={currentItems} onEdit={handleEdit} onDelete={handleDeleteConfirmation} />
        </Col>
      </Row>

      {/* Pagination controls */}
      {filteredItems.length > itemsPerPage && (
        <Row>
          <Col>
            <Pagination className='pagination-controls'>
              <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} >Previous</Button>
              <span>{currentPage} / {totalPages}</span>
              <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} >Next</Button>
            </Pagination>
          </Col>
        </Row>
      )}

      {/* Form Modal */}
      <Modal show={isFormVisible} onHide={() => setIsFormVisible(false)} className="admin-custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>{itemToEdit ? 'Editing Food Item' : 'Adding Food Item'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FoodItemForm itemToEdit={itemToEdit} onSave={handleSave} />
        </Modal.Body>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
   </center>
  );
};

export default AdminPanel;
