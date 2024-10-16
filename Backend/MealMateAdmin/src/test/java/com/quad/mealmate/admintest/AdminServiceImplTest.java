package com.quad.mealmate.admintest;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.quad.mealmate.admin.AdminServiceImpl;
import com.quad.mealmate.admin.dao.FoodItemsRepository;
import com.quad.mealmate.admin.dao.MealPlanRepository;
import com.quad.mealmate.admin.dao.MealRepository;
import com.quad.mealmate.admin.entities.FoodItemsEntity;
import com.quad.mealmate.admin.entities.MealEntity;
import com.quad.mealmate.admin.entities.MealPlanEntity;
import com.quad.mealmate.admin.exception.FoodItemAlreadyExistsException;
import com.quad.mealmate.admin.exception.FoodItemException;
import com.quad.mealmate.admin.exception.MealPlanException;
import com.quad.mealmate.admin.exception.MealsException;
import com.quad.mealmate.admin.exception.NoFoodItemFoundException;
import com.quad.mealmate.admin.exception.NoMealFoundException;
import com.quad.mealmate.admin.exception.NoMealPlanFoundException;

public class AdminServiceImplTest {

    @InjectMocks
    private AdminServiceImpl adminService;

    @Mock
    private FoodItemsRepository foodItemsRepository;
    
    @Mock
    private MealRepository mealRepository;
    @Mock
    private MealPlanRepository mealPlanRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // Test for adding a food item
    @Test
    public void testAddFoodItem_Success() throws FoodItemAlreadyExistsException {
        FoodItemsEntity newFoodItem = new FoodItemsEntity();
        newFoodItem.setName("Pasta");
        
        when(foodItemsRepository.findByName(any(String.class))).thenReturn(Optional.empty());
        when(foodItemsRepository.save(any(FoodItemsEntity.class))).thenReturn(newFoodItem);

        FoodItemsEntity addedFoodItem = adminService.addFoodItem(newFoodItem);

        assertNotNull(addedFoodItem);
        assertEquals(newFoodItem.getName(), addedFoodItem.getName());
        verify(foodItemsRepository).findByName(newFoodItem.getName());
        verify(foodItemsRepository).save(newFoodItem);
    }

    @Test
    public void testAddFoodItem_FoodItemAlreadyExists() {
        FoodItemsEntity existingFoodItem = new FoodItemsEntity();
        existingFoodItem.setName("Pasta");

        when(foodItemsRepository.findByName(any(String.class))).thenReturn(Optional.of(existingFoodItem));

        assertThrows(FoodItemAlreadyExistsException.class, () -> {
            adminService.addFoodItem(existingFoodItem);
        });

        verify(foodItemsRepository).findByName(existingFoodItem.getName());
        verify(foodItemsRepository, never()).save(any(FoodItemsEntity.class));
    }

    // Test for getting all food items
    @Test
    public void testGetAllFoodItems_Success() throws NoFoodItemFoundException {
        FoodItemsEntity foodItem1 = new FoodItemsEntity();
        foodItem1.setName("Pasta");

        FoodItemsEntity foodItem2 = new FoodItemsEntity();
        foodItem2.setName("Pizza");

        when(foodItemsRepository.findAll()).thenReturn(Arrays.asList(foodItem1, foodItem2));

        List<FoodItemsEntity> foodItems = adminService.getAllFoodItems();

        assertNotNull(foodItems);
        assertEquals(2, foodItems.size());
        verify(foodItemsRepository).findAll();
    }

    @Test
    public void testGetAllFoodItems_NoFoodItemFound() {
        when(foodItemsRepository.findAll()).thenReturn(Arrays.asList());

        assertThrows(NoFoodItemFoundException.class, () -> {
            adminService.getAllFoodItems();
        });

        verify(foodItemsRepository).findAll();
    }

    // Test for updating a food item
    @Test
    public void testUpdateFoodItem_Success() throws FoodItemException {
        FoodItemsEntity existingFoodItem = new FoodItemsEntity();
        existingFoodItem.setFoodItemId("1");
        existingFoodItem.setName("Pasta");

        FoodItemsEntity updatedFoodItem = new FoodItemsEntity();
        updatedFoodItem.setName("Updated Pasta");
        updatedFoodItem.setDescription("Delicious updated pasta");

        when(foodItemsRepository.findById(anyString())).thenReturn(Optional.of(existingFoodItem));
        when(foodItemsRepository.save(any(FoodItemsEntity.class))).thenReturn(updatedFoodItem);

        FoodItemsEntity result = adminService.updateFoodItem("1", updatedFoodItem);

        assertNotNull(result);
        assertEquals(updatedFoodItem.getName(), result.getName());
        verify(foodItemsRepository).findById("1");
        verify(foodItemsRepository).save(any(FoodItemsEntity.class));
    }

