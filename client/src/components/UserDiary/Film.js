import React, { Component } from 'react'
import { Button, Card, Image, Modal } from 'semantic-ui-react'
import { connect } from 'react-redux'

class Film extends Component {

    state = {
		modalOpen: false,
        score: 'N/A',
    }

    handleOpen = (event) => {
        if (this.props.allDiaryFilms.find(f => f.watch_date === event.target.id)) {
            let f = this.props.allDiaryFilms.find(f => f.watch_date === event.target.id)
            fetch("/diary_films/" + f.id)
            .then(resp => resp.json())
            .then(data => {
                this.setState({score: data})
            })
        }
        this.setState({ modalOpen: true });
    }
	
	handleClose = () => {
		this.setState({ modalOpen: false })
	}

    render () {
        let movie = this.props.movie
	    return (
		    <>
            <Card>
                <Image id={movie.imdbID} onClick={this.handleOpen} style={{cursor:"pointer", height:"290px", width:"205px"}} src={movie.Poster} alt='movie'></Image>   
                <Modal
			        open={this.state.modalOpen}
                    onClose={this.handleClose}
			        closeIcon
                >
                    <Modal.Content>
                        <h3>{movie.Title}
                            <Button circular floated="right" onClick={() => this.props.addUserDiaryFilm(movie)}>Log Film to Diary</Button>
                        </h3>
                        <h5>{movie.Year}</h5> 
                        <h5>Boxd Score: {this.state.score}</h5>
                    </Modal.Content>
          	    </Modal>
            </Card>
            </>
	    )
    }
}

const mapStateToProps = (state) => {
    return { 
        allDiaryFilms: state.allDF,
    }
}
    
export default connect(mapStateToProps)(Film)