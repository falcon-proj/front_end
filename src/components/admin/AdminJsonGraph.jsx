import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import Graph from "react-graph-vis";

import { ForceGraph3D, ForceGraph2D } from "react-force-graph";

import React, {
  Suspense,
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import { Button } from "../ui/button";
import { JsonEditor } from "react-jsondata-editor";

import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

import { useDispatch, useSelector } from "react-redux";
import axios from "@/api/axios";
import { setJsonData } from "../../state/slices/jsonGraphSlice";
import { Card, CardContent } from "../ui/card";

import { useToast } from "../ui/use-toast";

// import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
// import CellMeasurer from "react-virtualized/dist/commonjs/CellMeasurer";
// import CellMeasurerCache from "react-virtualized/dist/commonjs/CellMeasurer/CellMeasurerCache";

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

const AdminJsonGraph = () => {
  // const [jsonData, setJsonData] = useState(JSON.stringify(null, " "));
  const [jsonLoading, setJsonLoading] = useState(false);
  const [graphLevel, setGraphLevel] = useState(3);
  const [graphLoading, setGraphLoading] = useState(false);

  const [nodeInfo, setNodeInfo] = useState(null);

  const [graphStabilising, setGraphStabilising] = useState(false);

  const dispatch = useDispatch();
  const jsonData = useSelector((state) => state.jsonGraph.jsonData);
  // const graphData = useSelector((state) => state.jsonGraph.graphData);

  const { toast } = useToast();
  const [graphData, setGraphData] = useState({
    nodes: [],
    links: [],
  });
  const fetchData = async () => {
    if (localStorage.getItem("jsonData")) {
      dispatch(setJsonData(localStorage.getItem("jsonData")));
      return;
    }
    try {
      setJsonLoading(true);
      const response = await axios.get("/getJson");
      console.log("JSN data fetched");

      // setJsonData(JSON.stringify(response.data));
      dispatch(setJsonData(JSON.stringify(response.data)));
      localStorage.setItem("jsonData", JSON.stringify(response.data));
      setJsonLoading(false);
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  };
  const fetchFreshData = async () => {
    try {
      setJsonLoading(true);
      const response = await axios.get("/getJson");
      console.log("JSN data fetched");
      console.log(response.data[0]);
      // setJsonData(JSON.stringify(response.data));
      dispatch(setJsonData(JSON.stringify(response.data)));
      localStorage.setItem("jsonData", JSON.stringify(response.data));
      setJsonLoading(false);
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  };

  useEffect(() => {
    // Fetch JSON data from the server

    fetchData();
  }, []);

  const fetchFreshGraphData = async () => {
    try {
      setGraphLoading(true);
      const response = await axios.get("/getGraph");
      // console.log("Graph data fetched");
      // console.log("before ", graphData);
      console.log("Graph data fetched");
      console.log(response.data[0]);
      console.log(response.data[1]);
      setGraphData({ nodes: response.data[0], links: response.data[1] });
      // console.log("graph Data ", graphData);
      localStorage.setItem(
        "graphData",
        JSON.stringify({ nodes: response.data[0], links: response.data[1] })
      );

      setGraphLoading(false);
    } catch (error) {
      console.error("Error fetching Graph data:", error);
    }
  };
  const fetchGraphData = async () => {
    try {
      if (localStorage.getItem("graphData")) {
        setGraphData(JSON.parse(localStorage.getItem("graphData")));
        return;
      }

      setGraphLoading(true);
      const response = await axios.get("/getGraph");
      // console.log("Graph data fetched");
      // console.log("before ", graphData);
      console.log("Graph data fetched");
      // console.log(response.data[1]);
      setGraphData({ nodes: response.data[0], links: response.data[1] });
      localStorage.setItem(
        "graphData",
        JSON.stringify({ nodes: response.data[0], links: response.data[1] })
      );

      setGraphLoading(false);
    } catch (error) {
      console.error("Error fetching Graph data:", error);
    }
  };
  // initially fetch the graph

  const cachedGraph = useMemo(() => graphData, [graphData]);

  useEffect(() => {
    // console.log("Fetching graph data");
    fetchGraphData();
  }, [jsonData]);

  const handleSaveJson = async () => {
    // console.log(jsonData);
    try {
      const response = await axios.post(
        "/getGraph",
        { data: JSON.parse(jsonData) },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(setJsonData(localStorage.getItem("jsonData")))
      // toast({
      //   variant: "destructive",
      //   description:
      //     "Editing feature is temporarily blocked for safety purposes",
      // });

      console.log("Json data saved");
      localStorage.setItem("jsonData", jsonData);
    } catch (error) {
      console.error("Error saving JSON data:", error);
    }

    fetchFreshGraphData();
  };

  // const cachedGraph = useMemo(() => graphData, [graphData]);

  const myStyle = {
    bannerStyle: {
      hoverColor: "#CE1E43",
      fontColor: "white",
      font: "16px/24x ui-sans-serif, system-ui, sans-serif, serif",
      // font: "15px/20px",
    },
    keyStyle: {
      color: "gray",

      font: "14px/20px 'times new roman',ui-sans-serif, system-ui, sans-serif, serif",
    },
    valueStyle: {
      // font: "14px",
      font: "14px/20px  'times new roman',ui-sans-serif, system-ui, sans-serif, serif",
      null: "#939597",
      boolean: "#939597",
      number: "#e53b5c",
      string: "#939597",
    },
    buttonStyle: {
      add: "#E11D47",
      delete: "#939597",
      update: "#006e4d",
      cancel: "#bb0039",
    },
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[60vh]  rounded-lg border  no-scrollbar"
    >
      <ResizablePanel
        defaultSize={40}
        className="bg-black text-black  no-scrollbar"
      >
        {/* json component */}

        <div className="h-[86vh] relative flex  no-scrollbar">
          {!jsonLoading ? (
            <JsonEditor
              jsonObject={jsonData}
              // onChange={(output) => {
              //   // dispatch(setJsonData(localStorage.getItem("jsonData")));
              //   // console.log(output);
              // }}
              // editable={false}
              theme={{ color: "#E11D47", hoverColor: "#E11D4719" }}
              valueStyle={myStyle.valueStyle}
              keyStyle={myStyle.keyStyle}
              bannerStyle={myStyle.bannerStyle}
              // className="truncate w-full h-full"
            />
          ) : (
            <div className="flex flex-col">
              <Badge
                variant={"secondary"}
                className="animate-pulse absolute top-4 "
              >
                Loading Json
              </Badge>
              <Skeleton className="h-8 w-full mt-2" />
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className="animate-pulse flex flex-col gap-4 m-2 space-y-2"
                >
                  <Skeleton className="h-4 w-4/5 " />
                  <Skeleton className="h-4 w-1/2 ml-10 " />
                  <Skeleton className="h-4 w-1/3 ml-20 " />
                  <Skeleton className="h-4 w-1/3 ml-20 " />
                  <Skeleton className="h-4 w-1/3 ml-20 " />
                </div>
              ))}
            </div>
          )}

          {!jsonLoading && (
            <Button
              variant="link"
              className="decoration-none absolute m-1  right-3 text-white text-xs "
              onClick={handleSaveJson} // TODO: i need to send the json data back and on basis of that the new graph data will be formed
            >
              Save
            </Button>
          )}
        </div>
      </ResizablePanel>
      <span className="flex gap-2 justify-start items-center">
        <Button
          onClick={fetchFreshData}
          variant="outline"
          className="absolute m-0 top-2 left-0 text-xs text-white"
        >
          Json
        </Button>
        <Button
          onClick={fetchFreshGraphData}
          variant="outline"
          className="absolute m-0 top-2 ml-10 left-7 text-xs text-white"
        >
          Graph
        </Button>
        <span className="flex gap-1 absolute top-4  left-36">
          <Badge variant="critical"> Critical Risk</Badge>
          <Badge variant="high"> High Risk</Badge>
          <Badge variant="medium"> Medium Risk</Badge>
          <Badge variant="minimal"> Minimal Risk</Badge>
        </span>
      </span>
      {/* <ResizableHandle withHandle /> */}
      <ResizablePanel
        className="bg-black relative  no-scrollbar  h-[86vh]"
        defaultSize={60}
      >
        {/* graph component */}

        <Suspense
          fallback={
            <>
              <Badge
                variant={"secondary"}
                className="animate-pulse  absolute right-3 top-4 "
              >
                Loading Graph
              </Badge>
              <Skeleton className="h-10 w-10 rounded-full bg-secondary" />
              <Skeleton className="h-10 w-10 rounded-full bg-secondary absolute bottom-4/5 left-2/3" />
              <Skeleton className="h-10 w-10 rounded-full bg-secondary absolute top-1/3 right-1/3" />
              <Skeleton className="h-10 w-10 rounded-full bg-secondary absolute top-1/4 right-1/2" />
              <Skeleton className="h-10 w-10 rounded-full bg-secondary absolute top-2/3 left-1/2" />
              <Skeleton className="h-10 w-10 rounded-full bg-secondary absolute top-1/4 right-1/4" />
              <Skeleton className="h-10 w-10 rounded-full bg-secondary absolute top-3/4 left-3/4" />
              <Skeleton className="h-10 w-10 rounded-full bg-secondary absolute top-4/5 left-4/5" />
            </>
          }
        >
          <div className="relative flex  no-scrollbar  items-center justify-center p-5 h-[86vh]">
            {!graphLoading ? (
              <>
                <Badge variant="secondary" className="right-2 absolute top-2">
                  Knowledge Graph
                </Badge>

                {/* <span className="absolute top-2 right-2"></span> */}

                <ForceGraph3D
                  graphData={cachedGraph}
                  // nodeAutoColorBy="id"
                  linkColor="black"
                  nodeColor={(node) =>
                    node?.risk === "critical"
                      ? "red"
                      : node?.risk === "minimal"
                      ? "green"
                      : node?.risk === "high"
                      ? "orange"
                      : node?.risk === "medium"
                      ? "yellow"
                      : "#e53b5c"
                  }
                  // backgroundColor="#aaa"
                  linkWidth={2}
                  nodeLabel={(node) => node.label}
                  linkDirectionalParticles={3}

                  // onNodeClick={node=> }
                  // nodeColor={(node) =>
                  //   highlightedNodes.includes(node) ? "red" : undefined
                  // }
                />

                {/* <Graph
                  graph={graphData}
                  options={options}
                  events={events}
                  getNetwork={(network) => {
                    //  if you want access to vis.js network api you can set the state in a parent component using this property
                    // network.on("click", function () {
                    //   network.fit();
                    //   // network.collapse();
                    // });
                  }}
                /> */}
                {/* {nodeInfo && (
                  <div className="absolute top-2 left-2 p-2 bg-secondary  rounded-lg">
                    <p className="text-white">
                      {nodeInfo.id} : {nodeInfo.club}
                    </p>
                  </div>
                )} */}
              </>
            ) : (
              <>
                <Badge variant={"secondary"} className="animate-pulse ">
                  Stabilising Graph
                </Badge>
                {/* <Skeleton className="h-10 w-10 rounded-full bg-secondary" />
                <Skeleton className="h-10 w-10 rounded-full bg-secondary absolute bottom-4/5 left-2/3" />
                <Skeleton className="h-10 w-10 rounded-full bg-secondary absolute top-1/3 right-1/3" />
                <Skeleton className="h-10 w-10 rounded-full bg-secondary absolute top-1/4 right-1/2" />
                <Skeleton className="h-10 w-10 rounded-full bg-secondary absolute top-2/3 left-1/2" />
                <Skeleton className="h-10 w-10 rounded-full bg-secondary absolute top-1/4 right-1/4" />
                <Skeleton className="h-10 w-10 rounded-full bg-secondary absolute top-3/4 left-3/4" />
                <Skeleton className="h-10 w-10 rounded-full bg-secondary absolute top-4/5 left-4/5" /> */}
              </>
            )}
          </div>
        </Suspense>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default AdminJsonGraph;
