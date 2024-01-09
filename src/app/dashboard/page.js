import styles from "./page.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardComponent from "../card-component/page";
import jsonData from "../../mock-data/mockData.json";
import { useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

const Dashboard = () => {
 
  return (
    <Container>
      <Row>
        <Col>
          <CardComponent>
            <Line data={data} />
          </CardComponent>
        </Col>
        <Col>
          <CardComponent>
            <Line data={data} />
          </CardComponent>
        </Col>
      </Row>
      <Row>
        <Col>
          <CardComponent>
            <Line data={data} />
          </CardComponent>
        </Col>
        <Col>
          <CardComponent>
            <Line data={data} />
          </CardComponent>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
