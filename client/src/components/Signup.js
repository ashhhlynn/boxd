import React, { Component } from "react"
import { Form } from 'semantic-ui-react'

class Signup extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    }

    handleSubmit = (event, userData) => {
        event.preventDefault()
        fetch("/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userData.username, email: userData.email, password: userData.password, password_confirmation: userData.password_confirmation,
            })
        })
        .then((response) => response.json())
        .then(data => {
            if (data.errors) {
                window.alert("Signup failed.")
            }
            else {
                this.props.handleRoute()
                window.alert("Signup successful.")
            }
        })
    } 

    handleChange = (event) => {
        this.setState ({
            [event.target.id]: event.target.value
        })
    }

    render() {
        return (
            <>
            <h1 >Register</h1>
            <Form onSubmit={ (event) => {this.handleSubmit(event, this.state)} }>              
                <Form.Input
                    required
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={this.state.username} 
                    onChange={this.handleChange}            
                />
                <Form.Input
                    required
                    type="text"
                    id="email"
                    placeholder="Email"
                    value={this.state.email} 
                    onChange={this.handleChange}
                />
                <Form.Input
                    required
                    id="password"
                    placeholder="Password"
                    type="password"
                    value={this.state.password} 
                    onChange={this.handleChange}
                /> 
                <Form.Input
                    required
                    id="password_confirmation"
                    placeholder="Confirm Password"
                    type="password"
                    value={this.state.password_confirmation} 
                    onChange={this.handleChange}
                />
                <Form.Button circular content="Submit"/>
            </Form>
            </>
        )
    }
}

export default Signup