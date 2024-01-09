import styles from "./page.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardComponent from "../card-component/page";

const Dashboard = () => {
  return (
    <Container>
      <Row>
        <Col>
          <CardComponent>
            <p>Cards</p>
          </CardComponent>
        </Col>
        <Col>
        <CardComponent>
            <p>Cards</p>
          </CardComponent>
        </Col>
      </Row>
      <Row>
        <Col>
        <CardComponent>
            <p>Cards</p>
          </CardComponent>
        </Col>
        <Col>
          <CardComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
