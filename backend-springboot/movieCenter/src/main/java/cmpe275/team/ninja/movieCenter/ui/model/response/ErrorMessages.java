package cmpe275.team.ninja.movieCenter.ui.model.response;

public enum ErrorMessages {
    MISSING_REQUIRED_FIELD("Missing Required Field. Please check documentation for the required fields"),
    RECORD_ALREADY_EXISTS("Record already exists"),
    INTERNAL_SERVER_ERROR("Internal server error"),
    NO_RECORD_FOUND("No record with provided id found"),
    AUTHENTICATION_FAILED("Authentication Failed"),
    COULD_NOT_UPDATE_RECORD("Could not update record"),
    COULD_NOT_DELETE_RECORD("Could not delete record"),
    EMAIL_ADDRESS_NOT_VERIFIED("Email id could not be verified"),
    PAYMENT_NOT_SUCCESSFULL("Payment was not successfull"),
    VALIDUSER("User subscription is still valid"),
	USERID_OR_MOVIEID_NOT_FOUND("UserId or MovieId not found");


    private String errorMessage;

    ErrorMessages(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
