import React, { useState } from "react";
import Header from "@/components/header";
import AvatarPanel from "@/components/avatarPanel";
import Link from "next/link"

const AvatarSelectionPage = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    // Default avatar image sources
    const avatarImages = [
        "/avatar_images/pfp1.png",
        "/avatar_images/pfp2.png",
        "/avatar_images/pfp3.png",
        "/avatar_images/pfp4.png",
        "/avatar_images/pfp5.png",
    ];

    return (
        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center py-10">
                <div className="flex flex-col items-center justify-center bg-white w-[90%] h-[90%] shadow-lg px-10 rounded-lg">
                    <h1 className="text-2xl font-bold mb-6 my-0">Select Your Avatar</h1>
                    <div className="grid grid-cols-3 gap-6">
                        {avatarImages.map((src, index) => (
                            <AvatarPanel
                                key={index}
                                src={src}
                                isSelected={selectedIndex === index}
                                onClick={() => setSelectedIndex(index)}
                            />
                        ))}

                        {/* Upload Panel */}
                        <div
                            onClick={() => setSelectedIndex(null)}
                            className={`relative w-24 h-24 rounded-lg cursor-pointer border-4 ${
                                selectedIndex === null ? "border-green-500" : "border-transparent"
                            } flex items-center justify-center bg-gray-100`}
                        >
                            <span className="text-gray-500 text-sm text-center">
                                Upload
                            </span>
                            
                        </div>
                    </div>

                    
                    <Link href="/home">
                        <button
                            type="submit"
                            className="w-48 bg-[#132D5F] text-white p-2 rounded-md mt-4 hover:bg-[#0f2440] transition text-center"
                        >
                            Done
                        </button>
                    </Link>
                    
                </div>
            </div>
        </div>
    );
};

export default AvatarSelectionPage;
