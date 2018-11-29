package cmpe275.team.ninja.movieCenter.service.implementations;

import cmpe275.team.ninja.movieCenter.exceptions.AdminServiceException;
import cmpe275.team.ninja.movieCenter.io.entity.MovieEntity;
import cmpe275.team.ninja.movieCenter.io.repositories.MovieRepository;
import cmpe275.team.ninja.movieCenter.service.interfaces.AdminService;
import cmpe275.team.ninja.movieCenter.shared.dto.MovieDto;
import cmpe275.team.ninja.movieCenter.shared.utils.Util;
import cmpe275.team.ninja.movieCenter.ui.model.response.ErrorMessages;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    Util util;


    @Override
    public MovieDto updateMovie(String title, MovieDto movieDtoToUpdate) {
        MovieEntity currentMovieEntity = movieRepository.findByTitle(title);

        if(currentMovieEntity == null ) throw new AdminServiceException(ErrorMessages.NO_RECORD_FOUND.getErrorMessage());

        ModelMapper modelMapper = new ModelMapper();

        currentMovieEntity.setTitle(movieDtoToUpdate.getTitle());
        currentMovieEntity.setGenre(movieDtoToUpdate.getGenre());
        currentMovieEntity.setSynopsis(movieDtoToUpdate.getSynopsis());
        currentMovieEntity.setStudio_name(movieDtoToUpdate.getStudio_name());
        currentMovieEntity.setDirector(movieDtoToUpdate.getDirector());
        currentMovieEntity.setCountry(movieDtoToUpdate.getCountry());
        currentMovieEntity.setMpaa_rating(movieDtoToUpdate.getMpaa_rating());
        currentMovieEntity.setPrice(movieDtoToUpdate.getPrice());
        currentMovieEntity.setAvailability_type(movieDtoToUpdate.getAvailability_type());
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
    public void deleteMovie(String title) {
        MovieEntity movieEntity = movieRepository.findByTitle(title);

        if(movieEntity == null) throw new AdminServiceException(ErrorMessages.NO_RECORD_FOUND.getErrorMessage());

        movieEntity.setStatus(false);

        movieRepository.save(movieEntity);
    }
}