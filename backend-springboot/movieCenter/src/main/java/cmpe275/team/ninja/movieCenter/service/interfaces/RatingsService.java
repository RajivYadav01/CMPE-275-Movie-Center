package cmpe275.team.ninja.movieCenter.service.interfaces;

import java.util.List;

import cmpe275.team.ninja.movieCenter.shared.dto.RatingsDto;

public interface RatingsService {
	RatingsDto createRating(RatingsDto ratingsDto);
	List<RatingsDto> getRatingsByUserId(String userId, int page, int limit);
	List<RatingsDto> getRatingsByMovieId(String movieId, int page, int limit);

}
