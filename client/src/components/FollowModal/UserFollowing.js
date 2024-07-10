import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Button } from 'semantic-ui-react';

const UserFollowing = ({ userFollowing, changeUserShow, removeFollow }) => {
    return (
        <>
        {userFollowing.map((user, index) => (
            <Card key={index}>
                <Card.Header>
                    <Link to='/profile' onClick={() => changeUserShow(user.id)}>{user.username}</Link>
                    <Button 
                        floated="right" 
                        onClick={(event) => removeFollow(event, user)} 
                        size="mini"
                    >
                        <Icon name="user close" />
                    </Button>
                </Card.Header>
            </Card>
        ))}
        </>
    );
};

export default UserFollowing;