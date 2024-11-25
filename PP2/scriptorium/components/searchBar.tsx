import React from "react";

const SearchBar : React.FC = () => {
    
    return(
        <div>
            <input>
                type="text"
                id="email"
                name="email"
                defaultValue={"Search Sciprorium"}
                className="w-[50%] p-2 border border-gray-300 rounded-md "
            </input>
        </div>
    );
}

export default SearchBar;