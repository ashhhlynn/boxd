import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React, { Component } from 'react'
import Films from './components/Films'

class App extends Component {


  componentDidMount = () => {
    fetch("/films")
    .then((r) => r.json())
    .then((data) => console.log(data));
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