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
    

    componentDidMount() {
        document.addEventListener('keydown', function(event) {
            if(event.keyCode === 13 ) {
                document.getElementById('searchbutton').click();
            }
        });
    }
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
                {!isLoggedIn ? <li style={StyleFloatRight}><Link to="/signup/">SignUp</Link></li> : null}
                {!isLoggedIn ? <li style={StyleFloatRight}><Link to="/signin/">SignIn</Link></li> : <li style={StyleFloatRight}><Link to="/signin/">Logout</Link></li>}
                {isAdmin ? <li style={StyleFloatRight}><Link to="/admin/delete/">Admin Config</Link></li> : null}
                <li style={StyleFloatRight}>
                    <Link to='/filter'>
                        Search
                    </Link>
                </li>
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

const mapStateToProps = state => {
    return{
        userType : state.userType
    }
}

export default connect(mapStateToProps)(Navbar);