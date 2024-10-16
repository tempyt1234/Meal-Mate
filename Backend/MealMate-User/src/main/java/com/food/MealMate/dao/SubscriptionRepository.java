package com.food.MealMate.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.food.MealMate.Entities.SubscriptionEntity;

public interface SubscriptionRepository extends JpaRepository<SubscriptionEntity, String>{

	
	
	 @Query("SELECT s FROM SubscriptionEntity s WHERE s.user.userId = :userId")
	    List<SubscriptionEntity> findByUserId(@Param("userId") String userId);

	 

}
