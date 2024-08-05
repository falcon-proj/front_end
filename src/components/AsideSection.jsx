/* eslint-disable react/prop-types */
import { useRef } from "react";
import { Bot, SquareUser } from "lucide-react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AsideSection({ componentName, icon }) {
  const { signOut } = useAuth();
  const { user } = useUser();

  const aboutBtnRef = useRef(null);
  return (
    <>
      <aside className="inset-y fixed  left-0 z-20 flex w-36 h-full flex-col border-r">
        <div className="border-b p-2">
          <p className="text-lg flex justify-center items-center">
            EthiCheck.
            <span className="text-primary flex justify-center items-center text-2xl">
              AI
            </span>
          </p>
        </div>
        <nav className="grid gap-1 p-2 ">
          <Button
            variant="ghost"
            className="rounded-lg bg-muted"
            aria-label="Playground"
          >
            <span className="flex justify-around gap-3 items-center">
              {icon}
              {componentName}
            </span>
          </Button>

          <Button
            variant="ghost"
            onClick={() => aboutBtnRef.current.click()}
            className="rounded-lg"
            aria-label="About"
          >
            <span className="flex justify-around gap-3 items-center">
              <Bot className="size-5" />
              About Us
            </span>
          </Button>
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  // size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Sign Out"
                  onClick={() => signOut()}
                >
                  <span className="flex justify-around gap-3 items-center">
                    <SquareUser className="size-5" />
                    {user.username}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Sign Out
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>

      {/* just to show the about us in a dialog form  */}
      <>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="hidden" ref={aboutBtnRef} />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>About EthiCheck.AI</AlertDialogTitle>
              <AlertDialogDescription>
                Keeping Conversational AI Chats Ethical & Building trust in AI
                by ensuring ethical and safe adoption of AI in organizations
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    </>
  );
}
