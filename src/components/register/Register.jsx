import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignUp } from "@clerk/clerk-react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleRegister = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        username,
        password,
      });

      await setActive({ session: signUp.createdSessionId });
      navigate("/");
    } catch (err) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center h-screen flex-col gap-4">
      <p className="text-4xl">
        {" "}
        EthiCheck.<span className="text-primary">AI</span>
      </p>
      <p className="text-sm"> Keeping Conversational AI Chats Ethical</p>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your username below to register.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="username"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleRegister}>
            {loading ? "Loading..." : "Register"}
          </Button>
        </CardFooter>
      </Card>
      <span className="flex gap-3">
        Already have an account?
        <Link to={"/"} className="text-primary">
          Sign in to your account
        </Link>
      </span>
    </section>
  );
}
