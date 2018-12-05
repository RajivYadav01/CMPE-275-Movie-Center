import React,{Component} from 'react';
import axios from 'axios';
import {api} from '../store/actions';
import {BarChart, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Area, Line, AreaChart, LineChart} from 'recharts';

class Financialreporting extends Component {
    constructor(props) {
        super();
        this.state = {
            uniquesubscriptionusers: [],
            data: []
        }
        this.handleUserReportType = this.handleUserReportType.bind(this);
        this.createDateForAreaChart = this.createDateForAreaChart.bind(this);
    }

    createDateForAreaChart = (array) => {
        var data = [];
        console.log("In createDateForAreaChart:", array);
        array.map((element)=>{
            console.log(element);
            var obj = {
                name: element.key,
                users: element.value
            }
            data.push(obj);
        })
        this.setState({
            data: data
        })
    }

    handleUserReportType = (userreporttype) => {
        console.log(userreporttype);
        axios.get(`${api}/admin/monthlyuserreport?reporttype=${userreporttype}`, {
            headers: {"Authorization" : localStorage.getItem("Authorization")}
        })
        .then((response)=>{
            console.log(userreporttype,": ",response.data);
            this.setState({
                uniquesubscriptionusers: response.data
            },()=>{
                this.createDateForAreaChart(response.data);
            })
        })
    }

    render() {
        return (
            <div className="Financialreporting">
                <h1>Financial Reporting...</h1>
                <hr/>
                
                <div style={{marginLeft:'12%', marginRight:'12%'}}>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-secondary" onClick={() => this.handleUserReportType('uniquesubscriptionusers')}>Unique Subscription Users</button>
                        <button type="button" class="btn btn-secondary" onClick={() => this.handleUserReportType('uniquepayperviewusers')}>Unique Pay-Per-View Users</button>
                        <button type="button" class="btn btn-secondary" onClick={() => this.handleUserReportType('uniqueactiveusers')}>Unique Active Users</button>
                        <button type="button" class="btn btn-secondary" onClick={() => this.handleUserReportType('uniqueregisteredusers')}>Total Unique Users</button>
                    </div>
                </div>
                <br/>
                <div style={{backgroundColor:'white', marginLeft:'12%', marginRight:'12%'}}>
                <AreaChart width={600} height={400} data={this.state.data}
                        margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Area type='monotone' dataKey='users' stroke='#8884d8' fill='#8884d8' />
                </AreaChart>
                </div>
            </div>
        )
    }
}

export default Financialreporting;