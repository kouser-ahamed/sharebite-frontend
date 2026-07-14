// "use client";

// import { Check } from "@gravity-ui/icons";
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
// import { useRouter } from "next/navigation";
// import { GrGoogle } from "react-icons/gr";
// import Link from "next/link";
// import { useState, FormEvent, ChangeEvent } from "react";
// import PasswordChecklist from "@/components/PasswordChecklist";

// export default function SignUpPage() {
//   const router = useRouter();

//   const [message, setMessage] = useState<string>("");
//   const [errorMsg, setErrorMsg] = useState<string>("");
//   const [password, setPassword] = useState<string>("");

//   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setMessage("");
//     setErrorMsg("");

//     const target = e.currentTarget;
//     const name = (target.elements.namedItem("name") as HTMLInputElement).value;
//     const image = (target.elements.namedItem("image") as HTMLInputElement).value;
//     const email = (target.elements.namedItem("email") as HTMLInputElement).value;
//     const passwordInputValue = (target.elements.namedItem("password") as HTMLInputElement).value;

//     const { error } = await authClient.signUp.email({
//       name,
//       image,
//       email,
//       password: passwordInputValue,
//       autoSignIn: true,
//     });

//     if (error) {
//       setErrorMsg(error.message || "Registration failed!");
//       return;
//     }

//     await authClient.signOut();

//     setMessage("Registration successful..!");

//     target.reset();
//     setPassword("");

//     setTimeout(() => {
//       router.push("/login");
//     }, 1500);
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
        
//         <h1 className="text-center text-lg sm:text-2xl font-bold mb-4 bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 bg-clip-text text-transparent">
//           Registration Page
//         </h1>

//         {message && (
//           <div className="mb-4 p-3 rounded-md bg-green-100 text-green-700 text-xs sm:text-sm text-center">
//             {message}
//           </div>
//         )}

//         {errorMsg && (
//           <div className="mb-4 p-3 rounded-md bg-red-100 text-red-700 text-xs sm:text-sm text-center">
//             {errorMsg}
//           </div>
//         )}

//         <Form
//           className="flex flex-col gap-4"
//           onSubmit={onSubmit}
//           onReset={() => {
//             setPassword("");
//             setMessage("");
//             setErrorMsg("");
//           }}
//         >
          
//           <TextField isRequired name="name">
//             <Label className="text-sm sm:text-base">Name</Label>
//             <Input placeholder="Enter your name" className="h-10 sm:h-11 text-sm" />
//             <FieldError />
//           </TextField>

//           <TextField isRequired name="image">
//             <Label className="text-sm sm:text-base">Image URL</Label>
//             <Input placeholder="Image URL" className="h-10 sm:h-11 text-sm" />
//             <FieldError />
//           </TextField>

//           <TextField isRequired name="email">
//             <Label className="text-sm sm:text-base">Email</Label>
//             <Input placeholder="john@example.com" className="h-10 sm:h-11 text-sm" />
//             <FieldError />
//           </TextField>

//           <TextField isRequired name="password" type="password">
//             <Label className="text-sm sm:text-base">Password</Label>
//             <Input
//               placeholder="Enter password"
//               value={password}
//               onChange={handlePasswordChange}
//               className="h-10 sm:h-11 text-sm"
//             />
//             <PasswordChecklist password={password} />
//             <FieldError />
//           </TextField>

//           <div className="flex flex-col sm:flex-row gap-2">
//             <Button type="submit" className="w-full h-10 sm:h-11 text-sm bg-linear-to-r from-emerald-600 via-emerald-500 to-lime-500 text-white font-semibold shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/25">
//               <Check />
//               Register
//             </Button>

//             <Button type="reset" className="w-full h-10 sm:h-11 text-sm">
//               Reset
//             </Button>
//           </div>
//         </Form>

//         <div className="mt-6 flex flex-col items-center gap-4">
//           <p className="text-slate-400 text-xs sm:text-sm">Or</p>

//           <Button
//             onClick={handleGoogleSignIn}
//             className="w-full flex items-center justify-center gap-2 h-10 sm:h-11 text-sm border border-slate-200 bg-white/80 hover:border-emerald-200 hover:bg-emerald-50/70"
//           >
//             <GrGoogle />
//             Sign in with Google
//           </Button>

