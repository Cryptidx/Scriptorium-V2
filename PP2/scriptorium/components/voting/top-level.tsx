import React, { useState } from "react";
import TriggerButton from "../triggerButton";
import { useVoteContext } from "./vote-context";
import { ThumbsUp, ThumbsDown, ThumbsUpF, ThumbsDownF} from "@/common/icons";

const TopLevelVotes: React.FC = () => {
  const { totalVotes, incrementVote, decrementVote } = useVoteContext(); // Access shared context
  const [topVote, setTopVote] = useState<"upvote" | "downvote" | null>(null);

  const handleTopVoteChange = (vote: "upvote" | "downvote" | null) => {
    if (topVote === "upvote") decrementVote();
    if (topVote === "downvote") incrementVote();
    if (vote === "upvote") incrementVote();
    if (vote === "downvote") decrementVote();
    setTopVote(vote);
  };

  return (
    <div className="inline-flex items-center  bg-gray-200 rounded-full shadow-sm border-gray-500 border-2">
      {/* Top-Level Upvote Button */}
      <TriggerButton
        id="top-upvote"
        initialContent={<ThumbsUp className=" object-scale-down h-6 w-6" />}
        toggledContent={<ThumbsUpF className=" object-scale-down h-6 w-6" />}
        isActive={topVote === "upvote"}
        onToggle={() =>
          handleTopVoteChange(topVote === "upvote" ? null : "upvote")
        }
      />

      {/* Vote Count Display */}
      <span className="text-xs font-bold text-gray-700">{totalVotes}</span>

      {/* Top-Level Downvote Button */}
      <TriggerButton
        id="top-downvote"
        initialContent={<ThumbsDown className=" object-scale-down h-6 w-6" />}
        toggledContent={<ThumbsDownF className=" object-scale-down h-6 w-6" />}
        isActive={topVote === "downvote"}
        onToggle={() =>
          handleTopVoteChange(topVote === "downvote" ? null : "downvote")
        }
      />
    </div>
  );
};

export default TopLevelVotes;
