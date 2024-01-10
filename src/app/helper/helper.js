// helper.js
import jsonData from "../../mock-data/mockData.json";
const formattedTime = (time) => {
  return new Date(time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};
export const getFormatedData = (chartType, usage, dataType) => {
  let formattedData = {
    labels: ["8:00AM", "9:00AM", "10:00AM", "11:00AM", "12:00PM"],
    datasets: [],
  };

  Object.keys(jsonData).forEach((serverName) => {
    const chartData = jsonData[serverName][chartType]
      .filter((item) => item.resource === usage)
      .map((value) => value[dataType]);
    formattedData.datasets.push({
      label: serverName,
      data: [...chartData],
    });
  });
  return formattedData;
};
