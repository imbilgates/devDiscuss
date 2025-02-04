import { useState } from 'react';
import { addComment } from '../service/Service';

const useAddComment = () => {
    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const handleCommentSubmit = async (id) => {
        if (!commentText.trim()) return;
        setLoading(true);
        setError(null);

        const commentData = { commentText: commentText.trim() };

        try {
            await addComment(id, commentData);
            setCommentText('');
        } catch (error) {
            setError('Error adding comment. Please try again later.', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        commentText,
        setCommentText,
        handleCommentSubmit,
        loading,
        error,
    };
};

export default useAddComment;
