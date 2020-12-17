import React from 'react'
import {Container, Row, Col, Table, Form, Button} from 'react-bootstrap';

export default function CarList({history, match, authInfo}) {
  
  // 통신하기 실습
  // fetch
  const [carList, setCarList] = React.useState([]);
  React.useEffect(()=>{
    fetch('/api/car',{
      method: "GET"
    }).then(resp=>{
      return resp.json()
    }).then(data=>{
      if (data.status === 'Success'){
        setCarList(data.result)
      } else{
        alert("네트워크 오류")
      }
    });
  }, []);
  
  return (
    <Container style={{paddingTop: 60}}>
      <Row>
        <Col>
          <h1>차량 목록</h1>
        </Col>
      </Row>

      <Row style={{paddingTop: 60}}>
        <Col>
          <Button style={{float:'right', marginBottom:10}} onClick={()=>{history.push('/caradd')}}>추가</Button>
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
              {
                carList.map(item=>{
                  return (
                    <tr key={item.car_id} onClick={()=>{
                      if (authInfo.linkcode === 1){
                        // 정비사 ==> CheckList 등록으로 이동
                        history.push(`/checklist/${item.car_id}/post`)
                      } else if (authInfo.linkcode ===0){
                        // master ==> CarDetail (상세보기)로 이동.
                        history.push(`/car/${item.car_id}`)
                      }
                    }}>
                      <td>{item.car_id}</td>
                      <td>{item.car_div}</td>
                      <td>{item.car_type}</td>
                      <td>{item.car_birth}</td>
                      <td>{item.car_day}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}
