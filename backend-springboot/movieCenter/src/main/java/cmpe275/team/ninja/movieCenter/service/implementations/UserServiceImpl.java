package cmpe275.team.ninja.movieCenter.service.implementations;

import cmpe275.team.ninja.movieCenter.io.entity.UserEntity;
import cmpe275.team.ninja.movieCenter.io.repositories.UserRepository;
import cmpe275.team.ninja.movieCenter.service.interfaces.UserService;
import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Override
    public UserDto createUser(UserDto userDto) {
        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(userDto,userEntity);
        userEntity.setUserId("1");
        userEntity.setEncryptedPassword("123");
        UserEntity storedUserEntity = userRepository.save(userEntity);
        System.out.println("Saved Entity" + storedUserEntity);

        UserDto returnedUserDto = new UserDto();

        BeanUtils.copyProperties(storedUserEntity,returnedUserDto);

        return returnedUserDto;
    }
}
