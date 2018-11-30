package cmpe275.team.ninja.movieCenter.ui.controller;

import cmpe275.team.ninja.movieCenter.service.interfaces.UserService;
import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserPaymentDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserSubscriptionDto;
import cmpe275.team.ninja.movieCenter.ui.model.request.UserDetailsRequestModel;
import cmpe275.team.ninja.movieCenter.ui.model.request.UserPaymentRequestModel;
import cmpe275.team.ninja.movieCenter.ui.model.response.*;
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

    @GetMapping
    public String getUsers(){
        return "get all users";
    }

    @GetMapping(
            path="/{id}/checksubscription",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public String checkIfUserSubscribed(@PathVariable String id){
        return userService.checkIfUserIsSubscribed(id);
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



}
