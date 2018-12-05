import React,{Component} from 'react';
import axios from 'axios';
import {api} from '../store/actions';

class Payment extends Component {

    constructor(){
        super();
        this.state = {
            cardNumber : '',
            cardExpiry : '',
            cardName : '',
            cardCVC : '',
            months : '',
            amount : ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleMonths = this.handleMonths.bind(this);
        this.handleSubscription = this.handleSubscription.bind(this);
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        });
        console.log(this.state)
    };

    handleMonths = (e) => {
        e.preventDefault();
        let num = e.target.value;
        this.setState({
            months : num ,
            amount : 10*num
        },()=>{
            console.log(this.state);
        });

    };

    handleSubscription = (e) => {
        e.preventDefault();
        console.log("handle subscription clicked");
        console.log(this.state);

        let array = this.state.cardExpiry.split('/');
        let month = array[0];
        let year = array[1];
        let id = localStorage.getItem("userId");
        let subscribedMonths = Number(this.state.months);

        let reqObject = {
            cvv : this.state.cardCVC,
            cardNumber : this.state.cardNumber,
            expiryMonth : month ,
            expiryYear : year,
            nameOnCard : this.state.cardName ,
            amount : this.state.amount,
            paymentType : 'usersubscription'
        };
        console.log('request Object to send : ',reqObject);

        axios({
            method: 'post',
            url: `${api}/users/${id}/startsubscription?months=${subscribedMonths}`,
            mode: 'no-cors',
            redirect: 'follow',
            withCredentials: false,
            headers: {'Accept': 'application/json', 'Authorization' :localStorage.getItem('Authorization')},
            data: reqObject
        })
            .then(response=>{
                console.log(response.data.endDate);
                let currDate = new Date();
                let endDate = new Date(response.data.endDate);

                if(currDate<endDate){
                    this.props.history.push('/');
                }
                // if(response.data.endDate)
            })

    };

    render() {
        return (
            <div>
                <br/><br/><br/>
                <div className="container">
                    <div className="row">
                        <div style={{margin:'auto', width:'30%'}}>
                            <div className="panel panel-default credit-card-box" >
                                <div className="panel-heading display-table">
                                    <div className="row display-tr">
                                        <h3 className="panel-title display-td" style={{marginLeft:'10px'}}>Payment Details</h3>
                                        <br/>
                                        <div className="display-td">
                                            <img src="http://i76.imgup.net/accepted_c22e0.png"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="panel-body">
                                    <form id="payment-form">
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <div className="form-group">
                                                    <label htmlFor="cardNumber">CARD NUMBER</label>
                                                    <div className="input-group">
                                                        <input
                                                            type="tel"
                                                            className="form-control"
                                                            name="cardNumber"
                                                            placeholder="Valid Card Number"
                                                            autoComplete="cc-number"
                                                            onChange={this.handleChange}
                                                            required autoFocus
                                                        />
                                                        {/*<span className="input-group-addon"><i*/}
                                                            {/*className="fa fa-credit-card"></i></span>*/}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-xs-12">
                                                <div className="form-group">
                                                    <label htmlFor="cardNumber">NAME ON CARD</label>
                                                    <div className="input-group">
                                                        <input
                                                            type="tel"
                                                            className="form-control"
                                                            name="cardName"
                                                            placeholder="NAME"
                                                            autoComplete="cc-number"
                                                            onChange={this.handleChange}
                                                            required autoFocus
                                                        />
                                                        {/*<span className="input-group-addon"><i*/}
                                                        {/*className="fa fa-credit-card"></i></span>*/}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-xs-7 col-md-7">
                                                <div className="form-group">
                                                    <label htmlFor="cardExpiry"><span
                                                        className="hidden-xs">EXPIRATION</span><span
                                                        className="visible-xs-inline">EXP</span> DATE</label>
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        name="cardExpiry"
                                                        placeholder="MM / YY"
                                                        autoComplete="cc-exp"
                                                        onChange={this.handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xs-5 col-md-5 pull-right">
                                                <div className="form-group">
                                                    <label htmlFor="cardCVC">CV CODE</label>
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        name="cardCVC"
                                                        placeholder="CVC"
                                                        autoComplete="cc-csc"
                                                        onChange={this.handleChange}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-xs-4 col-md-4">
                                                <div className="form-group">
                                                    <label htmlFor="cardExpiry"><span
                                                        className="hidden-xs">Months</span></label>
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        name="months"
                                                        placeholder="Number"
                                                        autoComplete="cc-exp"
                                                        onChange={this.handleMonths}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-xs-1 col-md-1">
                                                <div className="form-group" style={{marginTop:'40px'}}>
                                                    X
                                                </div>
                                            </div>
                                            <div className="col-xs-1 col-md-1">
                                                <div className="form-group" style={{marginTop:'40px'}}>
                                                    <b>$10</b>
                                                </div>
                                            </div>
                                            <div className="col-xs-5 col-md-5 pull-right">
                                                <div className="form-group">
                                                    <label htmlFor="cardCVC">Amount</label>
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        name="amount"
                                                        placeholder=""
                                                        autoComplete="cc-csc"
                                                        value={this.state.amount}
                                                        disabled={true}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className="row">
                                            <div className="col-xs-12">
                                                <button className="subscribe btn btn-success btn-lg btn-block"
                                                        type="button"
                                                        onClick={this.handleSubscription}>Start Subscription
                                                </button>
                                            </div>
                                        </div>
                                        <div className="row" style={{display:'none'}}>
                                            <div className="col-xs-12">
                                                {/*<p className="payment-errors"></p>*/}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default Payment;