package cmpe275.team.ninja.movieCenter.ui.controller;

import cmpe275.team.ninja.movieCenter.service.interfaces.UserService;
import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;
import cmpe275.team.ninja.movieCenter.ui.model.request.UserDetailsRequestModel;
import cmpe275.team.ninja.movieCenter.ui.model.response.UserResponseModel;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping
    public String getUsers(){
        return "get all users";
    }

    @PostMapping
    public UserResponseModel createUser(@RequestBody UserDetailsRequestModel userDetailsRequestModel){
        UserDto userDto = new UserDto();
        UserResponseModel userResponseModel = new UserResponseModel();
        BeanUtils.copyProperties(userDetailsRequestModel,userDto);

        UserDto createdUser = userService.createUser(userDto);

        BeanUtils.copyProperties(createdUser,userResponseModel);

        return userResponseModel;
    }

}
