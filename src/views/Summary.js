import React from 'react';
import '../css/Summary.css';

class Summary extends React.Component {
	


	constructor(props) {

		super(props);				

		this.state = {
			maxMonths:this.calculateLongestRunningDebtMonths(this.props.loansArr)
		};
	}

	calculateLongestRunningDebtMonths(loansArr) {
		
		let max=0;

		for(let i=0;i<loansArr.length;i++) {
			let APR = loansArr[i].APR / 100.0;
	  		let principal = loansArr[i].principal;
	  		let monthlyPayment = loansArr[i].monthlyPayment;
	  		//console.log('APR:',APR,' principal:',principal,' monthlyPayment', monthlyPayment)
	  		
	  		//numPayments sorta helps prevent generating infinite amount of payment tables
	  		let numPayments = -Math.log(1-(APR/12)*principal/monthlyPayment)/Math.log(1+APR/12)
	  		if(numPayments>max){
	  			max = numPayments;
	  		}
		}	
		return max;
	}

	calculateInvestmentTotalInterest() {
		let totalInvestInterest = 0;

		for(let i=0;i<this.props.investmentsArr;i++) {
			
		}

		return totalInvestInterest;
	}

	render() {

		const inputTextStyle = {border:'none',width:'100%'};

		let display = {display:'none'};
		let hidden = {};//{visibility:'hidden'};

		if (this.props.showModal === true) {
			display = {display:'block'};
		} else {

		}

		return (
			<div className="row"> 
				<div className="col-md-3 card" style={hidden}>
					<span className="header">Saved with extra payments</span>
					<span className="amount">${Number(20000).toLocaleString('en')}</span>
					<span className="message">message</span>				</div>
				<div className="col-md-3 card ">
					<span className="header">Interest Paid</span>
					<span className="amount">${Number(20000).toLocaleString('en')}</span>
					<span className="message">message</span>
				</div>
				<div className="col-md-3 card">
					<span className="header">Interest Earned</span>
					<span className="amount">${Number(20000).toLocaleString('en')}</span>
					<span className="message">message</span>
				</div>
				<div className="col-md-3 card" style={hidden}>
					<span className="header">Savings earned extra payments</span>
					<span className="amount">${Number(20000).toLocaleString('en')}</span>
					<span className="message">message</span>
				</div>								
			</div>
		);
	}
}


export default Summary;
