import React, { createContext, useContext, useState } from "react";

// Define the context value type
interface VoteContextValue {
  totalVotes: number;
  incrementVote: () => void;
  decrementVote: () => void;
}

// Create the context
const VoteContext = createContext<VoteContextValue | undefined>(undefined);

// Provider component
export const VoteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [totalVotes, setTotalVotes] = useState(0);

  const incrementVote = () => setTotalVotes((prev) => prev + 1);
  const decrementVote = () => setTotalVotes((prev) => prev - 1);

  return (
    <VoteContext.Provider value={{ totalVotes, incrementVote, decrementVote }}>
      {children}
    </VoteContext.Provider>
  );
};

// Custom hook to use the vote context
export const useVoteContext = () => {
  const context = useContext(VoteContext);
  if (!context) {
    throw new Error("useVoteContext must be used within a VoteProvider");
  }
  return context;
};
