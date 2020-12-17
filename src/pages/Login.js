import React from 'react'
import {Container, Row, Col, FormGroup, Form, Button} from 'react-bootstrap';

export default function Login({history, setAuthInfo}) {
  // login Fetch 구현!
  const [userForm, setUserForm] = React.useState({
    post_id: '',
    password: ''
  })

  // Browser 저장공간(3가지)
  // 1. Cookie 
  // 2. localStorage
  // 3. sessionStorage
  const login = function(userForm){
    fetch('/api/user/login', {
      method: "POST",
      headers: {
        'CONTENT-TYPE': 'application/json',
      },
      body: JSON.stringify(userForm)
    }).then(resp=>{
      return resp.json();
    }).then(data=>{
      if (data.status === 'Success'){
        // localStorage: (브라우저의 저장공간(DB))
        localStorage.setItem('authInfo', JSON.stringify(data.result)) // localStorage에 authInfo(post_id, linkcode, ... 저장)
        // localStorage.setItem('post_id', userForm.post_id);
        
        setAuthInfo(data.result) // App.js의 State로 저장.
        history.push('/home');
      }
    })
  }

  return (
    <Container>
      <Row>
        <Col>
          <h3>로그인</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="post_id">
              <Form.Label>회원번호</Form.Label>
              <Form.Control 
                  type="text" 
                  onChange={(e)=>{
                    setUserForm({
                      ...userForm,
                      post_id: e.target.value
                    })
                  }} 
                  value={userForm.post_id}
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control 
                  type="password" 
                  onChange={(e)=>{
                    setUserForm({
                      ...userForm,
                      password: e.target.value
                    })
                  }} 
                  value={userForm.password}
              />
            </Form.Group>

            <Button onClick={()=>{
              login(userForm);
            }}>로그인</Button>
          </Form>
        </Col>
      </Row>
      
    </Container>
  )
}
