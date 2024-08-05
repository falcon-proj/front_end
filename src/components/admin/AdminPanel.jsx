import { Suspense } from "react";
import AsideSection from "../AsideSection";

import AdminContent from "./AdminContent";
import { ScatterChart } from "lucide-react";
import { Badge } from "../ui/badge";

export default function AdminPanel() {
  return (
    <div className="grid h-screen w-full pl-[143px]  no-scrollbar">
      <Suspense fallback={<Badge className="animate-pulse">Loading...</Badge>}>
        <AsideSection
          componentName={"Panel"}
          icon={<ScatterChart className="size-5" />}
        />
      </Suspense>
      {/* <Suspense
        fallback={
          <>
            <Badge className="animate-pulse">Loading...</Badge>
          </>
        }
      > */}
      <AdminContent />
      {/* </Suspense> */}
    </div>
  );
}
