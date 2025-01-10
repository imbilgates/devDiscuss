import React, { useEffect, useState } from "react";
import { listDiscussions, voteDiscussion } from '../service/Service';
import { Card, CardContent, CardActions, Button, Typography, Chip, Box, Skeleton, Avatar, Select, MenuItem } from '@mui/material';
import DynamicAvatar from '../utils/DynamicAvatar'

import AddComment from "./Comment/AddComment";
import { timeAgo } from '../utils/timeAgo';
import { predefinedTags } from '../utils/PreTags';
import { useAuth } from "../contex/AuthContex";

const AllDiscussion = () => {
  const [discussions, setDiscussions] = useState([]);
  const [filter, setFilter] = useState("newest");
  const [searchTag, setSearchTag] = useState("");
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
      {/* Search Bar and Filters */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Select
          value={searchTag}
          onChange={handleTagChange}
          displayEmpty
          variant="outlined"
          size="small"
          sx={{ width: "200px" }}
        >
          <MenuItem value="">All Tags</MenuItem>
          {predefinedTags.map((tag) => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>

        <select className="form-select w-auto" value={filter} onChange={handleFilterChange}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {/* Discussions List */}
      {loading
        ? Array(5).fill().map((_, index) => (
          <Card key={index} className="mb-3">
            <Skeleton variant="rectangular" width="100%" height={200} />
          </Card>
        ))
        : sortedDiscussions().map((discussion) => (
          <Card key={discussion._id}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DynamicAvatar firstLetter={discussion.user?.name?.charAt(0).toUpperCase() || "U"} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginRight: 2 }}>
                    {discussion.user?.name.toUpperCase() || "Anonymous User"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {timeAgo(discussion.createdAt)}
                  </Typography>
                </Box>
                <Box>
                  {discussion.tags.length === 0 ? (
                    <Typography variant="body2" color="textSecondary">Not Available</Typography>
                  ) : (
                    discussion.tags.map((tag, index) => (
                      <Chip key={index} label={"#" + tag} color="primary" sx={{ margin: '2px' }} />
                    ))
                  )}
                </Box>
              </Box>
              <Typography variant="h5" sx={{ marginTop: 2 }}>
                {discussion.title}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {discussion.description}
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleVote(discussion._id, "like")}
                style={{
                  color: discussion.votes.upvotes.includes(currentUserId) ? "green" : "inherit",
                }}
              >
                👍 {discussion.votes.upvotes.length || 0}
              </Button>

              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => handleVote(discussion._id, "dislike")}
                style={{
                  color: discussion.votes.downvotes.includes(currentUserId) ? "red" : "inherit",
                }}
              >
                👎 {discussion.votes.downvotes.length || 0}
              </Button>
            </CardActions>

            {/* Display Error Message */}
            {errorMessages[discussion._id] && (
              <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
                {errorMessages[discussion._id]}
              </Typography>
            )}

            <CardContent>
              <h6>Comments:</h6>
              <AddComment id={discussion._id} />
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default AllDiscussion;
