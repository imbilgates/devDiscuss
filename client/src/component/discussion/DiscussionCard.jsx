import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Chip, Box, Avatar, Divider } from '@mui/material';
import DynamicAvatar from '../../utils/DynamicAvatar';
import { timeAgo } from '../../utils/timeAgo';
import AddComment from "../Comment/AddComment";

const DiscussionCard = ({ discussion, handleVote, errorMessages, currentUserId }) => {
  
  const { title, description, user, votes, tags, createdAt, _id } = discussion;

  return (
    <Card key={_id} sx={styles.card}>
      <CardContent>
        <Box sx={styles.header}>
          <Box sx={styles.avatarSection}>
            {user?.image ? (
              <Avatar src={user.image} sx={styles.avatar} />
            ) : (
              <DynamicAvatar firstLetter={user?.name?.charAt(0).toUpperCase() || "U"} />
            )}
            <Box>
              <Typography variant="h6">{user?.name.toUpperCase() || "Anonymous User"}</Typography>
              <Typography variant="body2" color="textSecondary">
                {timeAgo(createdAt)}
              </Typography>
            </Box>
          </Box>

          <Box>
            {tags.length === 0 ? (
              <Typography variant="body2" color="textSecondary">
                Not Available
              </Typography>
            ) : (
              tags.map((tag, index) => (
                <Chip key={index} label={`#${tag}`} color="primary" sx={styles.tags} />
              ))
            )}
          </Box>
        </Box>

        <Typography variant="h5" sx={styles.title}>
          {title}
        </Typography>

        <Typography variant="body1" sx={styles.description}>
          {description}
        </Typography>

        <Divider />
      </CardContent>

      <CardActions sx={styles.actions}>
        <Button
          variant="outlined"
          size="small"
          sx={{
            ...styles.button,
            ...(votes.upvotes.includes(currentUserId) ? styles.activeButton : {}),
          }}
          onClick={() => handleVote(_id, "like")}
        >
          👍 {votes.upvotes.length || 0}
        </Button>

        <Button
          variant="outlined"
          size="small"
          color="error"
          sx={{
            ...styles.button,
            ...(votes.downvotes.includes(currentUserId) ? styles.activeButton : {}),
            backgroundColor: votes.downvotes.includes(currentUserId)
              ? 'rgba(255, 0, 0, 0.1)'
              : 'inherit',
          }}
          onClick={() => handleVote(_id, "dislike")}
        >
          👎 {votes.downvotes.length || 0}
        </Button>
      </CardActions>


      {errorMessages[_id] && (
        <Typography variant="body2" color="error" sx={styles.errorText}>
          {errorMessages[_id]}
        </Typography>
      )}

      <CardContent sx={styles.commentSection}>
        <Typography variant="h6" sx={{ marginBottom: '8px' }}>
          Comments:
        </Typography>
        <AddComment id={_id} />
      </CardContent>
    </Card>
  );
};

export default DiscussionCard;




const styles = {
  card: {
    margin: '16px 0',
    padding: '16px',
    borderRadius: 8,
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  avatarSection: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    marginRight: '12px',
    width: 40,
    height: 40,
  },
  tags: {
    margin: '2px',
    fontSize: '0.85rem',
  },
  title: {
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  description: {
    marginBottom: '16px',
    color: 'text.primary',
  },
  actions: {
    marginLeft: '16px',
    display: 'flex',
    gap: '12px',
    padding: '16px 0',
  },
  button: {
    border: '1px solid',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textTransform: 'none',
  },
  activeButton: {
    backgroundColor: 'rgba(0, 128, 0, 0.1)',
    borderColor: 'green',
  },
  errorText: {
    marginTop: '8px',
    textAlign: 'center',
  },
  commentSection: {
    paddingTop: '8px',
  },
};