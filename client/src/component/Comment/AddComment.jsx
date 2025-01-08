import React, { useState } from 'react';
import { addComment } from '../../service/Service';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import Comment from './Comment';

const AddComment = ({ id }) => {
    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCommentChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        if (!commentText.trim()) return;

        setLoading(true);
        setError(null);

        const commentData = {
            commentText: commentText.trim(),
        };

        try {
            await addComment(id, commentData);
            setCommentText('');
        } catch (error) {
            setError('Error adding comment. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ marginTop: 2 }}>
            {error && <Box sx={{ color: 'red', marginBottom: 1 }}>{error}</Box>}

            <TextField
                label="Add a Comment"
                variant="outlined"
                fullWidth
                size="small"
                multiline
                rows={4}
                value={commentText}
                onChange={handleCommentChange}
                disabled={loading}
                sx={{ marginBottom: 2 }}
            />

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading || !commentText.trim()}
                    onClick={handleCommentSubmit}
                    sx={{ width: 'auto' }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'POST'}
                </Button>
                <Comment id={id} />
            </Box>
        </Box >
    );
};

export default AddComment;
