import React, { useEffect } from "react";
import PageDropDown from "./drop-downs/pages-dropdown";
import { useDropdownContext } from "./drop-downs/dropdownContext";
import { DropdownItem } from "@/types/dropdown";
import { SearchProvider, useSearchContext } from "@/context/SearchContext";

interface SearchBar {
  update: (query: string) => void;
  filter: (filter: string | null) => void;

}

const SearchBar: React.FC<SearchBar> = ({update, filter}) => {
  const {
    searchQuery,
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
  } = useSearchContext();

  const blogItems: DropdownItem[] = [
    { label: "Title", link: "/home" },
    { label: "Tags", link: "/home" },
    { label: "Content", link: "/home" },
    { label: "Template", link: "/home" },
  ];

  const templateItems: DropdownItem[] = [
    { label: "Title", link: "/home" },
    { label: "Tags", link: "/home" },
    { label: "Content", link: "/home" },
  ];

  let itemsView: DropdownItem[] = blogItems;

  const { dropdownStates } = useDropdownContext();
  const searchDropdownState = dropdownStates.find((state) => state.id === "searchdropdown");
  const blogDropdownState = dropdownStates.find((state) => state.id === "blogDropdown");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    update(e.target.value);
    setSearchQuery(e.target.value); // Update the context state
  };

  let placeholder = "Search Scriptorium by ...";

  if (blogDropdownState?.selectedLabel === "Blogs") {
    itemsView = blogItems;
    if (searchDropdownState?.selectedLabel === "Title") {
      placeholder = "Search blogs by title";
    } else if (searchDropdownState?.selectedLabel === "Content") {
      placeholder = "Search blogs by content";
    }else if (searchDropdownState?.selectedLabel === "Tags") {
      placeholder = "Search blogs by tags, comma-separated";
    } else if (searchDropdownState?.selectedLabel === "Template") {
      placeholder = "Search blogs by template title";
    }
  } else if (blogDropdownState?.selectedLabel === "Comments") {
    placeholder = "View comments by top rated";
  } else if (blogDropdownState?.selectedLabel === "Templates") {
    itemsView = templateItems;
    if (searchDropdownState?.selectedLabel === "Tags") {
      placeholder = "Search templates by tags, comma-separated";
    } else if (searchDropdownState?.selectedLabel === "Title") {
      placeholder = "Search templates by title";
    } else if (searchDropdownState?.selectedLabel === "Content") {
      placeholder = "Search templates by content";
    }
  }

  useEffect(() => {
    // Update filter based on dropdown selection
    if (searchDropdownState?.selectedLabel) {
      filter(searchDropdownState.selectedLabel);
      setSelectedFilter(searchDropdownState.selectedLabel);

    }
  }, [searchDropdownState]);

  
  // Automatically set query text based on the dropdown state
  useEffect(() => {
    if (blogDropdownState?.selectedLabel === "Comments") {
      setSearchQuery("Comments are sorted by juiciness");
      setSelectedFilter(null);
      filter(null);
    } else {
      setSearchQuery("");
    }
  }, [blogDropdownState?.selectedLabel]);

  return (
    <SearchProvider>
    <div className="relative flex items-center w-[50%] h-[50%] border border-gray-300 rounded-full">
      {/* Search Icon */}
      <img
        src="/icons/search-glass.png"
        alt="Search"
        className="absolute left-4 h-6 w-6"
      />

      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange} // Correctly bind the handler
        placeholder={placeholder}
        className="w-full pl-12 pr-[110px] py-2 focus:outline-none text-black rounded-l-full input-class"
        disabled={blogDropdownState?.selectedLabel === "Comments"} // Disable for Comments
      />

      {/* Search By Button */}
      <div className="relative text-sm px-5 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-r-full">
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
    </SearchProvider>
  );
};

export default SearchBar;
