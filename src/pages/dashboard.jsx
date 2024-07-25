import React, { useState } from "react";
import {
  GlobeAltIcon,
  CalendarIcon,
  ChartPieIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement
);

const Dashboard = () => {
  
  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Monthly Sales",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const barChartData = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-purple-500 text-white rounded-lg shadow-md flex items-center">
            <GlobeAltIcon className="h-8 w-8 mr-4" />
            <div>
              <h3 className="text-lg font-medium">Global Metrics</h3>
              <p className="mt-2">Content for card 1</p>
            </div>
          </div>
          <div className="p-4 bg-green-500 text-white rounded-lg shadow-md flex items-center">
            <CalendarIcon className="h-8 w-8 mr-4" />
            <div>
              <h3 className="text-lg font-medium">Event Calendar</h3>
              <p className="mt-2">Content for card 2</p>
            </div>
          </div>
          <div className="p-4 bg-pink-500 text-white rounded-lg shadow-md flex items-center">
            <ChartPieIcon className="h-8 w-8 mr-4" />
            <div>
              <h3 className="text-lg font-medium">Performance</h3>
              <p className="mt-2">Content for card 3</p>
            </div>
          </div>
          <div className="p-4 bg-blue-500 text-white rounded-lg shadow-md flex items-center">
            <DocumentTextIcon className="h-8 w-8 mr-4" />
            <div>
              <h3 className="text-lg font-medium">Reports</h3>
              <p className="mt-2">Content for card 4</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
            <Line data={lineChartData} options={{ responsive: true }} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Votes Distribution</h3>
            <Bar data={barChartData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
