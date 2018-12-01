package cmpe275.team.ninja.movieCenter.ui.controller;

import cmpe275.team.ninja.movieCenter.service.interfaces.AdminService;
import cmpe275.team.ninja.movieCenter.shared.dto.MovieDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;
import cmpe275.team.ninja.movieCenter.ui.model.request.MovieDetailsRequestModel;
import cmpe275.team.ninja.movieCenter.ui.model.response.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("admin")
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = {"*"})
public class AdminController {

    @Autowired
    AdminService adminService;

    @PostMapping(
            path="/create_movie",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public MovieDetailsResponseModel createMovie(@RequestBody MovieDetailsRequestModel movieDetailsRequestModel) {

        ModelMapper modelMapper = new ModelMapper();
        MovieDto movieDto = modelMapper.map(movieDetailsRequestModel, MovieDto.class);

        MovieDto returnedMovieDto = adminService.createMovie(movieDto);

        MovieDetailsResponseModel movieDetailsResponseModel = modelMapper.map(returnedMovieDto, MovieDetailsResponseModel.class);

        return movieDetailsResponseModel;
    }

    @PutMapping(
            path="/update_movie/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public MovieDetailsResponseModel updateMovie(
            @PathVariable String id,
            @RequestBody MovieDetailsRequestModel movieDetailsRequestModel) {

        ModelMapper modelMapper = new ModelMapper();
        MovieDto movieDtoToUpdate = modelMapper.map(movieDetailsRequestModel, MovieDto.class);

        MovieDto returnedMovieDto = adminService.updateMovie(id, movieDtoToUpdate);

        System.out.println(returnedMovieDto);

        MovieDetailsResponseModel movieDetailsResponseModel = modelMapper.map(returnedMovieDto, MovieDetailsResponseModel.class);

        return movieDetailsResponseModel;
    }

    @DeleteMapping(
            path="/delete_movie/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public OperationStatusModel deleteMovie(@PathVariable String id){
        OperationStatusModel operationStatusModel = new OperationStatusModel();
        operationStatusModel.setOperationName(RequestOperationName.DELETE.name());
        adminService.deleteMovie(id);
        operationStatusModel.setOperationResult(RequestOperationStatus.SUCCESS.name());
        return operationStatusModel;
    }

    @GetMapping(
            path= "/user/{id}/history",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public List<MovieDetailsResponseModel> getMoviePlayingHistoryForUser(@PathVariable String id) {
        List<MovieDetailsResponseModel> movieDetailsResponseModels = new ArrayList<>();
        List<MovieDto> movieDtos = adminService.getMoviePlayingHistoryForUser(id);
        ModelMapper modelMapper = new ModelMapper();
        if (movieDtos == null)
            return null;
        movieDtos.forEach(movieDto -> {
            movieDetailsResponseModels.add(modelMapper.map(movieDto, MovieDetailsResponseModel.class));
        });

        return movieDetailsResponseModels;
    }

    @GetMapping(
            path="/toptenusers",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public List<UserResponseModel> getTopTenUsersByPeriod(@RequestParam("period") String period) {
        List<UserResponseModel> responseModels = new ArrayList<>();
        List<UserDto> userDtos = adminService.getTopTenUsersByPeriod(period);
        if(userDtos == null)
            return new ArrayList<UserResponseModel>();
        ModelMapper modelMapper = new ModelMapper();
        userDtos.forEach(userDto -> {
            responseModels.add(modelMapper.map(userDto, UserResponseModel.class));
        });
        return responseModels;
    }

}
