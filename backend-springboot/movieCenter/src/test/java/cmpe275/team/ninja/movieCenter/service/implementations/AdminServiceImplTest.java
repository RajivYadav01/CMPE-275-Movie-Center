package cmpe275.team.ninja.movieCenter.service.implementations;

import cmpe275.team.ninja.movieCenter.io.entity.MovieEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserMoviePlayEntity;
import cmpe275.team.ninja.movieCenter.io.repositories.MovieRepository;
import cmpe275.team.ninja.movieCenter.io.repositories.UserMoviePlayRepository;
import cmpe275.team.ninja.movieCenter.io.repositories.UserRepository;
import cmpe275.team.ninja.movieCenter.shared.dto.MovieDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;
import cmpe275.team.ninja.movieCenter.shared.utils.Util;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AdminServiceImplTest {

    @InjectMocks
    AdminServiceImpl adminService;

    @Mock
    MovieRepository movieRepository;


    @Mock
    Util util;

    MovieEntity movieEntity;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);

        movieEntity = new MovieEntity();
        movieEntity.setId(1L);
        movieEntity.setTitle("Gone With Wind");
        movieEntity.setYearOfRelease("2018");
        movieEntity.setAvailabilityType("Paid");

    }

    @Test
    void createMovie() {
        when(util.generateMovieId(anyInt())).thenReturn("jsdjkadaviii12");
        when(movieRepository.save(any(MovieEntity.class))).thenReturn(movieEntity);

        MovieDto movieDto = new MovieDto();
        MovieDto storedMovieDetails = adminService.createMovie(movieDto);
        assertNotNull(storedMovieDetails);
        assertEquals(movieEntity.getTitle(), storedMovieDetails.getTitle());
        assertEquals(movieEntity.getYearOfRelease(), storedMovieDetails.getYearOfRelease());
        assertEquals(movieEntity.getAvailabilityType(), storedMovieDetails.getAvailabilityType());
    }


}