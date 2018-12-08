package cmpe275.team.ninja.movieCenter.io.repositories;

import cmpe275.team.ninja.movieCenter.io.entity.MovieEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserEntity;
import cmpe275.team.ninja.movieCenter.io.entity.UserMoviePlayEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface UserMoviePlayRepository extends JpaRepository<UserMoviePlayEntity, Long> {
    UserMoviePlayEntity findByUserAndMovieAndStartTimeBetween(UserEntity user,
                                                              MovieEntity movie,
                                                              Date previousDaySameTimeDate,
                                                              Date currentDate);

    List<UserMoviePlayEntity> findByUserOrderByStartTimeDesc(UserEntity user);

    @Query(
            value = "select u.user_id, count(up.movie_id) as count_user_movie_plays from user_movie_plays as up\n" +
                    "inner join users as u\n" +
                    "on u.id = up.user_id\n" +
                    "where start_time between :lastdate and :currentdate\n" +
                    "group by user_id\n" +
                    "order by count_user_movie_plays desc limit 10;",
            nativeQuery = true
    )
    List<Object[]> findTopTenUsersByNumberOfMoviePlays(@Param("lastdate") Date lastDate,
                                                       @Param("currentdate") Date currentDate);

    @Query(
            value = "select count(ump.movie_id) from user_movie_plays as ump\n" +
                    "inner join movies as m\n" +
                    "on ump.movie_id = m.id\n" +
                    "where ump.movie_id = :movieid and ump.start_time between :lastdate and :currentdate\n",
            nativeQuery = true
    )
    Object getNumberOfPlaysForMovie(@Param("movieid") long movieid,
                                    @Param("lastdate") Date lastDate,
                                    @Param("currentdate") Date currentDate);


    @Query(
            value = "select m.movie_id, count(up.user_id) as count_movie_plays from user_movie_plays as up\n" +
                    "inner join movies as m\n" +
                    "on up.movie_id = m.id\n" +
                    "where start_time between :lastdate and :currentdate\n" +
                    "group by up.movie_id\n" +
                    "order by count_movie_plays desc limit 10;",
            nativeQuery = true
    )
    List<Object[]> findTopTenMoviesByNumberOfPlays(@Param("lastdate") Date lastDate,
                                                   @Param("currentdate") Date currentDate);

    @Query(
            value = "select count(distinct(user_id)) from user_movie_plays\n" +
                    "where subscription_type = :subscriptiontype and\n" +
                    "start_time between :startdate and :enddate\n",
            nativeQuery = true
    )
    Object getUniquePayPerViewUsersByMonth(@Param("subscriptiontype") String subscriptionType,
                                           @Param("startdate") Date startDate,
                                           @Param("enddate") Date endDate);

    @Query(
            value="select count(distinct(user_id)) from user_movie_plays\n" +
                    "where start_time between :startdate and :enddate\n",
            nativeQuery = true
    )
    Object getUniqueActiveUsers(@Param("startdate") Date startDate,
                                @Param("enddate") Date endDate);

    UserMoviePlayEntity findByUserAndMovie(UserEntity userEntity, MovieEntity movieEntity);
}
