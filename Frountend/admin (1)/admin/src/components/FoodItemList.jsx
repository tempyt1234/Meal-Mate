import React from 'react';
import { Card, Button, Image, ListGroup, Row, Col } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import './FoodItemList.css'; // Import the updated CSS file

const FoodItemList = ({ foodItems, onEdit, onDelete }) => {
  return (
    <div className="food-item-list-container">
    
    <ListGroup>
      {foodItems.map(item => (
        <ListGroup.Item key={item.foodItemId} className="mb-3">
          <Card className="food-item-card">
            <Row className="align-items-center">
              <Col md={2}>
                <Image src={item.image} alt={item.name} fluid />
              </Col>
              <Col md={8}>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    {item.description} <br />
                    <strong>Category:</strong> {item.category} <br />
                    <strong>Quantity:</strong> {item.quantity}
                  </Card.Text>
                </Card.Body>
              </Col>
              <Col md={2} className="text-right">
                <Button
                  variant="warning"
                  className="mr-2"
                  onClick={() => onEdit(item)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => onDelete(item.foodItemId)}
                >
                  <RiDeleteBin6Line />
                </Button>
              </Col>
            </Row>
          </Card>
        </ListGroup.Item>
      ))}
    </ListGroup>
  </div>
  
  );
};

export default FoodItemList;
