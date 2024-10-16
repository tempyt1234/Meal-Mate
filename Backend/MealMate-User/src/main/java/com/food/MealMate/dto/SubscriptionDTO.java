package com.food.MealMate.dto;

import java.util.Date;

public class SubscriptionDTO {
	
	 private String subscriptionId;
	    private String mealPlanId;
	    private String dietType;
	    private Date startDate;
	    
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

		public SubscriptionDTO() {
			super();
		}

		private Date endDate;
	    private Double price;

	    public SubscriptionDTO(String subscriptionId, String mealPlanId, String dietType, Date startDate, Date endDate, Double price) {
	        this.subscriptionId = subscriptionId;
	        this.mealPlanId = mealPlanId;
	        this.dietType = dietType;
	        this.startDate = startDate;
	        this.endDate = endDate;
	        this.price = price;
	    }

}
