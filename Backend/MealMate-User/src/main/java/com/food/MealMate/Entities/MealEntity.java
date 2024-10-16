package com.food.MealMate.Entities;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class MealEntity {
    @Id
    private String mealId;
    
    private Double mealPrice;
    
    @ManyToMany
    @JoinTable(
        name = "meal_food_item",
        joinColumns = @JoinColumn(name = "meal_id"),
        inverseJoinColumns = @JoinColumn(name = "food_item_id")
    )
    private List<FoodItemsEntity> foodItems;

    // Getters and setters
    public String getMealId() {
        return mealId;
    }

    public void setMealId(String mealId) {
        this.mealId = mealId;
    }

    public Double getMealPrice() {
        return mealPrice;
    }

    public void setMealPrice(Double mealPrice) {
        this.mealPrice = mealPrice;
    }

    public List<FoodItemsEntity> getFoodItems() {
        return foodItems;
    }

    public void setFoodItems(List<FoodItemsEntity> foodItems) {
        this.foodItems = foodItems;
    }

    public MealEntity(String mealId, Double mealPrice, List<FoodItemsEntity> foodItems) {
        this.mealId = mealId;
        this.mealPrice = mealPrice;
        this.foodItems = foodItems;
    }

    public MealEntity() {
    }
}
