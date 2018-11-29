package cmpe275.team.ninja.movieCenter.ui.controller;

import cmpe275.team.ninja.movieCenter.service.interfaces.AdminService;
import cmpe275.team.ninja.movieCenter.shared.dto.MovieDto;
import cmpe275.team.ninja.movieCenter.ui.model.request.MovieDetailsRequestModel;
import cmpe275.team.ninja.movieCenter.ui.model.response.MovieDetailsResponseModel;
import cmpe275.team.ninja.movieCenter.ui.model.response.OperationStatusModel;
import cmpe275.team.ninja.movieCenter.ui.model.response.RequestOperationName;
import cmpe275.team.ninja.movieCenter.ui.model.response.RequestOperationStatus;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("admin")
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
            path="/update_movie",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public MovieDetailsResponseModel updateMovie(
            @RequestParam("title") String title,
            @RequestBody MovieDetailsRequestModel movieDetailsRequestModel) {
        System.out.println("Title in update call:"+title);
        ModelMapper modelMapper = new ModelMapper();
        MovieDto movieDtoToUpdate = modelMapper.map(movieDetailsRequestModel, MovieDto.class);

        MovieDto returnedMovieDto = adminService.updateMovie(title, movieDtoToUpdate);

        System.out.println(returnedMovieDto);

        MovieDetailsResponseModel movieDetailsResponseModel = modelMapper.map(returnedMovieDto, MovieDetailsResponseModel.class);

        return movieDetailsResponseModel;
    }

    @DeleteMapping(
            path="/delete_movie",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public OperationStatusModel deleteMovie(@RequestParam("title") String title){
        OperationStatusModel operationStatusModel = new OperationStatusModel();
        operationStatusModel.setOperationName(RequestOperationName.DELETE.name());
        adminService.deleteMovie(title);
        operationStatusModel.setOperationResult(RequestOperationStatus.SUCCESS.name());
        return operationStatusModel;
    }



}
