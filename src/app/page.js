"use client"
// External dependencies
import React, { useEffect } from 'react';

// Styles
import styles from './page.module.css';

// Custom Components
import Dashboard from './dashboard/page';
import Header from './header/page';

// Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Helper function
import { loadAllNotification } from './helper/helper';

/**
 * Home is a React component representing the main content of the application.
 */
export default function Home() {
  
  // Use effect to load all notifications when the component mounts
  useEffect(() => {
    loadAllNotification();
  }, []);

  return (
    // The main container with the 'main' class from the CSS module
    <main className={styles.main}>
      {/* Container for layout */}
      <Container>
        {/* Row for the header */}
        <Row>
          <Col>
            {/* Header component */}
            <Header />
          </Col>
        </Row>
        {/* Row for the dashboard */}
        <Row>
          <Col>
            {/* Dashboard component */}
            <Dashboard />
          </Col>
        </Row>
      </Container>
   
    </main>
  );
}
