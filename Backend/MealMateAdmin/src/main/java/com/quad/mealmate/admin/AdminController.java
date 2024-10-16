package com.quad.mealmate.admin;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.quad.mealmate.admin.dao.SubscriptionRepository;
import com.quad.mealmate.admin.entities.FoodItemsEntity;
import com.quad.mealmate.admin.entities.MealEntity;
import com.quad.mealmate.admin.entities.MealPlanEntity;
import com.quad.mealmate.admin.entities.SubscriptionEntity;
import com.quad.mealmate.admin.entities.UserEntity;
import com.quad.mealmate.admin.entities.UserSalesReport;
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


@RestController
//@CrossOrigin(origins = "http://localhost:3001") // For frontend connectivity
public class AdminController {
    @Autowired
    private AdminService adminService;

    // Add new Food item
    @RequestMapping(value = "/foodItem", method = RequestMethod.POST)
    public FoodItemsEntity addFoodItem(@RequestBody FoodItemsEntity foodItem) throws FoodItemAlreadyExistsException {
        return adminService.addFoodItem(foodItem);
    }
	 @GetMapping("/adminlogin/{emailId}/{password}")
	 public UserEntity loginToMealMate(@PathVariable String emailId,@PathVariable String password) throws InvalidCredentialsException{
	     System.out.println("Credentials"+emailId+password);   
		 return adminService.loginToMealMate(emailId,password);
	    }
	 
    // Get All Food items
    @GetMapping("/foodItems")
    public List<FoodItemsEntity> getAllFoodItems() throws NoFoodItemFoundException {
        return adminService.getAllFoodItems();
    }

    // Update a food item
    @RequestMapping(value = "/foodItem/{id}", method = RequestMethod.PUT)
    public FoodItemsEntity updateFoodItem(@PathVariable("id") String foodItemId,
                                          @RequestBody FoodItemsEntity foodItem) throws FoodItemException {
        return adminService.updateFoodItem(foodItemId, foodItem);
    }

    // Delete a food item
    @RequestMapping(value = "/foodItem/{id}/delete", method = RequestMethod.DELETE)
    public FoodItemsEntity deleteFoodItem(@PathVariable("id") String foodItemId) throws FoodItemException {
        return adminService.deleteFoodItem(foodItemId);
    }

    // Adding a new meal
    @RequestMapping(value = "/meal", method = RequestMethod.POST)
    public MealEntity addNewMeal(@RequestBody MealEntity meal) {
        return adminService.addNewMeal(meal);
    }

    // Delete a meal
    @RequestMapping(value = "/meal/{id}/delete", method = RequestMethod.DELETE)
    public Boolean deleteMeal(@PathVariable("id") String mealId) throws MealsException {
        return adminService.deleteMeal(mealId);
    }

    // Update a meal
    @RequestMapping(value = "/meal/{id}", method = RequestMethod.PUT)
    public MealEntity updateMeal(@PathVariable("id") String mealId, @RequestBody MealEntity meal) throws MealsException {
        return adminService.updateMeal(mealId, meal);
    }

    // Get All Meals
    @GetMapping("/meals")
    public List<MealEntity> getAllMeals() throws NoMealFoundException {
        return adminService.getAllMeals();
    }

    // Add new meal plan
    @RequestMapping(value = "/mealPlan", method = RequestMethod.POST)
    public MealPlanEntity addNewMealPlan(@RequestBody MealPlanEntity mealPlan) {
        return adminService.addNewMealPlan(mealPlan);
    }
 // Get All MealPlans
    @GetMapping("/mealPlans")
    public List<MealPlanEntity> getAllMealPlans() throws NoMealPlanFoundException {
        return adminService.getAllMealPlans();
    }
    // Update a mealPlan
    @RequestMapping(value = "/mealPlan/{id}/update", method = RequestMethod.PUT)
    public MealPlanEntity updateMealPlan(@PathVariable("id") String mealPlanId, @RequestBody MealPlanEntity mealPlan) throws MealPlanException {
        return adminService.updateMealPlan(mealPlanId, mealPlan);
    }
    // Delete a mealPlan
    @RequestMapping(value = "/mealPlan/{id}/delete", method = RequestMethod.DELETE)
    public Boolean deleteMealPlan(@PathVariable("id") String mealPlanId) throws MealPlanException {
        return adminService.deleteMealPlan(mealPlanId);
    }
   

