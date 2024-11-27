import React, { useState } from "react";
import Header from "@/components/header";
import AvatarPanel from "@/components/avatarPanel";
import Link from "next/link";
import AvatarUpload from "@/components/avatarUpload"; // Import the AvatarUpload component

const AvatarSelectionPage: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null); // Track the uploaded avatar

  // Default avatar image sources
  const avatarImages = [
    "/avatar_images/pfp1.png",
    "/avatar_images/pfp2.png",
    "/avatar_images/pfp3.png",
    "/avatar_images/pfp4.png",
    "/avatar_images/pfp5.png",
  ];

  const handleUploadSuccess = (filePath: string) => {
    setUploadedAvatar(filePath);
    setSelectedIndex(null); // Ensure no default avatar is selected
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center py-10">
        <div className="flex flex-col items-center justify-center bg-white w-[90%] h-[90%] shadow-lg px-10 rounded-lg">
          <h1 className="text-2xl font-bold mb-6">Select Your Avatar</h1>
          
          {/* Avatar Grid */}
          <div className="grid grid-cols-3 gap-6">
            {/* Default Avatars */}
            {avatarImages.map((src, index) => (
              <AvatarPanel
                key={index}
                src={src}
                isSelected={selectedIndex === index}
                onClick={() => {
                  setSelectedIndex(index);
                  setUploadedAvatar(null); // Deselect uploaded avatar if a default one is chosen
                }}
              />
            ))}

            {/* Uploaded Avatar */}
            {uploadedAvatar && (
              <AvatarPanel
                src={uploadedAvatar}
                isSelected={selectedIndex === null}
                onClick={() => setSelectedIndex(null)}
              />
            )}

            {/* Upload Panel */}
            <div
              onClick={() => setSelectedIndex(null)}
              className={`relative w-24 h-24 rounded-lg cursor-pointer border-4 ${
                selectedIndex === null && !uploadedAvatar ? "border-green-500" : "border-transparent"
              } flex items-center justify-center bg-gray-100`}
            >
              <AvatarUpload
                onUploadSuccess={handleUploadSuccess}
              />
            </div>
          </div>

          {/* Done Button */}
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
