package cmpe275.team.ninja.movieCenter.io.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import cmpe275.team.ninja.movieCenter.io.entity.RatingsEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserEntity;

@Repository
public interface RatingsRepository extends PagingAndSortingRepository<RatingsEntity, Long> {
	Page<RatingsEntity> findByUserId(UserEntity id, Pageable pageable);

}
