package cmpe275.team.ninja.movieCenter.io.repositories;

import cmpe275.team.ninja.movieCenter.io.entity.MovieEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserMoviePlayHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMoviePlayHistoryRepository extends JpaRepository<UserMoviePlayHistoryEntity, Long> {
    UserMoviePlayHistoryEntity findByUserAndMovie(UserEntity userEntity, MovieEntity movieEntity);
    List<UserMoviePlayHistoryEntity> findDistinctByUserOrderByStartTimeDesc(UserEntity userEntity);
}
