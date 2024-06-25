import React, { useState } from 'react';
import { Icon, Menu, Modal } from 'semantic-ui-react';
import UserModal from '../FollowModal/UserModal';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Navbar = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    
    const handleLogout = () => {
        fetch("/logout", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        props.logOut()
    };    
    
    const handleOpen = () => {
        setModalOpen(true)
    };
    
    const handleClose = () => {
        setModalOpen(false)
    };
    
    const changeUserShow = (userShow) => {
        props.changeUserShow(userShow)
        handleClose()
    };
    
    return (
        <Menu className="nav">
            <Menu.Menu 
                icon='labeled' 
                style={{
                    marginLeft:"4%", 
                    marginTop:"1%"
                }} 
                position="left"
            >
                <br/>
                <h1><Link to='/'>Boxd.</Link></h1>
            </Menu.Menu>
            <Menu.Menu 
                style={{marginRight:"3%"}} 
                position='right'
            >
                {props.currentUser.length === 0 ?
                    <Menu.Item>
                        <Link to='/login'><Icon size="big" name="user circle outline" /></Link>
                    </Menu.Item>
                :
                    <>
                    <Menu.Item>
                        <Link to='/userdiary'><Icon name="user circle" size="large" style={{ marginTop:"2%"}} /></Link> Diary
                    </Menu.Item>
                    <Menu.Item>
                        <Link to='/watchlist'><Icon name="eye" size="large" style={{ marginTop:"2%"}} /></Link> Watchlist
                    </Menu.Item>
                    <Menu.Item>
                        <Icon name="address book outline" onClick={handleOpen} size="large" style={{cursor:"pointer"}} />Friends
                    </Menu.Item>
                    <Menu.Item>
                        <Link to='/'><Icon size="large" onClick={handleLogout} name="power off" /></Link>
                    </Menu.Item>
                    </>
                }
                <Modal
                    open={modalOpen}
                    onClose={handleClose}
                    closeIcon
                >
                    <Modal.Content style={{textAlign:"center"}}>
                        <UserModal
                            addFollowFilms={props.addFollowFilms} 
                            removeFollowFilms={props.removeFollowFilms} 
                            changeUserShow={changeUserShow} 
                            currentUser={props.currentUser} 
                        />
                    </Modal.Content>
                </Modal>
            </Menu.Menu>
        </Menu>
    );
};

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
};

export default connect(mapStateToProps)(Navbar);