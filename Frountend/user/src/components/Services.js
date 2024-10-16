import React from 'react';
import './Services.css'; // Import the CSS file for styling

function Services() {
  return (
    <div className="text-center">
      <h2 className="services-heading">Our Exceptional Food Services</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Gourmet Meals</h5>
              <p className="card-text">
                Indulge in our gourmet meals, expertly crafted by top chefs using the finest ingredients. Whether you’re looking for a romantic dinner or a lavish celebration, our gourmet dishes promise a culinary experience like no other. Each meal is designed to delight your taste buds and elevate your dining experience.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Healthy Options</h5>
              <p className="card-text">
                Maintain a balanced diet without sacrificing flavor with our healthy meal options. We offer a variety of dishes that are rich in nutrients, low in calories, and crafted to support a healthy lifestyle. From hearty salads to wholesome bowls, our healthy options are perfect for everyday dining and wellness.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Custom Catering</h5>
              <p className="card-text">
                Elevate your events with our custom catering services. Whether you're hosting a corporate event, wedding, or private party, our team will work with you to create a personalized menu that reflects your vision and meets your guests' preferences. From elegant hors d'oeuvres to grand buffets, we ensure a memorable dining experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
