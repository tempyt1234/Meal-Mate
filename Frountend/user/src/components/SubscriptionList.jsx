import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './SubscriptionList.css'; // Ensure correct path for your CSS file
import { showCancelAlert } from './OrderCancelationAlert';
import { showAlert } from './OrderConfirmAlert';

const SubscriptionList = () => {
  const location = useLocation();
  const { userId } = location.state;
  const [subscriptions, setSubscriptions] = useState([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([]);
  const [filter, setFilter] = useState('all'); // New state for filter

  useEffect(() => {
    axios.get(`http://localhost:9090/mealmate-user/getSubscriptionByUserId/${userId}`)
      .then(response => {
        setSubscriptions(response.data);
        setFilteredSubscriptions(response.data); // Set initial filtered subscriptions
      })
      .catch(error => {
        console.error('There was an error fetching the subscriptions!', error);
      });
  }, [userId]);

  useEffect(() => {
    filterSubscriptions();
  }, [filter, subscriptions]); // Update filtered subscriptions whenever filter or subscriptions change

  const filterSubscriptions = () => {
    const now = new Date();
    let filtered = subscriptions;

    if (filter === 'current') {
      filtered = subscriptions.filter(subscription => new Date(subscription.endDate) >= now);
    } else if (filter === 'expired') {
      filtered = subscriptions.filter(subscription => new Date(subscription.endDate) < now);
    }

    setFilteredSubscriptions(filtered);
  };

  const handleDelete = (subscriptionId) => {
    // showCancelAlert("Are you sure you want to cancel the order")
    axios.delete(`http://localhost:9090/mealmate-user/deletesubscriptionById/${subscriptionId}`)
      .then(response => {
        const updatedSubscriptions = subscriptions.filter(sub => sub.subscriptionId !== subscriptionId);
        setSubscriptions(updatedSubscriptions);
        showAlert("Order canceled successfully,Refunds will be credited to your original payment method.")
        setFilteredSubscriptions(updatedSubscriptions); // Update filtered subscriptions
      })
      .catch(error => {
        console.error('There was an error deleting the subscription!', error);
      });
  };

  const isActiveSubscription = (startDate, endDate) => {
    const now = new Date();
    return new Date(startDate) <= now && now <= new Date(endDate);
  };

  return (
    <div className="subscription-list-container"> {/* Updated class name */}
      <h1 className="subscription-list-title">Subscriptions</h1> {/* New title style */}

      {/* Filter buttons */}
      <div className="filter-buttons" >
        <Button variant={filter === 'all' ? 'primary' : 'secondary'} onClick={() => setFilter('all')}style={{marginLeft:'2rem'}}>All </Button>
        <Button variant={filter === 'current' ? 'primary' : 'secondary'} onClick={() => setFilter('current')}style={{marginLeft:'2rem'}}>Current </Button>
        <Button variant={filter === 'expired' ? 'primary' : 'secondary'} onClick={() => setFilter('expired')}style={{marginLeft:'2rem'}}>Expired </Button>
      </div>

      <div className="card-container"> {/* Flex container for cards */}
        {filteredSubscriptions.length > 0 ? (
          filteredSubscriptions.map(subscription => (
            <Card key={subscription.subscriptionId} className="subscription-card"> {/* Updated card class */}
              <Card.Body>
                <Card.Title>{subscription.dietType}</Card.Title>
                <Card.Text>
                  Meal Plan ID: {subscription.mealPlanId} <br />
                  Start Date: {new Date(subscription.startDate).toLocaleDateString()} <br />
                  End Date: {new Date(subscription.endDate).toLocaleDateString()} <br />
                  Price:{subscription.price}/- <br />
                </Card.Text>
                {isActiveSubscription(subscription.startDate, subscription.endDate) && (
                  <Button variant="danger" style={{ backgroundColor: '#8B0000', color: 'white' }} onClick={() => handleDelete(subscription.subscriptionId)}>Cancel</Button>
                )}
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className="message">No subscriptions found.</p> /* Updated message style */
        )}
      </div>
    </div>
  );
};

export default SubscriptionList;
