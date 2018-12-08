package cmpe275.team.ninja.movieCenter.service.implementations;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cmpe275.team.ninja.movieCenter.exceptions.AdminServiceException;
import cmpe275.team.ninja.movieCenter.exceptions.MovieServiceException;
import cmpe275.team.ninja.movieCenter.exceptions.UserServiceException;
import cmpe275.team.ninja.movieCenter.io.entity.MovieEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserMoviePlayEntity;
import cmpe275.team.ninja.movieCenter.io.repositories.*;
import cmpe275.team.ninja.movieCenter.service.interfaces.AdminService;
import cmpe275.team.ninja.movieCenter.service.interfaces.MovieService;
import cmpe275.team.ninja.movieCenter.shared.dto.MovieDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserSubscriptionDto;
import cmpe275.team.ninja.movieCenter.shared.utils.Util;
import cmpe275.team.ninja.movieCenter.ui.model.response.ErrorMessage;
import cmpe275.team.ninja.movieCenter.ui.model.response.ErrorMessages;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.*;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserMoviePlayRepository userMoviePlayRepository;

    @Autowired
    UserSubscriptionRepository userSubscriptionRepository;

    @Autowired
    PaymentRepository paymentRepository;

    @Autowired
    MovieService movieService;

    @Autowired
    Util util;

    @Override
    public String disableUser(String userId) {
        UserEntity foundUser = userRepository.findByUserId(userId);
        if(foundUser == null)
            return "User not found";
        foundUser.setActive(false);
        try {
            UserEntity updatedUserEntity = userRepository.save(foundUser);
            if(updatedUserEntity == null)
                return "Error in disbaling user while saving with repository in try";
            return "User disabled successfully";
        } catch (Exception e) {
            return "Error in database operation by JPA in disableUser AdminServiceImpl";
        }
    }

    @Override
    public String activateUser(String userId) {
        UserEntity foundUser = userRepository.findByUserId(userId);
        if(foundUser == null)
            return "User not found";
        foundUser.setActive(true);
        try {
            UserEntity updatedUserEntity = userRepository.save(foundUser);
            if(updatedUserEntity == null)
                return "Error in activating user while saving with repository in try";
            return "User activated successfully";
        } catch (Exception e) {
            return "Error in database operation by JPA in disableUser AdminServiceImpl";
        }
    }

    @Override
    public MovieDto updateMovie(String id, MovieDto movieDtoToUpdate) {
        MovieEntity currentMovieEntity = movieRepository.findByMovieId(id);

        if(currentMovieEntity == null ) throw new AdminServiceException(ErrorMessages.NO_RECORD_FOUND.getErrorMessage());

        ModelMapper modelMapper = new ModelMapper();

        currentMovieEntity.setTitle(movieDtoToUpdate.getTitle());
        currentMovieEntity.setGenre(movieDtoToUpdate.getGenre());
        currentMovieEntity.setSynopsis(movieDtoToUpdate.getSynopsis());
        currentMovieEntity.setStudioName(movieDtoToUpdate.getStudioName());
        currentMovieEntity.setDirector(movieDtoToUpdate.getDirector());
        currentMovieEntity.setCountry(movieDtoToUpdate.getCountry());
        currentMovieEntity.setMpaaRating(movieDtoToUpdate.getMpaaRating());
        currentMovieEntity.setPrice(movieDtoToUpdate.getPrice());
        currentMovieEntity.setAvailabilityType(movieDtoToUpdate.getAvailabilityType());
        currentMovieEntity.setActors(movieDtoToUpdate.getActors());
        currentMovieEntity.setActresses(movieDtoToUpdate.getActresses());
        currentMovieEntity.setImageUrl(movieDtoToUpdate.getImageUrl());
        currentMovieEntity.setYoutubeUrl(movieDtoToUpdate.getYoutubeUrl());
        currentMovieEntity.setYearOfRelease(movieDtoToUpdate.getYearOfRelease());

        MovieEntity updatedEntity = movieRepository.save(currentMovieEntity);

        MovieDto updatedMovieDto = modelMapper.map(updatedEntity, MovieDto.class);

        return updatedMovieDto;

    }

    @Override
    public MovieDto createMovie(MovieDto movieDto) {

        ModelMapper modelMapper = new ModelMapper();
        MovieEntity movieEntity = modelMapper.map(movieDto, MovieEntity.class);
        movieEntity.setMovieId(util.generateMovieId(30));
        movieEntity.setStatus(true);

        MovieEntity storedMovieEntity = movieRepository.save(movieEntity);
        MovieDto returnMovieDto = modelMapper.map(storedMovieEntity, MovieDto.class);

        return returnMovieDto;

    }

    @Override
    public void deleteMovie(String id) {
        MovieEntity movieEntity = movieRepository.findByMovieId(id);

        if(movieEntity == null) throw new AdminServiceException(ErrorMessages.NO_RECORD_FOUND.getErrorMessage());

        movieEntity.setStatus(false);

        movieRepository.save(movieEntity);
    }

    @Override
    public List<MovieDto> getMoviePlayingHistoryForUser(String id) {
        UserEntity foundUser = userRepository.findByUserId(id);
        if(foundUser == null)
            throw new UserServiceException(ErrorMessages.NO_RECORD_FOUND.getErrorMessage());
        ModelMapper modelMapper = new ModelMapper();
        List<UserMoviePlayEntity> userMoviePlayEntities = userMoviePlayRepository.findByUserOrderByStartTimeDesc(foundUser);

        if (userMoviePlayEntities == null || userMoviePlayEntities.size() == 0)
            return null;

        List<MovieDto> movieDtos = new ArrayList<>();

        userMoviePlayEntities.forEach(userMoviePlayEntity -> {
            movieDtos.add(modelMapper.map(userMoviePlayEntity.getMovie(), MovieDto.class));
        });

        return movieDtos;
    }


