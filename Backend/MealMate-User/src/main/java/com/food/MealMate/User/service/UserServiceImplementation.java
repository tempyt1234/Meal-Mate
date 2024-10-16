package com.food.MealMate.User.service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.food.MealMate.Entities.FoodItemsEntity;
import com.food.MealMate.Entities.MealEntity;
import com.food.MealMate.Entities.MealPlanEntity;
import com.food.MealMate.Entities.OtpDetails;
import com.food.MealMate.Entities.PaymentEntity;
import com.food.MealMate.Entities.SubscriptionEntity;
import com.food.MealMate.Entities.UserEntity;
import com.food.MealMate.dao.FoodItemsRepository;
import com.food.MealMate.dao.MealPlanRepository;
import com.food.MealMate.dao.MealRepository;
import com.food.MealMate.dao.PaymentRepository;
import com.food.MealMate.dao.SubscriptionRepository;
import com.food.MealMate.dao.UserRepository;
import com.food.MealMate.exception.EmailIdAlreadyExistsException;
import com.food.MealMate.exception.EmailNotSentException;
import com.food.MealMate.exception.InvalidCredentialsException;
import com.food.MealMate.exception.InvalidInputException;
import com.food.MealMate.exception.InvalidOtpException;
import com.food.MealMate.exception.MealPlanNotFoundException;
import com.food.MealMate.exception.NoUserFoundException;
import com.food.MealMate.exception.OtpExpiredException;
import com.food.MealMate.exception.PaymentProcessingException;
import com.food.MealMate.exception.SubscriptionCreationException;
import com.food.MealMate.exception.SubscriptionNotFoundException;
import com.food.MealMate.exception.UserNotFoundException;
import com.food.MealMate.exception.UserRegistrationException;

@Service
public class UserServiceImplementation implements UserServiceInterface {
	
	@Autowired
	MealPlanRepository mealplans;
	
	@Autowired
	MealRepository meals;
	
	@Autowired
	FoodItemsRepository footitems;
	
	@Autowired
	PaymentRepository Paymentrepository;
	
	@Autowired
	SubscriptionRepository subscriptionRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	EmailService emailService;
	
	
	private final HashMap<String, OtpDetails> otpStore = new HashMap<>();

	@Override
	public List<MealPlanEntity> getAllMealPlans() throws MealPlanNotFoundException {
	    List<MealPlanEntity> mealPlans = mealplans.findAll();

	    // Throw exception if no meal plans are found
	    if (mealPlans.isEmpty()) {
	        throw new MealPlanNotFoundException("No meal plans found.Please add some meal plans.");
	    }

	    return mealPlans;
	}
	
	


	@Override
	public PaymentEntity processPayment(PaymentEntity paymentDetails) throws PaymentProcessingException {
	    try {
	        // Validate the payment details
	        if (paymentDetails == null || paymentDetails.getAmount() <= 0) {
	            throw new PaymentProcessingException("Invalid payment details.");
	        }

	        // Save the payment
	        return Paymentrepository.save(paymentDetails);
	    } catch (Exception e) {
	        throw new PaymentProcessingException("Failed to process the payment: " + e.getMessage());
	    }
	}

	
	
	
	@Override
	public SubscriptionEntity createSubscription(SubscriptionEntity newSubscription) throws SubscriptionCreationException {
	    try {
	        // Validate and create the subscription
	        return subscriptionRepository.save(newSubscription);
	    } catch (Exception e) {
	        throw new SubscriptionCreationException("Failed to create subscription: " + e.getMessage());
	    }
	}

	@Override
	public List<SubscriptionEntity> getSubscriptionsByUserId(String userId) throws SubscriptionNotFoundException {
	    List<SubscriptionEntity> subscriptions = subscriptionRepository.findByUserId(userId);

	    // Throw exception if no subscriptions are found
	    if (subscriptions.isEmpty()) {
	        throw new SubscriptionNotFoundException("No subscriptions found for user ID: " + userId);
	    }

	    return subscriptions;
	}

