import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function SubscriptionCards() {
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8090/subscription') 
            .then(response => response.json())
            .then(data => setSubscriptions(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {subscriptions.length > 0 ? (
                subscriptions.map(subscription => (
                    <Card key={subscription.subscriptionid} style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="" />
                        <Card.Body>
                            <Card.Title>{subscription.diettype}</Card.Title>
                            <Card.Text>
                                Meal ID: {subscription.mealid} <br />
                                Start Date: {new Date(subscription.startdate).toLocaleDateString()} <br />
                                End Date: {new Date(subscription.enddate).toLocaleDateString()} <br />
                                Price: ${subscription.price}
                            </Card.Text>
                            <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default SubscriptionCards;
