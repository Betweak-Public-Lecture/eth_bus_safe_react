import React from 'react'
import {Container, Row, Col, Table, Form} from 'react-bootstrap';

export default function CheckListPost({history, match}) {
  const carId = match.params.carId; // targetCarId;
  const [carInfo, setCarInfo] = React.useState({
    car_id:'',
    car_div:'',
    car_type:'',
    car_birth:'',
    car_day:''
  })

  // fetch by carId(GET)
  React.useEffect(()=>{
    fetch(`/api/car/${carId}`,{
      method:"GET"
    }).then(res=>{
      return res.json()
    }).then(data=>{
      setCarInfo(data.result)
    })
  }, [])


  return (
    <Container style={{paddingTop:60}}>
      <Row>
        <Col>
          <h1>체크리스트</h1>
        </Col>
      </Row>

      <Row style={{paddingTop: 60}}>
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
              {/* carList Rendering: 실습 */}
              <td>{carInfo.car_id}</td>
              <td>{carInfo.car_div}</td>
              <td>{carInfo.car_type}</td>
              <td>{carInfo.car_birth}</td>
              <td>{carInfo.car_day}</td>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}
