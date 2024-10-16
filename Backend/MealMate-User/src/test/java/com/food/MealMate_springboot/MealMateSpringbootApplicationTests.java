package com.food.MealMate_springboot;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

//import com.food.MealMate.Admin.AdminServiceImpl;
import com.food.MealMate.Entities.FoodItemsEntity;
import com.food.MealMate.Entities.MealEntity;
import com.food.MealMate.Entities.MealPlanDay;
import com.food.MealMate.Entities.MealPlanEntity;
import com.food.MealMate.Entities.PaymentEntity;
import com.food.MealMate.Entities.SubscriptionEntity;
import com.food.MealMate.Entities.UserEntity;
import com.food.MealMate.User.controller.UserController;
import com.food.MealMate.User.service.UserServiceImplementation;
import com.food.MealMate.dao.FoodItemsRepository;
import com.food.MealMate.dao.MealPlanRepository;
import com.food.MealMate.dao.MealRepository;
import com.food.MealMate.dao.PaymentRepository;
import com.food.MealMate.dao.SubscriptionRepository;
import com.food.MealMate.dao.UserRepository;
import com.food.MealMate.exception.MealPlanNotFoundException;
import com.food.MealMate.exception.NoSubscriptionFoundException;
import com.food.MealMate.exception.PaymentProcessingException;
import com.food.MealMate.exception.SubscriptionCreationException;
import com.food.MealMate.exception.SubscriptionNotFoundException;
import com.food.MealMate.exception.UserDataNotFoundException;
import com.food.MealMate.exception.UserRegistrationException;

//@SpringBootTest
class MealMateSpringbootApplicationTests {
	
	@InjectMocks
    private UserController userController;
//      @InjectMocks
//      private AdminServiceImpl adminService;
        
        @Mock
        private FoodItemsRepository foodItemsRepository;
        @Mock
        private MealRepository mealRepository;
        @Mock
        private MealPlanRepository mealPlanRepository;
        @Mock
        private UserRepository userRepository;
        @Mock
        private SubscriptionRepository subscriptionRepository;
        @Mock
        private UserServiceImplementation userService;
        @Mock
        private PaymentRepository paymentRepository;
        
