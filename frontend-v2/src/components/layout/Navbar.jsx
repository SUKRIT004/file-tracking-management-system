import { Bell, UserCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function Navbar() {

  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "User";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-white border-b h-16 flex justify-between items-center px-8">

      <h2 className="text-2xl font-semibold">
        File Tracking System
      </h2>

      <div className="flex items-center gap-6">

        <Bell />

        <div className="flex items-center gap-2">
          <UserCircle size={30} />
          <span>{username}</span>
        </div>

        <Button
          variant="destructive"
          onClick={logout}
          className="flex items-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </Button>

      </div>

    </header>
  );
}