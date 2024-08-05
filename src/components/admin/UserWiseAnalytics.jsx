/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bar, Pie } from "react-chartjs-2";

import ChartDataLabels from "chartjs-plugin-datalabels";

export default function UserWiseAnalytics({ analyticsData }) {
  const [selectedUserData, setSelectedUserData] = useState(
    localStorage.getItem("selectedUserData") || "kd83"
  );
  const userViolationCounts = {};
  const userTopViolations = {};

  // Loop through the data to count violations and find top violations
  analyticsData = JSON.parse(localStorage.getItem("analyticsData"))
    ? JSON.parse(localStorage.getItem("analyticsData"))
    : analyticsData;
  console.log(analyticsData);
  analyticsData?.forEach((item) => {
    const { username, msg } = item;
    const violationCount = Object.keys(item["High level violations"]).length;

    // Increment violation count for the user
    userViolationCounts[username] =
      (userViolationCounts[username] || 0) + (violationCount > 0 ? 1 : 0);

    // Update top violations for the user
    Object.entries(item["High level violations"]).forEach(
      ([query, messages]) => {
        if (!userTopViolations[username]) {
          userTopViolations[username] = { [query]: 1 };
        } else {
          if (userTopViolations[username][query]) {
            userTopViolations[username][query] += 1;
          } else {
            userTopViolations[username][query] = 1;
          }
        }
      }
    );
  });

  const handleRowClick = (username) => {
    // Find the selected user's data
    // store this in local storage

    localStorage.setItem("selectedUserData", username);
    setSelectedUserData(username);
  };

  return (
    <main className="no-scrollbar  mx-auto max-w-screen-3xl p-4 md:p-6 2xl:p-4">
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-0 md:gap-6 2xl:mt-7.5 2xl:gap-7.5 max-w-screen-3xl mx-4">
        <div className=" col-span-12 rounded-xl  bg-black  shadow-default  sm:px-7.5 xl:col-span-12 h-[45vh] overflow-y-scroll   p-5">
          <Table>
            <TableCaption>
              A list of users and the respective violations that they commited
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">UserName</TableHead>
                <TableHead className="w-[200px]">Violation Count</TableHead>
                <TableHead className="text-right">Top 5 Violations </TableHead>
                {/* <TableHead>Query which has most violated</TableHead> */}
                {/* <TableHead className="text-right">Corresponding Query</TableHead> */}
                {/* <TableHead className="text-right">Amount</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                // Loop through the userViolationCounts object to display the data
                Object.entries(userViolationCounts).map(([username, count]) => (
                  <TableRow
                    key={username}
                    onClick={() => handleRowClick(username)}
                    className="cursor-pointer"
                  >
                    <TableCell className="font-medium">{username}</TableCell>
                    <TableCell>{count}</TableCell>
                    <TableCell className="text-right">
                      {userTopViolations[username] ? (
                        <ul>
                          {Object.entries(userTopViolations[username])
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 5)
                            .map(([query, count]) => (
                              <li key={query}>
                                {query}: {count}
                              </li>
                            ))}
                        </ul>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    {/* <TableCell className="text-right">
                    {userTopViolations[username]?.message || "N/A"}
                  </TableCell> */}
                  </TableRow>
                ))
              }
              {/* <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow> */}
            </TableBody>
          </Table>
        </div>{" "}
      </div>
      {selectedUserData && (
        <div className="mx-4 grid grid-cols-12 xl:grid-cols-12 gap-4  rounded-xl  max-w-screen-3xl  mt-4   ">
          <div className="col-span-12 rounded-xl  bg-black  shadow-default   sm:px-7.5 xl:col-span-6">
            <Card className="bg-black text-white border-none">
              <CardHeader>
                <CardTitle className="text-white">
                  {`${selectedUserData}'s Violation Categories Counts`}
                </CardTitle>
                {/* <CardDescription>
                This graph shows the counts for the 5 levels of risks that
                EthiCheck.AI categorizes the violations into
            </CardDescription> */}
              </CardHeader>
              <CardContent className="h-72 ">
                <Bar
                  data={{
                    labels: userTopViolations[selectedUserData]
                      ? Object.entries(userTopViolations[selectedUserData])
                          .sort(([, countA], [, countB]) => countB - countA)
                          .slice(0, 5)
                          .map(([query, count]) => query)
                      : [],

                    datasets: [
                      {
                        //   axis: "y",
                        label: "Violations Done & their Counts",
                        data: userTopViolations[selectedUserData]
                          ? Object.values(userTopViolations[selectedUserData])
                              .sort((countA, countB) => countB - countA)
                              .slice(0, 5)
                          : [],
                        // 1, 2, 34,

                        backgroundColor: [
                          "rgba(225, 29, 71,0.5)",
                          "rgba(255, 99, 132,0.5)",
                          "rgba(255, 159, 64,0.5)",
                          "rgba(255, 205, 86,0.5)",
                          "rgba(75, 192, 192,0.5)",
                          "rgba(54, 162, 235,0.5)",
                          "rgba(153, 102, 255,0.5)",
                          "rgba(201, 203, 207,0.5)",
                        ],
                        borderColor: [
                          "#E11D47",
                          "rgb(255, 99, 132)",
                          "rgb(255, 159, 64)",
                          "rgb(255, 205, 86)",
                          "rgb(75, 192, 192)",
                          "rgb(54, 162, 235)",
                          "rgb(153, 102, 255)",
                          "rgb(201, 203, 207)",
                        ],
                        borderWidth: 1,
                        //   fill: false,
                      },
                    ],
                  }}
                  plugins={[ChartDataLabels]}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: "y",
                    plugins: {
                      datalabels: {
                        color: "#ffffff60",
                      },
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </div>

          <div className="col-span-12 rounded-xl  bg-black p-7.5 shadow-default  xl:col-span-6">
            <Card className="bg-black text-white border-none">
              <CardHeader>
                <CardTitle className="text-white">
                  {`${selectedUserData}'s Violation Categories in Percentage`}
                </CardTitle>
                {/* <CardDescription>
                This graph shows the counts for the 5 levels of risks that
                EthiCheck.AI categorizes the violations into
            </CardDescription> */}
              </CardHeader>
              <CardContent className="h-72 ">
                <Pie
                  data={{
                    labels: userTopViolations[selectedUserData]
                      ? Object.entries(userTopViolations[selectedUserData])
                          .sort(([, countA], [, countB]) => countB - countA)
                          .slice(0, 5)
                          .map(([query, count]) => query)
                      : [],

                    datasets: [
                      {
                        //   axis: "y",
                        label: "Violation Percentage",
                        data: userTopViolations[selectedUserData]
                          ? Object.values(userTopViolations[selectedUserData])
                              .sort((countA, countB) => countB - countA)
                              .slice(0, 5)
                              .map((count) => {
                                const tot = Object.values(
                                  userTopViolations[selectedUserData]
                                ).reduce((a, b) => a + b, 0);
                                return ((count / tot) * 100).toFixed(1);
                              })
                          : [],
                        // 1, 2, 34,

                        backgroundColor: [
                          "rgba(225, 29, 71,0.5)",
                          "rgba(255, 99, 132,0.5)",
                          "rgba(255, 159, 64,0.5)",
                          "rgba(255, 205, 86,0.5)",
                          "rgba(75, 192, 192,0.5)",
                          "rgba(54, 162, 235,0.5)",
                          "rgba(153, 102, 255,0.5)",
                          "rgba(201, 203, 207,0.5)",
                        ],
                        borderColor: [
                          "rgba(225, 29, 71)",
                          "rgb(255, 99, 132)",
                          "rgb(255, 159, 64)",
                          "rgb(255, 205, 86)",
                          "rgb(75, 192, 192)",
                          "rgb(54, 162, 235)",
                          "rgb(153, 102, 255)",
                          "rgb(201, 203, 207)",
                        ],
                        borderWidth: 1,
                        //   fill: false,
                      },
                    ],
                  }}
                  plugins={[ChartDataLabels]}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    // indexAxis: "y",
                    plugins: {
                      datalabels: {
                        color: "#ffffffa0",
                      },
                    },
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        // <div className="col-span-12 rounded-xl mt-10 m-10 bg-black p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">

        // </div>
      )}
    </main>
  );
}
