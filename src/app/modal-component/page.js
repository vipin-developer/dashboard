"use client"
// External dependencies
import React, { useEffect, useState } from "react";

// Bootstrap Components
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col, Container, Row } from "react-bootstrap";

// Custom Components
import CardComponent from "../card-component/page";

// Charting Library
import { Line, Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

// Helper Function
import { getFormatedData } from "../helper/helper";

// Styles
import styles from "./page.module.css";

function ServerDetails({ server }) {
  // State for managing fullscreen mode and modal visibility
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  // State for resource usage data
  const [resouceUsageCPU, setResouceUsageCPU] = useState({
    datasets: [],
  });
  const [resouceUsageMemory, setResouceMemory] = useState({
    datasets: [],
  });

  useEffect(() => {
    // Call the helper function to get the formatted data
    const formattedDataCPU = getFormatedData(
      [{ name: server?.name }],
      "resourceUsage",
      "CPU",
      "usage"
    );
    setResouceUsageCPU(formattedDataCPU);

    const formattedDataMemory = getFormatedData(
      [{ name: server.name }],
      "resourceUsage",
      "Memory",
      "usage"
    );
    setResouceMemory(formattedDataMemory);
  }, []);

  /**
   * Handler function showing the modal with the specified fullscreen mode.
   */
  const handleShow = (breakpoint) => {
    setFullscreen(breakpoint);
    setShow(true);
  };

  return (
    <>
      {/* Button to open the server details modal */}
      <Button className={styles.viewButton} onClick={() => handleShow(true)}>
        view
      </Button>
      
      {/* The modal component */}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {/* Display server name and region */}
            {server?.name},&nbsp;Region: {server?.region}
            
            {/* Display online/offline indicator */}
            <div
              className={
                server?.status === "Online"
                  ? styles.onlineIndicator
                  : styles.offlineIndicator
              }
            >
              <span
                className={server?.status === "Online" ? styles.blink : ""}
              ></span>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Container for displaying resource usage cards */}
          <Container>
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
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ServerDetails;
