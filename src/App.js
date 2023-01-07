import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './component/Navbar';
import Form from './component/Form';
import EmployListing from './EmployListing';
import StdDetail from './component/StdDetail';
import StdEdit from './component/StdEdit';

function App() {
  return (
    <div>
      <Router>
      <Navbar/>
      <div className='container'>
        <Switch>
      <Route exact path="/">
      <EmployListing/>
      </Route>
      
      <Route exact path="/signup"><Form/></Route>
      <Route exact path="/detail/:stdid"><StdDetail/></Route>
      <Route exact path="/edit/:stdid"><StdEdit/></Route>
      
    
      </Switch>
      </div>
      </Router>
    </div>
  );
}

export default App;
