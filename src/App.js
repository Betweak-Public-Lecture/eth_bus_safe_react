import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import MyNavbar from './components/MyNavbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [isLogined, setIsLogined] = React.useState(false);

  return (
    <Router>
      <MyNavbar isLogined={isLogined} />

      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={(prop) => <Login {...prop} setLogin={()=>setIsLogined(true)} />}  />
        <Route path='/register' exact component={Register} />
      </Switch>

    </Router>
  );
}

export default App;
