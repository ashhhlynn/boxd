import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

const Signup = ({ handleRoute }) => {
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const handleSubmit = (event, userData) => {
        event.preventDefault();
        fetch("/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userData.username, 
                email: userData.email, 
                password: userData.password, 
                password_confirmation: userData.password_confirmation,
            })
        })
        .then((response) => response.json())
        .then(data => {
            if (data.errors) {
                window.alert("Signup failed.");
            }
            else {
                window.alert("Signup successful.");
                handleRoute()
            }
        });
    }; 

    const handleChange = (event) => {
        setState({...state, [event.target.id]: event.target.value});
    };

    return (
        <>
        <h2>Register</h2>
        <Form onSubmit={(e) => handleSubmit(e, state)}>              
            <Form.Input
                required
                type="text"
                id="username"
                placeholder="Username"
                value={state.username} 
                onChange={handleChange}            
            />
            <Form.Input
                required
                type="text"
                id="email"
                placeholder="Email"
                value={state.email} 
                onChange={handleChange}
            />
            <Form.Input
                required
                id="password"
                placeholder="Password"
                type="password"
                value={state.password} 
                onChange={handleChange}
            /> 
            <Form.Input
                required
                id="password_confirmation"
                placeholder="Confirm Password"
                type="password"
                value={state.password_confirmation} 
                onChange={handleChange}
            />
            <Form.Button 
                size="tiny" 
                circular 
                content="Submit" 
            />
        </Form>
        </>
    );
};

export default Signup;