/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect, useState } from "react";

import ChartDataLabels from "chartjs-plugin-datalabels";

import { Pie } from "react-chartjs-2";

import { Chart, registerables } from "chart.js";
import { useSelector } from "react-redux";

const PercentViolationChart = () => {
  const analyticsData = useSelector(
    (state) => state.analyticsData.analyticsData
  );
  const [numberViolations, setNumberViolations] = useState(null);

  // Percentage of violations in pie chart
  const [percentageChartData, setPercentageChartData] = useState({
    labels: ["Violations", "No Violations"],
    datasets: [
      {
        data: [58.38,41.62],
        backgroundColor: ["#b2030380", "#3d973780"],
        borderColor: ["#b20303", "#3d9737"],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (analyticsData.length === 0) return;

    function computePieChartData() {
      const totalMessages = analyticsData.length;
      const messagesWithViolations = analyticsData.filter(
        (entry) => Object.keys(entry["High level violations"]).length > 0
      );
      let violationsPercentage =
        (messagesWithViolations.length / totalMessages) * 100;
      violationsPercentage = Number(violationsPercentage.toFixed(2));
      const noViolationsPercentage = 100 - violationsPercentage;
      setNumberViolations(violationsPercentage);
      return { violationsPercentage, noViolationsPercentage };
    }

    const { violationsPercentage, noViolationsPercentage } =
      computePieChartData();

    setPercentageChartData({
      labels: ["Violations", "No Violations"],
      datasets: [
        {
          data: [violationsPercentage, noViolationsPercentage],
          backgroundColor: ["#b2030380", "#3d973780"],
          borderColor: ["#b20303", "#3d9737"],
          borderWidth: 1,
        },
      ],
    });
    localStorage.setItem("pie_percent_data", [
      violationsPercentage,
      noViolationsPercentage,
    ]);
  }, [analyticsData]);

  Chart.register(...registerables);

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "Percentage of Messages with Violations",
    },
    plugins: {
      // Change options for ALL labels of THIS CHART
      datalabels: {
        color: "#fff",
      },
    },
  };

  return (
    <div className="col-span-12 rounded-xl bg-black  shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
      <Card className="bg-black text-black border-none">
        <CardHeader>
          <CardTitle className="text-white">
            Overall Percentage of Messages with Violations for all time -
            <span className="text-primary ml-2 text-xl">
              {numberViolations===null?"58.38": numberViolations.toFixed(2)}%
            </span>
          </CardTitle>
          <CardDescription>
            This graph shows the percentage of violations out of total number of
            queries made by all users
          </CardDescription>
        </CardHeader>
        <CardContent className="h-72 ">
          <Pie
            data={percentageChartData}
            options={pieOptions}
            plugins={[ChartDataLabels]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PercentViolationChart;
