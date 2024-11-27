import React, { useState } from "react";
import TriggerButton from "../triggerButton";
import { useVoteContext } from "./vote-context";
import { ThumbsUp, ThumbsDown, ThumbsUpF, ThumbsDownF} from "@/common/icons";

const LowerLevelVote: React.FC = () => {
  const { incrementVote, decrementVote } = useVoteContext(); // Access shared context
  const [vote, setVote] = useState<"upvote" | "downvote" | null>(null);

  const handleVoteChange = (newVote: "upvote" | "downvote" | null) => {
    if (vote === "upvote") decrementVote();
    if (vote === "downvote") incrementVote();
    if (newVote === "upvote") incrementVote();
    if (newVote === "downvote") decrementVote();
    setVote(newVote);
  };

  return (
    <div className="inline-flex items-center  bg-gray-200 rounded-full shadow-sm border-gray-500 border-2">
      {/* Upvote Button */}
      <TriggerButton
        id="lower-upvote"
        initialContent={<ThumbsUp className=" object-scale-down h-6 w-6" />}
        toggledContent={<ThumbsUpF className=" object-scale-down h-6 w-6" />}
        isActive={vote === "upvote"}
        onToggle={() =>
          handleVoteChange(vote === "upvote" ? null : "upvote")
        }
      />

      {/* Static Text */}
      <span className="text-xs font-bold text-gray-700">Vote</span>

      {/* Downvote Button */}
      <TriggerButton
        id="lower-downvote"
        initialContent={<ThumbsDown className=" object-scale-down h-6 w-6" />}
        toggledContent={<ThumbsDownF className=" object-scale-down h-6 w-6" />}
        isActive={vote === "downvote"}
        onToggle={() =>
          handleVoteChange(vote === "downvote" ? null : "downvote")
        }
      />
    </div>
  );
};

export default LowerLevelVote;
