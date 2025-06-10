import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";

// function to generate random Activity data
const generateActivityData = (startDate, endDate) => {
  const data = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);
  while (currentDate <= end) {
    const count = Math.floor(Math.random() * 50);
    data.push({
      date: currentDate.toISOString().split("t")[0],
      count: count,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return data;
};

const getPanelColors = (maxCount) => {
  const colors = {};
  for (let i = 0; i <= maxCount; i++) {
    const greenValue = Math.floor((i / maxCount) * 255);
    colors[i] = `rgb(0, ${greenValue}, 0)`;
  }

  return colors;
};

export default function HeatMapProfile() {
  const [activityData, setActivityData] = useState([]);
  const [panelColors, setPanelColors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const startDate = "2001-01-01";
      const endDate = "2001-12-31";
      const data = generateActivityData(startDate, endDate);
      setActivityData(data);

      const maxCount = Math.max(...data.map((d) => d.count));
      setPanelColors(getPanelColors(maxCount));
    };
    fetchData();
  }, []);

  return (
    <div className="p-1">
      <h4 className="mb-2">Recent Contributions</h4>
      <HeatMap
        className="HeatMapProfile"
        style={{ maxWidth: "700px", height: "200px", color: "black" }}
        value={activityData}
        weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        startDate={new Date("2001-01-01")}
        rectSize={15}
        space={3}
        rectProps={{
          rx: 3.5,
        }}
        panelColors={panelColors}
      />
    </div>
  );
}
