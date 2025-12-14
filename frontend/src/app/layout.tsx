import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Squadron - Validate Your Idea, Not Your Code",
  description: "Text-to-App platform powered by Google Gemini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
