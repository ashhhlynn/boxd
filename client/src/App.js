import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { Component } from 'react'
import Films from './components/Films'

class App extends Component {

  state={
    films: []
  }

  componentDidMount = () => {
    fetch("/films")
    .then((r) => r.json())
    .then((data) => 
    this.setState({films: data}))
    console.log(this.state.films)
    ;
  }

  render() {
    return (
      <Router>
        <div className="App">   
            <Switch>
              <Route exact path="/" element={<Films />} />

            </Switch>
        </div>
      </Router>
    )
  }
}

export default App;