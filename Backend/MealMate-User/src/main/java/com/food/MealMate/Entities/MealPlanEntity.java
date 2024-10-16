package com.food.MealMate.Entities;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class MealPlanEntity {
    @Id
    private String mealPlanId;
    private String dietType;
    private String mealplanPrice;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "meal_plan_id")
    private List<MealPlanDay> meals;

    // Getters and setters
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

    public String getMealplanPrice() {
        return mealplanPrice;
    }

    public void setMealplanPrice(String mealplanPrice) {
        this.mealplanPrice = mealplanPrice;
    }

    public List<MealPlanDay> getMeals() {
        return meals;
    }

    public void setMeals(List<MealPlanDay> meals) {
        this.meals = meals;
    }
}
