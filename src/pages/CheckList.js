import React from 'react'
import {Container, Row, Col, Table} from 'react-bootstrap';

export default function CheckList({history, match}) {
  
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
            <th>내용</th>
          </thead>
          <tbody>
            <td>-</td>
          </tbody>
        </Table>
      </Row>
    </Container>
  )
}
