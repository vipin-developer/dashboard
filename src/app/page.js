
"use client"
import styles from './page.module.css'
import Dashboard from './dashboard/page';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './header/page';
import { useEffect } from 'react';
import { loadAllNotification } from './helper/helper';

export default function Home() {
  
  useEffect(()=>{
    loadAllNotification()
  },[])   
  return (
    <main className={styles.main}>
          
      <Container>
      <Row>
        <Col><Header/></Col>
      </Row>
      <Row>
        <Col><Dashboard/></Col>
      </Row>
      
    </Container>
   
    </main>
  )
}
