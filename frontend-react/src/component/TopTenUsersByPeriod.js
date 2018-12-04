import React,{Component} from 'react';
import axios from 'axios';
import {api} from '../store/actions';

class TopTenUsersByPeriod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toptenusers: []
        }
    }

    componentWillMount() {
        console.log("Printing in TopTenUsersByPeriod:",this.props.period);
        axios.get(`${api}/admin/toptenusers?period=${this.props.period}`, {
            headers: {"Authorization" : localStorage.getItem("Authorization")}
        })
        .then((response)=>{
            console.log(response.data);
            this.setState({
                toptenusers: response.data
            })
        })
    }

    render() {
        console.log("Printing in TopTenUsersByPeriod:"+this.props.period);
        return (
            <div className='TopTenUsersByPeriod'>
                <h2 style={{color: 'white'}}>TopTenUsersByPeriod</h2>
                <hr/>

            </div>
        )
    }
}

export default TopTenUsersByPeriod;