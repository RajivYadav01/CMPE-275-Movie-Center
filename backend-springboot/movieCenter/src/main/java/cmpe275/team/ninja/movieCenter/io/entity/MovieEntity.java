package cmpe275.team.ninja.movieCenter.io.entity;


import javax.persistence.*;


@Entity(name="movies")
public class MovieEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="movie_id")
    private String movieId;

    @Column(name="title")
    private String title;

    @Column(name="genre")
    private String genre;

    @Column(name="studio_name")
    private String studioName;

    @Column(name="synopsis")
    private String synopsis;

    @Column(name="image_url")
    private String imageUrl;

    @Column(name="youtube_url")
    private String youtubeUrl;

    @Column(name="actors")
    private String actors;

    @Column(name="actresses")
    private String actresses;

    @Column(name="director")
    private String director;

    @Column(name="country")
    private String country;

    @Column(name="mpaa_rating")
    private String mpaaRating;

    @Column(name="availability_type")
    private String availabilityType;

    @Column(name="price")
    private double price;

    @Column(name="status")
    private boolean status;

    @Column(name="year_of_release")
    private String yearOfRelease;

    public double getAverageRating() {
		return averageRating;
	}

	public void setAverageRating(double averageRating) {
		this.averageRating = averageRating;
	}

	public int getUserRatingCount() {
		return userRatingCount;
	}

	public void setUserRatingCount(int userRatingCount) {
		this.userRatingCount = userRatingCount;
	}

	@Column(name="average_rating", columnDefinition="Decimal(2,1) default '0.0'")
    private double averageRating;
    
    @Column(name="user_rating_count", columnDefinition = "int default 0")
    private int userRatingCount;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMovieId() {
        return movieId;
    }

    public void setMovieId(String movieId) {
        this.movieId = movieId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getStudioName() {
        return studioName;
    }

    public void setStudioName(String studioName) {
        this.studioName = studioName;
    }

    public String getSynopsis() {
        return synopsis;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getYoutubeUrl() {
        return youtubeUrl;
    }

    public void setYoutubeUrl(String youtubeUrl) {
        this.youtubeUrl = youtubeUrl;
    }

    public String getActors() {
        return actors;
    }

    public void setActors(String actors) {
        this.actors = actors;
    }

    public String getActresses() {
        return actresses;
    }

    public void setActresses(String actresses) {
        this.actresses = actresses;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getMpaaRating() {
        return mpaaRating;
    }

    public void setMpaaRating(String mpaaRating) {
        this.mpaaRating = mpaaRating;
    }

    public String getAvailabilityType() {
        return availabilityType;
    }

    public void setAvailabilityType(String availabilityType) {
        this.availabilityType = availabilityType;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getYearOfRelease() {
        return yearOfRelease;
    }

    public void setYearOfRelease(String yearOfRelease) {
        this.yearOfRelease = yearOfRelease;
    }
}
