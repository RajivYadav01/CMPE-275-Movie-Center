package cmpe275.team.ninja.movieCenter.service.implementations;

import cmpe275.team.ninja.movieCenter.exceptions.MovieServiceException;
import cmpe275.team.ninja.movieCenter.io.entity.MovieEntity;
import cmpe275.team.ninja.movieCenter.io.repositories.MovieRepository;
import cmpe275.team.ninja.movieCenter.io.repositories.UserMoviePlayRepository;
import cmpe275.team.ninja.movieCenter.service.interfaces.MovieService;
import cmpe275.team.ninja.movieCenter.shared.dto.MovieDto;
import cmpe275.team.ninja.movieCenter.shared.utils.Util;
import cmpe275.team.ninja.movieCenter.ui.model.response.ErrorMessages;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    UserMoviePlayRepository userMoviePlayRepository;

    @Autowired
    Util util;

    @Override
    public List<MovieDto> getAllMovies() {

        List<MovieDto> movieDtos = new ArrayList<>();

        ModelMapper modelMapper = new ModelMapper();
        for(MovieEntity movieEntity: movieRepository.findAll()){
            if(movieEntity.isStatus()) {
                MovieDto movieDto = modelMapper.map(movieEntity, MovieDto.class);
                movieDtos.add(movieDto);
            }
        }

        return movieDtos;

    }

    @Override
    public MovieDto getMovieById(String id) {
        MovieEntity foundMovieEntity = movieRepository.findByMovieId(id);
        if(foundMovieEntity == null) throw new MovieServiceException(ErrorMessages.NO_RECORD_FOUND.getErrorMessage());

        ModelMapper modelMapper = new ModelMapper();
        MovieDto movieDto = modelMapper.map(foundMovieEntity, MovieDto.class);

        return movieDto;
    }

    @Override
    public List<MovieDto> getMoviesBySearch(String searchtext) {

        List<MovieDto> movieDtos = new ArrayList<>();
        Set<MovieEntity> set = new HashSet<>();
        String[] temp = searchtext.split("\\s+");

        for(String s : temp){
            String text = "%"+s+"%" ;
            List<MovieEntity> movieEntities = movieRepository.findAllByTitleLikeOrActorsLikeOrDirectorLikeOrSynopsisLikeOrActressesLikeOrGenreLikeOrStudioNameLikeOrCountryLikeOrAvailabilityTypeLike(text, text, text, text,text, text, text, text, text);
            for(MovieEntity m : movieEntities)
                set.add(m);
        }

        for(MovieEntity m : set)
            System.out.println(m);

        ModelMapper modelMapper = new ModelMapper();

//        if(addressDtos!= null && !addressDtos.isEmpty()) {
//            Type listType = new TypeToken<List<AddressResponseModel>>() {}.getType();
//            addressesResponse = modelMapper.map(addressDtos, listType);
//        }

        for(MovieEntity m : set){
            if(m.isStatus()) {
                MovieDto movieDto = modelMapper.map(m,MovieDto.class);
                movieDtos.add(movieDto);
            }
        }

        return movieDtos;
    }

    @Override
	public boolean updateMovieRating(String id, double rating) {
		MovieEntity foundMovieEntity = movieRepository.findByMovieId(id);
		if(foundMovieEntity == null) throw new MovieServiceException(ErrorMessages.NO_RECORD_FOUND.getErrorMessage());
		int totalCount = foundMovieEntity.getUserRatingCount() + 1;
		foundMovieEntity.setUserRatingCount(totalCount);
		double avgRating = (foundMovieEntity.getAverageRating() + rating) / totalCount;
		foundMovieEntity.setAverageRating(avgRating);
		movieRepository.save(foundMovieEntity);
		return true;
	}

    @Override
    public List<MovieDto> getTopTenMoviesByPeriod(String period) {
        Date currentDate = new Date();
        Date previousDayDate = util.getPreviousDateByPeriod(period, currentDate);
        System.out.println("previousDayDate: "+previousDayDate);
        List<Object[]> topMovies = userMoviePlayRepository.findTopTenMoviesByNumberOfPlays(previousDayDate, currentDate);
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
