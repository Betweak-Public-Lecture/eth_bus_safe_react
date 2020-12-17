import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import {Link} from 'react-router-dom'


export default function MyNavbar({authInfo, onLogout}) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">버스 관리</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">

        <Nav className="mr-auto">
          <Link to='/' component={Nav.Link}>Home</Link>
          {authInfo.linkcode !== -1 ? 
            <React.Fragment>
              <Link to='/carlist' component={Nav.Link}>차량 목록</Link>
              <Link to='/history' component={Nav.Link}>정비 기록</Link>
            </React.Fragment> : 
            null
          }
        </Nav>

        <Nav inline>
          <Nav.Link>
            {authInfo.linkcode === 1 ? "정비사" : null}
            {authInfo.linkcode === 0 ? "master": null}
          </Nav.Link>

          {authInfo.linkcode !== -1 ? <Nav.Link onClick={()=>{
            onLogout();
            localStorage.removeItem('authInfo');
          }}>로그아웃</Nav.Link> : 
            <React.Fragment>
              <Link to='/login' component={Nav.Link}>로그인</Link>
              <Link to='/register' component={Nav.Link}>회원가입</Link>
            </React.Fragment>
          }
        </Nav>

      </Navbar.Collapse>
    </Navbar>
  )
}
