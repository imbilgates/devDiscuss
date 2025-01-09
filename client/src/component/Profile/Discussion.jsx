import React, { useEffect, useState } from 'react';
import { getDiscussionById } from '../../service/Service'; 
import { useAuth } from '../../contex/AuthContex';

const Discussion = () => {
  const { user, isLoading } = useAuth();
  const [discussion, setDiscussion] = useState(null);
  const [error, setError] = useState(null);

  const id = user?._id;

  useEffect(() => {
    console.log(id);
    
    if (!id) return;

    const fetchDiscussion = async () => {
      try {
        const response = await getDiscussionById(id);
        setDiscussion(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching discussion');
      }
    };

    fetchDiscussion();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  if (!discussion) return <div>Loading discussion...</div>;

  const { title, description, user: discussionUser, tags, comments, votes } = discussion;

  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>Posted by: {discussionUser.name} ({discussionUser.email})</p>

      <div>
        <strong>Tags:</strong>
        {tags.map((tag, index) => (
          <span key={index} style={{ marginRight: '8px' }}>#{tag}</span>
        ))}
      </div>

      <div>
        <strong>Votes:</strong>
        <p>Upvotes: {votes.upvotes.length}</p>
        <p>Downvotes: {votes.downvotes.length}</p>
      </div>

      <div>
        <strong>Comments:</strong>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <li key={comment._id}>
                <p>{comment.commentText}</p>
                <small>By User ID: {comment.user}</small>
                <br />
                <small>At: {new Date(comment.createdAt).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      {user?._id && (
        <div>
          <p>Welcome, {user.name}. Your User ID: {user._id}</p>
        </div>
      )}
    </div>
  );
};

export default Discussion;
