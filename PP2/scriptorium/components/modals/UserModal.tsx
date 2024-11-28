import React, { useState, useEffect } from "react";
import AvatarPanel from "@/components/avatarPanel";
import { apiCall } from "@/utils/auth-api-w-refresh";

interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    avatar: string;
  }) => void;
  defaultValues: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    avatar: string;
  };
}

const UserEditModal: React.FC<UserEditModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}) => {
  // Initialize state with defaultValues using useEffect
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    avatar: "",
  });

  // Update formData when defaultValues changes
  useEffect(() => {
    setFormData({
      firstName: defaultValues.firstName,
      lastName: defaultValues.lastName,
      email: defaultValues.email,
      phoneNumber: defaultValues.phoneNumber,
      avatar: defaultValues.avatar,
    });
  }, [defaultValues]); // Only run when defaultValues changes

  const avatarImages = [
    "/avatar_images/pfp1.png",
    "/avatar_images/pfp2.png",
    "/avatar_images/pfp3.png",
    "/avatar_images/pfp4.png",
    "/avatar_images/pfp5.png",
    "/avatar_images/pfp6.png",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarSelect = (avatar: string) => {
    setFormData((prev) => ({ ...prev, avatar }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body: Record<string, any> = {};

    try {
      if (defaultValues.firstName !== formData.firstName) body.firstName = formData.firstName;
      if (defaultValues.lastName !== formData.lastName) body.lastName = formData.lastName;
      if (defaultValues.email !== formData.email) body.email = formData.email;
      if (defaultValues.phoneNumber !== formData.phoneNumber) body.phoneNumber = formData.phoneNumber;
      if (defaultValues.avatar !== formData.avatar) body.avatar = formData.avatar;

      if (Object.keys(body).length === 0) {
        alert("No changes detected. Nothing to update.");
        return;
      }

      const response = await apiCall(`/api/users/update`, {method: "PUT",body: JSON.stringify(body)});

      alert("Profile Updated");
      onSubmit({firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        avatar: formData.avatar})
      onClose();
      return;
      
    } catch (error) {

    }


    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 w-[90%] max-w-lg p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          {/* Avatar Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-700">Select Avatar</h3>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {avatarImages.map((src, index) => (
                <AvatarPanel
                  key={index}
                  src={src}
                  isSelected={formData.avatar === src}
                  onClick={() => handleAvatarSelect(src)}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditModal;
