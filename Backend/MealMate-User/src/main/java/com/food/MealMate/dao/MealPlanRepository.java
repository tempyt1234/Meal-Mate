package com.food.MealMate.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.food.MealMate.Entities.MealPlanEntity;

public interface MealPlanRepository  extends JpaRepository<MealPlanEntity, String>{

}
