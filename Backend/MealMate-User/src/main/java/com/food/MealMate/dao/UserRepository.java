package com.food.MealMate.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.food.MealMate.Entities.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, String> {

	    @Query("SELECT u FROM UserEntity u WHERE EXISTS (SELECT s FROM SubscriptionEntity s WHERE s.user = u)")
	    List<UserEntity> findBySubscriptionIsNotNull();

	    
	    @Query("SELECT u FROM UserEntity u WHERE NOT EXISTS (SELECT s FROM SubscriptionEntity s WHERE s.user = u)")
	    List<UserEntity> findBySubscriptionIsNull();


		UserEntity findByEmailId(String emailId);

	
	
	



}
