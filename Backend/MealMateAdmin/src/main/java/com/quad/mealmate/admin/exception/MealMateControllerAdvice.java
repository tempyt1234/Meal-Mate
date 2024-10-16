package com.quad.mealmate.admin.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class MealMateControllerAdvice {
@ExceptionHandler(FoodItemException.class)
public ResponseEntity<String> handleMealMateException(FoodItemException e) {
	return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
}
@ExceptionHandler(MealsException.class)
public ResponseEntity<String> handleMealMateException(MealsException e) {
	return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
}
@ExceptionHandler(MealPlanException.class)
public ResponseEntity<String> handleMealMateException(MealPlanException e) {
	return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
}
@ExceptionHandler(FoodItemAlreadyExistsException.class)
public ResponseEntity<String> handleMealMateException(FoodItemAlreadyExistsException e) {
	return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
}
@ExceptionHandler(NoFoodItemFoundException.class)
public ResponseEntity<String> handleMealMateException(NoFoodItemFoundException e) {
	return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
}
@ExceptionHandler(NoMealFoundException.class)
public ResponseEntity<String> handleMealMateException(NoMealFoundException e) {
	return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
}
@ExceptionHandler(NoMealPlanFoundException.class)
public ResponseEntity<String> handleMealMateException(NoMealPlanFoundException e) {
	return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
}
@ExceptionHandler(UserDataNotFoundException.class)
public ResponseEntity<String> handleUserDataNotFoundException(UserDataNotFoundException e) {
    return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
}
@ExceptionHandler(NoSubscriptionFoundException.class)
public ResponseEntity<String> handleNoSubscriptionFoundException(NoSubscriptionFoundException e) {
    return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
}
@ExceptionHandler(InvalidCredentialsException.class)
public ResponseEntity<String> handleInvalidCredentialsException(InvalidCredentialsException e) {
    return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
}

}
