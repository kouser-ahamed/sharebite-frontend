"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import NavLink from "./NavLink";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { LuChevronDown, LuMenu, LuX, LuLogOut, LuShare2, LuList, LuInbox, LuSun, LuMoon } from "react-icons/lu";

interface ProfileAvatarProps {
  src?: string | null;
  name?: string | null;
  sizeClassName: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ src, name, sizeClassName }) => {
  const imageSrc = typeof src === "string" && src.trim() ? src.trim() : null;
  const initial = name?.charAt(0)?.toUpperCase() || "U";

  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-0.5 ring-1 ring-slate-200/80 shadow-xs dark:ring-neutral-900 ${sizeClassName}`}
    >
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={name || "User profile"}
          referrerPolicy="no-referrer"
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center rounded-full bg-green-50 text-xs font-bold text-green-700 dark:bg-neutral-900 dark:text-green-400">
          {initial}
        </span>
      )}
    </span>
  );
};

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(true);

  const profileMenuRef = useRef<HTMLDivElement>(null);

  const userData = authClient.useSession();
  const user = userData.data?.user;

  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    
    
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark", "bg-black");
      document.documentElement.classList.add("bg-white");
      document.documentElement.style.colorScheme = "light";
    } else {
      setIsDark(true);
      document.documentElement.classList.remove("bg-white");
      document.documentElement.classList.add("dark", "bg-black");
      document.documentElement.style.colorScheme = "dark";
      localStorage.setItem("theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      setIsDark(false);
      document.documentElement.classList.remove("dark", "bg-black");
      document.documentElement.classList.add("bg-white");
      document.documentElement.style.colorScheme = "light";
      localStorage.setItem("theme", "light");
    } else {
      setIsDark(true);
      document.documentElement.classList.remove("bg-white");
      document.documentElement.classList.add("dark", "bg-black");
      document.documentElement.style.colorScheme = "dark";
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeMenus = (): void => {
    setMenuOpen(false);
    setProfileMenuOpen(false);
  };

  const stayOnCurrentPageAfterLogout =
    pathname === "/" || pathname.startsWith("/all-facilities");

  const handleSignOut = async (): Promise<void> => {
    await authClient.signOut();
    closeMenus();

    if (stayOnCurrentPageAfterLogout) {
      router.refresh();
      return;
    }

    router.replace("/login");
  };

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "All Foods", href: "/all-foods" },
    { title: "About Us", href: "/about-us" },
    { title: "Contact", href: "/contact" },
    { title: "Support", href: "/support" },
    { title: "Privacy Policy", href: "/privacy-policy" },
  ];

  const mobileLinks = user ? [
    { title: "Share Food", href: "/share-food", icon: LuShare2 },
    { title: "My Shared Foods", href: "/my-shared-foods", icon: LuList },
    { title: "My Requests", href: "/my-requests", icon: LuInbox },
  ] : [];

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-neutral-900 bg-white dark:bg-black shadow-sm transition-colors duration-300">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-4 py-3">
        
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 group"
        >
          <div className="relative">
            <Image
              src="/assets/logo11.png"
              alt="logo"
              width={42}
              height={42}
              priority
              className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-full ring-2 ring-green-500/20 group-hover:ring-green-500/40 dark:ring-green-400/20 dark:group-hover:ring-green-400/40 transition-all duration-300"></div>
          </div>

          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-800 dark:text-white">
            Share<span className="text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300">Bite</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600 dark:text-neutral-200">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href}>{link.title}</NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="hidden lg:flex items-center justify-center rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-neutral-900 transition-all duration-200 cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <LuSun className="text-amber-400 text-xl" />
            ) : (
              <LuMoon className="text-slate-600 dark:text-neutral-400 text-xl" />
            )}
          </button>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center">
            {!user ? (
              <Link href="/login">
                <Button
                  size="sm"
                  className="rounded-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 font-semibold shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
                >
                  Login
                </Button>
              </Link>
            ) : (
              <div className="relative" ref={profileMenuRef}>
                
                {/* Profile Button */}
                <button
                  onClick={() => setProfileMenuOpen((prev) => !prev)}
                  className={`flex items-center gap-2 rounded-xl border bg-white dark:bg-black px-3 py-2 shadow-sm transition-all duration-300 cursor-pointer ${
                    profileMenuOpen
                      ? "border-green-500 dark:border-green-400 bg-green-50/40 dark:bg-neutral-900 shadow-sm"
                      : "border-slate-200 dark:border-neutral-900 hover:border-green-500 dark:hover:border-green-400 hover:bg-green-50/20 dark:hover:bg-neutral-900/60"
                  }`}
                >
                  <ProfileAvatar src={user?.image} name={user?.name} sizeClassName="w-8 h-8" />

                  <span className="max-w-24 truncate text-sm font-semibold text-slate-700 dark:text-neutral-200">
                    {user?.name?.split(" ")[0]}
                  </span>

                  <LuChevronDown
                    size={16}
                    className={`text-slate-400 dark:text-neutral-500 transition-all duration-300 ${
                      profileMenuOpen ? "rotate-180 text-green-600 dark:text-green-400" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu - Pure Dark Background */}
                <div
                  className={`absolute right-0 top-[120%] w-72 rounded-2xl border border-slate-200 dark:border-neutral-900 bg-white dark:bg-black p-1.5 shadow-xl transition-all duration-300 ${
                    profileMenuOpen
                      ? "opacity-100 visible translate-y-0 scale-100"
                      : "opacity-0 invisible -translate-y-2 scale-95"
                  }`}
                >
                  
                  {/* User Info Card */}
                  <div className="flex items-center gap-3 rounded-xl bg-green-50/30 dark:bg-neutral-950 p-3 border border-slate-200 dark:border-neutral-900">
                    <div className="relative">
                      <ProfileAvatar src={user?.image} name={user?.name} sizeClassName="w-11 h-11" />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full border-2 border-white dark:border-black"></div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-bold text-slate-800 dark:text-white">
                        {user?.name}
                      </h4>
                      <p className="truncate text-xs text-slate-500 dark:text-neutral-400">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-slate-200 dark:bg-neutral-900 my-1.5"></div>

                  {/* Dropdown Menu Items */}
                  <div className="flex flex-col gap-0.5">
                    <Link
                      href="/share-food"
                      onClick={closeMenus}
                      className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 group ${
                        isActiveLink("/share-food")
                          ? "bg-green-50 dark:bg-neutral-900 text-green-700 dark:text-green-400"
                          : "text-slate-700 dark:text-neutral-300 hover:bg-green-50 dark:hover:bg-neutral-900/60 hover:text-green-700 dark:hover:text-white"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        isActiveLink("/share-food") 
                          ? "bg-green-100 dark:bg-neutral-800 text-green-700 dark:text-green-400" 
                          : "bg-slate-100 dark:bg-neutral-900 group-hover:bg-green-100 dark:group-hover:bg-neutral-800 text-slate-500 dark:text-neutral-400 group-hover:text-green-700 dark:group-hover:text-white"
                      }`}>
                        <LuShare2 size={16} />
                      </div>
                      Share Food
                    </Link>

                    <Link
                      href="/my-shared-foods"
                      onClick={closeMenus}
                      className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 group ${
                        isActiveLink("/my-shared-foods")
                          ? "bg-green-50 dark:bg-neutral-900 text-green-700 dark:text-green-400"
                          : "text-slate-700 dark:text-neutral-300 hover:bg-green-50 dark:hover:bg-neutral-900/60 hover:text-green-700 dark:hover:text-white"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        isActiveLink("/my-shared-foods") 
                          ? "bg-green-100 dark:bg-neutral-800 text-green-700 dark:text-green-400" 
                          : "bg-slate-100 dark:bg-neutral-900 group-hover:bg-green-100 dark:group-hover:bg-neutral-800 text-slate-500 dark:text-neutral-400 group-hover:text-green-700 dark:group-hover:text-white"
                      }`}>
                        <LuList size={16} />
                      </div>
                      My Shared Foods
                    </Link>

                    <Link
                      href="/my-requests"
                      onClick={closeMenus}
                      className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 group ${
                        isActiveLink("/my-requests")
                          ? "bg-green-50 dark:bg-neutral-900 text-green-700 dark:text-green-400"
                          : "text-slate-700 dark:text-neutral-300 hover:bg-green-50 dark:hover:bg-neutral-900/60 hover:text-green-700 dark:hover:text-white"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        isActiveLink("/my-requests") 
                          ? "bg-green-100 dark:bg-neutral-800 text-green-700 dark:text-green-400" 
                          : "bg-slate-100 dark:bg-neutral-900 group-hover:bg-green-100 dark:group-hover:bg-neutral-800 text-slate-500 dark:text-neutral-400 group-hover:text-green-700 dark:group-hover:text-white"
                      }`}>
                        <LuInbox size={16} />
                      </div>
                      My Requests
                    </Link>

                    <div className="h-px bg-slate-200 dark:bg-neutral-900 my-1"></div>

                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200 group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-neutral-900 group-hover:bg-red-100 dark:group-hover:bg-neutral-800 flex items-center justify-center transition-all duration-200">
                        <LuLogOut size={16} className="text-red-500 dark:text-red-400" />
                      </div>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex items-center justify-center rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-neutral-900 transition-all duration-200 cursor-pointer"
          >
            {menuOpen ? (
              <LuX size={26} className="text-green-600 dark:text-green-400" />
            ) : (
              <LuMenu size={26} className="text-green-600 dark:text-green-400" />
            )}
          </button>
        </div>

        {/* Mobile Sidebar Menu - Pure Dark */}
        <div
          className={`absolute right-4 top-20 w-[92vw] max-w-sm rounded-3xl border border-slate-200 dark:border-neutral-900 bg-white/95 dark:bg-black shadow-2xl transition-all duration-300 lg:hidden ${
            menuOpen
              ? "visible opacity-100 translate-y-0 scale-100"
              : "invisible opacity-0 -translate-y-3 scale-95"
          }`}
        >
          <div className="p-4">

            {/* User Details in Mobile Menu */}
            {user && (
              <div className="mb-4 flex items-center gap-3 rounded-2xl bg-green-50/30 dark:bg-neutral-950 p-3 border border-slate-200 dark:border-neutral-900">
                <div className="relative">
                  <ProfileAvatar src={user?.image} name={user?.name} sizeClassName="w-10 h-10" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full border-2 border-white dark:border-black"></div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-800 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="truncate text-xs text-slate-500 dark:text-neutral-400">
                    {user?.email}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Links List */}
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenus}
                    className={`w-full text-center rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-green-50 dark:bg-neutral-900 text-green-700 dark:text-green-400 shadow-sm"
                        : "text-slate-700 dark:text-neutral-200 hover:bg-green-50 dark:hover:bg-neutral-900/60 hover:text-green-700 dark:hover:text-green-400"
                    }`}
                  >
                    {link.title}
                  </Link>
                );
              })}

              {/* Private User Actions for Mobile */}
              {user && mobileLinks.map((link) => {
                const isActive = isActiveLink(link.href);
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenus}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-green-50 dark:bg-neutral-900 text-green-700 dark:text-green-400 shadow-sm"
                        : "text-slate-700 dark:text-neutral-200 hover:bg-green-50 dark:hover:bg-neutral-900/60 hover:text-green-700 dark:hover:text-green-400"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      isActive ? "bg-green-100 dark:bg-neutral-800 text-green-700 dark:text-green-400" : "bg-slate-100 dark:bg-neutral-900 text-slate-500 dark:text-slate-400"
                    }`}>
                      <Icon size={16} className={isActive ? "text-green-700 dark:text-green-400" : "text-slate-500 dark:text-slate-400"} />
                    </div>
                    {link.title}
                  </Link>
                );
              })}
            </div>

            {/* Theme Toggle for Mobile */}
            <button
              onClick={toggleTheme}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 dark:text-neutral-200 hover:bg-slate-100 dark:hover:bg-neutral-900 transition-all duration-200 cursor-pointer"
            >
              {isDark ? (
                <>
                  <LuSun className="text-amber-400 text-xl" />
                  Light Mode
                </>
              ) : (
                <>
                  <LuMoon className="text-slate-600 dark:text-neutral-400 text-xl" />
                  Dark Mode
                </>
              )}
            </button>

            {/* Authentication Button Container */}
            <div className="mt-4">
              {!user ? (
                <Link href="/login" onClick={closeMenus}>
                  <Button
                    fullWidth
                    className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-full font-semibold shadow-sm transition-all duration-300"
                  >
                    Login
                  </Button>
                </Link>
              ) : (
                <Button
                  fullWidth
                  onClick={handleSignOut}
                  className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-full font-semibold shadow-sm transition-all duration-300"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;