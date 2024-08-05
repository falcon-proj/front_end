/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect } from "react";

import { Bar, Line, Pie } from "react-chartjs-2";
import { Data } from "@/utils/Data";
import { useState } from "react";
import { Chart, registerables } from "chart.js";
import PercentViolationChart from "../charts/PercentViolationChart";
import RiskBarChart from "../charts/RiskBarChart";

export default function SixHourAnalysis({ analyticsData }) {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        fill: true,
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "#E11D47",
          //   "#1DE189",
          //   "#1D89E1",
          //   "#1D47E1",
          //   "#1D1DE1",
          "#B10F37",
          "#F4436D",
          "#940C2C",
          "#FF638A",
          "#7A0A22",
          "#FF829E",
          "#5E0818",
          "#FF9FB1",
        ],
        borderColor: "#E11D47",
        borderWidth: 1,
      },
    ],
  });



  // cumulative violation in time interval

  const [cumulativeViolation, setCumulativeViolation] = useState({
    labels: ["0", "1", "2", "3", "4", "5"],
    datasets: [
      {

        label: "Risk Counts ",
        data: [5, 10, 3, 9, 4, 6],
        backgroundColor: ["#E11D47"],
        borderColor: "#E11D47",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (analyticsData.length === 0) return;

    // Count occurrences of each risk level
   
  }, [analyticsData]);

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  Chart.register(...registerables);
  return (
    <main className="overflow-y-scroll">
      <div className="mx-auto max-w-screen-3xl p-4 md:p-6 2xl:p-4">
        {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="bg-black ">
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent className="h-10vh">
                <p>Card Content</p>
              </CardContent>
            </Card>
          ))}
        </div> */}

        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-0 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <div className="col-span-12 rounded-xl  bg-black  shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
            <Card className="bg-black text-black border-none">
              <CardHeader>
                <CardTitle className="text-white">This 6hrs</CardTitle>
                <CardDescription>
                  This is 6 hrs analytics line
                  <br />
                  This is test
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72 ">
                <Line data={chartData} options={lineOptions} />
              </CardContent>
            </Card>
          </div>

          <RiskBarChart analyticsData={analyticsData} />
          <PercentViolationChart analyticsData={analyticsData} />

          <div className="col-span-12 rounded-xl bg-black  shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
            <Card className="bg-black text-black border-none">
              <CardHeader>
                <CardTitle className="text-white">This 6hrs</CardTitle>
                <CardDescription>This is 6 hrs analytics line</CardDescription>
              </CardHeader>
              <CardContent className="h-72 ">
                <Bar data={chartData} options={lineOptions} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
