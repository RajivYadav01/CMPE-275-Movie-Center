package cmpe275.team.ninja.movieCenter.service.interfaces;

import cmpe275.team.ninja.movieCenter.shared.dto.MovieDto;
import java.util.List;

public interface MovieService {
    List<MovieDto> getAllMovies();
}