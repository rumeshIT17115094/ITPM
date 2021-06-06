import React from "react";
import "./chartData.css";
import { PieChart } from "react-minimal-pie-chart";
const ChartData = () => {
  const defaultLabelStyle = {
    fontSize: "5px",
    fontFamily: "sans-serif",
  };
  const dataEntry = [
    {
      title: "Lectures",
      value: 10,
      color: "#E38627",
    },
    {
      title: "Subjects",
      value: 10,
      color: "#C13C37",
    },
    {
      title: "Rooms ",
      value: 15,
      color: "#6A2135",
    },
    {
      title: "Students",
      value: 700,
      color: "#ff3399",
    },
  ];
  return (
    <div className="container">
      <h3 className="text-center">Statistics</h3>
      <div className="statists">
        <div className="box">
          <p>10</p>
          <p>Total Number of lectures </p>
        </div>
        <div className="box">
          <p>10</p>
          <p>Total Number of Subjects </p>
        </div>
        <div className="box">
          <p>15</p>
          <p>Total Number of Rooms </p>
        </div>
        <div className="box">
          <p>700</p>
          <p>Total Number of Students </p>
        </div>
      </div>
      <div className="StatisticContainer__chart">
        <PieChart
          data={dataEntry}
          radius={PieChart.defaultProps.radius - 7}
          label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
          segmentsShift={(index) => (index === 0 ? 7 : 0.5)}
          paddingAngle={2}
          radius={30}
          labelStyle={{
            ...defaultLabelStyle,
          }}
        />
      </div>
    </div>
  );
};

export default ChartData;
