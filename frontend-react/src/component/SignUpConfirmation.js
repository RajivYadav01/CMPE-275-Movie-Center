import React,{Component} from 'react';
import '../App.css';

import {api} from '../store/actions';

class SignUpConfirmation extends Component{
    constructor(props){
        super(props);
    }
  render(){
        
        return(
             
            <div class="main-app">
               
                <div >
                    <a href="/" class="main-header">
                        Movie Center
                    </a>
                </div>
                <div class = "conf-body full-body">
                   <h1>One more step...</h1>
                   <p>Please check your inbox for confirmation email. Click the link in your email to confirm your email address.</p>
                    </div>
            </div> 
        )
    }
}

export default SignUpConfirmation;
