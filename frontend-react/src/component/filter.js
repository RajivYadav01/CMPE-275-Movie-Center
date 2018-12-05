import React, {Component} from 'react';
// import Navbar from '../components/Navbar';
import '../css/filter.css';
import axios from 'axios';
import Navbar from "./Navbar";
import {Link} from "react-router-dom";
import '../App.css';


class Filter extends Component {

    constructor() {
        super();
        this.state = {
            filterToggle: false,
            searchText : '',
            actor: '',
            director: '',
            year: '',
            mpaaRatingG: false,
            mpaaRatingPG: false,
            mpaaRatingPG13: false,
            mpaaRatingR: false,
            mpaaRatingNC17: false,
            genreAction: false,
            genreComedy: false,
            genreDrama: false,
            genreHorror: false,
            genreThriller: false,
            genreRomance: false,
            genreCrime: false,
            genreFantasy: false,
            genreMystery: false,
            genreWar: false,
            genreAnimation: false,
            genreBiography: false,
            ratingsRadio : '',
            movies : [],
            displayArray : [],
            arr : []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFilterToggle = this.handleFilterToggle.bind(this);
        this.handleFlag = this.handleFlag.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentWillMount() {

        axios.get('http://localhost:8080/movies/',{
            headers: {"Authorization" : localStorage.getItem("Authorization")}
        })
            .then((response)=>{
                console.log(response.data);
                this.setState({
                    movies : response.data,
                    displayArray : response.data
                })
            })

    }

    // componentDidMount() {
    //     document.addEventListener('keydown', function(event) {
    //         if(event.keyCode === 13 ) {
    //             console.log('after clicking enter on keyboard : ', this.state.searchText);
    //             console.log(document.getElementById('searchbutton'));
    //             // document.getElementById('searchbutton').click();
    //         }
    //     });
    // }

    handleFilterToggle = (e) => {
        e.preventDefault();
        this.setState({
            filterToggle: !this.state.filterToggle
        });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        },()=>{
            console.log(this.state);
            if(this.state.actor===""
                && this.state.director===""
                && this.state.year===""
                && !this.state.mpaaRatingG
                && !this.state.mpaaRatingPG
                && !this.state.mpaaRatingPG13
                && !this.state.mpaaRatingR
                && !this.state.mpaaRatingNC17
                && !this.state.genreAction
                && !this.state.genreComedy
                && !this.state.genreDrama
                && !this.state.genreHorror
                && !this.state.genreThriller
                && !this.state.genreRomance
                && !this.state.genreCrime
                && !this.state.genreFantasy
                && !this.state.genreMystery
                && !this.state.genreWar
                && !this.state.genreAnimation
                && !this.state.genreBiography
                && this.state.ratingsRadio===""){
                console.log('filters cleared');
                this.handleSearch();
            }
            // else if (this.state.actor===""
            //     && this.state.director===""
            //     && this.state.year===""
            //     && this.state.searchText===""
            //     && !this.state.mpaaRatingG
            //     && !this.state.mpaaRatingPG
            //     && !this.state.mpaaRatingPG13
            //     && !this.state.mpaaRatingR
            //     && !this.state.mpaaRatingNC17
            //     && !this.state.genreAction
            //     && !this.state.genreComedy
            //     && !this.state.genreDrama
            //     && !this.state.genreHorror
            //     && !this.state.genreThriller
            //     && !this.state.genreRomance
            //     && !this.state.genreCrime
            //     && !this.state.genreFantasy
            //     && !this.state.genreMystery
            //     && !this.state.genreWar
            //     && !this.state.genreAnimation
            //     && !this.state.genreBiography
            //     && this.state.ratingsRadio===""){
            //     console.log('All Fields cleared');
            // }
        });
    };

    handleFlag = (e) => {
        let x = e.target.name ;
        this.setState({
            [e.target.name]: !this.state[x]
        },()=>{
            if(this.state.actor===""
                && this.state.director===""
                && this.state.year===""
                && !this.state.mpaaRatingG
                && !this.state.mpaaRatingPG
                && !this.state.mpaaRatingPG13
                && !this.state.mpaaRatingR
                && !this.state.mpaaRatingNC17
                && !this.state.genreAction
                && !this.state.genreComedy
                && !this.state.genreDrama
                && !this.state.genreHorror
                && !this.state.genreThriller
                && !this.state.genreRomance
                && !this.state.genreCrime
                && !this.state.genreFantasy
                && !this.state.genreMystery
                && !this.state.genreWar
                && !this.state.genreAnimation
                && !this.state.genreBiography
                && this.state.ratingsRadio==="" ){
                console.log('filters cleared');
                this.handleSearch();
            }
        });
    };

