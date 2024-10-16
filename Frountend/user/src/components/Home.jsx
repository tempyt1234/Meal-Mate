import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { FaAppleAlt, FaLeaf, FaShippingFast } from 'react-icons/fa';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  
  
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [animationStage, setAnimationStage] = useState('typing');
  const [quoteLines, setQuoteLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const quoteRef = useRef(null);
  const navigate = useNavigate();

  const quotes = [
    "Good food is the foundation of genuine happiness.",
    "Eating healthy doesn't have to be boring. Let your meals be your medicine.",
    "Food is not just fuel, it's information. It talks to your DNA and tells it what to do."
  ];

  useEffect(() => {
    setQuoteLines(quotes[currentQuoteIndex].split('. '));
    setCurrentLineIndex(0);
    setAnimationStage('typing');
  }, [currentQuoteIndex]);
  useEffect(() => {
    if (quoteLines.length === 0 || !quoteRef.current) return; // Check if ref exists
  
    const typingDuration = 3000;
    const erasingDuration = 1000;
    const delayBetweenLines = 1000;
  
    const typeLine = (lineIndex) => {
      setAnimationStage('typing');
      
      if (quoteRef.current) {  // Check if ref is available before applying style
        quoteRef.current.style.animation = `typing ${typingDuration}ms steps(40, end), blink-caret 0.75s step-end infinite`;
        quoteRef.current.textContent = quoteLines[lineIndex] + (lineIndex === quoteLines.length - 1 ? '' : '.');
      }
  
      setTimeout(() => {
        setAnimationStage('erasing');
        if (quoteRef.current) {
          quoteRef.current.style.animation = `erasing ${erasingDuration}ms steps(40, end)`;
        }
  
        setTimeout(() => {
          setAnimationStage('waiting');
          setTimeout(() => {
            setCurrentLineIndex((prevIndex) => (prevIndex + 1) % quoteLines.length);
          }, delayBetweenLines);
        }, erasingDuration);
      }, typingDuration);
    };
  
    typeLine(currentLineIndex);
  }, [quoteLines, currentLineIndex]);
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); // Change quote every 5 seconds
    return () => clearInterval(intervalId);
  }, [quotes.length]);

  
  
    const handleOrderNow = () => {
      navigate('/mealplan'); // Navigate to the "Order" component
    };

  return (
    <div>
      
        {/* Quote Section */}
        <div className="quote-section" style={{
    backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/020/115/455/non_2x/food-background-breakfast-with-yogurt-granola-or-muesli-strawberries-banner-image-for-website-photo.jpg")',
    backgroundSize: 'cover', // This makes the image cover the entire div
    backgroundRepeat: 'no-repeat', // This prevents the image from repeating
    backgroundPosition: 'center', // This centers the image within the div
    paddingBottom:'',
    margin:'0.05em'
}}>          <h2 ref={quoteRef} className={`quote-text ${animationStage}`} />
        </div>
      <div className="carousel-wrapper cardF">
        <Carousel controls={false} indicators={false} fade={true} interval={4000} pause={false}>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
              alt="Gourmet Salad"
            />
            <Carousel.Caption className="carousel-caption-custom">
              <h3><FaAppleAlt /> Fresh and Gourmet Salads</h3>
              <p>Indulge in a variety of fresh, gourmet salads made from the finest organic ingredients.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="https://media.istockphoto.com/id/487000086/photo/indian-meal.jpg?s=612x612&w=0&k=20&c=MPOT65BLOI0_vKxlvjuIPntfnvcMMnI9Y67u44-XpdI="
              alt="Healthy Lunch Box"
            />
            <Carousel.Caption className="carousel-caption-custom">
              <h3><FaLeaf /> Customizable Lunch Boxes</h3>
              <p>Build your perfect lunch box from a range of healthy and delicious options tailored to your needs.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="https://media.istockphoto.com/id/588595864/photo/steaming-mixed-vegetables-in-the-wok-asian-style-cooking.jpg?s=612x612&w=0&k=20&c=NZWe4QUwFmEqPAwHa3s0u3Zak6JjlRm36gMgmXx8roA="
              alt="Meal Delivery"
            />
            <Carousel.Caption className="carousel-caption-custom">
              <h3><FaShippingFast /> Fast and Reliable Delivery</h3>
              <p>Experience prompt delivery service that ensures your meals arrive fresh and on time, every time.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        {/* Floating Order Now Button */}
        <div className="floating-order-now-button">
        <Button style={{ backgroundColor: '#17252a', color: '#fff', boxShadow: '0px 0px 2px lightblue' }} onClick={handleOrderNow}>
      Order Now
    </Button>

        </div>

      

        {/* Description below the carousel */}
        <div className="card" style={{ padding: '2em' ,backgroundColor:'rgb(80,133,165,0.08)',color:'#000'}}>
          <h2>Welcome to MEALMATE</h2>
          <p>
            At MEALMATE, we are passionate about providing you with healthy, delicious meals that seamlessly fit into your busy lifestyle. Whether you're looking to customize your lunch box with your favorite ingredients, enjoy a fresh gourmet salad, or have nutritious meals delivered directly to your doorstep, we've got you covered. Our diverse menu is designed to cater to all your dietary needs and preferences, ensuring that you never have to compromise on taste or health.
          </p>
          <p>
            Our mission is to make healthy eating easy, enjoyable, and accessible for everyone. We believe that nutritious food should not only be good for your body but also delight your taste buds. Explore our wide range of meal options, from hearty breakfasts to satisfying dinners, and experience the convenience and quality that MEALMATE has to offer. Join us on a journey towards a healthier, happier you, one meal at a time.
          </p>
        </div>
      </div>

      <Container fluid className="home-container">
        <Row className="justify-content-center">
          <Col xs={12} md={4}>
            <Card className="mb-3">
              <Card.Img variant="top" src="https://media.istockphoto.com/id/1343834564/photo/human-hand-placing-cube-with-food-clothing-housing-medicine-four-basic-human-needs-concept.jpg?s=612x612&w=0&k=20&c=c_htD6X8O4EqB5f0yxVdBKR-KL3CHFPvy2RjS9-FWJQ=" alt="Personalized Plans" />
              <Card.Body>
                <Card.Title>Personalized Plans</Card.Title>
                <Card.Text>
                  MEALMATE is a personalized meal subscription service tailored to individual dietary preferences and nutritional needs. With a diverse selection of meals, users can easily customize weekly plans to suit their tastes. Our service ensures that every meal is fresh, healthy, and perfectly portioned. MEALMATE brings convenience and variety straight to your table, making healthy eating simple and enjoyable.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="mb-3">
              <Card.Img variant="top" src="https://media.istockphoto.com/id/2160305301/photo/man-helping-girl-wash-vegetables-at-kitchen-sink.jpg?s=612x612&w=0&k=20&c=1ftgkLE2YjFQiSbYZ2xKHDc7TuDS-9kuhvkCxK3j5iU=" />
              <Card.Body>
                <Card.Title>Hygienic Food Preparation</Card.Title>
                <Card.Text>
                  At MEALMATE, we prioritize the highest standards of hygiene in food preparation, ensuring every meal is clean, safe, and healthy. Our kitchens follow strict sanitation protocols, from ingredient sourcing to packaging. We maintain a controlled environment to guarantee the freshness and purity of each dish. MEALMATE delivers meals you can trust, with quality and safety at the forefront.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="mb-3">
              <Card.Img variant="top" src="https://media.istockphoto.com/id/1287632111/photo/weve-got-you-covered-during-lockdown.jpg?s=612x612&w=0&k=20&c=7tP1pfzLUEWHnDv-Sb8Gc_4NepfpUV5aG_Z4P_3DJ80=" alt="Convenient Delivery" />
              <Card.Body>
                <Card.Title>Convenient Delivery</Card.Title>
                <Card.Text>
                  MEALMATE ensures convenient delivery of freshly prepared, personalized meals right to your doorstep. Our reliable service lets you enjoy healthy, delicious meals without the hassle of cooking or shopping. With flexible delivery options, you can easily fit meal plans into your schedule. MEALMATE makes healthy eating effortless with convenient and timely deliveries.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
