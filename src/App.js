import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import MyNavbar from './components/MyNavbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Car CRUD Page
import CarList from './pages/Car/CarList';
import CarDetail from './pages/Car/CarDetail';
import CarEdit from './pages/Car/CarEdit';
import CarAdd from './pages/Car/CarAdd';

// CheckList Pages
import CheckList from './pages/CheckList';
import checkListPost from './pages/CheckListPost';
import CheckListPost from './pages/CheckListPost';

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

        {/* Car Routes */}
        <Route path='/carlist' exact component={
          (props)=><CarList {...props} authInfo={authInfo} />
        } />

        <Route path='/caradd' exact component={CarAdd} />
        <Route path='/car/:carId/edit' exact component={CarEdit} />
        <Route path='/car/:carId' exact component={CarDetail} />

        {/* CheckList Routes */}
        <Route path='/checklist/:carId' exact component={CheckList} />
        <Route path='/checklist/:carId/post' exact component={CheckListPost} />
        
      </Switch>

    </Router>
  );
}

export default App;
