import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /*useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]); */

  const login = async () => {
    try {

      const res = await api.post("/users/login", {
        username,
        password,
      });

      localStorage.setItem(
        "token",
        res.data.access_token
      );

      localStorage.setItem(
        "username",
        res.data.username
      );

      localStorage.setItem(
        "role",
        res.data.role
      );

      navigate("/");

    } catch {

      alert("Invalid Username or Password");

    }
  };

  return (

    <div className="flex justify-center items-center h-screen bg-slate-100">

      <Card className="w-[400px] shadow-lg">

        <CardHeader>

          <CardTitle className="text-center text-2xl">
            File Tracker Login
          </CardTitle>

        </CardHeader>

        <CardContent className="space-y-4">

          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            className="w-full"
            onClick={login}
          >
            Login
          </Button>

        </CardContent>

      </Card>

    </div>

  );
}
