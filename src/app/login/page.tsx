// "use client";
// import { authClient } from "@/lib/auth-client";
// import {
//   Button,
//   Card,
//   Form,
//   Input,
//   Label,
//   TextField,
//   FieldError,
// } from "@heroui/react";
// import Link from "next/link";
// import { GrGoogle } from "react-icons/gr";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useRouter } from "next/navigation";
// import { useState, FormEvent, ChangeEvent } from "react";
// import PasswordChecklist from "@/components/PasswordChecklist";

// export default function SignInPage() {
//   const router = useRouter();
//   const [errorMessage, setErrorMessage] = useState<string>("");
//   const [password, setPassword] = useState<string>("");

//   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setErrorMessage("");

//     const target = e.currentTarget;
//     const email = (target.elements.namedItem("email") as HTMLInputElement).value;
//     const passwordInputValue = (target.elements.namedItem("password") as HTMLInputElement).value;

//     const { error } = await authClient.signIn.email({
//       email,
//       password: passwordInputValue,
//       callbackURL: "/",
//     });

//     if (error) {
//       setErrorMessage("Invalid email or password. Please try again.");
//     } else {
//       toast.success("Login Successfully", {
//         position: "top-right",
//         autoClose: 2000,
//       });

//       setTimeout(() => {
//         router.push("/");
//       }, 1000);
//     }
//   };

//   const handleGoogleSignIn = async (): Promise<void> => {
//     await authClient.signIn.social({
//       provider: "google",
//     });
//   };

//   const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setPassword(event.target.value);
//   };

//   return (
//     <div className="w-full px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6 lg:mt-4 flex justify-center mb-10">
//       <Card className="border w-full max-w-md sm:max-w-lg py-6 sm:py-8 md:py-10 px-4 sm:px-6 rounded-xl shadow-sm">
//         <ToastContainer />

//         <h1 className="text-center text-lg sm:text-2xl font-bold mb-4 bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 bg-clip-text text-transparent">
//           Login Page
//         </h1>

//         <Form
//           className="flex flex-col gap-4"
//           onSubmit={onSubmit}
//           onReset={() => {
//             setPassword("");
//             setErrorMessage("");
//           }}
//         >
//           {errorMessage && (
//             <div className="rounded-2xl border border-rose-200 bg-rose-50/90 px-4 py-3 text-center text-xs font-medium text-rose-600 shadow-sm sm:text-sm">
//               {errorMessage}
//             </div>
//           )}

//           <TextField isRequired name="email" type="email">
//             <Label className="text-sm font-medium text-slate-700 sm:text-base">
//               Email
//             </Label>
//             <Input
//               placeholder="john@example.com"
//               className="h-11 rounded-2xl border border-slate-200 bg-white/85 text-sm text-slate-900 shadow-sm transition duration-200 placeholder:text-slate-400 hover:border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 sm:h-12"
//             />
//             <FieldError />
//           </TextField>

//           <TextField isRequired minLength={8} name="password" type="password">
//             <Label className="text-sm font-medium text-slate-700 sm:text-base">
//               Password
//             </Label>
//             <Input
//               placeholder="Enter your password"
//               value={password}
//               onChange={handlePasswordChange}
//               className="h-11 rounded-2xl border border-slate-200 bg-white/85 text-sm text-slate-900 shadow-sm transition duration-200 placeholder:text-slate-400 hover:border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 sm:h-12"
//             />
//             <PasswordChecklist password={password} />
//             <FieldError />
//           </TextField>

//           <div className="flex flex-col gap-3 pt-1 sm:flex-row">
//             <Button
//               type="submit"
//               className="group h-11 w-full rounded-2xl bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-emerald-500 hover:via-emerald-400 hover:to-lime-400 hover:shadow-xl hover:shadow-emerald-500/25 sm:h-12"
//             >
//               LogIn
//             </Button>

