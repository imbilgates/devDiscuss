import React from 'react';
import { Box, Typography, Modal, List, ListItem, ListItemText, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Close icon
import DynamicAvatar from '../../utils/DynamicAvatar';

const VotersModal = ({ open, upvotes, downvotes, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Close Icon */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Voters</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Typography variant="subtitle1" mt={2}>👍Like:</Typography>
      <List sx={{ maxHeight: 300, overflow: 'auto' }}>
        {upvotes.map((voter) => (
          <ListItem key={voter._id}>
            <DynamicAvatar firstLetter={voter} variant={'circle'} />
            <ListItemText primary={voter.name.toUpperCase()} secondary={voter.email.toLowerCase()} />
          </ListItem>
        ))}
      </List>
      
      <Typography variant="subtitle1" mt={2}>👎Dislike:</Typography>
      <List sx={{ maxHeight: 300, overflow: 'auto' }}>
        {downvotes.map((voter) => (
          <ListItem key={voter._id}>
            <DynamicAvatar firstLetter={voter} variant={'circle'} />
            <ListItemText primary={voter.name.toUpperCase()} secondary={voter.email.toLowerCase()} />
          </ListItem>
        ))}
      </List>
    </Box>
  </Modal>
);

export default VotersModal;
