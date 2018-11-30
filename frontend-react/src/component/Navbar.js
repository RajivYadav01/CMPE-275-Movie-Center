import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

class Navbar extends Component{
    
    
    render(){
        const styleForUL = {
            listStyleType: "none",
            margin: "0",
            padding: "0",
            overflow: "hidden",
        }
        const styleForLi = {
            float : "left"
        }
        const styleForLiA = {
            display: "block",
            color: "white",
            textAlign: "center",
            padding: "14px 16px",
            textDecoration: "none"
        }
        const StyleFloatRight = {
            float : "right"
        }
        return(
            <ul style={styleForUL}>
                <li style={styleForLi}><a href="/" style = {styleForLiA}>Home</a></li>
                <li style={styleForLi}><a href="/" style = {styleForLiA}>TV Shows</a></li>
                <li style={styleForLi}><a href="/" style = {styleForLiA}>Movies</a></li>
                <li style={styleForLi}><a href="/" style = {styleForLiA}>Recently Added</a></li>
                <li style={styleForLi}><a href="/" style = {styleForLiA}>My List</a></li>

                <li style={StyleFloatRight}><a href="/" style = {styleForLiA}>Search</a></li>
                <li style={StyleFloatRight}><Link to="/admin/delete/">Admin Config</Link></li>
            </ul>
        )
    }
}

export default Navbar;