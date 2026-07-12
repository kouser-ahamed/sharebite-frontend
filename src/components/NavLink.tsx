"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname();

  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div>
      <Link
        href={href}
        className={
          isActive
            ? "pb-1 border-b-2 border-emerald-600 text-emerald-600 font-semibold transition-all duration-200"
            : "pb-1 border-b-2 border-transparent text-white-600 hover:text-emerald-600 hover:border-emerald-500/50 transition-all duration-200"
        }
      >
        {children}
      </Link>
    </div>
  );
};

export default NavLink;