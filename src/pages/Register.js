import React from 'react'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'

export default function Register({history}) {
  const [registerForm, setRegisterForm] = React.useState({
    post_id: '',
    password: '',
    name:'',
    division: ''
  });

  const fetchRegister = function(registerForm){
    fetch("/api/user",{
      method: "POST",
      body: JSON.stringify(registerForm),
      headers: {
        'CONTENT-TYPE': 'application/json'
      }
    }).then(resp=>{
      return resp.json();
    }).then(data=>{
      console.log(data);
      if (data.status === 'Success'){
       history.push('/login')
      }
    })
  }

  return (
    <Container>
      {/* 회원번호, 비밀번호, 이름, 소속회사 */}
      <Row>
        <Col>
          <h3 style={{marginTop:40}}>회원가입</h3>
        </Col>
      </Row>
      <Row>

        <Col>
          <Form>
            <Form.Group controlId="formBasicNumber">
              <Form.Label>회원번호</Form.Label>
              <Form.Control 
                  type="text" 
                  onChange={(e)=>{
                  setRegisterForm({
                    ...registerForm,
                    post_id: e.target.value
                  })}
                } value={registerForm.post_id} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password"

                onChange={(e)=>{
                  setRegisterForm({
                    ...registerForm,
                    password: e.target.value
                  })}
                } value={registerForm.password} 
              />
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label>이름</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="홍길동"  
                onChange={(e)=>{
                  setRegisterForm({
                    ...registerForm,
                    name: e.target.value
                  })}
                } value={registerForm.name} 
                />
            </Form.Group>

            <Form.Group controlId="formBasicCompany">
              <Form.Label>소속 회사</Form.Label>
              <Form.Control type="text" placeholder="소속회사" 
                  onChange={(e)=>{
                    setRegisterForm({
                      ...registerForm,
                      division: e.target.value
                    })}
                  } value={registerForm.division} 
              />
            </Form.Group>

            <Button variant="primary" type="button" onClick={()=>{
              fetchRegister(registerForm);
            }}>
              회원가입
            </Button>
          </Form>
        </Col>

      </Row>
      
    </Container>
  )
}
