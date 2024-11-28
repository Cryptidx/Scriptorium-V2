import Header from "@/components/header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@/context/userContextHeader";
import Link from "next/link";
import { apiCall } from "@/utils/auth-api-w-refresh";
import { defaultLocalStorage } from "@/utils/default";
import { User } from "@/types/user";
import BlogPreview from "@/components/blogPreview";
import ReportPreview from "@/components/reportPreview";
import ReportDropdown from "@/components/reportsPreview";
import UserEditModal from "@/components/modals/UserModal";

interface UserApi {
    message: string;
    user: User;
}

const Settings = () => {
  const [email, setEmail] = useState("");
  const [id, setId] = useState(-1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [wrapped, setWrapped] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const blogs = [
    {
        title: "Exploring React Patterns",
        description: "Learn about the latest patterns and practices in React development.",
        author: "Jane Doe",
        tags: ["python"],
        language: "python"
      },
      {
        title: "Mastering TypeScript",
        description: "A guide to becoming proficient in TypeScript for modern web development.",
        author: "John Smith",
        tags: ["python", "javascript"],
        language: "python"
      },
      {
        title: "CSS for the Future",
        description: "Discover advanced CSS techniques and upcoming features.",
        author: "Alice Johnson",
        tags: ["python", "javascript"],
        language: "python"
      },
  
      {
        title: "CSS for the Future",
        description: "Discover advanced CSS techniques and upcoming features.",
        author: "Alice Johnson",
        tags: ["python", "javascript", "python", "javascript","python", "javascript"],
        language: "python"
      },
  ];

  const reports = [
    {
        title: "Exploring React Patterns",
        description: "Learn about the latest patterns and practices in React development.",
        author: "Jane Doe",
        tags: ["python"],
        reportCount: 1,
        explanation: ["exp1", "exp2", "exp3"]
      },
      {
        title: "Mastering TypeScript",
        description: "A guide to becoming proficient in TypeScript for modern web development.",
        author: "John Smith",
        tags: ["python", "javascript"],
        reportCount: 1,
        explanation: ["exp1", "exp2", "exp3"]
      },
      {
        title: "CSS for the Future",
        description: "Discover advanced CSS techniques and upcoming features.",
        author: "Alice Johnson",
        tags: ["python", "javascript"],
        reportCount: 1,
        explanation: ["exp1", "exp2", "exp3"]
      },
  
      {
        title: "CSS for the Future",
        description: "Discover advanced CSS techniques and upcoming features.",
        author: "Alice Johnson",
        tags: ["python", "javascript", "python", "javascript","python", "javascript"],
        reportCount: 1,
        explanation: ["exp1", "exp2", "exp3"]
      },
  ];

  const { refreshUser } = useUser();

  const router = useRouter();

  useEffect(() => {
    // Define a function to check window width and update the state
    const handleResize = () => {
      if (window.innerWidth < 1060) {
        setWrapped(true);  // Set to true for smaller screen sizes (e.g., mobile)
      } else {
        setWrapped(false);  // Set to false for larger screen sizes (e.g., desktop)
      }
    };

    // Call the function initially to set the correct layout
    handleResize();

    // Add event listener on window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


    useEffect(() => {
        defaultLocalStorage();

        const validateAccess = async () => {
            try {
                if (localStorage.getItem("accessToken") === "" || localStorage.getItem("refreshToken") === "") {
                    router.push("/");
                    return;
                }
      
                // Check authentication using API call
                const response = await apiCall("/api/auth/is-auth", {
                    method: "POST",
                });
      
                console.log(response);
      
      
                if (!response.success) {
                    router.push("/");
                    return;
                }

                return response;
    
            } catch (err: any) {
                console.error("Error validating access:", err.message);
                router.push("/");
            }
        };

        validateAccess();
    
        try {
            fetch("api/users/user-info", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ` + localStorage.getItem("accessToken"), // Ensure this token is valid
                }
            }).then((response) => {
                if (!response.ok){
                    return;
                }
                return response.json();
            }).then((data: UserApi) => {
                if (!data || !data.user) {
                    return;
                }
                setId(data.user.id);
                setEmail(data.user.email);
                setAvatar(data.user.avatar || "");
                setName(data.user.firstName);
                setLastName(data.user.lastName);
                setPhoneNumber(data.user.phoneNumber || "");
                setRole(data.user.role);
            });

            setLoading(false);

        } catch (error) {
            return;
        }
    }, []);

const avatarUpdate = () => {
    alert("Update Avatar");
  };

  const handleOutput = () => {
    alert("Update User");
  };

  const handleUserSubmit = (data: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    avatar: string;
  }) => {
    setName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);
    setPhoneNumber(data.phoneNumber);
    setAvatar(data.avatar);
    refreshUser();
    setModalOpen(false);
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center py-10">
      <div className={`flex ${wrapped ? 'flex-col justify-center' : 'flex-row justify-between'} items-center bg-white max-w-[90%] min-w-[90%] min-h-[90%] border-[20px] border-white shadow-lg px-10 rounded-lg`}>
        {loading ? (
            <div className="flex items-center justify-center w-full h-full">
                <img className="h-10 w-10 item-center" src="loading.gif"></img>
            </div>
          ) : (
            <>
              <div className={`flex flex-col ${wrapped ? '' : 'mr-10'} items-center`}>
              {/* mt-[50px] */}
                <div className={`relative ${wrapped ? 'w-64 h-64' : 'w-96 h-96'}`}>
                  <img
                    src={avatar}
                    alt="Profile"
                    className={`${wrapped ? 'w-64 h-64' : 'w-96 h-96'} rounded-full object-cover border-8 border-gray-900`}
                  />
                </div>
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  onClick={() => alert('Change Avatar')}
                >
                  Change Profile Photo
                </button>
              </div>

              <div className={`flex flex-col ${wrapped ? '' : 'flex-grow'} justify-center`}>
                <div className={`${wrapped ? 'mt-6' : 'mt-6 space-y-6'}`}>
                  <h2 className={`${wrapped ? 'text-2xl' : 'text-3xl'} font-bold`}>Name: {name} {lastName}</h2>
                  <h2 className={`${wrapped ? 'text-2xl' : 'text-3xl'} font-bold`}>Email: {email}</h2>
                  {phoneNumber && <h2 className={`${wrapped ? 'text-2xl' : 'text-3xl'} font-bold`}>Phone Number: {phoneNumber}</h2>}
                </div>

                <button
                  className="mt-6 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  onClick={() => setModalOpen(true)}
                >
                  Update
                </button>

                <UserEditModal
                  isOpen={modalOpen}
                  onClose={() => setModalOpen(false)}
                  onSubmit={handleUserSubmit}
                  defaultValues={{
                        "firstName": name,
                        "lastName": lastName,
                        "email": email,
                        "phoneNumber": phoneNumber,
                        "avatar": avatar
                    }
                  }
                />

                {role === "user" ? (
                    <>
                        <h2 className={`${wrapped ? 'text-2xl' : 'text-3xl'} mt-6 font-bold`}>Templates:</h2>

                        {blogs.length === 0 ? (
                        <h2 className={`${wrapped ? 'text-xl' : 'text-2xl'} mt-3 font-normal`}>User has no templates</h2>
                        ) : (
                        <div className={`mt-6 flex flex-col overflow-y-auto max-h-[300px] min-w-[100px] ${wrapped ? '' : 'flex-col overflow-y-auto max-h-[300px]'} border border-gray-300 dark:border-gray-700 rounded-lg p-4 space-y-2`}>
                            {blogs.map((blog, index) => (
                            <BlogPreview
                                key={index}
                                title={blog.title}
                                description={blog.description}
                                author={blog.author}
                                tags={blog.tags}
                                language={blog.language}
                            />
                            ))}
                        </div>
                        )}
                    </>
                    ) : ( <>
                            <ReportDropdown
                                blogReports={reports} // Array of blog report objects
                                commentReports={[]} // Array of comment report objects
                                wrapped={wrapped} // Set this to true or false based on your layout needs
                            />
                        </>
                    )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
