package com.food.MealMate.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.food.MealMate.Entities.FoodItemsEntity;

public interface FoodItemsRepository extends JpaRepository<FoodItemsEntity, String>{

}
