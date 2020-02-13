import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './login/Login';
import Register from './register/Register';
import { Reducer, User } from './utils/generalTypes';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export interface Props {
  reducer?: Reducer
  dispatch?: Function
};

export interface State {

};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

  }
  
  componentWillMount() {
    this.checkLoginUser();
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
          <Route exact path="/addNewDilo" component={Navbar} />
          <Route exact path="/editDilo/:id" component={Navbar} />
          <Route exact path="/zadostONavrhu" component={Navbar} />
          <Route exact path="/navrhDetail/:id" component={Navbar} />

          <Route exact path="/autori" component={Navbar} />
          <Route exact path="/autor/:id" component={Navbar} />
          <Route exact path="/addNewAutor" component={Navbar} />

          <Route exact path="/ceskaLiteratura" component={Navbar} />
          <Route exact path="/svetovaLiteratura" component={Navbar} />

          <Route exact path="/testy" component={Navbar} />
          <Route exact path="/testDashboard" component={Navbar} />
          <Route exact path="/honoceniTestu" component={Navbar} />

          <Route exact path="/kviz" component={Navbar} />
          <Route exact path="/honoceniKvizu" component={Navbar} />

          <Route exact path="/navrhAutora" component={Navbar} />
          <Route exact path="/navrhDila" component={Navbar} />



        </React.Fragment>
      </Router>
    );

  }

  private checkLoginUser = () => {
    var accessToken = localStorage.getItem('accessToken');
    var id = Number(localStorage.getItem('id'));
    var email = localStorage.getItem('email');
    var admin = localStorage.getItem('admin');
    if (id !== 0 && accessToken !== null && email !== null && admin !== null) {
      const user: User = {
        id: id,
        email: email,
        admin: (admin === 'true'),
        accessToken: accessToken
      }
      if (this.props.dispatch) {
        this.props.dispatch(actions.login(user));
      }
    }

    if(id === 0 || accessToken === null || email === null && admin === null){
      localStorage.clear();
    }
  }
}

  export default connect(reducer => reducer)(App);
