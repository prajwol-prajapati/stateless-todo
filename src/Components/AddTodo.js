import React from 'react';

function AddTodo(props){
	let handleChange = () => {

	}
	let formName= 'Add New todo';
	let completedOptions;
	let buttonName = "Add";

	function submitOption(form){
		console.log(form);
		// props.addTodo();
	}

	return (
		<div className="todoForm">
			<h3> {formName} </h3>
			<form >
				<div>
					<label>Name</label><br/>
					<input type="text" onChange={handleChange}/>

				</div>
				<div>
					<label> Completed </label> <br/>
					<select>
						{completedOptions}
					</select>
				</div> <br />
				<div>
					<label> Completed </label> <br/>
					<select>
						{completedOptions}
					</select>
				</div> <br />
				<button type="submit" onClick={submitOption}>{buttonName}</button>

			</form>
		</div>
	);
}

export default AddTodo;