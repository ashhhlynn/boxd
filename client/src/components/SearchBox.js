import React from 'react';

const SearchBox = (props) => {
	return (
		<div className='col col-sm-4'>
			Search Films... <input
				className='form-control'
				value={props.value}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder=''
			></input>
		</div>
	);
};

export default SearchBox;