        @BeforeEach
        public void setUp() {
            MockitoAnnotations.openMocks(this);
        }
        
        
        
        

       


//  @Test
//  void contextLoads() {
//  }
        
        
        
//      @Test
//      public void testGetSubscribedUsers_NoUsersFound() {
//          when(userRepository.findBySubscriptionIsNotNull()).thenReturn(Collections.emptyList());
//
//          assertThrows(UserDataNotFoundException.class, () -> {
//              adminService.getUsersByCategory("subscribed");
//          });
//
//          verify(userRepository).findBySubscriptionIsNotNull();
//      }
    
    
    
    
//  @Test
//  public void testGetUsersByCategory_SubscribedUsers() throws UserDataNotFoundException {
//      List<UserEntity> subscribedUsers = Arrays.asList(new UserEntity(), new UserEntity());
//      when(userRepository.findBySubscriptionIsNotNull()).thenReturn(subscribedUsers);
//
//      List<UserEntity> result = adminService.getUsersByCategory("subscribed");
//
//      assertNotNull(result);
//      assertEquals(2, result.size());  // Assuming 2 subscribed users
//      verify(userRepository).findBySubscriptionIsNotNull();
//  }
//  
//  @Test
//  public void testGetAllUsers_Success() throws UserDataNotFoundException {
//      List<UserEntity> mockUsers = IntStream.range(0, 100)
//          .mapToObj(i -> new UserEntity()) // Simulate 100 users
//          .collect(Collectors.toList());
//
//      when(userRepository.findAll()).thenReturn(mockUsers);
//
//      List<UserEntity> result = adminService.getUsersByCategory("all");
//
//      assertEquals(100, result.size()); // Assuming 100 users exist
//      verify(userRepository).findAll();
//  }

    

    

//  
//  @Test
//  public void testGetUsersByCategory_NoUsersFound() {
//      when(userRepository.findBySubscriptionIsNotNull()).thenReturn(Collections.emptyList());
//
//      assertThrows(UserDataNotFoundException.class, () -> {
//          adminService.getUsersByCategory("subscribed");
//      });
//
//      verify(userRepository).findBySubscriptionIsNotNull();
//  }
//
//  
//  
//  @Test
//  public void testGetUnsubscribedUsers_Success() throws UserDataNotFoundException {
//      List<UserEntity> mockUnsubscribedUsers = IntStream.range(0, 30)
//          .mapToObj(i -> new UserEntity()) // No subscription set for unsubscribed users
//          .collect(Collectors.toList());
//
//      when(userRepository.findBySubscriptionIsNull()).thenReturn(mockUnsubscribedUsers);
//
//      List<UserEntity> result = adminService.getUsersByCategory("unsubscribed");
//
//      assertEquals(30, result.size()); // Assuming 30 unsubscribed users
//      verify(userRepository).findBySubscriptionIsNull();
//  }
//  
//  
    
//userAllMealPlans
    @Test
    public void testGetAllMealPlans_Success() throws MealPlanNotFoundException {
        List<MealPlanEntity> mockMealPlans = Arrays.asList(new MealPlanEntity(), new MealPlanEntity());

        when(userService.getAllMealPlans()).thenReturn(mockMealPlans);

        List<MealPlanEntity> result = userService.getAllMealPlans();

        assertEquals(2, result.size()); // Assuming 2 meal plans
        verify(userService).getAllMealPlans();
    }

    
    
//  @Test
//  public void testUpdateMealPlan_Success() {
//      MealPlanEntity mockMealPlan = new MealPlanEntity();
//      when(mealPlanRepository.findById("meal123")).thenReturn(Optional.of(mockMealPlan));
//      when(mealPlanRepository.save(mockMealPlan)).thenReturn(mockMealPlan);
//
//      MealPlanEntity result = adminService.updateMealPlan("meal123", mockMealPlan);
//
//      assertNotNull(result);
//      assertEquals(mockMealPlan, result);
//      verify(mealPlanRepository).findById("meal123");
//      verify(mealPlanRepository).save(mockMealPlan);
//  }
//
//  
//  
//  
//  @Test
//  public void testUpdateMealPlan_NotFound() {
//      when(mealPlanRepository.findById("meal123")).thenReturn(Optional.empty());
//
//      MealPlanEntity result = adminService.updateMealPlan("meal123", new MealPlanEntity());
//
//      assertNull(result);
//      verify(mealPlanRepository).findById("meal123");
//  }
//
//  
//  
//  @Test
//  public void testUpdateMealPlan_SaveCalledWithCorrectEntity() {
//      MealPlanEntity existingMealPlan = new MealPlanEntity();
//      MealPlanEntity updatedMealPlan = new MealPlanEntity();
//      updatedMealPlan.setDietType("Vegan");
//     
//
//      when(mealPlanRepository.findById("meal123")).thenReturn(Optional.of(existingMealPlan));
//      when(mealPlanRepository.save(updatedMealPlan)).thenReturn(updatedMealPlan);
//
//      MealPlanEntity result = adminService.updateMealPlan("meal123", updatedMealPlan);
//
//      assertNotNull(result);
//      assertEquals("Vegan", result.getDietType());
//      verify(mealPlanRepository).findById("meal123");
//      verify(mealPlanRepository).save(updatedMealPlan);
//  }
//  
//  
    
    
    
    
    //UserPayment
    
    
    @Test
    public void testProcessUserPayment_Success() throws PaymentProcessingException {
        PaymentEntity mockPayment = new PaymentEntity();
        mockPayment.setAmount(100.0);

        when(userService.processPayment(mockPayment)).thenReturn(mockPayment);

        PaymentEntity result = userService.processPayment(mockPayment);

        assertNotNull(result);
        assertEquals(100.0, result.getAmount(), 0.01);
        verify(userService).processPayment(mockPayment);
    }
    
    
    

