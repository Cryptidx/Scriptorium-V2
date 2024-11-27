// import React from "react";

// const SearchBar = () => {
//     return (
//         <div className="relative flex items-center w-[50%]">
//             {/* Search Icon */}
//             <img
//                 src="/icons/search-glass.png"
//                 alt="Search"
//                 className="absolute left-4 h-7 w-7"
//             />
//             {/* Input Field */}
            
//             <input
//                 type="text"
//                 placeholder="Search Scriptorium"
//                 className="w-[100%] p-2 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//             />

//             <div className="absolute right-4 text-black bg-black rounded-r-full h-full">
//                 <button >
//                     Search by
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default SearchBar;

// import React from "react";
// import PageDropDown from "@/components/drop-downs/pages-dropdown";
// import Dropdown from "@/components/drop-downs/dropDown";

// const SearchBar = () => {
//   return (
//     <div className="relative flex items-center w-[50%] border border-gray-300 rounded-full overflow-hidden">
//       {/* Search Icon */}
//       <img
//         src="/icons/search-glass.png"
//         alt="Search"
//         className="absolute left-4 h-6 w-6"
//       />

//       {/* Input Field */}
//       <input
//         type="text"
//         placeholder="Search Scriptorium"
//         className="w-full pl-12 pr-[110px] py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//       />

//       {/* Search By Button */}

   
//       <div className="absolute text-sm right-0 px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-r-full h-full">
//       {/* <PageDropDown
//           trigger={ <button >
//             Search by <span className="inline-block -translate-y-0.5">⌄</span>
//           </button>}
//           items={[
//             { label: "Home", link: "/home" },
//             { label: "Code", link: "/codeEditor" },
//           ]}
//         /> */}

// <Dropdown
//         trigger={
//             <div >
//             Search by <span className="inline-block -translate-y-0.5">⌄</span>
//           </div>
//         }
//         items={[
//           { label: "Home", link: "/home" },
//           { label: "Profile", link: "/profile" },
//           { label: "Logout", onClick: () => alert("Logging out...") },
//         ]}
//       />
//       </div>
      
      
//     </div>
//   );
// };

// export default SearchBar;


import React from "react";
import Dropdown from "@/components/drop-downs/dropDown";
import PageDropDown from "./drop-downs/pages-dropdown";

const SearchBar = () => {
  return (
    <div className="relative flex items-center w-[50%] h-[50%] border border-gray-300 rounded-full">
      {/* Search Icon */}
      <img
        src="/icons/search-glass.png"
        alt="Search"
        className="absolute left-4 h-6 w-6"
      />

        {/* search scriptorium should change based on search by fields 
        search for a blog title 
        search by tags comma separated 
        search by template title 
        search by content */}
      {/* Input Field */}
      <input
        type="text"
        placeholder="Search Scriptorium"
        className="w-full  pl-12 pr-[110px] py-2 focus:outline-none text-black rounded-l-full"
      />

      {/* Search By Button */}

      {/* "absolute text-sm right-0 px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-r-full h-full */}
      <div className="relative text-sm px-5 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-r-full ">
        <PageDropDown
          trigger={
            
            <button>
            Search by <span className="inline-block -translate-y-0.5">⌄</span>
            </button>
          }
          items={[
            { label: "Title", link: "/home" },
            { label: "Tags", link: "/profile" },
            { label: "Content",link: "/profile" },
          ]}
        />
      </div>
    </div>
  );
};

export default SearchBar;
