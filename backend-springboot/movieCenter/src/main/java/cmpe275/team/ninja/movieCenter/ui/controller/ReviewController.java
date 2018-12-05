package cmpe275.team.ninja.movieCenter.ui.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cmpe275.team.ninja.movieCenter.service.interfaces.ReviewService;
import cmpe275.team.ninja.movieCenter.shared.dto.MovieDto;
import cmpe275.team.ninja.movieCenter.shared.dto.ReviewDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;
import cmpe275.team.ninja.movieCenter.ui.model.request.ReviewRequestModel;
import cmpe275.team.ninja.movieCenter.ui.model.response.MovieDetailsResponseModel;
import cmpe275.team.ninja.movieCenter.ui.model.response.ReviewResponseModel;


@RestController
@RequestMapping("reviews")
public class ReviewController {
	@Autowired
	ReviewService reviewService;
	
	@GetMapping(produces = { MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE })
    public List<ReviewResponseModel> getRatingsByUserOrMovie(@RequestParam(value = "userid", required = false) String userId, @RequestParam(value = "movieid", required = false) String movieId, @RequestParam(value = "page", defaultValue = "0") int page,
			@RequestParam(value = "limit", defaultValue = "4") int limit) throws Exception{
    	List<ReviewResponseModel> returnValue = new ArrayList<>();
    	List<ReviewDto> reviewDto = new ArrayList<>();
    	if(userId != null && movieId == null) {
    		reviewDto = reviewService.getReviewByUserId(userId, page, limit);
    	} else if(userId == null && movieId != null) {
    		reviewDto = reviewService.getReviewByMovieId(movieId, page, limit);
    	}
    		
		for (ReviewDto rating : reviewDto) {
			ReviewResponseModel reviewModel = new ReviewResponseModel();
			BeanUtils.copyProperties(rating, reviewModel);
			reviewModel.setUserId(rating.getUser().getUserId());
			reviewModel.setUserFirstName(rating.getUser().getFirstName());
			reviewModel.setUserLastName(rating.getUser().getLastName());
			reviewModel.setUserDisplayName(rating.getUser().getDisplayName());
			reviewModel.setMovieId(rating.getMovieId());
			returnValue.add(reviewModel);
		}
		return returnValue;
    }
	
	@GetMapping(
			path="/toptenmoviebyratings",
			produces = { MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE })
    public List<MovieDetailsResponseModel> getTopTenMoviesByRatings(@RequestParam("period") String period) throws Exception{
		List<MovieDetailsResponseModel> responseModels = new ArrayList<>();
        List<MovieDto> movieDtos = reviewService.getTopTenMoviesByRatings(period);
        if(movieDtos == null)
            return new ArrayList<MovieDetailsResponseModel>();
        ModelMapper modelMapper = new ModelMapper();
        movieDtos.forEach(movieDto -> {
            responseModels.add(modelMapper.map(movieDto, MovieDetailsResponseModel.class));
        });
        return responseModels;
    }
	
	
	@PostMapping(consumes = { MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE }, produces = {
    		MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE })
    public ReviewResponseModel createRating(@RequestBody ReviewRequestModel reviewRequestModel) throws Exception{
		ReviewDto reviewDto = new ReviewDto();
        UserDto userDto= new UserDto();
        userDto.setUserId(reviewRequestModel.getUserId());
        BeanUtils.copyProperties(reviewRequestModel,reviewDto);
        reviewDto.setUser(userDto);

        ReviewDto createdRating = reviewService.createReview(reviewDto);

        ReviewResponseModel reviewResponseModel = new ReviewResponseModel();
        BeanUtils.copyProperties(createdRating,reviewResponseModel);
        reviewResponseModel.setUserId(createdRating.getUser().getUserId());
        reviewResponseModel.setUserFirstName(createdRating.getUser().getFirstName());
        reviewResponseModel.setUserLastName(createdRating.getUser().getLastName());
        return reviewResponseModel;
    }

}
