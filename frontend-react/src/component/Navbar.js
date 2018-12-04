import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Filter from "./filter";
import '../App.css';
import {connect} from 'react-redux';

class Navbar extends Component{

    constructor(){
        super();
        this.state = ({
            search : '',
        })
    }
    

<<<<<<< HEAD
    componentDidMount() {
        document.addEventListener('keydown', function(event) {
            if(event.keyCode === 13 ) {
                document.getElementById('searchbutton').click();
            }
        });
    }
=======
    // componentDidMount() {
    //     document.addEventListener('keydown', function(event) {
    //         if(event.keyCode === 13 ) {
    //             document.getElementById('searchbutton').click();
    //         }
    //     });
    // }

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

>>>>>>> 6d32e045cd6c5e23f620c257f598637737eb80aa
    render(){
        let isAdmin = false;
        if(this.props.userType === "admin"){
            isAdmin = true;
        }
        let isLoggedIn = false;
        if(this.props.userType.length !== 0){
            isLoggedIn = true;
        }
        const styleForUL = {
            listStyleType: "none",
            margin: "0",
            padding: "0",
            overflow: "hidden",
            height : "50px"
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
<<<<<<< HEAD
                {!isLoggedIn ? <li style={StyleFloatRight}><Link to="/signup/">SignUp</Link></li> : null}
                {!isLoggedIn ? <li style={StyleFloatRight}><Link to="/signin/">SignIn</Link></li> : <li style={StyleFloatRight}><Link to="/signin/">Logout</Link></li>}
                {isAdmin ? <li style={StyleFloatRight}><Link to="/admin/delete/">Admin Config</Link></li> : null}
=======
                <li style={styleForLi}><a href="/" style = {styleForLiA}>TV Shows</a></li>
                <li style={styleForLi}><a href="/" style = {styleForLiA}>Movies</a></li>
                <li style={styleForLi}><a href="/" style = {styleForLiA}>Recently Added</a></li>
                <li style={styleForLi}><a href="/" style = {styleForLiA}>My List</a></li>

                <li style={StyleFloatRight}><Link to="/admin/delete/">Admin Config</Link></li>
                <li style={StyleFloatRight}><Link to="/signup/">SignUp</Link></li>
                <li style={StyleFloatRight}><Link to="/signin/">SignIn</Link></li>
                <li style={StyleFloatRight}><a href="/" style = {styleForLiA}>Account</a></li>

>>>>>>> 6d32e045cd6c5e23f620c257f598637737eb80aa
                <li style={StyleFloatRight}>
                    <Link to='/filter'>
                        Search
                    </Link>
                </li>
<<<<<<< HEAD
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
                
=======

>>>>>>> 6d32e045cd6c5e23f620c257f598637737eb80aa
            </ul>
        )
    }
}

const mapStateToProps = state => {
    return{
        userType : state.userType
    }
}

export default connect(mapStateToProps)(Navbar);