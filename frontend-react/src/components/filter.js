import React, {Component} from 'react';
// import Navbar from '../components/Navbar';
import '../css/filter.css';
import axios from 'axios';

class Filter extends Component {

    constructor() {
        super();
        this.state = {
            filterToggle: false,
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
            ratingsRadio : '1'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFilterToggle = this.handleFilterToggle.bind(this);
        this.handleFlag = this.handleFlag.bind(this);
        this.handleRating = this.handleRating.bind(this)
    }

    handleFilterToggle = (e) => {
        e.preventDefault();
        this.setState({
            filterToggle: !this.state.filterToggle
        });
    };

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state);
    };

    handleFlag = (e) => {
        let x = e.target.name ;
        this.setState({
            [e.target.name]: !this.state[x]
        });
    };

    handleRating = (e) => {
        this.setState({
            ratingsRadio : e.target.value
        })
    };

    handleAllFilters = (e) =>{
        e.preventDefault();
        console.log('Applied filters')
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
        console.log(allFilters);
        axios.post('https://de7a79c8.ngrok.io/users/movies/', allFilters,
            {withCredentials:true})
            .then((response)=>{
                console.log(response)
            })
        // this.props.onApplyFilters(allFilters)
    };
    render() {
        console.log(this.state);
        const styleForLiA = {
            float: "right",
            display: "block",
            color: "black",
            textAlign: "center",
            padding: "10px 15px",
            textDecoration: "none",
        };
        const styleForButton = {
            float: 'right',
            height: "50px",
            marginRight: '20%'
        };
        const styleForApplyFilter = {
            float:'right',
            marginRight : '10px',
            height: '50px'
        };
        const genreStyle = {float: 'left', marginRight: '25px'};
        const MPAAStyle = {
            paddingTop: '10px',
            paddingBottom: '10px',
            marginRight: '10px'
        };

        if (this.state.filterToggle) {
            return (
                <div>
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
                    <br/><br/><br/>
                    <div className='container'>
                        <form style={{color: "white", width: "115%", alignContent: "center"}}>
                            <div>
                                <div style={{float: 'left', width: '25%'}}>
                                    <h4>Actor</h4>
                                    <input type='text' className='form-control'
                                           placeholder='Enter Actor Name'
                                           name='actor'
                                           onChange={this.handleChange} style={{width: "70%"}}/>
                                    <h4>Director</h4>
                                    <input type='text' className='form-control'
                                           placeholder='Enter Director Name'
                                           name='director'
                                           onChange={this.handleChange} style={{width: "70%"}}/>
                                    <h4>Year</h4>
                                    <input type='text' className='form-control'
                                           placeholder='Enter Year'
                                           name='year'
                                           onChange={this.handleChange} style={{width: "70%"}}/>
                                </div>
                                <div style={{float: 'left', width: '25%'}}>
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
                                <div style={{float: 'left', width: '25%'}}>
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
                                <div style={{float: 'left', width: '25%'}}>
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
                                               onChange={this.handleRating} value="1" defaultChecked={true} />
                                        <label className="form-check-label" htmlFor="exampleRadios1">
                                            1 & up
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <br/>
                    <ul>
                        <button className="btn btn-secondary"
                                style={styleForButton}
                                onClick={this.handleFilterToggle}>
                            <a href="/" style={styleForLiA}>All Filters</a>
                        </button>
                    </ul>
                    <br/><br/>
                    <br/>
                    <h3 style={{textAlign: "center", color: 'white'}}>
                        Display movie results in table
                    </h3>
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