import React,{ Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router,Route,Link} from "react-router-dom";
import UsersList from "./components/users-list.component";
import ViewUser from "./components/view-user.component";
import Transfers from "./components/transfer.component";
import logo from "./logo.png";
import "./App.css";

class App extends Component{
  render(){
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="https://www.linkedin.com/in/akash-verma-b3591591/" target="_blank">
              <img src={logo} width="50" height="50" alt="Logo.png" />
            </a>
            <Link to="/" className="navbar-brand font-weight-bold" style={{color:'pink'}}>Credit Management App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link font-weight-bold">Users</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/transfer" className="nav-link font-weight-bold">Transfers</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/" exact component={UsersList} />
          <Route path="/view/:id" component={ViewUser} />
          <Route path="/transfer" component={Transfers} />
        </div>
       </Router>
    );
  }
}


export default App;
