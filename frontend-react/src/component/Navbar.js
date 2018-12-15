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

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        });
        console.log(this.state);
    };

    handleLogout = (e) => {
        localStorage.removeItem("Authorization");
        localStorage.removeItem("userId");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("userType");
        localStorage.removeItem("email");
        localStorage.removeItem("isSubscribed");
    };

    handleSearch = (e) => {
        e.preventDefault();
        if(this.state.search === '')
            alert("Please enter some search criteria");
        else {
            console.log("Search button clicked");
            let keyword = this.state.search;
            console.log(keyword);
        }
    };

    render(){
        let isAdmin = false;
        if(localStorage.getItem("userType") === "admin"){
            isAdmin = true;
        }
        let isLoggedIn = false;
        if(localStorage.getItem("userType")!== null && localStorage.getItem("userType").length !== 0){
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
                {!isLoggedIn ? <li style={StyleFloatRight}><Link to="/signup/">SignUp</Link></li> : null}
                {!isLoggedIn ? <li style={StyleFloatRight}><Link to="/signin/">SignIn</Link></li> : <li style={StyleFloatRight}>
                    <Link onClick={this.handleLogout} to="/signin/">Logout</Link>
                </li>}
                {isLoggedIn ? <li style={StyleFloatRight}><Link to="/profile/">Account</Link></li> : null}
                {isAdmin ? <li style={StyleFloatRight}><Link to="/filter">Admin Config</Link></li> : null}
                {isLoggedIn && localStorage.getItem("userType") !== "admin"? <li style={StyleFloatRight}>
                    <Link to='/filter'>
                        Search
                    </Link>
                </li>:null}
            </ul>
        )
    }
}

const mapStateToProps = state => {
    return{
        userType : localStorage.getItem("userType")
    }
};

export default connect(mapStateToProps)(Navbar);