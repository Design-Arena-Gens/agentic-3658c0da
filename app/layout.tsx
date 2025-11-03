import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Minds on Automation - Daily Social Posts",
  description: "Generate engaging social media posts about Minds on Automation products and benefits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
