import React from 'react'
import {Container, Row, Col, Table, Form, Button, ButtonGroup} from 'react-bootstrap';

export default function CarDetail({history, match}) {
  const carId = match.params.carId;

  const [carInfo, setCarInfo] = React.useState({
    car_id: '',
    car_div: '',
    car_type: '',
    car_birth: '',
    car_day: '',
    car_result: ''
  })
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
  }, [])
  
  return (
    <Container style={{paddingTop: 60}}>
      <Row>
        <Col>
          <h1>차량 상세 정보</h1>
        </Col>
      </Row>
      <Row style={{paddintTop: 60}}>
        <Col>
          <Table striped bordered hover >
            <thead>
              <tr>
                <th>차량번호</th>
                <th>소속</th>
                <th>차량 종류</th>
                <th>연식</th>
                <th>최종 검사일</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* 실습: 자동차 상세보기 렌더링 */}
                <td>{carInfo.car_id}</td>
                <td>{carInfo.car_div}</td>
                <td>{carInfo.car_type}</td>
                <td>{carInfo.car_division}</td>
                <td>{carInfo.car_day}</td>
              </tr>
            </tbody>
          </Table>
          <h5 >기타사항</h5>
          <div style={{border:"1px solid #e9e9e9", width: '100%', minHeight: 300, padding:10}}>
              {/* 실습: car_result 보여주기 */}
              {carInfo.car_result}
          </div>
          
          <div style={{textAlign:'center', marginTop:10}}>
            <ButtonGroup size="lg">
              <Button variant={'info'} >수정</Button>
              <Button variant={'danger'}>삭제</Button>
            </ButtonGroup>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
