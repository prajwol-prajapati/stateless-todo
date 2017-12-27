import React from 'react';

function EditTodo(props){
    let handleChange = () => {

	}
	let formName= 'Add New todo';
	let completedOptions = props.completed.map(completed => {
		return <option key={completed} value={completed}>{completed}</option>
	});
	let tagOptions = props.tags.map(tag => {
		return <option key={tag} value={tag}>{tag}</option>
	});
	let buttonName = "Add";

	// function submitOption(form){
	// 	console.log(form);
	// 	// props.addTodo();
	// }

	return (
		<div className="todoForm">
			<h3> {formName} </h3>
			<form>
				<div>
					<label>Name</label><br/>
					<input type="text" onChange={props.handleChange} name="name" value={props.defaultValue.name}/>

				</div><br/>
				<div>
					<label> Tags </label> <br/>
					<select name="tags" onChange={props.handleChange} value={props.defaultValue.tags}>
						{tagOptions}
					</select>
				</div> <br />
				<div>
					<label> Completed </label> <br/>
					<select name="completed" onChange={props.handleChange} value={props.defaultValue.completed}>
						{completedOptions}
					</select>
				</div> <br />
				<button type="submit" onClick={props.submitOption}>{buttonName}</button>

			</form>
		</div>
	);
}

export default EditTodo;