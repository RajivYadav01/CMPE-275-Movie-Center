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
import java.util.Map;


@RestController
@RequestMapping("admin")
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = {"*"})
public class AdminController {

    @Autowired
    AdminService adminService;

    @PatchMapping(
            path="/user/{userId}/toggleuseractivation",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public OperationStatusModel toggleUserActivation(@PathVariable String userId) {
        OperationStatusModel operationStatusModel = new OperationStatusModel();
        operationStatusModel.setOperationName(RequestOperationName.USERACTIVATION.name());

        String result = adminService.toggleUserActivation(userId);
        if(result.equalsIgnoreCase("User updated successfully")) {
            operationStatusModel.setOperationResult(RequestOperationStatus.SUCCESS.name());
        } else {
            operationStatusModel.setOperationResult(RequestOperationStatus.ERROR.name());
        }

        operationStatusModel.setData(result);
        return operationStatusModel;
    }



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
            path= "/users/{id}/history",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public List<MovieDetailsResponseModel> getMoviePlayingHistoryForUser(@PathVariable String id) {
        List<MovieDetailsResponseModel> movieDetailsResponseModels = new ArrayList<>();
        List<MovieDto> movieDtos = adminService.getMoviePlayingHistoryForUser(id);
        ModelMapper modelMapper = new ModelMapper();
        if (movieDtos == null)
            return new ArrayList<>();
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

    @GetMapping(
            path="/movies/{movieid}/numberofplays",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public OperationStatusModel getNumberOfPlaysForMovie(@PathVariable String movieid, @RequestParam("period") String period) {
        OperationStatusModel operationStatusModel = new OperationStatusModel();
        operationStatusModel.setOperationName(RequestOperationName.NUMBEROFPLAYS.name());
        int numberofplays = adminService.getNumberOfPlaysForMovie(movieid, period);
        operationStatusModel.setOperationResult(RequestOperationStatus.SUCCESS.name());
        operationStatusModel.setData(numberofplays);
        return operationStatusModel;
    }

    @GetMapping(
            path="/toptenmoviebyplays",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public List<MovieDetailsResponseModel> getTopTenMoviesByPeriod(@RequestParam("period") String period) {
        List<MovieDetailsResponseModel> responseModels = new ArrayList<>();
        List<MovieDto> movieDtos = adminService.getTopTenMoviesByPeriod(period);
        if(movieDtos == null)
            return new ArrayList<MovieDetailsResponseModel>();
        ModelMapper modelMapper = new ModelMapper();
        movieDtos.forEach(movieDto -> {
            responseModels.add(modelMapper.map(movieDto, MovieDetailsResponseModel.class));
        });
        return responseModels;
    }

    @GetMapping(
            path="/monthlyuserreport",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public List<UserReportResponseModel> getMonthlyUserReport(@RequestParam("reporttype") String reportType) {
        List<UserReportResponseModel> userReportResponseModels = new ArrayList<>();

        Map<String, Integer> map = adminService.getMonthlyUserReport(reportType);

        map.forEach((k,v)-> {
            UserReportResponseModel userReportResponseModel = new UserReportResponseModel();
            userReportResponseModel.setCustomMonthName(k);
            userReportResponseModel.setKey(k);
            userReportResponseModel.setValue(v);
            userReportResponseModels.add(userReportResponseModel);
        });

        return userReportResponseModels;
    }

    @GetMapping(
            path="/monthlyincomereport",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public List<IncomeReportResponseModel> getMonthlyIncomeReport(@RequestParam("reporttype") String reportType) {
        List<IncomeReportResponseModel> incomeReportResponseModels = new ArrayList<>();
        Map<String, Double> map = adminService.getMonthlyIncomeReport(reportType);

        map.forEach((k,v)-> {
            IncomeReportResponseModel incomeReportResponseModel = new IncomeReportResponseModel();
            incomeReportResponseModel.setCustomMonthName(k);
            incomeReportResponseModel.setKey(k);
            incomeReportResponseModel.setValue(v);
            incomeReportResponseModels.add(incomeReportResponseModel);
        });

        return incomeReportResponseModels;
    }

}