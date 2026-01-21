import { Just_Me_Again_Down_Here } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";

// English font
const justMeAgainDownHere = Just_Me_Again_Down_Here({
  variable: "--font-just-me-again-down-here",
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${justMeAgainDownHere.variable} antialiased`}>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
