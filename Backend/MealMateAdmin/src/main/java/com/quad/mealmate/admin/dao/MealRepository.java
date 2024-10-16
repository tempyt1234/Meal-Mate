package com.quad.mealmate.admin.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quad.mealmate.admin.entities.MealEntity;

public interface MealRepository extends JpaRepository<MealEntity, String>{
	

}
