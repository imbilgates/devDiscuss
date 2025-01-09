import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Chip,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText
} from '@mui/material';
import { getDiscussionByUser, updateDiscussion, deleteDiscussion } from '../../service/Service';
import { useAuth } from '../../contex/AuthContex';
import { predefinedTags } from '../../utils/PreTags'; // Import predefinedTags

const Discussion = () => {
  const { user, isLoading } = useAuth();
  const [discussions, setDiscussions] = useState([]);
  const [error, setError] = useState(null);
  const [editDiscussion, setEditDiscussion] = useState(null);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await getDiscussionByUser();
        setDiscussions(response.data);
      } catch (err) {
        setError(err.response?.data?.msg || 'Error fetching discussions');
      }
    };

    fetchDiscussions();
  }, []);

  const handleEdit = (discussion) => {
    setEditDiscussion(discussion);
  };

  const handleSave = async (id) => {
    try {
      await updateDiscussion(id, editDiscussion);
      setDiscussions(discussions.map(discussion =>
        discussion._id === id ? { ...discussion, ...editDiscussion } : discussion
      ));
      setEditDiscussion(null);
    } catch (err) {
      setError('Error saving discussion');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDiscussion(id);
      setDiscussions(discussions.filter(discussion => discussion._id !== id));
    } catch (err) {
      setError('Error deleting discussion');
    }
  };

  if (isLoading) return <Typography>Loading...</Typography>;

  if (error) return <Typography color="error">Error: {error}</Typography>;

  if (discussions.length === 0) return <Typography>No discussions found for this user.</Typography>;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Number of Discussions ({discussions.length})
      </Typography>
      <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
        <Table style={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Tags</strong></TableCell>
              <TableCell><strong>Votes</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {discussions.map((discussion) => (
              <TableRow
                key={discussion._id}
                style={{ borderBottom: '1px solid #e0e0e0' }}
              >
                <TableCell style={{ whiteSpace: 'nowrap' }}>
                  {editDiscussion?._id === discussion._id ? (
                    <TextField
                      value={editDiscussion.title}
                      onChange={(e) => setEditDiscussion({ ...editDiscussion, title: e.target.value })}
                      size="small"
                      fullWidth
                    />
                  ) : (
                    discussion.title
                  )}
                </TableCell>
                <TableCell style={{ wordWrap: 'break-word', maxWidth: 250 }}>
                  {editDiscussion?._id === discussion._id ? (
                    <TextField
                      value={editDiscussion.description}
                      onChange={(e) => setEditDiscussion({ ...editDiscussion, description: e.target.value })}
                      size="small"
                      fullWidth
                    />
                  ) : (
                    discussion.description
                  )}
                </TableCell>
                <TableCell>
                  {editDiscussion?._id === discussion._id ? (
                    <FormControl fullWidth size="small">
                      <InputLabel>Tags</InputLabel>
                      <Select
                        multiple
                        value={editDiscussion.tags}
                        onChange={(e) => {
                          if (e.target.value.length <= 3) {
                            setEditDiscussion({ ...editDiscussion, tags: e.target.value });
                          }
                        }}
                        label="Tags"
                      >
                        {predefinedTags.map((tag) => (
                          <MenuItem key={tag} value={tag}>
                            {tag}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText error={editDiscussion.tags.length === 0}>
                        {editDiscussion.tags.length === 0 ? 'At least one tag must be selected' : ''}
                      </FormHelperText>
                    </FormControl>
                  ) : (
                    <Box display="flex" flexWrap="wrap" gap="8px">
                      {discussion.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={`#${tag}`}
                          color="primary"
                          style={{ backgroundColor: '#e3f2fd', color: '#1976d2' }}
                        />
                      ))}
                    </Box>
                  )}
                </TableCell>
                <TableCell>
                  <Typography>👍 {discussion.votes.upvotes.length}</Typography>
                  <Typography>👎 {discussion.votes.downvotes.length}</Typography>
                </TableCell>
                <TableCell>
                  <Box display="flex" justifyContent="center" gap="8px">
                    {editDiscussion?._id === discussion._id ? (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleSave(discussion._id)}
                        disabled={editDiscussion.tags.length === 0}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(discussion)}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(discussion._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Discussion;
