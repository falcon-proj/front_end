import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn } from "@clerk/clerk-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const [admin, setAdmin] = useState(false);
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: username,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
      navigate("/");
    } catch (err) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const handleSecretAdminCodeComplete = () => {
    if (code !== "123") {
      alert("Invalid code");
      setCode("");
    }
  };
  // };

  return (
    <section className="flex justify-center items-center h-screen flex-col gap-4">
      <p className="text-4xl">
        EthiCheck.<span className="text-primary">AI</span>
      </p>
      <p className="text-sm"> Keeping Conversational AI Chats Ethical</p>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            <span className="flex justify-between gap-4 items-center">
              Login
            </span>
          </CardTitle>
          <CardDescription>
            Enter your username below to login to your account.
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

          <div className="grid gap-2">
            <Label htmlFor="password">
              Secret Code (optional fill it if you are an admin)
            </Label>
            <InputOTP
              maxLength={3}
              value={code}
              onChange={(val) => setCode(val)}
              onComplete={handleSecretAdminCodeComplete}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleSignIn}
            disabled={username === "admin" && code !== "123"}
          >
            {loading ? "Loading..." : "Sign in"}
          </Button>
        </CardFooter>
      </Card>
      <span className="flex gap-3">
        Do not have an account?
        <Link to={"/register"} className="text-primary">
          Create an account
        </Link>
      </span>
    </section>
  );
}
