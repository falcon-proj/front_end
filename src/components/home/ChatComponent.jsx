import { Label } from "@radix-ui/react-label";
import { ArrowUp, Loader } from "lucide-react";
import { Textarea } from "../ui/textarea";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@radix-ui/react-tooltip";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import axios from "@/api/axios";
import { useUser } from "@clerk/clerk-react";

export default function ChatComponent() {
  const { user } = useUser();
  const [chatLogs, setChatLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const scrollRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var newChatLogs = [...chatLogs, { type: "user", message: query }];
    setChatLogs(newChatLogs);
    setLoading(true);
    setQuery("");
    const response = await axios.post(
      "/query",
      {
        username: user.username,
        query,
        chatid: user.username + Date.now(),
        date_time: new Date().toISOString().split("T").join(" "),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // if (response.status === 200) {
    //   console.log(response);

    //   setChatLogs([
    //     ...newChatLogs,
    //     { type: "bot", message: response.data.response },
    //   ]);
    // }

    if (response.status === 200) {
      const { response: botResponse, risk } = response.data;
      const messageLines = botResponse.split("\n").map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ));
      if (Object.keys(response.data["High level violations"]).length === 0) {
        setChatLogs([
          ...newChatLogs,
          {
            type: "info",
            message: (
              <>
                <Badge variant="success">No violations found</Badge>
              </>
            ),
          },
          {
            type: "bot",
            message: (
              <>
                {/* <div className="flex items-center gap-2">{violations}</div>
              <Badge variant="destructive" className="mr-1">
                Risk Level: {risk}
              </Badge> */}
                <div>{messageLines}</div>
              </>
            ),
          },
        ]);
        setLoading(false);
        return;
      } else {
        const violations = Object.entries(
          response.data["High level violations"]
        ).map(([category, items]) => {
          console.log(category, items);
          return items.map((item, index) => (
            <div key={item} className="flex flex-col gap-2 flex-wrap justify-evenly">
              <Badge
                key={`${category}-${index}-0`}
                variant="destructive"
                className="ml-0 "
              >
                {category}:
              </Badge>
              <Badge
                key={`${category}-${index}-1`}
                variant="warning"
                className="ml-0"
              >
                {item[0]} [{item[1]}]
              </Badge>
            </div>
          ));
        });
        setChatLogs([
          ...newChatLogs,
          {
            type: "info",
            message: (
              <>
                <div className="flex items-center gap-2 mb-2">{violations}</div>
                <Badge variant="destructive">Risk Level: {risk}</Badge>
              </>
            ),
          },
          {
            type: "bot",
            message: (
              <>
                {/* <div className="flex items-center gap-2">{violations}</div>
              <Badge variant="destructive" className="mr-1">
                Risk Level: {risk}
              </Badge> */}
                <div>{messageLines}</div>
              </>
            ),
          },
        ]);
      }
    }
    setLoading(false);
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatLogs]);

  return (
    <div className="flex flex-col">
      <main className=" flex-1 gap-4 justify-center items-center  overflow-auto p-4 md:grid-cols-2 lg:grid-cols-2 ">
        <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/40 p-4 lg:col-span-2 ">
          {/* show the messages here */}
          {/* <Suspense
            fallback={<Badge className="animate-pulse">Loading...</Badge>}
          > */}
          <ScrollArea className="h-[75vh]  no-scrollbar">
            <div className="flex flex-col gap-3 p-3 overflow-y-scroll  no-scrollbar">
              {chatLogs.length === 0 && (
                <div className="flex flex-col justify-center items-center gap-4">
                  <p className="text-4xl text-center">
                    EthiCheck.<span className="text-primary">AI</span>
                  </p>
                  <p className="text-xl">
                    Keeping Conversational AI Chats Ethical
                  </p>
                  <Badge variant="secondary">No messages yet</Badge>
                </div>
              )}

              {chatLogs.map((log, index) => (
                <div
                  key={index}
                  className={`flex gap-1 items-center mx-auto w-11/12 2xl:w-4/5`}
                >
                  {/* <Badge variant="outline" className="text-xs">
                    {user.username}
                  </Badge> */}

                  <div
                    className={`px-2 py-1  rounded-lg text-sm ${
                      log.type === "user"
                        ? " text-white mt-5 w-full bg-primary"
                        : log.type === "info"
                        ? " w-full"
                        : "bg-secondary w-full"
                    }`}
                  >
                    <span className="font-bold">
                      {log.type === "user"
                        ? "You: "
                        : log.type === "info"
                        ? "EthiCheck.AI: "
                        : "Bot: "}
                    </span>
                    <br />
                    {/* {log.type === "user"
                      ? `${user.username}-${log.message}`
                      : `EthiCheck.AI-${log.message}`} */}

                    {log.message}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-center">
                  <Badge variant="outline" className="animate-pulse">
                    EthiCheck.AI is checking your query and responding back...
                  </Badge>
                </div>
              )}
            </div>
            <div ref={scrollRef}></div>
          </ScrollArea>
          {/* </Suspense> */}
          <form className="p-2 absolute bottom-3 w-11/12 2xl:w-4/5  mx-auto left-1 right-1 overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
            <Label htmlFor="message" className="sr-only">
              Message
            </Label>
            <Textarea
              id="message"
              value={query}
              disabled={loading}
              // focus={!loading}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Type your message here..."
              className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center p-3 pt-0">
              {/* <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <ImageIcon className="size-4" />
                      <span className="sr-only">Attach Image</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Attach Image</TooltipContent>
                </Tooltip>
              </TooltipProvider> */}
              <Button
                type="submit"
                size="sm"
                className="ml-auto gap-1.5"
                onClick={handleSubmit}
                disabled={loading || query === ""}
              >
                {loading ? (
                  <Loader className="size-3.5 animate-spin" />
                ) : (
                  <ArrowUp className="size-3.5" />
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
