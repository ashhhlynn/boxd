import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import { Search, Button, Item, Icon } from 'semantic-ui-react'

function UserSearch(props) {
    
    const [results, setResults] = useState([])
    const [value, setValue] = useState('')
    const [users, setUsers] = useState([])

    useEffect(() => {
		getUsers()
	}, [])

    const getUsers = () => {
		fetch("/users")
        .then(resp => resp.json())
        .then(data => {
			setUsers(data)
		})
    }

    const handleSearchChange = e => {
        let value = e.target.value;
        setValue(value);
        const re = new RegExp(_.escapeRegExp(value), 'i');
        const isMatch = result => re.test(result.username);
        setResults(_.filter(users, isMatch));
    }

    const handleAddFollow = (event) => {
        if (users.find(u => u.username === event.target.id)) {
            let x = users.find(u => u.username === event.target.id)
            fetch(`users/` + x.id + `/follow`, {
			    method: 'POST',
			    headers: {
			    	'Content-Type': 'application/json',
			    },
			    body: JSON.stringify({
			    }),
            })
            props.addFollow(x)   
        }
    }
    
    const resultRenderer = ({ username }) => ([ 
        <Item key={username}>
            <Button floated="right" style={{marginTop:"-2%", width:"43px"}} size="mini" id={username} onClick={handleAddFollow}>
                <Icon name="plus"/>
            </Button>
            <p style={{marginTop:"2%"}}>{username}</p>
        </Item>
    ])
    
    return (
        <Search
          onSearchChange={handleSearchChange}
          noResultsMessage='No users found.'
          resultRenderer={resultRenderer}
          results={results}
          value={value}
          title={results}
          placeholder='Search users to follow...'
        />
    )
}

export default UserSearch