import React from 'react';

class LaymanSummary extends React.Component {

					payoffChoice
					extra
					interestDebtPaid
					interestInvestmentEarned
					timeLength

	setupMessage() {
		let msg = 'Generally, it is recommended to payoff or invest in the debt or loan with the higher APR%';
		if(this.props.payoffChoice==='DEBT') {
			msg = 'By paying $' 
				+ Number(parseInt(this.props.extra)) + ' per month'
				+ ' extra toward debt, you will have paid ' 
				+ '$'+ this.props.interestDebtPaid
				+ ' of interest in '
				+ parseInt(this.props.timeLength) + ' months.';
		} else if(this.props.payoffChoice ==='INVEST'){ //INVEST
			msg = 'By contributing $'
				+ Number(parseInt(this.props.extra)) + ' per month'
				+ ' extra toward investing, you will have earned '
				+ '$' + this.props.interestInvestmentEarned
				+ ' in '
				+ parseInt(this.props.timeLength) + ' months.';
		}

		return msg;
	}

	setupMessage2() {
		let msg = 'Please note, there are also factors to consider like the actual investment rate, the tax deductions and other factors. This demonstrates the investment growth and debt decrease in a vacuum.' ;
		if(this.props.payoffChoice==='DEBT') {
			msg = 'In the same time frame, you will have earned '
				+ '$' + this.props.interestInvestmentEarned
				+ ' on your investment.';
		} else if(this.props.payoffChoice ==='INVEST'){ //INVEST
			msg = 'In the same time frame, you will have completed and paid off '
				+ '$'+ this.props.interestDebtPaid
				+ ' of interest on your loan.';				
		}

		return msg;		
	}
	render() {

		return (
			<div className="row layman-summary" >
				<h3>Where should I put my next dollar?</h3>
				<p>{this.setupMessage()}</p>

				<p>{this.setupMessage2()}</p>
			</div>
		);
	}
}

export default LaymanSummary;