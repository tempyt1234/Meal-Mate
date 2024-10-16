import React from 'react';
import './About.css'; // Import custom CSS for additional styling
import about1 from '../images/about1.jpg'; // Import images
import about2 from '../images/about2.jpg'; 
import about3 from '../images/about3.jpg'; 

function About() {
  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="animate-title">About Us</h2>
        <p className="lead">
          Delivering healthy, customized lunch boxes right to your doorstep. Fresh ingredients, made with love.
        </p>
      </div>

      <div className="row">
        {/* Card 1 */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 about-card animate-card">
            <img src={about1} className="card-img-top" alt="Fresh Ingredients" />
            <div className="card-body">
              <h5 className="card-title">Fresh Ingredients</h5>
              <p className="card-text">
                We use locally sourced, fresh ingredients to prepare our meals, ensuring you get the best nutrition.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 about-card animate-card">
            <img src={about2} className="card-img-top" alt="Customizable Meals" />
            <div className="card-body">
              <h5 className="card-title">Customizable Meals</h5>
              <p className="card-text">
                You choose what goes in your lunch box. Customize your meal plan to fit your taste and dietary needs.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 about-card animate-card">
            <img src={about3} className="card-img-top" alt="Timely Delivery" />
            <div className="card-body">
              <h5 className="card-title">Timely Delivery</h5>
              <p className="card-text">
                We ensure your lunch is delivered on time, every time, so you can enjoy your meal without hassle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
