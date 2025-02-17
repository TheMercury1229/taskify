import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
export const metadata: Metadata = {
  title: "Taskify",
  description: "Taskify is a task management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
