import type { Metadata } from "next";
import "@/globals.css";

import Header from "@components/Header";
import Footer from "@components/Footer";

import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "yubbi – Random Picker & Grouper",
    template: "%s | yubbi",
  },
  description:
    "yubbi is a fun touch-and-keyboard-based app for randomly picking or grouping players. Playful, fair, and fast.",
  keywords: [
    "yubbi",
    "finger roulette",
    "roulette",
    "generator",
    "random",
    "random picker",
    "team generator",
    "touch game",
    "keyboard game",
    "nextjs app",
  ],
  authors: [{ name: "Gian Epanto", url: "https://github.com/gian-gg" }],
  creator: "gian.gg",
  publisher: "gian.gg",
  robots: "index, follow",
  alternates: {
    canonical: "https://yubbi.vercel.app",
  },
  openGraph: {
    title: "yubbi – Random Picker & Grouper",
    description:
      "yubbi is a fun touch-and-keyboard-based app for randomly picking or grouping players. Playful, fair, and fast.",
    url: "https://yubbi.vercel.app",
    siteName: "yubbi",
    images: [
      {
        url: "https://yubbi.vercel.app/brand.png",
        width: 1200,
        height: 630,
        alt: "yubbi App preview image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "yubbi – Random Picker & Grouper",
    description:
      "yubbi is a fun touch-and-keyboard-based app for randomly picking or grouping players. Playful, fair, and fast.",
    site: "@gian_ggg",
    creator: "@gian_ggg",
    images: ["https://yubbi.vercel.app/brand.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  themeColor: "#d1ace0", // mauve
  manifest: "/site.webmanifest",
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
