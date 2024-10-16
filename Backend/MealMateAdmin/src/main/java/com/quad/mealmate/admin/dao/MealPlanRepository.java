package com.quad.mealmate.admin.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quad.mealmate.admin.entities.MealPlanEntity;

public interface MealPlanRepository  extends JpaRepository<MealPlanEntity, String>{

}
