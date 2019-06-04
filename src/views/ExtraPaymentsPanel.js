import React from 'react';
import '../panel.css';

class ExtraPaymentsPanel extends React.Component {


	constructor(props) {
		super(props);		
	}

	calculateMinimum () {
		const arraySumFunc = (sum, curElem)=>sum + parseInt(curElem['monthlyPayment']);

		let sum = this.state.loansArr.reduce(arraySumFunc,0);
		console.log('Total MonthlySum:', sum);
		return sum;
	}


	render() {
		return (
			<div id="extra-payments" className="panel-shadow">
	          	<div className="panel-header">
	                {"Monthly Payments"}
	            </div>
		
				<div className="panel-content" id="loans-content-container">
										
					<div>
						<div className="right-align">0</div>

						<div>Minimum</div>		
					</div>
					<div>
						<div className="right-align">
							<input type="text"
								name="extra"
								onChange={this.props.onChange}
								value={this.props.extra}/>
						</div>

						<div>Extra</div>		
					</div>
					<div>
						<div className="right-align">
							<input type="radio"/>
							<input type="radio"/>
						</div>
						<div>Pay toward:</div>
					</div>					
					TODO make payments adjustment slider with minimum payment being the lowest end
				</div>
			</div>
		)
	}
}

export default ExtraPaymentsPanel;