    @Test
    public void testUpdateFoodItem_FoodItemNotFound() {
        FoodItemsEntity updatedFoodItem = new FoodItemsEntity();
        updatedFoodItem.setName("Updated Pasta");

        when(foodItemsRepository.findById(anyString())).thenReturn(Optional.empty());

        assertThrows(FoodItemException.class, () -> {
            adminService.updateFoodItem("1", updatedFoodItem);
        });

        verify(foodItemsRepository).findById("1");
        verify(foodItemsRepository, never()).save(any(FoodItemsEntity.class));
    }

    // Test for deleting a food item
    @Test
    public void testDeleteFoodItem_Success() throws FoodItemException {
        FoodItemsEntity existingFoodItem = new FoodItemsEntity();
        existingFoodItem.setFoodItemId("1");
        existingFoodItem.setName("Pasta");

        when(foodItemsRepository.findById(anyString())).thenReturn(Optional.of(existingFoodItem));

        FoodItemsEntity result = adminService.deleteFoodItem("1");

        assertNotNull(result);
        assertEquals(existingFoodItem.getName(), result.getName());
        verify(foodItemsRepository).findById("1");
        verify(foodItemsRepository).deleteById("1");
    }
 // Test for getting all meal plans
    @Test
    public void testGetAllMealPlans_Success() throws NoMealPlanFoundException {
        MealPlanEntity mealPlan1 = new MealPlanEntity();
        mealPlan1.setMealPlanId("1");
        mealPlan1.setDietType("Vegan");
        
        MealPlanEntity mealPlan2 = new MealPlanEntity();
        mealPlan2.setMealPlanId("2");
        mealPlan2.setDietType("Vegetarian");

        when(mealPlanRepository.findAll()).thenReturn(Arrays.asList(mealPlan1, mealPlan2));

        List<MealPlanEntity> mealPlans = adminService.getAllMealPlans();

        assertNotNull(mealPlans);
        assertEquals(2, mealPlans.size()); // Ensure this matches the number of meal plans you provided
        verify(mealPlanRepository).findAll();
    }
    @Test
    public void testGetAllMealPlans_NoMealPlansAvailable() {
        when(mealPlanRepository.findAll()).thenReturn(Arrays.asList());

        assertThrows(NoMealPlanFoundException.class, () -> {
            adminService.getAllMealPlans();
        });

        verify(mealPlanRepository).findAll();
    }
    

    @Test
    public void testGetMealPlanById_NotFound() {
        when(mealPlanRepository.findById(anyString())).thenReturn(Optional.empty());

        assertThrows(NoMealPlanFoundException.class, () -> {
            adminService.getMealPlanById("1");
        });

        verify(mealPlanRepository).findById("1");
    }

    // Test for deleting a meal plan
    @Test
    public void testDeleteMealPlan_Success() throws MealPlanException {
        MealPlanEntity existingMealPlan = new MealPlanEntity();
        existingMealPlan.setMealPlanId("1");
        existingMealPlan.setDietType("Vegan");

        when(mealPlanRepository.findById(anyString())).thenReturn(Optional.of(existingMealPlan));

        Boolean result = adminService.deleteMealPlan("1");

        assertNotNull(result);
        assertEquals(true, result);
        verify(mealPlanRepository).findById("1");
        verify(mealPlanRepository).deleteById("1");
    }

    @Test
    public void testDeleteMealPlan_NotFound() {
        when(mealPlanRepository.findById(anyString())).thenReturn(Optional.empty());

        assertThrows(MealPlanException.class, () -> {
            adminService.deleteMealPlan("1");
        });

        verify(mealPlanRepository).findById("1");
        verify(mealPlanRepository, never()).deleteById(anyString());
    }

    @Test
    public void testDeleteFoodItem_FoodItemNotFound() {
        when(foodItemsRepository.findById(anyString())).thenReturn(Optional.empty());

        assertThrows(FoodItemException.class, () -> {
            adminService.deleteFoodItem("1");
        });

        verify(foodItemsRepository).findById("1");
        verify(foodItemsRepository, never()).deleteById(anyString());
    }
    
    // Test for adding a meal
    @Test
    public void testAddMeal_Success() {
        MealEntity newMeal = new MealEntity();
        newMeal.setMealId("1");
        newMeal.setMealPrice(10.0);
        newMeal.setFoodItems(Arrays.asList(new FoodItemsEntity()));

        when(mealRepository.save(any(MealEntity.class))).thenReturn(newMeal);

        MealEntity addedMeal = adminService.addNewMeal(newMeal);

        assertNotNull(addedMeal);
        assertEquals(newMeal.getMealId(), addedMeal.getMealId());
        verify(mealRepository).save(newMeal);
    }

    // Test for getting all meals
    @Test
    public void testGetAllMeals_Success() throws NoMealFoundException {
        MealEntity meal1 = new MealEntity();
        meal1.setMealId("1");
        meal1.setMealPrice(10.0);

        MealEntity meal2 = new MealEntity();
        meal2.setMealId("2");
        meal2.setMealPrice(15.0);

        when(mealRepository.findAll()).thenReturn(Arrays.asList(meal1, meal2));

        List<MealEntity> meals = adminService.getAllMeals();

        assertNotNull(meals);
        assertEquals(2, meals.size());
        verify(mealRepository).findAll();
    }
 // Test for getting all meals

