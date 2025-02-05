import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { getDiscussionByUser, updateDiscussion, deleteDiscussion } from '../../service/Service';
import DiscussionsTable from './DiscussionsTable';
import VotersModal from './VotersModal';
import EditDiscussionModal from './EditDiscussionModal';
import { showToast } from '../../utils/toastUtils';
import { Link } from 'react-router-dom'

import { predefinedTags } from '../../utils/PreTags'

const Discussion = () => {
  const [discussions, setDiscussions] = useState([]);
  const [tags, setTags] = useState(new Set());
  const [error, setError] = useState(null);
  const [editDiscussion, setEditDiscussion] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [votersModal, setVotersModal] = useState({ open: false, upvotes: [], downvotes: [] });

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await getDiscussionByUser();
        setDiscussions(response.data);
        // Extract unique tags
        const uniqueTags = new Set();
        response.data.forEach(item => {
          item.tags.forEach(tag => uniqueTags.add(tag));
        });
        setTags([...predefinedTags]);
      } catch (err) {
        setError(err.response?.data?.msg || 'Error fetching discussions');
      }
    };

    fetchDiscussions();
  }, []);

  const handleEdit = (discussion) => {
    setEditDiscussion(discussion);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditDiscussion(null);
    setEditModalOpen(false);
  };

  const handleSave = async () => {
    try {
      await updateDiscussion(editDiscussion._id, editDiscussion);
      setDiscussions(discussions.map(discussion =>
        discussion._id === editDiscussion._id ? { ...discussion, ...editDiscussion } : discussion
      ));
      showToast('Edited Successfully!', 'success');
      handleCloseEditModal();
    } catch (err) {
      setError('Error saving discussion', err);
      showToast('Error saving discussion', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDiscussion(id);
      setDiscussions(discussions.filter(discussion => discussion._id !== id));
      showToast("Deleted Successfully!", "success");
    } catch (err) {
      setError('Error deleting discussion', err);
      showToast('Error deleting discussion', 'error');
    }
  };

  const handleOpenVotersModal = (upvotes, downvotes) => setVotersModal({ open: true, upvotes, downvotes });

  const handleCloseVotersModal = () => setVotersModal({ open: false, upvotes: [], downvotes: [] });

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Number of Discussions ({discussions.length})
      </Typography>
      {error && <Typography color="error">Error: {error}</Typography>}
      {discussions.length === 0 ? (
        <Typography>Post Here <Link to='/create'>Create Discussion</Link></Typography>
      ) : (
        <DiscussionsTable
          discussions={discussions}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onOpenVotersModal={handleOpenVotersModal}
        />
      )}
      <EditDiscussionModal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        discussion={editDiscussion}
        setDiscussion={setEditDiscussion}
        onSave={handleSave}
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
