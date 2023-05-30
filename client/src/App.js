import { BrowserRouter as Router, Routes, Switch, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
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
      
          <Container style={{marginTop:"1.3%"}}>
            <Routes>
              <Route exact path="/" element={<Films />} />

            </Routes>
          </Container>
        </div>
      </Router>
    )
  }
}

export default App;