	@Override
	public boolean deleteSubscription(String subscriptionId) throws SubscriptionNotFoundException {
	    if (subscriptionRepository.existsById(subscriptionId)) {
	        subscriptionRepository.deleteById(subscriptionId);
	        return true;
	    } else {
	        throw new SubscriptionNotFoundException("Subscription with ID " + subscriptionId + " not found.");
	    }
	}
	
	




//	public void processUserPayment(PaymentEntity invalidPayment) {
//		// TODO Auto-generated method stub
//		
//	}
	
	
	@Override
    public UserEntity registerUser(UserEntity newUser) throws EmailIdAlreadyExistsException {
        Optional<UserEntity> foundUser=Optional.ofNullable(userRepository.findByEmailId(newUser.getEmailId()));
        System.out.println(foundUser);
        if(foundUser.isPresent()) 
        {
            throw new EmailIdAlreadyExistsException("The EmailId you entered is already exists, Please try with different emailId");
        }
        return userRepository.save(newUser);
    }
	
//    @Override
//    public List<UserEntity> getAllUsers() {
//        try {
//            return userRepository.findAll();
//        } catch (Exception e) {
//            throw new UserNotFoundException("Failed to retrieve users");
//        }
//    }
    
    
    
    
    @Override
    public UserEntity getUserByEmail(String emailId) {
        UserEntity foundUser=userRepository.findByEmailId(emailId);
        if(foundUser==null)
            throw new UserNotFoundException("There is no User Exists with the given emailId :"+emailId);
        return  foundUser;// Make sure you have this method in your UserRepository
    }
    
    @Override
    public UserEntity updateUserProfile(String emailId, UserEntity updatedUser) {
        UserEntity existingUser = userRepository.findByEmailId(emailId);
        if (existingUser != null) {
            existingUser.setName(updatedUser.getName());
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setPhone(updatedUser.getPhone());
            existingUser.setDeliveryAddress(updatedUser.getDeliveryAddress());
            return userRepository.save(existingUser);
        }
        else if(existingUser==null)
        throw new UserNotFoundException("There is no User Exists with the given emailId :"+emailId); // or throw an exception
        return existingUser;
    }
    
    @Override
    public String generateAndSendOtp(String emailId) throws InvalidInputException, EmailNotSentException {
        if (emailId == null || emailId.isEmpty()) {
            throw new InvalidInputException("Email ID cannot be null or empty");
        }
        String otp = generateOtp();
        String subject = "Your OTP Code";        
        String text = "Your OTP code is: " + otp;
       try {
           emailService.sendEmail(emailId, subject, text); // Send the OTP via email
       } catch (Exception e) {
           throw new EmailNotSentException("Failed to send OTP email to " + emailId);
       }
       otpStore.put(emailId, new OtpDetails(otp, System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(5)));
       return otp;
   } 
    
    @Override
    public boolean verifyOtp(String emailId, String otp) throws InvalidOtpException, OtpExpiredException {
        OtpDetails otpDetails = otpStore.get(emailId);
        if (otpDetails == null) {
            throw new InvalidOtpException("No OTP generated for this email");
        }
        if (otpDetails.isExpired()) {
            throw new OtpExpiredException("OTP has expired");
        }
        if (!otpDetails.getOtp().equals(otp)) {
            return false; // OTP is invalid
        }
        otpStore.remove(emailId); // Remove OTP after verification
        return true; // OTP is valid
    }
    public String generateOtp() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(999999));  
    }
    @Override
    public UserEntity loginToMealMate(String emailId, String password) throws InvalidCredentialsException, EmailIdAlreadyExistsException {
        UserEntity founduser=userRepository.findByEmailId(emailId);
        if(founduser!=null) {
            if(founduser.getPassword().equals(password)) {
                return founduser;
            }
            else
                throw new InvalidCredentialsException("Invalid credentials");
        }
        else
            throw new InvalidCredentialsException("Invalid credentials");
    } 

	
	

	

}
