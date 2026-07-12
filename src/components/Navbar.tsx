"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import NavLink from "./NavLink";
import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { LuChevronDown, LuMenu, LuX, LuUser, LuLogOut, LuShare2, LuList, LuInbox } from "react-icons/lu";

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
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-0.5 ring-1 ring-slate-200 shadow-sm ${sizeClassName}`}
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
        <span className="flex h-full w-full items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
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

  const profileMenuRef = useRef<HTMLDivElement>(null);

  const userData = authClient.useSession();
  const user = userData.data?.user;

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

  // Navigation links configuration
  const navLinks = [
    { title: "Home", href: "/" },
    { title: "All Foods", href: "/all-foods" },
    { title: "About Us", href: "/about-us" },
    { title: "Contact", href: "/contact" },
    { title: "Support", href: "/support" },
    { title: "Privacy Policy", href: "/privacy-policy" },
  ];

  // Mobile only links (additional links for mobile menu)
  const mobileLinks = user ? [
    { title: "Share Food", href: "/share-food", icon: LuShare2 },
    { title: "My Shared Foods", href: "/my-shared-foods", icon: LuList },
    { title: "My Requests", href: "/my-requests", icon: LuInbox },
  ] : [];

  // Helper function to check if link is active (same as desktop NavLink)
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-4 py-3">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 group"
        >
          <div className="relative">
            <Image
              src="/assets/Logo.png"
              alt="logo"
              width={40}
              height={40}
              priority
              className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 rounded-full ring-2 ring-emerald-500/20 group-hover:ring-emerald-500/40 transition-all duration-300"></div>
          </div>

          <h1 className="text-xl sm:text-2xl font-black tracking-tight bg-linear-to-r from-slate-900 via-emerald-700 to-lime-500 bg-clip-text text-transparent">
            Share<span className="text-lime-500">Bite</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-7 text-sm font-semibold">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href}>{link.title}</NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center">
            {!user ? (
              <Link href="/login">
                <Button
                  size="sm"
                  className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Login
                </Button>
              </Link>
            ) : (
              <div className="relative" ref={profileMenuRef}>
                
                {/* Profile Button */}
                <button
                  onClick={() =>
                    setProfileMenuOpen((prev) => !prev)
                  }
                  className={`flex items-center gap-2 rounded-xl border bg-white px-3 py-2 shadow-sm transition-all duration-300 ${
                    profileMenuOpen
                      ? "border-emerald-400 bg-emerald-50/50 shadow-md"
                      : "border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/50"
                  }`}
                >
                  <ProfileAvatar src={user?.image} name={user?.name} sizeClassName="w-8 h-8" />

                  <span className="max-w-24 truncate text-sm font-semibold text-slate-700">
                    {user?.name?.split(" ")[0]}
                  </span>

                  <LuChevronDown
                    size={16}
                    className={`text-slate-500 transition-all duration-300 ${
                      profileMenuOpen ? "rotate-180 text-emerald-600" : ""
                    }`}
                  />
                </button>

                {/* Dropdown - Improved */}
                <div
                  className={`absolute right-0 top-[115%] w-72 rounded-2xl border border-slate-100 bg-white p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] transition-all duration-300 ${
                    profileMenuOpen
                      ? "opacity-100 visible translate-y-0 scale-100"
                      : "opacity-0 invisible -translate-y-2 scale-95"
                  }`}
                >
                  
                  {/* User Info - Improved */}
                  <div className="flex items-center gap-3 rounded-xl bg-gradient-to-br from-emerald-50/80 to-slate-50/80 p-3 border border-emerald-100/30">
                    <div className="relative">
                      <ProfileAvatar src={user?.image} name={user?.name} sizeClassName="w-11 h-11" />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-bold text-slate-800">
                        {user?.name}
                      </h4>

                      <p className="truncate text-xs text-slate-500">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-slate-100 my-1.5"></div>

                  {/* Menu Items - Improved */}
                  <div className="flex flex-col gap-0.5">
                    <Link
                      href="/share-food"
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-emerald-100 flex items-center justify-center transition-all duration-200">
                        <LuShare2 size={16} className="text-slate-600 group-hover:text-emerald-600" />
                      </div>
                      Share Food
                    </Link>

                    <Link
                      href="/my-shared-foods"
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-emerald-100 flex items-center justify-center transition-all duration-200">
                        <LuList size={16} className="text-slate-600 group-hover:text-emerald-600" />
                      </div>
                      My Shared Foods
                    </Link>

                    <Link
                      href="/my-requests"
                      onClick={closeMenus}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-emerald-100 flex items-center justify-center transition-all duration-200">
                        <LuInbox size={16} className="text-slate-600 group-hover:text-emerald-600" />
                      </div>
                      My Requests
                    </Link>

                    <div className="h-px bg-slate-100 my-0.5"></div>

                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-rose-50 group-hover:bg-rose-100 flex items-center justify-center transition-all duration-200">
                        <LuLogOut size={16} className="text-rose-500" />
                      </div>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex items-center justify-center rounded-lg p-2 hover:bg-slate-100 transition-all duration-200"
          >
            {menuOpen ? (
              <LuX size={26} className="text-emerald-600" />
            ) : (
              <LuMenu size={26} className="text-emerald-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu - Improved */}
        <div
          className={`absolute right-4 top-20 w-[92vw] max-w-sm rounded-3xl border border-slate-100 bg-white/95 backdrop-blur-xl shadow-2xl transition-all duration-300 lg:hidden ${
            menuOpen
              ? "visible opacity-100 translate-y-0 scale-100"
              : "invisible opacity-0 -translate-y-3 scale-95"
          }`}
        >
          <div className="p-4">

            {/* User Info - Improved */}
            {user && (
              <div className="mb-4 flex items-center gap-3 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-slate-50/80 p-3 border border-emerald-100/30">
                <div className="relative">
                  <ProfileAvatar src={user?.image} name={user?.name} sizeClassName="w-10 h-10" />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-slate-800">
                    {user?.name}
                  </p>

                  <p className="truncate text-xs text-slate-500">
                    {user?.email}
                  </p>
                </div>
              </div>
            )}

            {/* Main Navigation Links with Active State - Improved */}
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
                        ? "bg-emerald-50 text-emerald-600 shadow-sm"
                        : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-600"
                    }`}
                  >
                    {link.title}
                  </Link>
                );
              })}

              {/* User-specific mobile links with Active State - Improved */}
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
                        ? "bg-emerald-50 text-emerald-600 shadow-sm"
                        : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-600"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                      isActive ? "bg-emerald-100" : "bg-slate-100 group-hover:bg-emerald-100"
                    }`}>
                      <Icon size={16} className={isActive ? "text-emerald-600" : "text-slate-600"} />
                    </div>
                    {link.title}
                  </Link>
                );
              })}
            </div>

            {/* Auth */}
            <div className="mt-4">
              {!user ? (
                <Link href="/login" onClick={closeMenus}>
                  <Button
                    fullWidth
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Login
                  </Button>
                </Link>
              ) : (
                <Button
                  fullWidth
                  onClick={handleSignOut}
                  className="bg-rose-600 hover:bg-rose-700 text-white rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300"
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