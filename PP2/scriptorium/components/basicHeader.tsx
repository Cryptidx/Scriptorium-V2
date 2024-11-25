import React from "react";

const BasicHeader : React.FC = () => {

    return(
        <header className="flex justify-between items-center p-4 bg-[#132D5F] text-white">
        <div>
            <button className="flex justify-between font-mono font-bold text-2xl">
                <img src="/icons/logo.png" className="object-scale-down h-10 w-10"></img>
                <p className="px-2 content-center">Scriptorium</p>
            </button>
        </div>
    </header>
    );
}

export default BasicHeader;