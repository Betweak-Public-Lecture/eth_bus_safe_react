import React from 'react'
import {Container, Row, Col, Table} from 'react-bootstrap';

export default function CheckList({history, match}) {
  const carId = match.params.carId;
  const [checkList, setCheckList] = React.useState([]);
  
  React.useEffect(()=>{
    fetch(`/api/checklist/${carId}`, {
      method: 'GET'
    }).then(resp=>{
      return resp.json()
    }).then(data=>{
      if (data.status === 'Success'){
        setCheckList(data.result);
      }
    })
  }, [])
  
  return (
    <Container style={{paddingTop: 60}}>
      <Row>
        <Col>
          <h1>체크리스트 목록</h1>
        </Col>
      </Row>

      <Row>
        <Table>
          <thead>
            <tr>
              <th>Sender</th>
              <th>차량번호</th>
              <th>결과</th>
              <th>timestamp</th>
            </tr>
          </thead>
          <tbody>
            {checkList.map(item=>{
              return (
                <tr>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>{item[4]}</td>
                </tr>
              )
            })}
            
          </tbody>
        </Table>
      </Row>
    </Container>
  )
}
