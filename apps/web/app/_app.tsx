import { Provider } from "react-redux";
import { store } from "../store/store";
import { CssBaseline } from "@mui/material";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