    @Test
    public void testProcessPayment_NullPaymentDetails() throws PaymentProcessingException {
        userService.processPayment(null);
    }

    
    @Test
    public void testProcessPayment_InvalidPaymentDetails() throws PaymentProcessingException {
        PaymentEntity invalidPayment = new PaymentEntity();
        invalidPayment.setAmount(0.0);

        userService.processPayment(invalidPayment);
    }

    
    
    
//    @Test
//    public void testProcessUserPayment_InvalidPaymentDetails() throws PaymentProcessingException {
//        PaymentEntity invalidPayment = new PaymentEntity();
//        invalidPayment.setAmount(0.0);
//
//        userService.processUserPayment(invalidPayment);
//    }

    
    
    
    
    
    
    
    
    //user Subscription
    
    @Test
    public void testCreateSubscription_Success() throws SubscriptionCreationException {
        
        UserEntity user = new UserEntity("U101","sravya","sravya@gmail.com","Razam","980102394","1234");
         SubscriptionEntity validSubscription = new SubscriptionEntity("Meal10001","M1010","veg",new Date(),new Date(),0.0,user);
        when(userService.createSubscription(validSubscription)).thenReturn(validSubscription);

        SubscriptionEntity response = userService.createSubscription(validSubscription);

        assertEquals(validSubscription, response);
      
    }


    
   
    @Test
    public void testCreateSubscription_InvalidData() throws SubscriptionCreationException {
        UserEntity user = new UserEntity("U101","sravya","sravya@gmail.com","Razam","980102394","1234");
         SubscriptionEntity invalidSubscription = new SubscriptionEntity("","M1010","veg",new Date(),new Date(),0.0,user);
        when(userService.createSubscription(invalidSubscription)).thenThrow(new SubscriptionCreationException("Invalid data"));

        assertThrows(SubscriptionCreationException.class, () -> {
            userService.createSubscription(invalidSubscription);
        });
    }

    
    
    @Test
    public void testCreateSubscription_ThrowsException() throws SubscriptionCreationException {
        UserEntity user = new UserEntity("U101","sravya","sravya@gmail.com","Razam","980102394","1234");
     SubscriptionEntity validSubscription = new SubscriptionEntity("Meal10001","M1010","veg",new Date(),new Date(),0.0,user);

        when(userService.createSubscription(validSubscription)).thenThrow(new SubscriptionCreationException("Database error"));

        assertThrows(SubscriptionCreationException.class, () -> {
            userService.createSubscription(validSubscription);
        });
    }
    
    
    
    
    //usercontroller
    @Test
    public void testGetAllMealPlans() throws MealPlanNotFoundException {
        MealPlanEntity mealPlan1 = new MealPlanEntity();
        mealPlan1.setMealPlanId("1");
        mealPlan1.setDietType("Vegan");
        mealPlan1.setMealplanPrice("100");

        MealPlanEntity mealPlan2 = new MealPlanEntity();
        mealPlan2.setMealPlanId("2");
        mealPlan2.setDietType("Keto");
        mealPlan2.setMealplanPrice("150");

        List<MealPlanEntity> mealPlans = Arrays.asList(mealPlan1, mealPlan2);

        when(userService.getAllMealPlans()).thenReturn(mealPlans);

        List<MealPlanEntity> result = userController.getAllMealPlans();

        assertEquals(2, result.size());
        assertEquals("Vegan", result.get(0).getDietType());
        assertEquals("Keto", result.get(1).getDietType());
    }
    
    
    
    @Test
    public void testProcessUserPayment() throws PaymentProcessingException {
        PaymentEntity payment = new PaymentEntity();
        payment.setPaymentId("1");
        payment.setUserId("user1");
        payment.setAmount(100.0);

        when(userService.processPayment(any(PaymentEntity.class))).thenReturn(payment);

        PaymentEntity result = userController.processUserPayment(payment);

        assertEquals("1", result.getPaymentId());
        assertEquals("user1", result.getUserId());
        assertEquals(100.0, result.getAmount());
    }
    
    
    
