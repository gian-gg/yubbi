import type { Metadata } from "next";
import "@/globals.css";

import Header from "@components/Header";
import Footer from "@components/Footer";

import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "yubi - finger roulette",
  description: "by gian.gg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        data-theme="forest"
        className="w-screen h-screen antialiased bg-base-100 text-base-content font-jetbrains flex flex-col justify-between items-center p-8"
      >
        <Header />
        {children}
        <Footer />

        <Toaster
          visibleToasts={1}
          icons={{
            success: "🎉",
            info: "ℹ️",
            warning: "⚠️",
            error: "🚨",
            loading: "⏱️",
          }}
          offset={{ bottom: "75px" }}
          mobileOffset={{ bottom: "75px" }}
        />
      </body>
    </html>
  );
}
