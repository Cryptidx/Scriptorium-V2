import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@/context/userContext";
import { ThemeProvider } from "@/context/modeContext"; // Adjust the path as necessary
import { DropdownProvider } from "@/components/drop-downs/dropdownContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DropdownProvider>
    <ThemeProvider>
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
    </ThemeProvider>
    </DropdownProvider>
  );
}
