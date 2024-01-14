// External dependencies
import React, { useEffect, useState } from "react";

// Styles
import styles from "./page.module.css";

// Bootstrap Components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Dropdown, DropdownButton } from "react-bootstrap";

// Custom Components
import CardComponent from "../card-component/page";
import ListComponent from "../list-component/page";

// Charting Library
import { Line, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

// Helper Functions
import { getFormatedData } from "../helper/helper";

// Sample Server Data
const serverArray = [
  { name: "Server-A", status: "Online", region: "Australia" },
  { name: "Server-B", status: "Offline", region: "India" },
  { name: "Server-C", status: "Online", region: "India" },
  { name: "Server-D", status: "Online", region: "Australia" },
  { name: "Server-E", status: "Offline", region: "USA" },
  { name: "Server-F", status: "Online", region: "USA" },
];

/**
 * Dashboard is a React component representing a dashboard with various components and functionalities.
 */
const Dashboard = () => {
  // State for resource usage data
  const [resouceUsageCPU, setResouceUsageCPU] = useState({
    datasets: [],
  });
  const [resouceUsageMemory, setResouceMemory] = useState({
    datasets: [],
  });
  const [resouceStatus, setResouceStatus] = useState({
    datasets: [],
  });

  // State for server list and search term
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
    // The main container for the dashboard, styled using the 'dashboardDiv' class from the CSS module.
    <Container className={styles.dashboardDiv}>
      <Row>
        {/* The search and filter column */}
        <Col className={styles.searchCol}>
          {/* Input for searching by name */}
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => handleSearchAndFilter(e.target.value, "name")}
            className={styles.searchInput}
          />
          
          {/* Dropdown for filtering by status */}
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
          
          {/* Clear button for clearing the search term */}
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
        {/* Card displaying CPU Usage */}
        <Col>
          <CardComponent title="CPU Usage">
            <Line data={resouceUsageCPU} />
          </CardComponent>
        </Col>
        {/* Card displaying Memory Usage */}
        <Col>
          <CardComponent title="Memory Usage">
            <Bar data={resouceUsageMemory} />
          </CardComponent>
        </Col>
      </Row>
      <Row>
        {/* Card displaying Resource Status */}
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
        {/* Card displaying Servers List */}
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
