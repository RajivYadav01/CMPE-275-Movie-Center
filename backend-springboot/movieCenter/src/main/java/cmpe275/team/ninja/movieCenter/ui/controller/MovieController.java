package cmpe275.team.ninja.movieCenter.ui.controller;

import cmpe275.team.ninja.movieCenter.service.interfaces.MovieService;
import cmpe275.team.ninja.movieCenter.shared.dto.MovieDto;
import cmpe275.team.ninja.movieCenter.ui.model.response.MovieDetailsResponseModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("*/movies")
public class MovieController {

    @Autowired
    MovieService movieService;

    @GetMapping(path="/")
    public List<MovieDetailsResponseModel> getAllMovies() {

        List<MovieDetailsResponseModel> movieDetailsResponseModels = new ArrayList<>();
        ModelMapper modelMapper = new ModelMapper();
        List<MovieDto> movieDtos = movieService.getAllMovies();
        for(MovieDto movieDto: movieDtos) {
            MovieDetailsResponseModel movieDetailsResponseModel = modelMapper.map(movieDto, MovieDetailsResponseModel.class);
            movieDetailsResponseModels.add(movieDetailsResponseModel);
        }

        return movieDetailsResponseModels;
    }

    @GetMapping(path="/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public MovieDetailsResponseModel getMovieById(@PathVariable String id) {
        ModelMapper modelMapper = new ModelMapper();
        MovieDto movieDto = movieService.getMovieById(id);
        MovieDetailsResponseModel movieDetailsResponseModel = modelMapper.map(movieDto, MovieDetailsResponseModel.class);
        return movieDetailsResponseModel;
    }

}