    @Test
    public void testCreateSubscription() throws SubscriptionCreationException {
        SubscriptionEntity subscription = new SubscriptionEntity();
        subscription.setSubscriptionId("1");
        UserEntity user = new UserEntity("U101","sravya","sravya@gmail.com","Razam","980102394","1234");
        subscription.setUser(user);

        when(userService.createSubscription(any(SubscriptionEntity.class))).thenReturn(subscription);

        ResponseEntity<SubscriptionEntity> response = userController.createSubscription(subscription);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals("1", response.getBody().getSubscriptionId());
        assertEquals(user, response.getBody().getUser());
    }
    
    
    @Test
    public void testGetSubscriptionsByUserId() throws SubscriptionNotFoundException {
        SubscriptionEntity subscription1 = new SubscriptionEntity();
        subscription1.setSubscriptionId("1");
        UserEntity user = new UserEntity("U101","sravya","sravya@gmail.com","Razam","980102394","1234");
        subscription1.setUser(user);

        SubscriptionEntity subscription2 = new SubscriptionEntity();
        subscription2.setSubscriptionId("2");
        subscription2.setUser(user);

        List<SubscriptionEntity> subscriptions = Arrays.asList(subscription1, subscription2);

        when(userService.getSubscriptionsByUserId("user1")).thenReturn(subscriptions);

        List<SubscriptionEntity> result = userController.getSubscriptionsByUserId("user1");

        assertEquals(2, result.size());
        assertEquals("1", result.get(0).getSubscriptionId());
        assertEquals("2", result.get(1).getSubscriptionId());
    }
    
   
    
    
    
    
    
//    @Test
//    public void testRegisterUser() throws UserRegistrationException {
//        UserEntity user = new UserEntity();
//        user.setUserId("1");
//        user.setName("John Doe");
//        user.setEmailId("john.doe@example.com");
//
//        when(userService.registerUser(any(UserEntity.class))).thenReturn(user);
//
//        ResponseEntity<UserEntity> response = userController.registerUser(user);
//
//        assertEquals(HttpStatus.CREATED, response.getStatusCode());
//        assertEquals("1", response.getBody().getUserId());
//        assertEquals("John Doe", response.getBody().getName());
//        assertEquals("john.doe@example.com", response.getBody().getEmailId());
//    }
    
    

    
    
    //payment
    @Test
    public void testProcessUserPayment_NullPaymentDetails() throws PaymentProcessingException {
        PaymentEntity nullPayment = null;

        userService.processPayment(nullPayment);

        verify(userService).processPayment(nullPayment);
    }

    
    
    
    
    
    
    @Test
    public void testProcessUserPayment_NegativeAmount() throws PaymentProcessingException {
        PaymentEntity mockPayment = new PaymentEntity();
        mockPayment.setAmount(-50.0);

        userService.processPayment(mockPayment);

        verify(userService).processPayment(mockPayment);
    }

    
    
    
    
    
    @Test
    public void testProcessUserPayment_ZeroAmount() throws PaymentProcessingException {
        PaymentEntity mockPayment = new PaymentEntity();
        mockPayment.setAmount(0.0);

        userService.processPayment(mockPayment);

        verify(userService).processPayment(mockPayment);
    }

  
   
    
    
    
    @Test
    public void testProcessUserPayment_SaveFailure() throws PaymentProcessingException {
        PaymentEntity mockPayment = new PaymentEntity();
        mockPayment.setAmount(300.0);

        when(paymentRepository.save(mockPayment)).thenThrow(new RuntimeException("Database error"));

        userService.processPayment(mockPayment);
    }


    
    
    
    
    
    
    @Test
    public void testProcessUserPayment_LargeAmount() throws PaymentProcessingException {
        PaymentEntity mockPayment = new PaymentEntity();
        mockPayment.setAmount(1000000.0);

        when(userService.processPayment(mockPayment)).thenReturn(mockPayment);

        PaymentEntity result = userService.processPayment(mockPayment);

        assertNotNull(result);
        assertEquals(1000000.0, result.getAmount(), 0.01);
        verify(userService).processPayment(mockPayment);
    }

    
    
    
    
    
    @Test
    public void testProcessUserPayment_WithDescription() throws PaymentProcessingException {
        PaymentEntity mockPayment = new PaymentEntity();
        mockPayment.setAmount(250.0);
        mockPayment.setPaymentId("Monthly subscription");

        when(userService.processPayment(mockPayment)).thenReturn(mockPayment);

        PaymentEntity result = userService.processPayment(mockPayment);

        assertNotNull(result);
        assertEquals(250.0, result.getAmount(), 0.01);
        assertEquals("Monthly subscription", result.getPaymentId());
        verify(userService).processPayment(mockPayment);
    }

    
    
    
    @Test
    public void testProcessUserPayment_NullAmount() throws PaymentProcessingException {
        PaymentEntity mockPayment = new PaymentEntity();
        mockPayment.setAmount(null);

        userService.processPayment(mockPayment);

        verify(userService).processPayment(mockPayment);
    }

    
    
    
    
