// helper.js
import jsonData from "../../mock-data/mockData.json";

export const getFormatedData = (servers,chartType, usage, dataType) => {
  let formattedData = {
    labels: ["8:00AM", "9:00AM", "10:00AM", "11:00AM", "12:00PM"],
    datasets: [],
  };
  servers.forEach((server) => {
    const chartData = jsonData[server.name][chartType]
      .filter((item) => item.resource === usage)
      .map((value) => value[dataType]);
    formattedData.datasets.push({
      label: server.name,
      data: [...chartData],
    });
  });
  return formattedData;
};

