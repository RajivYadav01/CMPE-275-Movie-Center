package cmpe275.team.ninja.movieCenter.io.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import cmpe275.team.ninja.movieCenter.io.entity.ReviewEntity;

@Repository
public interface ReviewRepository extends PagingAndSortingRepository<ReviewEntity, Long> {
	Page<ReviewEntity> findByUserId(long id, Pageable pageable);
	Page<ReviewEntity> findByMovieId(long id, Pageable pageable);

}
