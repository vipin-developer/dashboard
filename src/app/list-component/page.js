import { Badge } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "./page.module.css";
import ServerDetails from "../modal-component/page";
const ListComponent = ({ listData }) => {
  return (
    <ListGroup>
      {listData?.map((list) => {
        return (
          <ListGroup.Item className={styles.listItem} key={list.name}>
            <h6 className={styles.serverName}>{list.name},&nbsp;Region: {list.region}</h6>
           
            <ServerDetails server={list} />
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
