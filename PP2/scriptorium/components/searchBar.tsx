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
import { DropdownProvider } from "./drop-downs/dropdownContext";
import { useDropdownContext } from "./drop-downs/dropdownContext";
import { DropdownItem } from "@/types/dropdown";

const SearchBar = () => {

  

  const blogItems: DropdownItem[] = [
    { label: "Title", link: "/home" },
    { label: "Tags", link: "/home" },
    { label: "Content",link: "/home" },
    { label: "Template",link: "/home" },
  ];

  const commentItems: DropdownItem[] = [
    { label: "Content",link: "/home" },
  ];

  const templateItems: DropdownItem[] = [
    { label: "Title", link: "/home" },
    { label: "Tags", link: "/home" },
  ];

  let itemsView: DropdownItem[] = blogItems;

  const { dropdownStates } = useDropdownContext();

  const searchDropdownState = dropdownStates.find(
    (state) => state.id === "searchdropdown"
  );
  const blogDropdownState = dropdownStates.find(
    (state) => state.id === "blogDropdown"
  );

  let placeholder = "Search Scriptorium by ...";

  if (blogDropdownState?.selectedLabel === "Blogs") {
    itemsView = blogItems;
    if (searchDropdownState?.selectedLabel === "Title" || searchDropdownState?.selectedLabel === "Content") {
      placeholder = "Search blogs by title or content";
    } else if (searchDropdownState?.selectedLabel === "Tags") {
      placeholder = "Search blogs by tags, comma-separated";
    }
    else if(searchDropdownState?.selectedLabel === "Template"){
      placeholder = "Search blogs by template title";
    }
  } 
  
  else if (blogDropdownState?.selectedLabel === "Comments") {
    itemsView = commentItems;
    placeholder = "Search comments by content";
  } 
  
  else if (blogDropdownState?.selectedLabel === "Templates") {
    itemsView = templateItems;
    if (searchDropdownState?.selectedLabel === "Tags") {
      placeholder = "Search templates by tags, comma-separated";
    }

    else if (searchDropdownState?.selectedLabel === "Title") {
      placeholder = "Search templates by title";
    }
  }

  return (
    <div className="relative flex items-center w-[50%] h-[50%] border border-gray-300 rounded-full">
      {/* Search Icon */}
      <img
        src="/icons/search-glass.png"
        alt="Search"
        className="absolute left-4 h-6 w-6"
      />

      <input
        type="text"
        placeholder={placeholder}
        className="w-full  pl-12 pr-[110px] py-2 focus:outline-none text-black rounded-l-full"
      />

      {/* Search By Button */}

      {/* "absolute text-sm right-0 px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-r-full h-full */}
      <div className="relative text-sm px-5 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-r-full ">
        
     
        <PageDropDown
            id="searchdropdown"
          trigger={
            
            <button>
            Search by <span className="inline-block -translate-y-0.5">⌄</span>
            </button>
          }
          items={itemsView}
        />
      </div>
    </div>
  );
};

export default SearchBar;
