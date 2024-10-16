package com.food.MealMate.User.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.food.MealMate.Entities.FoodItemsEntity;
import com.food.MealMate.Entities.MealEntity;
import com.food.MealMate.Entities.MealPlanEntity;
import com.food.MealMate.Entities.PaymentEntity;

import com.food.MealMate.Entities.SubscriptionEntity;
import com.food.MealMate.Entities.UserEntity;
import com.food.MealMate.User.service.EmailService;
import com.food.MealMate.User.service.UserServiceInterface;
import com.food.MealMate.dao.FoodItemsRepository;
import com.food.MealMate.dao.SubscriptionRepository;
import com.food.MealMate.dao.UserRepository;
import com.food.MealMate.exception.EmailIdAlreadyExistsException;
import com.food.MealMate.exception.InvalidCredentialsException;
import com.food.MealMate.exception.MealPlanNotFoundException;
import com.food.MealMate.exception.PaymentProcessingException;
import com.food.MealMate.exception.SubscriptionCreationException;
import com.food.MealMate.exception.SubscriptionNotFoundException;
import com.food.MealMate.exception.UserRegistrationException;



@RestController
//@CrossOrigin(origins = "http://localhost:3001")
public class UserController {
	@Autowired
	private UserServiceInterface userService;
	@Autowired
	FoodItemsRepository fooditems;
	
	@Autowired 
	SubscriptionRepository sub;
	@Autowired
	UserRepository userdata;
	
	@Autowired
	EmailService emailService;
	
	@GetMapping("/user/mealPlans")
	public List<MealPlanEntity> getAllMealPlans() throws MealPlanNotFoundException {
	    return userService.getAllMealPlans();
	}
	 
//	 @RequestMapping(value = "/sublist", method = RequestMethod.POST)
//	 SubscriptionEntity User(@RequestBody SubscriptionEntity sub1)
//	 {
//		return sub.save(sub1);
//		 
//	 }

//	 UserEntity AllUser(@RequestBody UserEntity user)
//	 {
//		return userdata.save(user);
//		 
//	 }
	@RequestMapping(value = "/processUserPayment", method = RequestMethod.POST)
	public PaymentEntity processUserPayment(@RequestBody PaymentEntity paymentDetails) throws PaymentProcessingException {
	    System.out.println("Received payment details: " + paymentDetails);
	    return userService.processPayment(paymentDetails);
	}

	
	
	 
	@RequestMapping(value = "/createUserSubscription", method = RequestMethod.POST)
	public ResponseEntity<SubscriptionEntity> createSubscription(@RequestBody SubscriptionEntity newSubscription) throws SubscriptionCreationException {
	    SubscriptionEntity savedSubscription = userService.createSubscription(newSubscription);
	    return ResponseEntity.status(HttpStatus.CREATED).body(savedSubscription);
	}

	 @GetMapping("/getSubscriptionByUserId/{userId}")
	public List<SubscriptionEntity> getSubscriptionsByUserId(@PathVariable String userId) throws SubscriptionNotFoundException {
	    return userService.getSubscriptionsByUserId(userId);
	}

	 
	
	 
	

	  
	 @RequestMapping(value = "/deletesubscriptionById/{subscriptionId}", method = RequestMethod.DELETE)
	 public ResponseEntity<Void> deleteSubscription(@PathVariable String subscriptionId) {
	     userService.deleteSubscription(subscriptionId);
	     return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	 }
	 
	 
	 @RequestMapping(value = "/userRegisteration", method = RequestMethod.POST)
     public ResponseEntity<UserEntity> registerUser( @RequestBody UserEntity newUser) throws EmailIdAlreadyExistsException {
            UserEntity registeredUser = userService.registerUser(newUser);
            System.out.println(newUser); 
            
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
        }
     
     @GetMapping("/userlogin/{emailId}/{password}")
     public UserEntity loginToMealMate(@PathVariable String emailId,@PathVariable String password) throws InvalidCredentialsException, EmailIdAlreadyExistsException {
         System.out.println("Credentials"+emailId+password);   
         return userService.loginToMealMate(emailId,password);
        }    
             @RequestMapping(value="/userProfile/{emailId}", method = RequestMethod.PUT)
        public ResponseEntity<UserEntity> updateUserProfile(
                @PathVariable String emailId,
            @RequestBody UserEntity updatedUser) {
            UserEntity user = userService.updateUserProfile(emailId, updatedUser);
            if (user != null) {
                return new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }
     
        
        @PostMapping("/generateOtp/{emailId}")
        public ResponseEntity<String> generateOtp(@PathVariable String emailId) {
            String otp = userService.generateAndSendOtp(emailId);
            return new ResponseEntity<>("OTP sent to " + emailId, HttpStatus.OK);
        }
        
        @PostMapping("/verifyOtp/{emailId}/{otp}")
        public ResponseEntity<String> verifyOtp(@PathVariable String emailId, @PathVariable String otp) {
            boolean isValid = userService.verifyOtp(emailId, otp);
            if (isValid) { 
                String subject = "Registeration Success";
                String text = "Dear User,\n\nYour registration has been successfully completed!\nWelcome to the MealMate family.\nWe are excited to have you on board.\\n\\nBest regards,\\nMealMate Team";
                emailService.sendEmail(emailId, subject, text);
                return new ResponseEntity<>("OTP verified successfully!", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Invalid or expired OTP.", HttpStatus.BAD_REQUEST);
            }
        } 

	 
	 
	 
	 
	 
	 
	
	
	 
	


}
