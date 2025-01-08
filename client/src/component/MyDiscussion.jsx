import React, { useEffect, useState } from "react";
import { listDiscussions } from '../service/Service';
import { Card, CardContent, CardActions, Button, Typography, Chip, Box, Skeleton, Avatar } from '@mui/material';
import AddComment from "./Comment/AddComment";
import { timeAgo } from '../utils/timeAgo'

const MyDiscussion = () => {
  const [discussions, setDiscussions] = useState([]);
  const [filter, setFilter] = useState("newest");
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await listDiscussions();
        setDiscussions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching discussions:", error);
        setLoading(false);
      }
    };

    fetchDiscussions();
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
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
      <div className="d-flex justify-content-end mb-3">
        <select className="form-select w-auto" value={filter} onChange={handleFilterChange}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {loading
        ? Array(5).fill().map((_, index) => (
          <Card key={index} className="mb-3" sx={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <CardContent sx={{ flex: 1 }}>
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
          <Card key={discussion._id} className="mb-3" sx={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <CardContent sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

                {/* Avatar, Username, and Created Date */}
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                  <Avatar sx={{ marginRight: 2 }}>
                    {discussion.user.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginRight: 2 }}>
                    {discussion.user.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {timeAgo(discussion.createdAt)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: 1 }}>
                  {discussion.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={"#" + tag}
                      color="primary"
                      sx={{
                        margin: '2px',
                        fontSize: { xs: '0.6rem', sm: '0.75rem', md: '1rem' },
                        padding: '2px 6px',
                        maxWidth: '100%',
                        whiteSpace: 'nowrap',
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Typography variant="h5" component="div" sx={{ marginTop: 2 }}>
                {discussion.title}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: 1 }}>
                {discussion.description}
              </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-start' }}>
              <Button variant="outlined" sx={{ marginRight: 1 }} size="small">
                👍 {discussion.votes.upvotes.length || 0}
              </Button>
              <Button variant="outlined" color="error" size="small">
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
