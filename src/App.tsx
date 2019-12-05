import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './login/Login';
import Register from './register/Register';
import { Reducer } from './utils/generalTypes';
import { connect } from 'react-redux';

export interface State {

};

export interface Props {
  reducer?: Reducer;
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

  }

  render() {

      return (
        <Router>
          <React.Fragment>
            <Route exact path="/" component={Navbar} />
            <Route exact path="/home" component={Navbar} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            {/* ------------------------------------------------------ */}
            <Route exact path="/dila" component={Navbar} />
            <Route exact path="/dilo/:id" component={Navbar} />

            <Route exact path="/autori" component={Navbar} />
            <Route exact path="/autor/:id" component={Navbar} />

            <Route exact path="/ceskaLiteratura" component={Navbar} />
            <Route exact path="/svetovaLiteratura" component={Navbar} />

            <Route exact path="/testy" component={Navbar} />
            <Route exact path="/testDashboard" component={Navbar} />
            <Route exact path="/hodnoceniTesty" component={Navbar} />
            
            <Route exact path="/kviz" component={Navbar} />

          </React.Fragment>
        </Router>
      );
    
  }
}

export default connect(reducer => reducer)(App);
