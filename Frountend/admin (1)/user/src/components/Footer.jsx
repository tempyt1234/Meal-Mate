import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaApple, FaGooglePlay } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#3aafa9', padding: '2rem', color: '#000',borderBottomLeftRadius:'1em',borderBottomRightRadius:'1em' }}>
      <Container>
        <Row>
          {/* About Us */}
          <Col md={3}>
            <h4>About Us</h4>
            <p>We are a leading food delivery service, bringing your favorite meals right to your doorstep.</p>
          </Col>

          {/* Contact Us */}
          <Col md={3}>
            <h4>Contact Us</h4>
            <p>Email:mealmate@gmail.com</p>
            <p>Phone: +91 8688174609</p>
            <p>Address: Doddathogur Village, Begur Hobli, Electronic City, Bengaluru, Karnataka 560100 </p>
          </Col>

          {/* Social Media Links */}
          <Col md={3}>
            <h4>Follow Us</h4>
            <p>
              <a href="https://www.facebook.com" style={{ color: '#000', marginRight: '10px' }}><FaFacebook size={24} /></a>
              <a href="https://www.twitter.com" style={{ color: '#000', marginRight: '10px' }}><FaTwitter size={24} /></a>
              <a href="https://www.instagram.com" style={{ color: '#000' }}><FaInstagram size={24} /></a>
            </p>
          </Col>

          {/* Download Our App */}
          <Col md={3}>
            <h4>Download Our App</h4>
            <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
            <Button variant="black" style={{ marginRight: '10px' }}>
              <FaApple size={24} /> App Store
            </Button>
            </a>
            <a href="https://play.google.com/store/games?device=windows&pli=1" target="_blank" rel="noopener noreferrer">
            <Button variant="black">
              <FaGooglePlay size={24} /> Google Play
            </Button>
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
