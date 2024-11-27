// // import React from "react";

// // const PageDropDown = () => {
// //     return (
// //         <div className="flex flex-col items-center text-center bg-gray-50 space-y-2 w-[8%]
// //         rounded-lg shadow-lg">
            
// //                 <div className="w-[100%] h-[100%] hover:bg-gray-100 transition ">
// //                 <button>
// //                     Home
// //                 </button>
// //                 </div>

// //                 <div className="w-[100%] h-[100%] hover:bg-gray-100 transition">
// //                 <button>
// //                     Code
// //                 </button>
// //                 </div>

// //                 <div className="w-[100%] hover:bg-gray-100 transition">
// //                 <button>
// //                     Templates
// //                 </button>
// //                 </div>
           
           
           
// //         </div>
// //     );
// // }

// // export default PageDropDown;

// import React, { useState } from "react";

// const PageDropDown: React.FC = () => {
//     // Define a type for the button names
//     type ButtonName = "Home" | "Code" | "Templates";

//     // Use the ButtonName type for the activeButton state
//     const [activeButton, setActiveButton] = useState<ButtonName | null>(null);

//     // Ensure the buttonName parameter has the ButtonName type
//     const handleButtonClick = (buttonName: ButtonName) => {
//         setActiveButton(buttonName);
//     };

//     return (
//         <div
//             className="flex flex-col items-center text-center bg-gray-50 text-sm w-[8%]
//             rounded-lg shadow-lg z-20 absolute"
//         >
//             {/* Home Button */}
//             <div
//                 className={`w-full h-full rounded-lg  rounded-b-none ${
//                     activeButton === "Home" ? "bg-gray-200" : "hover:bg-gray-100"
//                 } transition`}
//             >
//                 <button
//                     className="w-full py-2"
//                     onClick={() => handleButtonClick("Home")}
//                 >
//                     Home
//                 </button>
//             </div>

//             {/* Code Button */}
//             <div
//                 className={`w-full h-full ${
//                     activeButton === "Code" ? "bg-gray-200" : "hover:bg-gray-100"
//                 } transition`}
//             >
//                 <button
//                     className="w-full py-2"
//                     onClick={() => handleButtonClick("Code")}
//                 >
//                     Code
//                 </button>
//             </div>

//             {/* Templates Button */}
//             <div
//                 className={`w-full h-full rounded-lg  rounded-t-none ${
//                     activeButton === "Templates" ? "bg-gray-200" : "hover:bg-gray-100"
//                 } transition`}
//             >
//                 <button
//                     className="w-full py-2"
//                     onClick={() => handleButtonClick("Templates")}
//                 >
//                     Templates
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PageDropDown;


// import React, { useState } from "react";

// // Props type definition
// interface PageDropDownProps {
//     items: string[]; // List of items to display in the dropdown
// }

// const PageDropDown: React.FC<PageDropDownProps> = ({ items }) => {
//     const [activeItem, setActiveItem] = useState<string | null>(null); // Track the active item

//     // Handle button click
//     const handleItemClick = (item: string) => {
//         setActiveItem(item);
//     };

//     return (
//         <div
//             className="relative inline-block "
//         >
//             {/* Dropdown Container */}
//             <div className="flex flex-col bg-gray-50 text-sm w-[8%] rounded-lg shadow-lg z-20 absolute ">
//                 {items.map((item, index) => (
//                     <div
//                         key={index}
//                         className={`w-full ${index===0 ? "rounded-lg rounded-b-none": index===items.length-1? "rounded-lg rounded-t-none": "" } ${
//                             activeItem === item ? "bg-gray-200" : "hover:bg-gray-100"
//                         } transition`}
//                     >
//                         <button
//                             className="w-full py-2 text-left px-4"
//                             onClick={() => handleItemClick(item)}
//                         >
//                             {item}
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default PageDropDown;

// import React, { useState } from "react";
// import { useRouter } from "next/router";

// // Props type definition
// interface DropdownItem {
//     label: string; // The text to display
//     link: string;  // The URL to navigate to
    
// }

// interface PageDropDownProps {
//     src: string; // source image
//     items: DropdownItem[]; // List of items with labels and links
//     isProfile: string;
// }

// const PageDropDown: React.FC<PageDropDownProps> = ({ src, items, isProfile }) => {
//     const [activeItem, setActiveItem] = useState<string | null>(null);
//     const [isOpen, setIsOpen] = useState(false);
//     const router = useRouter(); // Next.js router for navigation

//     const handleItemClick = (label: string, link: string) => {
//         setActiveItem(label);
//         router.push(link); // Navigate to the link
//     };

//     // Toggle dropdown visibility
//     const toggleDropdown = () => {
//         setIsOpen(!isOpen);
//     };

   

