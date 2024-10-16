package com.quad.mealmate.admin;

import java.util.List;

import com.quad.mealmate.admin.entities.FoodItemsEntity;
import com.quad.mealmate.admin.entities.MealEntity;
import com.quad.mealmate.admin.entities.MealPlanEntity;
import com.quad.mealmate.admin.entities.SubscriptionEntity;
import com.quad.mealmate.admin.entities.UserEntity;
import com.quad.mealmate.admin.exception.FoodItemAlreadyExistsException;
import com.quad.mealmate.admin.exception.FoodItemException;
import com.quad.mealmate.admin.exception.InvalidCredentialsException;
import com.quad.mealmate.admin.exception.MealPlanException;
import com.quad.mealmate.admin.exception.MealsException;
import com.quad.mealmate.admin.exception.NoFoodItemFoundException;
import com.quad.mealmate.admin.exception.NoMealFoundException;
import com.quad.mealmate.admin.exception.NoMealPlanFoundException;


public interface AdminService {

	FoodItemsEntity addFoodItem(FoodItemsEntity foodItem) throws FoodItemAlreadyExistsException;

	List<FoodItemsEntity> getAllFoodItems() throws NoFoodItemFoundException;

	FoodItemsEntity updateFoodItem(String foodItemId, FoodItemsEntity foodItem) throws FoodItemException;

	FoodItemsEntity deleteFoodItem(String foodItemId) throws FoodItemException;

	MealEntity addNewMeal(MealEntity meal);

	Boolean deleteMeal(String mealId) throws MealsException;

	MealEntity updateMeal(String mealId, MealEntity meal) throws MealsException;

	List<MealEntity> getAllMeals() throws NoMealFoundException;

	MealPlanEntity addNewMealPlan(MealPlanEntity mealPlan);


	Boolean deleteMealPlan(String mealPlanId) throws MealPlanException;

	List<MealPlanEntity> getAllMealPlans() throws NoMealPlanFoundException;

	MealPlanEntity updateMealPlan(String mealPlanId, MealPlanEntity mealPlan) throws MealPlanException;


	List<SubscriptionEntity> getAllSubscriptions();

	UserEntity loginToMealMate(String emailId, String password) throws InvalidCredentialsException;

	List<UserEntity> getUsersByCategory(String category);


}
