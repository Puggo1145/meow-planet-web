import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
// providers
import { ProgressBarProvider } from "@/components/providers/progress-bar-provider";
import { UserProvider } from "@/components/providers/user-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  title: "猫猫星球",
  description: "The Web version of Meow Planet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <ProgressBarProvider>
              {children}
            </ProgressBarProvider>
          </UserProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
