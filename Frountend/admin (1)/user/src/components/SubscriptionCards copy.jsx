import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function SubscriptionCards() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [selectedSubscription, setSelectedSubscription] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3002/subscription')
            .then(response => setSubscriptions(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSelect = (subscription) => {
        setSelectedSubscription(subscription);
    };

    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {subscriptions.length > 0 ? (
                    subscriptions.map(subscription => (
                        <Card key={subscription.subscriptionid} style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{subscription.diettype}</Card.Title>
                                <Card.Text>
                                    Subscription ID: {subscription.subscriptionid} <br />
                                    Meal ID: {subscription.mealid} <br />
                                    Start Date: {new Date(subscription.startdate).toLocaleDateString()} <br />
                                    End Date: {new Date(subscription.enddate).toLocaleDateString()} <br />
                                    Price: ${subscription.price} <br />
                                    Diet Type: {subscription.diettype}
                                </Card.Text>
                                <Button 
                                    variant="primary" 
                                    onClick={() => handleSelect(subscription)}
                                >
                                    Select Plan
                                </Button>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            {selectedSubscription && (
                <div style={{ marginTop: '2rem' }}>
                    <h2>Selected Plan:</h2>
                    <Card key={selectedSubscription.subscriptionid} style={{ width: '18rem', marginBottom: '1rem' }}>
                        <Card.Body>
                            <Card.Title>{selectedSubscription.diettype}</Card.Title>
                            <Card.Text>
                                Subscription ID: {selectedSubscription.subscriptionid} <br />
                                Meal ID: {selectedSubscription.mealid} <br />
                                Start Date: {new Date(selectedSubscription.startdate).toLocaleDateString()} <br />
                                End Date: {new Date(selectedSubscription.enddate).toLocaleDateString()} <br />
                                Price: ${selectedSubscription.price} <br />
                                Diet Type: {selectedSubscription.diettype}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default SubscriptionCards;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import ListGroup from 'react-bootstrap/ListGroup';
// import './MealPlanComponent.css'; // Optional: For custom styles

// const MealPlanComponent = () => {
//   const [mealPlans, setMealPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedMeals, setSelectedMeals] = useState([]); // State to store selected meals

//   useEffect(() => {
//     axios.get('http://localhost:3001/meals')
//       .then(response => {
//         setMealPlans(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching the meal plan data:', error);
//         setError('Failed to load meal plans.');
//         setLoading(false);
//       });
//   }, []);

//   const handleSelectMeal = (mealPlan, meal) => {
//     setSelectedMeals([...selectedMeals, { mealPlanId: mealPlan.mealplanid, meal }]);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <Container>
//       {mealPlans.map((mealPlan) => (
//         <div className="mb-5" key={mealPlan.mealplanid}>
//           <h1>Meal Plan ID: {mealPlan.mealplanid}</h1>
//           <h2 className="text-muted">Diet Type: {mealPlan.diettype}</h2>
//           <h2 className="text-muted">Plan Price: ${mealPlan.planprice.toFixed(2)}</h2>
//           <h3 className="mt-4">Meals:</h3>
//           <Row>
//             {mealPlan.meals.map((meal) => (
//               <Col md={6} lg={4} className="mb-4" key={meal.mealid}>
//                 <Card>
//                   <Card.Body>
//                     <Card.Title>Meal ID: {meal.mealid}</Card.Title>
//                     <Card.Subtitle className="mb-2 text-muted">Meal Price: ${meal.mealprice.toFixed(2)}</Card.Subtitle>
//                     <ListGroup className="list-group-flush">
//                       {meal.fooditems.map((item) => (
//                         <ListGroup.Item key={item.foodid}>
//                           <h5>{item.name}</h5>
//                           <p>{item.description}</p>
//                           <img src={item.image} alt={item.name} className="img-fluid" />
//                           <p>Quantity: {item.quantity}</p>
//                           <p>Category: {item.category}</p>
//                         </ListGroup.Item>
//                       ))}
//                     </ListGroup>
//                   </Card.Body>
//                   <Card.Footer>
//                     <Button variant="primary" onClick={() => handleSelectMeal(mealPlan, meal)}>Select Meal</Button>
//                   </Card.Footer>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         </div>
//       ))}

//       {/* Display selected meals */}
//       {selectedMeals.length > 0 && (
//         <div className="mt-5">
//           <h2>Selected Meals</h2>
//           <ListGroup>
//             {selectedMeals.map((selected, index) => (
//               <ListGroup.Item key={index}>
//                 <h5>Meal Plan ID: {selected.mealPlanId}</h5>
//                 <p>Meal ID: {selected.meal.mealid}</p>
//                 <p>Meal Price: ${selected.meal.mealprice.toFixed(2)}</p>
//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         </div>
//       )}
//     </Container>
//   );
// };

// export default MealPlanComponent;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Card from 'react-bootstrap/Card';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import ListGroup from 'react-bootstrap/ListGroup';
// import '../components/Mealplan.css'; // Optional: For custom styles

// const MealPlanComponent = () => {
//   const [mealPlans, setMealPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null); // State for selected diet category
//   const [selectedType, setSelectedType] = useState(null); // State for selected diet type

//   useEffect(() => {
//     axios.get('http://localhost:3001/mealplan')
//       .then(response => {
//         setMealPlans(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching the meal plan data:', error);
//         setError('Failed to load meal plans.');
//         setLoading(false);
//       });
//   }, []);

//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     setSelectedType(null); // Reset type selection when category changes
//   };

//   const handleTypeSelect = (type) => {
//     setSelectedType(type);
//   };

//   const filteredMealPlans = mealPlans.filter(mealPlan => {
//     return mealPlan.diettype === `${selectedCategory}-${selectedType}`;
//   });

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <Container>
//       {/* First Division: Category Selection */}
//       <div className="mb-4">
//         <h2>Select Diet Category</h2>
//         <div className="d-flex justify-content-between">
//       <Button 
//         variant="primary" 
//         className="card-button mx-2" 
//         style={{ 
//           backgroundImage: 'url(https://media.istockphoto.com/id/168340083/photo/choosemyplate-healthy-food-and-plate-of-usda-balanced-diet-recommendation.jpg?s=612x612&w=0&k=20&c=S5OYuPg-n1fuOOgReQf9xPuFgA1i-UO54Uj2u1RD7iU=)', 
//         }} 
//         onClick={() => handleCategorySelect('Balanced')}
//       >
//        <span>Balanced</span> 
//       </Button>
//       <Button 
//         variant="primary" 
//         className="card-button mx-2" 
//         style={{ 
//           backgroundImage: 'url(/path-to-your-image-2.jpg)', 
//         }} 
//         onClick={() => handleCategorySelect('Weight Loss')}
//       >
        
//         <span>Weight Loss</span>
//       </Button>
//       <Button 
//         variant="primary" 
//         className="card-button mx-2" 
//         style={{ 
//           backgroundImage: 'url(/path-to-your-image-3.jpg)', 
//         }} 
//         onClick={() => handleCategorySelect('Weight Gain')}
//       >
//         Weight Gain
//       </Button>
//     </div></div>

//       {/* Second Division: Type Selection (only displayed after category is selected) */}
//       {selectedCategory && (
//         <div className="mb-4">
//           <h3>Select Diet Type for {selectedCategory}</h3>
//           <div className="d-flex justify-content-between">
//       <Button 
//         variant="secondary" 
//         className="card-button mx-2" 
//         style={{ 
//           backgroundImage: 'url(/path-to-your-image-veg.jpg)', // Path to your image
//         }} 
//         onClick={() => handleTypeSelect('Veg')}
//       >
//         <span>Vegetarian</span>
//       </Button>
//       <Button 
//         variant="secondary" 
//         className="card-button mx-2" 
//         style={{ 
//           backgroundImage: 'url(/path-to-your-image-non-veg.jpg)', // Path to your image
//         }} 
//         onClick={() => handleTypeSelect('Non-Veg')}
//       >
//         <span>Non-Vegetarian</span>
//       </Button>
//     </div>  </div>
//       )}

//       {/* Display the filtered meal plan */}
//       {selectedCategory && selectedType && filteredMealPlans.length > 0 && (
//         <div>
//           <h3>Meal Plans for {selectedCategory} - {selectedType}</h3>
//           {filteredMealPlans.map((mealPlan) => (
//             <div className="mb-5" key={mealPlan.mealplanid}>
//               <h1>Meal Plan ID: {mealPlan.mealplanid}</h1>
              
//               <h2 className="text-muted">Diet Type: {mealPlan.diettype}</h2>
//               <h2 className="text-muted">Plan Price: ${mealPlan.planprice.toFixed(2)}</h2>
//               <h3 className="mt-4">Meals:</h3>
//               <Row>
//                 {mealPlan.meals.map((meal) => (
//                   <Col md={6} lg={4} className="mb-4" key={meal.mealid}>
//                     <Card>
//                       <Card.Body>
//                         <Card.Title>Meal ID: {meal.mealid}</Card.Title>
//                         <Card.Title>Day: {meal.dayoftheweek}</Card.Title>

//                         <Card.Subtitle className="mb-2 text-muted">Meal Price: ${meal.mealprice.toFixed(2)}</Card.Subtitle>
//                         <ListGroup className="list-group-flush">
//                           {meal.fooditems.map((item) => (
//                             <ListGroup.Item key={item.foodid}>
//                               <h5>{item.name}</h5>
//                               <p>{item.description}</p>
//                               <img src={item.image} alt={item.name} className="img-fluid" />
//                               <p>Quantity: {item.quantity}</p>
//                               <p>Category: {item.category}</p>
//                             </ListGroup.Item>
//                           ))}
//                         </ListGroup>
//                       </Card.Body>
//                       <Card.Footer>
//                         <Button variant="primary">Select Meal</Button>
//                       </Card.Footer>
//                     </Card>
//                   </Col>
//                 ))}
//               </Row>
//             </div>
//           ))}
//         </div>
//       )}
//     </Container>
//   );
// };

// export default MealPlanComponent;