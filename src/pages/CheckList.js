import React from 'react'
import {Container, Row, Col} from 'react-bootstrap';

export default function CheckList({history, match}) {
  return (
    <Container>
      <Row>
        <Col>
          <h1>체크리스트 목록</h1>
        </Col>
      </Row>
    </Container>
  )
}
