"use client";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { AppShell } from "@/app/components/AppShell";
import RootStyleRegistry from "./emotion";
import { AppProvider } from "./contexts";
import { Notifications, notifications } from "@mantine/notifications";

// Create a client
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any, query) => {
         notifications.show({
          title: "Error",
          message: error?.response?.data?.message || "An error occurred",
        })
    },
  }),
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <head />
      <body>
        <QueryClientProvider client={queryClient}>
          <RootStyleRegistry>
            <MantineProvider
              withGlobalStyles
              withNormalizeCSS
              theme={{
                colorScheme: "light",
              }}
            >
              <Notifications position="top-right" />
              <AppProvider>
                <AppShell>{children}</AppShell>
              </AppProvider>
            </MantineProvider>
          </RootStyleRegistry>
        </QueryClientProvider>
      </body>
    </html>
  );
}
