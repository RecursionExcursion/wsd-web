import type { Metadata } from "next";
import { Artifika } from "next/font/google";
import "../styles/globals.css";

const artifika = Artifika({
  weight: "400",
  variable: "--font-artfika",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quick Script - Workspace Deployer",
  description:
    "A webapp used to create reusable executable scripts to deploy a workspace with cosmic efficiency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${artifika.variable} font-artfika antialiased bg-cosmic-black text-milky-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
