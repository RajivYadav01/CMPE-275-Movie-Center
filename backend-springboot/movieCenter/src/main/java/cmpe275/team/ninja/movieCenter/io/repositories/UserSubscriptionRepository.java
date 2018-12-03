package cmpe275.team.ninja.movieCenter.io.repositories;

import cmpe275.team.ninja.movieCenter.io.entity.UserEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserSubscriptionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;

public interface UserSubscriptionRepository extends JpaRepository<UserSubscriptionEntity, Long> {
    UserSubscriptionEntity findByUserAndEndDateAfter(UserEntity userEntity, Date date);

    @Query(
            value = "select count(distinct(user_id)) from user_subscription\n" +
                    "where start_date between :startdate and :enddate\n" +
                    "or end_date between :startdate and :enddate\n" +
                    "or (start_date < :startdate and end_date > :enddate)",
            nativeQuery = true
    )
    Object getUniqueSubscriptionUserByMonth(@Param("startdate") Date startDate,
                                            @Param("enddate") Date endDate);
}
