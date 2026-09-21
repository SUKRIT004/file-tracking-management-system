import { useEffect, useState } from "react";
import {
  FolderOpen,
  Archive,
  FileCheck,
  Building2,
} from "lucide-react";

import api from "../services/api";

import StatsCard from "../components/dashboard/StatsCard";
import DepartmentChart from "../components/dashboard/DepartmentChart";
import RecentTransfers from "../components/dashboard/RecentTransfers";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_files: 0,
    active_files: 0,
    archived_files: 0,
    department_stats: [],
  });

  useEffect(() => {
    api
      .get("/dashboard/")
      .then((res) => {
        setStats(res.data);
      })
      .catch(console.error);
  }, []);

  const cards = [
    {
      title: "Total Files",
      value: stats.total_files,
      icon: FolderOpen,
      color: "bg-blue-500",
    },
    {
      title: "Active Files",
      value: stats.active_files,
      icon: FileCheck,
      color: "bg-green-500",
    },
    {
      title: "Archived Files",
      value: stats.archived_files,
      icon: Archive,
      color: "bg-gray-500",
    },
    {
      title: "Departments",
      value: stats.department_stats.length,
      icon: Building2,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="text-muted-foreground mt-2">
          Welcome back 👋
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => (

          <StatsCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
          />

        ))}

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2 bg-white rounded-xl shadow p-6">

          <h2 className="text-2xl font-semibold mb-6">
            Department Statistics
          </h2>

          <DepartmentChart
            data={stats.department_stats}
          />

        </div>

        <RecentTransfers />

      </div>

    </div>
  );
}