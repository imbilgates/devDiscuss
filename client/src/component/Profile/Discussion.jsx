import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { getDiscussionByUser, updateDiscussion, deleteDiscussion } from '../../service/Service';
import DiscussionsTable from './DiscussionsTable';
import VotersModal from './VotersModal';
import { toast } from 'react-toastify'
const Discussion = () => {
  const [discussions, setDiscussions] = useState([]);
  const [tags, setTags] = useState(new Set());
  const [error, setError] = useState(null);
  const [editDiscussion, setEditDiscussion] = useState(null);
  const [votersModal, setVotersModal] = useState({ open: false, upvotes: [], downvotes: [] });

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await getDiscussionByUser();
        setDiscussions(response.data);

        // Create a new set for unique tags
        const uniqueTags = new Set();
        response.data.forEach(item => {
          item.tags.forEach(tag => {
            uniqueTags.add(tag);
          });
        });

        // Update the state with unique tags
        setTags(uniqueTags);

        // Log the unique tags here instead of directly logging `tags`
        console.log("Unique tags:", Array.from(uniqueTags));

      } catch (err) {
        setError(err.response?.data?.msg || 'Error fetching discussions');
      }
    };

    fetchDiscussions();
  }, []);

  const handleEdit = (discussion) => setEditDiscussion(discussion);

  const handleSave = async (id) => {
    try {
      await updateDiscussion(id, editDiscussion);
      setDiscussions(discussions.map(discussion =>
        discussion._id === id ? { ...discussion, ...editDiscussion } : discussion
      ));
      setEditDiscussion(null);
      toast.success('Edited Successfully!')
    } catch (err) {
      setError('Error saving discussion', err);
      toast.error('Error saving discussion', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDiscussion(id);
      setDiscussions(discussions.filter(discussion => discussion._id !== id));
      toast.success('Deleted Successfully!')
    } catch (err) {
      setError('Error deleting discussion', err);
      toast.error('Error deleting discussion', err);
    }
  };

  const handleOpenVotersModal = (upvotes, downvotes) => setVotersModal({ open: true, upvotes, downvotes });

  const handleCloseVotersModal = () => setVotersModal({ open: false, upvotes: [], downvotes: [] });


  if (error) return <Typography color="error">Error: {error}</Typography>;

  if (discussions.length === 0) return <Typography>No discussions found for this user.</Typography>;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Number of Discussions ({discussions.length})
      </Typography>
      <DiscussionsTable
        discussions={discussions}
        editDiscussion={editDiscussion}
        onEdit={handleEdit}
        onSave={handleSave}
        onDelete={handleDelete}
        onOpenVotersModal={handleOpenVotersModal}
        tags={tags}
      />
      <VotersModal
        open={votersModal.open}
        upvotes={votersModal.upvotes}
        downvotes={votersModal.downvotes}
        onClose={handleCloseVotersModal}
      />
    </Box>
  );
};

export default Discussion;
