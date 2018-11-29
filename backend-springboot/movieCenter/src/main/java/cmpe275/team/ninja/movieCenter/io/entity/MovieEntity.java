package cmpe275.team.ninja.movieCenter.io.entity;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


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
    private String studio_name;

    @Column(name="synopsis")
    private String synopsis;

    @Column(name="image_url")
    private String image_url;

    @Column(name="youtube_url")
    private String youtube_url;

    @Column(name="actors")
    private String actors;

    @Column(name="actresses")
    private String actresses;


//    @ManyToMany(cascade = CascadeType.ALL)
//    @JoinTable(
//            name="actor_movie",
//            joinColumns = {@JoinColumn(name = "movies_id")},
//            inverseJoinColumns = {@JoinColumn(name = "actors_id")}
//    )
//    private List<ActorEntity> actorsList = new ArrayList<>();
//
//    @ManyToMany(cascade = CascadeType.ALL)
//    @JoinTable(
//            name="actress_movie",
//            joinColumns = {@JoinColumn(name = "movies_id")},
//            inverseJoinColumns = {@JoinColumn(name = "actresses_id")}
//    )
//    private List<ActressEntity> actressList = new ArrayList<>();

    @Column(name="director")
    private String director;

    @Column(name="country")
    private String country;

    @Column(name="mpaa_rating")
    private String mpaa_rating;

    @Column(name="availability_type")
    private String availability_type;

    @Column(name="price")
    private double price;

    @Column(name="status")
    private boolean status;


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

    public String getStudio_name() {
        return studio_name;
    }

    public void setStudio_name(String studio_name) {
        this.studio_name = studio_name;
    }

    public String getSynopsis() {
        return synopsis;
    }

    public void setSynopsis(String synopsis) {
        this.synopsis = synopsis;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public String getYoutube_url() {
        return youtube_url;
    }

    public void setYoutube_url(String youtube_url) {
        this.youtube_url = youtube_url;
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

    public String getMpaa_rating() {
        return mpaa_rating;
    }

    public void setMpaa_rating(String mpaa_rating) {
        this.mpaa_rating = mpaa_rating;
    }

    public String getAvailability_type() {
        return availability_type;
    }

    public void setAvailability_type(String availability_type) {
        this.availability_type = availability_type;
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

}