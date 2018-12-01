package cmpe275.team.ninja.movieCenter.ui.controller;

import cmpe275.team.ninja.movieCenter.service.interfaces.UserService;
import cmpe275.team.ninja.movieCenter.ui.model.response.RequestOperationName;
import cmpe275.team.ninja.movieCenter.ui.model.response.RequestOperationStatus;
import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserMoviePlayDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserPaymentDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserSubscriptionDto;
import cmpe275.team.ninja.movieCenter.ui.model.request.UserDetailsRequestModel;
import cmpe275.team.ninja.movieCenter.ui.model.request.UserMoviePlayRequestModel;
import cmpe275.team.ninja.movieCenter.ui.model.request.UserPaymentRequestModel;
import cmpe275.team.ninja.movieCenter.ui.model.response.OperationStatusModel;
import cmpe275.team.ninja.movieCenter.ui.model.response.UserDetailModel;
import cmpe275.team.ninja.movieCenter.ui.model.response.UserResponseModel;
import cmpe275.team.ninja.movieCenter.ui.model.response.UserSubscriptionResponseModel;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping(path = "/{id}", produces = { MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE })
    public UserDetailModel getUsers(@PathVariable String id) throws Exception{
        UserDetailModel returnValue = new UserDetailModel();

        UserDto userDto = userService.getUserByUserId(id);
        BeanUtils.copyProperties(userDto,returnValue);
        return returnValue;
    }
    
    @GetMapping(produces = { MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE })
    public List<UserDetailModel> getUsers(@RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "limit", defaultValue = "2") int limit) {
        List<UserDetailModel> returnValue = new ArrayList<>();

        List<UserDto> users = userService.getUsers(page, limit);
      
        for (UserDto userDto : users) {
            UserDetailModel userModel = new UserDetailModel();
            BeanUtils.copyProperties(userDto, userModel);
            returnValue.add(userModel);
        }

        return returnValue;
}
    @PostMapping(consumes = { MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE }, produces = {
            MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE })
    public UserResponseModel createUser(@RequestBody UserDetailsRequestModel userDetailsRequestModel) throws Exception{
        UserDto userDto = new UserDto();
        UserResponseModel userResponseModel = new UserResponseModel();
        BeanUtils.copyProperties(userDetailsRequestModel,userDto);

        UserDto createdUser = userService.createUser(userDto);

        BeanUtils.copyProperties(createdUser,userResponseModel);

        return userResponseModel;
    }
    
    @PutMapping(path = "/{id}", consumes = { MediaType.APPLICATION_XML_VALUE,
            MediaType.APPLICATION_JSON_VALUE }, produces = { MediaType.APPLICATION_XML_VALUE,
                    MediaType.APPLICATION_JSON_VALUE })
    public UserDetailModel updateUser(@PathVariable String id, @RequestBody UserDetailsRequestModel userDetails) {
        UserDetailModel returnValue = new UserDetailModel();
        UserDto userDto = new UserDto();
        BeanUtils.copyProperties(userDetails,userDto);
        BeanUtils.copyProperties(userDto,returnValue);

        return returnValue;
    }
    
    @DeleteMapping(path = "/{id}", produces = { MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE })
    public OperationStatusModel deleteUser(@PathVariable String id) {
        OperationStatusModel returnValue = new OperationStatusModel();
        returnValue.setOperationName(RequestOperationName.DELETE.name());

        userService.deleteUser(id);

        returnValue.setOperationResult(RequestOperationStatus.SUCCESS.name());
        return returnValue;
    }
    
    @GetMapping(path = "/email-verification", produces = { MediaType.APPLICATION_JSON_VALUE,
            MediaType.APPLICATION_XML_VALUE })
    public OperationStatusModel verifyEmailToken(@RequestParam(value = "token") String token) {

        OperationStatusModel returnValue = new OperationStatusModel();
        returnValue.setOperationName(RequestOperationName.VERIFY_EMAIL.name());
        
        boolean isVerified = userService.verifyEmailToken(token);
        
        if(isVerified)
        {
            returnValue.setOperationResult(RequestOperationStatus.SUCCESS.name());
        } else {
            returnValue.setOperationResult(RequestOperationStatus.ERROR.name());
        }

        return returnValue;
    }
    
    @GetMapping(
            path="/{id}/checksubscription",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public OperationStatusModel checkIfUserSubscribed(@PathVariable String id){
        UserSubscriptionDto userSubscriptionDto = userService.checkIfUserIsSubscribed(id);
        OperationStatusModel operationStatusModel = new OperationStatusModel();
        operationStatusModel.setOperationName(RequestOperationName.CHECKUSERSUBSCRIPTION.name());

        if(userSubscriptionDto == null) {
            operationStatusModel.setOperationResult(RequestOperationStatus.INVALIDUSER.name());
        } else {
            operationStatusModel.setOperationResult(RequestOperationStatus.VALIDUSER.name());
        }
        return operationStatusModel;
    }
    
    @PostMapping(
            path="/{id}/startsubscription",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public UserSubscriptionResponseModel startUserSubscription(
            @PathVariable String id,
            @RequestParam("months") int number_of_months,
            @RequestBody UserPaymentRequestModel userPaymentRequestModel
    ) {

        ModelMapper modelMapper = new ModelMapper();
        UserPaymentDto userPaymentDto = modelMapper.map(userPaymentRequestModel, UserPaymentDto.class);
        UserSubscriptionDto userSubscriptionDto = userService.startUserSubscription(id, number_of_months, userPaymentDto);

        UserSubscriptionResponseModel userSubscriptionResponseModel = new UserSubscriptionResponseModel();
        userSubscriptionResponseModel.setEndDate(userSubscriptionDto.getEndDate());
        userSubscriptionResponseModel.setStartDate(userSubscriptionDto.getStartDate());
        userSubscriptionResponseModel.setUserId(userSubscriptionDto.getUser().getUserId());
        System.out.println(userSubscriptionResponseModel);
        return userSubscriptionResponseModel;

    }
    
    @PostMapping(
            path="/{id}/moviepayment",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public OperationStatusModel payForMovie(
            @PathVariable String id,
            @RequestBody UserPaymentRequestModel userPaymentRequestModel) {

        ModelMapper modelMapper = new ModelMapper();
        UserPaymentDto userPaymentDto = modelMapper.map(userPaymentRequestModel, UserPaymentDto.class);
        OperationStatusModel operationStatusModel = new OperationStatusModel();
        userService.payForMovie(id, userPaymentDto);
        operationStatusModel.setOperationName(RequestOperationName.MOVIEPAYMENT.name());
        operationStatusModel.setOperationResult(RequestOperationStatus.SUCCESS.name());
        return operationStatusModel;
    }
    
    @PostMapping(
            path="/play",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public OperationStatusModel userActivity(@RequestBody UserMoviePlayRequestModel userMoviePlayRequestModel) {
        UserMoviePlayDto userMoviePlayDto = new UserMoviePlayDto();
        userMoviePlayDto.setSubscriptionType(userMoviePlayRequestModel.getSubscriptionType());
        userService.createUserActivity(userMoviePlayRequestModel.getUserId(), userMoviePlayRequestModel.getMovieId(), userMoviePlayDto);
        OperationStatusModel operationStatusModel = new OperationStatusModel();
        operationStatusModel.setOperationName(RequestOperationName.USERMOVIEPLAY.name());
        operationStatusModel.setOperationResult(RequestOperationStatus.SUCCESS.name());
        return operationStatusModel;
    }


}
