package cmpe275.team.ninja.movieCenter.service.implementations;

import cmpe275.team.ninja.movieCenter.io.entity.CardEntity;
import cmpe275.team.ninja.movieCenter.io.entity.PaymentEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserSubscriptionEntity;
import cmpe275.team.ninja.movieCenter.io.repositories.CardRepository;
import cmpe275.team.ninja.movieCenter.io.repositories.PaymentRepository;
import cmpe275.team.ninja.movieCenter.io.repositories.UserRepository;
import cmpe275.team.ninja.movieCenter.io.repositories.UserSubscriptionRepository;
import cmpe275.team.ninja.movieCenter.service.interfaces.UserService;
import cmpe275.team.ninja.movieCenter.shared.dto.*;
import cmpe275.team.ninja.movieCenter.shared.utils.Util;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    CardRepository cardRepository;

    @Autowired
    UserSubscriptionRepository userSubscriptionRepository;

    @Autowired
    Util util;

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

        UserEntity foundUser = userRepository.findByUserId(id);
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


        Date currentDate = new Date();
        PaymentEntity paymentEntity = new PaymentEntity();
        paymentEntity.setCard(cardEntity);
        paymentEntity.setPaymentDate(currentDate);
        paymentEntity.setUser(foundUser);
        paymentEntity.setPaymentType(userPaymentDto.getPaymentType());
        paymentEntity.setTransactionId(util.generateTransactionId(30));
        paymentEntity.setAmount(userPaymentDto.getAmount());
        PaymentEntity storedPaymentEntity = paymentRepository.save(paymentEntity);

        UserSubscriptionEntity userSubscriptionEntity = new UserSubscriptionEntity();

        userSubscriptionEntity.setStartDate(currentDate);
        userSubscriptionEntity.setEndDate(addMonths(currentDate, number_of_months));
        userSubscriptionEntity.setUser(foundUser);

        UserSubscriptionEntity storedUserSubscriptionEntity = userSubscriptionRepository.save(userSubscriptionEntity);

        ModelMapper modelMapper = new ModelMapper();
        UserSubscriptionDto userSubscriptionDto = modelMapper.map(storedUserSubscriptionEntity, UserSubscriptionDto.class);



        return userSubscriptionDto;

    }
}
