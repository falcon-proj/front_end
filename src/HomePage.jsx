import UserHomePage from "./components/home/UserHomePage";
import AdminPanel from "./components/admin/AdminPanel";
import { useUser } from "@clerk/clerk-react";

export default function HomePage() {
  const { user } = useUser();
  return <>{user.username === "admin" ? <AdminPanel /> : <UserHomePage />}</>;
}
