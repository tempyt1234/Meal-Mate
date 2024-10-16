package com.quad.mealmate.admin.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.quad.mealmate.admin.entities.FoodItemsEntity;

public interface FoodItemsRepository extends JpaRepository<FoodItemsEntity, String>{

	Optional<FoodItemsEntity> findByName(String name);

}
