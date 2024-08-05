/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// import ChartDataLabels from "chartjs-plugin-datalabels";

import { useEffect, useState } from "react";

import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import PercentViolationChart from "../charts/PercentViolationChart";
import RiskBarChart from "../charts/RiskBarChart";
import { useSelector } from "react-redux";

export default function DailyAnalytics({ analyticsData }) {
  const [firstDate, setFirstDate] = useState(localStorage.getItem("firstDate"));
  const [secondDate, setSecondDate] = useState(
    localStorage.getItem("secondDate")
  );

  const dateRange = useSelector((state) => state.dateRange);

  const [compdates, setCompDates] = useState([]);

  const [compGraphLoading, setCompGraphLoading] = useState(true);

  // cumulative violation in time interval

  const [cumulativeViolation, setCumulativeViolation] = useState({
    labels: [
      "2024-04-05",
      "2024-04-06",
      "2024-04-07",
      "2024-04-08",
      "2024-04-09",
      "2024-04-10",
      "2024-04-12",
      "2024-04-13",
      "2024-04-14",
    ],
    datasets: [
      {
        fill: true,
        label: "Risk Level1 Counts",
        data: {
          "2024-04-05": 0,
          "2024-04-06": 0,
          "2024-04-07": 0,
          "2024-04-08": 0,
          "2024-04-09": 0,
          "2024-04-10": 0,
          "2024-04-12": 2,
          "2024-04-13": 2,
          "2024-04-14": 0,
        },
        // backgroundColor: ["#3d9737"],
        backgroundColor: ["#3d973780"],
        borderColor: "#3d9737",
        borderWidth: 2,
      },
      {
        fill: true,
        label: "Risk Level2 Counts",
        data: {
          "2024-04-05": 0,
          "2024-04-06": 0,
          "2024-04-07": 0,
          "2024-04-08": 0,
          "2024-04-09": 0,
          "2024-04-10": 0,
          "2024-04-12": 4,
          "2024-04-13": 16,
          "2024-04-14": 0,
        },
        // backgroundColor: ["#ffc407"],
        backgroundColor: ["#ffc40780"],
        borderColor: "#ffc407",
        borderWidth: 2,
      },
      {
        fill: true,
        label: "Risk Level3 Counts",
        data: {
          "2024-04-05": 1,
          "2024-04-06": 1,
          "2024-04-07": 1,
          "2024-04-08": 0,
          "2024-04-09": 2,
          "2024-04-10": 0,
          "2024-04-12": 13,
          "2024-04-13": 33,
          "2024-04-14": 1,
        },
        // backgroundColor: ["#ff7505"],
        backgroundColor: ["#ff750580"],
        borderColor: "#ff7505",
        borderWidth: 2,
      },
      {
        fill: true,
        label: "Risk Level4 Counts",
        data: {
          "2024-04-05": 2,
          "2024-04-06": 0,
          "2024-04-07": 0,
          "2024-04-08": 1,
          "2024-04-09": 2,
          "2024-04-10": 0,
          "2024-04-12": 2,
          "2024-04-13": 31,
          "2024-04-14": 1,
        },
        // backgroundColor: ["#f52505"],
        backgroundColor: ["#f5250580"],
        borderColor: "#f52505",
        borderWidth: 2,
      },
      // {
      //   fill: true,
      //   label: "Risk Level5 Counts",
      //   data: {
      //     "2024-04-05": 0,
      //     "2024-04-06": 0,
      //     "2024-04-07": 0,
      //     "2024-04-08": 0,
      //     "2024-04-09": 0,
      //     "2024-04-10": 0,
      //     "2024-04-12": 0,
      //     "2024-04-13": 0,
      //     "2024-04-14": 0,
      //   },
        // backgroundColor: ["#b20303"],
      //   backgroundColor: ["#b2030380"],
      //   borderColor: "#b20303",
      //   borderWidth: 2,
      // },
    ],
  });

  // const [cumulativeViolation, setCumulativeViolation] = useState({
  //   labels: ["2024-04-05", "2024-04-06", "2024-04-07", "2024-04-08"],
  //   datasets: [
  //     {
  //       fill: true,
  //       label: "Risk Level1 Counts",
  //       data: [0, 0, 0, 0],
  //       // backgroundColor: ["#3d9737"],
  //       backgroundColor: ["#3d973780"],
  //       borderColor: "#3d9737",
  //       borderWidth: 2,
  //     },
  //     {
  //       fill: true,
  //       label: "Risk Level2 Counts",
  //       data: [0, 0, 0, 0],
  //       // backgroundColor: ["#ffc407"],
  //       backgroundColor: ["#ffc40780"],
  //       borderColor: "#ffc407",
  //       borderWidth: 2,
  //     },
  //     {
  //       fill: true,
  //       label: "Risk Level3 Counts",
  //       data: [1, 1, 1, 0],
  //       // backgroundColor: ["#ff7505"],
  //       backgroundColor: ["#ff750580"],
  //       borderColor: "#ff7505",
  //       borderWidth: 2,
  //     },
  //     {
  //       fill: true,
  //       label: "Risk Level4 Counts",

  //       data: [2, 0, 0, 1],
  //       // backgroundColor: ["#f52505"],
  //       backgroundColor: ["#f5250580"],
  //       borderColor: "#f52505",

  //       borderWidth: 2,
  //     },
  //     {
  //       fill: true,
  //       label: "Risk Level5 Counts",
  //       data: [0, 0, 0, 0],
  //       // backgroundColor: ["#b20303"],
  //       backgroundColor: ["#b2030380"],
  //       borderColor: "#b20303",
  //       borderWidth: 2,
  //     },
  //   ]
  // });

  const [highlev_violation, setHighlev_violation] = useState({
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

    const getDailyViolationCounts = () => {
      // Initialize an object to hold the daily violation counts
      const dailyViolationCounts_Risk1 = {};
      const dailyViolationCounts_Risk2 = {};
      const dailyViolationCounts_Risk3 = {};
      const dailyViolationCounts_Risk4 = {};
      // const dailyViolationCounts_Risk5 = {};
      // const dailyViolationQueries = {};

      // Iterate through the data
      analyticsData.forEach((entry) => {
        // Extract the date from the entry

        const day = entry.date_time.split(" ")[0]; // Extracting the date in 'YYYY-MM-DD' format

        // console.log("daterange ", dateRange);

        if (day >= dateRange?.from && day <= dateRange?.to) {
          // Increment the count for the corresponding day

          // if (Object.keys(entry["High level violations"]).length > 0) {
          //   dailyViolationCounts[day]++;
          // }

          if (Object.keys(entry["High level violations"]).length > 0) {
            setCompDates((prev) => {
              return [...new Set([...prev, day])];
            });
          }

          dailyViolationCounts_Risk1[day] =
            Object.keys(entry["High level violations"]).length > 0
              ? entry.risk == 1
                ? (dailyViolationCounts_Risk1[day] || 0) + 1
                : dailyViolationCounts_Risk1[day] || 0
              : dailyViolationCounts_Risk1[day] || 0;

          dailyViolationCounts_Risk2[day] =
            Object.keys(entry["High level violations"]).length > 0
              ? entry.risk == 2
                ? (dailyViolationCounts_Risk2[day] || 0) + 1
                : dailyViolationCounts_Risk2[day] || 0
              : dailyViolationCounts_Risk2[day] || 0;

          dailyViolationCounts_Risk3[day] =
            Object.keys(entry["High level violations"]).length > 0
              ? entry.risk == 3
                ? (dailyViolationCounts_Risk3[day] || 0) + 1
                : dailyViolationCounts_Risk3[day] || 0
              : dailyViolationCounts_Risk3[day] || 0;

          dailyViolationCounts_Risk4[day] =
            Object.keys(entry["High level violations"]).length > 0
              ? entry.risk == 4
                ? (dailyViolationCounts_Risk4[day] || 0) + 1
                : dailyViolationCounts_Risk4[day] || 0
              : dailyViolationCounts_Risk4[day] || 0;

          // dailyViolationCounts_Risk5[day] =
          //   Object.keys(entry["High level violations"]).length > 0
          //     ? entry.risk == 5
          //       ? (dailyViolationCounts_Risk5[day] || 0) + 1
          //       : dailyViolationCounts_Risk5[day] || 0
          //     : dailyViolationCounts_Risk5[day] || 0;

          // Object.entries(entry["High level violations"]).forEach(([query, messages]) => {
          //   //write code  for the days store the query and its count

          //   //  TODO: implement this where we store x axis values are the days and the y axis values are the query and its count in stack bar chart

          //   if (!dailyViolationQueries[day]) {
          //     dailyViolationQueries[day] = { [query]: 1 };
          //   } else {
          //     if (dailyViolationQueries[day][query]) {
          //       dailyViolationQueries[day][query] += 1;
          //     } else {
          //       dailyViolationQueries[day][query] = 1;
          //     }
          //     // dailyViolationQueries[query][day] || 0 + 1;
          //   }
          // });
        }
      });

      // console.log("dai ", dailyViolationQueries);
      // Object.entries(dailyViolationQueries).forEach(([date, query]) => {
      //   const totalSum = Object.values(query).reduce(
      //     (acc, curr) => acc + curr,
      //     0
      //   );
      //   Object.entries(query).forEach(([key, value]) => {
      //     query[key] = (value / totalSum) * 100;
      //   });
      // });

      // console.log("r1 ", dailyViolationCounts_Risk1);
      // console.log("r2 ", dailyViolationCounts_Risk2);
      // console.log("r3 ", dailyViolationCounts_Risk3);
      // console.log("r4 ", dailyViolationCounts_Risk4);
      // console.log("r5 ", dailyViolationCounts_Risk5);

      const riskArray1 = Object.entries(dailyViolationCounts_Risk1);
      const riskArray2 = Object.entries(dailyViolationCounts_Risk2);
      const riskArray3 = Object.entries(dailyViolationCounts_Risk3);
      const riskArray4 = Object.entries(dailyViolationCounts_Risk4);
      // const riskArray5 = Object.entries(dailyViolationCounts_Risk5);

      // Sort the array based on keys (dates)
      function compare(riskArray) {
        riskArray.sort(([dateA], [dateB]) => {
          return new Date(dateA) - new Date(dateB);
        });
        return riskArray;
      }

      // Convert the sorted array back to an object
      const risk1 = {};
      const risk2 = {};
      const risk3 = {};
      const risk4 = {};
      // const risk5 = {};

      compare(riskArray1).forEach(([key, value]) => {
        risk1[key] = value;
      });

      compare(riskArray2).forEach(([key, value]) => {
        risk2[key] = value;
      });

      compare(riskArray3).forEach(([key, value]) => {
        risk3[key] = value;
      });

      compare(riskArray4).forEach(([key, value]) => {
        risk4[key] = value;
      });
      // compare(riskArray5).forEach(([key, value]) => {
      //   risk5[key] = value;
      // });

      console.log("risk1 ", risk1);
      console.log("risk2 ", risk2);
      console.log("risk2 ", risk3);
      console.log("risk2 ", risk4);
      // console.log("risk2 ", risk5);
      return {
        risk1,
        risk2,
        risk3,
        risk4,
        // risk5,
        // dailyViolationQueries,
      };
    };

    // Get the daily violation counts
    const {
      risk1,
      risk2,
      risk3,
      risk4,
      // risk5,
      // dailyViolationQueries,
    } = getDailyViolationCounts();

    const labels = Object.keys(risk1);
    // .map((date) => new Date(date).toISOString().split("T")[0])
    // .sort((a, b) => new Date(a) - new Date(b));

    // const labels = risk1;
    // console.log(labels);
    // setCompDates(labels);
    // console.log(compdates);
    const dataPoints_Risk1 = Object.values(risk1);
    const dataPoints_Risk2 = Object.values(risk2);
    const dataPoints_Risk3 = Object.values(risk3);
    const dataPoints_Risk4 = Object.values(risk4);
    // const dataPoints_Risk5 = Object.values(risk5);

    // console.log(dataPoints);
    // setCompDates([...new Set(compdates)]);

    setCumulativeViolation({
      labels,
      datasets: [
        {
          fill: true,
          label: "Risk Level1 Counts",
          data: dataPoints_Risk1,
          // backgroundColor: ["#3d9737"],
          backgroundColor: ["#3d973780"],
          borderColor: "#3d9737",
          borderWidth: 2,
        },
        {
          fill: true,
          label: "Risk Level2 Counts",
          data: dataPoints_Risk2,
          // backgroundColor: ["#ffc407"],
          backgroundColor: ["#ffc40780"],
          borderColor: "#ffc407",
          borderWidth: 2,
        },
        {
          fill: true,
          label: "Risk Level3 Counts",
          data: dataPoints_Risk3,
          // backgroundColor: ["#ff7505"],
          backgroundColor: ["#ff750580"],
          borderColor: "#ff7505",
          borderWidth: 2,
        },
        {
          fill: true,
          label: "Risk Level4 Counts",
          data: dataPoints_Risk4,
          // backgroundColor: ["#f52505"],
          backgroundColor: ["#f5250580"],
          borderColor: "#f52505",
          borderWidth: 2,
        },
        // {
        //   fill: true,
        //   label: "Risk Level5 Counts",
        //   data: dataPoints_Risk5,
        //   // backgroundColor: ["#b20303"],
        //   backgroundColor: ["#b2030380"],
        //   borderColor: "#b20303",
        //   borderWidth: 2,
        // },
      ],
    });

    // console.log(Object.entries(dailyViolationQueries[labels[0]]));

    // const dates = Object.keys(dailyViolationQueries);
    // // setCompDates(dates);
    // const categories = [
    //   ...new Set(Object.values(dailyViolationQueries).flatMap(Object.keys)),
    // ];

    // function getRandomColor() {
    //   let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    //   return color === "#666666" ? "#e11d47" : color;
    // }
    // Initialize dataset array

    // console.log("categories ", categories);

    // const datasets = categories.map((category) => {
    //   const values = dates.map(
    //     (date) => dailyViolationQueries[date][category] || 0
    //   );
    //   // .sort((a, b) => b[1] - a[1])
    //   // .slice(0, 5);

    //   // console.log(values);

    //   return {
    //     label: category,
    //     data: values,
    //     backgroundColor: getRandomColor(),
    //     borderWidth: 0,
    //   };
    // });

    // show the violations data in stacked bar graph format
    // setHighlev_violation({
    //   labels: dates,
    //   datasets: datasets,
    // });

    // })
  }, [analyticsData, dateRange]);

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const handleCompare = () => {
    console.log(firstDate, secondDate);

    localStorage.setItem("firstDate", firstDate);
    localStorage.setItem("secondDate", secondDate);

    let dailyViolationQueries = {};

    analyticsData.forEach((entry) => {
      const day = entry.date_time.split(" ")[0]; // Extracting the date in 'YYYY-MM-DD' format
      Object.entries(entry["High level violations"]).forEach(
        ([query, messages]) => {
          if (!dailyViolationQueries[day]) {
            dailyViolationQueries[day] = { [query]: 1 };
          } else {
            if (dailyViolationQueries[day][query]) {
              dailyViolationQueries[day][query] += 1;
            } else {
              dailyViolationQueries[day][query] = 1;
            }
          }
        }
      );
    });

    console.log("*************");
    console.log(
      dailyViolationQueries[firstDate],
      dailyViolationQueries[secondDate]
    );
    console.log("*************");

    // console.log(Object.keys(dailyViolationQueries[firstDate]));
    // console.log(Object.values(dailyViolationQueries[firstDate]));

    dailyViolationQueries[firstDate] = Object.fromEntries(
      Object.entries(dailyViolationQueries[firstDate])
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 5)
    );

    dailyViolationQueries[secondDate] = Object.fromEntries(
      Object.entries(dailyViolationQueries[secondDate])
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 5)
    );

    Object.entries(dailyViolationQueries).forEach(([date, query]) => {
      const totalSum = Object.values(query).reduce(
        (acc, curr) => acc + curr,
        0
      );
      Object.entries(query).forEach(([key, value]) => {
        query[key] = (value / totalSum) * 100;
      });
    });

    //  console.log(
    //    topViolationsFirstDate,
    //     topViolationsSecondDate
    //    // .sort(([, countA], [, countB]) => countB - countA)
    //    // .slice(0, 5)
    //  );

    const categories = [
      ...new Set(
        Object.keys(dailyViolationQueries[firstDate]).concat(
          Object.keys(dailyViolationQueries[secondDate])
        )
        // .flatMap(Object.keys)
      ),
    ];

    console.log("Categories ", categories);

    // function getRandomColor() {
    //   // borderColor: ["#3d9737", "#ffc407", "#ff7505", "#f52505", "#b20303"],
    //   const color =
    //     backgroundColor[Math.floor(Math.random() * backgroundColor.length)];
    //   console.log(color);
    //   return color;
    // }
    // Initialize dataset array

    // console.log("categories ", categories);
    const backgroundColor = [
      "#a775dd",
      "#5ba8d4",
      "#69d66d",
      "#ffb854",
      "#f66332",
      "#003f5c",
      "#2f4b7c",
      "#665191",
      "#a05195",
      "#d45087",
      "#f95d6a",
      "#ff7c43",
      "#ffa600",
    ];
    const categoryColors = {};
    categories.forEach((label, index) => {
      categoryColors[label] = backgroundColor[index % backgroundColor.length];
    });
    console.log("categoryColors", categoryColors);
    const datasets = categories.map((category) => {
      const values = [firstDate, secondDate].map(
        (date) => dailyViolationQueries[date][category] || 0
      );
      // .sort((a, b) => b[1] - a[1])
      // .slice(0, 5);

      // console.log(values);

      return {
        label: category,
        data: values,

        backgroundColor: categoryColors[category] + "A0",
        borderColor: categoryColors[category],
        borderWidth: 1,
      };
    });
    localStorage.setItem("compdates", [firstDate, secondDate]);
    localStorage.setItem("compdatasets", JSON.stringify(datasets));

    setHighlev_violation({
      labels: localStorage.getItem("compdates").split(","),
      datasets: JSON.parse(localStorage.getItem("compdatasets")),
    });

    setCompGraphLoading(false);
  };
  useEffect(() => {
    setHighlev_violation({
      labels: localStorage.getItem("compdates")?.split(",") || [
        "AI infers emotions in workplaces, schools.",
        "Fundamental rights violations: privacy, expression",
      ],
      datasets: JSON.parse(localStorage.getItem("compdatasets")) || [33, 66],
    });
  }, []);
  const highviolationsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    scales: {
      // type: "logarithmic",
      x: { stacked: true },
      y: { stacked: true },
    },
    plugins: {
      datalabels: {
        color: "#fff",
      },
    },
  };

  Chart.register(...registerables);
  return (
    <main className="overflow-y-scroll  no-scrollbar">
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
          <div className="col-span-12 rounded-xl  bg-black  shadow-default  sm:px-7.5 xl:col-span-8">
            <Card className="bg-black text-black border-none">
              <CardHeader>
                <CardTitle className="text-white">
                  Violation Count on Daily Basis
                </CardTitle>
                <CardDescription>
                  This graph shows the count of daily violations
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72 ">
                <Line data={cumulativeViolation} options={lineOptions} />
              </CardContent>
            </Card>
          </div>

          <RiskBarChart />
          <PercentViolationChart />

          <div className="col-span-12 rounded-xl bg-black  shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
            <Card className="bg-black text-black border-none">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between w-full">
                  Comparison between categories of violations in Percentage
                  {compdates && (
                    <span className="flex space-x-1 items-center justify-between">
                      <Select
                        onValueChange={(value) => setFirstDate(value)}
                        value={firstDate}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select first date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>First Date</SelectLabel>
                            {compdates.map((date, index) => {
                              return (
                                <SelectItem key={index} value={date}>
                                  {date}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Select
                        onValueChange={(value) => setSecondDate(value)}
                        value={secondDate}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select second date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Second Date</SelectLabel>
                            {compdates.map((date, index) => {
                              return (
                                <SelectItem key={index} value={date}>
                                  {date}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      <Button
                        className="text-xs"
                        onClick={handleCompare}
                        disabled={!firstDate && !secondDate}
                      >
                        Compare
                      </Button>
                    </span>
                  )}
                </CardTitle>
                <CardDescription>
                  This graph shows the comparison between percentage of each
                  category of violation counts on the selected 2 dates
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72 ">
                {firstDate && secondDate ? (
                  <Bar
                    data={highlev_violation}
                    options={highviolationsOptions}
                    // plugins={[ChartDataLabels]}
                  />
                ) : (
                  <p className="text-center flex justify-center items-center h-full text-muted-foreground">
                    Please select two dates to compare
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
