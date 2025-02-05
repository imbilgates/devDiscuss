import { Box, Typography, Modal, List, ListItem, ListItemText, IconButton, Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Close icon

const VotersModal = ({ open, upvotes, downvotes, onClose }) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={styles.modalContainer}>
      {/* Close Icon */}
      <Box sx={styles.header}>
        <Typography variant="h6">Voters</Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography variant="subtitle1" mt={2}>👍 Like:</Typography>
      <List sx={styles.list}>
        {upvotes.map((voter) => (
          <ListItem key={voter._id} sx={styles.listItem}>
            <Avatar src={voter.image} />
            <ListItemText primary={voter.name.toUpperCase()} secondary={voter.email.toLowerCase()} />
          </ListItem>
        ))}
      </List>

      <Typography variant="subtitle1" mt={2}>👎 Dislike:</Typography>
      <List sx={styles.list}>
        {downvotes.map((voter) => (
          <ListItem key={voter._id} sx={styles.listItem}>
            <Avatar src={voter.image} />
            <ListItemText primary={voter.name.toUpperCase()} secondary={voter.email.toLowerCase()} />
          </ListItem>
        ))}
      </List>
    </Box>
  </Modal>
);

const styles = {
  modalContainer: {
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
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  list: {
    maxHeight: 300,
    overflow: 'auto',
  },
  listItem: {
    gap: '10px',
  },
};

export default VotersModal;
