package cmpe275.team.ninja.movieCenter.io.entity;

import javax.persistence.*;
import java.util.List;

@Entity(name="cards")
public class CardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "card_id")
    private String cardId;

    @Column(name = "name_on_card")
    private String name_on_card;

    @Column(name="cvv")
    private String cvv;

    @Column(name="expiry_day")
    private String expiry_day;

    @Column(name="expiry_month")
    private String expiry_month;

    @ManyToOne
    @JoinColumn(name="user_id")
    private UserEntity user;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "card", orphanRemoval = true)
    private List<PaymentEntity> paymentEntityList;

    public String getCardId() {
        return cardId;
    }

    public void setCardId(String cardId) {
        this.cardId = cardId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName_on_card() {
        return name_on_card;
    }

    public void setName_on_card(String name_on_card) {
        this.name_on_card = name_on_card;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public String getExpiry_day() {
        return expiry_day;
    }

    public void setExpiry_day(String expiry_day) {
        this.expiry_day = expiry_day;
    }

    public String getExpiry_month() {
        return expiry_month;
    }

    public void setExpiry_month(String expiry_month) {
        this.expiry_month = expiry_month;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}
