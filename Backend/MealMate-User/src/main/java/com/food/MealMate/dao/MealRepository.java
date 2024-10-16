package com.food.MealMate.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.food.MealMate.Entities.MealEntity;

public interface MealRepository extends JpaRepository<MealEntity, String>{
	

}
