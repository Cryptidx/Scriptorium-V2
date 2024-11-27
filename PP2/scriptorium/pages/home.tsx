import Header from "@/components/header";
import { useUser } from "@/context/userContext";
import SearchBar from "@/components/searchBar";
import PageDropDown from "@/components/drop-downs/pages-dropdown";
import Layout from "@/components/layout";
import BlogPage from "./blog-page";

// should work for visitor and user
// home is basically blogs
const HomePage = () => {
    const { user } = useUser();

    const login = user != null;
    
    return (
    <div className="h-screen flex flex-col">
        <Header showSearchBar={true}/>
        {/* <PageDropDown items={[
        { label: "Home", link: "/home" },
        { label: "Code", link: "/codeEditor" },
        { label: "Templates", link: "/templates" }
        ]} /> */}

        {/* <div className="flex flex-row px-16 py-3 space-x-20 font-mono text-sm font-bold text-gray-500">
        <button className="px-4 py-2 rounded-full hover:bg-blue-200 transition ">Blogs <span className="inline-block -translate-y-0.5">⌄</span> </button>
        <button className="px-4 py-2 rounded-full hover:bg-blue-200 transition ">Sort by <span className="inline-block -translate-y-0.5">⌄</span></button>
        </div> */}


<div className="flex flex-row px-16 py-3 space-x-5 font-mono text-sm font-bold text-gray-500">
        <PageDropDown
          trigger={  
        <button className="px-4 py-2 rounded-full hover:bg-blue-200 transition ">Blogs <span className="inline-block -translate-y-0.5">⌄</span> </button>
          }
          items={[
            { label: "Blogs", link: "/home" },
            { label: "Comments", link: "/home" },
            { label: "Templates", link: "/templates" },
          ]}
        />

        <PageDropDown
          trigger={  
            <button className="px-4 py-2 rounded-full hover:bg-blue-200 transition ">Sort by <span className="inline-block -translate-y-0.5">⌄</span></button>
          }
          items={[
            { label: "Juciest", link: "/home" },
          ]}
        />
        </div>

        <BlogPage></BlogPage>
        
        {/* <div className="flex-auto flex items-center justify-center -my-[2.5%]">
            
            
            
            <div className="flex flex-col bg-white w-[90%] h-[90%] shadow-lg px-10 rounded-lg">
                {login ? (
                    <h1 className="text-3xl font-mono py-10">Hello { user.firstName }!</h1>
                ) : (
                    <h1 className="text-3xl font-mono py-10">Hello!</h1>
                )}
                
            </div>
        </div> */}
    </div>
    );
  };

export default HomePage;