package cmpe275.team.ninja.movieCenter.service.interfaces;

import java.util.List;

import cmpe275.team.ninja.movieCenter.shared.dto.MovieDto;
import cmpe275.team.ninja.movieCenter.shared.dto.ReviewDto;

public interface ReviewService {
	ReviewDto createReview(ReviewDto reviewDto);
	List<ReviewDto> getReviewByUserId(String userId, int page, int limit);
	List<ReviewDto> getReviewByMovieId(String movieId, int page, int limit);
	List<MovieDto> getTopTenMoviesByRatings(String period);

}
