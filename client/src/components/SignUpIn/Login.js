import React, { Component } from "react"
import { Form } from 'semantic-ui-react'

class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState ({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event, userData) => {
        event.preventDefault()
        fetch("/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userData.email, 
                password: userData.password
            })
        })
        .then((response) => response.json())
        .then(data => {
            if (data.errors) {
                window.alert("Login failed.")
            }
            else {
                window.alert("Login successful.")
                this.props.handleRoute()
            }
        })
    }

    handleSubmitDemo = (event) => {
        event.preventDefault()
        fetch("/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'demo@gmail.com',
                password: 'demo'
            })
        })
        .then((response) => response.json())
        .then(data => {
            if (data.errors) {
                window.alert("Login failed.")
            }
            else {
                window.alert("Login successful.")
                this.props.handleRoute()
            }
        })
    }
    
    render() {
        return (
            <>                               
            <h2 style={{fontFamily:"Helvetica"}}>Sign In</h2>
            <Form onSubmit={ (event) => { this.handleSubmit(event, this.state)}}>
                <Form.Input
                    required
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
                <Form.Button size="tiny" circular content='Submit'/>
            </Form>               
            <br></br>
            Don't want to create account? Use <button onClick={this.handleSubmitDemo} style={{border:"0", backgroundColor:"#cdcdff"}}><p style={{fontSize:"13px"}}>Demo</p></button>
            </>
        )
    }
}

export default Login
