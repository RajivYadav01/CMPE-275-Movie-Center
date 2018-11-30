package cmpe275.team.ninja.movieCenter.exceptions;

import cmpe275.team.ninja.movieCenter.ui.model.response.ErrorMessage;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@ControllerAdvice
public class AppExceptionsHandler {

    @ExceptionHandler(value = {AdminServiceException.class})
    public ResponseEntity<Object> handleAdminServiceException(AdminServiceException aex, WebRequest request) {
        ErrorMessage errorMessage = new ErrorMessage(new Date(), aex.getMessage());
        return new ResponseEntity<>(errorMessage, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = {MovieServiceException.class})
    public ResponseEntity<Object> handleMovieServiceException(MovieServiceException aex, WebRequest request) {
        ErrorMessage errorMessage = new ErrorMessage(new Date(), aex.getMessage());
        return new ResponseEntity<>(errorMessage, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
