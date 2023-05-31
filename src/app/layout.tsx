"use client";
import { MantineProvider } from "@mantine/core";
import { AppShell } from "@/app/components/AppShell";
import RootStyleRegistry from "./emotion";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <head />
      <body>
        <RootStyleRegistry>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: "light",
            }}
          >
            <AppShell>{children}</AppShell>
          </MantineProvider>
        </RootStyleRegistry>
      </body>
    </html>
  );
}
