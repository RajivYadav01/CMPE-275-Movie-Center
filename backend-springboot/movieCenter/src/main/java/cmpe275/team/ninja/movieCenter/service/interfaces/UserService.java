package cmpe275.team.ninja.movieCenter.service.interfaces;

import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserPaymentDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserSubscriptionDto;


public interface UserService{
    UserSubscriptionDto checkIfUserIsSubscribed(String id);
    UserDto createUser(UserDto userDto);
    UserSubscriptionDto startUserSubscription(String id, int number_of_months,UserPaymentDto userPaymentDto);
    void payForMovie(String id, UserPaymentDto userPaymentDto);
}
