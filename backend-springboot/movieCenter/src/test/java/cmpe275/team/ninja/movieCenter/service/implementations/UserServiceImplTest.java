package cmpe275.team.ninja.movieCenter.service.implementations;

import cmpe275.team.ninja.movieCenter.io.entity.UserEntity;
import cmpe275.team.ninja.movieCenter.io.repositories.UserRepository;
import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import static org.junit.jupiter.api.Assertions.*;

class UserServiceImplTest {

    @InjectMocks
    UserServiceImpl userService;

    @Mock
    UserRepository userRepository;

    @org.junit.jupiter.api.BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
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

}