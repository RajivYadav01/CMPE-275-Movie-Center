package cmpe275.team.ninja.movieCenter.service.interfaces;

import cmpe275.team.ninja.movieCenter.shared.dto.MovieDto;

public interface AdminService {
    MovieDto createMovie(MovieDto movieDto);
    MovieDto updateMovie(String publicMovieId, MovieDto movieDtoToUpdate);
    void deleteMovie(String id);
}