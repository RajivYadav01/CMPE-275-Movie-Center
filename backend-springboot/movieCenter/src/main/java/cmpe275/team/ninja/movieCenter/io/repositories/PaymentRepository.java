package cmpe275.team.ninja.movieCenter.io.repositories;

import cmpe275.team.ninja.movieCenter.io.entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {

    @Query(
            value = "select sum(amount) from payments\n" +
                    "where payment_type = :paymenttype and \n" +
                    "payment_date between :startdate and :enddate\n",
            nativeQuery = true
    )
    Object getMonthlySubscriptionIncome(@Param("paymenttype") String paymentType,
                                        @Param("startdate") Date startDate,
                                        @Param("enddate")Date endDate);

    @Query(
            value = "select sum(amount) from payments\n" +
                    "where payment_date between :startdate and :enddate\n",
            nativeQuery = true
    )
    Object getMonthlyTotalIncome(@Param("startdate") Date startDate,
                                 @Param("enddate")Date endDate);
}
