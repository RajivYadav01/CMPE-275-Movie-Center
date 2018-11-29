package cmpe275.team.ninja.movieCenter.io.entity;

import javax.persistence.*;
import java.util.Date;

@Entity(name="user_subscription")
public class UserSubscriptionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="user_id")
    private String userId;

    @Column(name="start_date")
    private Date start_date;

    @Column(name="end_data")
    private Date end_date;

}
