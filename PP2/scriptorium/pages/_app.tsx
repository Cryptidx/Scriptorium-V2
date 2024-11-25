import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@/context/userContext";
import { ThemeProvider } from "@/context/modeContext"; // Adjust the path as necessary

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
    </ThemeProvider>
  );
}
