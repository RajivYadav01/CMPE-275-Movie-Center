package cmpe275.team.ninja.movieCenter.service.implementations;

import cmpe275.team.ninja.movieCenter.exceptions.MovieServiceException;
import cmpe275.team.ninja.movieCenter.io.entity.MovieEntity;
import cmpe275.team.ninja.movieCenter.io.repositories.MovieRepository;
import cmpe275.team.ninja.movieCenter.service.interfaces.MovieService;
import cmpe275.team.ninja.movieCenter.shared.dto.MovieDto;
import cmpe275.team.ninja.movieCenter.ui.model.response.ErrorMessages;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class MovieServiceImpl implements MovieService {

    @Autowired
    MovieRepository movieRepository;

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
            List<MovieEntity> movieEntities = movieRepository.findAllByTitleLikeOrActorsLikeOrDirectorLikeOrSynopsisLike(text, text, text, text);
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
            MovieDto movieDto = modelMapper.map(m,MovieDto.class);
            movieDtos.add(movieDto);
        }

        return movieDtos;
    }

}
