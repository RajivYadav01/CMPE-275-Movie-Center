package cmpe275.team.ninja.movieCenter.shared.dto;

import java.io.Serializable;

import cmpe275.team.ninja.movieCenter.io.entity.UserEntity;

public class RatingsDto implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3413236114482242580L;
	private String movieId;
	private String userId;
	private long id;
	public String getMovieId() {
		return movieId;
	}
	public void setMovieId(String movieId) {
		this.movieId = movieId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}

}
