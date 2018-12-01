package cmpe275.team.ninja.movieCenter.service.interfaces;

import cmpe275.team.ninja.movieCenter.shared.dto.MovieDto;
import java.util.List;

public interface MovieService {
    List<MovieDto> getAllMovies();
    MovieDto getMovieById(String id);
    List<MovieDto> getMoviesBySearch(String searchtext);
    boolean updateMovieRating(String id, double rating);

}