    @Test
    public void testGetAllMeals_NoMealsAvailable() {
        when(mealRepository.findAll()).thenReturn(Arrays.asList());

        List<MealEntity> meals = adminService.getAllMeals();

        assertNotNull(meals);
        assertTrue(meals.isEmpty(), "The meals list should be empty when no meals are available.");
        verify(mealRepository).findAll();
    }

    // Test for updating a meal
    @Test
    public void testUpdateMeal_Success() throws MealsException {
        MealEntity existingMeal = new MealEntity();
        existingMeal.setMealId("1");
        existingMeal.setMealPrice(10.0);

        MealEntity updatedMeal = new MealEntity();
        updatedMeal.setMealPrice(12.0);
        updatedMeal.setFoodItems(Arrays.asList(new FoodItemsEntity()));

        when(mealRepository.findById(anyString())).thenReturn(Optional.of(existingMeal));
        when(mealRepository.save(any(MealEntity.class))).thenReturn(updatedMeal);

        MealEntity result = adminService.updateMeal("1", updatedMeal);

        assertNotNull(result);
        assertEquals(updatedMeal.getMealPrice(), result.getMealPrice());
        verify(mealRepository).findById("1");
        verify(mealRepository).save(any(MealEntity.class));
    }

    @Test
    public void testUpdateMeal_MealNotFound() {
        MealEntity updatedMeal = new MealEntity();
        updatedMeal.setMealPrice(12.0);

        when(mealRepository.findById(anyString())).thenReturn(Optional.empty());

        assertThrows(MealsException.class, () -> {
            adminService.updateMeal("1", updatedMeal);
        });

        verify(mealRepository).findById("1");
        verify(mealRepository, never()).save(any(MealEntity.class));
    }

    // Test for deleting a meal
    @Test
    public void testDeleteMeal_Success() throws MealsException {
        MealEntity existingMeal = new MealEntity();
        existingMeal.setMealId("1");
        existingMeal.setMealPrice(10.0);

        when(mealRepository.findById(anyString())).thenReturn(Optional.of(existingMeal));

        Boolean result = adminService.deleteMeal("1");

        assertTrue(result);
        verify(mealRepository).findById("1");
        verify(mealRepository).deleteById("1");
    }

    @Test
    public void testDeleteMeal_MealNotFound() {
        when(mealRepository.findById(anyString())).thenReturn(Optional.empty());

        assertThrows(MealsException.class, () -> {
            adminService.deleteMeal("1");
        });

        verify(mealRepository).findById("1");
        verify(mealRepository, never()).deleteById(anyString());
    }
    
    
    
 // Test for adding a meal plan
    @Test
    public void testAddNewMealPlan_Success() {
        MealPlanEntity newMealPlan = new MealPlanEntity();
        newMealPlan.setMealPlanId("1");
        newMealPlan.setDietType("Vegan");
        newMealPlan.setMealplanPrice("50.0");

        when(mealPlanRepository.save(any(MealPlanEntity.class))).thenReturn(newMealPlan);

        MealPlanEntity addedMealPlan = adminService.addNewMealPlan(newMealPlan);

        assertNotNull(addedMealPlan);
        assertEquals(newMealPlan.getMealPlanId(), addedMealPlan.getMealPlanId());
        verify(mealPlanRepository).save(newMealPlan);
    }

    // Test for getting all meal plans


    // Test for updating a meal plan
    @Test
    public void testUpdateMealPlan_Success() throws MealPlanException {
        MealPlanEntity existingMealPlan = new MealPlanEntity();
        existingMealPlan.setMealPlanId("1");
        existingMealPlan.setDietType("Vegan");

        MealPlanEntity updatedMealPlan = new MealPlanEntity();
        updatedMealPlan.setDietType("Updated Vegan");
        updatedMealPlan.setMealplanPrice("55.0");

        when(mealPlanRepository.findById(anyString())).thenReturn(Optional.of(existingMealPlan));
        when(mealPlanRepository.save(any(MealPlanEntity.class))).thenReturn(updatedMealPlan);

        MealPlanEntity result = adminService.updateMealPlan("1", updatedMealPlan);

        assertNotNull(result);
        assertEquals(updatedMealPlan.getDietType(), result.getDietType());
        verify(mealPlanRepository).findById("1");
        verify(mealPlanRepository).save(any(MealPlanEntity.class));
    }

    @Test
    public void testUpdateMealPlan_MealPlanNotFound() {
        MealPlanEntity updatedMealPlan = new MealPlanEntity();
        updatedMealPlan.setDietType("Updated Vegan");

        when(mealPlanRepository.findById(anyString())).thenReturn(Optional.empty());

        assertThrows(MealPlanException.class, () -> {
            adminService.updateMealPlan("1", updatedMealPlan);
        });

        verify(mealPlanRepository).findById("1");
        verify(mealPlanRepository, never()).save(any(MealPlanEntity.class));
    }



}
