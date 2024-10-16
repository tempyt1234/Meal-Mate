package com.quad.mealmate.admin.entities;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class SubscriptionEntity {
	
	@Id
	private String subscriptionId;
	
	private String mealPlanId;
	private String dietType;
	private Date startDate;
	private Date endDate;
	private Double price;
	
	@ManyToOne
	private UserEntity user;
	
	public SubscriptionEntity() {
		super();
	}
	
	public SubscriptionEntity(String subscriptionId, String mealPlanId, String dietType, Date startDate, Date endDate,
			Double price, UserEntity user) {
		super();
		this.subscriptionId = subscriptionId;
		this.mealPlanId = mealPlanId;
		this.dietType = dietType;
		this.startDate = startDate;
		this.endDate = endDate;
		this.price = price;
		this.user = user;
	}
	public UserEntity getUser() {
		return user;
	}
	public void setUser(UserEntity user) {
		this.user = user;
	}
	public String getSubscriptionId() {
		return subscriptionId;
	}
	public void setSubscriptionId(String subscriptionId) {
		this.subscriptionId = subscriptionId;
	}
	public String getMealPlanId() {
		return mealPlanId;
	}
	public void setMealPlanId(String mealPlanId) {
		this.mealPlanId = mealPlanId;
	}
	public String getDietType() {
		return dietType;
	}
	public void setDietType(String dietType) {
		this.dietType = dietType;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	@Override
	public String toString() {
		return "SubscriptionEntity [subscriptionId=" + subscriptionId + ", mealPlanId=" + mealPlanId + ", dietType="
				+ dietType + ", startDate=" + startDate + ", endDate=" + endDate + ", price=" + price + ", user=" + user
				+ ", getUser()=" + getUser() + ", getSubscriptionId()=" + getSubscriptionId() + ", getMealPlanId()="
				+ getMealPlanId() + ", getDietType()=" + getDietType() + ", getStartDate()=" + getStartDate()
				+ ", getEndDate()=" + getEndDate() + ", getPrice()=" + getPrice() + ", getClass()=" + getClass()
				+ ", hashCode()=" + hashCode() + ", toString()=" + super.toString() + "]";
	}
	
	
	
}





















