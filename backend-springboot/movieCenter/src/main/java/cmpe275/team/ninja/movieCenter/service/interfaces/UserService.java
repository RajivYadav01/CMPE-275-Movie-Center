package cmpe275.team.ninja.movieCenter.service.interfaces;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserMoviePlayDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserPaymentDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserSubscriptionDto;


public interface UserService extends UserDetailsService{

    UserDto createUser(UserDto userDto);
    UserDto getUser(String email);
    UserDto getUserByUserId(String userId);
    UserDto updateUser(String userId, UserDto user);
	void deleteUser(String userId);
	List<UserDto> getUsers(int page, int limit);
	boolean verifyEmailToken(String token);
	boolean requestPasswordReset(String email);
	boolean resetPassword(String token, String password);
	
	UserSubscriptionDto checkIfUserIsSubscribed(String id);
    UserSubscriptionDto startUserSubscription(String id, int number_of_months,UserPaymentDto userPaymentDto);
    void payForMovie(String id, UserPaymentDto userPaymentDto);
    void createUserActivity(String userId, String movieId, UserMoviePlayDto userMoviePlayDto);
}
