import React, { useState } from 'react';
import { Form, Label } from 'semantic-ui-react';

const Login = ({ handleRoute }) => {
    const [state, setState] = useState({email: '', password: ''});

    const handleChange = (event) => {
        setState({...state, [event.target.id]: event.target.value})
    };

    const handleSubmit = (event, loginData) => {
        event.preventDefault()
        fetch("/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: loginData.email, 
                password: loginData.password
            })
        })
        .then((response) => response.json())
        .then(data => {
            if (data.errors) {
                window.alert("Login failed.")
            }
            else {
                window.alert("Login successful.")
                handleRoute()
            }
        })
    };
    
    return (
        <>                               
        <h2>Sign In</h2>
        <Form onSubmit={(e) => handleSubmit(e, state)}>
            <Form.Input
                required
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
            <Form.Button 
                size="tiny" 
                circular 
                content='Submit'
            />
        </Form>               
        <br/>
        No account? Sign in with the <Label size="mini" onClick={(e) => handleSubmit(e, {email:'demo@gmail.com', password:'demo'})}>Demo</Label>
        </>
    );
};

export default Login;