    handleRating = (e) => {
        this.setState({
            ratingsRadio : e.target.value
        })
    };

    static handleSplit(s) {
        return s.split(",");
    };

    handleAllFilters = (e) =>{
        e.preventDefault();
        let allFilters = {
            actor: this.state.actor,
            director: this.state.director,
            year: this.state.year,
            mpaaRatingG: this.state.mpaaRatingG,
            mpaaRatingPG: this.state.mpaaRatingPG,
            mpaaRatingPG13: this.state.mpaaRatingPG13,
            mpaaRatingR: this.state.mpaaRatingR,
            mpaaRatingNC17: this.state.mpaaRatingNC17,
            genreAction: this.state.genreAction,
            genreComedy: this.state.genreComedy,
            genreDrama: this.state.genreDrama,
            genreHorror: this.state.genreHorror,
            genreThriller: this.state.genreThriller,
            genreRomance: this.state.genreRomance,
            genreCrime: this.state.genreCrime,
            genreFantasy: this.state.genreFantasy,
            genreMystery: this.state.genreMystery,
            genreWar: this.state.genreWar,
            genreAnimation: this.state.genreAnimation,
            genreBiography: this.state.genreBiography,
            ratingsRadio : this.state.ratingsRadio
        };
        console.log('Applied filters', allFilters);

        let filteredByActor = [] ;
        // console.log('filteredByActor',filteredByActor);

        let filteredByDirector = [] ;
        // console.log('filteredByDirector',filteredByDirector);
        //
        let filteredByYear = [];
        // console.log('filteredByYear',filteredByYear);
        //
        let filteredByMPAA = [];
        // console.log('filteredByMPAA',filteredByMPAA);
        //
        let filteredByGenre = [];
        // console.log('filteredByGenre',filteredByGenre);

        let filteredByRating = [];
        // let finalSet = new Set();

        if(this.state.actor !== ''){
            if (this.state.movies !== '') 
                filteredByActor = this.filterByActor(this.state.movies);
            console.log('filteredByActor',filteredByActor);
        }
        else
            filteredByActor = this.state.movies;

        if(this.state.director !== ''){
            if(filteredByActor!=='')
                filteredByDirector = this.filterByDirector(filteredByActor);
            console.log('filteredByDirector' , filteredByDirector)
        }
        else
            filteredByDirector = filteredByActor;

        if(this.state.year !== ''){
            if(filteredByDirector!=='')
                filteredByYear = this.filterByYear(filteredByDirector);
            console.log('filteredByYear' , filteredByYear)
        }
        else
            filteredByYear = filteredByDirector;

        if(!this.state.mpaaRatingG
            || !this.state.mpaaRatingPG
            || !this.state.mpaaRatingPG13
            || !this.state.mpaaRatingR
            || !this.state.mpaaRatingNC17){
            if(filteredByYear!=='')
                filteredByMPAA = this.filterByMPAA(filteredByYear);
            console.log('filteredByMPAA',filteredByMPAA)
        }
        else
            filteredByMPAA = filteredByYear;

        if(!this.state.genreAction
            || !this.state.genre
            || !this.state.genreComedy
            || !this.state.genreDrama
            || !this.state.genreHorror
            || !this.state.genreThriller
            || !this.state.genreRomance
            || !this.state.genreCrime
            || !this.state.genreFantasy
            || !this.state.genreMystery
            || !this.state.genreWar
            || !this.state.genreAnimation
            || !this.state.genreBiography ){
            if(filteredByMPAA!==''){
                 filteredByGenre = this.filterByGenre(filteredByMPAA);
                 console.log('filteredByGenre',filteredByGenre);
            }
        }
        else
            filteredByGenre = filteredByMPAA ;

        if(this.state.ratingsRadio!== ''){
            if(filteredByGenre!=='')
                filteredByRating = this.filterByRating(filteredByGenre);
            console.log('filteredByRating',filteredByRating)
        }
        else
            filteredByRating = filteredByGenre;

        // filteredByActor.forEach(i=>{
        //     finalSet.add(i)
        // });
        //
        // filteredByDirector.forEach(i=>{
        //     finalSet.add(i);
        // });
        //
        // filteredByYear.forEach(i=>{
        //     finalSet.add(i)
        // });
        //
        // filteredByMPAA.forEach(i=>{
        //     finalSet.add(i);
        // });
        //
        // filteredByGenre.forEach(i=>{
        //     finalSet.add(i);
        // });

        this.setState({
            displayArray : filteredByRating
        })

    };

