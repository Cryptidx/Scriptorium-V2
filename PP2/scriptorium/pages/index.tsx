import Header from "@/components/header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { defaultLocalStorage } from "@/utils/default";
import Link from "next/link";
import { DropdownProvider } from "@/components/drop-downs/dropdownContext";

const MainPage = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    defaultLocalStorage();
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    console.log(email, password);
  
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setErrorMessage(data.error || "Login failed. Please try again.");
        return;
      }
  
      // Extract tokens and user data from the response
      const { accessToken, refreshToken } = data;
  
      // Store tokens in local storage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    
      // Redirect to home page
      router.push("/home");
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="h-screen flex flex-col">
      <DropdownProvider>
      <Header />
      <div className="flex-1 flex items-center justify-center py-10">
        <div className="flex flex-col items-center justify-center bg-white w-[90%] h-[90%] shadow-lg px-10 rounded-lg">
          <h1 className="text-center text-5xl font-mono pb-3">Scriptorium</h1>
          <h2 className="text-center text-m font-mono">the global code compiler</h2>

          <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="font-medium">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="password" className="font-medium">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {loading && (  <div className="flex justify-center mb-10">
                <img className="h-10 w-10 item-center" src="loading.gif"></img>
              </div>
            )}

            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#132D5F] text-white p-2 rounded-md mt-4 hover:bg-[#0f2440] transition"
            >
              Log In
            </button>
          </form>
          
          
          <p className="my-[2%]"> Don't have an account?  
            <Link href="/signup"> <span className="text-blue-[#132D50] underline">Create a Scriptorium account</span></Link>
            </p>

        </div>
      </div>
      </DropdownProvider>
      
    </div>
  );
};

export default MainPage;
