package cmpe275.team.ninja.movieCenter.io.repositories;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import cmpe275.team.ninja.movieCenter.io.entity.ReviewEntity;

@Repository
public interface ReviewRepository extends PagingAndSortingRepository<ReviewEntity, Long> {
	Page<ReviewEntity> findByUserId(long id, Pageable pageable);
	Page<ReviewEntity> findByMovieId(long id, Pageable pageable);
	
	@Query(
            value = "select m.movie_id, avg(r.rating) as avg_rating from reviews as r\n" +
                    "inner join movies as m\n" +
                    "on r.movie_id = m.id\n" +
                    "where r.create_date_time between :lastdate and :currentdate\n" +
                    "group by r.movie_id\n" +
                    "order by avg_rating desc limit 10;",
            nativeQuery = true
    )
    List<Object[]> findTopTenMoviesByReviews(@Param("lastdate") Date lastDate,
                                                   @Param("currentdate") Date currentDate);

}