//           <p className="text-center text-xs sm:text-sm">
//             Already have an account?{" "}
//             <Link href="/login" className="text-indigo-600 font-bold">
//               Login
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
  FiImage,
  FiLoader,
  FiLock,
  FiMail,
  FiShield,
  FiUser,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";

import { GrGoogle } from "react-icons/gr";

import {
  toast,
  ToastContainer,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import PasswordChecklist from "@/components/PasswordChecklist";

import { authClient } from "@/lib/auth-client";

import {
  buildLoginHref,
  getSafeCallbackURL,
} from "@/lib/auth-redirect";

const SignupPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const session = authClient.useSession();

  const callbackURL = getSafeCallbackURL(
    searchParams.get("callbackURL"),
  );

  const loginHref = buildLoginHref(callbackURL);

  const [password, setPassword] =
    useState<string>("");

  const [errorMessage, setErrorMessage] =
    useState<string>("");

  const [isSubmitting, setIsSubmitting] =
    useState<boolean>(false);

  const [isGoogleLoading, setIsGoogleLoading] =
    useState<boolean>(false);

  useEffect(() => {
    if (session.data?.user) {
      router.replace(callbackURL);
    }
  }, [
    callbackURL,
    router,
    session.data?.user,
  ]);

  const onSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setErrorMessage("");

    const form = event.currentTarget;

    const name = (
      form.elements.namedItem(
        "name",
      ) as HTMLInputElement
    ).value.trim();

    const image = (
      form.elements.namedItem(
        "image",
      ) as HTMLInputElement
    ).value.trim();

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

    if (name.length < 2) {
      setErrorMessage(
        "Please enter a valid full name.",
      );

      return;
    }

    if (passwordValue.length < 8) {
      setErrorMessage(
        "Password must contain at least 8 characters.",
      );

      return;
    }

    setIsSubmitting(true);

    try {
      const { error } =
        await authClient.signUp.email({
          name,
          email,
          password: passwordValue,
          image: image || undefined,
        });

      if (error) {
        setErrorMessage(
          error.message ||
            "Registration failed. Please try again.",
        );

        return;
      }

      /*
       * Better Auth may automatically create a session
       * after email registration. We sign out because the
       * requested flow is:
       *
       * Register -> Login -> original callback page.
       */
      try {
        await authClient.signOut();
      } catch {
        // No action is needed when no active session exists.
      }

      toast.success(
        "Registration successful. Please sign in.",
        {
          position: "top-right",
          autoClose: 1200,
        },
      );

      form.reset();
      setPassword("");

      const loginURL = new URL(
        loginHref,
        window.location.origin,
      );

      loginURL.searchParams.set(
        "registered",
        "1",
      );

      window.setTimeout(() => {
        router.replace(
          `${loginURL.pathname}${loginURL.search}`,
        );
      }, 700);
    } catch {
      setErrorMessage(
        "Something went wrong during registration. Please try again.",
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
              "Google registration could not be started.",
          );

          setIsGoogleLoading(false);
        }
      } catch {
        setErrorMessage(
          "Google registration could not be started. Please try again.",
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

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(16,185,129,0.15),transparent_30%),radial-gradient(circle_at_92%_82%,rgba(139,92,246,0.10),transparent_30%)] dark:bg-[radial-gradient(circle_at_10%_15%,rgba(16,185,129,0.07),transparent_30%),radial-gradient(circle_at_92%_82%,rgba(139,92,246,0.05),transparent_30%)]" />

      <div className="relative mx-auto grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_35px_100px_-55px_rgba(15,23,42,0.55)] dark:border-zinc-800 dark:bg-zinc-950 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left information panel */}
        <section className="relative hidden overflow-hidden bg-linear-to-br from-emerald-800 via-green-700 to-emerald-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-lime-300/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -right-20 size-80 rounded-full bg-violet-300/15 blur-3xl" />

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
              Join a Community That Values Good Food
            </h1>

            <p className="mt-5 max-w-md text-sm font-medium leading-8 text-emerald-50/80">
              Create your ShareBite account to share
              safe surplus food, request available
              items and support responsible community
              action.
            </p>

            <div className="mt-9 space-y-5">
              <div className="flex items-start gap-4">
                <FiHeart className="mt-1 shrink-0 text-xl text-lime-300" />

                <div>
                  <h2 className="font-black">
                    Make a Positive Impact
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-emerald-50/70">
                    Prevent suitable food from becoming
                    waste.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FiShield className="mt-1 shrink-0 text-xl text-sky-300" />

                <div>
                  <h2 className="font-black">
                    Share Responsibly
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-emerald-50/70">
                    Add accurate preparation, expiry
                    and pickup details.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FiUsers className="mt-1 shrink-0 text-xl text-violet-300" />

                <div>
                  <h2 className="font-black">
                    Connect Locally
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-emerald-50/70">
                    Build respectful connections in
                    your community.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="relative mt-12 text-xs font-medium text-emerald-100/60">
            Registration is free and helps keep food
            posts and requests connected to real users.
          </p>
        </section>

        {/* Registration form */}
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
                Create Your Account
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                Join ShareBite
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm font-medium leading-7 text-slate-600 dark:text-zinc-400">
                Register now and sign in to continue
                to your previous page.
              </p>
            </div>

            {callbackURL !== "/" && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sky-700 dark:border-sky-900/70 dark:bg-sky-950/30 dark:text-sky-400">
                <FiArrowRight className="mt-0.5 shrink-0 text-lg" />

                <p className="text-sm font-semibold leading-6">
                  Your previous page has been saved.
                  After registration, sign in to return
                  there.
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
                name="name"
                type="text"
              >
                <Label className="text-sm font-bold text-slate-700 dark:text-zinc-300">
                  Full Name
                </Label>

                <div className="relative mt-2">
                  <FiUser className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />

                  <Input
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className="h-12 w-full rounded-2xl border border-slate-300 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-600 dark:hover:border-emerald-800 dark:focus:border-emerald-500 dark:focus:ring-emerald-950"
                  />
                </div>

                <FieldError />
              </TextField>

              <TextField
                name="image"
                type="url"
              >
                <Label className="text-sm font-bold text-slate-700 dark:text-zinc-300">
                  Profile Image URL{" "}
                  <span className="font-medium text-slate-400 dark:text-zinc-600">
                    (optional)
                  </span>
                </Label>

                <div className="relative mt-2">
                  <FiImage className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />

                  <Input
                    placeholder="https://example.com/image.jpg"
                    autoComplete="photo"
                    className="h-12 w-full rounded-2xl border border-slate-300 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-600 dark:hover:border-emerald-800 dark:focus:border-emerald-500 dark:focus:ring-emerald-950"
                  />
                </div>

                <FieldError />
              </TextField>

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
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="h-12 w-full rounded-2xl border border-slate-300 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-600 dark:hover:border-emerald-800 dark:focus:border-emerald-500 dark:focus:ring-emerald-950"
                  />
                </div>

                <PasswordChecklist
                  password={password}
                />

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
                      Registering
                    </>
                  ) : (
                    <>
                      <FiUserPlus />
                      Register
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

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/70">
              <FiCheckCircle className="mt-0.5 shrink-0 text-lg text-emerald-600 dark:text-emerald-400" />

              <p className="text-xs font-medium leading-6 text-slate-500 dark:text-zinc-400">
                After email registration, you will
                return to the Login page. Login with
                your new account to continue to your
                original page.
              </p>
            </div>

            <p className="mt-7 text-center text-sm font-medium text-slate-500 dark:text-zinc-400">
              Already have an account?{" "}
              <Link
                href={loginHref}
                className="font-extrabold text-emerald-700 transition-colors hover:text-emerald-600 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                Sign in
              </Link>
            </p>
          </Card>
        </section>
      </div>
    </main>
  );
};

const SignupPageFallback = () => {
  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-slate-50 dark:bg-[#050706]">
      <div className="flex items-center gap-3 text-sm font-bold text-emerald-700 dark:text-emerald-400">
        <FiLoader className="animate-spin text-xl" />
        Loading registration page...
      </div>
    </main>
  );
};

export default function SignUpPage() {
  return (
    <Suspense fallback={<SignupPageFallback />}>
      <SignupPageContent />
    </Suspense>
  );
}