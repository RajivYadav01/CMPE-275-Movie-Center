package cmpe275.team.ninja.movieCenter.service.interfaces;

import java.util.List;

import cmpe275.team.ninja.movieCenter.shared.dto.MovieDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;


import java.util.Map;

public interface AdminService {
	MovieDto createMovie(MovieDto movieDto);
    MovieDto updateMovie(String publicMovieId, MovieDto movieDtoToUpdate);
    void deleteMovie(String id);
    List<MovieDto> getMoviePlayingHistoryForUser(String id);
    List<UserDto> getTopTenUsersByPeriod(String period);
    int getNumberOfPlaysForMovie(String movieid, String period);
    List<MovieDto> getTopTenMoviesByPeriod(String period);
    Map<String, Integer> getMonthlyUserReport(String reportType);
    Map<String, Double> getMonthlyIncomeReport(String reportType);
}
