import React, {Component} from 'react';
// import Navbar from '../components/Navbar';
import '../css/filter.css';
import axios from 'axios';
import Navbar from "./Navbar";
import {Link} from "react-router-dom";



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
            movies : []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFilterToggle = this.handleFilterToggle.bind(this);
        this.handleFlag = this.handleFlag.bind(this);
        this.handleRating = this.handleRating.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', function(event) {
            if(event.keyCode === 13 ) {
                console.log('after clicking enter on keyboard : ', this.state.searchText);
                console.log(document.getElementById('searchbutton'));
                // document.getElementById('searchbutton').click();
            }
        });
    }

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

    handleSplit(s) {
        var array = s.split(",");
        return array;
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

        let filteredByActor = this.filterByActor();
        console.log(filteredByActor);

        let filteredByDirector = this.filterByDirector();
        console.log(filteredByDirector);

        let filteredByYear = this.filterByYear();
        console.log(filteredByYear);

        let filteredByMPAA = this.filterByMPAA();
        console.log(filteredByMPAA);

        let filteredByGenre = this.filterByGenre();
        console.log(filteredByGenre);

        this.setState({
            movies : filteredByMPAA
        })
    };

    filterByGenre(){

        let action = this.state.genreAction ;
        let comedy = this.state.genreComedy;
        let drama = this.state.genreDrama;
        let genreHorror = this.state.genreHorror;
        let genreThriller = this.state.genreThriller;
        let romance = this.state.genreRomance;
        let crime = this.state.genreCrime;
        let genreFantasy = this.state.genreFantasy;
        let genreMystery = this.state.genreMystery;
        let genreWar = this.state.genreWar;
        let genreAnimation = this.state.genreAnimation;
        let genreBiography = this.state.genreBiography;

        let set = new Set();
        let temp = this.state.movies;

    }

    filterByMPAA(){
        let g = this.state.mpaaRatingG;
        let pg = this.state.mpaaRatingPG;
        let pg13 = this.state.mpaaRatingPG13;
        let r = this.state.mpaaRatingR;
        let nc17 = this.state.mpaaRatingNC17;

        let set = new Set();
        let temp = this.state.movies;

        if(g){
            temp.forEach((i)=>{
                if(i.mpaaRating.toUpperCase().trim() === "G")
                    set.add(i);
            })
        }
        if(pg){
            temp.forEach((i)=>{
                if(i.mpaaRating.toUpperCase().trim() === "PG")
                    set.add(i);
            })
        }
        if(pg13){
            temp.forEach((i)=>{
                if(i.mpaaRating.toUpperCase().trim() === "PG-13")
                    set.add(i);
            })
        }
        if(r){
            temp.forEach((i)=>{
                if(i.mpaaRating.toUpperCase().trim() === "R")
                    set.add(i);
            })
        }
        if(nc17){
            temp.forEach((i)=>{
                if(i.mpaaRating.toUpperCase().trim() === "NC-17")
                    set.add(i);
            })
        }

        return Array.from(set);
    }

    filterByYear(){

        let yearArray = this.handleSplit(this.state.year);
        let set = new Set();

        let temp = this.state.movies;

        // console.log('splitted year array',yearArray);
        // console.log('year of release of first movie in array',temp[0].yearOfRelease);

        temp.forEach((i)=>{
            yearArray.forEach((j)=>{
                if(i.yearOfRelease.includes(j.trim()))
                    set.add(i)
            })
        });

        return Array.from(set)
    }

    filterByDirector() {

        let directorArray = this.handleSplit(this.state.director);
        let set = new Set();

        let temp = this.state.movies ;

        temp.forEach((i)=>{
            directorArray.forEach((j)=>{
                if(i.director.toLowerCase().includes(j.trim().toLowerCase()))
                    set.add(i)
            })
        });
        return Array.from(set)
    }

    filterByActor(){

        let actorArray = this.handleSplit(this.state.actor);
        let set = new Set();

        let tempArray = this.state.movies ;
        
        tempArray.forEach( (i) => {
            actorArray.forEach( (j) => {
                if(i.actors.toLowerCase().includes(j.trim().toLowerCase()))
                    set.add(i);
            })
        });

        return Array.from(set);

        // for( var i = 0 ; i < tempArray.length ; i++ ) {
        //     for( var j = 0 ; j < actorArray.length ; j++) {
        //         if(tempArray[i].actors.includes(actorArray[j]))
        //             set.add(tempArray[i]);
        //     }
        // }
    }

    handleSearch = (e) => {
        var headers = new Headers();
        //headers.append('Authorization', localStorage.getItem("Authorization"));
        console.log('search clicked');
        let keyword = this.state.searchText;
        axios.get('http://localhost:8080/movies/search/'+keyword,{
             headers: {"Authorization" : localStorage.getItem("Authorization")} 
        })
            .then((response)=>{
                console.log(response.data);
                this.setState({
                    movies : response.data
                })
            })
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
        movieDetails = this.state.movies.map((m,index) => {
            return(
                <tr key={m.movieId} >
                    <td><Link to= {`/movieDetails/${m.movieId}`}>{m.title}</Link></td>
                    <td>{m.actors}</td>
                    <td>{m.director}</td>
                    <td>{m.genre}</td>
                    <td>{m.mpaaRating}</td>
                    <td>{m.yearOfRelease}</td>
                    <td>{m.average_rating}</td>
                </tr>
            )
        });

        if (this.state.filterToggle) {
            return (
                <div>
                    <Navbar/>
                    <br/>
                    <div style={{width:'1400px'}}>
                        <div style={{width:'1100px', float:'left', marginLeft: '-3%'}}>
                            <input type="text"
                                   className="form-control"
                                   id="exampleInputTitle"
                                   onChange={this.handleChange}
                                   name='searchText'
                                   placeholder="Search for movie by title, people, genre, availability, etc."
                                   style={{width:'850px', marginLeft: '25%', float:'left'}} />
                        </div>
                        <div style={{width:'150px', float:'left', marginLeft: '2.5%'}}>
                            <button style={{height:'50px'}} className="form-control"
                                    id="searchbutton"
                                    onClick={this.handleSearch}>
                                <label> Search </label>
                            </button>
                        </div>
                    </div>
                    <br/><br/><br/><br/>
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
                    <div className='container' style={{ marginLeft:'15%'}}>
                        <form style={{color: "white", width: "115%", alignContent: "center"}}>
                            <div>
                                <div style={{float: 'left', width: '23%'}}>
                                    <h4>Actor</h4>
                                    <input type='text' className='form-control'
                                           placeholder='Enter Actor Name'
                                           name='actor'
                                           onChange={this.handleChange} style={{width: "75%"}}/>
                                    <h4>Director</h4>
                                    <input type='text' className='form-control'
                                           placeholder='Enter Director Name'
                                           name='director'
                                           onChange={this.handleChange} style={{width: "75%"}}/>
                                    <h4>Year</h4>
                                    <input type='text' className='form-control'
                                           placeholder='Enter Year'
                                           name='year'
                                           onChange={this.handleChange} style={{width: "75%"}}/>
                                </div>
                                <div style={{float: 'left', width: '23%'}}>
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
                                <div style={{float: 'left', width: '23%'}}>
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
                                <div style={{float: 'left', width: '15%'}}>
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
                    <div style={{marginLeft:'12%', marginRight:'12%'}}>
                        <div className="table-responsive" style={{backgroundColor: "white"}}>
                            <table id="myTable" className="table table-striped table-hover">
                                <thead>
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
                                <tbody>
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
                    <br/>
                    <div style={{width:'1400px'}}>
                        <div style={{width:'1100px', float:'left', marginLeft: '-3%'}}>
                            <input type="text" id='searchbox'
                                   className="form-control"
                                   id="exampleInputTitle"
                                   onChange={this.handleChange}
                                   name='searchText'
                                   placeholder="Search for movie by title, people, genre, availability, etc."
                                   style={{width:'850px', marginLeft: '25%', float:'left'}} />
                        </div>
                        <div style={{width:'150px', float:'left', marginLeft: '2.5%'}}>
                            <button className="form-control"
                                    id="exampleInputTitle"
                                    onClick={this.handleSearch}>
                                <label> Search </label>
                            </button>
                        </div>
                    </div>
                    <br/><br/><br/><br/>
                    <ul>
                        <button className="btn btn-secondary"
                                style={styleForButton}
                                onClick={this.handleFilterToggle}>
                            <a href="/" style={styleForLiA}>All Filters</a>
                        </button>
                    </ul>
                    <br/><br/>
                    <br/>
                    <div style={{marginLeft:'12%', marginRight:'12%'}}>
                        <div className="table-responsive" style={{backgroundColor: "white"}}>
                            <table id="myTable" className="table table-striped table-hover">
                                <thead>
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
                                <tbody>
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
