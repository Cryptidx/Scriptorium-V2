import React from "react";

const SearchBar = () => {
    return (
        <div className="relative flex items-center w-[50%]">
            {/* Search Icon */}
            <img
                src="/icons/search-glass.png"
                alt="Search"
                className="absolute left-4 h-7 w-7"
            />
            {/* Input Field */}
            <input
                type="text"
                placeholder="Search Scriptorium"
                className="w-full p-2 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
        </div>
    );
};

export default SearchBar;