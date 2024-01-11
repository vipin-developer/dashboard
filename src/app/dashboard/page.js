import styles from "./page.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardComponent from "../card-component/page";
import jsonData from "../../mock-data/mockData.json";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";
import { getFormatedData } from "../helper/helper";
import ListComponent from "../list-component/page";

const data = {
  labels: [1, 2, 3],
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
  const [resouceUsageCPU, setResouceUsageCPU] = useState({
    datasets: [],
  });
  const [resouceUsageMemory, setResouceMemory] = useState({
    datasets: [],
  });
  const [resouceStatus, setResouceStatus] = useState({
    datasets: [],
  });
  const [serverList, setServerList] = useState([
    { name: "Server-A", status: "Online" },
    { name: "Server-B", status: "Offline" },
    { name: "Server-C", status: "Online" },
    { name: "Server-D", status: "Online" },
    { name: "Server-E", status: "Offline" },
    { name: "Server-F", status: "Online" },
  ]);

  useEffect(() => {
    // Call the helper function to get the formatted data
    const formattedDataCPU = getFormatedData(
      serverList,
      "resourceUsage",
      "CPU",
      "usage"
    );
    setResouceUsageCPU(formattedDataCPU);

    const formattedDataMemory = getFormatedData(
      serverList,
      "resourceUsage",
      "Memory",
      "usage"
    );
    setResouceMemory(formattedDataMemory);

    const formattedDataStatus = getFormatedData(
      serverList,
      "serverStatus",
      "status",
      "status"
    );
    setResouceStatus(formattedDataStatus);
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
          <CardComponent title="Resource Status">
            <Line data={resouceStatus} />
          </CardComponent>
        </Col>
        <Col>
          <CardComponent title="Servers">
            <ListComponent listData={serverList} />
          </CardComponent>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
