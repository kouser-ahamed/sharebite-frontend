import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ShareBite",
    template: "%s | ShareBite",
  },
  description:
    "A community surplus food-sharing platform that connects people who have safe extra food with nearby community members.",
};

const themeScript = `
  (function () {
    try {
      var savedTheme = localStorage.getItem("theme");

      var theme =
        savedTheme === "light" ||
        savedTheme === "dark"
          ? savedTheme
          : "dark";

      var root = document.documentElement;
      var isDark = theme === "dark";

      root.classList.toggle(
        "dark",
        isDark
      );

      root.classList.toggle(
        "bg-black",
        isDark
      );

      root.classList.toggle(
        "bg-white",
        !isDark
      );

      root.style.colorScheme = theme;

      if (!savedTheme) {
        localStorage.setItem(
          "theme",
          theme
        );
      }
    } catch (error) {
      document.documentElement.classList.add(
        "dark",
        "bg-black"
      );

      document.documentElement.style.colorScheme =
        "dark";
    }
  })();
`;

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({
  children,
}: Readonly<RootLayoutProps>) => {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
      </head>

      <body className="min-h-full bg-white text-slate-900 transition-colors duration-300 dark:bg-black dark:text-neutral-100">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;