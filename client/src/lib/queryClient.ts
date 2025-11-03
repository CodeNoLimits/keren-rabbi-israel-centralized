import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey.join("/") as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
      // Cache subscription data for longer periods
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
    mutations: {
      retry: false,
    },
  },
});

// Pre-configure specific query defaults for subscription-related queries
queryClient.setQueryDefaults(['/api/user/subscription'], {
  staleTime: 1000 * 60 * 5, // 5 minutes for user subscription status
  gcTime: 1000 * 60 * 15, // Keep in cache for 15 minutes
  refetchOnWindowFocus: true, // Refetch subscription status when user returns
});

queryClient.setQueryDefaults(['/api/subscription-plans'], {
  staleTime: 1000 * 60 * 60, // 1 hour for subscription plans
  gcTime: 1000 * 60 * 60 * 2, // Keep in cache for 2 hours
});

queryClient.setQueryDefaults(['/api/stripe-status'], {
  staleTime: 1000 * 60 * 30, // 30 minutes for Stripe status
  gcTime: 1000 * 60 * 60, // Keep in cache for 1 hour
});
