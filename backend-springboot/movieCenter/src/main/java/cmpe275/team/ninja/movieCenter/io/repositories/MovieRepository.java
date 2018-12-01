package cmpe275.team.ninja.movieCenter.io.repositories;

import cmpe275.team.ninja.movieCenter.io.entity.MovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<MovieEntity, Long> {
    MovieEntity findByMovieId(String publicMovieId);
    List<MovieEntity> findAllByTitleLikeOrActorsLikeOrDirectorLikeOrSynopsisLike(String a, String b, String c, String d);



}
