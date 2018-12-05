package cmpe275.team.ninja.movieCenter.aspect;

import java.util.Date;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import cmpe275.team.ninja.movieCenter.service.implementations.UserServiceImpl;
import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserSubscriptionDto;

@Aspect
@Configuration
public class SubscriptionAspect {
    /***
     * Following is a dummy implementation of this aspect.
     * You are expected to provide an actual implementation based on the requirements, including adding/removing advices as needed.
     */

	@Autowired UserServiceImpl userServiceImpl;
	
	@Before("execution(public * cmpe275.team.ninja.movieCenter.service.implementations.UserServiceImpl.loadUserByUsername(..))")
	public void subscriptionAdvice(JoinPoint joinPoint) {
		System.out.printf("Before the execution of the method %s\n", joinPoint.getSignature().getName());
		Object[] args = joinPoint.getArgs();
		String email = String.valueOf(args[0]);
		UserDto userDto = userServiceImpl.getUser(email);
		if(userDto.isSubscribed()) {
			UserSubscriptionDto userSubscriptionDto = userServiceImpl.checkIfUserIsSubscribed(userDto.getUserId());
			if(userSubscriptionDto == null) {
				userServiceImpl.endUserSubscription(userDto.getUserId());
			}
		}
		
	}
}
