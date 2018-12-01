package cmpe275.team.ninja.movieCenter.io.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;

@Entity(name = "reviews")
public class ReviewEntity implements Serializable{
	
	private static final long serialVersionUID = 2456710988292987535L;

	/**
	 * 
	 */

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
	
	@ManyToOne
	@JoinColumn(name="user_id")
    private UserEntity user;
	
	@ManyToOne
	@JoinColumn(name="movie_id")
    private MovieEntity movie;
	
	@Column(name="rating", columnDefinition="Decimal(2,1) default '0.0'")
    private double rating;
	
	@Column(name="comments", columnDefinition="VARCHAR(255)")
    private String comments;
	
	@Column
	@CreationTimestamp
	private LocalDateTime createDateTime;

	
	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public LocalDateTime getCreateDateTime() {
		return createDateTime;
	}

	public void setCreateDateTime(LocalDateTime createDateTime) {
		this.createDateTime = createDateTime;
	}

	
	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	public MovieEntity getMovie() {
		return movie;
	}

	public void setMovie(MovieEntity movie) {
		this.movie = movie;
	}

	
}
