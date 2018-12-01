package cmpe275.team.ninja.movieCenter.service.implementations;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cmpe275.team.ninja.movieCenter.exceptions.AdminServiceException;
import cmpe275.team.ninja.movieCenter.exceptions.UserServiceException;
import cmpe275.team.ninja.movieCenter.io.entity.MovieEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserMoviePlayEntity;
import cmpe275.team.ninja.movieCenter.io.repositories.MovieRepository;
import cmpe275.team.ninja.movieCenter.io.repositories.UserMoviePlayRepository;
import cmpe275.team.ninja.movieCenter.io.repositories.UserRepository;
import cmpe275.team.ninja.movieCenter.service.interfaces.AdminService;
import cmpe275.team.ninja.movieCenter.shared.dto.MovieDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;
import cmpe275.team.ninja.movieCenter.shared.utils.Util;
import cmpe275.team.ninja.movieCenter.ui.model.response.ErrorMessages;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMoviePlayRepository userMoviePlayRepository;

    @Autowired
    Util util;


    @Override
    public MovieDto updateMovie(String id, MovieDto movieDtoToUpdate) {
        MovieEntity currentMovieEntity = movieRepository.findByMovieId(id);

        if(currentMovieEntity == null ) throw new AdminServiceException(ErrorMessages.NO_RECORD_FOUND.getErrorMessage());

        ModelMapper modelMapper = new ModelMapper();

        currentMovieEntity.setTitle(movieDtoToUpdate.getTitle());
        currentMovieEntity.setGenre(movieDtoToUpdate.getGenre());
        currentMovieEntity.setSynopsis(movieDtoToUpdate.getSynopsis());
        currentMovieEntity.setStudioName(movieDtoToUpdate.getStudioName());
        currentMovieEntity.setDirector(movieDtoToUpdate.getDirector());
        currentMovieEntity.setCountry(movieDtoToUpdate.getCountry());
        currentMovieEntity.setMpaaRating(movieDtoToUpdate.getMpaaRating());
        currentMovieEntity.setPrice(movieDtoToUpdate.getPrice());
        currentMovieEntity.setAvailabilityType(movieDtoToUpdate.getAvailabilityType());
        currentMovieEntity.setActors(movieDtoToUpdate.getActors());
        currentMovieEntity.setActresses(movieDtoToUpdate.getActresses());

        MovieEntity updatedEntity = movieRepository.save(currentMovieEntity);

        MovieDto updatedMovieDto = modelMapper.map(updatedEntity, MovieDto.class);

        return updatedMovieDto;

    }

    @Override
    public MovieDto createMovie(MovieDto movieDto) {

        ModelMapper modelMapper = new ModelMapper();
        MovieEntity movieEntity = modelMapper.map(movieDto, MovieEntity.class);
        movieEntity.setMovieId(util.generateMovieId(30));
        movieEntity.setStatus(true);

        MovieEntity storedMovieEntity = movieRepository.save(movieEntity);
        MovieDto returnMovieDto = modelMapper.map(storedMovieEntity, MovieDto.class);

        return returnMovieDto;

    }

    @Override
    public void deleteMovie(String id) {
        MovieEntity movieEntity = movieRepository.findByMovieId(id);

        if(movieEntity == null) throw new AdminServiceException(ErrorMessages.NO_RECORD_FOUND.getErrorMessage());

        movieEntity.setStatus(false);

        movieRepository.save(movieEntity);
    }

    @Override
    public List<MovieDto> getMoviePlayingHistoryForUser(String id) {
        UserEntity foundUser = userRepository.findByUserId(id);
        if(foundUser == null)
            throw new UserServiceException(ErrorMessages.NO_RECORD_FOUND.getErrorMessage());
        ModelMapper modelMapper = new ModelMapper();
        List<UserMoviePlayEntity> userMoviePlayEntities = userMoviePlayRepository.findByUserOrderByStartTimeDesc(foundUser);

        if (userMoviePlayEntities == null || userMoviePlayEntities.size() == 0)
            return null;

        List<MovieDto> movieDtos = new ArrayList<>();

        userMoviePlayEntities.forEach(userMoviePlayEntity -> {
            movieDtos.add(modelMapper.map(userMoviePlayEntity.getMovie(), MovieDto.class));
        });

        return movieDtos;
    }


    public Date getPreviousDateByPeriod(String period, Date currentDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        switch (period) {
            case "last24hours": calendar.add(Calendar.DATE, -1);break;
            case "lastweek": calendar.add(Calendar.DATE, -7); break;
            case "lastmonth": calendar.add(Calendar.MONTH, -1); break;
        }
        return calendar.getTime();
    }

    @Override
    public List<UserDto> getTopTenUsersByPeriod(String period) {
        Date currentDate = new Date();
//        Calendar calendar = Calendar.getInstance();
//        calendar.setTime(currentDate);
//        calendar.add(Calendar.DATE, -1);
        Date previousDayDate = getPreviousDateByPeriod(period, currentDate);
        System.out.println("previousDayDate: "+previousDayDate);

        List<Object[]> topUsers = userMoviePlayRepository.findTopTenUsersByNumberOfMoviePlays(previousDayDate, currentDate);
        if(topUsers == null || topUsers.size() == 0)
            return new ArrayList<>();
        List<UserDto> userDtos = new ArrayList<>();
        ModelMapper modelMapper = new ModelMapper();
        topUsers.forEach(userid->{
            userDtos.add(modelMapper.map(userRepository.findByUserId(String.valueOf(userid[0])), UserDto.class));
        });

        return  userDtos;
    }
}