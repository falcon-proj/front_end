import { SquareTerminal } from "lucide-react";
import AsideSection from "../AsideSection";
import ChatComponent from "./ChatComponent";
import { Suspense } from "react";
import { Badge } from "../ui/badge";

export default function UserHomePage() {
  return (
    <div className="grid h-screen w-full pl-[143px] no-scrollbar">
      <AsideSection
        componentName={"Chat Area"}
        icon={<SquareTerminal className="size-5" />}
      />
      <Suspense
        fallback={
          <>
            <Badge className="animate-pulse flex-1">Loading...</Badge>
          </>
        }
      >
        <ChatComponent />
      </Suspense>
    </div>
  );
}
