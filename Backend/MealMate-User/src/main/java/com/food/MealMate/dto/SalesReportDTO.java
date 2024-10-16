package com.food.MealMate.dto;

import java.util.Date;

public class SalesReportDTO {
	 private String paymentId;
	    private String emailId;
	    private Double amount;
	    private Date dateOfPayment;
	    private String refundStatus;
	    private String dietType;

	    // Constructors
	    public SalesReportDTO(String paymentId, String emailId, Double amount, Date dateOfPayment, String refundStatus, String dietType) {
	        this.paymentId = paymentId;
	        this.emailId = emailId;
	        this.amount = amount;
	        this.dateOfPayment = dateOfPayment;
	        this.refundStatus = refundStatus;
	        this.dietType = dietType;
	    }

		public String getPaymentId() {
			return paymentId;
		}

		public void setPaymentId(String paymentId) {
			this.paymentId = paymentId;
		}

		public String getEmailId() {
			return emailId;
		}

		public void setEmailId(String emailId) {
			this.emailId = emailId;
		}

		public Double getAmount() {
			return amount;
		}

		public void setAmount(Double amount) {
			this.amount = amount;
		}

		public Date getDateOfPayment() {
			return dateOfPayment;
		}

		public void setDateOfPayment(Date dateOfPayment) {
			this.dateOfPayment = dateOfPayment;
		}

		public String getRefundStatus() {
			return refundStatus;
		}

		public void setRefundStatus(String refundStatus) {
			this.refundStatus = refundStatus;
		}

		public String getDietType() {
			return dietType;
		}

		public void setDietType(String dietType) {
			this.dietType = dietType;
		}

		public SalesReportDTO() {
			super();
		}

		@Override
		public String toString() {
			return "SalesReportDTO [paymentId=" + paymentId + ", emailId=" + emailId + ", amount=" + amount
					+ ", dateOfPayment=" + dateOfPayment + ", refundStatus=" + refundStatus + ", dietType=" + dietType
					+ ", getPaymentId()=" + getPaymentId() + ", getEmailId()=" + getEmailId() + ", getAmount()="
					+ getAmount() + ", getDateOfPayment()=" + getDateOfPayment() + ", getRefundStatus()="
					+ getRefundStatus() + ", getDietType()=" + getDietType() + ", getClass()=" + getClass()
					+ ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
		}
	    

}
