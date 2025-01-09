import React, { useEffect, useState } from "react";
import { listDiscussions, voteDiscussion } from '../service/Service';
import { Card, CardContent, CardActions, Button, Typography, Chip, Box, Skeleton, Avatar, TextField, IconButton, MenuItem, Select } from '@mui/material';

import AddComment from "./Comment/AddComment";
import { timeAgo } from '../utils/timeAgo';
import { predefinedTags } from '../utils/PreTags';

const MyDiscussion = () => {
  const [discussions, setDiscussions] = useState([]);
  const [filter, setFilter] = useState("newest");
  const [searchTag, setSearchTag] = useState("");
  const [loading, setLoading] = useState(true);

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

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleTagChange = (event) => {
    setSearchTag(event.target.value);
  };

  const handleVote = async (id, voteType) => {
    try {
      const voteData = { vote: voteType };
      await voteDiscussion(id, voteData);
      // Fetch updated discussions after voting
      fetchDiscussions();
    } catch (error) {
      console.error("Error voting:", error);
      alert("Error voting. Please try again.");
    }
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
        {/* Tag Selection Dropdown */}
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

        {/* Filter Dropdown */}
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
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Skeleton variant="text" width="30%" />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Skeleton variant="rectangular" width={60} height={30} />
                  <Skeleton variant="rectangular" width={60} height={30} />
                  <Skeleton variant="rectangular" width={60} height={30} />
                </Box>
              </Box>

              <Skeleton variant="text" width="80%" height={40} sx={{ marginTop: 2 }} />
              <Skeleton variant="text" width="90%" height={20} sx={{ marginTop: 1 }} />
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-start' }}>
              <Skeleton variant="rectangular" width={80} height={40} />
              <Skeleton variant="rectangular" width={80} height={40} />
            </CardActions>

            <CardContent>
              <Skeleton variant="rectangular" height={100} />
            </CardContent>

            <CardActions>
              <Skeleton variant="rectangular" width={100} height={30} />
              <Skeleton variant="rectangular" width={100} height={30} />
            </CardActions>
          </Card>
        ))
        : sortedDiscussions().map((discussion) => (
          <Card key={discussion._id} className="mb-3">
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ marginRight: 2 }}>
                    {discussion.user.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginRight: 2 }}>
                    {discussion.user.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {timeAgo(discussion.createdAt)}
                  </Typography>
                </Box>
                <Box>
                  {!discussion.tags || discussion.tags.length === 0 ? (
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
              <Button variant="outlined" size="small" onClick={() => handleVote(discussion._id, "like")}>
                👍 {discussion.votes.upvotes.length || 0}
              </Button>
              <Button variant="outlined" color="error" size="small" onClick={() => handleVote(discussion._id, "dislike")}>
                👎 {discussion.votes.downvotes.length || 0}
              </Button>

            </CardActions>
            <CardContent>
              <h6>Comments:</h6>
              <AddComment id={discussion._id} />
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default MyDiscussion;
