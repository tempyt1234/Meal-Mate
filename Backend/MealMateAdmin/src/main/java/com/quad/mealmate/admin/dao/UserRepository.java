package com.quad.mealmate.admin.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.quad.mealmate.admin.entities.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    
	UserEntity findByEmailId(String emailId);
	
	@Query("SELECT u FROM UserEntity u WHERE EXISTS (SELECT s FROM SubscriptionEntity s WHERE s.user = u)")
    List<UserEntity> findBySubscriptionIsNotNull();
   
    @Query("SELECT u FROM UserEntity u WHERE NOT EXISTS (SELECT s FROM SubscriptionEntity s WHERE s.user = u)")
    List<UserEntity> findBySubscriptionIsNull();

}
