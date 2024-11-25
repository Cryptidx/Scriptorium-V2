import React from "react";

interface AvatarPanelProps {
    src: string;
    isSelected: boolean;
    onClick: () => void;
}

const AvatarPanel: React.FC<AvatarPanelProps> = ({ src, isSelected, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={`relative w-24 h-24 rounded-lg cursor-pointer border-4 ${
                isSelected ? "border-green-500" : "border-transparent"
            }`}
        >
            {/* Avatar Image */}
            <img
                src={src}
                alt="Avatar"
                className="w-full h-full object-cover rounded-lg"
            />
            {/* Checkmark */}
            {isSelected && (
                <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    ✓
                </div>
            )}
        </div>
    );
};

export default AvatarPanel;
