import React from 'react'
import {Container, Row, Col, Table, Form, Button} from 'react-bootstrap';

export default function CarEdit({history, match}) {
  const carId = match.params.carId;
  const [carInfo, setCarInfo] = React.useState({
    car_id: '',
    car_div: '',
    car_type: '',
    car_birth: '',
    car_day: '',
    car_result: ''
  });

  // fetch
  // 차량정보 state에 저장하기
  // useEffect
  React.useEffect(()=>{
    fetch(`/api/car/${carId}`, {
      method: "GET"
    }).then(resp=>{
      return resp.json()
    }).then(data=>{
      if (data.status === 'Success'){
        setCarInfo(data.result);
      } else{
        alert("네트워크 오류")
      }
    })
  }, []);

  const submitCarEdit = React.useCallback((carInfo)=>{
    // BOM
    const isOkay = window.confirm("정말 수정하시겠습니까?");
    if (!isOkay){
      return false
    }
    fetch(`/api/car/${carId}`, {
      method: 'PUT',
      headers:{
        'CONTENT-TYPE': 'application/json'
      },
      body: JSON.stringify(carInfo)
    }).then(resp=>{
      return resp.json()
    }).then(data=>{
      if (data.status === 'Success'){
        history.push('/carlist');
      } else{
        alert("네트워크 오류")
      }
    })

  }, [])


  return (
    <Container style={{paddingTop: 60}}>
      <Row>
        <Col>
          <h1>차량 수정</h1>
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
                    setCarInfo({
                      ...carInfo,
                      car_id: e.target.value
                    })
                  }} 
                  value={carInfo.car_id}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>차량소속</Form.Label>
              <Form.Control 
                  type="text"
                  onChange={(e)=>{
                    setCarInfo({
                      ...carInfo,
                      car_div: e.target.value
                    })
                  }} 
                  value={carInfo.car_div}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>차량 종류</Form.Label>
              <Form.Control 
                  type="text"
                  onChange={(e)=>{
                    setCarInfo({
                      ...carInfo,
                      car_type: e.target.value
                    })
                  }} 
                  value={carInfo.car_type}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>차량연식</Form.Label>
              <Form.Control 
                  type="text"
                  onChange={(e)=>{
                    setCarInfo({
                      ...carInfo,
                      car_birth: e.target.value
                    })
                  }} 
                  value={carInfo.car_birth}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>최종 점검일</Form.Label>
              <Form.Control 
                  type="text"
                  onChange={(e)=>{
                    setCarInfo({
                      ...carInfo,
                      car_day: e.target.value
                    })
                  }} 
                  value={carInfo.car_day}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>기타사항</Form.Label>
              <Form.Control 
                  as="textarea"
                  rows="7"
                  onChange={(e)=>{
                    setCarInfo({
                      ...carInfo,
                      car_result: e.target.value
                    })
                  }} 
                  value={carInfo.car_result}
              />
            </Form.Group>

            <Button onClick={
              // submitCarAddForm() // 햠수 호출
              ()=>{ submitCarEdit(carInfo) } // 함수 자체
            }>차량 추가</Button>
          </Form>
        </Col>
      </Row>

    </Container>
  )
}
