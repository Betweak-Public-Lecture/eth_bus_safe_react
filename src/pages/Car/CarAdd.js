import React from 'react'
import {Container, Row, Col, Form, Button} from 'react-bootstrap'

export default function CarAdd({history}) {

  const [carForm, setCarForm] = React.useState({
    car_id: '',
    car_div: '',
    car_type: '',
    car_birth: '',
    car_day: '',
    car_result: ''
  })
  

  const submitCarAddForm = React.useCallback(function(carForm){
    fetch('/api/car', {
      method: 'POST',
      headers: {
        'CONTENT-TYPE': 'application/json',
      },
      body: JSON.stringify(carForm)
    }).then(resp=>{
      return resp.json()
    }).then(data=>{
      if (data.status === "Success"){
        history.push('/carlist');
      } else{
        alert("서버 통신중 오류 발생.")
      }
    }).catch(err=>{
      alert("서버 통신중 오류 발생. [콘솔 확인]")
      console.error(err)
    })
  }, [])



  return (
    <Container style={{paddingTop: 60}}>
      <Row>
        <Col>
          <h1>차량 추가</h1>
        </Col>
      </Row>
      <Row>
        <Col>
        <Form>
            <Form.Group>
              <Form.Label>차량번호</Form.Label>
              <Form.Control 
                  type="text" 
                  onChange={(e)=>{
                    setCarForm({
                      ...carForm,
                      car_id: e.target.value
                    })
                  }} 
                  value={carForm.car_id}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>차량소속</Form.Label>
              <Form.Control 
                  type="text"
                  onChange={(e)=>{
                    setCarForm({
                      ...carForm,
                      car_div: e.target.value
                    })
                  }} 
                  value={carForm.car_div}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>차량 종류</Form.Label>
              <Form.Control 
                  type="text"
                  onChange={(e)=>{
                    setCarForm({
                      ...carForm,
                      car_type: e.target.value
                    })
                  }} 
                  value={carForm.car_type}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>차량연식</Form.Label>
              <Form.Control 
                  type="text"
                  onChange={(e)=>{
                    setCarForm({
                      ...carForm,
                      car_birth: e.target.value
                    })
                  }} 
                  value={carForm.car_birth}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>최종 점검일</Form.Label>
              <Form.Control 
                  type="text"
                  onChange={(e)=>{
                    setCarForm({
                      ...carForm,
                      car_day: e.target.value
                    })
                  }} 
                  value={carForm.car_day}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>기타사항</Form.Label>
              <Form.Control 
                  as="textarea"
                  rows="7"
                  onChange={(e)=>{
                    setCarForm({
                      ...carForm,
                      car_result: e.target.value
                    })
                  }} 
                  value={carForm.car_result}
              />
            </Form.Group>

            <Button onClick={
              // submitCarAddForm() // 햠수 호출
              ()=>{ submitCarAddForm(carForm) } // 함수 자체
            }>차량 추가</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
