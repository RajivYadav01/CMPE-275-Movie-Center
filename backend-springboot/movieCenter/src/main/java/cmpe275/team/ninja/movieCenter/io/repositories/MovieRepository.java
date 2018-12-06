package cmpe275.team.ninja.movieCenter.io.repositories;

import cmpe275.team.ninja.movieCenter.io.entity.MovieEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<MovieEntity, Long> {
    MovieEntity findByMovieId(String publicMovieId);
    List<MovieEntity> findAllByTitleLikeOrActorsLikeOrDirectorLikeOrSynopsisLikeOrActressesLikeOrGenreLikeOrStudioNameLikeOrCountryLikeOrAvailabilityTypeLike(String title,
            String actor,
            String director,
            String synopsis,
            String actress,
            String genre,
            String studio,
            String country,
            String availability);    

}
