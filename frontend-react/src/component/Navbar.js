import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Filter from "./filter";
import '../App.css';

class Navbar extends Component{

    constructor(){
        super();
        this.state = ({
            search : ''
        })
    }

    componentDidMount() {
        document.addEventListener('keydown', function(event) {
            if(event.keyCode === 13 ) {
                document.getElementById('searchbutton').click();
            }
        });
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        });
        console.log(this.state);
    };

    handleSearch = (e) => {
        e.preventDefault();
        if(this.state.search === '')
            alert("Please enter some search criteria");
        else {
            console.log("Search button clicked");
            let keyword = this.state.search;
            console.log(keyword);
            // this.props.history.push('/filter');
            // Axios Request to database, Splitting and all will be done at backend
        }
    };

    render(){
        const styleForUL = {
            listStyleType: "none",
            margin: "0",
            padding: "0",
            overflow: "hidden",
        };
        const styleForLi = {
            float : "left"
        };
        const styleForLiA = {
            display: "block",
            color: "white",
            textAlign: "center",
            padding: "14px 16px",
            textDecoration: "none"
        };
        const StyleFloatRight = {
            float : "right"
        };
        return(
            <ul style={styleForUL}>
                <li style={styleForLi}><a href="/" style = {styleForLiA}>Home</a></li>
                <li style={styleForLi}><a href="/" style = {styleForLiA}>TV Shows</a></li>
                <li style={styleForLi}><a href="/" style = {styleForLiA}>Movies</a></li>
                <li style={styleForLi}><a href="/" style = {styleForLiA}>Recently Added</a></li>
                <li style={styleForLi}><a href="/" style = {styleForLiA}>My List</a></li>

                <li style={StyleFloatRight}><a href="/" style = {styleForLiA}>Search</a></li>
                <li style={StyleFloatRight}><Link to="/admin/delete/">Admin Config</Link></li>
                <li style={StyleFloatRight}><Link to="/users/signup/">SignUp</Link></li>
                <li style={StyleFloatRight}><Link to="/users/signin/">SignIn</Link></li>
                <li style={StyleFloatRight}><a href="/" style = {styleForLiA}>Account</a></li>
                <li style={StyleFloatRight}><a id="searchbutton" onClick={this.handleSearch} style = {styleForLiA}>Search</a></li>
                <li style={StyleFloatRight}>
                    <div className="form-group">
                        <input type="text" id='searchbox'
                               className="form-control"
                               id="exampleInputTitle"
                               aria-describedby="emailHelp"
                               onChange={this.handleChange}
                               name='search'
                               placeholder="Search for movie" style={{width:'350px', marginTop : '10px'}} />
                    </div>
                </li>
            </ul>
        )
    }
}

export default Navbar;