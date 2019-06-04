import React from 'react';

class InvestmentEntry extends React.Component {

	render() {
		return (
			<div >
				<div>{this.props.name}</div>
				<span>${this.props.principal} at {this.props.APR} %APR. </span>
				<span>${this.props.monthlyPayment} per month</span>
				<button onClick={this.props.onClickEditEntry}>edity</button>
				<button onClick={this.props.onClickDelete}>delete</button>
			</div>
		);
	}
}


export default InvestmentEntry;
