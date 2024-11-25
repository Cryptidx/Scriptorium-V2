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

import React, { useState } from "react";
import { useRouter } from "next/router";

// Props type definition
interface DropdownItem {
    label: string; // The text to display
    link: string;  // The URL to navigate to
}

interface PageDropDownProps {
    items: DropdownItem[]; // List of items with labels and links
}

const PageDropDown: React.FC<PageDropDownProps> = ({ items }) => {
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const router = useRouter(); // Next.js router for navigation

    const handleItemClick = (label: string, link: string) => {
        setActiveItem(label);
        router.push(link); // Navigate to the link
    };

    return (
        <div className="relative inline-block text-left">
            {/* Dropdown Container */}
            <div className="flex flex-col bg-gray-50 text-sm w-[8%] rounded-lg shadow-lg z-20 absolute">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className={`w-full ${
                            activeItem === item.label ? "bg-gray-200" : "hover:bg-gray-100"
                        } transition`}
                    >
                        <button
                            className="block w-full py-2 text-left px-4"
                            onClick={() => handleItemClick(item.label, item.link)} // Trigger click and navigation
                        >
                            {item.label}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PageDropDown;
