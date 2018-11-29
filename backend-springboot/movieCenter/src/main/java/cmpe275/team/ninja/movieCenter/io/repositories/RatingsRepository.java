package cmpe275.team.ninja.movieCenter.io.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import cmpe275.team.ninja.movieCenter.io.entity.RatingsEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserEntity;

@Repository
public interface RatingsRepository extends PagingAndSortingRepository<RatingsEntity, Long> {

}
