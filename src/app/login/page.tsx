"use client";
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
import Link from "next/link";
import { GrGoogle } from "react-icons/gr";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useState, FormEvent, ChangeEvent } from "react";
import PasswordChecklist from "@/components/PasswordChecklist";

export default function SignInPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const target = e.currentTarget;
    const email = (target.elements.namedItem("email") as HTMLInputElement).value;
    const passwordInputValue = (target.elements.namedItem("password") as HTMLInputElement).value;

    const { error } = await authClient.signIn.email({
      email,
      password: passwordInputValue,
      callbackURL: "/",
    });

    if (error) {
      setErrorMessage("Invalid email or password. Please try again.");
    } else {
      toast.success("Login Successfully", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
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
        <ToastContainer />

        <h1 className="text-center text-lg sm:text-2xl font-bold mb-4 bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 bg-clip-text text-transparent">
          Login Page
        </h1>

        <Form
          className="flex flex-col gap-4"
          onSubmit={onSubmit}
          onReset={() => {
            setPassword("");
            setErrorMessage("");
          }}
        >
          {errorMessage && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50/90 px-4 py-3 text-center text-xs font-medium text-rose-600 shadow-sm sm:text-sm">
              {errorMessage}
            </div>
          )}

          <TextField isRequired name="email" type="email">
            <Label className="text-sm font-medium text-slate-700 sm:text-base">
              Email
            </Label>
            <Input
              placeholder="john@example.com"
              className="h-11 rounded-2xl border border-slate-200 bg-white/85 text-sm text-slate-900 shadow-sm transition duration-200 placeholder:text-slate-400 hover:border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 sm:h-12"
            />
            <FieldError />
          </TextField>

          <TextField isRequired minLength={8} name="password" type="password">
            <Label className="text-sm font-medium text-slate-700 sm:text-base">
              Password
            </Label>
            <Input
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              className="h-11 rounded-2xl border border-slate-200 bg-white/85 text-sm text-slate-900 shadow-sm transition duration-200 placeholder:text-slate-400 hover:border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 sm:h-12"
            />
            <PasswordChecklist password={password} />
            <FieldError />
          </TextField>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <Button
              type="submit"
              className="group h-11 w-full rounded-2xl bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-500 hover:via-emerald-400 hover:to-lime-400 hover:shadow-xl hover:shadow-emerald-500/25 sm:h-12"
            >
              LogIn
            </Button>

            <Button
              type="reset"
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white/80 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 sm:h-12"
            >
              Reset
            </Button>
          </div>
        </Form>

        <div className="mt-7 flex flex-col items-center gap-4">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400 sm:text-sm">
            Or
          </p>

          <Button
            onClick={handleGoogleSignIn}
            className="h-11 w-full rounded-2xl border border-slate-200 bg-white/80 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/70 hover:text-slate-900 sm:h-12"
          >
            <GrGoogle className="text-base" />
            Sign in with Google
          </Button>

          <p className="text-center text-xs text-slate-500 sm:text-sm">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-emerald-700 transition-colors hover:text-emerald-600"
            >
              Register
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}