    filterByRating(arr){
        let num = this.state.ratingsRadio ;

        let temp = arr;
        let set = new Set();

        if(num !== ''){
            temp.forEach(i=>{
                if(i.averageRating>=num)
                    set.add(i);
            });
            return Array.from(set);
        }
        else {
            return arr;
        }
    }

    filterByGenre(arr){

        let action = this.state.genreAction ;
        let comedy = this.state.genreComedy;
        let drama = this.state.genreDrama;
        let horror = this.state.genreHorror;
        let thriller = this.state.genreThriller;
        let romance = this.state.genreRomance;
        let crime = this.state.genreCrime;
        let fantasy = this.state.genreFantasy;
        let mystery = this.state.genreMystery;
        let war = this.state.genreWar;
        let animation = this.state.genreAnimation;
        let biography = this.state.genreBiography;

        let set = new Set();
        let temp = arr;
        console.log("inside genre",temp);
        var flag = false;

        if(action){
            flag = true;
            temp.forEach((i)=>{
                if(i.genre.toLowerCase().trim() === 'action')   {
                         set.add(i);
                }

            })
        }

        if(comedy){
            flag = true;
            temp.forEach((i)=>{
                if(i.genre.toLowerCase().trim() === 'comedy')    {
                    set.add(i);
                }

            })
        }

        if(drama){
            flag = true;
            temp.forEach((i)=>{
                if(i.genre.toLowerCase().trim() === 'drama') {
                    set.add(i);
                }

            })
        }

        if(horror){
            flag = true;
            temp.forEach((i)=>{
                if(i.genre.toLowerCase().trim() === 'horror') {
                            set.add(i);
                }

            })
        }

        if(thriller){
            temp.forEach((i)=>{
                flag = true;
                if(i.genre.toLowerCase().trim() === 'thriller')    {
                      set.add(i);
                }

            })
        }

        if(romance){
            flag = true;
            temp.forEach((i)=>{
                if(i.genre.toLowerCase().trim() === 'romance')  {
                    set.add(i);
                }

            })
        }

        if(crime){
            flag = true;
            temp.forEach((i)=>{
                if(i.genre.toLowerCase().trim() === 'crime')  {
                    set.add(i);
                }

            })
        }

        if(fantasy){
            flag = true;
            temp.forEach((i) => {
                if(i.genre.toLowerCase().trim() === 'fantasy') {
                       set.add(i);
                }
            })
        }

        if(mystery){
            flag = true;
            temp.forEach((i) => {
                if(i.genre.toLowerCase().trim() === 'mystery')  {
                       set.add(i);
                }
            })
        }

        if(war){
            flag = true;
            temp.forEach((i) => {
                if(i.genre.toLowerCase().trim() === 'war'){
                     set.add(i);
                }
            })
        }

        if(animation){
            flag = true;
            temp.forEach((i) => {
                if(i.genre.toLowerCase().trim() === 'animation')   {
                      set.add(i);
                }
            })
        }

        if(biography){
            flag = true;
            temp.forEach((i) => {
                if(i.genre.toLowerCase().trim() === 'biography') {
                     set.add(i);
                }
            })
        }

        console.log('set in genre : ', set);
        console.log('flag in genre : ', flag);

        if(flag)
            return Array.from(set);
        else
            return arr;

    }

