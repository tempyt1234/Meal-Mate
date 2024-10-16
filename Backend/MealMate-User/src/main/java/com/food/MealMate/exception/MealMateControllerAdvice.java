package com.food.MealMate.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestControllerAdvice;
@RestControllerAdvice
public class MealMateControllerAdvice {
//@ExceptionHandler(FoodItemException.class)
//public ResponseEntity<String> handleMealMateException(FoodItemException e) {
//	return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
//}
//@ExceptionHandler(MealsException.class)
//public ResponseEntity<String> handleMealMateException(MealsException e) {
//	return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
//}
//@ExceptionHandler(MealPlanException.class)
//public ResponseEntity<String> handleMealMateException(MealPlanException e) {
//	return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
//}
//@ExceptionHandler(FoodItemAlreadyExistsException.class)
//public ResponseEntity<String> handleMealMateException(FoodItemAlreadyExistsException e) {
//	return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
//}
//@ExceptionHandler(NoFoodItemFoundException.class)
//public ResponseEntity<String> handleMealMateException(NoFoodItemFoundException e) {
//	return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
//}
//@ExceptionHandler(NoMealFoundException.class)
//public ResponseEntity<String> handleMealMateException(NoMealFoundException e) {
//	return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
//}
//@ExceptionHandler(NoMealPlanFoundException.class)
//public ResponseEntity<String> handleMealMateException(NoMealPlanFoundException e) {
//	return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
//}
	
	@ExceptionHandler(UserDataNotFoundException.class)
	public ResponseEntity<String> handleUserDataNotFoundException(UserDataNotFoundException e) {
	    return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
	}
	
	
	
	
	@ExceptionHandler(NoSubscriptionFoundException.class)
	public ResponseEntity<String> handleNoSubscriptionFoundException(NoSubscriptionFoundException e) {
	    return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
	}
	
	
	
	
	@ExceptionHandler(MealPlanNotFoundException.class)
	public ResponseEntity<String> handleMealPlanNotFoundException(MealPlanNotFoundException e) {
	    return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
	}

	
	
	
	@ExceptionHandler(PaymentProcessingException.class)
	public ResponseEntity<String> handlePaymentProcessingException(PaymentProcessingException e) {
	    return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}

	
	
	@ExceptionHandler(SubscriptionCreationException.class)
	public ResponseEntity<String> handleSubscriptionCreationException(SubscriptionCreationException e) {
	    return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(SubscriptionNotFoundException.class)
	public ResponseEntity<String> handleSubscriptionNotFoundException(SubscriptionNotFoundException e) {
	    return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
	}

	
	@ExceptionHandler(UserRegistrationException.class)
	public ResponseEntity<String> handleUserRegistrationException(UserRegistrationException e) {
	    return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
	}


	
	@ExceptionHandler(NoUserFoundException.class)
	public ResponseEntity<String> handleNoUserFoundException(NoUserFoundException e) {
	    return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(EmailIdAlreadyExistsException.class)
	public ResponseEntity<String> handleMealMateException(EmailIdAlreadyExistsException e) {
	    System.out.println("Handling EmailIdAlreadyExistsException");
	    return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
	}
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<String> handleMealMateException(UserNotFoundException e) {
	    return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
	}
	@ExceptionHandler(InvalidCredentialsException.class)
	public ResponseEntity<String> handleMealMateException(InvalidCredentialsException e) {
		System.out.println(e.getMessage());
	    return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
	}
	@ExceptionHandler(InvalidInputException.class)
    public ResponseEntity<String> handleInvalidInputException(InvalidInputException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidOtpException.class)
    public ResponseEntity<String> handleInvalidOtpException(InvalidOtpException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    } 
    @ExceptionHandler(OtpExpiredException.class)
    public ResponseEntity<String> handleOtpExpiredException(OtpExpiredException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmailNotSentException.class)
    public ResponseEntity<String> handleEmailNotSentException(EmailNotSentException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

	
}











