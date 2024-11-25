import React from "react";
import Link from 'next/link';
import { useUser } from "@/context/userContext";
import { useTheme } from "@/context/modeContext";
import { useRouter } from "next/router";

// Declare the type inline for the icons
type IconProps = React.FC<React.SVGProps<SVGSVGElement>>;

// Define the SunIcon and MoonIcon types inline
const SunIcon: IconProps = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    />
  </svg>
);

const MoonIcon: IconProps = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
    />
  </svg>
);
const Header: React.FC = () => {
    const { user, setUser } = useUser();
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    const login = user != null;

    const handleLogout = () => {
        setUser(null);

        router.push("/");
    }

    const handleLogo = () => {
        if (login) {
            router.push("/home");
        } else {
            router.push("/");
        }
    }

    return (
        <header className="flex justify-between items-center p-4 bg-[#132D5F] text-white">
            <div>
                <button onClick={handleLogo} className="flex justify-between font-mono font-bold text-2xl">
                    <img src="/icons/logo.png" className="object-scale-down h-10 w-10"></img>
                    <p className="px-2 content-center">Scriptorium</p>
                </button>
            </div>
            <nav>
                <Link href="/home" className="mx-5">Home</Link>
                <Link href="/codeEditor" className="mx-5">Code</Link>
                {login && <button className="mx-5" onClick={handleLogout}>Logout</button>}
                <button onClick={toggleTheme} className="px-4 py-2 bg-blue-500 dark:bg-yellow-400 text-white dark:text-black rounded transition">
                {theme === "light" ? (<MoonIcon className="h-6 w-6" />) : (<SunIcon className="h-6 w-6" />)}
                </button>
            </nav>
        </header>
    );
};

export default Header;