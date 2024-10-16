package com.quad.mealmate.admin.entities;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class PaymentIdEntity {
	
	@Id
	private String paymentId;
	
	private Integer userId;
	private Double amount;
	private Date dateOfPayment;
	private String cancellation;
	private Double refundableAmount;
	private String refundStatus;
	public PaymentIdEntity() {
		super();
	}
	public String getPaymentId() {
		return paymentId;
	}
	public void setPaymentId(String paymentId) {
		this.paymentId = paymentId;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
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
	public String getCancellation() {
		return cancellation;
	}
	public void setCancellation(String cancellation) {
		this.cancellation = cancellation;
	}
	public Double getRefundableAmount() {
		return refundableAmount;
	}
	public void setRefundableAmount(Double refundableAmount) {
		this.refundableAmount = refundableAmount;
	}
	public String getRefundStatus() {
		return refundStatus;
	}
	public void setRefundStatus(String refundStatus) {
		this.refundStatus = refundStatus;
	}
	public PaymentIdEntity(String paymentId, Integer userId, Double amount, Date dateOfPayment, String cancellation,
			Double refundableAmount, String refundStatus) {
		super();
		this.paymentId = paymentId;
		this.userId = userId;
		this.amount = amount;
		this.dateOfPayment = dateOfPayment;
		this.cancellation = cancellation;
		this.refundableAmount = refundableAmount;
		this.refundStatus = refundStatus;
	}
	@Override
	public String toString() {
		return "PaymentIdEntity [paymentId=" + paymentId + ", userId=" + userId + ", amount=" + amount
				+ ", dateOfPayment=" + dateOfPayment + ", cancellation=" + cancellation + ", refundableAmount="
				+ refundableAmount + ", refundStatus=" + refundStatus + ", getPaymentId()=" + getPaymentId()
				+ ", getUserId()=" + getUserId() + ", getAmount()=" + getAmount() + ", getDateOfPayment()="
				+ getDateOfPayment() + ", getCancellation()=" + getCancellation() + ", getRefundableAmount()="
				+ getRefundableAmount() + ", getRefundStatus()=" + getRefundStatus() + ", getClass()=" + getClass()
				+ ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
	}
	
	

}
