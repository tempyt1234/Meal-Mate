package com.quad.mealmate.admin.entities;

import jakarta.persistence.*;

@Entity
public class MealPlanDay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String dayOfTheWeek;

    @ManyToOne
    @JoinColumn(name = "meal_id")
    private MealEntity meal;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getdayOfTheWeek() {
        return dayOfTheWeek;
    }

    public void setdayOfTheWeek(String dayOfTheWeek) {
        this.dayOfTheWeek = dayOfTheWeek;
    }

    public MealEntity getMeal() {
        return meal;
    }

    public void setMeal(MealEntity meal) {
        this.meal = meal;
    }
}
