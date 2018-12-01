package cmpe275.team.ninja.movieCenter.exceptions;

public class UserServiceException extends RuntimeException {
    /**
	 * 
	 */
	private static final long serialVersionUID = -5833895597226641872L;

	public UserServiceException(String message) {
        super(message);
    }
}
