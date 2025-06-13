import { Metadata } from "next";

import "./globals.css";
import { AppProviders } from "./providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "RoadMap-Dashboard",
  description:
    "RoadMap-Dashboard is a personalized learning platform offering structured programming courses. It includes an AI-powered chatbot that suggests the best learning track based on your goals and supports your journey with step-by-step guidance.",
  icons: {
    icon: "/header/Rectangle 1938.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex">
        <AppProviders>
          <main className="flex-1 p-4 overflow-y-auto">
            <Toaster />
            {children}
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
