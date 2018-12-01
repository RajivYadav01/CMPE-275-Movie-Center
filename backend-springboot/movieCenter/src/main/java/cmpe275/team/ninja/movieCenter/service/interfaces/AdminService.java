package cmpe275.team.ninja.movieCenter.service.interfaces;

import cmpe275.team.ninja.movieCenter.shared.dto.MovieDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;

import java.util.List;

public interface AdminService {
    MovieDto createMovie(MovieDto movieDto);
    MovieDto updateMovie(String publicMovieId, MovieDto movieDtoToUpdate);
    void deleteMovie(String id);
    List<MovieDto> getMoviePlayingHistoryForUser(String id);
    List<UserDto> getTopTenUsersByPeriod(String period);
}
