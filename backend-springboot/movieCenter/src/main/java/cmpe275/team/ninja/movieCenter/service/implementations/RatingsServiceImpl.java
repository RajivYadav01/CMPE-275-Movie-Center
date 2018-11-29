package cmpe275.team.ninja.movieCenter.service.implementations;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import cmpe275.team.ninja.movieCenter.exceptions.UserServiceException;
import cmpe275.team.ninja.movieCenter.io.entity.RatingsEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserEntity;
import cmpe275.team.ninja.movieCenter.io.repositories.RatingsRepository;
import cmpe275.team.ninja.movieCenter.io.repositories.UserRepository;
import cmpe275.team.ninja.movieCenter.service.interfaces.RatingsService;
import cmpe275.team.ninja.movieCenter.shared.dto.RatingsDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;
import cmpe275.team.ninja.movieCenter.ui.model.response.ErrorMessages;

@Service
public class RatingsServiceImpl implements RatingsService{
	
	@Autowired
    RatingsRepository ratingsRepository;
	
	@Autowired
    UserRepository userRepository;
    

	@Override
	public RatingsDto createRating(RatingsDto ratingsDto) {
		RatingsEntity ratingsEntity = new RatingsEntity();
        BeanUtils.copyProperties(ratingsDto,ratingsEntity);
        UserEntity userEntity = userRepository.findByUserId(ratingsDto.getUserId());

        if (userEntity == null)
			throw new UserServiceException(ErrorMessages.USERID_OR_MOVIEID_NOT_FOUND.getErrorMessage());
		
        ratingsEntity.setMovieId(ratingsDto.getMovieId());
        ratingsEntity.setUserId(userEntity);
        RatingsEntity storedRatingsEntity = ratingsRepository.save(ratingsEntity);
        RatingsDto returnedRatingsDto = new RatingsDto();
        returnedRatingsDto.setUserId(ratingsDto.getUserId());
        BeanUtils.copyProperties(storedRatingsEntity,returnedRatingsDto);

        return returnedRatingsDto;
	}


	@Override
	public List<RatingsDto> getRatingsByUserId(String userId, int page, int limit) {
		List<RatingsDto> returnValue = new ArrayList<>();
		UserEntity userEntity = userRepository.findByUserId(userId);
		if (userEntity == null)
			throw new UserServiceException(ErrorMessages.USERID_OR_MOVIEID_NOT_FOUND.getErrorMessage());
		
		long id = userEntity.getId();
		if(page>0) page = page-1;
		
		Pageable pageableRequest = PageRequest.of(page, limit);
		Page<RatingsEntity> ratingsEntity = ratingsRepository.findByUserId(userEntity, pageableRequest);
		
		
		 for (RatingsEntity rating : ratingsEntity) {
			 	RatingsDto returnedRatingsDto = new RatingsDto();
				returnedRatingsDto.setUserId(userId);
	            BeanUtils.copyProperties(rating, returnedRatingsDto);
	            returnValue.add(returnedRatingsDto);
	        }

        return returnValue;
	}


	@Override
	public List<RatingsDto> getRatingsByMovieId(String movieId, int page, int limit) {
		// TODO Auto-generated method stub
		return null;
	}
	
	

}
