// import React, { createContext, useContext, useState, ReactNode } from "react";

// interface DropdownContextValue {
//   openDropdownId: string | null; // Currently open dropdown ID
//   setOpenDropdownId: (id: string | null) => void; // Function to update the open dropdown
// }

// const DropdownContext = createContext<DropdownContextValue | undefined>(undefined);

// export const DropdownProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

//   return (
//     <DropdownContext.Provider value={{ openDropdownId, setOpenDropdownId }}>
//       {children}
//     </DropdownContext.Provider>
//   );
// };

// // Custom hook to use the DropdownContext
// export const useDropdownContext = () => {
//   const context = useContext(DropdownContext);
//   if (!context) {
//     throw new Error("useDropdownContext must be used within a DropdownProvider");
//   }
//   return context;
// };


import React, { createContext, useContext, useState, ReactNode } from "react";

interface DropdownState {
  id: string; // Dropdown ID
  selectedLabel: string | null; // Selected option's label
}

interface DropdownContextValue {
  openDropdownId: string | null; // Currently open dropdown ID
  setOpenDropdownId: (id: string | null) => void; // Function to update the open dropdown
  dropdownStates: DropdownState[]; // Track state of each dropdown
  updateDropdownState: (id: string, label: string | null) => void; // Update a dropdown's state
}

const DropdownContext = createContext<DropdownContextValue | undefined>(undefined);

export const DropdownProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [dropdownStates, setDropdownStates] = useState<DropdownState[]>([]);

  const updateDropdownState = (id: string, label: string | null) => {
    setDropdownStates((prevStates) => {
      const updated = [...prevStates];
      const index = updated.findIndex((state) => state.id === id);
      if (index >= 0) {
        updated[index].selectedLabel = label;
      } else {
        updated.push({ id, selectedLabel: label });
      }
      return updated;
    });
  };

  return (
    <DropdownContext.Provider
      value={{ openDropdownId, setOpenDropdownId, dropdownStates, updateDropdownState }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

// Custom hook to use the DropdownContext
export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdownContext must be used within a DropdownProvider");
  }
  return context;
};
