package cmpe275.team.ninja.movieCenter.service.implementations;

import cmpe275.team.ninja.movieCenter.io.entity.CardEntity;
import cmpe275.team.ninja.movieCenter.io.entity.PaymentEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserEntity;
import cmpe275.team.ninja.movieCenter.io.repositories.PaymentRepository;
import cmpe275.team.ninja.movieCenter.io.repositories.UserRepository;
import cmpe275.team.ninja.movieCenter.service.interfaces.UserService;
import cmpe275.team.ninja.movieCenter.shared.dto.*;
import cmpe275.team.ninja.movieCenter.shared.utils.Util;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PaymentRepository paymentRepository;

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

    @Override
    public UserSubscriptionDto startUserSubscription(String id, UserPaymentDto userPaymentDto) {

        UserEntity foundUser = userRepository.findByUserId(id);

        ModelMapper modelMapper = new ModelMapper();
        UserDto userDto = modelMapper.map(foundUser, UserDto.class);
        CardDto cardDto = new CardDto();
        cardDto.setCardId(util.generateCardId(30));
        cardDto.setCvv(userPaymentDto.getCvv());
        cardDto.setExpiry_day(userPaymentDto.getExpiry_day());
        cardDto.setExpiry_month(userPaymentDto.getExpiry_month());
        cardDto.setUserDto(userDto);

        PaymentDto paymentDto = new PaymentDto();
        paymentDto.setCard(cardDto);
        paymentDto.setTransactionId(util.generateTransactionId(30));

        PaymentEntity paymentEntity = modelMapper.map(paymentDto, PaymentEntity.class);

        PaymentEntity storedPaymentEntity = paymentRepository.save(paymentEntity);
        if(storedPaymentEntity != null) {
            System.out.println("storedPaymentEntity:"+storedPaymentEntity);
            //start user_subscription logic here
        }

        return new UserSubscriptionDto();

    }
}
