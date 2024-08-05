import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./components/login/Login";
import HomePage from "./HomePage";
import Register from "./components/register/Register";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Toaster } from "./components/ui/toaster";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <>
            <SignedIn>
              <HomePage />
            </SignedIn>
            <SignedOut>
              <Login />
            </SignedOut>
          </>
        }
      />
    </>
  )
);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
