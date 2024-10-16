package com.quad.mealmate.admin;



import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quad.mealmate.admin.dao.FoodItemsRepository;
import com.quad.mealmate.admin.dao.MealPlanRepository;
import com.quad.mealmate.admin.dao.MealRepository;
import com.quad.mealmate.admin.dao.SubscriptionRepository;
import com.quad.mealmate.admin.dao.UserRepository;
import com.quad.mealmate.admin.entities.FoodItemsEntity;
import com.quad.mealmate.admin.entities.MealEntity;
import com.quad.mealmate.admin.entities.MealPlanDay;
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
import com.quad.mealmate.admin.exception.NoSubscriptionFoundException;
import com.quad.mealmate.admin.exception.UserDataNotFoundException;


@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    FoodItemsRepository foodItemsRepository;
    @Autowired
    MealRepository mealRepository;
    @Autowired
    MealPlanRepository mealPlanRepository;
    
    @Autowired
	UserRepository userRepository;
    
    @Autowired
    SubscriptionRepository subscriptionRepository;

    @Override
    public FoodItemsEntity addFoodItem(FoodItemsEntity foodItem) throws FoodItemAlreadyExistsException {
    	Optional<FoodItemsEntity> existingFoodItem = foodItemsRepository.findByName(foodItem.getName());
    	if(existingFoodItem.isPresent())
    		throw new FoodItemAlreadyExistsException("FoodItem Already Exist with the given name");
    	else
    	return foodItemsRepository.save(foodItem);
    		
    }

    @Override
    public List<FoodItemsEntity> getAllFoodItems() throws NoFoodItemFoundException {
        List<FoodItemsEntity> foodItems = foodItemsRepository.findAll();
     if(foodItems.isEmpty())
    	 throw new NoFoodItemFoundException("No food items available");
     else
    	 return foodItems;
    }


    @Override
    public FoodItemsEntity updateFoodItem(String foodItemId, FoodItemsEntity foodItem) throws FoodItemException {
        Optional<FoodItemsEntity> existingFoodItem = foodItemsRepository.findById(foodItemId);
        if (existingFoodItem.isPresent()) {
            FoodItemsEntity updatedFoodItem = existingFoodItem.get();
            updatedFoodItem.setFoodItemId(foodItemId);
            updatedFoodItem.setName(foodItem.getName());
            updatedFoodItem.setDescription(foodItem.getDescription());
            updatedFoodItem.setImage(foodItem.getImage());
            updatedFoodItem.setCategory(foodItem.getCategory());
            updatedFoodItem.setQuantity(foodItem.getQuantity());
            return foodItemsRepository.save(updatedFoodItem);
        }
        else {
        	throw new FoodItemException("FoodItem Is not Found");
        }
    }

    @Override
    public FoodItemsEntity deleteFoodItem(String foodItemId) throws FoodItemException {
        Optional<FoodItemsEntity> existingFoodItem = foodItemsRepository.findById(foodItemId);
        if (existingFoodItem.isPresent()) {
            foodItemsRepository.deleteById(foodItemId);
            return existingFoodItem.get();
        }
        else {
        	throw new FoodItemException("FoodItem Is not Found");
        }
    }

    @Override
    public MealEntity addNewMeal(MealEntity meal) {
        return mealRepository.save(meal);
    }

    @Override
    public Boolean deleteMeal(String mealId) throws MealsException {
        Optional<MealEntity> existingMeal = mealRepository.findById(mealId);
        if (existingMeal.isPresent()) {
            mealRepository.deleteById(mealId);
            return true;
        }
        else {
        	throw new MealsException("Meal Is not Found");
        }
    }

    @Override
    public MealEntity updateMeal(String mealId, MealEntity meal) throws MealsException {
        Optional<MealEntity> existingMeal = mealRepository.findById(mealId);
        if (existingMeal.isPresent()) {
            MealEntity updatedMeal = existingMeal.get();
            updatedMeal.setMealId(mealId);
            updatedMeal.setFoodItems(meal.getFoodItems());
            updatedMeal.setMealPrice(meal.getMealPrice());
            return mealRepository.save(updatedMeal);
        }
        else {
        	throw new MealsException("Meal Is not Found");
        }
    }

    @Override
    public List<MealEntity> getAllMeals() {
        List<MealEntity> meals = mealRepository.findAll();
        return meals.isEmpty() ? new ArrayList<>() : meals;


    }


    @Override
    public MealPlanEntity addNewMealPlan(MealPlanEntity mealPlan) {
        return mealPlanRepository.save(mealPlan);
    }

    @Override
    public Boolean deleteMealPlan(String mealPlanId) throws MealPlanException {
        Optional<MealPlanEntity> existingMealPlan = mealPlanRepository.findById(mealPlanId);
        if (existingMealPlan.isPresent()) {
            mealPlanRepository.deleteById(mealPlanId);
            return true;
        }
        else {
        	throw new MealPlanException("MealPlan Is not Found");
        }
    }

    @Override
    public List<MealPlanEntity> getAllMealPlans() throws NoMealPlanFoundException {
    	List<MealPlanEntity> mealPlans=mealPlanRepository.findAll();
    	if(mealPlans.isEmpty()) 
    	{
    		throw new NoMealPlanFoundException("No meal plans available");
    	}
    	return mealPlans;
    }

	@Override
	public MealPlanEntity updateMealPlan(String mealPlanId, MealPlanEntity mealPlan) throws MealPlanException {
	Optional<MealPlanEntity> existingMealPlan=mealPlanRepository.findById(mealPlanId);
	 if (existingMealPlan.isPresent()) {
		 MealPlanEntity updatedMealPlan=existingMealPlan.get();
//		 updatedMealPlan.setMealPlanId(mealPlanId);
//		 updatedMealPlan.setDietType(mealPlan.getDietType());
//		 updatedMealPlan.setMealplanPrice(mealPlan.getMealplanPrice());
//		 updatedMealPlan.setMeals(mealPlan.getMeals());
		 return mealPlanRepository.save(mealPlan);
//         return updatedMealPlan;
     }
	 else {
     	throw new MealPlanException("MealPlan Is not Found");
     }
	}
	
	
	
	
	@Override
	public List<SubscriptionEntity> getAllSubscriptions() throws NoSubscriptionFoundException {
		 List<SubscriptionEntity> subscriptions = subscriptionRepository.findAll();
		    // Throw exception if no subscriptions are found
		    if (subscriptions.isEmpty()) {
		        throw new NoSubscriptionFoundException("No subscriptions found.");
		    }
		    return subscriptions;
	}



	@Override
	public UserEntity loginToMealMate(String emailId, String password)throws InvalidCredentialsException {
		UserEntity founduser=userRepository.findByEmailId(emailId);
		if(founduser!=null) {
			if(founduser.getPassword().equals(password)) {
				return founduser;
			}
			else
				throw new InvalidCredentialsException("Invalid Admin credentials");
		}
		else
			throw new InvalidCredentialsException("Invalid Admin credentials");
	}

	@Override
	public List<UserEntity> getUsersByCategory(String category) {
		 List<UserEntity> result = new ArrayList<>();
		    if ("subscribed".equals(category)) {
		        result = userRepository.findBySubscriptionIsNotNull();
		    } else if ("unsubscribed".equals(category)) {
		        result = userRepository.findBySubscriptionIsNull();
		    } else if ("all".equals(category)) {
		        result = userRepository.findAll();
		    }
		    // Check if the result is empty and throw an exception
		    if (result.isEmpty()) {
		        throw new UserDataNotFoundException("No users found for the category: " + category);
		    }
		    return result;
	}
	public Optional<MealPlanEntity> getMealPlanById(String mealPlanId) throws NoMealPlanFoundException {
		Optional<MealPlanEntity> existingMealPlan=mealPlanRepository.findById(mealPlanId);
		 if (existingMealPlan.isPresent()) {
			return existingMealPlan;
	     }
		 else {
	     	throw new NoMealPlanFoundException("MealPlan Is not Found");
	     }
	}

}
