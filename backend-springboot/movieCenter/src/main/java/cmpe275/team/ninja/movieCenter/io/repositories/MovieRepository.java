package cmpe275.team.ninja.movieCenter.io.repositories;

import cmpe275.team.ninja.movieCenter.io.entity.MovieEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MovieRepository extends CrudRepository<MovieEntity, Long> {
    MovieEntity findByMovieId(String publicMovieId);
    MovieEntity findByTitle(String title);
}
