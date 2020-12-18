import React from 'react'
import {Container, Row, Col, Table, Form, Button} from 'react-bootstrap';

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

  // 추가사항
  const [checkList, setCheckList] = React.useState([
    {
      title: "승객이 이용하는 시설은 깨끗합니까?",
      answer: -1
    },
    {
      title: "승객이 이용하는 좌석의 안전벨트는 이상 없습니까?",
      answer: -1
    },
    {
      title: "타이어의 공기압은 32 ~ 34 사이 입니까?",
      answer: -1
    },
    {
      title: "소화기는 구비되어 있습니까?",
      answer: -1
    },
    {
      title: "기름은 80%이상 저장되어 있습니까?",
      answer: -1
    }
  ]);

  const submitForm = (checkList, checkEtc)=>{
    let body = {};
    for (let i=0; i<checkList.length; i++){
      body[`check${i+1}`] = checkList[i].answer;

      if (checkList[i].answer === -1){
        alert("모든 form이 입력되어야 합니다.")
        return
      }

    }
    if (checkEtc === ''){
      checkEtc = 'null'
    }
    body['check_etc'] = checkEtc;

    // 요청보내기
    fetch(`/api/checklist/${carId}`,{
      method: "POST",
      headers: {
        'CONTENT-TYPE': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(resp=>{
      return resp.json();
    }).then(data=>{
      if(data.status === 'Success'){
        alert(data.result);
        history.push('/carlist');
      } else{
        alert("네트워크 Error 발생");
      }
    })
  }

  
  const [checkEtc, setCheckEtc] = React.useState("")

  // Fetch To ("/api/checklist/:carId")

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
      {/* 추가사항 */}
      <Row>
        <Col>

          <Table striped bordered hover>
            <tbody>
              {checkList.map((check, idx)=>{
                return (
                  <tr>
                    <td>
                      Check {idx+1}
                    </td>
                    <td>{check.title}</td>
                    <td style={{textAlign:'center'}}>
                      <Form.Group>
                        <Form.Check inline type='radio' name={`check-${idx}`} id={`check-${idx}-yes`} label="YES" onChange={()=>{
                            const newCheckList = checkList.map((item, _idx)=>{
                              if(idx===_idx){
                                return {
                                  ...item,
                                  answer: 1
                                }
                              } 
                              return item;
                            });
                            
                            setCheckList(newCheckList)
                          }} />
                        <Form.Check inline type='radio' name={`check-${idx}`} id={`check-${idx}-no`} label="NO" onChange={()=>{
                          const newCheckList = checkList.map((item, _idx)=>{
                            if(idx===_idx){
                              return {
                                ...item,
                                answer: 0
                              }
                            } 
                            return item;
                          })
                          setCheckList(newCheckList)
                        }} />
                      </Form.Group>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>

          <Form.Group>
            {/* checkEtc onChange Handler 등록 */}
            <Form.Control as="textarea" rows={7} placeholder="기타사항"  onChange={e=>{
              setCheckEtc(e.target.value);
            }} value={checkEtc} />
          </Form.Group>

          {/* Server로 전송.(data POST 요청)하는 onClick Handler 등록 */}
          <Button size={"lg"} onClick={()=>{
            submitForm(checkList, checkEtc)
          }} style={{float:'right'}} >제출</Button>

        </Col>
      </Row>
    </Container>
  )
}
