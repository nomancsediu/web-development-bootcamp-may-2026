import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "Alapon",
  description: "Live Chat Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <AppProvider>
          {children}
        </AppProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
