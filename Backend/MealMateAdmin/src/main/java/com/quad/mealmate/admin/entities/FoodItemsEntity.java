package com.quad.mealmate.admin.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class FoodItemsEntity {
	
	@Id
	private String foodItemId;
	
	private String name;
	private String description;
	private String image;
	private String category;
	private String quantity;
	public FoodItemsEntity() {
		super();
	}
	public FoodItemsEntity(String foodItemId, String name, String description, String image, String category,
			String quantity) {
		super();
		this.foodItemId = foodItemId;
		this.name = name;
		this.description = description;
		this.image = image;
		this.category = category;
		this.quantity = quantity;
	}
	public String getFoodItemId() {
		return foodItemId;
	}
	public void setFoodItemId(String foodItemId) {
		this.foodItemId = foodItemId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	@Override
	public String toString() {
		return "FoodItemsEntity [foodItemId=" + foodItemId + ", name=" + name + ", description=" + description
				+ ", image=" + image + ", category=" + category + ", quantity=" + quantity + ", getFoodItemId()="
				+ getFoodItemId() + ", getName()=" + getName() + ", getDescription()=" + getDescription()
				+ ", getImage()=" + getImage() + ", getCategory()=" + getCategory() + ", getQuantity()=" + getQuantity()
				+ ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString()
				+ "]";
	}
	
	
	
	

}
