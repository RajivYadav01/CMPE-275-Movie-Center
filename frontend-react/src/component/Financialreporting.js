import React,{Component} from 'react';
import axios from 'axios';
import {api} from '../store/actions';
import Navbar from '../component/Navbar';
import {BarChart, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ComposedChart, Area, Line, AreaChart, LineChart} from 'recharts';

class Financialreporting extends Component {
    constructor(props) {
        super();
        this.state = {
            userdatatoshow: [],
            incomedatatoshow: [],
            data: [],
            messageUserReport: 'Month by month uniquesubscriptionusers',
            messageIncomeReport: 'Month by month income of usersubscription'
        }
        this.handleReportType = this.handleReportType.bind(this);
        this.createDataForAreaChart = this.createDataForAreaChart.bind(this);
    }

    createDataForAreaChart = (report, array) => {
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
        if(report == 'monthlyuserreport') {
            this.setState({
                userdatatoshow: data,
            })
        } else {
            this.setState({
                incomedatatoshow: data
            })
        }
        
    }

    componentWillMount() {
        this.handleReportType('monthlyuserreport', 'uniquesubscriptionusers');
        this.handleReportType('monthlyincomereport', 'usersubscription');
    }

    handleReportType = (report, reporttype) => {
        console.log(report, reporttype);
        
        axios.get(`${api}/admin/${report}?reporttype=${reporttype}`, {
            headers: {"Authorization" : localStorage.getItem("Authorization")}
        })
        .then((response)=>{
            console.log(reporttype,": ",response.data);
            this.setState({
                datatoshow: response.data
            },()=>{
                this.createDataForAreaChart(report,response.data);
            })
        })

        if(report == 'monthlyuserreport' ) {
            if(reporttype == 'uniquesubscriptionusers') {
                this.setState({
                    messageUserReport: 'Month by month unique subscription users'
                })
            } else if(reporttype == 'uniquepayperviewusers') {
                this.setState({
                    messageUserReport: 'Month by month unique pay-per-view users'
                })
            } else if(reporttype == 'uniqueactiveusers') {
                this.setState({
                    messageUserReport: 'Month by month unique active users'
                })
            } else {
                this.setState({
                    messageUserReport: 'Month by month unique registered users'
                })
            }
        } else {
            if(reporttype == 'usersubscription') {
                this.setState({
                    messageIncomeReport: 'Month by month income from user subscription'
                })
            } else if(reporttype == 'payperview') {
                this.setState({
                    messageIncomeReport: 'Month by month income from pay per view payments'
                })
            } else {
                this.setState({
                    messageIncomeReport: 'Month by month total income'
                })
            }
        }

        
    }

    render() {
        return (
            <div className="Financialreporting">
                <Navbar/>
                <br/><br/>
                <div class="table-title" style={{marginLeft:'12%', marginRight:'12%'}}>
                    <div class="row">
                        <div class="col-sm-6">
                            <h2>Financial Reporting</h2>
                        </div>
                    </div>
                </div>
                <br/><br/>
                <div class="table-title" style={{marginLeft:'12%', marginRight:'12%', background : "grey"}}>
                    <div class="row">
                        <div class="col-sm-6">
                            <h2>User Reporting</h2>
                        </div>
                    </div>
                </div>
                <br/>
                <div style={{marginLeft:'12%', marginRight:'12%'}}>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-secondary" onClick={() => this.handleReportType('monthlyuserreport','uniquesubscriptionusers')}>Unique Subscription Users</button>
                        <button type="button" class="btn btn-secondary" onClick={() => this.handleReportType('monthlyuserreport','uniquepayperviewusers')}>Unique Pay-Per-View Users</button>
                        <button type="button" class="btn btn-secondary" onClick={() => this.handleReportType('monthlyuserreport','uniqueactiveusers')}>Unique Active Users</button>
                        <button type="button" class="btn btn-secondary" onClick={() => this.handleReportType('monthlyuserreport','uniqueregisteredusers')}>Total Unique Users</button>
                    </div>
                </div>
                <br/>

                <div style={{marginLeft:'12%', marginRight:'12%'}}>
                    <p style={{color: 'white', font: '20px'}}>{this.state.messageUserReport}</p>
                </div>
                <br/>
                
                <div style={{backgroundColor:'black', marginLeft:'12%', marginRight:'12%'}}>
                <AreaChart width={1200} height={400} data={this.state.userdatatoshow}
                        margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    {/* <CartesianGrid strokeDasharray="3 3"/> */}
                    <XAxis dataKey="name"/>
                    <YAxis dataKey="users"/>
                    <Tooltip/>
                    <Area type='monotone' dataKey='users' stroke='#8884d8' fill='#8884d8' />
                </AreaChart>
                </div>
                <hr style={{marginLeft:'12%', marginRight:'12%'}}/>
                <br/><br/>
                <div class="table-title" style={{marginLeft:'12%', marginRight:'12%', background : "grey"}}>
                    <div class="row">
                        <div class="col-sm-6">
                            <h2>Income Reporting</h2>
                        </div>
                    </div>
                </div>
                
                <br/>
                <div style={{marginLeft:'12%', marginRight:'12%'}}>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-secondary" onClick={() => this.handleReportType('monthlyincomereport','usersubscription')}>Income from user Subscription</button>
                        <button type="button" class="btn btn-secondary" onClick={() => this.handleReportType('monthlyincomereport','payperview')}>Income from Pay-Per-View users</button>
                        <button type="button" class="btn btn-secondary" onClick={() => this.handleReportType('monthlyincomereport','totalincome')}>Total Income</button>
                    </div>
                </div>
                <br/>

                <div style={{marginLeft:'12%', marginRight:'12%'}}>
                    <p style={{color: 'white', font: '20px'}}>{this.state.messageIncomeReport}</p>
                </div>
                <br/>
                
                <div style={{backgroundColor:'black', marginLeft:'12%', marginRight:'12%'}}>
                <AreaChart width={1200} height={400} data={this.state.incomedatatoshow}
                        margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    {/* <CartesianGrid strokeDasharray="3 3"/> */}
                    <XAxis dataKey="name"/>
                    <YAxis dataKey="users"/>
                    <Tooltip/>
                    <Area type='monotone' dataKey='users' stroke='#8884d8' fill='#8884d8' />
                </AreaChart>
                </div>
            </div>
        )
    }
}

export default Financialreporting;