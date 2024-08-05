/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect, useState } from "react";

import { Bar } from "react-chartjs-2";

import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useSelector } from "react-redux";

const RiskBarChart = () => {
  const analyticsData = useSelector(
    (state) => state.analyticsData.analyticsData
  );

  const dateRange = useSelector((state) => state.dateRange);

  const [riskChartData, setRiskChartData] = useState({
    labels: [
      "Risk Level 1",
      "Risk Level 2",
      "Risk Level 3",
      "Risk Level 4",
      // "Risk Level 5",
    ],
    datasets: [
      {
        label: "Risk Count ",
        data:  [4, 20, 52, 39],
        minBarLength: 5,
        backgroundColor: [
          "#3d9737A0",
          "#ffc407A0",
          "#ff7505A0",
          "#f52505A0",
          "#b20303A0",
          // "#3d973730",
          // "#ffc40730",
          // "#ff750530",
          // "#f5250530",
          // "#b2030330",
        ],
        borderColor: ["#3d9737", "#ffc407", "#ff7505", "#f52505", "#b20303"],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (analyticsData.length === 0) return;

    // Count occurrences of each risk level
    function calculateRiskLevel() {
      const riskCounts = analyticsData.reduce((acc, entry) => {
        const day = entry.date_time.split(" ")[0]; // Extracting the date in 'YYYY-MM-DD' format

        // console.log("day ", dateRange);
        // console.log("daterange ", dateRange);

        if (day >= dateRange?.from && day <= dateRange?.to) {
          const risk = entry.risk;
          // console.log("Acc ", risk, acc[risk]);
          if (risk === undefined || risk === null || risk === 0) return acc;
          acc[risk] = (acc[risk] || 0) + 1;
          return acc;
        }
        return acc;
      }, {});

      // console.log("riskCounts", riskCounts);

      // if (riskCounts)
      for (let i = 1; i <= 4; i++) {
        if (!(i in riskCounts)) {
          riskCounts[i] = 0;
        }
      }

      // Extract risk levels and counts
      const labels = Object.keys(riskCounts).map(
        (risk) => "Risk Level " + risk.toString()
      );
      const counts = Object.values(riskCounts);

      return { labels, counts };
    }

    const { labels, counts } = calculateRiskLevel();

    setRiskChartData({
      labels,
      datasets: [
        {
          label: "Risk Counts",
          data: counts,
          minBarLength: 5,
          backgroundColor: [
            "#3d9737A0",
            "#ffc407A0",
            "#ff7505A0",
            "#f52505A0",
            "#b20303A0",
            // "#3d973730",
            // "#ffc40730",
            // "#ff750530",
            // "#f5250530",
            // "#b2030330",
          ],
          borderColor: ["#3d9737", "#ffc407", "#ff7505", "#f52505", "#b20303"],
          borderWidth: 1,
        },
      ],
    });
    console.log("Risk Chart Data", labels, counts);
    localStorage.setItem("risk_labels", labels);
    localStorage.setItem("risk_counts", counts);
  }, [analyticsData, dateRange]);

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      // Change options for ALL labels of THIS CHART
      datalabels: {
        color: "#fff",
      },
      legend:{
        display: false
      }
    },
    
    // scales: {
    //   yAxes: [
    //     {
    //       display: false,
    //       ticks: {
    //         beginAtZero: true,
    //         min: 0,
    //         suggestedMin: 0,
    //       },
    //     },
    //   ],
    //   xAxes: [
    //     {
    //       display: false,
    //       ticks: {
    //         beginAtZero: true,
    //         min: 0,
    //         suggestedMin: 0,
    //       },
    //     },
    //   ],
    // },
  };

  
  Chart.register(...registerables);
  return (
    <div className="col-span-12 rounded-xl  bg-black p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <Card className="bg-black text-black border-none">
        <CardHeader>
          <CardTitle className="text-white">
            Overall Risk Counts for all time
          </CardTitle>
          <CardDescription>
            This graph shows the counts for the 5 levels of risks that
            EthiCheck.AI categorizes the violations into
          </CardDescription>
        </CardHeader>
        <CardContent className="h-72 ">
          <Bar
            data={riskChartData}
            options={lineOptions}
            plugins={[ChartDataLabels]}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskBarChart;
