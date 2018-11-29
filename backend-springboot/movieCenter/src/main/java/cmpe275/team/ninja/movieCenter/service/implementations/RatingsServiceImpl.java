package cmpe275.team.ninja.movieCenter.service.implementations;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cmpe275.team.ninja.movieCenter.io.entity.RatingsEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserEntity;
import cmpe275.team.ninja.movieCenter.io.repositories.RatingsRepository;
import cmpe275.team.ninja.movieCenter.io.repositories.UserRepository;
import cmpe275.team.ninja.movieCenter.service.interfaces.RatingsService;
import cmpe275.team.ninja.movieCenter.shared.dto.RatingsDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;

@Service
public class RatingsServiceImpl implements RatingsService{
	
	@Autowired
    RatingsRepository ratingsRepository;

	@Override
	public RatingsDto createRating(RatingsDto ratingsDto) {
		RatingsEntity ratingsEntity = new RatingsEntity();
        BeanUtils.copyProperties(ratingsDto,ratingsEntity);
        ratingsEntity.setMovieId(ratingsDto.getMovieId());
        ratingsEntity.setUserId(ratingsDto.getUserId());
        RatingsEntity storedRatingsEntity = ratingsRepository.save(ratingsEntity);
        RatingsDto returnedRatingsDto = new RatingsDto();

        BeanUtils.copyProperties(storedRatingsEntity,returnedRatingsDto);

        return returnedRatingsDto;
	}
	
	

}
