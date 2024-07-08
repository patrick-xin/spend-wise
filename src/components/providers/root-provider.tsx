"use client";

import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";
import { ThemeProvider } from "./theme-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

function RootProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </ReactQueryStreamedHydration>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default RootProvider;
