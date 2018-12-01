package cmpe275.team.ninja.movieCenter.io.repositories;

import cmpe275.team.ninja.movieCenter.io.entity.UserEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserSubscriptionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface UserSubscriptionRepository extends JpaRepository<UserSubscriptionEntity, Long> {
    UserSubscriptionEntity findByUserAndEndDateAfter(UserEntity userEntity, Date date);
}
