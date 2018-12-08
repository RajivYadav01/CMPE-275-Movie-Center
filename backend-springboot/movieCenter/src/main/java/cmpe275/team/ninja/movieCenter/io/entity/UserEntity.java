package cmpe275.team.ninja.movieCenter.io.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "users")
public class UserEntity implements Serializable {

    private static final long serialVersionUID = 8751073015186065867L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false, length = 50)
    private String firstName;
    
    @Column(nullable = false, length = 50)
    private String lastName;
    

    public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	@Column(nullable = false, length = 120, unique=true)
    private String email;

    @Column(nullable = false)
    private String encryptedPassword;

    private String emailVerificationToken;

    @Column(nullable=false)
    private Boolean emailVerificationStatus = false;

    @Column(name="is_subscribed")
    private boolean isSubscribed = false;

    @Column(name="created_date")
    private Date createdDate;
    
    @Column(nullable=false)
    private String userType;
    
    @Column(length = 50)
    private String displayName;

    @Column(name="is_active")
    private boolean isActive = true;
    
    public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}


    public boolean isSubscribed() {
        return isSubscribed;
    }

    public void setSubscribed(boolean isSubscribed) {
        this.isSubscribed = isSubscribed;
    }

    public void setEmailVerificationStatus(Boolean emailVerificationStatus) {
        this.emailVerificationStatus = emailVerificationStatus;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEncryptedPassword() {
        return encryptedPassword;
    }

    public void setEncryptedPassword(String encryptedPassword) {
        this.encryptedPassword = encryptedPassword;
    }

    public String getEmailVerificationToken() {
        return emailVerificationToken;
    }

    public void setEmailVerificationToken(String emailVerificationToken) {
        this.emailVerificationToken = emailVerificationToken;
    }

    public boolean getEmailVerificationStatus() {
        return emailVerificationStatus;
    }

    public void setEmailVerificationStatus(boolean emailVerificationStatus) {
        this.emailVerificationStatus = emailVerificationStatus;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    @Override
    public String toString() {
        return "UserEntity{" +
                "id=" + id +
                ", userId='" + userId + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", encryptedPassword='" + encryptedPassword + '\'' +
                ", emailVerificationToken='" + emailVerificationToken + '\'' +
                ", emailVerificationStatus=" + emailVerificationStatus +
                '}';
    }
}