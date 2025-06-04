import type { Metadata } from "next";
import "@/globals.css";

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
        className="w-screen h-screen antialiased bg-base-100"
      >
        {children}
      </body>
    </html>
  );
}
