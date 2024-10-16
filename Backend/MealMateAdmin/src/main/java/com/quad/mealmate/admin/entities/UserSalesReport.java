package com.quad.mealmate.admin.entities;

public class UserSalesReport {
	 private String userId;
	    private String userName;
	    private String userEmail;
	    private double totalSales;
	    private String dietType;
	    private String planDuration;
		public UserSalesReport(String userId, String userName, String userEmail, double totalSales, String dietType,
				String planDuration) {
			super();
			this.userId = userId;
			this.userName = userName;
			this.userEmail = userEmail;
			this.totalSales = totalSales;
			this.dietType = dietType;
			this.planDuration = planDuration;
		}
		public UserSalesReport() {
			super();
		}
		@Override
		public String toString() {
			return "UserSalesReport [userId=" + userId + ", userName=" + userName + ", userEmail=" + userEmail
					+ ", totalSales=" + totalSales + ", dietType=" + dietType + ", planDuration=" + planDuration
					+ ", getUserId()=" + getUserId() + ", getUserName()=" + getUserName() + ", getUserEmail()="
					+ getUserEmail() + ", getTotalSales()=" + getTotalSales() + ", getDietType()=" + getDietType()
					+ ", getPlanDuration()=" + getPlanDuration() + ", getClass()=" + getClass() + ", hashCode()="
					+ hashCode() + ", toString()=" + super.toString() + "]";
		}
		public String getUserId() {
			return userId;
		}
		public void setUserId(String userId) {
			this.userId = userId;
		}
		public String getUserName() {
			return userName;
		}
		public void setUserName(String userName) {
			this.userName = userName;
		}
		public String getUserEmail() {
			return userEmail;
		}
		public void setUserEmail(String userEmail) {
			this.userEmail = userEmail;
		}
		public double getTotalSales() {
			return totalSales;
		}
		public void setTotalSales(double totalSales) {
			this.totalSales = totalSales;
		}
		public String getDietType() {
			return dietType;
		}
		public void setDietType(String dietType) {
			this.dietType = dietType;
		}
		public String getPlanDuration() {
			return planDuration;
		}
		public void setPlanDuration(String planDuration) {
			this.planDuration = planDuration;
		}
}