import React, { Component } from 'react';

import LoanControlPanel from './LoanControlPanel';
import InvestmentsControlPanel from './InvestmentsControlPanel';
import ExtraPaymentsPanel from './views/ExtraPaymentsPanel';
import CumulativeDebtsVsInvestment from './views/CumulativeDebtsVsInvestments';

import DataEntryModal from './views/DataEntryModal';

import './App.css';


//const calculateMinimum = require('./Utils/mathCalcs');



class App extends Component {

	getLoansFromDB() {

		let tmp = JSON.parse(localStorage.getItem("loans")) || [];		
		console.log('@getLoansFromDB');
		console.log(tmp);
		return tmp;
	}

	getInvestmentsFromDB() {
		let tmp = JSON.parse(localStorage.getItem("investments")) || [];		
		console.log('@getInvestmentsFromDB');
		console.log(tmp);
		return tmp;
	}
	constructor(props) {
		/*
		let loansArr = [
				{'name':'Undergrad','principal':90000, 'APR':4.58, 'monthlyPayment':400.0, 'id': (new Date().getTime())+'|Undergrad|4.58'},
				{'name':'Grad','principal':8000, 'APR':7.4, 'monthlyPayment':100.0, 'id': (new Date().getTime())+'|Grad|7.4'},
				{'name':'Car Loan','principal':28000, 'APR':4.4, 'monthlyPayment':130.0, 'id': (new Date().getTime())+'|Car Loan|4.4'}
		]
		localStorage.setItem('loans',JSON.stringify(loansArr));
		

		let investmentsArr = [
				{'name':'ROTH Ira','principal':6000, 'APR':7.6, 'monthlyPayment':500.0, 'id': (new Date().getTime())+'|Roth|4.58'},
				{'name':'Savings Account','principal':8000, 'APR':2.0, 'monthlyPayment':100.0, 'id': (new Date().getTime())+'|Savings|7.4'}
		];
		localStorage.setItem('investments',JSON.stringify(investmentsArr));		
		*/
		super(props);				

		this.state = {
				loansArr: this.getLoansFromDB(),
				investmentsArr: this.getInvestmentsFromDB(),
				showModal:false,
				EMPTY_MODAL_FORM: {
					id:0,
					name: '',
					principal: '',
					APR: '',
					monthlyPayment: ''
				},
				modalForm: {},
				extra:0,
				editMode:'loan'
		};
	}



	/*
	* New or Edit loan info modal
	* Will update the modal with prefilled data or empty. id == 0 will empty the modal form
	* isLoan=true, isLoan=false (investment)
	*/
	handleShowModal(id,isLoan) {
		console.log('handleShowModal(',id,',',isLoan,')');
		
		let arr=this.state.investmentsArr.slice();
		
		if (isLoan===true) {
			arr = this.state.loansArr.slice();
		}
		
		let modalForm = JSON.parse(JSON.stringify(this.state.EMPTY_MODAL_FORM));

		for (let i=0; i< arr.length;i++) {
			if(arr[i].id ===id) {
				modalForm = {
					id:id,
					name: arr[i].name,
					principal: arr[i].principal,
					APR: arr[i].APR,
					monthlyPayment: arr[i].monthlyPayment
				}
				break;
			}
		}

		let res = {
			loansArr:this.state.loansArr,
			investmentsArr: this.state.investmentsArr,
			showModal:true,
			modalForm:modalForm,
			EMPTY_MODAL_FORM: this.state.EMPTY_MODAL_FORM,
			extra:this.state.extra,
			editMode:this.state.editMode
		};

		if (isLoan===true){
			res['editMode'] = 'loan';
		} else {
			res['editMode'] = 'invest';
		}
		console.log(res);
		this.setState(res);
	}

	handleCloseModal() {
		const modalForm = JSON.parse(JSON.stringify(this.state.EMPTY_MODAL_FORM));
		let res = {
			loansArr:this.state.loansArr,
			investmentsArr: this.state.investmentsArr,
			showModal:this.state.showModal,
			modalForm:modalForm,
			EMPTY_MODAL_FORM: this.state.EMPTY_MODAL_FORM,
			extra:this.state.extra,
			editMode: this.state.editMode
		}
		
		res['showModal'] = false
		
		this.setState(res);  		
	}
	
	/*
	* We'll always track the value of the input fields, then trigger save action when we save it. 
	* using the 'name' attr on input elem
	*/
	handleInputChange(event) {
		//passing the event target by giving the input html a 'name' attr (which matches a key in modalForm obj
		//we'll reference for later
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
	
		let modalForm = JSON.parse(JSON.stringify(this.state.modalForm));
		let res = {
				loansArr:this.state.loansArr,
				investmentsArr: this.state.investmentsArr,
				showModal:false,
				modalForm:modalForm,
				EMPTY_MODAL_FORM: this.state.EMPTY_MODAL_FORM,
				extra:this.state.extra,
				editMode:this.state.editMode
			};

		if (name === 'extra') {
			res['extra'] = value;
			res['showModal'] = false;
			console.log('@handleInputChange . [extra]', value);	

		} else {
			//update new value for modal
			modalForm[name]=value;	
			res['showModal'] = true;

		}
				
		this.setState(res);  
	}

