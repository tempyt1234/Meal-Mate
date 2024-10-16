package com.food.MealMate.exception;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
@RestControllerAdvice
public class GlobalExceptionHandler {

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