//             <Button
//               type="reset"
//               className="h-11 w-full rounded-2xl border border-slate-200 bg-white/80 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 sm:h-12"
//             >
//               Reset
//             </Button>
//           </div>
//         </Form>

//         <div className="mt-7 flex flex-col items-center gap-4">
//           <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400 sm:text-sm">
//             Or
//           </p>

//           <Button
//             onClick={handleGoogleSignIn}
//             className="h-11 w-full rounded-2xl border border-slate-200 bg-white/80 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/70 hover:text-slate-900 sm:h-12"
//           >
//             <GrGoogle className="text-base" />
//             Sign in with Google
//           </Button>

//           <p className="text-center text-xs text-slate-500 sm:text-sm">
//             Don’t have an account?{" "}
//             <Link
//               href="/signup"
//               className="font-semibold text-emerald-700 transition-colors hover:text-emerald-600"
//             >
//               Register
//             </Link>
//           </p>
//         </div>
//       </Card>
//     </div>
//   );
// }














"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Suspense,
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import {
  FiArrowRight,
  FiCheckCircle,
  FiHeart,
  FiLoader,
  FiLock,
  FiMail,
  FiShield,
  FiUsers,
} from "react-icons/fi";

import { GrGoogle } from "react-icons/gr";

import {
  toast,
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { authClient } from "@/lib/auth-client";

import {
  buildSignupHref,
  getSafeCallbackURL,
} from "@/lib/auth-redirect";

const LoginPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const session = authClient.useSession();

  const callbackURL = getSafeCallbackURL(
    searchParams.get("callbackURL"),
  );

  const registrationCompleted =
    searchParams.get("registered") === "1";

  const signupHref =
    buildSignupHref(callbackURL);

  const [password, setPassword] =
    useState<string>("");

  const [errorMessage, setErrorMessage] =
    useState<string>("");

  const [isSubmitting, setIsSubmitting] =
    useState<boolean>(false);

  const [isGoogleLoading, setIsGoogleLoading] =
    useState<boolean>(false);

  /*
   * A logged-in user should not remain on the login page.
   */
  useEffect(() => {
    if (session.data?.user) {
      router.replace(callbackURL);
    }
  }, [
    callbackURL,
    router,
    session.data?.user,
  ]);

  const completeLogin = () => {
    toast.success("Login successful", {
      position: "top-right",
      autoClose: 1200,
    });

    window.setTimeout(() => {
      router.replace(callbackURL);
      router.refresh();
    }, 500);
  };

  const onSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const form = event.currentTarget;

      const email = (
        form.elements.namedItem(
          "email",
        ) as HTMLInputElement
      ).value.trim();

      const passwordValue = (
        form.elements.namedItem(
          "password",
        ) as HTMLInputElement
      ).value;

      const absoluteCallbackURL = new URL(
        callbackURL,
        window.location.origin,
      ).toString();

      const { error } =
        await authClient.signIn.email({
          email,
          password: passwordValue,
          rememberMe: true,
          callbackURL: absoluteCallbackURL,
        });

      if (error) {
        setErrorMessage(
          error.message ||
            "Invalid email or password. Please try again.",
        );

        return;
      }

      completeLogin();
    } catch {
      setErrorMessage(
        "Something went wrong while signing in. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn =
    async (): Promise<void> => {
      setErrorMessage("");
      setIsGoogleLoading(true);

      try {
        const absoluteCallbackURL = new URL(
          callbackURL,
          window.location.origin,
        ).toString();

        const { error } =
          await authClient.signIn.social({
            provider: "google",
            callbackURL: absoluteCallbackURL,
          });

        if (error) {
          setErrorMessage(
            error.message ||
              "Google sign-in could not be started.",
          );

          setIsGoogleLoading(false);
        }
      } catch {
        setErrorMessage(
          "Google sign-in could not be started. Please try again.",
        );

        setIsGoogleLoading(false);
      }
    };

  const handlePasswordChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setPassword(event.target.value);
  };

  return (
    <main className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-slate-50 px-4 py-10 dark:bg-[#050706] sm:px-6 sm:py-14 lg:px-8">
      <ToastContainer />

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(16,185,129,0.15),transparent_30%),radial-gradient(circle_at_92%_82%,rgba(14,165,233,0.10),transparent_30%)] dark:bg-[radial-gradient(circle_at_10%_15%,rgba(16,185,129,0.07),transparent_30%),radial-gradient(circle_at_92%_82%,rgba(14,165,233,0.05),transparent_30%)]" />

      <div className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_35px_100px_-55px_rgba(15,23,42,0.55)] dark:border-zinc-800 dark:bg-zinc-950 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left information panel */}
        <section className="relative hidden overflow-hidden bg-linear-to-br from-emerald-800 via-green-700 to-emerald-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-lime-300/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -right-20 size-80 rounded-full bg-sky-300/15 blur-3xl" />

          <div className="relative">
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <Image
                src="/assets/logo11.png"
                alt="ShareBite logo"
                width={52}
                height={52}
                priority
                className="size-13 rounded-full border-2 border-white/20 object-cover"
              />

              <div>
                <p className="text-2xl font-black">
                  Share
                  <span className="text-lime-300">
                    Bite
                  </span>
                </p>

                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-100/70">
                  Share Food, Share Care
                </p>
              </div>
            </Link>

            <h1 className="mt-12 text-4xl font-black leading-tight">
              Welcome Back to the ShareBite Community
            </h1>

            <p className="mt-5 max-w-md text-sm font-medium leading-8 text-emerald-50/80">
              Sign in to share safe surplus food,
              request available food and manage your
              community contributions.
            </p>

            <div className="mt-9 space-y-5">
              <div className="flex items-start gap-4">
                <FiHeart className="mt-1 shrink-0 text-xl text-lime-300" />

                <div>
                  <h2 className="font-black">
                    Reduce Food Waste
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-emerald-50/70">
                    Help good food reach another table.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FiShield className="mt-1 shrink-0 text-xl text-sky-300" />

                <div>
                  <h2 className="font-black">
                    Responsible Sharing
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-emerald-50/70">
                    Provide accurate food and pickup
                    information.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FiUsers className="mt-1 shrink-0 text-xl text-violet-300" />

                <div>
                  <h2 className="font-black">
                    Community Connection
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-emerald-50/70">
                    Connect local food owners and
                    requesters.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="relative mt-12 text-xs font-medium text-emerald-100/60">
            Safe sharing starts with honest information
            and respectful communication.
          </p>
        </section>

        {/* Login form */}
        <section className="flex items-center justify-center p-5 sm:p-8 lg:p-12">
          <Card className="w-full max-w-lg border-0 bg-transparent p-0 shadow-none">
            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-3 lg:hidden"
              >
                <Image
                  src="/assets/logo11.png"
                  alt="ShareBite logo"
                  width={48}
                  height={48}
                  priority
                  className="size-12 rounded-full object-cover"
                />

                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  Share
                  <span className="text-emerald-600 dark:text-emerald-400">
                    Bite
                  </span>
                </p>
              </Link>

              <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400 lg:mt-0">
                Account Access
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                Sign In to ShareBite
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                Enter your account information to
                continue.
              </p>
            </div>

            {registrationCompleted && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700 dark:border-emerald-900/70 dark:bg-emerald-950/30 dark:text-emerald-400">
                <FiCheckCircle className="mt-0.5 shrink-0 text-lg" />

                <p className="text-sm font-semibold leading-6">
                  Registration completed successfully.
                  Sign in to continue to your previous
                  page.
                </p>
              </div>
            )}

            {callbackURL !== "/" && (
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sky-700 dark:border-sky-900/70 dark:bg-sky-950/30 dark:text-sky-400">
                <FiArrowRight className="mt-0.5 shrink-0 text-lg" />

                <p className="text-sm font-semibold leading-6">
                  After login, you will automatically
                  return to the page you were visiting.
                </p>
              </div>
            )}

            {errorMessage && (
              <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-center text-sm font-semibold text-rose-700 dark:border-rose-900/70 dark:bg-rose-950/30 dark:text-rose-400">
                {errorMessage}
              </div>
            )}

            <Form
              className="mt-7 flex flex-col gap-5"
              onSubmit={onSubmit}
              onReset={() => {
                setPassword("");
                setErrorMessage("");
              }}
            >
              <TextField
                isRequired
                name="email"
                type="email"
              >
                <Label className="text-sm font-bold text-slate-700 dark:text-zinc-300">
                  Email Address
                </Label>

                <div className="relative mt-2">
                  <FiMail className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />

                  <Input
                    placeholder="john@example.com"
                    autoComplete="email"
                    className="h-12 w-full rounded-2xl border border-slate-300 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-600 dark:hover:border-emerald-800 dark:focus:border-emerald-500 dark:focus:ring-emerald-950"
                  />
                </div>

                <FieldError />
              </TextField>

              <TextField
                isRequired
                minLength={8}
                name="password"
                type="password"
              >
                <Label className="text-sm font-bold text-slate-700 dark:text-zinc-300">
                  Password
                </Label>

                <div className="relative mt-2">
                  <FiLock className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />

                  <Input
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="h-12 w-full rounded-2xl border border-slate-300 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-600 dark:hover:border-emerald-800 dark:focus:border-emerald-500 dark:focus:ring-emerald-950"
                  />
                </div>

                <FieldError />
              </TextField>

              <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
                <Button
                  type="submit"
                  isDisabled={
                    isSubmitting || isGoogleLoading
                  }
                  className="group h-12 w-full rounded-2xl bg-linear-to-r from-emerald-700 via-green-600 to-lime-500 font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-0.5 hover:shadow-xl dark:from-emerald-500 dark:via-green-500 dark:to-lime-400 dark:text-emerald-950"
                >
                  {isSubmitting ? (
                    <>
                      <FiLoader className="animate-spin" />
                      Signing In
                    </>
                  ) : (
                    <>
                      Sign In
                      <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>

                <Button
                  type="reset"
                  isDisabled={
                    isSubmitting || isGoogleLoading
                  }
                  className="h-12 w-full rounded-2xl border border-slate-300 bg-white font-bold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
                >
                  Reset
                </Button>
              </div>
            </Form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200 dark:bg-zinc-800" />

              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-slate-400 dark:text-zinc-600">
                Or
              </span>

              <div className="h-px flex-1 bg-slate-200 dark:bg-zinc-800" />
            </div>

            <Button
              type="button"
              isDisabled={
                isSubmitting || isGoogleLoading
              }
              onPress={handleGoogleSignIn}
              className="h-12 w-full rounded-2xl border border-slate-300 bg-white font-bold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-emerald-800 dark:hover:bg-emerald-950/25"
            >
              {isGoogleLoading ? (
                <FiLoader className="animate-spin" />
              ) : (
                <GrGoogle className="text-lg" />
              )}

              Continue with Google
            </Button>

            <p className="mt-7 text-center text-sm font-medium text-slate-500 dark:text-zinc-400">
              Don&apos;t have an account?{" "}
              <Link
                href={signupHref}
                className="font-extrabold text-emerald-700 transition-colors hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                Create an account
              </Link>
            </p>
          </Card>
        </section>
      </div>
    </main>
  );
};

const LoginPageFallback = () => {
  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-slate-50 dark:bg-[#050706]">
      <div className="flex items-center gap-3 text-sm font-bold text-emerald-700 dark:text-emerald-400">
        <FiLoader className="animate-spin text-xl" />
        Loading login page...
      </div>
    </main>
  );
};

export default function SignInPage() {
  return (
    <Suspense fallback={<LoginPageFallback />}>
      <LoginPageContent />
    </Suspense>
  );
}