//     return (
//         <div className="flex flex-col items-center">
//             {/* Dropdown Container */}
//             <button onClick={toggleDropdown}>
//                 <img src={src} className= { `mt-1 object-scale-down h-10 w-10 ${parseInt(isProfile) === 1 ? "rounded-full" : "" }`} />
//             </button>
            
//             {isOpen && ( <div className="flex flex-col bg-gray-50 text-sm w-[8%] rounded-lg shadow-lg z-20 absolute mt-[5%] text-black">
//                 {items.map((item, index) => (
//                     <div
//                         key={index}
//                         className={`w-full w-full ${index===0 && index===items.length-1 ? "rounded-lg" : index===0 ? "rounded-lg rounded-b-none": index===items.length-1? "rounded-lg rounded-t-none": ""} ${
//                             activeItem === item.label ? "bg-gray-200" : "hover:bg-gray-100"
//                         } transition`}
//                     >
//                         <button
//                             className="block w-full py-2 text-left px-4"
//                             onClick={() => handleItemClick(item.label, item.link)} // Trigger click and navigation
//                         >
//                             {item.label}
//                         </button>
//                     </div>
//                 ))}
//             </div>)}
            
           
//         </div>
//     );
// };

// export default PageDropDown;
// import React, { useState } from "react";
// import { useRouter } from "next/router";

// // Props type definition
// interface DropdownItem {
//   label: string; // The text to display
//   link: string;  // The URL to navigate to
// }

// interface PageDropDownProps {
//   trigger: React.ReactNode; // Trigger element for the dropdown
//   items: DropdownItem[]; // List of items with labels and links
// }

// const PageDropDown: React.FC<PageDropDownProps> = ({ trigger, items }) => {
//   const [activeItem, setActiveItem] = useState<string | null>(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const router = useRouter(); // Next.js router for navigation

//   const handleItemClick = (label: string, link: string) => {
//     setActiveItem(label);
//     router.push(link); // Navigate to the link
//   };

//   // Toggle dropdown visibility
//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="flex flex-col items-center">
//       {/* Dropdown Trigger */}
//       <div onClick={toggleDropdown} className="cursor-pointer">
//         {trigger}
//       </div>

//       {/* Dropdown Menu */}
//       {isOpen && (
//         <div className="flex flex-col bg-gray-50 text-sm w-24 rounded-lg shadow-xl border-2 border-gray-100 z-50 absolute mt-12 text-black font-sans font-normal">
//           {items.map((item, index) => (
//             <div
//               key={index}
//               className={`${
//                 index === 0 && index === items.length - 1
//                   ? "rounded-lg"
//                   : index === 0
//                   ? "rounded-t-lg"
//                   : index === items.length - 1
//                   ? "rounded-b-lg"
//                   : ""
//               } ${
//                 activeItem === item.label ? "bg-gray-200" : "hover:bg-gray-100"
//               } transition`}
//             >
//               <button
//                 className="block w-full py-2 text-left px-4"
//                 onClick={() => handleItemClick(item.label, item.link)}
//               >
//                 {item.label}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PageDropDown;

// import React from "react";
// import { useRouter } from "next/router";
// import { useDropdownContext } from "./dropdownContext";

// interface DropdownItem {
//   label: string;
//   link: string;
// }

// interface PageDropDownProps {
//   id: string; // Unique identifier for the dropdown
//   trigger: React.ReactNode; // Trigger element for the dropdown
//   items: DropdownItem[]; // List of items with labels and links
// }

// const PageDropDown: React.FC<PageDropDownProps> = ({ id, trigger, items }) => {
//   const { openDropdownId, setOpenDropdownId } = useDropdownContext();
//   const isOpen = openDropdownId === id; // Check if this dropdown is open
//   const router = useRouter();

//   const handleItemClick = (label: string, link: string) => {
//     setOpenDropdownId(null); // Close the dropdown after selection
//     router.push(link);
//   };

//   const toggleDropdown = () => {
//     setOpenDropdownId(isOpen ? null : id); // Toggle this dropdown
//   };

//   return (
//     <div className="flex flex-col items-center content-center relative">
//       {/* Dropdown Trigger */}
//       <div onClick={toggleDropdown} className="cursor-pointer">
//         {trigger}
//       </div>

//       {/* Dropdown Menu */}
//       {isOpen && (
//         <div className="flex flex-col bg-gray-50 text-sm w-24 rounded-lg shadow-xl border-2 border-gray-100 z-50 absolute mt-12 text-black font-sans font-normal">
//           {items.map((item, index) => (
//             <div
//               key={index}
//               className={`${
//                 index === 0 && index === items.length - 1
//                   ? "rounded-lg"
//                   : index === 0
//                   ? "rounded-t-lg"
//                   : index === items.length - 1
//                   ? "rounded-b-lg"
//                   : ""
//               } ${
//                 item.label === openDropdownId ? "bg-gray-200" : "hover:bg-gray-100"
//               } transition`}
//             >
//               <button
//                 className="block w-full py-2 text-left px-4"
//                 onClick={() => handleItemClick(item.label, item.link)}
//               >
//                 {item.label}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PageDropDown;

// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import { useDropdownContext } from "./dropdownContext";

// interface DropdownItem {
//   label: string;
//   link: string;
// }

// interface PageDropDownProps {
//   id: string; // Unique identifier for the dropdown
//   trigger: React.ReactNode | string; // Trigger element or default text for the dropdown
//   items: DropdownItem[]; // List of items with labels and links
//   updateTriggerText?: boolean; // Optional param to update trigger text
// }

// const PageDropDown: React.FC<PageDropDownProps> = ({
//   id,
//   trigger,
//   items,
//   updateTriggerText = false,
// }) => {
//   const { openDropdownId, setOpenDropdownId } = useDropdownContext();
//   const isOpen = openDropdownId === id; // Check if this dropdown is open
//   const router = useRouter();
//   const [triggerText, setTriggerText] = useState(
//     typeof trigger === "string" ? trigger : ""
//   ); // State for the trigger text (if applicable)

//   const handleItemClick = (label: string, link: string) => {
//     if (updateTriggerText) {
//       setTriggerText(label); // Update the trigger text
//     }
//     setOpenDropdownId(null); // Close the dropdown after selection
//     router.push(link);
//   };

//   const toggleDropdown = () => {
//     setOpenDropdownId(isOpen ? null : id); // Toggle this dropdown
//   };

//   return (
//     <div className="flex flex-col items-center content-center relative">
//       {/* Dropdown Trigger */}
//       <div onClick={toggleDropdown} className="cursor-pointer">
//         {updateTriggerText && triggerText ? (
//           <span>{triggerText}</span>
//         ) : (
//           trigger
//         )}
//       </div>

//       {/* Dropdown Menu */}
//       {isOpen && (
//         <div className="flex flex-col bg-gray-50 text-sm w-24 rounded-lg shadow-xl border-2 border-gray-100 z-50 absolute mt-12 text-black font-sans font-normal">
//           {items.map((item, index) => (
//             <div
//               key={index}
//               className={`${
//                 index === 0 && index === items.length - 1
//                   ? "rounded-lg"
//                   : index === 0
//                   ? "rounded-t-lg"
//                   : index === items.length - 1
//                   ? "rounded-b-lg"
//                   : ""
//               } ${
//                 item.label === openDropdownId ? "bg-gray-200" : "hover:bg-gray-100"
//               } transition`}
//             >
//               <button
//                 className="block w-full py-2 text-left px-4"
//                 onClick={() => handleItemClick(item.label, item.link)}
//               >
//                 {item.label}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PageDropDown;

import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDropdownContext } from "./dropdownContext";

interface DropdownItem {
  label: string;
  link: string;
}

interface PageDropDownProps {
  id: string; // Unique identifier for the dropdown
  trigger: React.ReactNode | string; // Trigger element or default text for the dropdown
  items?: DropdownItem[] | null; // List of items with labels and links
  updateTriggerText?: boolean; // Optional param to update trigger text
}

const PageDropDown: React.FC<PageDropDownProps> = ({
  id,
  trigger,
  items,
  updateTriggerText = false,
}) => {
  const { openDropdownId, setOpenDropdownId, updateDropdownState } = useDropdownContext();
  const isOpen = openDropdownId === id;
  const [triggerText, setTriggerText] = useState(
    typeof trigger === "string" ? trigger : ""
  );
  const router = useRouter();

  const handleItemClick = (label: string, link: string) => {
    if (updateTriggerText) {
      setTriggerText(label);
    }
    updateDropdownState(id, label); // Update context state
    setOpenDropdownId(null); // Close the dropdown
    router.push(link);
  };

  const toggleDropdown = () => {
    setOpenDropdownId(isOpen ? null : id);
  };

  return (
    <div className="flex flex-col items-center content-center relative">
      {/* Dropdown Trigger */}
      <div onClick={toggleDropdown} className="cursor-pointer">
        {updateTriggerText && triggerText ? (
          <span>{triggerText}</span>
        ) : (
          trigger
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && items && (
        <div className="flex flex-col bg-gray-50 text-sm w-24 rounded-lg shadow-xl border-2 border-gray-100 z-50 absolute mt-12 text-black font-sans font-normal">
          {items.map((item, index) => (
            <div
              key={index}
              className={`${
                index === 0 && index === items.length - 1
                  ? "rounded-lg"
                  : index === 0
                  ? "rounded-t-lg"
                  : index === items.length - 1
                  ? "rounded-b-lg"
                  : ""
              } ${
                item.label === openDropdownId ? "bg-gray-200" : "hover:bg-gray-100"
              } transition`}
            >
              <button
                className="block w-full py-2 text-left px-4"
                onClick={() => handleItemClick(item.label, item.link)}
              >
                {item.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PageDropDown;