	//The Save New Loan button event, save to persistence, update react state
	//id==0  means creating a loan|investment
	//id!=0  means editing an existing loan|investment
	//
	handleSaveLoan () {  		

		let modalForm = JSON.parse(JSON.stringify(this.state.modalForm));
		let id = modalForm.id;

		console.log('handleSaveLoan. id=',id);

		let loansArr = this.state.loansArr.slice() || [];

		if(id===0) {
			modalForm.id = (new Date().getTime())+'|'+this.state.modalForm.name+'|'+this.state.modalForm.APR;			
			
		} else {

			//filter out existing id element, so we can reinsert modified elem
			loansArr = (this.state.loansArr.slice()).filter(function (el) {
			  return el.id!==modalForm.id;
			});
		}
		
		loansArr.push(modalForm);
		localStorage.setItem('loans',JSON.stringify(loansArr));
	
		this.setState({
			loansArr:loansArr,
			investmentsArr: this.state.investmentsArr,
			showModal:false,
			modalForm:JSON.parse(JSON.stringify(this.state.EMPTY_MODAL_FORM)),
			EMPTY_MODAL_FORM: this.state.EMPTY_MODAL_FORM,
			extra:this.state.extra,
			editMode:this.state.editMode
		});  
	}

	//The Save New Investment button event, save to persistence, update react state
	//id==0  means creating a Investment
	//id!=0  means editing an existing Investment
	handleSaveInvestment () {  		

		let modalForm = JSON.parse(JSON.stringify(this.state.modalForm));
		let id = modalForm.id;

		console.log('handleSaveInvestment. id=',id);

		let investmentsArr = this.state.investmentsArr.slice() || [];

		if(id===0) {
			modalForm.id = (new Date().getTime())+'|'+this.state.modalForm.name+'|'+this.state.modalForm.APR;			
			
		} else {

			//filter out existing id element, so we can reinsert modified elem
			investmentsArr = (this.state.investmentsArr.slice()).filter(function (el) {
			  return el.id!==modalForm.id;
			});
		}
		
		investmentsArr.push(modalForm);
		localStorage.setItem('investments',JSON.stringify(investmentsArr));
	
		this.setState({
			loansArr:this.state.loansArr,
			investmentsArr: investmentsArr,
			showModal:false,
			modalForm:JSON.parse(JSON.stringify(this.state.EMPTY_MODAL_FORM)),
			EMPTY_MODAL_FORM: this.state.EMPTY_MODAL_FORM,
			extra:this.state.extra,
			editMode:this.state.editMode
		});  
	}

	/*
	* () => { func }, this format allows an anonymoous function "()" to call the "func", which 
	is enclosed in context it was defined or "{ scoped }".
	* 
	*
	* 		onClickDeleteLoanEntry={(id)=>this.handleDeleteLoanEntry(id)}
	created		
	top		onClickDeleteLoanEntry={()=>this.props.onClickDeleteLoanEntry(argLoansArray[i].id)}
	down		
			<button onClick={this.props.onClickDeleteLoanEntry}>delete</button>
	executed
	bottom
	up
			the onClick event is a function OBJECT! not a function call.		
	*
	*/
	handleDeleteLoanEntry (id) {
		
		const loansArr = this.state.loansArr.slice();
		let filtered = loansArr.filter(function(el) { return el.id !== id; }); 
		console.log('@handleDeleteLoanEntry(',id,')');
		console.log(filtered);
		//delete file from storage/db
		localStorage.setItem('loans',JSON.stringify(filtered));
		this.setState({
			loansArr:filtered,
			investmentsArr: this.state.investmentsArr,
			showModal:false,
			modalForm:this.state.modalForm,
			EMPTY_MODAL_FORM: this.state.EMPTY_MODAL_FORM,
			extra:this.state.extra,
			editMode:this.state.editMode
		});  
	}
/******************
 * Investments
 ******************/
	handleDeleteInvestEntry (id) {
		
		const investmentsArr = this.state.investmentsArr.slice();
		let filtered = investmentsArr.filter(function(el) { return el.id !== id; }); 
		console.log('@handleDeleteInvestEntry(',id,')');
		console.log(filtered);
		//delete file from storage/db
		localStorage.setItem('investments',JSON.stringify(filtered));
		this.setState({
			investmentsArr:filtered,
			loansArr: this.state.loansArr,
			showModal:false,
			modalForm:this.state.modalForm,
			EMPTY_MODAL_FORM: this.state.EMPTY_MODAL_FORM,
			extra:this.state.extra,
			editMode:this.state.editMode
		});  
	}


	render() {

		return(
			<div className="row" style={{marginLeft:'0px',marginRight:'0px'}}>
				<div className="col-md-3">
					<ExtraPaymentsPanel 
						loansArray={this.state.loansArr}
						investmentsArray={0}
						extra = {this.state.extra}
						onChange={(evt)=>this.handleInputChange(evt)}
						/>
					<LoanControlPanel
						loansArray={this.state.loansArr} 
						onClickShowModal={(id)=>this.handleShowModal(id,true)}  	
						onClickDelete={(id)=>this.handleDeleteLoanEntry(id)}
						/>
					<InvestmentsControlPanel
						investmentsArray={this.state.investmentsArr} 
						onClickShowModal={(id)=>this.handleShowModal(id,false)}  	
						onClickDelete={(id)=>this.handleDeleteInvestEntry(id)}
						/>						
				</div>
				<div className="col-md-9">
					<CumulativeDebtsVsInvestment
						loansArr={this.state.loansArr}
						investmentsArr={this.state.investmentsArr}
						/>	
				</div>
				<DataEntryModal
					modalForm={this.state.modalForm}
					showModal={this.state.showModal} 
					editMode={this.state.editMode}
					onClickCloseModal={()=>this.handleCloseModal()}  
					onClickDataEntryModal={()=>this.handleSaveLoan()}
					onClickInvestModal={()=>this.handleSaveInvestment()}
					onChangeInput={(evt)=>this.handleInputChange(evt)}
					/>
			</div>
		)
	}
}


export default App;
