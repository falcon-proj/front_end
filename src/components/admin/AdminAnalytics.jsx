import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "@/api/axios";
import { setAnalyticsData } from "@/state/slices/analyticsSlice";
import UserWiseAnalytics from "./UserWiseAnalytics";
import DailyAnalytics from "./analytics/DailyAnalytics";

import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { setDateRange } from "@/state/slices/dateRangeSlice";

export default function AdminAnalytics() {
  const dispatch = useDispatch();
  const analyticsData = useSelector(
    (state) => state.analyticsData.analyticsData
  );

  const [date, setDate] = useState({
    from: new Date(2024, 3, 1),
    // to: addDays(new Date(2024, 3, 1), 180),
    to:new Date()
  });

  const handleSetDateRange = () => {
    const from = format(date.from, "yyyy-MM-dd");
    const to = date.to ? format(date.to, "yyyy-MM-dd") : from;
    // console.log(from, to);

    dispatch(setDateRange({ from, to }));
  };

  // fetch the data here

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get("/analytics");
  //     // console.log(response.data);
  //     dispatch(setAnalyticsData(response.data));
  //     localStorage.setItem("analyticsData", JSON.stringify(response.data));
  //   };

  //   // if (!localStorage.getItem("analyticsData"))
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/analytics");
      dispatch(setAnalyticsData(response.data));
      localStorage.setItem("analyticsData", JSON.stringify(response.data));
    };

    // Check if data is already fetched from localStorage
    const cachedData = localStorage.getItem("analyticsData");
    if (!analyticsData && cachedData) {
      dispatch(setAnalyticsData(JSON.parse(cachedData)));
    } else {
      fetchData();
    }
  }, []);

  return (
    // <main className=" flex-1 flex-col gap-4 justify-center items-center  overflow-auto md:grid-cols-2 p-4 lg:grid-cols-2 border-2 border-primary">
    <div className="flex w-full  no-scrollbar justify-center items-center ">
      <Tabs defaultValue="daily">
        <TabsList className="top-2 w-fit text-xs sticky">
          <TabsTrigger value="daily">Daily Analytics</TabsTrigger>
          {/* <TabsTrigger value="six_hrs" variant="primary">
          6 hrs Analytics
        </TabsTrigger> */}
          <TabsTrigger value="userwise">User Wise Analysis</TabsTrigger>
        </TabsList>
        {/* <TabsContent value="six_hrs">
        <SixHourAnalysis analyticsData={analyticsData} />
      </TabsContent> */}
        <TabsContent
          value="daily"
          className=" h-[calc(100vh-7rem)] p-0 overflow-y-scroll no-scrollbar"
        >
          <div className={`absolute top-10  right-10  items-center`}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                  value={date}
                  onClick={(value) => setDate(value)}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            <Button className="text-xs space-x-2" onClick={handleSetDateRange}>
              Set Date
            </Button>
          </div>
          <DailyAnalytics analyticsData={analyticsData} />
        </TabsContent>
        <TabsContent
          value="userwise"
          className="h-[calc(100vh-7rem)] w-[calc(100vw-11rem)]  overflow-y-scroll no-scrollbar "
        >
          <UserWiseAnalytics analyticsData={analyticsData} />
          {/* <UserWiseAnalytics /> */}
        </TabsContent>
      </Tabs>
    </div>
    // </main>
  );
}
