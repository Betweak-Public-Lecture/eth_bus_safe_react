import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import MyNavbar from './components/MyNavbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [isLogined, setIsLogined] = React.useState(false);

  const [authInfo, setAuthInfo] = React.useState({
    post_id: '',
    name: '',
    linkcode: -1,
    division: ''
  })

  React.useEffect(()=>{
    const authInfo = localStorage.getItem('authInfo')
    if (authInfo){
      setAuthInfo(
        JSON.parse(authInfo)
      )
    }
  }, [])





  return (
    <Router>
      <MyNavbar authInfo={authInfo} onLogout={()=>{
        setAuthInfo({
          post_id: '',
          name: '',
          linkcode: -1,
          division: ''
        })
      }} />

      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' exact component={(prop) => <Login {...prop} setAuthInfo={(authInfo)=>setAuthInfo(authInfo)} />}  />
        <Route path='/register' exact component={Register} />
      </Switch>

    </Router>
  );
}

export default App;
