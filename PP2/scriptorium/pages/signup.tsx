import Header from "@/components/header";
import { useRouter } from "next/router";

const SignupPage = () => {
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Perform custom validation or data processing here if needed
        router.push("/avatar-selection"); // Redirect programmatically
    };

    return (
        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center py-10">
                <div className="flex flex-col items-start justify-start bg-white w-[90%] h-[90%] shadow-lg px-10 py-7 rounded-lg">
                    <h4 className="text-center text-xl font-mono pb-3">
                        Create a <i>shiny new</i> Scriptorium account
                    </h4>

                    {/* Form Element */}
                    <form className="w-full flex flex-col" onSubmit={handleSubmit}>
                        <div className="w-[50%] flex flex-row space-x-5">
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="First name"
                                className="w-[50%] p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Last name"
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
                                className="w-[50%] p-2 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="password"
                                id="repeatPassword"
                                name="repeatPassword"
                                placeholder="Repeat Password"
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
                                className="w-[49%] p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-[30%] bg-[#132D5F] text-white p-2 rounded-md mt-4 hover:bg-[#0f2440] transition"
                        >
                            Next
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
