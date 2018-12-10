package cmpe275.team.ninja.movieCenter.ui.controller;

import cmpe275.team.ninja.movieCenter.service.implementations.MovieServiceImpl;
import cmpe275.team.ninja.movieCenter.shared.dto.MovieDto;
import cmpe275.team.ninja.movieCenter.ui.model.response.MovieDetailsResponseModel;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

class MovieControllerTest {

    @InjectMocks
    MovieController movieController;

    @Mock
    MovieServiceImpl movieService;

    MovieDto movieDto;

    final String MOVIE_ID = "hjsdcbdisb";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        movieDto = new MovieDto();
        movieDto.setId(1L);
        movieDto.setDirector("Venkatesh");
        movieDto.setActors("A,B, C");
        movieDto.setActresses("X, Y, Z");
        movieDto.setAvailabilityType("Free");
        movieDto.setAverageRating(4.5);
        movieDto.setCountry("USA");
        movieDto.setGenre("Action");
        movieDto.setMovieId(MOVIE_ID);
        movieDto.setMpaaRating("G");
    }

    @Test
    void getMovieById() {
        when(movieService.getMovieById(anyString())).thenReturn(movieDto);
        MovieDetailsResponseModel movieDetailsResponseModel = movieController.getMovieById(MOVIE_ID);
        assertNotNull(movieDetailsResponseModel);
        assertEquals(movieDetailsResponseModel.getMovieId(), MOVIE_ID);
        assertEquals(movieDetailsResponseModel.getAvailabilityType(), movieDto.getAvailabilityType());
    }

    @Test
    void getAllMovies() {
        when(movieService.getAllMovies()).thenReturn(getAllMovieDtos());
        List<MovieDetailsResponseModel> movieDetailsResponseModels = movieController.getAllMovies();
        assertEquals(movieDetailsResponseModels.size(), getAllMovieDtos().size());
        assertEquals(movieDetailsResponseModels.get(0).getTitle(), "Avengers");
        assertEquals(movieDetailsResponseModels.get(1).getTitle(), "Deadpool");
    }

    private List<MovieDto> getAllMovieDtos() {
        List<MovieDto> returnList = new ArrayList<>();

        MovieDto movieDto1 = new MovieDto();
        movieDto1.setId(2L);
        movieDto1.setTitle("Avengers");
        movieDto1.setGenre("Action");

        MovieDto movieDto2 = new MovieDto();
        movieDto2.setId(3L);
        movieDto2.setTitle("Deadpool");
        movieDto2.setGenre("Action");

        returnList.add(movieDto1);
        returnList.add(movieDto2);

        return returnList;

    }


}