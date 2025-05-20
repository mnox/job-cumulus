import { CssBaseline } from '@mui/material';
import { ThemeProvider } from "@mui/material/styles"
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, } from "react-router";
import { AppSidebar } from '~/components/core/AppSidebar';
import { useAppSelector } from '~/data/store/root-hooks';
import AppRootStore from '~/data/store/root-store.config';
import { setupMockApi } from '~/services/mock/MockAPIServiceWorker';
import useAppTheme from '~/styles/theme';

import type { Route } from "./+types/root";
import "./styles/app.scss";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  /**
   * Cannot init Service Worker until window is loaded
   * and we have access to navigator
   */
  useEffect(() => {
    setupMockApi();
  }, []);
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={AppRootStore}>
          {children}
        </Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { darkMode } = useAppSelector((state) => state.UI)
  const theme = useAppTheme({darkMode});
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppSidebar>
        <Outlet />
      </AppSidebar>
    </ThemeProvider>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
