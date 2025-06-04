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
        className="w-screen h-screen antialiased bg-base-100 text-base-content font-jetbrains flex flex-col justify-between items-center p-8"
      >
        {children}
      </body>
    </html>
  );
}
