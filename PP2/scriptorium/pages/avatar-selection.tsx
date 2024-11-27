import React, { useState, useEffect } from "react";
import AvatarPanel from "@/components/avatarPanel";
import Link from "next/link";
import { useRouter } from "next/router";
import { apiCall } from "@/utils/auth-api-w-refresh";
import { defaultLocalStorage } from "@/utils/default";
import { useUser } from "@/context/userContextHeader";

const AvatarSelectionPage = () => {
  const {refreshUser} = useUser();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Default avatar image sources
  const avatarImages = [
    "/avatar_images/pfp1.png",
    "/avatar_images/pfp2.png",
    "/avatar_images/pfp3.png",
    "/avatar_images/pfp4.png",
    "/avatar_images/pfp5.png",
    "/avatar_images/pfp6.png",
  ];

  const router = useRouter();
  
  useEffect(() => {
    defaultLocalStorage();
    
    const validateAccess = async () => {
      try {
        const isAllowed = localStorage.getItem("accessAvatarSelection");
        console.log(isAllowed);


        // Redirect if the page is accessed without the required session key
        if (isAllowed !== "true") {
          setError("Unauthorized access. Redirecting...");
          console.log(isAllowed);
          router.push("/home");
          return;
        }

        // Check authentication using API call
        const response = await apiCall("/api/auth/is-auth", {
          method: "POST",
        });

        console.log(response);


        if (!response.success) {
          setError("Authentication failed. Redirecting...");
          localStorage.setItem("accessAvatarSelection", "false");

          router.push("/home");
          return;
        }

        // If everything is valid, clear loading state
        setLoading(false);
        localStorage.setItem("accessAvatarSelection", "false");

      } catch (err: any) {
        console.error("Error validating access:", err.message);
        setError("An unexpected error occurred. Redirecting...");
        localStorage.setItem("accessAvatarSelection", "false");

        router.push("/home");
      }
    };

    validateAccess();
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // Function to handle updating the avatar
  const handleUpdateAvatar = async () => {
    if (selectedIndex === null) {
      setError("Please select an avatar before proceeding.");
      return;
    }

    const selectedAvatar = avatarImages[selectedIndex];
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // Use apiCall to send the selected avatar to the backend
      const response = await apiCall("/api/users/update", {
        method: "PUT",
        body: JSON.stringify({ avatar: selectedAvatar }),
      });

      if (response.message === 'User updated successfully'){
        setSuccessMessage("Avatar updated successfully!");
        await refreshUser();
        // Redirect after a short delay
        setTimeout(() => router.push("/home"), 1500);
      } else {
        setError("Failed to update avatar. Please try again.");
      }
    } catch (err: any) {
      console.error("Error updating avatar:", err.message);
      setError(`An error occurred: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center py-10">
        <div className="flex flex-col items-center justify-center bg-white w-[90%] h-[90%] shadow-lg px-10 rounded-lg">
          <h1 className="text-2xl font-bold mb-6">Select Your Avatar</h1>
          <div className="grid grid-cols-3 gap-6">
            {avatarImages.map((src, index) => (
              <AvatarPanel
                key={index}
                src={src}
                isSelected={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </div>

          {loading && <p className="text-sm text-blue-500 mt-4">Updating avatar...</p>}
          {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
          {successMessage && <p className="text-sm text-green-500 mt-4">{successMessage}</p>}

          <button
            onClick={handleUpdateAvatar}
            className="w-48 bg-[#132D5F] text-white p-2 rounded-md mt-4 hover:bg-[#0f2440] transition text-center"
            disabled={loading}
          >
            {loading ? "Updating..." : "Done"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarSelectionPage;
