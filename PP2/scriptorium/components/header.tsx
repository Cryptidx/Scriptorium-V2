// import React, { useEffect, useState } from "react";
// import Link from 'next/link';
// import { useTheme } from "@/context/modeContext";
// import { useRouter } from "next/router";
// import SearchBar from "./searchBar";
// import PageDropDown from "@/components/drop-downs/pages-dropdown";
// import {defaultLocalStorage} from "@/utils/default"
// import { apiCall } from "@/utils/auth-api-w-refresh";
// import { useUser } from "@/context/userContextHeader";
// import { MoonIcon, SunIcon } from "@/common/icons";
// import { DropdownItem } from '../types/dropdown.d';
// import { simulateBlogCreationAPI } from "@/components/mockApi"; // Mock API function for blog creation
// import BlogCreationModal from "./modals/BlogModal";


// const userItems: DropdownItem[] = [
//   { label: "Settings", link: "/settings" },

// ];


// const Header: React.FC = () => {
//   const { user, logout } = useUser(); // Access user state and logout function from UserContext
//     const { theme, toggleTheme } = useTheme();
//     const router = useRouter();

//     console.log(JSON.stringify(user));
  
//     const handleLogo = () => {
//       router.push(user? "/home" : "/");
//     };

  
//     const showSearchBar = ["/home"].includes(router.pathname);
//   // const login = user != null;

//   const [showModal, setShowModal] = useState(false);

//   const handleCreateBlog = async (data: { title: string; description: string; tags: string[] }) => {
//     try {
//       // Simulate API call to create blog
//       const newBlog = await simulateBlogCreationAPI(data);

//       // Route to the new blog page
//       router.push(`/blog/${newBlog.id}`);
      

//     } catch (error) {
//       console.error("Failed to create blog:", error);
//     }
//   };

//   return (
//     <header className="flex justify-between items-center p-4 bg-[#132D5F] text-white">
//       {/* Logo */}
//       <div>
//         <button
//           onClick={handleLogo}
//           className="flex justify-between font-mono font-bold text-2xl"
//         >
//           <img src="/icons/logo.png" className="object-scale-down h-10 w-10" alt="Logo" />
//           <p className="px-2 content-center">Scriptorium</p>
//         </button>
//       </div>


//       {showSearchBar && <SearchBar />}
     
//       <nav className="flex items-center space-x-5">
        
//       {/* Navigation */}
//         <nav className="flex items-center space-x-5">
    
//         <PageDropDown
//           id="burgerDropdown"
//           trigger={<img src="/icons/menu.png" className="object-scale-down h-10 w-10" />}
//           items={[
//             { label: "Home", link: "/home" },
//             { label: "Code", link: "/template/-1" },
//           ]}
//         />

//         {/* Profile Dropdown */}
//         {user && user.avatar && (
//             <PageDropDown
//               id="profileDropdown"
//               trigger={<img src={user.avatar} className="object-scale-down h-10 w-10 rounded-full" alt="Profile" />}
//               items={userItems}
//             />
//           )}        

//           {/* Dynamic Button */}
//           {user ? (
            
//               <button 
//               onClick = {() => setShowModal(true)}
//               className="flex flex-wrap bg-blue-500 px-2 py-2 rounded hover:bg-blue-700 transition">
//                 Create Blog
//               </button>
          
//           ) : (
//             <Link href="/">
//               <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 transition">
//                 Log In
//               </button>
//             </Link>
//           )}

//             {/* Logout Button */}
//             {user && (
//               <button onClick={logout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition">
//                 Logout
//               </button>
//             )}

//               {/* Theme Toggle */}
//               <button
//                   onClick={toggleTheme}
//                   className="px-4 py-2 bg-blue-500 dark:bg-yellow-400 text-white dark:text-black rounded transition"
//               >
//                     {theme === "light" ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
//               </button>
//             </nav>

//             {showModal && (
//               <div className="text-black">
//                 <BlogCreationModal
//                 isOpen={showModal}
//                 onClose={() => setShowModal(false)}
//                 onSubmit={handleCreateBlog}
//               />
//               </div>
              
//             )}
//             </nav>
//         </header>
//     );
// };


// export default Header;

// ABOVE IS THE WORKING VERSION



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
import { simulateBlogCreationAPI } from "@/components/mockApi"; // Mock API function for blog creation
import BlogCreationModal from "./modals/BlogModal";


const userItems: DropdownItem[] = [
  { label: "Settings", link: "/settings" },

];


const Header: React.FC = () => {
  const { user, logout } = useUser(); // Access user state and logout function from UserContext
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    console.log(JSON.stringify(user));
  
    const handleLogo = () => {
      router.push(user? "/home" : "/");
    };

  const [showModal, setShowModal] = useState(false);

  const handleCreateBlog = async (data: { title: string; description: string; tags: string[] }) => {
    try {
      // Simulate API call to create blog
      // console.log("haha")
      console.log( "my data", JSON.stringify(data))

      // console.log(JSON.stringify(data));
      
    
       
      const newBlog = await apiCall(`/api/blog`, {method: "POST",body: JSON.stringify(data)});
     

      // console.log("haha")
      // console.log(JSON.stringify(newBlog))

      // Route to the new blog page
      router.push(`/blog/${newBlog.blog.id}`);
      

    } catch (error) {
      console.error("Failed to create blog:", error);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-[#132D5F] text-white">
      {/* Logo */}
      <div>
        <button
          onClick={handleLogo}
          className="flex justify-between font-mono font-bold text-2xl"
        >
          <img src="/icons/logo.png" className="object-scale-down h-10 w-10" alt="Logo" />
          <p className="px-2 content-center">Scriptorium</p>
        </button>
      </div>
     
      <nav className="flex items-center space-x-5">
        
      {/* Navigation */}
        <nav className="flex items-center space-x-5">
    
        <PageDropDown
          id="burgerDropdown"
          trigger={<img src="/icons/menu.png" className="object-scale-down h-10 w-10" />}
          items={[
            { label: "Home", link: "/home" },
            { label: "Code", link: "/template/-1" },
          ]}
        />

        {/* Profile Dropdown */}
        {user && user.avatar && (
            <PageDropDown
              id="profileDropdown"
              trigger={<img src={user.avatar} className="object-scale-down h-10 w-10 rounded-full" alt="Profile" />}
              items={userItems}
            />
          )}        

          {/* Dynamic Button */}
          {user ? (
            
              <button 
              onClick = {() => setShowModal(true)}
              className="flex flex-wrap bg-blue-500 px-2 py-2 rounded hover:bg-blue-700 transition">
                Create Blog
              </button>
          
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

            {showModal && (
              <div className="text-black">
                <BlogCreationModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleCreateBlog}
              />
              </div>
              
            )}
            </nav>
        </header>
    );
};


export default Header;

