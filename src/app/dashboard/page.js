import styles from "./page.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardComponent from "../card-component/page";
import jsonData from "../../mock-data/mockData.json";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Line,Bar } from "react-chartjs-2";
import { getFormatedData } from "../helper/helper";


const data = {
    labels:[1,2,3],
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
    const [resouceUsageCPU,setResouceUsageCPU]=useState({
        datasets:[]
    })
    const [resouceUsageMemory,setResouceMemory]=useState({
        datasets:[]
    })
    
  useEffect(() => {
    // Call the helper function to get the formatted data
    const formattedDataCPU = getFormatedData("resourceUsage","CPU");

    setResouceUsageCPU(formattedDataCPU)
    const formattedDataMemory = getFormatedData("resourceUsage","Memory");
    setResouceMemory(formattedDataMemory)
   
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <CardComponent title="CPU Usage">
            <Line data={resouceUsageCPU} />
          </CardComponent>
        </Col>
        <Col>
          <CardComponent title="Memory Usage">
            <Bar data={resouceUsageMemory} />
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
