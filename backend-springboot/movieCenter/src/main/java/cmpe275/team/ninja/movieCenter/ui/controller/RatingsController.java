package cmpe275.team.ninja.movieCenter.ui.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cmpe275.team.ninja.movieCenter.service.interfaces.RatingsService;
import cmpe275.team.ninja.movieCenter.shared.dto.RatingsDto;
import cmpe275.team.ninja.movieCenter.shared.dto.UserDto;
import cmpe275.team.ninja.movieCenter.ui.model.request.RatingsRequestModel;
import cmpe275.team.ninja.movieCenter.ui.model.response.RatingsResponseModel;
import cmpe275.team.ninja.movieCenter.ui.model.response.UserDetailModel;


@RestController
@RequestMapping("ratings")
public class RatingsController {
	@Autowired
	RatingsService ratingsService;
	
	@GetMapping(produces = { MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE })
    public List<RatingsResponseModel> getRataingsByUser(@RequestParam(value = "userid") String userId, @RequestParam(value = "page", defaultValue = "0") int page,
			@RequestParam(value = "limit", defaultValue = "4") int limit) throws Exception{
    	List<RatingsResponseModel> returnValue = new ArrayList<>();
    	
		List<RatingsDto> ratingsDto = ratingsService.getRatingsByUserId(userId, page, limit);
		for (RatingsDto rating : ratingsDto) {
			RatingsResponseModel ratingsModel = new RatingsResponseModel();
			BeanUtils.copyProperties(rating, ratingsModel);
			returnValue.add(ratingsModel);
		}
		return returnValue;
    }
	
	@PostMapping(consumes = { MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE }, produces = {
    		MediaType.APPLICATION_XML_VALUE, MediaType.APPLICATION_JSON_VALUE })
    public RatingsResponseModel createRating(@RequestBody RatingsRequestModel ratingsRequestModel) throws Exception{
        RatingsDto ratingsDto = new RatingsDto();
        RatingsResponseModel ratingsResponseModel = new RatingsResponseModel();
        BeanUtils.copyProperties(ratingsRequestModel,ratingsDto);

        RatingsDto createdRating = ratingsService.createRating(ratingsDto);

        BeanUtils.copyProperties(createdRating,ratingsResponseModel);

        return ratingsResponseModel;
    }

}
