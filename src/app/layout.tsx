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
      <body data-theme="mauve" className="antialiased">
        <div
          className="min-w-screen min-h-screen bg-neutral text-base-content font-secondary flex flex-col justify-between items-center p-4 lg:p-8 lg:px-40 lg:pt-20"
          style={{
            backgroundImage: "url('/noise.png')",
            backgroundSize: "300px auto",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-white/50 w-[300px] h-[300px] md:w-[500px] md:h-[500px] blur-[128px] rounded-full fixed -top-[200px] md:-top-[400px] z-[5]" />
          <div
            className="bg-primary/30 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-[128px] animate-pulse fixed -bottom-[300px] md:-bottom-[400px] z-[5]"
            style={{ animationDuration: "4s" }}
          />
          <Header />
          <main className="h-full w-full flex flex-col flex-1 items-center  max-w-[1200px] mb-24 z-10">
            {children}
          </main>
          <Footer />
        </div>
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
      </body>
    </html>
  );
}
