import { Suspense } from "react";
import AdminAnalytics from "./AdminAnalytics";
import AdminJsonGraph from "./AdminJsonGraph";
import AdminRuleBookUpload from "./AdminRuleBookUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "../ui/badge";

export default function AdminContent() {
  return (
    // <div className="flex flex-col bg-muted/50 ">
    <main className=" flex-1 gap-4 justify-center items-center bg-muted/50 overflow-auto md:grid-cols-2 p-4 lg:grid-cols-2  no-scrollbar">
      <Tabs defaultValue="json_graph">
        {/* <TabsList > */}
        <TabsList className="flex w-fit mx-auto justify-between sticky top-1 ">
          <TabsTrigger value="json_graph" variant="primary">
            Json & Graph
          </TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="json_graph">
          <div className="relative flex h-full overflow-y-scroll min-h-[50vh] flex-col rounded-xl   lg:col-span-2 gap-3  no-scrollbar">
            <Suspense
              fallback={<Badge className="animate-pulse">Loading...</Badge>}
            >
              <AdminRuleBookUpload />
            </Suspense>
            {/* <Suspense
                fallback={<Badge className="animate-pulse">Loading...</Badge>}
              > */}
            <AdminJsonGraph />
            {/* </Suspense> */}
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          <AdminAnalytics />
        </TabsContent>
      </Tabs>
    </main>
    // </div>
  );
}
