package com.quad.mealmate.admin.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UserEntity {
	
	@Id
	private String userId;
	
	private String name;
	private String emailId;
	private String deliveryAddress;
	private String phone;
	private String password;
	
	
	
	public UserEntity() {
		super();
	}
	public UserEntity(String userId, String name, String emailId, String deliveryAddress, String phone,
			String password) {
		super();
		this.userId = userId;
		this.name = name;
		this.emailId = emailId;
		this.deliveryAddress = deliveryAddress;
		this.phone = phone;
		this.password = password;
		
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getDeliveryAddress() {
		return deliveryAddress;
	}
	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "UserEntity [userId=" + userId + ", name=" + name + ", emailId=" + emailId + ", deliveryAddress="
				+ deliveryAddress + ", phone=" + phone + ", password=" + password + ", getUserId()=" + getUserId()
				+ ", getName()=" + getName() + ", getEmailId()=" + getEmailId() + ", getDeliveryAddress()="
				+ getDeliveryAddress() + ", getPhone()=" + getPhone() + ", getPassword()=" + getPassword()
				+ ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString()
				+ "]";
	}
	
	
	
	
	
}