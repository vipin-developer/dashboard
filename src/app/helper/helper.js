// Import the mock data containing server information and notifications
import jsonData from "../../mock-data/mockData.json";

export const getFormatedData = (servers, chartType, usage, dataType) => {
  // Initialize the formatted data object with default labels
  let formattedData = {
    labels: ["8:00AM", "9:00AM", "10:00AM", "11:00AM", "12:00PM"],
    datasets: [],
  };

  // Iterate through each server and extract relevant data for the chart
  servers.forEach((server) => {
    const chartData = jsonData[server.name][chartType]
      .filter((item) => item.resource === usage)
      .map((value) => value[dataType]);

    // Add a dataset for each server to the formattedData object
    formattedData.datasets.push({
      label: server.name,
      data: [...chartData],
    });
  });

  return formattedData;
};

/**
 * loadAllNotification is a helper function that loads all notification data from the mock data.
 */
export const loadAllNotification = () => {
  let notificationObj = [];

  // Iterate through each server in the mock data and collect notification data
  Object.keys(jsonData).map((server) => {
    notificationObj.push(...jsonData[server].alertNotifications);
  });
  // notificationObj.forEach(handleNotification);
};

/**
 * handleNotification is a helper function that displays a notification based on the provided notification object.
 */
const handleNotification = (notificationObj) => {
  // Notification options
  const options = {
    title: notificationObj.server,
    body: notificationObj.message,
    silent: false,
  };

  // Display the notification after the specified delay
  setTimeout(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(options.title, options);
        }
      });
    } else {
      console.error("This browser does not support notifications.");
    }
  }, notificationObj.delay);
};