//    public Date getPreviousDateByPeriod(String period, Date currentDate) {
//        Calendar calendar = Calendar.getInstance();
//        calendar.setTime(currentDate);
//        switch (period) {
//            case "last24hours": calendar.add(Calendar.DATE, -1);break;
//            case "lastweek": calendar.add(Calendar.DATE, -7); break;
//            case "lastmonth": calendar.add(Calendar.MONTH, -1); break;
//        }
//        return calendar.getTime();
//    }

    @Override
    public List<UserDto> getTopTenUsersByPeriod(String period) {
        Date currentDate = new Date();
        Date previousDayDate = util.getPreviousDateByPeriod(period, currentDate);
        System.out.println("previousDayDate: "+previousDayDate);

        List<Object[]> topUsers = userMoviePlayRepository.findTopTenUsersByNumberOfMoviePlays(previousDayDate, currentDate);
        if(topUsers == null || topUsers.size() == 0)
            return new ArrayList<>();
        List<UserDto> userDtos = new ArrayList<>();
        ModelMapper modelMapper = new ModelMapper();
        topUsers.forEach(userid->{
            userDtos.add(modelMapper.map(userRepository.findByUserId(String.valueOf(userid[0])), UserDto.class));
        });

        return  userDtos;
    }

    @Override
    public int getNumberOfPlaysForMovie(String movieId, String period) {
        MovieEntity foundMovieEntity = movieRepository.findByMovieId(movieId);

        if(foundMovieEntity == null)
            throw new MovieServiceException(ErrorMessages.NO_RECORD_FOUND.getErrorMessage());

        Date currentDate = new Date();
        Date previousDate = util.getPreviousDateByPeriod(period, currentDate);

        Object numberOfPlays = userMoviePlayRepository.getNumberOfPlaysForMovie(foundMovieEntity.getId(), previousDate, currentDate);

        return ((BigInteger)numberOfPlays).intValue();
    }

    @Override
    public List<MovieDto> getTopTenMoviesByPeriod(String period) {
//        Date currentDate = new Date();
//        Date previousDayDate = util.getPreviousDateByPeriod(period, currentDate);
//        System.out.println("previousDayDate: "+previousDayDate);

        return movieService.getTopTenMoviesByPeriod(period);


//        List<Object[]> topMovies = userMoviePlayRepository.findTopTenMoviesByNumberOfPlays(previousDayDate, currentDate);
//        if(topMovies == null || topMovies.size() == 0)
//            return new ArrayList<>();
//        List<MovieDto> movieDtos = new ArrayList<>();
//        ModelMapper modelMapper = new ModelMapper();
//        topMovies.forEach(movieid->{
//            movieDtos.add(modelMapper.map(movieRepository.findByMovieId(String.valueOf(movieid[0])), MovieDto.class));
//        });
//
//        return  movieDtos;
    }

    private Object getUserReportTypeCount(String reportType, Date newStartDate, Date newEndDate) {

        if(reportType.equalsIgnoreCase("uniquesubscriptionusers"))
            return userSubscriptionRepository.getUniqueSubscriptionUserByMonth(newStartDate, newEndDate);
        if(reportType.equalsIgnoreCase("uniquepayperviewusers"))
            return userMoviePlayRepository.getUniquePayPerViewUsersByMonth("payperviewonly", newStartDate, newEndDate);
        if(reportType.equalsIgnoreCase("uniqueactiveusers"))
            return userMoviePlayRepository.getUniqueActiveUsers(newStartDate, newEndDate);
        if(reportType.equalsIgnoreCase("uniqueregisteredusers"))
            return userRepository.getUniqueRegisteredUsers(newStartDate, newEndDate);
        else
            return null;
    }

    private Map<String, Integer> getMonthlyUserReportForAdmin(String reportType) {
        Map<String, Integer> returnMap = new TreeMap<>(new Comparator<String>() {
            @Override
            public int compare(String o1, String o2) {
                String[] s1 = o1.split("/");
                String[] s2 = o2.split("/");

                if(Integer.parseInt(s1[1]) == Integer.parseInt(s2[1])) {
                    if(Integer.parseInt(s1[0]) < Integer.parseInt(s2[0])) {
                        return 1;
                    } else
                        return -1;
                }
                if(Integer.parseInt(s1[1]) < Integer.parseInt(s2[1])) {
                    return 1;
                } else
                    return -1;
            }
        });
        Date currentDate = new Date();
        Calendar startDate = Calendar.getInstance();
        Calendar endDate = Calendar.getInstance();

        endDate.setTime(currentDate);

        Date newEndDate = endDate.getTime();

        System.out.println("New End Date:"+newEndDate);
        startDate.setTime(newEndDate);
        //startDate.set(Calendar.DAY_OF_MONTH, 1);


        startDate.set(Calendar.DAY_OF_MONTH, 1);
        startDate.add(Calendar.DAY_OF_MONTH, -1);
        startDate.set(Calendar.HOUR_OF_DAY, 23);
        startDate.set(Calendar.MINUTE, 59);
        startDate.set(Calendar.SECOND, 59);


        Date newStartDate = startDate.getTime();
        System.out.println("New Start Date:"+newStartDate);
        Object count = getUserReportTypeCount(reportType, newStartDate, newEndDate);
        if(count == null)
            throw new AdminServiceException(ErrorMessages.INVALIDREPORTYPE.getErrorMessage());
        String zeroAppend = "0";
        String tempMonthYearKey = "";
        if(endDate.get(Calendar.MONTH)+1 < 10) {
            tempMonthYearKey = zeroAppend + String.valueOf(endDate.get(Calendar.MONTH)+1) + "/" + String.valueOf(endDate.get(Calendar.YEAR));
        } else {
            tempMonthYearKey = String.valueOf(endDate.get(Calendar.MONTH)+1) + "/" + String.valueOf(endDate.get(Calendar.YEAR));
        }

        returnMap.put(tempMonthYearKey, ((BigInteger)count).intValue());

        for(int i=1;i<=11;i++) {
            newEndDate = startDate.getTime();
            endDate.setTime(newEndDate);
            newEndDate = endDate.getTime();
            System.out.println("New End Date:"+newEndDate);
            startDate.add(Calendar.MONTH, -1);
            newStartDate = startDate.getTime();
            System.out.println("New Start Date:"+newStartDate);
            if(endDate.get(Calendar.MONTH)+1 < 10) {
                tempMonthYearKey = zeroAppend + String.valueOf(endDate.get(Calendar.MONTH)+1) + "/" + String.valueOf(endDate.get(Calendar.YEAR));
            } else {
                tempMonthYearKey = String.valueOf(endDate.get(Calendar.MONTH)+1) + "/" + String.valueOf(endDate.get(Calendar.YEAR));
            }
            count = getUserReportTypeCount(reportType, newStartDate, newEndDate);
            if(count == null)
                throw new AdminServiceException(ErrorMessages.INVALIDREPORTYPE.getErrorMessage());
            returnMap.put(tempMonthYearKey, ((BigInteger)count).intValue());
        }

        return returnMap;
    }

    @Override
    public Map<String, Integer> getMonthlyUserReport(String reportType) {
        Map<String, Integer> mapToReturn = getMonthlyUserReportForAdmin(reportType);
        System.out.println(mapToReturn);
        return mapToReturn;
    }

    @Override
    public Map<String, Double> getMonthlyIncomeReport(String reportType) {
        Map<String, Double> mapToReturn = getMonthlyIncomeReportForAdmin(reportType);
        System.out.println(mapToReturn);
        return mapToReturn;
    }

    private double getIncomeReportTypeSum(String reportType, Date newStartDate, Date newEndDate) {
        Object sum = null;
        if(reportType.equalsIgnoreCase("usersubscription")) {
            sum = paymentRepository.getMonthlySubscriptionIncome("usersubscription", newStartDate, newEndDate);
            if(sum == null) {
                return 0.0;
            } else {
                return Double.valueOf(sum.toString());
            }
        }
        if(reportType.equalsIgnoreCase("payperview")) {
            sum = paymentRepository.getMonthlySubscriptionIncome("payperview", newStartDate, newEndDate);
            if(sum == null) {
                return 0.0;
            } else {
                return Double.valueOf(sum.toString());
            }
        }
        if(reportType.equalsIgnoreCase("totalincome")) {
            sum = paymentRepository.getMonthlyTotalIncome(newStartDate, newEndDate);
            if(sum == null) {
                return 0.0;
            } else {
                return Double.valueOf(sum.toString());
            }
        }
        else
            return -1;
    }

    private Map<String, Double> getMonthlyIncomeReportForAdmin(String reportType) {
        Map<String, Double> returnMap = new TreeMap<>(new Comparator<String>() {
            @Override
            public int compare(String o1, String o2) {
                String[] s1 = o1.split("/");
                String[] s2 = o2.split("/");

                if(Integer.parseInt(s1[1]) == Integer.parseInt(s2[1])) {
                    if(Integer.parseInt(s1[0]) < Integer.parseInt(s2[0])) {
                        return 1;
                    } else
                        return -1;
                }
                if(Integer.parseInt(s1[1]) < Integer.parseInt(s2[1])) {
                    return 1;
                } else
                    return -1;
            }
        });
        Date currentDate = new Date();
        Calendar startDate = Calendar.getInstance();
        Calendar endDate = Calendar.getInstance();

        endDate.setTime(currentDate);

        Date newEndDate = endDate.getTime();

        System.out.println("New End Date:"+newEndDate);
        startDate.setTime(newEndDate);
        startDate.set(Calendar.DAY_OF_MONTH, 1);
        startDate.add(Calendar.DAY_OF_MONTH, -1);
        startDate.set(Calendar.HOUR_OF_DAY, 23);
        startDate.set(Calendar.MINUTE, 59);
        startDate.set(Calendar.SECOND, 59);
        Date newStartDate = startDate.getTime();
        System.out.println("New Start Date:"+newStartDate);
        double sum = getIncomeReportTypeSum(reportType, newStartDate, newEndDate);
        if(sum == -1)
            throw new AdminServiceException(ErrorMessages.INVALIDREPORTYPE.getErrorMessage());
        String zeroAppend = "0";
        String tempMonthYearKey = "";
        if(endDate.get(Calendar.MONTH)+1 < 10) {
            tempMonthYearKey = zeroAppend + String.valueOf(endDate.get(Calendar.MONTH)+1) + "/" + String.valueOf(endDate.get(Calendar.YEAR));
        } else {
            tempMonthYearKey = String.valueOf(endDate.get(Calendar.MONTH)+1) + "/" + String.valueOf(endDate.get(Calendar.YEAR));
        }

        returnMap.put(tempMonthYearKey, sum);

        for(int i=1;i<=11;i++) {
            newEndDate = startDate.getTime();
            endDate.setTime(newEndDate);
            newEndDate = endDate.getTime();
            System.out.println("New End Date:"+newEndDate);
            startDate.add(Calendar.MONTH, -1);
            newStartDate = startDate.getTime();
            System.out.println("New Start Date:"+newStartDate);
            if(endDate.get(Calendar.MONTH)+1 < 10) {
                tempMonthYearKey = zeroAppend + String.valueOf(endDate.get(Calendar.MONTH)+1) + "/" + String.valueOf(endDate.get(Calendar.YEAR));
            } else {
                tempMonthYearKey = String.valueOf(endDate.get(Calendar.MONTH)+1) + "/" + String.valueOf(endDate.get(Calendar.YEAR));
            }
            sum = getIncomeReportTypeSum(reportType, newStartDate, newEndDate);
            if(sum == -1)
                throw new AdminServiceException(ErrorMessages.INVALIDREPORTYPE.getErrorMessage());
            returnMap.put(tempMonthYearKey, sum);
        }

        return returnMap;
    }
}
