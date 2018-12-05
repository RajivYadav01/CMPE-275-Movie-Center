package cmpe275.team.ninja.movieCenter.service.implementations;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import cmpe275.team.ninja.movieCenter.exceptions.MovieServiceException;
import cmpe275.team.ninja.movieCenter.exceptions.UserServiceException;
import cmpe275.team.ninja.movieCenter.io.entity.CardEntity;
import cmpe275.team.ninja.movieCenter.io.entity.MovieEntity;
import cmpe275.team.ninja.movieCenter.io.entity.PaymentEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserMoviePlayEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserSubscriptionEntity;
import cmpe275.team.ninja.movieCenter.io.repositories.CardRepository;
import cmpe275.team.ninja.movieCenter.io.repositories.MovieRepository;
import cmpe275.team.ninja.movieCenter.io.repositories.PaymentRepository;
import cmpe275.team.ninja.movieCenter.io.repositories.UserMoviePlayRepository;
import cmpe275.team.ninja.movieCenter.io.repositories.UserRepository;
import cmpe275.team.ninja.movieCenter.io.repositories.UserSubscriptionRepository;
import cmpe275.team.ninja.movieCenter.service.interfaces.UserService;
import cmpe275.team.ninja.movieCenter.shared.MailSendingService;
import cmpe275.team.ninja.movieCenter.shared.Utility;
import cmpe275.team.ninja.movieCenter.shared.dto.MovieDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserMoviePlayDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserPaymentDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserSubscriptionDto;
import cmpe275.team.ninja.movieCenter.shared.utils.Util;
import cmpe275.team.ninja.movieCenter.ui.model.response.ErrorMessages;
import cmpe275.team.ninja.movieCenter.service.interfaces.MovieService;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;
    
    @Autowired
    Utility utility;
    
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    
    @Autowired
    MailSendingService mailSendingService;
    
    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    CardRepository cardRepository;

    @Autowired
    UserSubscriptionRepository userSubscriptionRepository;
    
    @Autowired
    MovieRepository movieRepository;

    @Autowired
    UserMoviePlayRepository userMoviePlayRepository;

    @Autowired
    MovieService movieService;

    @Autowired
    Util util;

    @Override
    public UserDto createUser(UserDto userDto) {
        if (userRepository.findByEmail(userDto.getEmail()) != null)
            throw new UserServiceException("User already exists");
        
        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(userDto,userEntity);
        
        String userId = utility.generateUserId(30);
        userEntity.setUserId(userId);
        userEntity.setCreatedDate(new Date());
        userEntity.setEncryptedPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));
        userEntity.setEmailVerificationToken(utility.generateEmailVerificationToken(userId));
        UserEntity storedUserEntity = userRepository.save(userEntity);
        System.out.println("Saved Entity" + storedUserEntity);

        UserDto returnedUserDto = new UserDto();

        BeanUtils.copyProperties(storedUserEntity,returnedUserDto);
        //mailSendingService.verifyEmail(returnedUserDto);

        return returnedUserDto;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        UserEntity userEntity = userRepository.findByEmail(email);

        if (userEntity == null)
            throw new UsernameNotFoundException(email);
        
        return new User(userEntity.getEmail(), userEntity.getEncryptedPassword(), 
                userEntity.getEmailVerificationStatus(),
                true, true,
                true, new ArrayList<>());
    }

    @Override
    public UserDto getUser(String email) {
        UserEntity userEntity = userRepository.findByEmail(email);

        if (userEntity == null)
            throw new UsernameNotFoundException(email);

        UserDto returnValue = new UserDto();
        BeanUtils.copyProperties(userEntity, returnValue);
 
        return returnValue;
    }

    @Override
    public UserDto getUserByUserId(String userId) {
        UserDto returnValue = new UserDto();
        UserEntity userEntity = userRepository.findByUserId(userId);

        if (userEntity == null)
            throw new UsernameNotFoundException("User with ID: " + userId + " not found");

        BeanUtils.copyProperties(userEntity, returnValue);

        return returnValue;
    }

    @Override
    public UserDto updateUser(String userId, UserDto user) {
        UserDto returnValue = new UserDto();

        UserEntity userEntity = userRepository.findByUserId(userId);

        if (userEntity == null)
            throw new UserServiceException(ErrorMessages.NO_RECORD_FOUND.getErrorMessage());

        userEntity.setFirstName(user.getFirstName());
        userEntity.setLastName(user.getLastName());
        userEntity.setEmail(user.getEmail());

        UserEntity updatedUserDetails = userRepository.save(userEntity);
        BeanUtils.copyProperties(updatedUserDetails, returnValue);
        return returnValue;
    }
    
    
    @Override
    public boolean endUserSubscription(String userId) {
        UserEntity userEntity = userRepository.findByUserId(userId);

        if (userEntity == null)
            throw new UserServiceException(ErrorMessages.NO_RECORD_FOUND.getErrorMessage());
        userEntity.setSubscribed(false);
        userRepository.save(userEntity);
       
        return true;
    }

    @Override
    public void deleteUser(String userId) {
        UserEntity userEntity = userRepository.findByUserId(userId);

        if (userEntity == null)
            throw new UserServiceException(ErrorMessages.NO_RECORD_FOUND.getErrorMessage());

        userRepository.delete(userEntity);
        
    }

    @Override
    public List<UserDto> getUsers(int page, int limit) {
        List<UserDto> returnValue = new ArrayList<>();
        
        if(page>0) page = page-1;
        
        Pageable pageableRequest = PageRequest.of(page, limit);
        
        Page<UserEntity> usersPage = userRepository.findAll(pageableRequest);
        List<UserEntity> users = usersPage.getContent();
        
        for (UserEntity userEntity : users) {
            if(userEntity.getUserType().equalsIgnoreCase("admin"))
                continue;
            UserDto userDto = new UserDto();
            BeanUtils.copyProperties(userEntity, userDto);
            returnValue.add(userDto);
        }
        
        return returnValue;
    }


    @Override
    public boolean verifyEmailToken(String token) {
        boolean returnValue = false;

        // Find user by token
        UserEntity userEntity = userRepository.findUserByEmailVerificationToken(token);

        if (userEntity != null) {
            boolean hastokenExpired = Utility.hasTokenExpired(token);
            if (!hastokenExpired) {
                userEntity.setEmailVerificationToken(null);
                userEntity.setEmailVerificationStatus(Boolean.TRUE);
                userRepository.save(userEntity);
                returnValue = true;
            }
        }

        return returnValue;
    }
    
    @Override
    public UserSubscriptionDto checkIfUserIsSubscribed(String id) {
        UserEntity foundUser = userRepository.findByUserId(id);
        if(foundUser == null) {
            throw new UserServiceException(ErrorMessages.NO_RECORD_FOUND.getErrorMessage());
        }
        ModelMapper modelMapper = new ModelMapper();
        UserDto userDto = modelMapper.map(foundUser, UserDto.class);

        UserSubscriptionEntity validUser = userSubscriptionRepository.findByUserAndEndDateAfter(foundUser, new Date());
        System.out.println(validUser);

        if(validUser != null ) {
            UserSubscriptionDto userSubscriptionDto = modelMapper.map(validUser, UserSubscriptionDto.class);
            return userSubscriptionDto;
        }
        else
            return null;
    }
    
    public Date addMonths(Date date, int i) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.MONTH, i);
        cal.set(Calendar.HOUR_OF_DAY, 00);
        cal.set(Calendar.MINUTE, 00);
        cal.set(Calendar.SECOND, 00);
        return cal.getTime();
    }

    @Override
    public UserSubscriptionDto startUserSubscription(String id, int number_of_months, UserPaymentDto userPaymentDto) {
        UserSubscriptionDto userSubscriptionDto = checkIfUserIsSubscribed(id);
        if(userSubscriptionDto != null)
            throw new UserServiceException(ErrorMessages.VALIDUSER.getErrorMessage());

        UserEntity foundUser = userRepository.findByUserId(id);

        Date currentDate = new Date();

        PaymentEntity storedPaymentEntity = makePayment(foundUser, userPaymentDto, currentDate);
        if(storedPaymentEntity == null){
            throw new UserServiceException(ErrorMessages.PAYMENT_NOT_SUCCESSFULL.getErrorMessage());
        }

        UserSubscriptionEntity userSubscriptionEntity = new UserSubscriptionEntity();

        userSubscriptionEntity.setStartDate(currentDate);
        userSubscriptionEntity.setEndDate(addMonths(currentDate, number_of_months));
        userSubscriptionEntity.setUser(foundUser);

        UserSubscriptionEntity storedUserSubscriptionEntity = userSubscriptionRepository.save(userSubscriptionEntity);
        if(storedUserSubscriptionEntity != null) {
            foundUser.setSubscribed(true);
            UserEntity updatedUser = userRepository.save(foundUser);
            System.out.println(updatedUser);
        }

        ModelMapper modelMapper = new ModelMapper();
        userSubscriptionDto = modelMapper.map(storedUserSubscriptionEntity, UserSubscriptionDto.class);

        return userSubscriptionDto;

    }

    @Override
    public void payForMovie(String id, UserPaymentDto userPaymentDto) {
        Date currentDate = new Date();

        UserEntity foundUser = userRepository.findByUserId(id);

        if(foundUser == null)
            throw new UserServiceException(ErrorMessages.NO_RECORD_FOUND.getErrorMessage());

        MovieEntity foundMovie = movieRepository.findByMovieId(userPaymentDto.getMovieId());

        if(foundMovie == null)
            throw new MovieServiceException(ErrorMessages.NO_RECORD_FOUND.getErrorMessage());

        UserMoviePlayEntity retrievedUserMoviePlayEntity = checkLastStartTimeIfWithin24hours(foundUser, foundMovie, currentDate);
        if(retrievedUserMoviePlayEntity == null) {
            PaymentEntity storedPaymentEntity = makePayment(foundUser, userPaymentDto, currentDate);
            if(storedPaymentEntity == null) {
                throw new UserServiceException(ErrorMessages.PAYMENT_NOT_SUCCESSFULL.getErrorMessage());
            }
        } else {
            throw new UserServiceException(ErrorMessages.PAYMENTNOTNEEDED.getErrorMessage());
        }
    }

    public PaymentEntity makePayment(UserEntity foundUser, UserPaymentDto userPaymentDto, Date currentDate) {

        CardEntity cardEntity = cardRepository.findByCardNumber(userPaymentDto.getCardNumber());

        if(cardEntity == null) {
            cardEntity = new CardEntity();
            cardEntity.setCardId(util.generateCardId(30));
            cardEntity.setCardNumber(userPaymentDto.getCardNumber());
            cardEntity.setCvv(userPaymentDto.getCvv());
            cardEntity.setExpiryYear(userPaymentDto.getExpiryYear());
            cardEntity.setExpiryMonth(userPaymentDto.getExpiryMonth());
            cardEntity.setNameOnCard(userPaymentDto.getNameOnCard());
            cardEntity.setUser(foundUser);
            cardEntity = cardRepository.save(cardEntity);

        }



        PaymentEntity paymentEntity = new PaymentEntity();
        paymentEntity.setCard(cardEntity);
        paymentEntity.setPaymentDate(currentDate);
        paymentEntity.setUser(foundUser);
        paymentEntity.setPaymentType(userPaymentDto.getPaymentType());
        paymentEntity.setTransactionId(util.generateTransactionId(30));
        paymentEntity.setAmount(userPaymentDto.getAmount());
        PaymentEntity storedPaymentEntity = paymentRepository.save(paymentEntity);

        return storedPaymentEntity;

    }
    
    @Override
    public void createUserActivity(String userId, String movieId, UserMoviePlayDto userMoviePlayDto) {
        Date startTime = new Date();
        userMoviePlayDto.setStartTime(startTime);

        ModelMapper modelMapper = new ModelMapper();

        UserEntity foundUser = userRepository.findByUserId(userId);
        if(foundUser == null)
            throw new UserServiceException(ErrorMessages.NO_RECORD_FOUND.getErrorMessage());

        MovieEntity foundMovie = movieRepository.findByMovieId(movieId);
        if(foundMovie == null)
            throw new MovieServiceException(ErrorMessages.NO_RECORD_FOUND.getErrorMessage());

        UserMoviePlayEntity retrievedUserMoviePlayEntity = checkLastStartTimeIfWithin24hours(foundUser, foundMovie, startTime);

        if(retrievedUserMoviePlayEntity == null) {
            UserDto foundUserDto = modelMapper.map(foundUser, UserDto.class);
            MovieDto foundMovieDto = modelMapper.map(foundMovie, MovieDto.class);

            userMoviePlayDto.setMovie(foundMovieDto);
            userMoviePlayDto.setUser(foundUserDto);
            UserMoviePlayEntity userMoviePlayEntity = modelMapper.map(userMoviePlayDto, UserMoviePlayEntity.class);
            //UserMoviePlayEntity storedUserMoviePlayEntity =
            userMoviePlayRepository.save(userMoviePlayEntity);

            //UserMoviePlayDto storedUserMoviePlayDto = modelMapper.map(storedUserMoviePlayEntity, UserMoviePlayDto.class);
        }
    }

    public UserMoviePlayEntity checkLastStartTimeIfWithin24hours(UserEntity foundUser, MovieEntity foundMovie, Date currentTime) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentTime);
        calendar.add(Calendar.DATE, -1);

        System.out.println(calendar.getTime());
        Date previousDayDate = calendar.getTime();
        UserMoviePlayEntity userMoviePlayEntity = userMoviePlayRepository.findByUserAndMovieAndStartTimeBetween(
                foundUser,
                foundMovie,
                previousDayDate,
                currentTime);
        return userMoviePlayEntity;
}


    @Override
    public boolean requestPasswordReset(String email) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public boolean resetPassword(String token, String password) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public List<MovieDto> getTopTenMoviesByPeriod(String period) {
        return movieService.getTopTenMoviesByPeriod(period);
    }
}
