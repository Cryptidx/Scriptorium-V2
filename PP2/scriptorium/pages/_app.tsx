import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "@/context/userContext";
import { UserProvider as UserProviderHeader } from "@/context/userContextHeader";

import { ThemeProvider } from "@/context/modeContext"; // Adjust the path as necessary
import { DropdownProvider} from "@/components/drop-downs/dropdownContext";
import Header from "@/components/header";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <DropdownProvider>
      <ThemeProvider>
        <UserProviderHeader>
    <UserProvider>
      
    <div className="flex flex-col min-h-screen">
            {/* Persistent Header */}
            <Header />
              <Component {...pageProps} />
          </div>
    </UserProvider>
    </UserProviderHeader>
    </ThemeProvider>
    </DropdownProvider>
    
  );
}
