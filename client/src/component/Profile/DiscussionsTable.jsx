import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Chip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const DiscussionsTable = ({
  discussions,
  editDiscussion,
  onEdit,
  onSave,
  onDelete,
  onOpenVotersModal,
  tags
}) => (
  <TableContainer
    component={Paper}
    style={{
      overflowX: 'auto',
      maxHeight: '400px', // Adjust based on your preference
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    }}
  >
    <Table style={{ minWidth: 650 }}>
      <TableHead>
        <TableRow>
          <TableCell><strong>Title</strong></TableCell>
          <TableCell><strong>Description</strong></TableCell>
          <TableCell><strong>Tags</strong></TableCell>
          <TableCell><strong>Votes</strong></TableCell>
          <TableCell><strong>Voters</strong></TableCell>
          <TableCell><strong>Actions</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {discussions.map((discussion) => (
          <TableRow key={discussion._id} style={{ borderBottom: '1px solid #e0e0e0' }}>
            <TableCell>
              {editDiscussion?._id === discussion._id ? (
                <TextField
                  value={editDiscussion.title}
                  onChange={(e) => onEdit({ ...editDiscussion, title: e.target.value })}
                  size="small"
                  fullWidth
                />
              ) : discussion.title}
            </TableCell>
            <TableCell>
              {editDiscussion?._id === discussion._id ? (
                <TextField
                  value={editDiscussion.description}
                  onChange={(e) => onEdit({ ...editDiscussion, description: e.target.value })}
                  size="small"
                  fullWidth
                />
              ) : discussion.description}
            </TableCell>
            <TableCell>
              {editDiscussion?._id === discussion._id ? (
                <FormControl fullWidth size="small">
                  <InputLabel>Tags</InputLabel>
                  <Select
                    multiple
                    value={editDiscussion.tags}
                    onChange={(e) => onEdit({ ...editDiscussion, tags: e.target.value })}
                  >
                    {[...tags].map((tag) => (
                      <MenuItem key={tag} value={tag}>
                        {tag}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{editDiscussion.tags.length === 0 ? 'Select at least one tag' : ''}</FormHelperText>
                </FormControl>
              ) : (
                <Box display="flex" flexWrap="wrap" gap="8px">
                  {discussion.tags.map((tag, index) => (
                    <Chip key={index} label={`#${tag}`} color="primary" />
                  ))}
                </Box>
              )}
            </TableCell>
            <TableCell>
              <Typography>👍 {discussion.votes.upvotes.length}</Typography>
              <Typography>👎 {discussion.votes.downvotes.length}</Typography>
            </TableCell>
            <TableCell>
              <IconButton onClick={() => onOpenVotersModal(discussion.votes.upvotes, discussion.votes.downvotes)}>
                <VisibilityIcon />
              </IconButton>
            </TableCell>
            <TableCell>
              <Box display="flex" justifyContent="center" gap="8px">
                {editDiscussion?._id === discussion._id ? (
                  <Button variant="contained" size="small" onClick={() => onSave(discussion._id)}>
                    Save
                  </Button>
                ) : (
                  <Button variant="contained" size="small" onClick={() => onEdit(discussion)}>
                    Edit
                  </Button>
                )}
                <Button variant="contained" color="error" size="small" onClick={() => onDelete(discussion._id)}>
                  Delete
                </Button>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default DiscussionsTable;
