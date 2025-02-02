import { useEffect, useState } from "react";
import { listDiscussions, voteDiscussion } from '../../service/Service';
import { Select, MenuItem, Skeleton, FormControl, Box } from '@mui/material';
import DiscussionCard from './DiscussionCard';
import { useAuth } from "../../contex/AuthContex";

const DiscussionList = () => {
  const [discussions, setDiscussions] = useState([]);
  const [filter, setFilter] = useState("newest");
  const [searchTag, setSearchTag] = useState("");
  const [tags, setTags] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [errorMessages, setErrorMessages] = useState({});

  const { user } = useAuth();
  const currentUserId = user?._id;

  useEffect(() => {
    fetchDiscussions();
  }, [searchTag]);

  const fetchDiscussions = async () => {
    setLoading(true);
    try {
      const response = await listDiscussions(searchTag);
      setDiscussions(response.data);

      // Create a new set for unique tags
      const uniqueTags = new Set();
      response.data.forEach(item => {
        item.tags.forEach(tag => {
          uniqueTags.add(tag);
        });
      });

      // Update the state with unique tags
      setTags(uniqueTags);
    } catch (error) {
      console.error("Error fetching discussions:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleVote = async (id, voteType) => {
    try {
      const discussion = discussions.find((d) => d._id === id);
      const alreadyLiked = discussion.votes.upvotes.includes(currentUserId);
      const alreadyDisliked = discussion.votes.downvotes.includes(currentUserId);

      let action = voteType;

      if (voteType === "like") {
        if (alreadyLiked) action = "unlike";
        if (alreadyDisliked) action = "like"; // Remove dislike and add like
      } else if (voteType === "dislike") {
        if (alreadyDisliked) action = "undislike";
        if (alreadyLiked) action = "dislike"; // Remove like and add dislike
      }

      const voteData = { vote: action };
      const response = await voteDiscussion(id, voteData);

      // Update discussion locally with backend response
      setDiscussions((prevDiscussions) =>
        prevDiscussions.map((discussion) =>
          discussion._id === id ? { ...discussion, votes: response.data.votes } : discussion
        )
      );

      // Clear any existing error message for this discussion
      setErrorMessages((prevErrors) => ({ ...prevErrors, [id]: "" }));
    } catch (error) {
      console.error("Error voting:", error);
      setErrorMessages((prevErrors) => ({ ...prevErrors, [id]: "Error voting. Please try again." }));
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleTagChange = (event) => {
    setSearchTag(event.target.value);
  };

  const sortedDiscussions = () => {
    switch (filter) {
      case "newest":
        return [...discussions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "oldest":
        return [...discussions].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case "popular":
        return [...discussions].sort((a, b) => b.votes.upvotes.length - a.votes.upvotes.length);
      default:
        return discussions;
    }
  };

  return (
    <div className="container mt-4">

      <Box display="flex" alignItems="center" sx={{ gap: "9px", mb: 2 }}>
        {/* Tag Filter Dropdown */}
        <FormControl size="small" sx={{ minWidth: 50 }}>
          <Select
            value={searchTag}
            onChange={handleTagChange}
            displayEmpty
            variant="outlined"
          >
            <MenuItem value="">All Tags</MenuItem>
            {[...tags]?.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sorting Filter Dropdown (Converted to MUI) */}
        <FormControl size="small" sx={{ minWidth: 50 }}>
          <Select
            value={filter}
            onChange={handleFilterChange}
            variant="outlined"
          >
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="popular">Most Popular</MenuItem>
          </Select>
        </FormControl>
      </Box>


      {loading
        ? Array(5).fill().map((_, index) => (
          <Skeleton key={index} variant="rectangular" width="100%" height={200} />
        ))
        : sortedDiscussions().map((discussion) => (
          <DiscussionCard
            key={discussion._id}
            discussion={discussion}
            handleVote={handleVote}
            errorMessages={errorMessages}
            currentUserId={currentUserId}
          />
        ))}
    </div>
  );
};

export default DiscussionList;
