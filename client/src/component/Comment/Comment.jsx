import React, { useEffect, useState } from 'react';
import { getComments, deleteComment, editComment } from '../../service/Service';
import { Card, CardContent, Button, Typography, Box, Avatar, Skeleton, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import { useAuth } from '../../contex/AuthContex';

const Comment = ({ id, flag }) => {
    const [comments, setComments] = useState([]);
    const [visibleCount, setVisibleCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null); // To track the comment being edited
    const [editedCommentText, setEditedCommentText] = useState(''); // To track the edited comment text

    const { user } = useAuth();
    const currentUserId = user?._id;

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);
                const response = await getComments(id);
                setComments(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching comments:", error);
                setLoading(false);
            }
        };

        fetchComments();
    }, [id, flag]);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 1);
    };

    const commentsToShow = comments.slice(0, visibleCount);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(id, commentId);
            setComments(comments.filter(comment => comment._id !== commentId)); // Remove the deleted comment from the state
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const handleEditComment = (commentId) => {
        setEditingCommentId(commentId);
        const comment = comments.find(comment => comment._id === commentId);
        setEditedCommentText(comment.commentText); // Set the text to be edited
    };

    const handleSaveEditComment = async () => {
        try {
            await editComment(id, editingCommentId, { commentText: editedCommentText });
            setComments(comments.map(comment =>
                comment._id === editingCommentId ? { ...comment, commentText: editedCommentText } : comment
            ));
            setEditingCommentId(null); // Reset editing state
            setEditedCommentText('');
        } catch (error) {
            console.error("Error editing comment:", error);
        }
    };

    return (
        <div>
            {comments.length > 0 &&
                <Button variant="contained" color="primary" onClick={handleOpenModal}>
                    Comments ({comments.length})
                </Button>
            }

            <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
                <Box sx={{ backgroundColor: 'tan'}}>
                    <DialogTitle>Comments</DialogTitle>
                    <DialogContent >
                        {loading && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                                <CircularProgress />
                            </Box>
                        )}
                        {commentsToShow.map((comment) => (
                            <Card key={comment._id} sx={{
                                marginBottom: 2,
                                borderRadius: '12px',
                                boxShadow: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                padding: 2
                            }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                                        <Avatar sx={{ marginRight: 2 }}>
                                            {comment.user.name.charAt(0).toUpperCase()}
                                        </Avatar>
                                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                            {comment.user.name}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        {loading ? (
                                            <Skeleton width="40%" />
                                        ) : (
                                            <Typography variant="body2" color="textSecondary">
                                                <strong>Posted on:</strong> {new Date(comment.createdAt).toLocaleString()}
                                            </Typography>
                                        )}
                                    </Box>

                                    {loading ? (
                                        <Skeleton height={60} />
                                    ) : (
                                        <Typography variant="body1" component="p" sx={{ marginTop: 1 }}>
                                            {editingCommentId === comment._id ? (
                                                <TextField
                                                    fullWidth
                                                    value={editedCommentText}
                                                    onChange={(e) => setEditedCommentText(e.target.value)}
                                                    multiline
                                                    variant="outlined"
                                                    rows={3}
                                                />
                                            ) : (
                                                comment.commentText
                                            )}
                                        </Typography>
                                    )}

                                    {/* Delete and Edit buttons */}
                                    {comment?.user._id === currentUserId &&
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, marginTop: 1 }}>
                                            <IconButton onClick={() => handleDeleteComment(comment._id)} color="error">
                                                🗑️
                                            </IconButton>
                                            {editingCommentId === comment._id ? (
                                                <Button onClick={handleSaveEditComment} color="primary">
                                                    Save
                                                </Button>
                                            ) : (
                                                <IconButton onClick={() => handleEditComment(comment._id)} color="primary">
                                                    ✍️
                                                </IconButton>
                                            )}
                                        </Box>
                                    }
                                </CardContent>
                            </Card>
                        ))}

                        {comments.length > visibleCount && !loading && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleLoadMore}
                                >
                                    🔃 Load More
                                </Button>
                            </Box>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="primary">Close</Button>
                    </DialogActions>
                </Box>
            </Dialog>
        </div>
    );
};

export default Comment;
