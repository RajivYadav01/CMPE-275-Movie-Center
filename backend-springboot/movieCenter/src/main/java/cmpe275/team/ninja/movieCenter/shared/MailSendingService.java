package cmpe275.team.ninja.movieCenter.shared;

import org.springframework.stereotype.Service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClientBuilder;
import com.amazonaws.services.simpleemail.model.Body;
import com.amazonaws.services.simpleemail.model.Content;
import com.amazonaws.services.simpleemail.model.Destination;
import com.amazonaws.services.simpleemail.model.Message;
import com.amazonaws.services.simpleemail.model.SendEmailRequest;
import com.amazonaws.services.simpleemail.model.SendEmailResult;

import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;

@Service
public class MailSendingService {
	
	// This address must be verified with Amazon SES.
		final String FROM = "shraddha.kabade@sjsu.edu";

		// The subject line for the email.
		final String SUBJECT = "Verify your email";
		

		// The HTML body for the email.
		final String HTMLBODY = "<h1>Please verify your email address</h1>"
				+ "<p>Thank you for registering with Movie Center. To complete registration process and be able to log in,"
				+ " click on the following link: "
				+ "<a href='http://ec2-34-217-175-83.us-west-2.compute.amazonaws.com:8080/verifyemail?token=$tokenValue'>"
				+ "Final step to complete your registration" + "</a><br/><br/>"
				+ "Thank you! And we are waiting for you inside!";

		// The email body for recipients with non-HTML email clients.
		final String TEXTBODY = "Please verify your email address. "
				+ "Thank you for registering with our mobile app. To complete registration process and be able to log in,"
				+ " open then the following URL in your browser window: "
				+ " http://ec2-34-217-175-83.us-west-2.compute.amazonaws.com:8080/movie-center/verification-service/email-verification.html?token=$tokenValue"
				+ " Thank you! And we are waiting for you inside!";
		
	
	public void verifyEmail(UserDto userDto) {

		BasicAWSCredentials awsCreds = new BasicAWSCredentials("XXXXX", "XXXXX");
		AmazonSimpleEmailService client = AmazonSimpleEmailServiceClientBuilder.standard()
				.withCredentials(new AWSStaticCredentialsProvider(awsCreds))
				.withRegion(Regions.US_WEST_2)
				.build();
		
		String htmlBodyWithToken = HTMLBODY.replace("$tokenValue", userDto.getEmailVerificationToken());
		String textBodyWithToken = TEXTBODY.replace("$tokenValue", userDto.getEmailVerificationToken());

		SendEmailRequest request = new SendEmailRequest()
				.withDestination(new Destination().withToAddresses(userDto.getEmail()))
				.withMessage(new Message()
						.withBody(new Body().withHtml(new Content().withCharset("UTF-8").withData(htmlBodyWithToken))
								.withText(new Content().withCharset("UTF-8").withData(textBodyWithToken)))
						.withSubject(new Content().withCharset("UTF-8").withData(SUBJECT)))
				.withSource(FROM);

		client.sendEmail(request);

		System.out.println("Email sent!");

	}
}
