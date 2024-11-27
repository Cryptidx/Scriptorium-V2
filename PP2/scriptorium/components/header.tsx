import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useTheme } from "@/context/modeContext";
import { useRouter } from "next/router";
import SearchBar from "./searchBar";
import PageDropDown from "@/components/drop-downs/pages-dropdown";
import {defaultLocalStorage} from "@/utils/default"
import { apiCall } from "@/utils/auth-api-w-refresh";
import { useUser } from "@/context/userContextHeader";
import { MoonIcon, SunIcon } from "@/common/icons";
import { DropdownItem } from '../types/dropdown.d';


// Declare the type inline for the icons



// const userItems: DropdownItem[] = [
//   { label: "Profile", link: "/home" },
//   { label: "Settings", link: "/settings" },
//   { label: "Logout", link: "/" },
// ];

const visitorItems: DropdownItem[] = [
  { label: "Settings", link: "/settings" },
];

// const [activeDropdown, setActiveDropdown] = useState<string | null>(null); // Tracks which dropdown is open

// const handleDropdownToggle = (dropdownName: string) => {
//   setActiveDropdown((prev) => (prev === dropdownName ? null : dropdownName));
// };
  
  const Header: React.FC = () => {
    const { user, logout } = useUser(); // Access user state and logout function from UserContext
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();
  
    const handleLogo = () => {
      router.push(user ? "/home" : "/");
    };
  
    const showSearchBar = ["/home"].includes(router.pathname);

    return (
        <header className="flex justify-between items-center p-4 bg-[#132D5F] text-white">
            {/* Logo */}
            <div>
                <button onClick={handleLogo} className="flex justify-between font-mono font-bold text-2xl">
                    <img src="/icons/logo.png" className="object-scale-down h-10 w-10" alt="Logo" />
                    <p className="px-2 content-center">Scriptorium</p>
                </button>
            </div>

          {/* Search Bar */}
          {showSearchBar && <SearchBar />}

            

            {/* Navigation */}
            <nav className="flex items-center space-x-5">
                {/* <Link href="/home">Home</Link>
                <Link href="/codeEditor">Code</Link> */}
                {/* <PageDropDown 
                src="/icons/menu.png"
                
                items={[
        { label: "Home", link: "/home" },
        { label: "Code", link: "/codeEditor" },
        { label: "Templates", link: "/templates" }
        ]} 
        isProfile="0"/> */}

        {/* <DropdownProvider>
        
        </DropdownProvider>
         */}
        <PageDropDown
        id="burgerDropdown"
          trigger={<img src="/icons/menu.png" className="object-scale-down h-10 w-10" />}
          items={[
            { label: "Home", link: "/home" },
            { label: "Code", link: "/editor" },
          ]}
        />

        {/* Profile Dropdown */}
        {user && user.avatar && (
            <PageDropDown
              id="profileDropdown"
              trigger={<img src={user.avatar} className="object-scale-down h-10 w-10 rounded-full" alt="Profile" />}
              items={visitorItems}
            />
          )}        

          {/* Dynamic Button */}
          {user ? (
            <Link href="/createBlog">
              <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 transition">
                Create Blog
              </button>
            </Link>
          ) : (
            <Link href="/">
              <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 transition">
                Log In
              </button>
            </Link>
          )}

            {/* Logout Button */}
            {user && (
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition">
                Logout
              </button>
            )}

              {/* Theme Toggle */}
              <button
                  onClick={toggleTheme}
                  className="px-4 py-2 bg-blue-500 dark:bg-yellow-400 text-white dark:text-black rounded transition"
              >
                    {theme === "light" ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
              </button>
            </nav>
        </header>
    );
};


export default Header;

