import React from 'react';

function Search(props){
	return(
    <input 
        type='text' 
        placeholder="Search for todos...."
        value = {props.searchKey}
        onChange = {props.handleChange}
        className = 'search-box'
     />
	);
}

export default Search;