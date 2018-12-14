package cmpe275.team.ninja.movieCenter.service.implementations;

import cmpe275.team.ninja.movieCenter.io.entity.MovieEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserEntity;
import cmpe275.team.ninja.movieCenter.io.repositories.UserRepository;
import cmpe275.team.ninja.movieCenter.shared.Utility;
import cmpe275.team.ninja.movieCenter.shared.dto.MovieDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

class UserServiceImplTest {

    @InjectMocks
    UserServiceImpl userService;

    @Mock
    UserRepository userRepository;

    @Mock
    Utility utility;

    @Mock
    BCryptPasswordEncoder bCryptPasswordEncoder;
    
    UserEntity userEntity;
    String userId = "vjvjvcddufc8fcfe88";
    String encryptedPassword = "ksbdcybdci";
    String emailVerificationToken = "hvciacigasgi";

    @org.junit.jupiter.api.BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);

        userEntity = new UserEntity();
        userEntity.setEmail("test@test.com");
        userEntity.setFirstName("Venkatesh");
        userEntity.setLastName("Devale");
        userEntity.setDisplayName("VenkateshD");
        userEntity.setUserId(userId);
        userEntity.setEncryptedPassword(encryptedPassword);
        userEntity.setEmailVerificationToken(emailVerificationToken);
    }
    

    @org.junit.jupiter.api.Test
    void getUser() {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(1L);
        userEntity.setFirstName("Venkatesh");
        userEntity.setLastName("Devale");

        Mockito.when(userRepository.findByEmail(Mockito.anyString())).thenReturn(userEntity);

        UserDto userDto = userService.getUser("test@test.com");
        assertNotNull(userDto);
        assertEquals("Venkatesh", userDto.getFirstName());
    }

    @org.junit.jupiter.api.Test
    void testGetUser_UserNotFoundException() {
        Mockito.when(userRepository.findByEmail(Mockito.anyString())).thenReturn(null);
        assertThrows(UsernameNotFoundException.class, ()->{
            userService.getUser("test@test.com");
        });
    }
    
    @Test
    void createUser() {
        when(userRepository.findByEmail(anyString())).thenReturn(null);
        when(utility.generateUserId(anyInt())).thenReturn(userId);
        when(bCryptPasswordEncoder.encode(anyString())).thenReturn(encryptedPassword);
        when(utility.generateEmailVerificationToken(userId)).thenReturn(emailVerificationToken);
        when(userRepository.save(any(UserEntity.class))).thenReturn(userEntity);

        UserDto userDto = new UserDto();
        UserDto storedUserDetails = userService.createUser(userDto);
        assertNotNull(storedUserDetails);
        assertEquals(userEntity.getEmail(), storedUserDetails.getEmail());
        assertEquals(userEntity.getFirstName(), storedUserDetails.getFirstName());
        assertEquals(userEntity.getLastName(), storedUserDetails.getLastName());
    }

}