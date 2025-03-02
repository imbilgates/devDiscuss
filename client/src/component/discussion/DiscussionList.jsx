import { useEffect, useState } from "react";
import { listDiscussions, voteDiscussion } from '../../service/Service';
import { Select, MenuItem, Skeleton, FormControl, Box } from '@mui/material';

import PaginationControls from '../common/PaginationControls';
import DiscussionCard from './DiscussionCard';
import { useAuth } from "../../contex/AuthContex";

const DiscussionList = () => {
  const [discussions, setDiscussions] = useState([]);
  const [filter, setFilter] = useState("newest");
  const [searchTag, setSearchTag] = useState("");
  const [tags, setTags] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [errorMessages, setErrorMessages] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { user } = useAuth();
  const currentUserId = user?._id;

  useEffect(() => {
    setPage(1); // Reset to first page when tag changes
  }, [searchTag]);

  useEffect(() => {
    fetchDiscussions();
  }, [page, searchTag]);

  const fetchDiscussions = async () => {
    setLoading(true);
    try {
      const response = await listDiscussions(searchTag, page, 5); // Fetch 5 discussions per page
      setDiscussions(response.data.discussions);
      setTotalPages(response.data.totalPages);

      // Update unique tags
      const uniqueTags = new Set();
      response.data.discussions.forEach(item => {
        item.tags.forEach(tag => uniqueTags.add(tag));
      });
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
        if (alreadyDisliked) action = "like";
      } else if (voteType === "dislike") {
        if (alreadyDisliked) action = "undislike";
        if (alreadyLiked) action = "dislike";
      }

      const response = await voteDiscussion(id, { vote: action });

      setDiscussions((prevDiscussions) =>
        prevDiscussions.map((discussion) =>
          discussion._id === id ? { ...discussion, votes: response.data.votes } : discussion
        )
      );

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
          <Select value={searchTag} onChange={handleTagChange} displayEmpty variant="outlined">
            <MenuItem value="">All Tags</MenuItem>
            {[...tags].map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Sorting Filter Dropdown */}
        <FormControl size="small" sx={{ minWidth: 50 }}>
          <Select value={filter} onChange={handleFilterChange} variant="outlined">
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="popular">Most Popular</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading
        ? Array(5).fill().map((_, index) => (
          <Box key={index} sx={{ marginBottom: '16px' }}>
            <Skeleton variant="rectangular" width="100%" height={60} sx={{ marginBottom: '16px' }} />
            <Skeleton variant="text" width="60%" sx={{ marginBottom: '8px' }} />
            <Skeleton variant="text" width="80%" sx={{ marginBottom: '8px' }} />
            <Skeleton variant="rectangular" width="100%" height={150} />
          </Box>
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

      <PaginationControls
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

    </div>
  );
};

export default DiscussionList;