    @GetMapping("/SubscriptionList")
    public List<SubscriptionEntity> getAllSubscriptions() throws NoSubscriptionFoundException {
        return adminService.getAllSubscriptions();
    }
    @GetMapping("/usersList")
    public List<UserEntity> getUsers(@RequestParam(value = "category", defaultValue = "all") String category) throws UserDataNotFoundException {
        return adminService.getUsersByCategory(category);
    }
    @Autowired
    private SubscriptionRepository subscriptionRepository;
    @GetMapping("/user-sales")
	  public ResponseEntity<List<UserSalesReport>> getUserSalesReport(@RequestParam String category) {
	      List<SubscriptionEntity> subscriptions = subscriptionRepository.findAll();
	      Map<String, UserSalesReport> userSalesMap = new HashMap<>();
	      SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd");
	      java.util.Date currentDate = new java.util.Date();
	      // First pass: build the user sales map
	      for (SubscriptionEntity subscription : subscriptions) {
	          UserEntity user = subscription.getUser();
	          if (user != null) {
	              String userId = user.getUserId();
	              String userEmail = user.getEmailId();
	              String userName = user.getName();
	              String dietType = subscription.getDietType();
	              String planDuration = dateFormatter.format(subscription.getStartDate()) + " - " + dateFormatter.format(subscription.getEndDate());
	              UserSalesReport report = userSalesMap.getOrDefault(userId, new UserSalesReport(userId, userName, userEmail, 0.0, "", ""));
	             
	              userSalesMap.put(userId, report);
	          }
	      }
	      // Second pass: filter the reports based on the category and calculate total sales
	      List<UserSalesReport> filteredReports = new ArrayList<>();
	      Set<String> addedUserIds = new HashSet<>();
	      for (SubscriptionEntity subscription : subscriptions) {
	          UserEntity user = subscription.getUser();
	          if (user != null) {
	              String userId = user.getUserId();
	              UserSalesReport report = userSalesMap.get(userId);
	              boolean isActive = subscription.getEndDate().after(currentDate);
	              if ("active".equalsIgnoreCase(category) && isActive) {
	                  if (!addedUserIds.contains(userId)) {
	                      filteredReports.add(report);
	                      addedUserIds.add(userId);
	                  }
	                  report.setTotalSales(report.getTotalSales() + subscription.getPrice());
	                  report.setDietType(report.getDietType() + "\n" + subscription.getDietType());
	                  report.setPlanDuration(report.getPlanDuration() + "\n" + dateFormatter.format(subscription.getStartDate()) + " - " + dateFormatter.format(subscription.getEndDate()));
	              } else if ("expired".equalsIgnoreCase(category) && !isActive) {
	                  if (!addedUserIds.contains(userId)) {
	                      filteredReports.add(report);
	                      addedUserIds.add(userId);
	                  }
	                  report.setTotalSales(report.getTotalSales() + subscription.getPrice());
	                  report.setDietType(report.getDietType() + "\n" + subscription.getDietType());
	                  report.setPlanDuration(report.getPlanDuration() + "\n" + dateFormatter.format(subscription.getStartDate()) + " - " + dateFormatter.format(subscription.getEndDate()));
	              } else if ("all".equalsIgnoreCase(category)) {
	                  if (!addedUserIds.contains(userId)) {
	                      filteredReports.add(report);
	                      addedUserIds.add(userId);
	                  }
	                  report.setTotalSales(report.getTotalSales() + subscription.getPrice());
	                  report.setDietType(report.getDietType() + "\n" + subscription.getDietType());
	                  report.setPlanDuration(report.getPlanDuration() + "\n" + dateFormatter.format(subscription.getStartDate()) + " - " + dateFormatter.format(subscription.getEndDate()));
	              }
	          }
	      }
	      return new ResponseEntity<>(filteredReports, HttpStatus.OK);
	  }
    
    
}
