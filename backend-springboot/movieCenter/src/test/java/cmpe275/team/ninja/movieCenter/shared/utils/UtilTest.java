package cmpe275.team.ninja.movieCenter.shared.utils;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;

import java.util.Calendar;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

class UtilTest {
    @InjectMocks
    Util util;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void generateMovieId() {
        String randomString = util.generateMovieId(30);
        assertNotNull(randomString);
        assertEquals(randomString.length(), 30);
    }

    @Test
    void generateUserId() {
        String randomString = util.generateUserId(30);
        assertNotNull(randomString);
        assertEquals(randomString.length(), 30);
    }

    @Test
    void generateRandomString() {
        String randomString = util.generateRandomString(30);
        assertNotNull(randomString);
        assertEquals(randomString.length(), 30);
    }

    @Test
    void getPreviousDateByPeriod() {
        Date currentDate = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);

        calendar.add(Calendar.DATE, -1);

        Date lastDate = util.getPreviousDateByPeriod("last24hours", currentDate);
        assertEquals(lastDate, calendar.getTime());
    }
}