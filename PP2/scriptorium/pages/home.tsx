import { useUser } from "@/context/userContext";
import SearchBar from "@/components/searchBar";
import PageDropDown from "@/components/drop-downs/pages-dropdown";
import Layout from "@/components/layout";
import BlogPage from "./blog-page";
import Dropdown from "@/components/drop-downs/dropDown";
import { DropdownProvider } from "@/components/drop-downs/dropdownContext";
import CommentPage from "./comment-page";
import TemplatePage from "./template-page";
import { useDropdownContext } from "@/components/drop-downs/dropdownContext";
import { DropdownItem } from "@/types/dropdown";
import { useEffect, useState } from "react";
import PaginationButton from "@/components/buttons/Paginating"; // Import the reusable component
import { SearchProvider, useSearchContext } from "@/context/SearchContext";

// should work for visitor and user
// home is basically blogs
const HomePage = () => {
  const { user } = useUser();
  const { dropdownStates } = useDropdownContext();
  const { searchQuery } = useSearchContext();

  type resultType = {
    value: string | null | undefined;
  };
  
  const [results, setResults] = useState<resultType[]>([]);
  
  const {
    setSearchQuery,
    selectedFilter,
    setSelectedFilter,
    sortingMethod,
    searchResults,
    setSearchResults,
    loading,
    setLoading,
  } = useSearchContext();
    
    const blogDropdownState = dropdownStates.find((state) => state.id === "blogDropdown");
    const searchDropdownState = dropdownStates.find((state) => state.id === "searchdropdown");


    const [paging, setPaging] = useState<{
      next: number | null;
      previous: number | null;
    }>({
      next: null,
      previous: null,
    });
    
  
    const fetchResults = async (page = 1) => {
      setLoading(true);
      setSearchResults([]); // Clear existing results before fetching

  
      let url = "";
      // Build URL based on selected content type and filters
      if (blogDropdownState?.selectedLabel === "Blogs") {
        if(searchQuery && selectedFilter){
          url = `/api/blog?page=${page}`;
          if(selectedFilter == "Title" ){
            url += `&title=${encodeURIComponent(searchQuery)}`
          } else if (selectedFilter == "Tags"){
            url += `&tags=${encodeURIComponent(searchQuery)}`
          } else if(selectedFilter == "Content"){
            url += `&content=${encodeURIComponent(searchQuery)}`
          } else if (selectedFilter == "Template"){
            url += `&templateTitle=${encodeURIComponent(searchQuery)}`
          }
        }
        else {
          url = `/api/blog/sorted-rating?page=${page}`;
        }
      } else if (blogDropdownState?.selectedLabel === "Templates") {
        console.log("seeing templates");
        url = `/api/template?page=${page}`;
        if(searchQuery && selectedFilter){
          url = `/api/template?page=${page}`;
          if(selectedFilter == "Title" ){
            url += `&title=${encodeURIComponent(searchQuery)}`
          } else if (selectedFilter == "Tags"){
            url += `&tags=${encodeURIComponent(searchQuery)}`
          } else if(selectedFilter == "Content"){
            url += `&explanation=${encodeURIComponent(searchQuery)}`
          } 
        
        } 

      } else {
        url = `/api/comment/sorted-rating?page=${page}`;
      }

      url += "&limit=9";
  
      try {
        console.log(url)
        const response = await fetch(url);
        const data = await response.json();

        console.log(data)
  
        if (response.ok) {
          setResults(
            blogDropdownState?.selectedLabel
              ? [{ value: blogDropdownState.selectedLabel }]
              : []
          );
          

          if(blogDropdownState?.selectedLabel === "Templates"){
            setSearchResults(data.templates || []);
          } else {
            setSearchResults(data.data || []);
          }
          // Calculate `next` and `previous` from pagination info
            const { currentPage, totalPages } = data.pagination;
            setPaging({
              next: currentPage < totalPages ? currentPage + 1 : null,
              previous: currentPage > 1 ? currentPage - 1 : null,
            });
        } else {
          console.error(data.error || "Failed to fetch results.");
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching results:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

// Fetch results whenever searchQuery, selectedFilter, or content type changes
useEffect(() => {
  if (!blogDropdownState?.selectedLabel) return;
  fetchResults(1); // Fetch data when `searchQuery` changes
}, [searchQuery, selectedFilter, blogDropdownState?.selectedLabel]);


const fetchPage = (direction: "next" | "previous") => {
  const page = paging[direction];
  if (!page) return; // No next/previous page available

  fetchResults(page); // Pass the page number to fetch results
};


  const renderContent = () => {
    if (loading) {
      return <div className="text-gray-500 text-center mt-4">Loading...</div>;
    }
  
    if (!searchResults || searchResults.length === 0) {
      return <div className="text-gray-500 text-center mt-4">No results found.</div>;
    }
  
 // Ensure the dropdown state matches the rendered content
  switch (blogDropdownState?.selectedLabel) {
    case "Blogs":
      return blogDropdownState?.selectedLabel === "Blogs" ? (
        <BlogPage data={searchResults} />
      ) : null;
    case "Comments":
      return blogDropdownState?.selectedLabel === "Comments" ? (
        <CommentPage data={searchResults} />
      ) : null;
    case "Templates":
      return blogDropdownState?.selectedLabel === "Templates" ? (
        <TemplatePage data={searchResults} />
      ) : null;
    default:
      return null;
  }
};

  const updateQuery = (query: string) => {
    console.log("Query changed to:", query);
    setSearchQuery(query);
  }

  
  const updateFilter = (filter: string | null) => {
    console.log("Filter changed to:", filter);
    setSelectedFilter(filter);
  }

    return (
      <SearchProvider>
    <div className="h-screen flex flex-col">
  
  <div className="flex flex-row items px-16 py-3 space-x-5 font-mono text-sm font-bold text-gray-500 mb-6">

<button className="flex flex-inline space-x-2 px-4 py-2 rounded-full hover:bg-blue-200 transition ">


<PageDropDown
  id="blogDropdown"
  trigger="Blogs" // Default text for the trigger
  items={[
    { label: "Blogs", link: "/home" },
    { label: "Comments", link: "/home" },
    { label: "Templates", link: "/home" },
  ]}
  updateTriggerText={true} // Enable trigger text update
/>
<span className="inline-block -translate-y-0.5">⌄</span>
</button>

        {/* Dropdown for Sorting */}
        <PageDropDown
          id="sort"
          trigger={
            <button className="px-4 py-2 rounded-full hover:bg-blue-200 transition">
              Sort by <span className="inline-block -translate-y-0.5">⌄</span>
            </button>
          }
          items={
            blogDropdownState?.selectedLabel !== "Templates"
              ? [{ label: "Juiciest", link: "/home" }]
              : null // No items when "Templates" is selected
          }
        />

        <SearchBar
          update={updateQuery}
          filter={updateFilter}
        ></SearchBar> 


        {/* Paging Controls */}
        <PaginationButton
          direction="previous"
          disabled={!paging.previous} // Disable if no previous page
          onClick={() => fetchPage("previous")}
          label="Previous"
        />

        <PaginationButton
          direction="next"
          disabled={!paging.next} // Disable if no next page
          onClick={() => fetchPage("next")}
          label="Next"
        />

      </div>
      
        

        {/* <BlogPage></BlogPage> */}
        {/* <CommentPage></CommentPage> */}
        {/* <TemplatePage></TemplatePage> */}

        {renderContent()}
        
        {/* <div className="flex-auto flex items-center justify-center -my-[2.5%]">
            
            
            
            <div className="flex flex-col bg-white w-[90%] h-[90%] shadow-lg px-10 rounded-lg">
                {login ? (
                    <h1 className="text-3xl font-mono py-10">Hello { user.firstName }!</h1>
                ) : (
                    <h1 className="text-3xl font-mono py-10">Hello!</h1>
                )}
                
            </div>
        </div> */}
        
        {/* <PageDropDown items={[
        { label: "Home", link: "/home" },
        { label: "Code", link: "/codeEditor" },
        { label: "Templates", link: "/templates" }
        ]} /> */}

        {/* <div className="flex flex-row px-16 py-3 space-x-20 font-mono text-sm font-bold text-gray-500">
        <button className="px-4 py-2 rounded-full hover:bg-blue-200 transition ">Blogs <span className="inline-block -translate-y-0.5">⌄</span> </button>
        <button className="px-4 py-2 rounded-full hover:bg-blue-200 transition ">Sort by <span className="inline-block -translate-y-0.5">⌄</span></button>
        </div> */}



    </div>
    </SearchProvider>
    );
  };

export default HomePage;