"use client";
import React, { useEffect, useState } from "react";
import Stats  from "./components/Stats";
import CategorySales from "./components/charts/CategorySales";
import DailyRevenue from "./components/charts/DailyRevenue";
import MonthlySales from "./components/charts/MonthlySales";
import RecentOrders from "./components/charts/RecentOrders";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState(undefined);
  const [dailyRevenueData, setDailyRevenueData] = useState([]);
  const [categorySalesData, setCategorySalesData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/dashboard/api"
        );

        if (response?.data?.stats) {
          setStats(response.data?.stats);
          setDailyRevenueData(response.data?.revenueData);
          setCategorySalesData(response?.data?.top5Categories);
          setRecentOrders(response.data?.recentOrders);
          setMonthlySales(response.data?.yearlySalesData);
        }
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    // getDashboardData();
  }, []);

  return (
    <>
      {isLoaded && (
        <div className="m-10">
          <div className="flex justify-between gap-5">
            <Stats title="Total category" data={stats?.category ?? 0} />
            <Stats title="Total products" data={stats?.products ?? 0} />
            <Stats title="Total users" data={stats?.users ?? 0} />
            <Stats title="Total orders" data={stats?.orders ?? 0} />
            <Stats title="Total revenue" data={stats?.revenue ?? 0} />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-10">
            <div className="h-full min-h-[50vh]">
              <div className="h-full px-5">
                <div className="text-lg m-2 font-semibold">
                  Daily Revenue
                </div>
                <DailyRevenue data={dailyRevenueData} />
              </div>
            </div>
            <div className="h-full">
              <div className="h-full px-5">
                <div className="text-lg m-2 font-semibold">
                  Monthly Sales
                </div>
                <MonthlySales data={monthlySales} />
              </div>
            </div>
            <div className="h-full">
              <div className="h-full px-5">
                <div className="text-lg m-2 font-semibold">
                  Sale by Category
                </div>
                <CategorySales data={categorySalesData} />
              </div>
            </div>
            <RecentOrders data={recentOrders} />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
