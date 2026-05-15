import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "@/context/AppContext";
import { SocketProvider } from "@/context/SocketContext";

export const metadata: Metadata = {
  title: "Alapon",
  description: "Live Chat Platform",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-full overflow-hidden">
        <AppProvider> 
        <SocketProvider>{children}</SocketProvider>
        </AppProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
