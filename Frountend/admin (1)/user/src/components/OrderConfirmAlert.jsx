import React from 'react';
import Swal from 'sweetalert2';
// import '../components/OrderConfirmAlert.css';

export const showAlert = (title) => {
  Swal.fire({
    title: title || 'YOUR ORDER GOT CONFIRMED',
    html: '<div class="ribbon-container"><div class="ribbon-blast"></div></div>',
    icon: 'success',
    confirmButtonText: 'OK',
    customClass: {
      popup: 'animated-popup',
      confirmButton: 'confirm-button'
    },
    willClose: () => {
      // Handle what happens after closing the alert
    }
  });
};

const OrderConfirmAlert = () => {
  return (
    <div>
      <button className="error-btn" onClick={() => showAlert('YOUR ORDER GOT CONFIRMED')}>
        Confirm Order
      </button>
    </div>
  );
};

export default OrderConfirmAlert;