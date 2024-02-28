import _ from 'lodash'
import React, { useState } from 'react'
import { Search, Button, Item, Icon } from 'semantic-ui-react'

function UserSearch(props) {
    
    const [results, setResults] = useState([])
    const [value, setValue] = useState('')

    const handleSearchChange = e => {
        let value = e.target.value;
        setValue(value)
        const re = new RegExp(_.escapeRegExp(value), 'i')
        const isMatch = result => re.test(result.username)
        setResults(_.filter(props.users, isMatch))
    }

    const handleAddFollow = async (event, user) => {
        event.preventDefault()
        props.addFollow(user)
        await fetch(`users/` + user.id + `/follow`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    
    const resultRenderer = ({username}) => ([ 
        <Item key={username}>
            <Button floated="right" style={{color: "black", marginTop:"-2%", width:"43px"}} size="mini" onClick={(e) => handleAddFollow(e, props.users.find(u => u.username === username))}>
                <Icon name="plus"/>
            </Button>
            <p style={{marginTop:"2%"}}>{username}</p>
        </Item>
    ])
    
    return (
        <Search
            onSearchChange={handleSearchChange}
            noResultsMessage='No unfollowed users found.'
            resultRenderer={resultRenderer}
            results={results}
            value={value}
            placeholder='Search users..' 
        />
    )
}

export default UserSearch