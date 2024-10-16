import React from 'react';
import Swal from 'sweetalert2';


export const showCancelAlert = (title) => {
  Swal.fire({
    title: title || 'YOUR ORDER HAS BEEN CANCELED',
    html: '<div class="ribbon-container"><div class="ribbon-blast"></div></div>',
    icon: 'error', // Changed to 'error' to show cross mark
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

const OrderCancelationAlert = () => {
  return (
    <div>
      <button className="cancel-btn" onClick={() => showCancelAlert('YOUR ORDER HAS BEEN CANCELED')}>
        Cancel Order
      </button>
    </div>
  );
};

export default OrderCancelationAlert;