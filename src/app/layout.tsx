import type { Metadata } from "next";
import { Artifika } from "next/font/google";
import "../styles/globals.css";

const artifika = Artifika({
  weight: "400",
  variable: "--font-artfika",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Workspace Deployer",
  description:
    "A webapp used to create reusable executable scripts to deploy a workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{ fontFamily: `var(--font-artfika)` }}
        className={`${artifika.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
