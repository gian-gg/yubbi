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
        data-theme="mauve"
        className="antialiased w-screen h-screen bg-neutral text-base-content font-secondary flex flex-col justify-between items-center p-8 overflow-hidden lg:px-40 lg:pt-28"
        style={{
          backgroundImage: "url('/noise.png')",
          backgroundSize: "300px auto",
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white w-32 h-32 rounded-full blur-[128px] absolute -top-20" />
        <div className="bg-primary w-48 h-48 rounded-full blur-[200px] absolute -bottom-48" />
        <Header />
        {children}
        <Footer />

        <Toaster
          visibleToasts={1}
          icons={{
            warning: "⚠️",
            error: "❌",
          }}
          offset={{ bottom: "75px" }}
          mobileOffset={{ bottom: "75px" }}
          position="bottom-center"
        />
      </body>
    </html>
  );
}
