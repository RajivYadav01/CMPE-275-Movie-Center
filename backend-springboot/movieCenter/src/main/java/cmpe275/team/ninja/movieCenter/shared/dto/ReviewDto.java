package cmpe275.team.ninja.movieCenter.shared.dto;

import java.io.Serializable;

import cmpe275.team.ninja.movieCenter.io.entity.UserEntity;

public class ReviewDto implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3413236114482242580L;
	private String movieId;
	private UserDto user;
	private double rating;
	private String comments;
	private long id;
	public String getMovieId() {
		return movieId;
	}
	public void setMovieId(String movieId) {
		this.movieId = movieId;
	}
	public UserDto getUser() {
		return user;
	}
	public void setUser(UserDto user) {
		this.user = user;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public double getRating() {
		return rating;
	}
	public void setRating(double rating) {
		this.rating = rating;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}

}
