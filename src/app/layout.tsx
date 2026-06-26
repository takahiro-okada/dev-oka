import { Just_Me_Again_Down_Here } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import ViewTransitionProvider from "@/components/transitions/ViewTransitionProvider";

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
        <ViewTransitionProvider>
          <Header />

          <main className="page-transition">{children}</main>

          <Footer />
        </ViewTransitionProvider>
      </body>
    </html>
  );
}
