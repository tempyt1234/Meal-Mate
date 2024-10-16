package com.food.MealMate.User.service;

import java.util.List;

import com.food.MealMate.Entities.FoodItemsEntity;
import com.food.MealMate.Entities.MealEntity;
import com.food.MealMate.Entities.MealPlanEntity;
import com.food.MealMate.Entities.PaymentEntity;
import com.food.MealMate.Entities.SubscriptionEntity;
import com.food.MealMate.Entities.UserEntity;
import com.food.MealMate.exception.EmailIdAlreadyExistsException;
import com.food.MealMate.exception.InvalidCredentialsException;

public interface UserServiceInterface {

	List<MealPlanEntity> getAllMealPlans();

	PaymentEntity processPayment(PaymentEntity paymentDetails);

	List<SubscriptionEntity> getSubscriptionsByUserId(String userId);

	SubscriptionEntity createSubscription(SubscriptionEntity newSubscription);

//	UserEntity registerUser(UserEntity newUser);

	

//	List<UserEntity> getAllUsers();

	boolean deleteSubscription(String subscriptionId);

	UserEntity loginToMealMate(String emailId, String password) throws InvalidCredentialsException, EmailIdAlreadyExistsException;

	UserEntity updateUserProfile(String emailId, UserEntity updatedUser);

	String generateAndSendOtp(String emailId);

	boolean verifyOtp(String emailId, String otp);

	UserEntity registerUser(UserEntity newUser) throws EmailIdAlreadyExistsException;

	UserEntity getUserByEmail(String emailId);
	


}
