"use client"; // Declare this as a client component

import { ReactNode } from "react";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme/theme";
import { Provider } from "react-redux";
import { store } from "../store/store";
import createEmotionCache from "./emotionCache";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const clientSideEmotionCache = createEmotionCache();
const queryClient = new QueryClient();

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CacheProvider value={clientSideEmotionCache}>
            <CssBaseline />
            {children}
          </CacheProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default Providers;
