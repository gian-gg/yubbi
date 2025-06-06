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
      <body data-theme="mauve" className="antialiased w-screen h-screen">
        <div
          className="w-full h-full bg-neutral text-base-content font-secondary flex flex-col justify-between items-center p-4 lg:p-8 lg:px-40 lg:pt-20 overflow-hidden relative"
          style={{
            backgroundImage: "url('/noise.png')",
            backgroundSize: "300px auto",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-white/50 w-[500px] h-[500px] rounded-full blur-[128px] absolute -top-[450px]" />
          <div
            className="bg-primary/30 w-[800px] h-[800px] rounded-full blur-[128px] absolute -bottom-[600px] animate-pulse"
            style={{ animationDuration: "4s" }}
          />
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
            mobileOffset={{ bottom: "65px" }}
            position="bottom-center"
            style={{ zIndex: 49 }}
          />
        </div>
      </body>
    </html>
  );
}
