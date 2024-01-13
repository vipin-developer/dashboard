"use client";
import styles from "./page.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardComponent from "../card-component/page";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";
import { getFormatedData } from "../helper/helper";
import ListComponent from "../list-component/page";
import { Dropdown, DropdownButton } from "react-bootstrap";

const serverArray = [
  { name: "Server-A", status: "Online", region: "Australia" },
  { name: "Server-B", status: "Offline", region: "India" },
  { name: "Server-C", status: "Online", region: "India" },
  { name: "Server-D", status: "Online", region: "Australia" },
  { name: "Server-E", status: "Offline", region: "USA" },
  { name: "Server-F", status: "Online", region: "USA" },
];

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
  const [serverList, setServerList] = useState(serverArray);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchAndFilter = (value, serachKey) => {
    const term = value;
    setSearchTerm(term);
    // Filtering the data based on the search term
    const results = serverArray.filter(
      (item) =>
        item[serachKey].toLowerCase().includes(term.toLowerCase()) ||
        item["region"].toLowerCase().includes(term.toLowerCase())
    );
    if (results.length) {
      setServerList(results);
    } else {
      setServerList(serverArray);
    }
  };

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
  }, [searchTerm]);

  return (
    <Container className={styles.dashboardDiv}>
      <Row>
        <Col className={styles.searchCol}>
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => handleSearchAndFilter(e.target.value, "name")}
            className={styles.searchInput}
          />
          <DropdownButton className={styles.dropDown} title="Filter">
            <Dropdown.Item
              onClick={() => handleSearchAndFilter("Online", "status")}
            >
              Online
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleSearchAndFilter("Offline", "status")}
            >
              Offline
            </Dropdown.Item>
          </DropdownButton>
          {/* <h5 className={styles.searchTerm}>{searchTerm}</h5> */}
          {(searchTerm !== "" && searchTerm === "Online") ||
            (searchTerm === "Offline" && (
              <p
                className={styles.clear}
                onClick={() => {
                  setServerList(serverArray);
                  setSearchTerm("");
                }}
              >
                Clear
              </p>
            ))}
        </Col>
      </Row>

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
            <Bar
              options={{
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    stacked: true,
                  },
                },
              }}
              data={resouceStatus}
            />
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
