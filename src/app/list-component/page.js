import { Badge } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "./page.module.css";
const ListComponent = ({ listData }) => {
  return (
    <ListGroup>
      {listData.map((list) => {
        return (
          <ListGroup.Item className={styles.listItem} key={list.name}>
            {list.name}
            {list.status === "Online" ? (
              <Badge pill bg="success">
                Online
              </Badge>
            ) : (
              <Badge pill bg="danger">
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
