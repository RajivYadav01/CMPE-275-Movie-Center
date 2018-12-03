package cmpe275.team.ninja.movieCenter.shared.utils;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

@Component
public class Util {
    private final Random RANDOM = new SecureRandom();
    private final String ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    public String generateActorId(int length) {
        return generateRandomString(length);
    }

    public String generateCardId(int length) {
        return generateRandomString(length);
    }

    public String generateTransactionId(int length) {
        return generateRandomString(length);
    }

    public String generateMovieId(int length) {
        return generateRandomString(length);
    }

    public String generateActressId(int length) {
        return generateRandomString(length);
    }

    public String generateUserId(int length) {
        return generateRandomString(length);
    }

    public String generateRandomString(int length) {
        StringBuilder returnValue = new StringBuilder(length);

        for(int i=0;i<length;i++) {
            returnValue.append(ALPHABET.charAt(RANDOM.nextInt(ALPHABET.length())));
        }

        return new String(returnValue);
    }

    public Date getPreviousDateByPeriod(String period, Date currentDate) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        switch (period) {
            case "last24hours": calendar.add(Calendar.DATE, -1);break;
            case "lastweek": calendar.add(Calendar.DATE, -7); break;
            case "lastmonth": calendar.add(Calendar.MONTH, -1); break;
        }
        return calendar.getTime();
    }
}
