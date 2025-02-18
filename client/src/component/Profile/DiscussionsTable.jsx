import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip, IconButton, Box, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const DiscussionsTable = ({ discussions, onEdit, onDelete, onOpenVotersModal }) => (
  <TableContainer
    component={Paper}
    style={{
      overflowX: "auto",
      maxHeight: "400px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
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
          <TableRow key={discussion._id} style={{ borderBottom: "1px solid #e0e0e0" }}>
            <TableCell>
              <Box display="flex" flexDirection="column">
                <Typography variant="h6">{discussion.title}</Typography>
                <Typography variant="body2" color="primary">{discussion.language}</Typography> {/* Language in blue */}
              </Box>
            </TableCell>
            <TableCell>{discussion.description}</TableCell>
            <TableCell>
              <Box display="flex" flexWrap="wrap" gap="8px">
                {discussion.tags.map((tag, index) => (
                  <Chip key={index} label={`#${tag}`} color="primary" />
                ))}
              </Box>
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
                <Button variant="contained" size="small" onClick={() => onEdit(discussion)}>
                  Edit
                </Button>
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
