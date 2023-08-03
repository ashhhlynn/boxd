import React, { Component } from 'react'
import { Button, Card, Image, Modal } from 'semantic-ui-react'

class Film extends Component {

    state = {
		modalOpen: false,
        rate: 'N/A',
        films: []
    }

    componentDidMount = () => {
        fetch("/films")
        .then(resp => resp.json())
        .then(data => {
            this.setState({films: data})
        })
    }

    handleOpen = (event) => {
        let x = this.state.films
        if (x.find(f => f.year === event.target.id)){
            let f = x.find(f => f.year === event.target.id)
            fetch("/films/" + f.id)
            .then(resp => resp.json())
            .then(data => {
                this.setState({rate: data})
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
            <Card style={{background:"inherit", boxShadow:"none"}}>
                <Image id={movie.imdbID} onClick={this.handleOpen} style={{cursor:"pointer", height:"290px", width:"205px"}} src={movie.Poster} alt='movie'></Image>   
                <Modal
                    style={{background:"inherit"}}
			        open={this.state.modalOpen}
                    onClose={this.handleClose}
			        closeIcon
                >
                    <Modal.Content style={{background:"inherit"}}>
                        <h3>{movie.Title}
                            <Button style={{letterSpacing:"1px", fontWeight:"normal"}} circular floated="right" onClick={() => this.props.addUserDiaryFilm(movie)}>Log Film to Diary</Button>
                        </h3>
                        <h5>{movie.Year}</h5> 
                        <h5>Boxd Score: {this.state.rate}</h5>
                    </Modal.Content>
          	    </Modal>
            </Card>
            </>
	    )
    }
}
    
export default Film