import Header from "@/components/header";
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

// should work for visitor and user
// home is basically blogs
const HomePage = () => {
    const { user } = useUser();

    const login = user != null;

    const { dropdownStates } = useDropdownContext();

    const sortDropdownState = dropdownStates.find(
      (state) => state.id === "sort"
    );
    
    const blogDropdownState = dropdownStates.find(
      (state) => state.id === "blogDropdown"
    );

    const renderContent = () => {
      switch (blogDropdownState?.selectedLabel) {
        case "Blogs":
          return <BlogPage />;
        case "Comments":
          return <CommentPage />;
        case "Templates":
          return <TemplatePage />;
        default:
          return <BlogPage />; // Default to BlogPage if nothing is selected
      }
    };
    
    return (
    <div className="h-screen flex flex-col">
  
        <Header showSearchBar={true}/>
        <div className="flex flex-row px-16 py-3 space-x-5 font-mono text-sm font-bold text-gray-500">

        {/* <Header showSearchBar={true}></Header> */}

       
        {/* <PageDropDown
        id="blogsdropdown"
          trigger={  
        <button className="px-4 py-2 rounded-full hover:bg-blue-200 transition ">Blogs <span className="inline-block -translate-y-0.5">⌄</span> </button>
          }
          items={[
            { label: "Blogs", link: "/home" },
            { label: "Comments", link: "/home" },
            { label: "Templates", link: "/templates" },
          ]}
        /> */}
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


        <PageDropDown
        id="sort"
          trigger={  
            <button className="px-4 py-2 rounded-full hover:bg-blue-200 transition ">Sort by <span className="inline-block -translate-y-0.5">⌄</span></button>
          }
          items={
            blogDropdownState?.selectedLabel !== "Templates"
              ? [{ label: "Juciest", link: "/home" }]
              : null // No items when "Templates" is selected
          }
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
    );
  };

export default HomePage;