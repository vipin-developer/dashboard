// helper.js
import jsonData from "../../mock-data/mockData.json";

// const data = {
//     labels:[1,2,3,4,5,6,7],
//     datasets: [
//       {
//         label: "My First dataset",
//         backgroundColor: "rgb(255, 99, 132)",
//         borderColor: "rgb(255, 99, 132)",
//         data: [0, 10, 5, 2, 20, 30, 45],
//       },
//       {
//         label: "My second",
//         backgroundColor: "rgb(255, 99, 132)",
//         borderColor: "rgb(255, 99, 132)",
//         data: [0, 10, 5, 2, 20, 30, 90],
//       },
//     ],
//   };
const formattedTime = (time) => {
  return new Date(time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};
export const getFormatedData = (chartType, usage,dataType) => {
  let formattedData = {
    labels: ["8:00AM","9:00AM","10:00AM","11:00AM","12:00PM"],
    datasets: [],
  };
  // formattedData=data
  Object.keys(jsonData).forEach((serverName) => {
    const chartData = jsonData[serverName][chartType]
      .filter((item) => item.resource === usage)
      .map((value) => value[dataType]);
    const timeStamp = jsonData[serverName][chartType]
      .filter((item) => item.resource === usage)
      .map((value) => formattedTime(value.timestamp));
    // formattedData.labels.push(...timeStamp);
    formattedData.datasets.push({
      label: serverName,
      data: [...chartData],
    });
  });
  return formattedData;
};
