import React, { useState }from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home'
import Pirarab from './components/Pirarab'
import Usta from './components/Usta'
import Notfound from './components/Notfound'
import Manzil from './components/Manzil'
import UserContext from '../src/context/UserContext'
import './App.css';

function App() {
  
  const [database, setData] = useState({
    token:undefined,
    user:undefined
  })
  return (
    <div className="App">
      <UserContext.Provider value={{ database,setData}}>
      <Router>
        <Switch>
          <Route exact path ="/" component ={Home}></Route>
          <Route  path ="/pirarab" component ={Pirarab}></Route>
          <Route path ="/manzil/:id" component ={Manzil}></Route>
          <Route  path ="/usta" component ={Usta}></Route>
          <Route component ={Notfound}></Route>
        </Switch>
        </Router>
        </UserContext.Provider>
    </div>
  );
}

export default App;
