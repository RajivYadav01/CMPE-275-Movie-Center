import React,{Component} from 'react';
import {connect} from 'react-redux';
import verifyIcon from '../email_verify.jpg';
import {VerifyEmail} from '../store/actions';
import {Link} from 'react-router-dom';
import '../App.css';

class EmailVerification extends Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        var params = this.props.location.search;
        var token = params.substr(params.indexOf("=")+1);
        console.log(this.props.location.search);
        console.log("Movie ID : ", token);
        this.props.onLoadVerify(token);
    }

    render(){
        let message = null;
        if(this.props.status == "USER_SUCCESS"){
            message = (
                <div className = "full-body conf-body">
                    <img id="imgTag"  class="verify-img" src={verifyIcon} alt=""/>
                   <h1>Your email has been verified</h1>
                   <a href= {`/signin`} class="btn btn-success btn-lg">Sign In</a>
                </div>
                
            );
        }
        if(this.props.status == "USER_ERROR"){
            message = (
                <div className = "full-body conf-body">
                      <h1>Something went wrong</h1>
                </div>
            );
        }
        return(
            <div class="main-app">
               
                <div >
                    <a href="/" class="main-header">
                        Movie Center
                    </a>
                </div>
                <div >
                {message}
                </div>
            </div> 
        )
    }
}

const mapStateToProps = state => {
    console.log(state); // state
    return {
        status: state.status,
        msg: state.msg
    };
};

const mapDispatchToProps = dispatch => {
    console.log("Inside map dipatch to props");
    return{
        onLoadVerify : (token) => dispatch(VerifyEmail(token)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EmailVerification);