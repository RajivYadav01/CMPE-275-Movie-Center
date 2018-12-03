package cmpe275.team.ninja.movieCenter.service.implementations;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.joda.time.DateTime;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import cmpe275.team.ninja.movieCenter.exceptions.UserServiceException;
import cmpe275.team.ninja.movieCenter.io.entity.MovieEntity;
import cmpe275.team.ninja.movieCenter.io.entity.ReviewEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserEntity;
import cmpe275.team.ninja.movieCenter.io.repositories.MovieRepository;
import cmpe275.team.ninja.movieCenter.io.repositories.ReviewRepository;
import cmpe275.team.ninja.movieCenter.io.repositories.UserRepository;
import cmpe275.team.ninja.movieCenter.service.interfaces.MovieService;
import cmpe275.team.ninja.movieCenter.service.interfaces.ReviewService;
import cmpe275.team.ninja.movieCenter.shared.dto.MovieDto;
import cmpe275.team.ninja.movieCenter.shared.dto.ReviewDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;
import cmpe275.team.ninja.movieCenter.shared.utils.Util;
import cmpe275.team.ninja.movieCenter.ui.model.response.ErrorMessages;

@Service
public class ReviewServiceImpl implements ReviewService{
	
	@Autowired
	ReviewRepository reviewRepository;
	
	@Autowired
    UserRepository userRepository;
	
	@Autowired
	MovieRepository movieRepository;
	
	@Autowired
	MovieService movieService;
	
	@Autowired
    Util util;
    

	@Override
	public ReviewDto createReview(ReviewDto reviewDto) {
		ReviewEntity reviewEntity = new ReviewEntity();
        BeanUtils.copyProperties(reviewDto,reviewEntity);
        UserEntity userEntity = userRepository.findByUserId(reviewDto.getUser().getUserId());
        MovieEntity movieEntity = movieRepository.findByMovieId(reviewDto.getMovieId());

        if (userEntity == null)
			throw new UserServiceException(ErrorMessages.USERID_OR_MOVIEID_NOT_FOUND.getErrorMessage());
		
        reviewEntity.setMovie(movieEntity);
        reviewEntity.setUser(userEntity);
        ReviewEntity storedreviewEntity = reviewRepository.save(reviewEntity);
        ReviewDto returnedreviewDto = new ReviewDto();
        UserDto returnedUserDto = new UserDto();
        BeanUtils.copyProperties(userEntity,returnedUserDto);
        returnedreviewDto.setUser(returnedUserDto);
        returnedreviewDto.setMovieId(reviewDto.getMovieId());
        BeanUtils.copyProperties(storedreviewEntity,returnedreviewDto);
        
        movieService.updateMovieRating(reviewDto.getMovieId(), reviewDto.getRating());
        return returnedreviewDto;
	}


	@Override
	public List<ReviewDto> getReviewByUserId(String userId, int page, int limit) {
		List<ReviewDto> returnValue = new ArrayList<>();
		UserEntity userEntity = userRepository.findByUserId(userId);
		if (userEntity == null)
			throw new UserServiceException(ErrorMessages.USERID_OR_MOVIEID_NOT_FOUND.getErrorMessage());
		
		if(page>0) page = page-1;
		
		Pageable pageableRequest = PageRequest.of(page, limit);
		Page<ReviewEntity> reviewEntity = reviewRepository.findByUserId(userEntity.getId(), pageableRequest);
		
		
		 for (ReviewEntity review : reviewEntity) {
			 	UserDto returnedUserDto = new UserDto();
			 	BeanUtils.copyProperties(userEntity, returnedUserDto);
			 	ReviewDto returnedreviewDto = new ReviewDto();

	            BeanUtils.copyProperties(review, returnedreviewDto);
				returnedreviewDto.setUser(returnedUserDto);
				returnedreviewDto.setMovieId(review.getMovie().getMovieId());
	            returnValue.add(returnedreviewDto);
	        }

        return returnValue;
	}


	@Override
	public List<ReviewDto> getReviewByMovieId(String movieId, int page, int limit) {
		List<ReviewDto> returnValue = new ArrayList<>();
		MovieEntity movieEntity = movieRepository.findByMovieId(movieId);
		if (movieEntity == null)
			throw new UserServiceException(ErrorMessages.USERID_OR_MOVIEID_NOT_FOUND.getErrorMessage());
		
		if(page>0) page = page-1;
		
		Pageable pageableRequest = PageRequest.of(page, limit);
		Page<ReviewEntity> reviewEntity = reviewRepository.findByMovieId(movieEntity.getId(), pageableRequest);
		
		 for (ReviewEntity review : reviewEntity) {
			 	UserDto returnedUserDto = new UserDto();
			 	BeanUtils.copyProperties(review.getUser(), returnedUserDto);
			 	ReviewDto returnedreviewDto = new ReviewDto();
				returnedreviewDto.setUser(returnedUserDto);
	            returnedreviewDto.setMovieId(review.getMovie().getMovieId());
	            BeanUtils.copyProperties(review, returnedreviewDto);
	            returnValue.add(returnedreviewDto);
	        }

        return returnValue;
	}


	@Override
	public List<MovieDto> getTopTenMoviesByRatings(String period) {
		Date currentDate = new Date();
		Date previousDayDate = util.getPreviousDateByPeriod(period, currentDate);
		List<Object[]> topMovies = reviewRepository.findTopTenMoviesByReviews(previousDayDate, currentDate);
		if(topMovies == null || topMovies.size() == 0)
            return new ArrayList<>();
		List<MovieDto> movieDtos = new ArrayList<>();
        ModelMapper modelMapper = new ModelMapper();
        topMovies.forEach(movieid->{
            movieDtos.add(modelMapper.map(movieRepository.findByMovieId(String.valueOf(movieid[0])), MovieDto.class));
        });

        return  movieDtos;
	}

}
