import React from 'react'

const SearchBox = (props) => {
	return (
		<>
		<h3>
			Search Films... 
			<input
				value={props.value}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder=''
				style={{marginTop:"1.5%"}}
				>
			</input>
		</h3>
		</>
	);
};

export default SearchBox