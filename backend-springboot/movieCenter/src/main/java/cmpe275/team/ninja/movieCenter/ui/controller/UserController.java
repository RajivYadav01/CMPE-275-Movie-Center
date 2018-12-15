package cmpe275.team.ninja.movieCenter.ui.controller;

import cmpe275.team.ninja.movieCenter.service.interfaces.UserService;
import cmpe275.team.ninja.movieCenter.shared.dto.*;
import cmpe275.team.ninja.movieCenter.ui.model.request.UserDetailsRequestModel;
import cmpe275.team.ninja.movieCenter.ui.model.request.UserMoviePlayRequestModel;
import cmpe275.team.ninja.movieCenter.ui.model.request.UserPaymentRequestModel;
import cmpe275.team.ninja.movieCenter.ui.model.response.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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
            @RequestParam(value = "limit", defaultValue = "50") int limit) {
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
        UserDto updateUser = userService.updateUser(id, userDto);
        BeanUtils.copyProperties(updateUser,returnValue);

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
            operationStatusModel.setData(userSubscriptionDto);
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
        UserPaymentDto userPaymentDto = new UserPaymentDto();
        userPaymentDto.setCvv(userPaymentRequestModel.getCvv());
        userPaymentDto.setAmount(userPaymentRequestModel.getAmount());
        userPaymentDto.setCardNumber(userPaymentRequestModel.getCardNumber());
        userPaymentDto.setExpiryMonth(userPaymentRequestModel.getExpiryMonth());
        userPaymentDto.setExpiryYear(userPaymentRequestModel.getExpiryYear());
        userPaymentDto.setNameOnCard(userPaymentRequestModel.getNameOnCard());
        userPaymentDto.setMovieId(userPaymentRequestModel.getMovieId());
        userPaymentDto.setPaymentType(userPaymentRequestModel.getPaymentType());

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


    @GetMapping(
            path="/toptenmoviebyplays",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public List<MovieDetailsResponseModel> getTopTenMoviesByPeriod(@RequestParam("period") String period) {
        List<MovieDetailsResponseModel> responseModels = new ArrayList<>();
        List<MovieDto> movieDtos = userService.getTopTenMoviesByPeriod(period);
        if(movieDtos == null)
            return new ArrayList<>();
        ModelMapper modelMapper = new ModelMapper();
        movieDtos.forEach(movieDto -> {
            responseModels.add(modelMapper.map(movieDto, MovieDetailsResponseModel.class));
        });
        return responseModels;
    }


    @GetMapping(
            path="/{userid}/movie/{movieid}/checkifpaymentneeded",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public OperationStatusModel checkifPaymentNeeded(
            @PathVariable String userid,
            @PathVariable String movieid
    ) {

        OperationStatusModel operationStatusModel = new OperationStatusModel();
        operationStatusModel.setOperationName(RequestOperationName.MOVIEPAYMENT.name());
        operationStatusModel.setOperationResult(RequestOperationStatus.SUCCESS.name());
        String result = userService.checkifPaymentNeeded(userid,movieid);
        operationStatusModel.setData(result);

        return operationStatusModel;
    }
    
    @GetMapping(
            path= "/useractivity/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public List<MovieDetailsResponseModel> getMoviePlayingHistoryForUser(@PathVariable String id) {
        List<MovieDetailsResponseModel> movieDetailsResponseModels = new ArrayList<>();
        List<MovieDto> movieDtos = userService.getMoviePlayingActivityForUser(id);
        ModelMapper modelMapper = new ModelMapper();
        if (movieDtos == null)
            return new ArrayList<>();
        movieDtos.forEach(movieDto -> {
            movieDetailsResponseModels.add(modelMapper.map(movieDto, MovieDetailsResponseModel.class));
        });

        return movieDetailsResponseModels;
    }

    @GetMapping(
            path="/{userId}/movie/{movieId}/checkifplayed",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public OperationStatusModel checkIfUserHasPlayedThisMovie(@PathVariable String userId, @PathVariable String movieId) {
        OperationStatusModel operationStatusModel = new OperationStatusModel();
        operationStatusModel.setOperationName(RequestOperationName.CHECKIFMOVIEPLAYEDBYUSER.name());

        String result = userService.checkIfUserHasPlayedThisMovie(userId, movieId);
        if(result.equalsIgnoreCase("User not found") || result.equalsIgnoreCase("Movie not found")) {
            operationStatusModel.setOperationResult(RequestOperationStatus.ERROR.name());
        } else {
            operationStatusModel.setOperationResult(RequestOperationStatus.SUCCESS.name());
        }
        operationStatusModel.setData(result);
        return operationStatusModel;
    }



}
