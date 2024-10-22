import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { DashboardLayout } from "./../../Components/Layout/DashboardLayout";
import StatsCard from "../../Components/StatsCard";
import "./style.css";
import { appTitle } from "../../utils/commonUtils";
import { getEntity } from "../../services/commonServices";

// Register Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export const Dashboard = () => {
  const [stats, setStats] = useState([]);
  const [data, setData] = useState({});

  const getDashboardData = async () => {
    try {
      const response = await getEntity("/dashboard")
      console.log(response.data);
      
      setData(response.data)
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  useEffect(() => {
    document.title = `${appTitle} | Dashboard`;
  }, []);

  const mockStats = [
    { value: data?.total_users, text: "Total Users" },
    { value: data?.total_themes, text: "Total Themes" },
    { value: data?.total_categories, text: "Total Categories" },
    { value: data?.total_tags, text: "Total Tags" },
    { value: data?.total_requests, text: "Total Request" },
  ];

  return (
    <DashboardLayout>
      <div className="container-fluid">
        {/* Stats Cards */}
        <div className="row mb-3">
          <div className="col-12">
            <div className="dashCard">
              <div className="row">
                <h1 className="mainTitle">Dashboard</h1>
                {mockStats.map((stat, index) => (
                  <StatsCard data={stat} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};