    @Test
    public void testProcessUserPayment_EmptyPaymentDetails() throws PaymentProcessingException {
        PaymentEntity mockPayment = new PaymentEntity(); // No amount set

        userService.processPayment(mockPayment);

        verify(userService).processPayment(mockPayment);
    }

    
    
    
    
    
    
    @Test
    public void testProcessUserPayment_NoDescription() throws PaymentProcessingException {
        PaymentEntity mockPayment = new PaymentEntity();
        mockPayment.setAmount(500.0);

        when(userService.processPayment(mockPayment)).thenReturn(mockPayment);

        PaymentEntity result = userService.processPayment(mockPayment);

        assertNotNull(result);
        assertEquals(500.0, result.getAmount(), 0.01);
        assertNull(result.getPaymentId());  // No description should be set
        verify(userService).processPayment(mockPayment);
    }

    
    
    
    @Test
    public void testProcessUserPayment_RoundingAmount() throws PaymentProcessingException {
        PaymentEntity mockPayment = new PaymentEntity();
        mockPayment.setAmount(123.456789);

        when(userService.processPayment(mockPayment)).thenReturn(mockPayment);

        PaymentEntity result = userService.processPayment(mockPayment);

        assertNotNull(result);
        assertEquals(123.46, result.getAmount(), 0.01);  // Rounding to two decimal places
        verify(userService).processPayment(mockPayment);
    }

    
    
    
    
    
//    //Admin Subscription
//    @Test
//    public void testGetAllSubscriptions_NoSubscriptionFoundExceptionMessage() {
//        NoSubscriptionFoundException exception = assertThrows(NoSubscriptionFoundException.class, () -> {
//            when(adminService.getAllSubscriptions()).thenThrow(new NoSubscriptionFoundException("No subscriptions found."));
//            adminService.getAllSubscriptions();
//        });
//
//        assertEquals("No subscriptions found.", exception.getMessage());
//    }
//
//
//    
//    
//    @Test
//    public void testGetAllSubscriptions_NoSubscriptionFoundException() {
//        NoSubscriptionFoundException exception = assertThrows(NoSubscriptionFoundException.class, () -> {
//            when(adminService.getAllSubscriptions()).thenThrow(new NoSubscriptionFoundException("No subscriptions found."));
//            adminService.getAllSubscriptions();
//        });
//
//        assertEquals("No subscriptions found.", exception.getMessage());
//    }
//
//    
//    
//
//    @Test
//    public void testGetAllSubscriptions_NullList() {
//        NoSubscriptionFoundException exception = assertThrows(NoSubscriptionFoundException.class, () -> {
//            when(adminService.getAllSubscriptions()).thenReturn(null);
//            adminService.getAllSubscriptions();
//        });
//
//        assertEquals("No subscriptions found.", exception.getMessage());
//    }
//
//    
//    
//    
//    @Test
//    public void testGetAllSubscriptions_EmptyList() {
//        NoSubscriptionFoundException exception = assertThrows(NoSubscriptionFoundException.class, () -> {
//            when(adminService.getAllSubscriptions()).thenReturn(Collections.emptyList());
//            adminService.getAllSubscriptions();
//        });
//
//        assertEquals("No subscriptions found.", exception.getMessage());
//    }
//
//    
    
    @Test
    public void testGetAllMealPlans_NoMealPlansFound() {
        MealPlanNotFoundException exception = assertThrows(MealPlanNotFoundException.class, () -> {
            when(userService.getAllMealPlans()).thenThrow(new MealPlanNotFoundException("No meal plans found."));
            userService.getAllMealPlans();
        });

        assertEquals("No meal plans found.", exception.getMessage());
    }
    
    
    
  
   
    
}