    filterByMPAA(arr){
        let g = this.state.mpaaRatingG;
        let pg = this.state.mpaaRatingPG;
        let pg13 = this.state.mpaaRatingPG13;
        let r = this.state.mpaaRatingR;
        let nc17 = this.state.mpaaRatingNC17;

        let set = new Set();
        let temp = arr;
        console.log(arr);

        var flag = false;
        if(arr==='')
            return [];

        if(g){
            console.log('inside g');
            flag = true;
            temp.forEach((i)=>{
                console.log('inside g', i.mpaaRating.toUpperCase().trim());
                if(i.mpaaRating.toUpperCase().trim() === 'G')  {
                       set.add(i);
                }


            })
        }
        if(pg){
            flag = true;
            console.log('inside pg');
            temp.forEach((i)=>{
                console.log('inside pg', i.mpaaRating.toUpperCase().trim());
                if(i.mpaaRating.toUpperCase().trim() === 'PG'){
                    flag = true;
                    set.add(i);
                }
            })
        }
        if(pg13){
            flag = true;
            temp.forEach((i)=>{
                if(i.mpaaRating.toUpperCase().trim() === 'PG-13')   {
                    flag = true;
                     set.add(i);
                }

            })
        }
        if(r){
            flag = true;
            temp.forEach((i)=>{
                if(i.mpaaRating.toUpperCase().trim() === 'R')   {
                    flag = true;
                      set.add(i);
                }

            })
        }
        if(nc17){
            flag = true;
            temp.forEach((i)=>{
                if(i.mpaaRating.toUpperCase().trim() === 'NC-17')     {
                        flag = true;
                         set.add(i);
                }

            })
        }
        console.log('set : ', set);
        if(flag){
               return Array.from(set);
        } else{
            return arr;
        }

    }

    filterByYear(arr){

        if(this.state.year === '')
            return [];

        let yearArray = Filter.handleSplit(this.state.year);

        let set = new Set();

        // console.log('splitted year array',yearArray);
        // console.log('year of release of first movie in array',temp[0].yearOfRelease);

        arr.forEach((i)=>{
            yearArray.forEach((j)=>{
                if(i.yearOfRelease.includes(j.trim()))
                    set.add(i)
            })
        });

        return Array.from(set)
    }

    filterByDirector(arr) {

        if(this.state.director === '')
            return [];

        let directorArray = Filter.handleSplit(this.state.director);
        let set = new Set();

        arr.forEach((i)=>{
            directorArray.forEach((j)=>{
                if(i.director.toLowerCase().includes(j.trim().toLowerCase()))
                    set.add(i)
            })
        });
        return Array.from(set)
    }

    filterByActor(arr){

        if(this.state.actor === '')
            return [];

        let actorArray = Filter.handleSplit(this.state.actor);
        let set = new Set();

        arr.forEach( (i) => {
            actorArray.forEach( (j) => {
                if(i.actors.toLowerCase().includes(j.trim().toLowerCase()))
                    set.add(i);
            })
        });

        return Array.from(set);

    }

    handleSearch = (e) => {
        var headers = new Headers();
        //headers.append('Authorization', localStorage.getItem("Authorization"));
        console.log('search clicked');
        let keyword = this.state.searchText;

        if(keyword === ''){
            axios.get('http://localhost:8080/movies/',{
                headers: {"Authorization" : localStorage.getItem("Authorization")}
            })
                .then((response)=>{
                    console.log(response.data);
                    this.setState({
                        movies : response.data,
                        displayArray : response.data
                    })
                })
        }
        else if(keyword !== ''){
            axios.get('http://localhost:8080/movies/search/'+keyword,{
                headers: {"Authorization" : localStorage.getItem("Authorization")}
            })
                .then((response)=>{
                    console.log(response.data);
                    this.setState({
                        movies : response.data,
                        displayArray : response.data,
                        arr : response.data
                    })
                })
        }
    };

