import Header from "@/components/header";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { defaultLocalStorage } from "@/utils/default";

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    defaultLocalStorage();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      // Signup API Call
      const signupResponse = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const signupData = await signupResponse.json();

      if (!signupResponse.ok) {
        setErrorMessage(signupData.error || "Signup failed. Please try again.");
        return;
      }

      console.log("Signup successful:", signupData.user);

      // Auto Login After Successful Signup
      const loginResponse = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        setErrorMessage(loginData.error || "Auto login failed. Please log in manually.");
        return;
      }

      // Extract tokens and user data
      const { accessToken, refreshToken } = loginData;

    // Store tokens in local storage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
      
      // Redirect user to avatar selection or another page
      localStorage.setItem("accessAvatarSelection", "true");
      router.push("/avatar-selection");

    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center py-10">
        <div className="flex flex-col items-start justify-start bg-white w-[90%] h-[90%] shadow-lg px-10 py-7 rounded-lg">
          <h4 className="text-center text-xl font-mono pb-3">
            Create a <i>shiny new</i> Scriptorium account
          </h4>

          {/* Signup Form */}
          <form className="w-full flex flex-col" onSubmit={handleSignup}>
            <div className="w-[50%] flex flex-row space-x-5">
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-[50%] p-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-[50%] p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="py-10 w-[50%]">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="w-[50%] flex flex-row space-x-5">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-[50%] p-2 border border-gray-300 rounded-md"
                required
              />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Repeat Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-[50%] p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="py-10 w-[50%]">
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-[49%] p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-[30%] bg-[#132D5F] text-white p-2 rounded-md mt-4 hover:bg-[#0f2440] transition"
            >
              {loading ? "Signing up..." : "Next"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
