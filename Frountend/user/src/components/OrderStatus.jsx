import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './OrderStatus.css';
import { useNavigate } from 'react-router-dom';

const OrderStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subscriptionData } = location.state || {};
  const [userId, setuserId] = useState(subscriptionData.userId);
  const [currentStep, setCurrentStep] = useState('');
  const [orderTimes, setOrderTimes] = useState({
    orderPlacedTime: new Date(subscriptionData.startDate),
    inKitchenTime: null,
    onTheWayTime: null,
    deliveredTime: null,
  });

  useEffect(() => {
    const startDate = new Date(subscriptionData.startDate);
    // Packed: Next day at 11 AM
    const inKitchenTime = new Date(startDate);
    inKitchenTime.setDate(startDate.getDate() + 1);
    inKitchenTime.setHours(11, 0, 0, 0); // 11:00 AM
    // In Transit: 1 hour after Packed
    const onTheWayTime = new Date(inKitchenTime);
    onTheWayTime.setHours(onTheWayTime.getHours() + 1);
    // Delivered: 1 hour after In Transit
    const deliveredTime = new Date(onTheWayTime);
    deliveredTime.setHours(deliveredTime.getHours() + 1);
    // Set calculated times in state
    setOrderTimes({
      orderPlacedTime: startDate,
      inKitchenTime,
      onTheWayTime,
      deliveredTime,
    });
    // Determine current step based on the current time
    const now = new Date();
    if (now >= deliveredTime) {
      setCurrentStep('delivered');
    } else if (now >= onTheWayTime) {
      setCurrentStep('onTheWay');
    } else if (now >= inKitchenTime) {
      setCurrentStep('inKitchen');
    } else {
      setCurrentStep('orderPlaced');
    }
  }, [subscriptionData.startDate]);

  const handleViewOrder = () => {
    navigate('/subscriptions', { state: { userId } });
  };

  return (
    <div className="order-status-container">
      {/* Header */}
      <header className="order-status-header">
        <h1 className="order-status-title">Order Status</h1>
        <p className="order-status-subtitle">Track your delivery in real-time</p>
      </header>
      {/* Order Steps */}
      <div className="order-steps-horizontal">
        {/* Order Placed */}
        <div className={`order-step ${currentStep !== '' ? 'completed' : ''} ${currentStep === 'orderPlaced'|| currentStep === 'inKitchen' || currentStep === 'onTheWay' || currentStep === 'delivered' ? 'active' : ''}`}>
          <div className="step-icon">✔️</div>
          <div className="step-info">
            <h2>Ordered</h2>
            {/* <p>{orderTimes.orderPlacedTime.toLocaleString()}</p> */}
          </div>
        </div>
        {/* Packed */}
        <div className={`order-step ${currentStep === 'inKitchen' || currentStep === 'onTheWay' || currentStep === 'delivered' ? 'active' : ''}`}>
          <div className="step-icon">🍳</div>
          <div className="step-info">
            <h2>In Kitchen</h2>
            <p>{orderTimes.inKitchenTime?.toLocaleString()}</p>
          </div>
        </div>
        {/* In Transit */}
        <div className={`order-step ${currentStep === 'onTheWay' || currentStep === 'delivered' ? 'active' : ''}`}>
          <div className="step-icon">🚚</div>
          <div className="step-info">
            <h2>In Transit</h2>
            <p>{orderTimes.onTheWayTime?.toLocaleString()}</p>
          </div>
        </div>
        {/* Delivered */}
        <div className={`order-step ${currentStep === 'delivered' ? 'active' : ''}`}>
          <div className="step-icon">🏡</div>
          <div className="step-info">
            <h2>Delivered</h2>
            <p>{orderTimes.deliveredTime?.toLocaleString()}</p>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="order-actions">
      <button className="view-order-btn" onClick={handleViewOrder}>View Orders</button>
        <button className="contact-support-btn">Contact Support</button>
      </div>
    </div>
  );
};

export default OrderStatus;
