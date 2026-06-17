import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  title: "Workforce Needs Snapshot · Workplus",
  description:
    "Tell Workplus which roles you're hiring for so they can plan apprenticeship and training provision across Northern Ireland.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${hanken.variable} h-full`}>
      <body
        className="min-h-full"
        style={{ fontFamily: "var(--font-hanken), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
