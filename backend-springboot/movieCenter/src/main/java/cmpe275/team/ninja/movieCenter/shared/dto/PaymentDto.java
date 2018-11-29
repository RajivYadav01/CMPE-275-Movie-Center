package cmpe275.team.ninja.movieCenter.shared.dto;

import cmpe275.team.ninja.movieCenter.io.entity.CardEntity;

public class PaymentDto {
    private long id;
    private String transactionId;
    private CardDto card;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public CardDto getCard() {
        return card;
    }

    public void setCard(CardDto card) {
        this.card = card;
    }
}
