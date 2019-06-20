import React from 'react';

import LaymanSummary from './LaymanSummary';
import '../css/Summary.css';

class Summary extends React.Component {
	
	renderNetHeader() {
		
		if(this.props.cumulativeMode===true){
			if(this.props.totalInvestment > this.props.totalLoan ) {
				return "Net Total";
			} else {
				return "Net Losses";
			}

		} else { //interest
			if(this.props.totalInvestInterest > this.props.totalPaidInterest) {
				return "Net Earnings";
			} else {
				return "Net interest paid";
			}
		}
	}

	renderNetAmount() {
		if(this.props.cumulativeMode===true){
			return (this.props.totalInvestment - this.props.totalLoan);
		} else { //interest
			return (this.props.totalInvestInterest - this.props.totalPaidInterest);
		}
	}

	render() {


		let display = {display:'none'};
		let hidden = {visibility:'hidden'};

		if (this.props.showModal === true) {
			display = {display:'block'};
		} 

		return (
			<div>	
				<div className="row"> 
					<div className="col-md-1 card" style={{width:'7%',visibility:'hidden'}}>
						<span className="header">Saved with extra payments</span>
						<span className="amount">${Number(20000).toLocaleString('en')}</span>
						<span className="message">message</span>				
					</div>

					<div className="col-md-2 card">
						<span className="header">{(this.props.cumulativeMode)?'Investment Total':'Interest Earned'}</span>
						<span className="amount">${Number(parseInt((this.props.cumulativeMode)?this.props.totalInvestment:this.props.totalInvestInterest)).toLocaleString('en')}</span>
						<span className="message">Generated by investment</span>
					</div>
					<div className="col-md-1 oper ">
						<i className="fas fa-minus"></i>
					</div>
					<div className="col-md-2 card ">
						<span className="header">{(this.props.cumulativeMode)?'Loan Total':'Interest Paid'}</span>
						<span className="amount">${Number(parseInt((this.props.cumulativeMode)?this.props.totalLoan:this.props.totalPaidInterest)).toLocaleString('en')}</span>
						<span className="message">Cost of loan</span>
					</div>
					<div className="col-md-1 oper ">
						<i className="fas fa-equals"></i>
					</div>					
					<div className="col-md-2 card" style={(this.renderNetAmount()>0)?{color:'rgb(100,208,100,0.7)'}:{}}>
						<span className="header">{this.renderNetHeader()}</span>
						<span className="amount">${Number(parseInt(this.renderNetAmount())).toLocaleString('en')}</span>
						<span className="message">in {parseInt(this.props.timeLength)} months</span>
					</div>					
					<div className="col-md-1 card" style={{width:'1%',visibility:'hidden'}}>
						<span className="header">Savings earned extra payments</span>
						<span className="amount">${Number(20000).toLocaleString('en')}</span>
						<span className="message">message</span>
					</div>								
				</div>
				<LaymanSummary
					payoffChoice={this.props.payoffChoice}
					extra={this.props.extra}
					interestDebtPaid={Number(parseInt(this.props.totalPaidInterest)).toLocaleString('en')}
					interestInvestmentEarned={Number(parseInt(this.props.totalInvestInterest)).toLocaleString('en')}
					timeLength={this.props.timeLength}
					/>

			</div>
		);
	}
}


export default Summary;
