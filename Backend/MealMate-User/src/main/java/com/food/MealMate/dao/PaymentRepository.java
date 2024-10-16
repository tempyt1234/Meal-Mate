package com.food.MealMate.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.food.MealMate.Entities.PaymentEntity;
import com.food.MealMate.dto.SalesReportDTO;

public interface PaymentRepository extends JpaRepository<PaymentEntity, String> {
	
	 @Query("SELECT new com.food.MealMate.dto.SalesReportDTO(p.paymentId, u.emailId, p.amount, p.dateOfPayment, p.refundStatus, s.dietType) " +
	           "FROM PaymentEntity p " +
	           "JOIN SubscriptionEntity s ON p.userId = s.user.userId " +
	           "JOIN UserEntity u ON s.user.userId = u.userId")
	    List<SalesReportDTO> findSalesReport();

}
