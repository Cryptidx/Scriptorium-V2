// welcome page 
import BasicHeader from "@/components/basicHeader";

const WelcomePage = () => {

    return(
        <div className="h-screen flex flex-col"> 
            <BasicHeader />

            <div className="flex-1 flex items-center justify-center py-10">
                <div className="flex flex-col items-center justify-center bg-white w-[90%] h-[90%] shadow-lg px-10 rounded-lg">
                <h1 className="text-center text-5xl font-mono pb-3">"Hello User!"</h1>

                <button
                type="submit"
                className="w-[30%] bg-[#132D5F] text-white p-2 rounded-md mt-4 hover:bg-[#0f2440] transition"
                >
                Sign up
                </button>

                <button
                type="submit"
                className="w-[30%] bg-[#132D5F] text-white p-2 rounded-md mt-4 hover:bg-[#0f2440] transition"
                >
                Log in
                </button>

                </div>
            </div>
            
        </div>
        

    )
}

export default WelcomePage