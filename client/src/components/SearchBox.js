import React from 'react'

const SearchBox = (props) => {
	return (
		<>
		<h4>
			Search Films... 
			<input
				value={props.value}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder=''
				>
			</input>
		</h4>
		</>
	);
};

export default SearchBox