    render() {

        console.log("state in Render : ", this.state);
        const styleForLiA = {
            float: "right",
            display: "block",
            color: "#000",
            textAlign: "center",
            padding: "10px 15px",
            textDecoration: "none",
        };
        const styleForButton = {
            float: 'right',
            height: "50px",
            marginRight: '19%'
        };
        const styleForApplyFilter = {
            float:'right',
            marginRight : '12px',
            height: '50px'
        };
        const genreStyle = {float: 'left', marginRight: '25px'};
        const MPAAStyle = {
            paddingTop: '10px',
            paddingBottom: '10px',
            marginRight: '10px'
        };

        let movieDetails = null;
        movieDetails = this.state.displayArray.map((m,index) => {
            return(
                <tr key={m.movieId}  >
                    <td ><a style={{color: 'rgb(0, 255, 245)'}} href={`/movieDetails/${m.movieId}`}>{m.title}
                        </a>
                    </td>
                    <td>{m.actors}</td>
                    <td>{m.director}</td>
                    <td>{m.genre}</td>
                    <td>{m.mpaaRating}</td>
                    <td>{m.yearOfRelease}</td>
                    <td>{m.averageRating}</td>
                </tr>
            )
        });

        if (this.state.filterToggle) {
            return (
                <div>
                    <Navbar/>
                    <div className="bg-wrapper" style={{opacity: ".75"}}>
                        <img className="bg-img "
                             src="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg"
                             srcSet="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w"
                             alt=""/>
                    </div>
                    <br/>
                    <form className='filterSearch' >
                        <div style={{width:'1100px', float:'left', marginLeft: '-3%'}}>
                            <input type="text" id='searchbox'
                                   className="searchField form-control"
                                   id="exampleInputTitle"
                                   onChange={this.handleChange}
                                   name='searchText'
                                   placeholder="Search for movie by title, people, genre, availability, etc."
                                   style={{width:'1160px', marginLeft: '20.5%', float:'left'}} />
                        </div>
                        {/*<div style={{width:'150px', float:'left', marginLeft: '2.5%'}}>*/}
                        {/*<button className="form-control"*/}
                        {/*id="exampleInputTitle"*/}
                        {/*onClick={this.handleSearch}>*/}
                        {/*<label> Search </label>*/}
                        {/*</button>*/}
                        {/*</div>*/}
                    </form>
                    <br/>
                    <ul>
                        <button className="btn btn-secondary"
                                style={styleForButton}
                                onClick={this.handleFilterToggle}>
                            <a href="/" style={styleForLiA}>All Filters</a>
                        </button>
                        <button className="btn btn-success"
                                style={styleForApplyFilter}
                                onClick={this.handleAllFilters}>
                            <a href="/" style={styleForLiA}>Apply Filters</a>
                        </button>
                    </ul>
                    <br/>
                    <div style={{ marginLeft:'12%', marginRight:'13%'}}>
                        <form style={{color: "white", width: "115%", alignContent: "center"}}>
                            <div>
                                <div className='filterField' style={{float: 'left', width: '23%' ,
                                        height: '266px', paddingRight:'10px', paddingLeft : '35px'}}>
                                    <h4>Actor</h4>
                                    <input type='text' className='form-control'
                                           placeholder='Enter Actor Name'
                                           name='actor'
                                           onChange={this.handleChange} style={{width: "85%"}}/>
                                    <h4>Director</h4>
                                    <input type='text' className='form-control'
                                           placeholder='Enter Director Name'
                                           name='director'
                                           onChange={this.handleChange} style={{width: "85%"}}/>
                                    <h4>Year</h4>
                                    <input type='text' className='form-control'
                                           placeholder='Enter Year'
                                           name='year'
                                           onChange={this.handleChange} style={{width: "85%"}}/>
                                </div>
                                <div className='filterField' style={{float: 'left', width: '26%' ,
                                    height: '266px', paddingRight:'10px'}}>
                                    <h3>
                                        <b>
                                            MPAA Rating
                                        </b>
                                    </h3>
                                    <div className="form-check">
                                        <input className="form-check-input" style={MPAAStyle}
                                               type="checkbox"
                                               name='mpaaRatingG'
                                               onChange={this.handleFlag}/>
                                        <label className="form-check-label">
                                            G – General Audiences
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" style={MPAAStyle}
                                               type="checkbox"
                                               name='mpaaRatingPG'
                                               onChange={this.handleFlag}/>
                                        <label className="form-check-label">
                                            PG – Parental Guidance Suggested
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" style={MPAAStyle}
                                               type="checkbox" name='mpaaRatingPG13'
                                               onChange={this.handleFlag}/>
                                        <label className="form-check-label">
                                            PG-13 – Parents Strongly Cautioned
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" style={MPAAStyle}
                                               type="checkbox" name='mpaaRatingR'
                                               onChange={this.handleFlag}/>
                                        <label className="form-check-label" >
                                            R – Restricted
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" style={MPAAStyle}
                                               type="checkbox" name='mpaaRatingNC17'
                                               onChange={this.handleFlag}/>
                                        <label className="form-check-label" htmlFor="defaultCheck1">
                                            NC-17 – Adults Only
                                        </label>
                                    </div>
                                </div>
                                <div className='filterField' style={{float: 'left', width: '28%' ,
                                    height: '266px', paddingRight:'10px'}}>
                                    <h3>
                                        <b>
                                            Genre
                                        </b>
                                    </h3>
                                    <div className='col-6'>
                                        <div className="form-check" style={genreStyle}>
                                            <input className="form-check-input" style={{marginRight: '10px'}}
                                                   type="checkbox" name='genreAction'
                                                   onChange={this.handleFlag}/>
                                            <label className="form-check-label">
                                                Action
                                            </label>
                                        </div>
                                        <div className="form-check" style={genreStyle}>
                                            <input className="form-check-input" style={{marginRight: '10px'}}
                                                   type="checkbox" name='genreComedy'
                                                   onChange={this.handleFlag}/>
                                            <label className="form-check-label">
                                                Comedy
                                            </label>
                                        </div>
                                        <div className="form-check" style={genreStyle}>
                                            <input className="form-check-input" style={{marginRight: '10px'}}
                                                   type="checkbox" name='genreDrama'
                                                   onChange={this.handleFlag}/>
                                            <label className="form-check-label">
                                                Drama
                                            </label>
                                        </div>
                                        <div className="form-check" style={genreStyle}>
                                            <input className="form-check-input" style={{marginRight: '10px'}}
                                                   type="checkbox" name='genreHorror'
                                                   onChange={this.handleFlag}/>
                                            <label className="form-check-label">
                                                Horror
                                            </label>
                                        </div>
                                        <div className="form-check" style={genreStyle}>
                                            <input className="form-check-input" style={{marginRight: '10px'}}
                                                   type="checkbox" name='genreThriller'
                                                   onChange={this.handleFlag}/>
                                            <label className="form-check-label">
                                                Thriller
                                            </label>
                                        </div>
                                        <div className="form-check" style={genreStyle}>
                                            <input className="form-check-input" style={{marginRight: '10px'}}
                                                   type="checkbox" name='genreRomance'
                                                   onChange={this.handleFlag}/>
                                            <label className="form-check-label">
                                                Romance
                                            </label>
                                        </div>
                                        <div className="form-check" style={genreStyle}>
                                            <input className="form-check-input" style={{marginRight: '10px'}}
                                                   type="checkbox" name='genreCrime'
                                                   onChange={this.handleFlag}/>
                                            <label className="form-check-label" htmlFor="defaultCheck1">
                                                Crime
                                            </label>
                                        </div>
                                        <div className="form-check" style={genreStyle}>
                                            <input className="form-check-input" style={{marginRight: '10px'}}
                                                   type="checkbox" name='genreFantasy'
                                                   onChange={this.handleFlag}/>
                                            <label className="form-check-label">
                                                Fantasy
                                            </label>
                                        </div>
                                        <div className="form-check" style={genreStyle}>
                                            <input className="form-check-input" style={{marginRight: '10px'}}
                                                   type="checkbox" name='genreMystery'
                                                   onChange={this.handleFlag}/>
                                            <label className="form-check-label">
                                                Mystery
                                            </label>
                                        </div>
                                        <div className="form-check" style={genreStyle}>
                                            <input className="form-check-input" style={{marginRight: '10px'}}
                                                   type="checkbox" name='genreWar'
                                                   onChange={this.handleFlag}/>
                                            <label className="form-check-label">
                                                War
                                            </label>
                                        </div>
                                        <div className="form-check" style={genreStyle}>
                                            <input className="form-check-input" style={{marginRight: '10px'}}
                                                   type="checkbox" name='genreAnimation'
                                                   onChange={this.handleFlag}/>
                                            <label className="form-check-label">
                                                Animation
                                            </label>
                                        </div>
                                        <div className="form-check" style={genreStyle}>
                                            <input className="form-check-input" style={{marginRight: '10px'}}
                                                   type="checkbox" name='genreBiography'
                                                   onChange={this.handleFlag}/>
                                            <label className="form-check-label">
                                                Biography
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className='filterField' style={{float: 'left', width: '11%' ,
                                    height: '266px', paddingRight:'10px', paddingLeft : '0px'}}>
                                    <h3>
                                        <b>
                                            Ratings
                                        </b>
                                    </h3>
                                    <div className="form-check">
                                        <input className="form-check-input" style={{marginRight: '10px'}}
                                               type="radio" name="exampleRadios"
                                               onChange={this.handleRating} value='5'/>
                                        <label className="form-check-label" htmlFor="exampleRadios5">
                                            5
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" style={{marginRight: '10px'}}
                                               type="radio" name="exampleRadios"
                                               id="exampleRadios4"
                                               onChange={this.handleRating} value="4"/>
                                        <label className="form-check-label" htmlFor="exampleRadios4">
                                            4 & up
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" style={{marginRight: '10px'}}
                                               type="radio" name="exampleRadios"
                                               id="exampleRadios3"
                                               onChange={this.handleRating} value="3"/>
                                        <label className="form-check-label" htmlFor="exampleRadios3">
                                            3 & up
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" style={{marginRight: '10px'}}
                                               type="radio" name="exampleRadios"
                                               id="exampleRadios2"
                                               onChange={this.handleRating} value="2"/>
                                        <label className="form-check-label" htmlFor="exampleRadios2">
                                            2 & up
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" style={{marginRight: '10px'}}
                                               type="radio" name="exampleRadios"
                                               id="exampleRadios1"
                                               onChange={this.handleRating} value="1"/>
                                        <label className="form-check-label" htmlFor="exampleRadios1">
                                            1 & up
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <div style={{marginLeft:'12%', marginRight:'12%', marginTop: '250px'}}>
                        <div className="table-responsive"
                             style={{backgroundColor:'black', opacity:'0.85',
                                 color:'rgb(255, 255, 255)'}}>
                            <table id="myTable"
                                   className="table">
                                <thead style={{fontWeight: '900', fontSize: '20px' }}>
                                <tr>
                                    <th>Movie Title</th>
                                    <th>Actors</th>
                                    <th>Director</th>
                                    <th>Genre</th>
                                    <th>MPAA Rating</th>
                                    <th>Year of Release</th>
                                    <th>Rating</th>
                                </tr>
                                </thead>
                                <tbody style={{fontWeight: '400', fontSize: '16px' }}>
                                {movieDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Navbar/>
                    <div className="bg-wrapper" style={{opacity: ".85"}}>
                        <img className="bg-img "
                             src="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg"
                             srcSet="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w"
                             alt=""/>
                    </div>
                    <br/>
                    <form className='filterSearch' >
                        <div style={{width:'1100px', float:'left', marginLeft: '-3%'}}>
                            <input type="text" id='searchbox'
                                   className="searchField form-control"
                                   id="exampleInputTitle"
                                   onChange={this.handleChange}
                                   name='searchText'
                                   placeholder="Search for movie by title, people, genre, availability, etc."
                                   style={{width:'1160px', marginLeft: '20.5%', float:'left'}} />
                        </div>
                        {/*<div style={{width:'150px', float:'left', marginLeft: '2.5%'}}>*/}
                            {/*<button className="form-control"*/}
                                    {/*id="exampleInputTitle"*/}
                                    {/*onClick={this.handleSearch}>*/}
                                {/*<label> Search </label>*/}
                            {/*</button>*/}
                        {/*</div>*/}
                    </form>
                    <br/>
                    <ul>
                        <button className="searchbutton btn btn-secondary"
                                style={styleForButton}
                                onClick={this.handleFilterToggle}>
                            <a href="/" style={styleForLiA}>All Filters</a>
                        </button>
                    </ul>
                    <br/>
                    <br/>
                    <div style={{marginLeft:'12%', marginRight:'12%'}}>
                        <div className="table-responsive" style={{backgroundColor:'black', opacity:'0.85', color:'rgb(255, 255, 255)'}}>
                            <table id="myTable"
                                   className="table">
                                <thead style={{fontWeight: '900', fontSize: '20px' }}>
                                <tr>
                                    <th>Movie Title</th>
                                    <th>Actors</th>
                                    <th>Director</th>
                                    <th>Genre</th>
                                    <th>MPAA Rating</th>
                                    <th>Year of Release</th>
                                    <th>Rating</th>
                                </tr>
                                </thead>
                                <tbody style={{fontWeight: '400', fontSize: '16px' }}>
                                {movieDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

//
// const mapDispatchToProps = dispatch => {
//     console.log('inside mapdispatchtoprops')
//     return{
//         onApplyFilters : (params) => {dispatch(filterMovies(params))}
//     }
// };

export default Filter;
