import { AuthProvider } from "@/context-api/context-provider";
import "./globals.css";
import { Fira_Sans } from "next/font/google";
import { Metadata } from "next";

const fira = Fira_Sans({
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "4uDoctors | The Absolute Health Care Companion",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      style={{ scrollBehavior: "smooth" }}
      className="scroll-smooth"
    >
      <body className={fira.className} suppressHydrationWarning={true}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}