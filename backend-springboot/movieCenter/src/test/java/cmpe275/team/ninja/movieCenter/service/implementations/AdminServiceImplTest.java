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


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AdminServiceImplTest {

    @InjectMocks
    AdminServiceImpl adminService;

    @Mock
    MovieRepository movieRepository;

    @Mock
    UserRepository userRepository;


    @Mock
    Util util;

    MovieEntity movieEntity;

    UserEntity userEntity;

    final String userId = "vdwguvuw";


    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);

        movieEntity = new MovieEntity();
        movieEntity.setId(1L);
        movieEntity.setTitle("Gone With Wind");
        movieEntity.setYearOfRelease("2018");
        movieEntity.setAvailabilityType("Paid");

        userEntity = new UserEntity();
        userEntity.setId(1L);
        userEntity.setFirstName("Venkatesh");
        userEntity.setLastName("Devale");
        userEntity.setUserId(userId);
        userEntity.setActive(true);

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

    @Test
    void toggleUserActivation() {
        when(userRepository.findByUserId(anyString())).thenReturn(userEntity);
        when(userRepository.save(any(UserEntity.class))).thenReturn(userEntity);
        String ans = adminService.toggleUserActivation(userId);
        System.out.println(ans);
        assertNotNull(ans);
        assertEquals("User updated successfully", ans);
        assertEquals(userEntity.isActive(), false);

    }


}