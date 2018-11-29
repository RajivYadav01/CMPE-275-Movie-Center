package cmpe275.team.ninja.movieCenter.service.implementations;

import cmpe275.team.ninja.movieCenter.io.entity.MovieEntity;
import cmpe275.team.ninja.movieCenter.io.repositories.MovieRepository;
import cmpe275.team.ninja.movieCenter.service.interfaces.MovieService;
import cmpe275.team.ninja.movieCenter.shared.dto.MovieDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
}
