"use client";

import { Check } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { GrGoogle } from "react-icons/gr";
import Link from "next/link";
import { useState, FormEvent, ChangeEvent } from "react";
import PasswordChecklist from "@/components/PasswordChecklist";

export default function SignUpPage() {
  const router = useRouter();

  const [message, setMessage] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setErrorMsg("");

    const target = e.currentTarget;
    const name = (target.elements.namedItem("name") as HTMLInputElement).value;
    const image = (target.elements.namedItem("image") as HTMLInputElement).value;
    const email = (target.elements.namedItem("email") as HTMLInputElement).value;
    const passwordInputValue = (target.elements.namedItem("password") as HTMLInputElement).value;

    const { error } = await authClient.signUp.email({
      name,
      image,
      email,
      password: passwordInputValue,
      autoSignIn: true,
    });

    if (error) {
      setErrorMsg(error.message || "Registration failed!");
      return;
    }

    await authClient.signOut();

    setMessage("Registration successful..!");

    target.reset();
    setPassword("");

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  const handleGoogleSignIn = async (): Promise<void> => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 lg:mt-4 flex justify-center mb-10">
      
      <Card className="border w-full max-w-md sm:max-w-lg py-6 sm:py-8 md:py-10 px-4 sm:px-6 rounded-xl shadow-sm">
        
        <h1 className="text-center text-lg sm:text-2xl font-bold mb-4 bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 bg-clip-text text-transparent">
          Registration Page
        </h1>

        {message && (
          <div className="mb-4 p-3 rounded-md bg-green-100 text-green-700 text-xs sm:text-sm text-center">
            {message}
          </div>
        )}

        {errorMsg && (
          <div className="mb-4 p-3 rounded-md bg-red-100 text-red-700 text-xs sm:text-sm text-center">
            {errorMsg}
          </div>
        )}

        <Form
          className="flex flex-col gap-4"
          onSubmit={onSubmit}
          onReset={() => {
            setPassword("");
            setMessage("");
            setErrorMsg("");
          }}
        >
          
          <TextField isRequired name="name">
            <Label className="text-sm sm:text-base">Name</Label>
            <Input placeholder="Enter your name" className="h-10 sm:h-11 text-sm" />
            <FieldError />
          </TextField>

          <TextField isRequired name="image">
            <Label className="text-sm sm:text-base">Image URL</Label>
            <Input placeholder="Image URL" className="h-10 sm:h-11 text-sm" />
            <FieldError />
          </TextField>

          <TextField isRequired name="email">
            <Label className="text-sm sm:text-base">Email</Label>
            <Input placeholder="john@example.com" className="h-10 sm:h-11 text-sm" />
            <FieldError />
          </TextField>

          <TextField isRequired name="password" type="password">
            <Label className="text-sm sm:text-base">Password</Label>
            <Input
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              className="h-10 sm:h-11 text-sm"
            />
            <PasswordChecklist password={password} />
            <FieldError />
          </TextField>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button type="submit" className="w-full h-10 sm:h-11 text-sm bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 text-white font-semibold shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/25">
              <Check />
              Register
            </Button>

            <Button type="reset" className="w-full h-10 sm:h-11 text-sm">
              Reset
            </Button>
          </div>
        </Form>

        <div className="mt-6 flex flex-col items-center gap-4">
          <p className="text-slate-400 text-xs sm:text-sm">Or</p>

          <Button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 h-10 sm:h-11 text-sm border border-slate-200 bg-white/80 hover:border-emerald-200 hover:bg-emerald-50/70"
          >
            <GrGoogle />
            Sign in with Google
          </Button>

          <p className="text-center text-xs sm:text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 font-bold">
              Login
            </Link>
          </p>
        </div>

      </Card>
    </div>
  );
}