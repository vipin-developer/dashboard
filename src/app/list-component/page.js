"use client"
// External dependencies
import React from "react";

// Bootstrap Components
import { Badge } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

// Styles
import styles from "./page.module.css";

// Custom Components
import ServerDetails from "../modal-component/page";

const ListComponent = ({ listData }) => {
  return (
    // The main ListGroup container
    <ListGroup>
      {/* Map through each server item in the listData array */}
      {listData?.map((list) => {
        return (
          // Each ListGroup.Item represents a server item in the list
          <ListGroup.Item className={styles.listItem} key={list.name}>
            {/* Display server name and region */}
            <h6 className={styles.serverName}>
              {list.name},&nbsp;Region: {list.region}
            </h6>
            
            {/* Display ServerDetails modal */}
            <ServerDetails server={list} />
            
            {/* Display status badge based on the server's status */}
            {list.status === "Online" ? (
              <Badge className={styles.statusBadge} pill bg="success">
                Online
              </Badge>
            ) : (
              <Badge className={styles.statusBadge} pill bg="danger">
                Offline
              </Badge>
            )}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default ListComponent;
