import React from 'react';
import { Card, Popup, Icon, Rating } from 'semantic-ui-react';

const ModalFeed = ({ feedEntries }) => {
    return (
        <Card.Group 
            itemsPerRow={7}
            style={{
                marginLeft:"-6%", 
                marginTop:"-2%"
            }}
        >
            {feedEntries.map((f => (
                <Card style={{
                    marginLeft:"5%", 
                    textAlign:"center", 
                    fontSize:"12px", 
                    background:"inherit", 
                    boxShadow:"none", 
                    width:"30px"
                }}>
                    <Popup
                        content={f.user.username}
                        basic
                        trigger={
                            <Icon 
                                name="user circle" 
                                style={{
                                    fontSize:"280%", 
                                    marginLeft:"20%"
                                }}
                            />
                        }
                    />
                    <Rating 
                        disabled
                        size="mini" 
                        rating={f.rating}  
                        maxRating={5}  
                        style={{
                            fontSize:"8px", 
                            marginTop:"41%"
                        }}
                    />
                </Card>
            )))}
        </Card.Group>
    );
};

export default ModalFeed;