import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import clsx from "clsx";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Budget Helper",
  description: "A simple budgeting app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "min-h-screen bg-gray-50")}>
        <div className="max-w-4xl mx-auto p-2">{children}</div>
        <footer className="flex flex-col items-center justify-center">
          <span className="py-6 text-sm text-gray-700">
            Made with ❤️ by{" "}
            <Link
              className="hover:underline"
              href="https://arthurhenry.dev/"
              rel="noopenner noreferrer"
              target="_blank"
            >
              Arthur Henry
            </Link>
          </span>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
