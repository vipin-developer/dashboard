"use client"
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getFormatedData } from "../helper/helper";
import styles from "./page.module.css";
import { Col, Container, Row } from "react-bootstrap";
import CardComponent from "../card-component/page";
import { Bar, Line } from "react-chartjs-2";

function ServerDetails({ server }) {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
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

  const handleShow = (breakpoint) => {
    setFullscreen(breakpoint);
    setShow(true);
  };

  return (
    <>
      <Button className={styles.viewButton} onClick={() => handleShow(true)}>
        view
      </Button>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {server?.name},&nbsp;Region: {server.region}
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
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ServerDetails;
