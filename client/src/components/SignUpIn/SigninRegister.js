import React from "react";
import { Grid, Divider, Segment } from 'semantic-ui-react';
import Login from './Login';
import Signup from './Signup';
import { useHistory } from "react-router-dom";

const SigninRegister = ({ getUserProfile }) => {
    const history = useHistory();

    const handleRoute = () => {
        getUserProfile()
        history.push('/')
    };
    
    return (
        <>  
        <br/>        
        <Segment placeholder>
            <br/> 
            <Grid stackable relaxed='very' columns={2}>
                <Grid.Column> 
                  <Login handleRoute={handleRoute} />
                </Grid.Column>                 
                <Grid.Column>
                    <Signup handleRoute={handleRoute} />
                </Grid.Column>   
            </Grid>
            <Divider vertical style={{marginTop:"1%"}}>Or</Divider>
        </Segment>
        </>
    );
};

export default SigninRegister;