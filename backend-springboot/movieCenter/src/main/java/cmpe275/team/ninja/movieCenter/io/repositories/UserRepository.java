package cmpe275.team.ninja.movieCenter.io.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import cmpe275.team.ninja.movieCenter.io.entity.UserEntity;

import java.util.Date;

@Repository
public interface UserRepository extends PagingAndSortingRepository<UserEntity, Long> {
	UserEntity findByEmail(String email);
	UserEntity findByUserId(String userId);
	UserEntity findUserByEmailVerificationToken(String token);
	@Query(
			value = "select count(distinct(id)) from users\n" +
					"where created_date between :startdate and :enddate",
			nativeQuery = true
	)
	Object getUniqueRegisteredUsers(@Param("startdate") Date startDate,
									@Param("enddate") Date endDate);
}
